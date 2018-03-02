import { expect } from 'chai';
import { dirs } from './dirs';
import { gatherFromMarkdownFiles, gatherTranslations, listMarkdownFiles, splitAndTrim } from './extractor';

describe('从对照翻译文件中采集生成字典', () => {
  it('空字符串应该拆分成空数组', function () {
    expect(splitAndTrim()).eql([]);
  });
  it('按照双行（忽略空格）拆分对照文本', function () {
    const result = splitAndTrim(`a
    
    
    
    b
    c
    
    d`);
    expect(result[1]).eql(`b
    c`);
  });

  it('生成原文和译文的对照表', () => {
    const result = gatherTranslations(`
    a
    
    一
    
    b
    `);
    expect(result).eql([{original: 'a', translation: '一'}]);
  });

  it('从真实的文件中采集', function () {
    const fs = require('fs');
    const content = fs.readFileSync(dirs.content + 'guide/forms.md', 'utf-8');
    const result = gatherTranslations(content);
    expect(result[0]).eql({original: '# Forms', translation: '# 表单'});
  });

  it('递归查找所有 markdown 文件', function () {
    expect(listMarkdownFiles(dirs.content).length).greaterThan(10);
  });

  it('从对照文本的文件夹中采集生成字典（非测试）', () => {
    const entries = gatherFromMarkdownFiles(dirs.content);
    const dict = JSON.stringify(entries, null, 2);
    const fs = require('fs');
    fs.writeFileSync(dirs.here + 'dict-3.json', dict, 'utf-8');
    expect(entries.length).greaterThan(100);
  });

});

