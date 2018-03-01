import * as _ from 'lodash';
import { DictEntry } from './dict-entry';

const dict1 = require('./dict-1.json') as DictEntry[];
const dict2 = require('./dict-2.json') as DictEntry[];
const dict3 = require('./dict-3.json') as DictEntry[];
export const dict = dict1.concat(dict2).concat(dict3).filter(entry => !/^\s*<div/.test(entry.original));

export function lookup(english: string, filename: RegExp = /.*/): DictEntry[] {
  return _.uniqBy(dict.filter(entry => filename.test(entry.sourceFile)).filter(entry => entry.original === english), 'translation');
}

export function translate(content: string): string[] {
  const lines = content.split(/\n+\s*\n+/);
  return lines
    .map(splitList)
    .map(flatten)
    .map(line => {
      if (!line.trim()) {
        return line;
      }
      const translations = lookup(line.trim(), /forms.md$/);
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

function splitList(line: string): string[] {
  const subLines = line.split(/\n/);
  // 把 markdown 里面不必空行的元素都拆开
  return [line];
}

export function flatten<T>(arr: T[]): T {
  return Array.prototype.concat.apply([], arr);
}
