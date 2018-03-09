/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as chokidar from 'chokidar';
import * as path from 'path';
import * as ts from 'typescript';

import {Diagnostics, ParsedConfiguration, PerformCompilationResult, exitCodeFromResult, performCompilation, readConfiguration} from './perform_compile';
import * as api from './transformers/api';
import {createCompilerHost} from './transformers/entry_points';
import {createMessageDiagnostic} from './transformers/util';

function totalCompilationTimeDiagnostic(timeInMillis: number): api.Diagnostic {
  let duration: string;
  if (timeInMillis > 1000) {
    duration = `${(timeInMillis / 1000).toPrecision(2)}s`;
  } else {
    duration = `${timeInMillis}ms`;
  }
  return {
    category: ts.DiagnosticCategory.Message,
    messageText: `Total time: ${duration}`,
    code: api.DEFAULT_ERROR_CODE,
    source: api.SOURCE,
  };
}

export enum FileChangeEvent {
  Change,
  CreateDelete,
  CreateDeleteDir,
}

export interface PerformWatchHost {
  reportDiagnostics(diagnostics: Diagnostics): void;
  readConfiguration(): ParsedConfiguration;
  createCompilerHost(options: api.CompilerOptions): api.CompilerHost;
  createEmitCallback(options: api.CompilerOptions): api.TsEmitCallback|undefined;
  onFileChange(
      options: api.CompilerOptions, listener: (event: FileChangeEvent, fileName: string) => void,
      ready: () => void): {close: () => void};
  setTimeout(callback: () => void, ms: number): any;
  clearTimeout(timeoutId: any): void;
}

export function createPerformWatchHost(
    configFileName: string, reportDiagnostics: (diagnostics: Diagnostics) => void,
    existingOptions?: ts.CompilerOptions, createEmitCallback?: (options: api.CompilerOptions) =>
                                              api.TsEmitCallback | undefined): PerformWatchHost {
  return {
    reportDiagnostics: reportDiagnostics,
    createCompilerHost: options => createCompilerHost({options}),
    readConfiguration: () => readConfiguration(configFileName, existingOptions),
    createEmitCallback: options => createEmitCallback ? createEmitCallback(options) : undefined,
    onFileChange: (options, listener, ready: () => void) => {
      if (!options.basePath) {
        reportDiagnostics([{
          category: ts.DiagnosticCategory.Error,
          messageText: 'Invalid configuration option. baseDir not specified',
          source: api.SOURCE,
          code: api.DEFAULT_ERROR_CODE
        }]);
        return {close: () => {}};
      }
      const watcher = chokidar.watch(options.basePath, {
        // ignore .dotfiles, .js and .map files.
        // can't ignore other files as we e.g. want to recompile if an `.html` file changes as well.
        ignored: /((^[\/\\])\..)|(\.js$)|(\.map$)|(\.metadata\.json)/,
        ignoreInitial: true,
        persistent: true,
      });
      watcher.on('all', (event: string, path: string) => {
        switch (event) {
          case 'change':
            listener(FileChangeEvent.Change, path);
            break;
          case 'unlink':
          case 'add':
            listener(FileChangeEvent.CreateDelete, path);
            break;
          case 'unlinkDir':
          case 'addDir':
            listener(FileChangeEvent.CreateDeleteDir, path);
            break;
        }
      });
      watcher.on('ready', ready);
      return {close: () => watcher.close(), ready};
    },
    setTimeout: (ts.sys.clearTimeout && ts.sys.setTimeout) || setTimeout,
    clearTimeout: (ts.sys.setTimeout && ts.sys.clearTimeout) || clearTimeout,
  };
}

interface CacheEntry {
  exists?: boolean;
  sf?: ts.SourceFile;
  content?: string;
}

/**
 * The logic in this function is adapted from `tsc.ts` from TypeScript.
 */
