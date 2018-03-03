import * as _ from 'lodash';
import { DictEntry } from './dict-entry';

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

function indentOf(line): number {
  let pattern = /^( *)[\s\S]*/;
  if (!pattern.test(line)) {
    return 0;
  }
  const leadSpaces = line.replace(pattern, '$1').length;
  if (/^ *(\d+\.|-|\*) /.test(line)) {
    return leadSpaces + 3;
  } else {
    return leadSpaces;
  }
}

function repeat(indent: number): string {
  let result = '';
  for (let i = 0; i < indent; ++i) {
    result = result + ' ';
  }
  return result;
}

export function normalizeLines(text: string): string {
  // 列表、标题等自带换行含义的markdown
  const blockElementPattern = /(?=\n *(\d+\.|-|\*|#|<) )\n/g;
  const htmlTagPattern = /\n(\s*<.*?>\s*)\n/g;
  return text.replace(blockElementPattern, '\n\n')
    .replace(htmlTagPattern, '\n\n$1\n\n');
}
