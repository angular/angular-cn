import * as globby from 'globby';
import { DictEntry } from './dict-entry';
import {
  extractOriginalContent,
  isNotCnPages,
  isOnlyBeginTag, hasInlineText, kernelText,
  normalizeLines,
  originalIsNotChinese,
  originalIsNotCodeExampleTag,
  originalIsNotOnlyBeginTag,
  originalIsNotPureCloseTag,
  originalIsNotSpecialDivTag,
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

  const result: any[] = [];
  for (let i = 1; i < lines.length; ++i) {
    const translation = purifyText(lines[i]);
    if (hasInlineText(translation)) {
      const originalContent = extractOriginalContent(translation);
      result.push({
        key: kernelText(originalContent),
        original: originalContent,
        translation
      });
    } else if (isTranslation(translation)) {
      const original = purifyText(lines[i - 1]);
      // 对于包裹在 html tag 中的翻译文本进行特殊处理
      if (isOnlyBeginTag(original)) {
        const prevBeginTag = lines[i - 4].trim();
        const prevEndTag = lines[i - 2].trim();
        const thisEndTag = lines[i + 1].trim();
        if (original === prevBeginTag && prevEndTag === thisEndTag) {
          result.push({
            key: kernelText(lines[i - 3]),
            original: lines[i - 3],
            translation: lines[i],
          });
        }
      } else {
        result.push({key: kernelText(original), original, translation});
      }
    }
  }
  return result
    .filter(isNotCnPages)
    .filter(originalIsNotChinese)
    .filter(originalIsNotSpecialDivTag)
    .filter(originalIsNotCodeExampleTag)
    .filter(originalIsNotPureCloseTag)
    .filter(originalIsNotOnlyBeginTag)
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
    .replace(/^(.*)<code-example .*$/, '$1')
    .trim();
}

export function purifyEntry(entry: DictEntry): DictEntry {
  return {
    key: entry.key,
    original: purifyText(entry.original),
    translation: purifyText(entry.translation),
  };
}

export function gatherFromDirectory(directory: string, dictFile: string): DictEntry[] {
  const entries = gatherFromMarkdownFiles(directory);
  const dict = JSON.stringify(entries, null, 2);
  const fs = require('fs');
  fs.writeFileSync(dictFile, dict, 'utf-8');
  return entries;
}
