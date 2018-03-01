import { expect } from 'chai';
import { lookup } from './translate';


describe('translate with dict', () => {
  it('translate original english', () => {
    expect(lookup('# Forms')[0].translation).eql('# 表单');
  });
});
