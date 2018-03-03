import { expect } from 'chai';
import { normalizeLines } from './utils';

describe(' 工具函数', () => {
  it('把“1. ”列表处理成空行分隔的格式，以便处理', function () {
    const lines = normalizeLines('1. abc\n11. def\n');
    expect(lines).eql('1. abc\n\n11. def\n');
  });

  it('把“- ”列表处理成空行分隔的格式，以便处理', function () {
    const lines = normalizeLines('- abc\n- def\n');
    expect(lines).eql('- abc\n\n- def\n');
  });

  it('把“* ”列表处理成空行分隔的格式，以便处理', function () {
    const lines = normalizeLines('* abc\n* def\n');
    expect(lines).eql('* abc\n\n* def\n');
  });

  it('把“# ”标题处理成空行分隔的格式，以便处理', function () {
    const lines = normalizeLines(`\n# abc
def`);
    expect(lines).eql('\n\n# abc\n\ndef');
  });

  it('把 html tag 拆解开', function () {
    const lines = normalizeLines(`
  <header>
    Angular forms don't require a style library
  </header>
`);
    expect(lines).eq(`

  <header>

    Angular forms don't require a style library


  </header>

`);
  });

  it('不要拆解行内的 html tag', function () {
    expect(normalizeLines(`\na <b> c\n\n`)).eql('\na <b> c\n\n');
  });
  it('把连续的三行及以上空行简化为两个空行', function () {
    const lines = normalizeLines(`\n  a  \n\n\n b `);
    expect(lines).eql(`\n  a  \n\n b `);
  });
});
