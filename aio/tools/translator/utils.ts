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

export function isOnlyBeginTag(text: string) {
  return /^\s*<\w+>\s*$/.test(text);
}

export function originalIsNotOnlyBeginTag(entry: DictEntry): boolean {
  return !isOnlyBeginTag(entry.original);
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
  const oneLinePairedTagPattern = /\n( *)<(p|code-example|div|h\d+|a)( ?[^> \n]*)>([^<\n]*)<\/\2>( *)\n/g;
  text = text.replace(oneLinePairedTagPattern, '\n\n$1<$2$3>$4</$2>$5\n\n');
  const oneLineThTdTagPattern = /\n( *)<(th|td)( ?[^> \n]*)>([^<\n]*)<\/\2>( *)\n/g;
  text = text.replace(oneLineThTdTagPattern, '\n\n$1<$2$3>\n\n$1$4\n\n$1</$2>$5\n\n');
  const oneLineCommentPattern = /\n( *)(<!--.*-->)( *)\n/g;
  text = text.replace(oneLineCommentPattern, '\n\n$1$2$3\n\n');
  const atTagCommentPattern = /\n( *)({@a.*})( *)\n/g;
  text = text.replace(atTagCommentPattern, '\n\n$1$2$3\n\n');
  const oneLineClosedTagPattern = /\n( *)<(hr|p)(\/?)>( *)\n/g;
  text = text.replace(oneLineClosedTagPattern, '\n\n$1<$2$3>$4\n\n');
  const multiLinePairedTagPattern = /\n( *)<(header|p)( *[^> \n]*)>\n*(.*?)\n*( *)<\/\2>( *)\n/g;
  text = text.replace(multiLinePairedTagPattern, '\n\n$1<$2$3>\n\n$4\n\n$5</$2>$6\n\n');

  const multiLineCodePattern = /\n( *)```(\w*)( *)\n/g;
  text = text.replace(multiLineCodePattern, '\n\n$1```$2$3\n\n');

  const multipleBlankLinePattern = /\n\s*\n+/g;
  text = text.replace(multipleBlankLinePattern, '\n\n');
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
