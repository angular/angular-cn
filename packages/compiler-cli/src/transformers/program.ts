
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {AotCompiler, AotCompilerHost, AotCompilerOptions, EmitterVisitorContext, FormattedMessageChain, GeneratedFile, MessageBundle, NgAnalyzedFile, NgAnalyzedFileWithInjectables, NgAnalyzedModules, ParseSourceSpan, PartialModule, Position, Serializer, TypeScriptEmitter, Xliff, Xliff2, Xmb, core, createAotCompiler, getParseErrors, isFormattedError, isSyntaxError} from '@angular/compiler';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

import {TypeCheckHost, translateDiagnostics} from '../diagnostics/translate_diagnostics';
import {MetadataCollector, ModuleMetadata, createBundleIndexHost} from '../metadata/index';

import {CompilerHost, CompilerOptions, CustomTransformers, DEFAULT_ERROR_CODE, Diagnostic, DiagnosticMessageChain, EmitFlags, LazyRoute, LibrarySummary, Program, SOURCE, TsEmitArguments, TsEmitCallback} from './api';
import {CodeGenerator, TsCompilerAotCompilerTypeCheckHostAdapter, getOriginalReferences} from './compiler_host';
import {LowerMetadataTransform, getExpressionLoweringTransformFactory} from './lower_expressions';
import {MetadataCache, MetadataTransformer} from './metadata_cache';
import {getAngularEmitterTransformFactory} from './node_emitter_transform';
import {PartialModuleMetadataTransformer} from './r3_metadata_transform';
import {getAngularClassTransformerFactory} from './r3_transform';
import {DTS, GENERATED_FILES, StructureIsReused, TS, createMessageDiagnostic, isInRootDir, ngToTsDiagnostic, tsStructureIsReused, userError} from './util';



/**
 * Maximum number of files that are emitable via calling ts.Program.emit
 * passing individual targetSourceFiles.
 */
const MAX_FILE_COUNT_FOR_SINGLE_FILE_EMIT = 20;

const emptyModules: NgAnalyzedModules = {
  ngModules: [],
  ngModuleByPipeOrDirective: new Map(),
  files: []
};

const defaultEmitCallback: TsEmitCallback =
    ({program, targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles,
      customTransformers}) =>
        program.emit(
            targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);

class AngularCompilerProgram implements Program {
  private rootNames: string[];
  private metadataCache: MetadataCache;
  private loweringMetadataTransform: LowerMetadataTransform;
  private oldProgramLibrarySummaries: Map<string, LibrarySummary>|undefined;
  private oldProgramEmittedGeneratedFiles: Map<string, GeneratedFile>|undefined;
  private oldProgramEmittedSourceFiles: Map<string, ts.SourceFile>|undefined;
  // Note: This will be cleared out as soon as we create the _tsProgram
  private oldTsProgram: ts.Program|undefined;
  private emittedLibrarySummaries: LibrarySummary[]|undefined;
  private emittedGeneratedFiles: GeneratedFile[]|undefined;
  private emittedSourceFiles: ts.SourceFile[]|undefined;

  // Lazily initialized fields
  private _compiler: AotCompiler;
  private _hostAdapter: TsCompilerAotCompilerTypeCheckHostAdapter;
  private _tsProgram: ts.Program;
  private _analyzedModules: NgAnalyzedModules|undefined;
  private _analyzedInjectables: NgAnalyzedFileWithInjectables[]|undefined;
  private _structuralDiagnostics: Diagnostic[]|undefined;
  private _programWithStubs: ts.Program|undefined;
  private _optionsDiagnostics: Diagnostic[] = [];

  constructor(
      rootNames: ReadonlyArray<string>, private options: CompilerOptions,
      private host: CompilerHost, oldProgram?: Program) {
    this.rootNames = [...rootNames];

    if (ts.version < '2.4.2' || (ts.version >= '2.7.0' && !options.disableTypeScriptVersionCheck)) {
      throw new Error(
          `The Angular Compiler requires TypeScript >=2.4.2 and <2.7 but ${ts.version} was found instead.`);
    }

    this.oldTsProgram = oldProgram ? oldProgram.getTsProgram() : undefined;
    if (oldProgram) {
      this.oldProgramLibrarySummaries = oldProgram.getLibrarySummaries();
      this.oldProgramEmittedGeneratedFiles = oldProgram.getEmittedGeneratedFiles();
      this.oldProgramEmittedSourceFiles = oldProgram.getEmittedSourceFiles();
    }

    if (options.flatModuleOutFile) {
      const {host: bundleHost, indexName, errors} =
          createBundleIndexHost(options, this.rootNames, host);
      if (errors) {
        this._optionsDiagnostics.push(...errors.map(e => ({
                                                      category: e.category,
                                                      messageText: e.messageText as string,
                                                      source: SOURCE,
                                                      code: DEFAULT_ERROR_CODE
                                                    })));
      } else {
        this.rootNames.push(indexName !);
        this.host = bundleHost;
      }
    }
    this.loweringMetadataTransform = new LowerMetadataTransform();
    this.metadataCache = this.createMetadataCache([this.loweringMetadataTransform]);
  }

