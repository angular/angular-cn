import * as globby from 'globby';
import { DictEntry } from './dict-entry';
import { normalizeLines } from './translate';
import {
  isNotCnPages,
  originalIsNotChinese,
  originalIsNotTag,
  originalIsOnlyTag,
  translationHasNotCodeExample,
} from './utils';

export function splitAndTrim(text = ''): string[] {
  return text.split(/\n+\s*\n+/).map(line => line.trim()).filter(line => !!line);
}

// tslint:disable:max-line-length
const pattern = /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]/;

export function isTranslation(text) {
  return text && pattern.test(text);
}

export function gatherTranslations(text: string): DictEntry[] {
  const lines = splitAndTrim(normalizeLines(text));

  const result = [];
  for (let i = 1; i < lines.length; ++i) {
    const translation = purifyText(lines[i]);
    const original = purifyText(lines[i - 1]);
    if (isTranslation(translation)) {
      result.push({original, translation});
    }
  }
  return result
    .filter(isNotCnPages)
    .filter(translationHasNotCodeExample)
    .filter(originalIsNotChinese)
    .filter(originalIsNotTag)
    .filter(originalIsOnlyTag)
    .map(purifyEntry);
}

export function listMarkdownFiles(directory: string): string[] {
  return globby.sync(directory + '**/*.md');
}

export function gatherFromMarkdownFile(fileName: string): DictEntry[] {
  const fs = require('fs');
  const content = fs.readFileSync(fileName, 'utf-8');
  const entries = gatherTranslations(content);
  entries.forEach(entry => entry.sourceFile = fileName);
  return entries;
}

export function gatherFromMarkdownFiles(directory: string): DictEntry[] {
  const files = listMarkdownFiles(directory);
  const entries = files.map(gatherFromMarkdownFile);
  return entries.reduce((result, value) => result.concat(value), []);
}

export function purifyText(text): string {
  return text
    .replace(/^<(\w+)[\s\S]*?>([\s\S]*)<\/\1>$/, '$2')
    .replace(/^(.*)<code-example .*$/, '$1')
    .trim();
}

export function purifyEntry(entry: DictEntry): DictEntry {
  return {
    original: purifyText(entry.original),
    translation: purifyText(entry.translation),
  };
}

const contentDirectory = process.argv[2];

gatherFromMarkdownFiles(contentDirectory);
