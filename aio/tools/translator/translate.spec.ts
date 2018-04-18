import { expect } from 'chai';
import { lookup, translate } from './translate';


describe('根据字典进行翻译', () => {
  it('查字典', () => {
    expect(lookup('# Forms')[0].translation).eql('# 表单');
  });

  it('翻译 header', () => {
    expect(translate(`<header></header>`)).eql(``);
  });
});