  private createMetadataCache(transformers: MetadataTransformer[]) {
    return new MetadataCache(
        new MetadataCollector({quotedNames: true}), !!this.options.strictMetadataEmit,
        transformers);
  }

  getLibrarySummaries(): Map<string, LibrarySummary> {
    const result = new Map<string, LibrarySummary>();
    if (this.oldProgramLibrarySummaries) {
      this.oldProgramLibrarySummaries.forEach((summary, fileName) => result.set(fileName, summary));
    }
    if (this.emittedLibrarySummaries) {
      this.emittedLibrarySummaries.forEach(
          (summary, fileName) => result.set(summary.fileName, summary));
    }
    return result;
  }

  getEmittedGeneratedFiles(): Map<string, GeneratedFile> {
    const result = new Map<string, GeneratedFile>();
    if (this.oldProgramEmittedGeneratedFiles) {
      this.oldProgramEmittedGeneratedFiles.forEach(
          (genFile, fileName) => result.set(fileName, genFile));
    }
    if (this.emittedGeneratedFiles) {
      this.emittedGeneratedFiles.forEach((genFile) => result.set(genFile.genFileUrl, genFile));
    }
    return result;
  }

  getEmittedSourceFiles(): Map<string, ts.SourceFile> {
    const result = new Map<string, ts.SourceFile>();
    if (this.oldProgramEmittedSourceFiles) {
      this.oldProgramEmittedSourceFiles.forEach((sf, fileName) => result.set(fileName, sf));
    }
    if (this.emittedSourceFiles) {
      this.emittedSourceFiles.forEach((sf) => result.set(sf.fileName, sf));
    }
    return result;
  }

  getTsProgram(): ts.Program { return this.tsProgram; }

  getTsOptionDiagnostics(cancellationToken?: ts.CancellationToken) {
    return this.tsProgram.getOptionsDiagnostics(cancellationToken);
  }

  getNgOptionDiagnostics(cancellationToken?: ts.CancellationToken): ReadonlyArray<Diagnostic> {
    return [...this._optionsDiagnostics, ...getNgOptionDiagnostics(this.options)];
  }

  getTsSyntacticDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken):
      ReadonlyArray<ts.Diagnostic> {
    return this.tsProgram.getSyntacticDiagnostics(sourceFile, cancellationToken);
  }

  getNgStructuralDiagnostics(cancellationToken?: ts.CancellationToken): ReadonlyArray<Diagnostic> {
    return this.structuralDiagnostics;
  }

  getTsSemanticDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken):
      ReadonlyArray<ts.Diagnostic> {
    const sourceFiles = sourceFile ? [sourceFile] : this.tsProgram.getSourceFiles();
    let diags: ts.Diagnostic[] = [];
    sourceFiles.forEach(sf => {
      if (!GENERATED_FILES.test(sf.fileName)) {
        diags.push(...this.tsProgram.getSemanticDiagnostics(sf, cancellationToken));
      }
    });
    return diags;
  }

  getNgSemanticDiagnostics(fileName?: string, cancellationToken?: ts.CancellationToken):
      ReadonlyArray<Diagnostic> {
    let diags: ts.Diagnostic[] = [];
    this.tsProgram.getSourceFiles().forEach(sf => {
      if (GENERATED_FILES.test(sf.fileName) && !sf.isDeclarationFile) {
        diags.push(...this.tsProgram.getSemanticDiagnostics(sf, cancellationToken));
      }
    });
    const {ng} = translateDiagnostics(this.hostAdapter, diags);
    return ng;
  }

  loadNgStructureAsync(): Promise<void> {
    if (this._analyzedModules) {
      throw new Error('Angular structure already loaded');
    }
    return Promise.resolve()
        .then(() => {
          const {tmpProgram, sourceFiles, tsFiles, rootNames} = this._createProgramWithBasicStubs();
          return this.compiler.loadFilesAsync(sourceFiles, tsFiles)
              .then(({analyzedModules, analyzedInjectables}) => {
                if (this._analyzedModules) {
                  throw new Error('Angular structure loaded both synchronously and asynchronously');
                }
                this._updateProgramWithTypeCheckStubs(
                    tmpProgram, analyzedModules, analyzedInjectables, rootNames);
              });
        })
        .catch(e => this._createProgramOnError(e));
  }

  listLazyRoutes(route?: string): LazyRoute[] {
    // Note: Don't analyzedModules if a route is given
    // to be fast enough.
    return this.compiler.listLazyRoutes(route, route ? undefined : this.analyzedModules);
  }

  emit(parameters: {
    emitFlags?: EmitFlags,
    cancellationToken?: ts.CancellationToken,
    customTransformers?: CustomTransformers,
    emitCallback?: TsEmitCallback
  } = {}): ts.EmitResult {
    return this.options.enableIvy === true ? this._emitRender3(parameters) :
                                             this._emitRender2(parameters);
  }

  private _emitRender3(
      {emitFlags = EmitFlags.Default, cancellationToken, customTransformers,
       emitCallback = defaultEmitCallback}: {
        emitFlags?: EmitFlags,
        cancellationToken?: ts.CancellationToken,
        customTransformers?: CustomTransformers,
        emitCallback?: TsEmitCallback
      } = {}): ts.EmitResult {
    const emitStart = Date.now();
    if ((emitFlags & (EmitFlags.JS | EmitFlags.DTS | EmitFlags.Metadata | EmitFlags.Codegen)) ===
        0) {
      return {emitSkipped: true, diagnostics: [], emittedFiles: []};
    }
    const modules = this.compiler.emitAllPartialModules(this.analyzedModules);

    const writeTsFile: ts.WriteFileCallback =
        (outFileName, outData, writeByteOrderMark, onError?, sourceFiles?) => {
          const sourceFile = sourceFiles && sourceFiles.length == 1 ? sourceFiles[0] : null;
          let genFile: GeneratedFile|undefined;
          this.writeFile(outFileName, outData, writeByteOrderMark, onError, undefined, sourceFiles);
        };

    const emitOnlyDtsFiles = (emitFlags & (EmitFlags.DTS | EmitFlags.JS)) == EmitFlags.DTS;

    const tsCustomTransformers = this.calculateTransforms(
        /* genFiles */ undefined, /* partialModules */ modules, customTransformers);

    const emitResult = emitCallback({
      program: this.tsProgram,
      host: this.host,
      options: this.options,
      writeFile: writeTsFile, emitOnlyDtsFiles,
      customTransformers: tsCustomTransformers
    });

    return emitResult;
  }

  private _emitRender2(
      {emitFlags = EmitFlags.Default, cancellationToken, customTransformers,
       emitCallback = defaultEmitCallback}: {
        emitFlags?: EmitFlags,
        cancellationToken?: ts.CancellationToken,
        customTransformers?: CustomTransformers,
        emitCallback?: TsEmitCallback
      } = {}): ts.EmitResult {
    const emitStart = Date.now();
    if (emitFlags & EmitFlags.I18nBundle) {
      const locale = this.options.i18nOutLocale || null;
      const file = this.options.i18nOutFile || null;
      const format = this.options.i18nOutFormat || null;
      const bundle = this.compiler.emitMessageBundle(this.analyzedModules, locale);
      i18nExtract(format, file, this.host, this.options, bundle);
    }
    if ((emitFlags & (EmitFlags.JS | EmitFlags.DTS | EmitFlags.Metadata | EmitFlags.Codegen)) ===
        0) {
      return {emitSkipped: true, diagnostics: [], emittedFiles: []};
    }
    let {genFiles, genDiags} = this.generateFilesForEmit(emitFlags);
    if (genDiags.length) {
      return {
        diagnostics: genDiags,
        emitSkipped: true,
        emittedFiles: [],
      };
    }
    this.emittedGeneratedFiles = genFiles;
    const outSrcMapping: Array<{sourceFile: ts.SourceFile, outFileName: string}> = [];
    const genFileByFileName = new Map<string, GeneratedFile>();
    genFiles.forEach(genFile => genFileByFileName.set(genFile.genFileUrl, genFile));
    this.emittedLibrarySummaries = [];
    const emittedSourceFiles = [] as ts.SourceFile[];
    const writeTsFile: ts.WriteFileCallback =
        (outFileName, outData, writeByteOrderMark, onError?, sourceFiles?) => {
          const sourceFile = sourceFiles && sourceFiles.length == 1 ? sourceFiles[0] : null;
          let genFile: GeneratedFile|undefined;
          if (sourceFile) {
            outSrcMapping.push({outFileName: outFileName, sourceFile});
            genFile = genFileByFileName.get(sourceFile.fileName);
            if (!sourceFile.isDeclarationFile && !GENERATED_FILES.test(sourceFile.fileName)) {
              // Note: sourceFile is the transformed sourcefile, not the original one!
              emittedSourceFiles.push(this.tsProgram.getSourceFile(sourceFile.fileName));
            }
          }
          this.writeFile(outFileName, outData, writeByteOrderMark, onError, genFile, sourceFiles);
        };

    const modules = this._analyzedInjectables &&
        this.compiler.emitAllPartialModules2(this._analyzedInjectables);

    const tsCustomTransformers =
        this.calculateTransforms(genFileByFileName, modules, customTransformers);
    const emitOnlyDtsFiles = (emitFlags & (EmitFlags.DTS | EmitFlags.JS)) == EmitFlags.DTS;
    // Restore the original references before we emit so TypeScript doesn't emit
    // a reference to the .d.ts file.
    const augmentedReferences = new Map<ts.SourceFile, ReadonlyArray<ts.FileReference>>();
    for (const sourceFile of this.tsProgram.getSourceFiles()) {
      const originalReferences = getOriginalReferences(sourceFile);
      if (originalReferences) {
        augmentedReferences.set(sourceFile, sourceFile.referencedFiles);
        sourceFile.referencedFiles = originalReferences;
      }
    }
    const genTsFiles: GeneratedFile[] = [];
    const genJsonFiles: GeneratedFile[] = [];
    genFiles.forEach(gf => {
      if (gf.stmts) {
        genTsFiles.push(gf);
      }
      if (gf.source) {
        genJsonFiles.push(gf);
      }
    });
    let emitResult: ts.EmitResult;
    let emittedUserTsCount: number;
    try {
      const sourceFilesToEmit = this.getSourceFilesForEmit();
      if (sourceFilesToEmit &&
          (sourceFilesToEmit.length + genTsFiles.length) < MAX_FILE_COUNT_FOR_SINGLE_FILE_EMIT) {
        const fileNamesToEmit =
            [...sourceFilesToEmit.map(sf => sf.fileName), ...genTsFiles.map(gf => gf.genFileUrl)];
        emitResult = mergeEmitResults(
            fileNamesToEmit.map((fileName) => emitResult = emitCallback({
                                  program: this.tsProgram,
                                  host: this.host,
                                  options: this.options,
                                  writeFile: writeTsFile, emitOnlyDtsFiles,
                                  customTransformers: tsCustomTransformers,
                                  targetSourceFile: this.tsProgram.getSourceFile(fileName),
                                })));
        emittedUserTsCount = sourceFilesToEmit.length;
      } else {
        emitResult = emitCallback({
          program: this.tsProgram,
          host: this.host,
          options: this.options,
          writeFile: writeTsFile, emitOnlyDtsFiles,
          customTransformers: tsCustomTransformers
        });
        emittedUserTsCount = this.tsProgram.getSourceFiles().length - genTsFiles.length;
      }
    } finally {
      // Restore the references back to the augmented value to ensure that the
      // checks that TypeScript makes for project structure reuse will succeed.
      for (const [sourceFile, references] of Array.from(augmentedReferences)) {
        // TODO(chuckj): Remove any cast after updating build to 2.6
        (sourceFile as any).referencedFiles = references;
      }
    }
    this.emittedSourceFiles = emittedSourceFiles;

    // Match behavior of tsc: only produce emit diagnostics if it would block
    // emit. If noEmitOnError is false, the emit will happen in spite of any
    // errors, so we should not report them.
    if (this.options.noEmitOnError === true) {
      // translate the diagnostics in the emitResult as well.
      const translatedEmitDiags = translateDiagnostics(this.hostAdapter, emitResult.diagnostics);
      emitResult.diagnostics = translatedEmitDiags.ts.concat(
          this.structuralDiagnostics.concat(translatedEmitDiags.ng).map(ngToTsDiagnostic));
    }

    if (!outSrcMapping.length) {
      // if no files were emitted by TypeScript, also don't emit .json files
      emitResult.diagnostics =
          emitResult.diagnostics.concat([createMessageDiagnostic(`Emitted no files.`)]);
      return emitResult;
    }

    let sampleSrcFileName: string|undefined;
    let sampleOutFileName: string|undefined;
    if (outSrcMapping.length) {
      sampleSrcFileName = outSrcMapping[0].sourceFile.fileName;
      sampleOutFileName = outSrcMapping[0].outFileName;
    }
    const srcToOutPath =
        createSrcToOutPathMapper(this.options.outDir, sampleSrcFileName, sampleOutFileName);
    if (emitFlags & EmitFlags.Codegen) {
      genJsonFiles.forEach(gf => {
        const outFileName = srcToOutPath(gf.genFileUrl);
        this.writeFile(outFileName, gf.source !, false, undefined, gf);
      });
    }
    let metadataJsonCount = 0;
    if (emitFlags & EmitFlags.Metadata) {
      this.tsProgram.getSourceFiles().forEach(sf => {
        if (!sf.isDeclarationFile && !GENERATED_FILES.test(sf.fileName)) {
          metadataJsonCount++;
          const metadata = this.metadataCache.getMetadata(sf);
          if (metadata) {
            const metadataText = JSON.stringify([metadata]);
            const outFileName = srcToOutPath(sf.fileName.replace(/\.tsx?$/, '.metadata.json'));
            this.writeFile(outFileName, metadataText, false, undefined, undefined, [sf]);
          }
        }
      });
    }
    const emitEnd = Date.now();
    if (this.options.diagnostics) {
      emitResult.diagnostics = emitResult.diagnostics.concat([createMessageDiagnostic([
        `Emitted in ${emitEnd - emitStart}ms`,
        `- ${emittedUserTsCount} user ts files`,
        `- ${genTsFiles.length} generated ts files`,
        `- ${genJsonFiles.length + metadataJsonCount} generated json files`,
      ].join('\n'))]);
    }
    return emitResult;
  }

  // Private members
  private get compiler(): AotCompiler {
    if (!this._compiler) {
      this._createCompiler();
    }
    return this._compiler !;
  }

  private get hostAdapter(): TsCompilerAotCompilerTypeCheckHostAdapter {
    if (!this._hostAdapter) {
      this._createCompiler();
    }
    return this._hostAdapter !;
  }

  private get analyzedModules(): NgAnalyzedModules {
    if (!this._analyzedModules) {
      this.initSync();
    }
    return this._analyzedModules !;
  }

  private get structuralDiagnostics(): ReadonlyArray<Diagnostic> {
    let diagnostics = this._structuralDiagnostics;
    if (!diagnostics) {
      this.initSync();
      diagnostics = (this._structuralDiagnostics = this._structuralDiagnostics || []);
    }
    return diagnostics;
  }

  private get tsProgram(): ts.Program {
    if (!this._tsProgram) {
      this.initSync();
    }
    return this._tsProgram !;
  }

  private calculateTransforms(
      genFiles: Map<string, GeneratedFile>|undefined, partialModules: PartialModule[]|undefined,
      customTransformers?: CustomTransformers): ts.CustomTransformers {
    const beforeTs: ts.TransformerFactory<ts.SourceFile>[] = [];
    if (!this.options.disableExpressionLowering) {
      beforeTs.push(
          getExpressionLoweringTransformFactory(this.loweringMetadataTransform, this.tsProgram));
    }
    if (genFiles) {
      beforeTs.push(getAngularEmitterTransformFactory(genFiles, this.getTsProgram()));
    }
    if (partialModules) {
      beforeTs.push(getAngularClassTransformerFactory(partialModules));

      // If we have partial modules, the cached metadata might be incorrect as it doesn't reflect
      // the partial module transforms.
      this.metadataCache = this.createMetadataCache(
          [this.loweringMetadataTransform, new PartialModuleMetadataTransformer(partialModules)]);
    }
    if (customTransformers && customTransformers.beforeTs) {
      beforeTs.push(...customTransformers.beforeTs);
    }
    const afterTs = customTransformers ? customTransformers.afterTs : undefined;
    return {before: beforeTs, after: afterTs};
  }

  private initSync() {
    if (this._analyzedModules) {
      return;
    }
    try {
      const {tmpProgram, sourceFiles, tsFiles, rootNames} = this._createProgramWithBasicStubs();
      const {analyzedModules, analyzedInjectables} =
          this.compiler.loadFilesSync(sourceFiles, tsFiles);
      this._updateProgramWithTypeCheckStubs(
          tmpProgram, analyzedModules, analyzedInjectables, rootNames);
    } catch (e) {
      this._createProgramOnError(e);
    }
  }

  private _createCompiler() {
    const codegen: CodeGenerator = {
      generateFile: (genFileName, baseFileName) =>
                        this._compiler.emitBasicStub(genFileName, baseFileName),
      findGeneratedFileNames: (fileName) => this._compiler.findGeneratedFileNames(fileName),
    };

    this._hostAdapter = new TsCompilerAotCompilerTypeCheckHostAdapter(
        this.rootNames, this.options, this.host, this.metadataCache, codegen,
        this.oldProgramLibrarySummaries);
    const aotOptions = getAotCompilerOptions(this.options);
    const errorCollector = (this.options.collectAllErrors || this.options.fullTemplateTypeCheck) ?
        (err: any) => this._addStructuralDiagnostics(err) :
        undefined;
    this._compiler = createAotCompiler(this._hostAdapter, aotOptions, errorCollector).compiler;
  }

  private _createProgramWithBasicStubs(): {
    tmpProgram: ts.Program,
    rootNames: string[],
    sourceFiles: string[],
    tsFiles: string[],
  } {
    if (this._analyzedModules) {
      throw new Error(`Internal Error: already initialized!`);
    }
    // Note: This is important to not produce a memory leak!
    const oldTsProgram = this.oldTsProgram;
    this.oldTsProgram = undefined;

    const codegen: CodeGenerator = {
      generateFile: (genFileName, baseFileName) =>
                        this.compiler.emitBasicStub(genFileName, baseFileName),
      findGeneratedFileNames: (fileName) => this.compiler.findGeneratedFileNames(fileName),
    };


    let rootNames = [...this.rootNames];
    if (this.options.generateCodeForLibraries !== false) {
      // if we should generateCodeForLibraries, never include
      // generated files in the program as otherwise we will
      // overwrite them and typescript will report the error
      // TS5055: Cannot write file ... because it would overwrite input file.
      rootNames = rootNames.filter(fn => !GENERATED_FILES.test(fn));
    }
    if (this.options.noResolve) {
      this.rootNames.forEach(rootName => {
        if (this.hostAdapter.shouldGenerateFilesFor(rootName)) {
          rootNames.push(...this.compiler.findGeneratedFileNames(rootName));
        }
      });
    }

    const tmpProgram = ts.createProgram(rootNames, this.options, this.hostAdapter, oldTsProgram);
    const sourceFiles: string[] = [];
    const tsFiles: string[] = [];
    tmpProgram.getSourceFiles().forEach(sf => {
      if (this.hostAdapter.isSourceFile(sf.fileName)) {
        sourceFiles.push(sf.fileName);
      }
      if (TS.test(sf.fileName) && !DTS.test(sf.fileName)) {
        tsFiles.push(sf.fileName);
      }
    });
    return {tmpProgram, sourceFiles, tsFiles, rootNames};
  }

  private _updateProgramWithTypeCheckStubs(
      tmpProgram: ts.Program, analyzedModules: NgAnalyzedModules,
      analyzedInjectables: NgAnalyzedFileWithInjectables[], rootNames: string[]) {
    this._analyzedModules = analyzedModules;
    this._analyzedInjectables = analyzedInjectables;
    tmpProgram.getSourceFiles().forEach(sf => {
      if (sf.fileName.endsWith('.ngfactory.ts')) {
        const {generate, baseFileName} = this.hostAdapter.shouldGenerateFile(sf.fileName);
        if (generate) {
          // Note: ! is ok as hostAdapter.shouldGenerateFile will always return a baseFileName
          // for .ngfactory.ts files.
          const genFile = this.compiler.emitTypeCheckStub(sf.fileName, baseFileName !);
          if (genFile) {
            this.hostAdapter.updateGeneratedFile(genFile);
          }
        }
      }
    });
    this._tsProgram = ts.createProgram(rootNames, this.options, this.hostAdapter, tmpProgram);
    // Note: the new ts program should be completely reusable by TypeScript as:
    // - we cache all the files in the hostAdapter
    // - new new stubs use the exactly same imports/exports as the old once (we assert that in
    // hostAdapter.updateGeneratedFile).
    if (tsStructureIsReused(tmpProgram) !== StructureIsReused.Completely) {
      throw new Error(`Internal Error: The structure of the program changed during codegen.`);
    }
  }

  private _createProgramOnError(e: any) {
    // Still fill the analyzedModules and the tsProgram
    // so that we don't cause other errors for users who e.g. want to emit the ngProgram.
    this._analyzedModules = emptyModules;
    this.oldTsProgram = undefined;
    this._hostAdapter.isSourceFile = () => false;
    this._tsProgram = ts.createProgram(this.rootNames, this.options, this.hostAdapter);
    if (isSyntaxError(e)) {
      this._addStructuralDiagnostics(e);
      return;
    }
    throw e;
  }

  private _addStructuralDiagnostics(error: Error) {
    const diagnostics = this._structuralDiagnostics || (this._structuralDiagnostics = []);
    if (isSyntaxError(error)) {
      diagnostics.push(...syntaxErrorToDiagnostics(error));
    } else {
      diagnostics.push({
        messageText: error.toString(),
        category: ts.DiagnosticCategory.Error,
        source: SOURCE,
        code: DEFAULT_ERROR_CODE
      });
    }
  }

  // Note: this returns a ts.Diagnostic so that we
  // can return errors in a ts.EmitResult
  private generateFilesForEmit(emitFlags: EmitFlags):
      {genFiles: GeneratedFile[], genDiags: ts.Diagnostic[]} {
    try {
      if (!(emitFlags & EmitFlags.Codegen)) {
        return {genFiles: [], genDiags: []};
      }
      // TODO(tbosch): allow generating files that are not in the rootDir
      // See https://github.com/angular/angular/issues/19337
      let genFiles = this.compiler.emitAllImpls(this.analyzedModules)
                         .filter(genFile => isInRootDir(genFile.genFileUrl, this.options));
      if (this.oldProgramEmittedGeneratedFiles) {
        const oldProgramEmittedGeneratedFiles = this.oldProgramEmittedGeneratedFiles;
        genFiles = genFiles.filter(genFile => {
          const oldGenFile = oldProgramEmittedGeneratedFiles.get(genFile.genFileUrl);
          return !oldGenFile || !genFile.isEquivalent(oldGenFile);
        });
      }
      return {genFiles, genDiags: []};
    } catch (e) {
      // TODO(tbosch): check whether we can actually have syntax errors here,
      // as we already parsed the metadata and templates before to create the type check block.
      if (isSyntaxError(e)) {
        const genDiags: ts.Diagnostic[] = [{
          file: undefined,
          start: undefined,
          length: undefined,
          messageText: e.message,
          category: ts.DiagnosticCategory.Error,
          source: SOURCE,
          code: DEFAULT_ERROR_CODE
        }];
        return {genFiles: [], genDiags};
      }
      throw e;
    }
  }

  /**
   * Returns undefined if all files should be emitted.
   */
  private getSourceFilesForEmit(): ts.SourceFile[]|undefined {
    // TODO(tbosch): if one of the files contains a `const enum`
    // always emit all files -> return undefined!
    let sourceFilesToEmit: ts.SourceFile[]|undefined;
    if (this.oldProgramEmittedSourceFiles) {
      sourceFilesToEmit = this.tsProgram.getSourceFiles().filter(sf => {
        const oldFile = this.oldProgramEmittedSourceFiles !.get(sf.fileName);
        return !sf.isDeclarationFile && !GENERATED_FILES.test(sf.fileName) && sf !== oldFile;
      });
    }
    return sourceFilesToEmit;
  }

  private writeFile(
      outFileName: string, outData: string, writeByteOrderMark: boolean,
      onError?: (message: string) => void, genFile?: GeneratedFile,
      sourceFiles?: ReadonlyArray<ts.SourceFile>) {
    // collect emittedLibrarySummaries
    let baseFile: ts.SourceFile|undefined;
    if (genFile) {
      baseFile = this.tsProgram.getSourceFile(genFile.srcFileUrl);
      if (baseFile) {
        if (!this.emittedLibrarySummaries) {
          this.emittedLibrarySummaries = [];
        }
        if (genFile.genFileUrl.endsWith('.ngsummary.json') && baseFile.fileName.endsWith('.d.ts')) {
          this.emittedLibrarySummaries.push({
            fileName: baseFile.fileName,
            text: baseFile.text,
            sourceFile: baseFile,
          });
          this.emittedLibrarySummaries.push({fileName: genFile.genFileUrl, text: outData});
          if (!this.options.declaration) {
            // If we don't emit declarations, still record an empty .ngfactory.d.ts file,
            // as we might need it later on for resolving module names from summaries.
            const ngFactoryDts =
                genFile.genFileUrl.substring(0, genFile.genFileUrl.length - 15) + '.ngfactory.d.ts';
            this.emittedLibrarySummaries.push({fileName: ngFactoryDts, text: ''});
          }
        } else if (outFileName.endsWith('.d.ts') && baseFile.fileName.endsWith('.d.ts')) {
          const dtsSourceFilePath = genFile.genFileUrl.replace(/\.ts$/, '.d.ts');
          // Note: Don't use sourceFiles here as the created .d.ts has a path in the outDir,
          // but we need one that is next to the .ts file
          this.emittedLibrarySummaries.push({fileName: dtsSourceFilePath, text: outData});
        }
      }
    }
    // Filter out generated files for which we didn't generate code.
    // This can happen as the stub calculation is not completely exact.
    // Note: sourceFile refers to the .ngfactory.ts / .ngsummary.ts file
    // node_emitter_transform already set the file contents to be empty,
    //  so this code only needs to skip the file if !allowEmptyCodegenFiles.
    const isGenerated = GENERATED_FILES.test(outFileName);
    if (isGenerated && !this.options.allowEmptyCodegenFiles &&
        (!genFile || !genFile.stmts || genFile.stmts.length === 0)) {
      return;
    }
    if (baseFile) {
      sourceFiles = sourceFiles ? [...sourceFiles, baseFile] : [baseFile];
    }
    // TODO: remove any when TS 2.4 support is removed.
    this.host.writeFile(outFileName, outData, writeByteOrderMark, onError, sourceFiles as any);
  }
}

