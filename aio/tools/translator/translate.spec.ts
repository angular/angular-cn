import { expect } from 'chai';
import { dirs } from './dirs';
import { kernelText, lookup, translate } from './translate';


describe('根据字典进行翻译', () => {
  it('抽取核心字符', function () {
    expect(kernelText(' # Forms   ABC ')).eql('# Forms ABC');
  });

  it('查字典', () => {
    expect(lookup('# Forms')[0].translation).eql('# 表单');
  });

  it('自动根据字典翻译单个文件', function () {
    const fs = require('fs');
    const content = fs.readFileSync(__dirname + '/../../../../content-en/' + 'guide/forms.md', 'utf-8');
    const result = translate(content);
    fs.writeFileSync(dirs.content + 'guide/forms.md', result.join('\n\n'), 'utf-8');
  });
});
