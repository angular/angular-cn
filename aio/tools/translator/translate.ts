import * as fs from 'fs';
import * as _ from 'lodash';
import { DictEntry } from './dict-entry';
import { dirs } from './dirs';
import { listMarkdownFiles } from './extractor';
import { indentOf, normalizeLines, repeat } from './utils';

export const dict = require('./dict-3.json') as DictEntry[];

export function lookup(english: string, filename: RegExp = /.*/): DictEntry[] {
  let entries = dict
    .filter(entry => filename.test(entry.sourceFile))
    .filter(entry => kernelText(entry.original) === kernelText(english));
  return _.uniqBy(entries, 'translation');
}

export function kernelText(text: string): string {
  return text.replace(/[\s\n]+/g, ' ').trim();
}

export function translate(content: string): string[] {
  const lines = normalizeLines(content)
    .split(/\n+\s*\n+/);
  return lines
    .map(line => {
      if (!line.trim()) {
        return line;
      }
      const translations = lookup(line);
      const indent = indentOf(line);
      const padding = repeat(indent);
      if (translations.length === 0) {
        return line;
      } else if (translations.length === 1) {
        return line + '\n\n' + padding + translations[0].translation;
      } else {
        return line + '\n\n' + padding + translations[translations.length - 1].translation;
      }
    });
}

export function translateFile(sourceFile: string, targetFile: string): void {
  const content = fs.readFileSync(sourceFile, 'utf-8');
  const result = translate(content);
  fs.writeFileSync(targetFile, result.join('\n\n'), 'utf-8');
}

export function translateDirectory(sourceDir: string, targetDir: string): void {
  const files = listMarkdownFiles(sourceDir);
  files.forEach(fileName => {
    console.log('translating ...', fileName);
    translateFile(fileName, fileName.replace(/^.*content-en\//, dirs.content));
    console.log('translated ', fileName);
  });
}