export function createProgram({rootNames, options, host, oldProgram}: {
  rootNames: ReadonlyArray<string>,
  options: CompilerOptions,
  host: CompilerHost, oldProgram?: Program
}): Program {
  return new AngularCompilerProgram(rootNames, options, host, oldProgram);
}

// Compute the AotCompiler options
function getAotCompilerOptions(options: CompilerOptions): AotCompilerOptions {
  let missingTranslation = core.MissingTranslationStrategy.Warning;

  switch (options.i18nInMissingTranslations) {
    case 'ignore':
      missingTranslation = core.MissingTranslationStrategy.Ignore;
      break;
    case 'error':
      missingTranslation = core.MissingTranslationStrategy.Error;
      break;
  }

  let translations: string = '';

  if (options.i18nInFile) {
    if (!options.i18nInLocale) {
      throw new Error(`The translation file (${options.i18nInFile}) locale must be provided.`);
    }
    translations = fs.readFileSync(options.i18nInFile, 'utf8');
  } else {
    // No translations are provided, ignore any errors
    // We still go through i18n to remove i18n attributes
    missingTranslation = core.MissingTranslationStrategy.Ignore;
  }

  return {
    locale: options.i18nInLocale,
    i18nFormat: options.i18nInFormat || options.i18nOutFormat, translations, missingTranslation,
    enableLegacyTemplate: options.enableLegacyTemplate,
    enableSummariesForJit: options.enableSummariesForJit,
    preserveWhitespaces: options.preserveWhitespaces,
    fullTemplateTypeCheck: options.fullTemplateTypeCheck,
    allowEmptyCodegenFiles: options.allowEmptyCodegenFiles,
  };
}

