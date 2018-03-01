import * as _ from 'lodash';
import { DictEntry } from './dict-entry';

const dict1 = require('./dict-1.json') as DictEntry[];
const dict2 = require('./dict-2.json') as DictEntry[];
const dict3 = require('./dict-3.json') as DictEntry[];
const dict = dict1.concat(dict2).concat(dict3);

export function lookup(english: string, filename: RegExp = /.*/): DictEntry[] {
  return _.uniqBy(dict.filter(entry => filename.test(entry.sourceFile)).filter(entry => entry.original === english), 'translation');
}
