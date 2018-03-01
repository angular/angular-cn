import * as globby from 'globby';

export function splitAndTrim(text = ''): string[] {
  return text.split(/\n+\s*\n+/).map(line => line.trim()).filter(line => !!line);
}

export function isTranslation(text) {
  return text &&
    /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]/.test(text);
}

export class DictEntry {
  original: string;
  translation: string;
  sourceFile: string;
}

export function gatherTranslations(text: string): DictEntry[] {
  const lines = splitAndTrim(text);

  const result = [];
  for (let i = 1; i < lines.length; ++i) {
    const translation = lines[i];
    const original = lines[i - 1];
    if (isTranslation(translation)) {
      result.push({original, translation});
    }
  }
  return result;
}

export function listMarkdownFiles(): string[] {
  return globby.sync(__dirname + '/../**/*.md');
}

export function gatherFromMarkdownFile(fileName: string): DictEntry[] {
  const fs = require('fs');
  const content = fs.readFileSync(fileName, 'utf-8');
  const entries = gatherTranslations(content);
  entries.forEach(entry => entry.sourceFile = fileName);
  return entries;
}

export function gatherFromMarkdownFiles(): DictEntry[] {
  const files = listMarkdownFiles();
  const entries = files.map(gatherFromMarkdownFile);
  return entries.reduce((result, value) => result.concat(value), []);
}

const entries = gatherFromMarkdownFiles();
const dict = JSON.stringify(entries, null, 2);
const fs = require('fs');
fs.writeFileSync(__dirname + '/dict-current.json', dict, 'utf-8');
