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

  it('拆解单行的成对 tag', function () {
    const lines = normalizeLines(`
    a
    <div class="abc">DEF</div>
    b
`);
    expect(lines).eql(`
    a

    <div class="abc">DEF</div>

    b
`);
  });

  it('拆解单行的自封闭 tag', function () {
    const lines = normalizeLines(`
    a
    <hr/>
    b
`);
    expect(lines).eql(`
    a

    <hr/>

    b
`);
  });
  it('拆解单行的 h\\d 标签', function () {
    const lines = normalizeLines(`
    a
    <h3 id="abc">line</h3>
    b
`);
    expect(lines).eql(`
    a

    <h3 id="abc">line</h3>

    b
`);
  });

  it('拆解单行的 th 标签', function () {
    const lines = normalizeLines(`
    a
    <th>line</th>
    b
`);
    expect(lines).eql(`
    a

    <th>

    line

    </th>

    b
`);
  });

  it('拆解单行注释', function () {
    const lines = normalizeLines(`
    a
    <!-- no -->
    b
`);
    expect(lines).eql(`
    a

    <!-- no -->

    b
`);
  });

  it('拆解 @a 标记', function () {
    const lines = normalizeLines(`
    a
    {@a test}
    b
`);
    expect(lines).eql(`
    a

    {@a test}

    b
`);
  });

  it('拆解多行代码', function () {
    const lines = normalizeLines(`
    a
    \`\`\`
      var a = 1
    \`\`\`
    b
`);
    expect(lines).eql(`
    a

    \`\`\`

      var a = 1

    \`\`\`

    b
`);
  });

  it('拆解多行的成对 tag', function () {
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

  it('拆解多行的成对 tag', function () {
    const lines = normalizeLines(`
    <p>
    a
    </p>

    <p>
    一
</p>

`);
    expect(lines).eq(`

    <p>

    a

    </p>

    <p>

    一

</p>

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
