import { DictEntry } from './dict-entry';
import { isTranslation } from './extractor';

export function translationHasNotCodeExample(entry: DictEntry): boolean {
  return entry.translation.indexOf('<code-example') === -1;
}

export function originalIsNotChinese(entry: DictEntry): boolean {
  return !isTranslation(entry.original);
}

export function originalIsNotTag(entry: DictEntry): boolean {
  return !/^\s*<div.*/.test(entry.original);
}

export function originalIsOnlyTag(entry: DictEntry): boolean {
  return !/^\s*<\w+>\s*$/.test(entry.original);
}

export function isNotImg(entry: DictEntry): boolean {
  return !/^<(img|figure)/.test(entry.translation);
}

export function isNotCheatSheet(entry: DictEntry): boolean {
  return !/cheatsheet.md$/.test(entry.sourceFile);
}

export function isNotMarketingDocs(entry: DictEntry): boolean {
  return !/marketing\/docs.md$/.test(entry.sourceFile);
}

export function isNotCnPages(entry: DictEntry): boolean {
  return !/cn\/.*?.md$/.test(entry.sourceFile);
}

export function isHead(line: string): boolean {
  return /^#/.test(line);
}
