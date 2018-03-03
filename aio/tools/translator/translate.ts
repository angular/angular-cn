import * as _ from 'lodash';
import { DictEntry } from './dict-entry';
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
      const translations = lookup(line, /forms.md$/);
      const indent = indentOf(line);
      const padding = repeat(indent);
      if (translations.length === 0) {
        return line;
      } else if (translations.length === 1) {
        return line + '\n\n' + padding + translations[0].translation;
      } else {
        return line + '\n\n' + translations.map(t => '???\n' + padding + t.translation).join('\n\n');
      }
    });
}