function getNgOptionDiagnostics(options: CompilerOptions): ReadonlyArray<Diagnostic> {
  if (options.annotationsAs) {
    switch (options.annotationsAs) {
      case 'decorators':
      case 'static fields':
        break;
      default:
        return [{
          messageText:
              'Angular compiler options "annotationsAs" only supports "static fields" and "decorators"',
          category: ts.DiagnosticCategory.Error,
          source: SOURCE,
          code: DEFAULT_ERROR_CODE
        }];
    }
  }
  return [];
}

function normalizeSeparators(path: string): string {
  return path.replace(/\\/g, '/');
}

/**
 * Returns a function that can adjust a path from source path to out path,
 * based on an existing mapping from source to out path.
 *
 * TODO(tbosch): talk to the TypeScript team to expose their logic for calculating the `rootDir`
 * if none was specified.
 *
 * Note: This function works on normalized paths from typescript.
 *
 * @param outDir
 * @param outSrcMappings
 */
export function createSrcToOutPathMapper(
    outDir: string | undefined, sampleSrcFileName: string | undefined,
    sampleOutFileName: string | undefined, host: {
      dirname: typeof path.dirname,
      resolve: typeof path.resolve,
      relative: typeof path.relative
    } = path): (srcFileName: string) => string {
  let srcToOutPath: (srcFileName: string) => string;
  if (outDir) {
    let path: {} = {};  // Ensure we error if we use `path` instead of `host`.
    if (sampleSrcFileName == null || sampleOutFileName == null) {
      throw new Error(`Can't calculate the rootDir without a sample srcFileName / outFileName. `);
    }
    const srcFileDir = normalizeSeparators(host.dirname(sampleSrcFileName));
    const outFileDir = normalizeSeparators(host.dirname(sampleOutFileName));
    if (srcFileDir === outFileDir) {
      return (srcFileName) => srcFileName;
    }
    // calculate the common suffix, stopping
    // at `outDir`.
    const srcDirParts = srcFileDir.split('/');
    const outDirParts = normalizeSeparators(host.relative(outDir, outFileDir)).split('/');
    let i = 0;
    while (i < Math.min(srcDirParts.length, outDirParts.length) &&
           srcDirParts[srcDirParts.length - 1 - i] === outDirParts[outDirParts.length - 1 - i])
      i++;
    const rootDir = srcDirParts.slice(0, srcDirParts.length - i).join('/');
    srcToOutPath = (srcFileName) => host.resolve(outDir, host.relative(rootDir, srcFileName));
  } else {
    srcToOutPath = (srcFileName) => srcFileName;
  }
  return srcToOutPath;
}

