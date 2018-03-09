import { expect } from 'chai';
import { dirs } from './dirs';
import { gatherFromMarkdownFiles } from './extractor';
import {
  isHead,
  isNotCheatSheet,
  isNotCnPages,
  isNotImg,
  isNotMarketingDocs,
  originalIsNotChinese,
  originalIsNotSpecialDivTag,
  translationHasNotCodeExample,
} from './utils';

describe('自动检查翻译结果', function () {
  const entries = gatherFromMarkdownFiles(dirs.content)
    .filter(isNotCheatSheet)
    .filter(isNotMarketingDocs)
    .filter(isNotCnPages);

  it('译文里不应该出现 <code-example>', function () {
    const codeExamples = entries.filter(translationHasNotCodeExample);
    expect(codeExamples).eql([]);
  });

  it('原文中不应该有汉语', function () {
    const lines = entries.filter(originalIsNotChinese)
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
    const lines = entries.filter(originalIsNotSpecialDivTag);
    expect(lines).eql([]);
  });
});