export function performWatchCompilation(host: PerformWatchHost):
    {close: () => void, ready: (cb: () => void) => void, firstCompileResult: Diagnostics} {
  let cachedProgram: api.Program|undefined;            // Program cached from last compilation
  let cachedCompilerHost: api.CompilerHost|undefined;  // CompilerHost cached from last compilation
  let cachedOptions: ParsedConfiguration|undefined;  // CompilerOptions cached from last compilation
  let timerHandleForRecompilation: any;  // Handle for 0.25s wait timer to trigger recompilation

  const ingoreFilesForWatch = new Set<string>();
  const fileCache = new Map<string, CacheEntry>();

  const firstCompileResult = doCompilation();

  // Watch basePath, ignoring .dotfiles
  let resolveReadyPromise: () => void;
  const readyPromise = new Promise(resolve => resolveReadyPromise = resolve);
  // Note: ! is ok as options are filled after the first compilation
  // Note: ! is ok as resolvedReadyPromise is filled by the previous call
  const fileWatcher =
      host.onFileChange(cachedOptions !.options, watchedFileChanged, resolveReadyPromise !);

  return {close, ready: cb => readyPromise.then(cb), firstCompileResult};

  function cacheEntry(fileName: string): CacheEntry {
    fileName = path.normalize(fileName);
    let entry = fileCache.get(fileName);
    if (!entry) {
      entry = {};
      fileCache.set(fileName, entry);
    }
    return entry;
  }

  function close() {
    fileWatcher.close();
    if (timerHandleForRecompilation) {
      host.clearTimeout(timerHandleForRecompilation);
      timerHandleForRecompilation = undefined;
    }
  }

  // Invoked to perform initial compilation or re-compilation in watch mode
  function doCompilation(): Diagnostics {
    if (!cachedOptions) {
      cachedOptions = host.readConfiguration();
    }
    if (cachedOptions.errors && cachedOptions.errors.length) {
      host.reportDiagnostics(cachedOptions.errors);
      return cachedOptions.errors;
    }
    const startTime = Date.now();
    if (!cachedCompilerHost) {
      cachedCompilerHost = host.createCompilerHost(cachedOptions.options);
      const originalWriteFileCallback = cachedCompilerHost.writeFile;
      cachedCompilerHost.writeFile = function(
          fileName: string, data: string, writeByteOrderMark: boolean,
          onError?: (message: string) => void, sourceFiles: ReadonlyArray<ts.SourceFile> = []) {
        ingoreFilesForWatch.add(path.normalize(fileName));
        return originalWriteFileCallback(fileName, data, writeByteOrderMark, onError, sourceFiles);
      };
      const originalFileExists = cachedCompilerHost.fileExists;
      cachedCompilerHost.fileExists = function(fileName: string) {
        const ce = cacheEntry(fileName);
        if (ce.exists == null) {
          ce.exists = originalFileExists.call(this, fileName);
        }
        return ce.exists !;
      };
      const originalGetSourceFile = cachedCompilerHost.getSourceFile;
      cachedCompilerHost.getSourceFile = function(
          fileName: string, languageVersion: ts.ScriptTarget) {
        const ce = cacheEntry(fileName);
        if (!ce.sf) {
          ce.sf = originalGetSourceFile.call(this, fileName, languageVersion);
        }
        return ce.sf !;
      };
      const originalReadFile = cachedCompilerHost.readFile;
      cachedCompilerHost.readFile = function(fileName: string) {
        const ce = cacheEntry(fileName);
        if (ce.content == null) {
          ce.content = originalReadFile.call(this, fileName);
        }
        return ce.content !;
      };
    }
    ingoreFilesForWatch.clear();
    const oldProgram = cachedProgram;
    // We clear out the `cachedProgram` here as a
    // program can only be used as `oldProgram` 1x
    cachedProgram = undefined;
    const compileResult = performCompilation({
      rootNames: cachedOptions.rootNames,
      options: cachedOptions.options,
      host: cachedCompilerHost,
      oldProgram: cachedProgram,
      emitCallback: host.createEmitCallback(cachedOptions.options)
    });

    if (compileResult.diagnostics.length) {
      host.reportDiagnostics(compileResult.diagnostics);
    }

    const endTime = Date.now();
    if (cachedOptions.options.diagnostics) {
      const totalTime = (endTime - startTime) / 1000;
      host.reportDiagnostics([totalCompilationTimeDiagnostic(endTime - startTime)]);
    }
    const exitCode = exitCodeFromResult(compileResult.diagnostics);
    if (exitCode == 0) {
      cachedProgram = compileResult.program;
      host.reportDiagnostics(
          [createMessageDiagnostic('Compilation complete. Watching for file changes.')]);
    } else {
      host.reportDiagnostics(
          [createMessageDiagnostic('Compilation failed. Watching for file changes.')]);
    }

    return compileResult.diagnostics;
  }

  function resetOptions() {
    cachedProgram = undefined;
    cachedCompilerHost = undefined;
    cachedOptions = undefined;
  }

  function watchedFileChanged(event: FileChangeEvent, fileName: string) {
    if (cachedOptions && event === FileChangeEvent.Change &&
        // TODO(chuckj): validate that this is sufficient to skip files that were written.
        // This assumes that the file path we write is the same file path we will receive in the
        // change notification.
        path.normalize(fileName) === path.normalize(cachedOptions.project)) {
      // If the configuration file changes, forget everything and start the recompilation timer
      resetOptions();
    } else if (
        event === FileChangeEvent.CreateDelete || event === FileChangeEvent.CreateDeleteDir) {
      // If a file was added or removed, reread the configuration
      // to determine the new list of root files.
      cachedOptions = undefined;
    }

    if (event === FileChangeEvent.CreateDeleteDir) {
      fileCache.clear();
    } else {
      fileCache.delete(path.normalize(fileName));
    }

    if (!ingoreFilesForWatch.has(path.normalize(fileName))) {
      // Ignore the file if the file is one that was written by the compiler.
      startTimerForRecompilation();
    }
  }

  // Upon detecting a file change, wait for 250ms and then perform a recompilation. This gives batch
  // operations (such as saving all modified files in an editor) a chance to complete before we kick
  // off a new compilation.
  function startTimerForRecompilation() {
    if (timerHandleForRecompilation) {
      host.clearTimeout(timerHandleForRecompilation);
    }
    timerHandleForRecompilation = host.setTimeout(recompile, 250);
  }

  function recompile() {
    timerHandleForRecompilation = undefined;
    host.reportDiagnostics(
        [createMessageDiagnostic('File change detected. Starting incremental compilation.')]);
    doCompilation();
  }
}
