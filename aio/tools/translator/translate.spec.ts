import { expect } from 'chai';
import { dirs } from './dirs';
import { dict, lookup, translate } from './translate';


describe('translate with dict', () => {
  it('should ignore wrong entry', function () {
    expect(dict.filter(entry => /^<div/.test(entry.original))).eql([]);
  });
  it('translate original english', () => {
    expect(lookup('# Forms')[0].translation).eql('# 表单');
  });

  it('should auto translate based on dict', function () {
    const fs = require('fs');
    const content = fs.readFileSync(dirs.content + 'guide/forms.md', 'utf-8');
    const result = translate(content);
    fs.writeFileSync(dirs.content + 'guide/forms.md', result.join('\n\n'), 'utf-8');
  });

});
