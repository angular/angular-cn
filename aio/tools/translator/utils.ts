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
  return !/cheatsheet.md$/.test(entry.sourceFile!!);
}

export function isNotMarketingDocs(entry: DictEntry): boolean {
  return !/marketing\/docs.md$/.test(entry.sourceFile!!);
}

export function isNotCnPages(entry: DictEntry): boolean {
  return !/cn\/.*?.md$/.test(entry.sourceFile!!);
}

export function isHead(line: string): boolean {
  return /^#/.test(line);
}

export function normalizeLines(text: string): string {
  // 原文中有 back to top 被分成两行的情况，这里把它标准化一下
  const specialBackToTopPattern = /<a href="#toc">Back to top\s+<\/a>/g;
  text = text.replace(specialBackToTopPattern, '<a href="#toc">Back to top</a>');
  // 原文中有</table，为它补齐
  text = text.replace(/^ *<\/table$/gm, '</table>');
  // 原文中有的换行会干扰生成 html 的格式，替换一下
  // tslint:disable:max-line-length
  text = text.replace(`<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get them now</a> if they're not already installed on your machine.
`, `<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">Get them now</a> if they're not already installed on your machine.
`);

  // 为各种列表多加一个空行
  const listElementPattern = /(?=\n *(\d+\.|-|\*) )\n/g;
  text = text.replace(listElementPattern, '\n\n');
  // 为标题增加空行
  const hxPattern = /^( *#+ .*)$/gm;
  text = text.replace(hxPattern, '\n$1\n');
  // 把多行的 HTML 标题或 p 元素变成单行
  const hxMultilinePattern = /^( *)<(h\d|p|header)([^>]*)>\s*(.*)\s*<\/\2>$/gm;
  text = text.replace(hxMultilinePattern, '\n$1<$2$3>$4</$2>\n');
  // 为单行的成对标签前后添加空行
  const oneLinePairedTagPattern = /^( *)<(p|div|h\d+|code-example|section)\b([^>]*)>([^\n]*?)<\/\2>( *)$/gm;
  text = text.replace(oneLinePairedTagPattern, '\n$1<$2$3>$4</$2>$5\n');
  // 为单行的注释前后添加空行
  const oneLineCommentPattern = /^( *<!--[\s\S]*?--> *)$/gm;
  text = text.replace(oneLineCommentPattern, '\n$1\n');
  // 为单行的 back to top 前后添加空行
  const backToTopPattern = /^( *<a href="#toc">Back to top<\/a> *)$/gm;
  text = text.replace(backToTopPattern, '\n$1\n');
  // 为单行的 {@ 语句前后添加空行
  const atTagCommentPattern = /^( *{@a.*} *)$/gm;
  text = text.replace(atTagCommentPattern, '\n$1\n');
  // 为单行的自封闭标签前后添加空行
  const oneLineClosedTagPattern = /^( *<hr *\/?>) *$/gm;
  text = text.replace(oneLineClosedTagPattern, '\n$1\n');
  // 为单行的 <br class="clear"> 前后添加空行
  const oneLineBrTagPattern = /^( *<br class="clear"> *)$/gm;
  text = text.replace(oneLineBrTagPattern, '\n$1\n');
  // 为单独的 div 前后添加空行
  const oneLineDivTagPattern = /^( *<\/?(div|li|ul|ol)\b([^>]*)> *)$/gm;
  text = text.replace(oneLineDivTagPattern, '\n$1\n');
  // 在 pre 前后添加空行
  const preBeginTagPattern = /(^ *<pre)/gm;
  text = text.replace(preBeginTagPattern, '\n$1');
  const preEndTagPattern = /(<\/pre> *)$/gm;
  text = text.replace(preEndTagPattern, '$1\n');

  // 为 ``` 前后添加空行
  const multiLineCodePattern = /^( *```\w* *)$/gm;
  text = text.replace(multiLineCodePattern, '\n$1\n');

  // 把单行的 tr 拆成多行，以便翻译
  const trTagPattern = /^( *)(<tr\b[^>]*>)(.*)(<\/tr>)$/gm;
  text = text.replace(trTagPattern, '\n$1$2\n\n$1    $3\n\n$1$4\n');

  // 把单行的 th/td/li 等拆成多行，以便翻译，
  const oneLineThTdTagPattern = /^( *)<(th|td|li)\b([^>]*)>(.*?)<\/\2>$/gm;
  text = text.replace(oneLineThTdTagPattern, '\n$1<$2$3>\n\n$1    $4\n\n$1</$2>\n');

  // 把原本就是多行的 th/td 中间添加空行
  const thTdTagPattern = /^( *)<(th|td)\b( *[^>]*)>([\s\S]*?)<\/\2>$/gm;
  text = text.replace(thTdTagPattern, '\n\n$1<$2$3>\n\n$1    $4\n\n$1</$2>\n\n');

  // 在所有的起始标签前面加空行
  const blockBeginTagPattern = /^( *)<(code-example|code-tabs|pre|p)\b( *[^>]*)>( *)$/gm;
  text = text.replace(blockBeginTagPattern, '\n$1<$2$3>$4');

  // 在所有的结束标签前面加空行
  const blockEndTagPattern = /^( *)<\/(code-example|code-tabs|pre|p)>( *)$/gm;
  text = text.replace(blockEndTagPattern, '$1</$2>$3\n');

  // 把所有由空格组成的空行都去掉
  const blankLinePattern = /^[ \t]+$/gm;
  text = text.replace(blankLinePattern, '');
  // 把中间的多个回车都变成两个回车
  const multipleBlankLinePattern = /\n{2,}/g;
  text = text.replace(multipleBlankLinePattern, '\n\n');

  // 去掉全文头尾的空白
  text = text.trim();
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

export function exactlyTest(key: string, text: string): boolean {
  return !!key && key === text;
}

export function kernelText(text: string): string {
  return text
    .replace(/([^a-zA-Z0-9#:]|\s|\.$)/g, '')
    .toUpperCase()
    .trim();
}

export function tokenize(text: string): string[] {
  return text.split(/\W/)
    .map(token => token.trim())
    .filter(token => !!token);
}

export function hasInlineText(text: string): boolean {
  return /<t>(.*?)<\/t> *<t>.*?<\/t>/g.test(text);
}

export function extractOriginalContent(text: string): string {
  if (!hasInlineText(text)) {
    return text;
  }
  return text.replace(/<t>(.*?)<\/t> *<t>.*?<\/t>/gi, '$1')
    .replace(/ +/g, ' ');
}