export function i18nExtract(
    formatName: string | null, outFile: string | null, host: ts.CompilerHost,
    options: CompilerOptions, bundle: MessageBundle): string[] {
  formatName = formatName || 'xlf';
  // Checks the format and returns the extension
  const ext = i18nGetExtension(formatName);
  const content = i18nSerialize(bundle, formatName, options);
  const dstFile = outFile || `messages.${ext}`;
  const dstPath = path.resolve(options.outDir || options.basePath, dstFile);
  host.writeFile(dstPath, content, false, undefined, []);
  return [dstPath];
}

export function i18nSerialize(
    bundle: MessageBundle, formatName: string, options: CompilerOptions): string {
  const format = formatName.toLowerCase();
  let serializer: Serializer;

  switch (format) {
    case 'xmb':
      serializer = new Xmb();
      break;
    case 'xliff2':
    case 'xlf2':
      serializer = new Xliff2();
      break;
    case 'xlf':
    case 'xliff':
    default:
      serializer = new Xliff();
  }

  return bundle.write(serializer, getPathNormalizer(options.basePath));
}

function getPathNormalizer(basePath?: string) {
  // normalize source paths by removing the base path and always using "/" as a separator
  return (sourcePath: string) => {
    sourcePath = basePath ? path.relative(basePath, sourcePath) : sourcePath;
    return sourcePath.split(path.sep).join('/');
  };
}

