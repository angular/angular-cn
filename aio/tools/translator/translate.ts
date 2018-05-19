import * as fs from 'fs';
import * as _ from 'lodash';
import { DictEntry } from './dict-entry';
import { dirs } from './dirs';
import { listMarkdownFiles } from './extractor';
import { exactlyTest, extractOriginalContent, indentOf, hasInlineText, kernelText, normalizeLines, repeat } from './utils';

// TODO: 改用 markdown 解析器实现

export const dict = require('./dict-latest.json') as DictEntry[];

export function lookup(english: string): DictEntry[] {
  const englishKernel = kernelText(extractOriginalContent(english));
  const entries = dict
    .filter(entry => exactlyTest(entry.key, englishKernel));
  return _.uniqBy(entries, 'translation');
}

function isPureTag(line: string): boolean {
  let content = line.trim();
  return /^<\/?\w+\b[^>]*>$/.test(content) ||
    /^<(\w+)\b[^>]*>\s*<\/\1>$/.test(content);
}

export function translate(content: string): string[] {
  const lines = normalizeLines(content)
    .split(/\n{2,}/);
  return lines
    .map(line => {
      if (!line.trim() || isPureTag(line)) {
        return line;
      }
      const translations = lookup(line);
      if (translations.length > 0 && hasInlineText(translations[0].translation)) {
        return translations[0].translation;
      } else {
        const indent = indentOf(line);
        const padding = repeat(indent);
        if (translations.length === 0) {
          return line;
        } else if (translations.length === 1) {
          return line + '\n\n' + padding + translations[0].translation;
        } else {
          return line + '\n\n' + padding + translations[translations.length - 1].translation;
        }
      }
    });
}

export function translateFile(sourceFile: string, targetFile: string): void {
  const content = fs.readFileSync(sourceFile, 'utf-8');
  const result = translate(content);
  fs.writeFileSync(targetFile, result.join('\n\n') + '\n', 'utf-8');
}

export function translateDirectory(sourceDir: string, targetDir: string): void {
  const files = listMarkdownFiles(sourceDir);
  files.forEach(fileName => {
    console.log('translating ...', fileName);
    translateFile(fileName, fileName.replace(/^.*content-en\//, dirs.content));
    console.log('translated ', fileName);
  });
}
