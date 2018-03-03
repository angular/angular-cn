import { expect } from 'chai';
import { normalizeLines } from './utils';

describe(' 工具函数', () => {
  it('把“- * 1. #”等处理成空行分隔的格式，以便处理', function () {
    const lines = normalizeLines('1. abc\n11. def\n');
    expect(lines).eql('1. abc\n\n11. def\n');
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

  it('把连续的三行及以上空行简化为两个空行', function () {
    const lines = normalizeLines(`\n  a  \n\n\n b `);
    expect(lines).eql(`\n  a  \n\n b `);
  });
});