export function i18nGetExtension(formatName: string): string {
  const format = formatName.toLowerCase();

  switch (format) {
    case 'xmb':
      return 'xmb';
    case 'xlf':
    case 'xlif':
    case 'xliff':
    case 'xlf2':
    case 'xliff2':
      return 'xlf';
  }

  throw new Error(`Unsupported format "${formatName}"`);
}

function mergeEmitResults(emitResults: ts.EmitResult[]): ts.EmitResult {
  const diagnostics: ts.Diagnostic[] = [];
  let emitSkipped = false;
  const emittedFiles: string[] = [];
  for (const er of emitResults) {
    diagnostics.push(...er.diagnostics);
    emitSkipped = emitSkipped || er.emitSkipped;
    emittedFiles.push(...er.emittedFiles);
  }
  return {diagnostics, emitSkipped, emittedFiles};
}

function diagnosticSourceOfSpan(span: ParseSourceSpan): ts.SourceFile {
  // For diagnostics, TypeScript only uses the fileName and text properties.
  // The redundant '()' are here is to avoid having clang-format breaking the line incorrectly.
  return ({ fileName: span.start.file.url, text: span.start.file.content } as any);
}

function diagnosticSourceOfFileName(fileName: string, program: ts.Program): ts.SourceFile {
  const sourceFile = program.getSourceFile(fileName);
  if (sourceFile) return sourceFile;

  // If we are reporting diagnostics for a source file that is not in the project then we need
  // to fake a source file so the diagnostic formatting routines can emit the file name.
  // The redundant '()' are here is to avoid having clang-format breaking the line incorrectly.
  return ({ fileName, text: '' } as any);
}


