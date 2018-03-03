import { expect } from 'chai';
import { dirs } from './dirs';
import { kernelText, lookup, translateDirectory, translateFile } from './translate';


describe('根据字典进行翻译', () => {
  it('抽取核心字符', function () {
    expect(kernelText(' # Forms   ABC ')).eql('# Forms ABC');
  });

  it('查字典', () => {
    expect(lookup('# Forms')[0].translation).eql('# 表单');
  });

  it('自动根据字典翻译单个文件（测试）', function () {
    translateFile(__dirname + '/../../../../content-en/' + 'guide/forms.md', dirs.content + 'guide/forms.md');
  });

  it('自动根据字典翻译所有文件（非测试）', function () {
    translateDirectory(__dirname + '/../../../../content-en/', dirs.content);
  });
});
