const {addIdForHeaders, markAndSwapAll} = require('@awesome-fe/translate');

const {JSDOM} = require('jsdom');

const selectorGroups = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'section', 'p', 't'];

function mark(text) {
  const dom = new JSDOM(text);
  const body = dom.window.document.body;
  addIdForHeaders(body);
  markAndSwapAll(body, selectorGroups);
  return body.innerHTML;
}

module.exports = {
  mark,
};
