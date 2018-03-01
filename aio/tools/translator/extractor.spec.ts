import { expect } from 'chai';
import { dirs } from './dirs';
import { gatherFromMarkdownFiles, gatherTranslations, listMarkdownFiles, splitAndTrim } from './extractor';

describe('gather to dictionary', () => {
  it('should split empty string to empty array', function () {
    expect(splitAndTrim()).eql([]);
  });
  it('should should break by double line break', function () {
    const result = splitAndTrim(`a
    
    
    
    b
    c
    
    d`);
    expect(result[1]).eql(`b
    c`);
  });

  it('build map of original and translation', () => {
    const result = gatherTranslations(`
    a
    
    一
    
    b
    `);
    expect(result).eql([{original: 'a', translation: '一'}]);
  });

  it('should gather from real file', function () {
    const fs = require('fs');
    const content = fs.readFileSync(dirs.content + 'guide/forms.md', 'utf-8');
    const result = gatherTranslations(content);
    expect(result[0]).eql({original: '# Forms', translation: '# 表单'});
  });

  it('should list files recursive', function () {
    expect(listMarkdownFiles(dirs.content).length).greaterThan(10);
  });

  it('should gather from directory', () => {
    const entries = gatherFromMarkdownFiles(dirs.content);
    const dict = JSON.stringify(entries, null, 2);
    const fs = require('fs');
    fs.writeFileSync(dirs.here + 'dict-3.json', dict, 'utf-8');
    expect(entries.length).greaterThan(100);
  });

});

