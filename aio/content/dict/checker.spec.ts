import { expect } from 'chai';
import { DictEntry } from './dict-entry';
import { gatherFromMarkdownFiles, isTranslation } from './extractor';

describe('auto check translations', function () {
  const entries = gatherFromMarkdownFiles(__dirname + '/../');
  it('should not have <code-example> in translation', function () {
    const codeExamples = entries.filter(entry => entry.translation.indexOf('<code-example') !== -1);
    expect(codeExamples).eql([]);
  });
  it('english should not be translations', function () {
    const lines = entries.filter(entry => isTranslation(entry.original))
      .filter(isNotImg)
      .filter(isNotCheatSheet)
      .filter(isNotMarketingDocs)
      .filter(isNotCnPages);
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
