import { expect } from 'chai';
import { fuzzyTest, hasInlineText, kernelText, normalizeLines, tokenize } from './utils';

describe(' 工具函数', () => {
  it('把“1. ”列表处理成空行分隔的格式，以便处理', function () {
    const lines = normalizeLines(`1. abc
11. def
`);
    expect(lines).eql(`1. abc

11. def`);
  });

  it('把“- ”列表处理成空行分隔的格式，以便处理', function () {
    const lines = normalizeLines(`- abc
- def
`);
    expect(lines).eql(`- abc

- def`);
  });

  it('把“* ”列表处理成空行分隔的格式，以便处理', function () {
    const lines = normalizeLines(`* abc
* def
`);
    expect(lines).eql(`* abc

* def`);
  });

  it('把“# ”标题处理成空行分隔的格式，以便处理', function () {
    const lines = normalizeLines(`\n# abc
def`);
    expect(lines).eql(`# abc

def`);
  });

  it('拆解单行的成对 tag', function () {
    const lines = normalizeLines(`
    a
    <div class="abc">DEF</div>
    b
`);
    expect(lines).eql(`a

    <div class="abc">DEF</div>

    b`);
  });

  it('拆解单行的自封闭 tag', function () {
    const lines = normalizeLines(`
    a
    <hr/>
    b
`);
    expect(lines).eql(`a

    <hr/>

    b`);
  });
  it('拆解单行的 h\\d 标签', function () {
    const lines = normalizeLines(`
    a
    <h3 id="abc">line</h3>
    b
`);
    expect(lines).eql(`a

    <h3 id="abc">line</h3>

    b`);
  });

  it('把多行 hn 处理成单行', function () {
    const lines = normalizeLines(`
    <h3 id="nav">
      abc
    </h3>
`);
    expect(lines).eql(`<h3 id="nav">abc</h3>`);
  });

  it('拆解单行的 th 标签', function () {
    const lines = normalizeLines(`
    a
    <th>line</th>
    b
`);
    expect(lines).eql(`a

    <th>

        line

    </th>

    b`);
  });

  it('拆解单行注释', function () {
    const lines = normalizeLines(`
    a
    <!-- no -->
    b
`);
    expect(lines).eql(`a

    <!-- no -->

    b`);
  });

  it('拆解多行注释', function () {
    const lines = normalizeLines(`
    a
    <!-- no
    abc -->
    b
`);
    expect(lines).eql(`a

    <!-- no
    abc -->

    b`);
  });

  it('拆解单行br', function () {
    const lines = normalizeLines(`
    a
    <br class="clear">
    b
`);
    expect(lines).eql(`a

    <br class="clear">

    b`);
  });

  it('拆解 code-example', function () {
    const lines = normalizeLines(`
abc
<code-example
language="sh" class="code-shell">
ng generate directive highlight
</code-example>
def
`);
    expect(lines).eql(`abc

<code-example
language="sh" class="code-shell">
ng generate directive highlight
</code-example>

def`);
  });

  it('不拆解引用的 code-example', function () {
    const lines = normalizeLines(`
abc

> <code-example > abc </code-example>

def
`);
    expect(lines).eql(`abc

> <code-example > abc </code-example>

def`);
  });

  it('为单行的 li 和 ul 前后添加空行', function () {
    const lines = normalizeLines(`
    a
    <li>
    b
    </li>
    c
    <ul>

</ul>
    `);
    expect(normalizeLines(lines)).eql(`a

    <li>

    b

    </li>

    c

    <ul>

</ul>`);
  });
  it('拆解 @a 标记', function () {
    const lines = normalizeLines(`
    a
    {@a test}
    b
`);
    expect(lines).eql(`a

    {@a test}

    b`);
  });

  it('拆解多行代码', function () {
    const lines = normalizeLines(`
    a
    \`\`\`
      var a = 1
    \`\`\`
    b
`);
    expect(lines).eql(`a

    \`\`\`

      var a = 1

    \`\`\`

    b`);
  });

  it('把多行的 p 元素合并成单行', function () {
    const lines = normalizeLines(`
    <p>
        a
    </p>
    <p>
    一
</p>

`);
    expect(lines).eq(`<p>a</p>

    <p>一</p>`);
  });

  it('不要拆解 header', function () {
    const lines = normalizeLines(`
  <header>Angular forms don't require a style library</header>
`);
    expect(lines).eq(`<header>Angular forms don't require a style library</header>`);
  });

  it('拆解独行的 th/td', function () {
    expect(normalizeLines(`
  <td>
    abc
  </td>
`)).eql(`<td>

    abc

  </td>`);
  });

  it('拆解 pre', function () {
    expect(normalizeLines(`
    ABC
    <pre>def</pre>
    ghi
`)).eql(`ABC

    <pre>def</pre>

    ghi`);
  });

  it('拆解任意位置的 <tr>', function () {
    expect(normalizeLines(`
  <tr><td>abc</td></tr>
`)).eql(`<tr>

      <td>

          abc

      </td>

  </tr>`);
  });
  it('拆解独行的 li', function () {
    expect(normalizeLines(`
<ul>
<li><a href="#">a</a></li>
<li><a href="#">b</a></li>
<li><a href="#">c</a></li>
</ul>

`)).eql(`<ul>

<li>

    <a href="#">a</a>

</li>

<li>

    <a href="#">b</a>

</li>

<li>

    <a href="#">c</a>

</li>

</ul>`);
  });
  it('不要拆解行内的 html tag', function () {
    expect(normalizeLines(`
a <b> c

`)).eql(`a <b> c`);
  });
  it('把连续的三行及以上空行简化为两个空行', function () {
    const lines = normalizeLines(`
  a  


 b`);
    expect(lines).eql(`a  

 b`);
  });

  it('拆分', function () {
    expect(tokenize('abc def,abc.')).eql(['abc', 'def', 'abc']);
  });

  it('抽取核心字符', function () {
    expect(kernelText(' # Forms   ABC. ')).eql('#FORMSABC');
  });

  it('删除非核心字符', function () {
    expect(kernelText('Abc-132-@#!abc')).eql('ABC132#ABC');
  });

  it('模糊匹配', function () {
    expect(fuzzyTest(`a b c d e`, `a b c d e`)).is.false;
    expect(fuzzyTest(`a b c d e f g`, `a b c d e`)).is.false;
    expect(fuzzyTest(`Make that easy by encapsulating the _click-triggering_ process in a helper such as the \`click\` function below:`,
      `Make that consistent and easy by encapsulating the _click-triggering_ process 
in a helper such as the \`click()\` function below:
`)).is.true;
  });

  it('检测是否表格', function () {
    expect(hasInlineText(`
abc | def
----|---
gh  | ij
`)).eql(true);
  });
});
