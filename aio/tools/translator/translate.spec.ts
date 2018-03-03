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
});
