import { expect } from 'chai';
import { DictEntry } from './dict-entry';
import { dirs } from './dirs';
import { gatherFromMarkdownFiles, isTranslation } from './extractor';

describe('自动检查翻译结果', function () {
  const entries = gatherFromMarkdownFiles(dirs.content)
    .filter(isNotCheatSheet)
    .filter(isNotMarketingDocs)
    .filter(isNotCnPages);

  it('译文里不应该出现 <code-example>', function () {
    const codeExamples = entries.filter(entry => entry.translation.indexOf('<code-example') !== -1);
    expect(codeExamples).eql([]);
  });

  it('原文中不应该有汉语', function () {
    const lines = entries.filter(entry => isTranslation(entry.original))
      .filter(isNotImg);
    expect(lines).eql([]);
  });

  it('原文和译文应该有相同的标题等级', function () {
    const lines = entries
      .filter(entry => isHead(entry.original) && isHead(entry.translation))
      .filter(entry => {
        const originalLevel = entry.original.replace(/^(#+).*$/, '$1').length;
        const translationLevel = entry.translation.replace(/^(#+).*$/, '$1').length;
        return originalLevel !== translationLevel;
      });

    expect(lines).eql([]);
  });

  it('原文不应该是以 <div 开头的', function () {
    const lines = entries.filter(entry => /^ *<div.*/.test(entry.original));
    expect(lines).eql([]);
  });
});

function isNotImg(entry: DictEntry): boolean {
  return !/^<(img|figure)/.test(entry.translation);
}

function isNotCheatSheet(entry: DictEntry): boolean {
  return !/cheatsheet.md$/.test(entry.sourceFile);
}

function isNotMarketingDocs(entry: DictEntry): boolean {
  return !/marketing\/docs.md$/.test(entry.sourceFile);
}

function isNotCnPages(entry: DictEntry): boolean {
  return !/cn\/.*?.md$/.test(entry.sourceFile);
}

function isHead(line: string): boolean {
  return /^#/.test(line);
}
