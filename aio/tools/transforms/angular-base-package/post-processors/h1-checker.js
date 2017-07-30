const visit = require('unist-util-visit');
const is = require('hast-util-is-element');
const toString = require('hast-util-to-string');
const filter = require('unist-util-filter');

module.exports = function h1CheckerPostProcessor() {
  return (ast, file) => {
    file.headings = {
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      hgroup: []
    };
    visit(ast, node => {
      if (is(node, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hgroup'])) {
        file.headings[node.tagName].push(getText(node));
      }
    });

    if (file.headings.h1.length > 2) {
      file.fail(`More than two h1 found in ${file}`);
    } else if (file.headings.h1.length > 1) {
      file.title = file.headings.h1[1];
    } else if (file.headings.h1.length === 1) {
      file.title = file.headings.h1[0];
    }
  };
};

function getText(h1) {
  // Remove the aria-hidden anchor from the h1 node
  const cleaned = filter(h1, node => !(
    is(node, 'a') && node.properties &&
    (node.properties.ariaHidden === 'true' || node.properties['aria-hidden'] === 'true')
  ));

  return toString(cleaned);
}