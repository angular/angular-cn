import { expect } from 'chai';
import { DictEntry } from './dict-entry';
import { dirs } from './dirs';
import { gatherFromMarkdownFiles, isTranslation } from './extractor';

describe('auto check translations', function () {
  const entries = gatherFromMarkdownFiles(dirs.content)
    .filter(isNotCheatSheet)
    .filter(isNotMarketingDocs)
    .filter(isNotCnPages);

  it('should not have <code-example> in translation', function () {
    const codeExamples = entries.filter(entry => entry.translation.indexOf('<code-example') !== -1);
    expect(codeExamples).eql([]);
  });

  it('english should not be translations', function () {
    const lines = entries.filter(entry => isTranslation(entry.original))
      .filter(isNotImg);
    expect(lines).eql([]);
  });

  it('should have same head level', function () {
    const lines = entries
      .filter(entry => isHead(entry.original) && isHead(entry.translation))
      .filter(entry => {
        const originalLevel = entry.original.replace(/^(#+).*$/, '$1').length;
        const translationLevel = entry.translation.replace(/^(#+).*$/, '$1').length;
        return originalLevel !== translationLevel;
      });

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
