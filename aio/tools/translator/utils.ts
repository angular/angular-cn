import { DictEntry } from './dict-entry';
import { isTranslation } from './extractor';

export function translationHasNotCodeExample(entry: DictEntry): boolean {
  return entry.translation.indexOf('<code-example') === -1;
}

export function originalIsNotChinese(entry: DictEntry): boolean {
  return !isTranslation(entry.original);
}

export function isTagLine(text: string) {
  return /^\s*<\/?\w+.*/.test(text);
}

export function originalIsNotTag(entry: DictEntry): boolean {
  return !isTagLine(entry.original);
}

export function isOnlyTag(text: string) {
  return /^\s*<\w+>\s*$/.test(text);
}

export function originalIsOnlyTag(entry: DictEntry): boolean {
  return !isOnlyTag(entry.original);
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

export function normalizeLines(text: string): string {
  // 列表、标题等自带换行含义的markdown
  const blockElementPattern = /(?=\n *(\d+\.|-|\*) )\n/g;
  text = text.replace(blockElementPattern, '\n\n');
  const hxPattern = /(\n *#.*)\n/g;
  text = text.replace(hxPattern, '\n$1\n\n');
  const leadHxPattern = /^( *#.*)\n/g;
  text = text.replace(leadHxPattern, '$1\n\n');
  const htmlTagPattern = /(\s*)<(\/?\w+)(.*?)>(\s*?)\n/g;
  text = text.replace(htmlTagPattern, (line, _1, _2, _3, _4) => {
    if (_2 === 'a') {
      return line;
    } else {
      return `\n\n${line}\n\n`;
    }
  });
  text = text.replace(/\n\s*\n+/g, '\n\n');
  return text;
}

export function indentOf(line): number {
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

export function repeat(indent: number): string {
  let result = '';
  for (let i = 0; i < indent; ++i) {
    result = result + ' ';
  }
  return result;
}
