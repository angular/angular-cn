import { DictEntry } from './dict-entry';
import { isTranslation } from './extractor';
import * as _ from 'lodash';

export function translationHasNotCodeExample(entry: DictEntry): boolean {
  return entry.translation.indexOf('<code-example') === -1;
}

export function originalIsNotChinese(entry: DictEntry): boolean {
  return !isTranslation(entry.original);
}

export function originalIsNotSpecialDivTag(entry: DictEntry): boolean {
  return !/^<div class="\w+\b[^>\n]*>$/.test(entry.original);
}

export function originalIsNotCodeExampleTag(entry: DictEntry): boolean {
  return !/^<\/?code-example\b[^>\n]*>$/.test(entry.original);
}

export function originalIsNotPureCloseTag(entry: DictEntry): boolean {
  return !/^<\/(td|a|div|header|p|figure)>$/.test(entry.original);
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
  text = '\n' + text + '\n';
  // 为列表、标题等自带换行含义的markdown多加一个空行
  const blockElementPattern = /(?=\n *(\d+\.|-|\*) )\n/g;
  text = text.replace(blockElementPattern, '\n\n');
  const hxPattern = /(\n *#+ .*)(?=\n)/g;
  text = text.replace(hxPattern, '\n$1\n');
  const hxMultilinePattern = /(\n *)<(h\d+)([^>\n]*)>\n+ *(.*)\n+ *(<\/\2>)(?=\n)/g;
  text = text.replace(hxMultilinePattern, '\n$1<$2$3>$4</$2>\n');
  const oneLinePairedTagPattern = /\n( *)<(p|div|h\d+|code-example|section)( ?[^>\n]*)>([^<\n]*)<\/\2>( *)(?=\n)/g;
  text = text.replace(oneLinePairedTagPattern, '\n\n$1<$2$3>$4</$2>$5\n');
  const oneLineThTdTagPattern = /\n( *)(?!`)<(th|td|li)( ?[^>\n]*)>(?!`)(.*)<\/\2>( *)(?=\n)/g;
  text = text.replace(oneLineThTdTagPattern, '\n\n$1<$2$3>\n\n$1    $4\n\n$1</$2>$5\n');
  const oneLineCommentPattern = /\n( *)(<!--[\s\S]*?-->)( *)(?=\n)/g;
  text = text.replace(oneLineCommentPattern, '\n\n$1$2$3\n');
  const oneLineBrTagPattern = /\n( *)(<br class="clear">)( *)(?=\n)/g;
  text = text.replace(oneLineBrTagPattern, '\n\n$1$2$3\n');

  // 原文中有 back to top 被分成两行的情况，这里把它标准化一下
  const specialBackToTopPattern = /<a href="#toc">Back to top\s+<\/a>/g;
  text = text.replace(specialBackToTopPattern, '<a href="#toc">Back to top</a>');

  const backToTopPattern = /\n( *)(<a href="#toc">Back to top<\/a>)( *)(?=\n)/g;
  text = text.replace(backToTopPattern, '\n\n$1$2$3\n');
  const atTagCommentPattern = /\n( *)({@a.*})( *)(?=\n)/g;
  text = text.replace(atTagCommentPattern, '\n\n$1$2$3\n');
  const oneLineClosedTagPattern = /\n( *)<(hr)(\/?)>( *)(?=\n)/g;
  text = text.replace(oneLineClosedTagPattern, '\n\n$1<$2$3>$4\n');

  const trTagPattern = /( *)(<tr\b *[^>\n]*>)(.*)(<\/tr>)/g;
  text = text.replace(trTagPattern, '\n\n$1$2\n\n$1    $3\n\n$1$4\n\n');

  const thTdTagPattern = /( *)(?!`)<(th|td)\b( *[^>\n]*)>(?!`)([\s\S]*?)<\/\2>/g;
  text = text.replace(thTdTagPattern, '\n\n$1<$2$3>\n\n$1    $4\n\n$1</$2>\n\n');

  const blockTagPattern = /\n( *)(?!`)<(\/?)(td|th|div|code-example|code-tabs|h\d+|p|tr)\b( *[^>\n]*)>(?!`)( *)(?=\n)/g;
  text = text.replace(blockTagPattern, '\n\n$1<$2$3$4>$5\n');

  const multiLineCodePattern = /\n( *)```(\w*)( *)(?=\n)/g;
  text = text.replace(multiLineCodePattern, '\n\n$1```$2$3\n');

  const multipleBlankLinePattern = /\n\s*\n+/g;
  text = text.replace(multipleBlankLinePattern, '\n\n');

  text = text.replace(/^\n+/, '\n').replace(/\n+$/, '\n');

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

// 目前还不能正常工作
export function fuzzyTest(text1: string, text2: string): boolean {
  const tokens1 = tokenize(text1);
  const tokens2 = tokenize(text2);
  const sameTokens = _.intersection(tokens1, tokens2);
  const maxTokens = Math.max(tokens1.length, tokens2.length);
  return sameTokens.length > 5 && sameTokens.length / maxTokens >= 0.8;
}

export function exactlyTest(text1: string, text2: string): boolean {
  return kernelText(text1) === kernelText(text2);
}

export function kernelText(text: string): string {
  return text
    .replace(/[\s\n]+/g, '')
    .replace(/\.$/g, '')
    .toUpperCase()
    .trim();
}

export function tokenize(text: string): string[] {
  return text.split(/\W/)
    .map(token => token.trim())
    .filter(token => !!token);
}