function diagnosticChainFromFormattedDiagnosticChain(chain: FormattedMessageChain):
    DiagnosticMessageChain {
  return {
    messageText: chain.message,
    next: chain.next && diagnosticChainFromFormattedDiagnosticChain(chain.next),
    position: chain.position
  };
}

function syntaxErrorToDiagnostics(error: Error): Diagnostic[] {
  const parserErrors = getParseErrors(error);
  if (parserErrors && parserErrors.length) {
    return parserErrors.map<Diagnostic>(e => ({
                                          messageText: e.contextualMessage(),
                                          file: diagnosticSourceOfSpan(e.span),
                                          start: e.span.start.offset,
                                          length: e.span.end.offset - e.span.start.offset,
                                          category: ts.DiagnosticCategory.Error,
                                          source: SOURCE,
                                          code: DEFAULT_ERROR_CODE
                                        }));
  } else if (isFormattedError(error)) {
    return [{
      messageText: error.message,
      chain: error.chain && diagnosticChainFromFormattedDiagnosticChain(error.chain),
      category: ts.DiagnosticCategory.Error,
      source: SOURCE,
      code: DEFAULT_ERROR_CODE,
      position: error.position
    }];
  }
  // Produce a Diagnostic anyway since we know for sure `error` is a SyntaxError
  return [{
    messageText: error.message,
    category: ts.DiagnosticCategory.Error,
    code: DEFAULT_ERROR_CODE,
    source: SOURCE,
  }];
}
