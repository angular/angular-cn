const {Marker, defaultSelectors, DomDocumentFragment} = require('@awesome-fe/translate');

function mark(text) {
  const marker = new Marker([...defaultSelectors, (node) => node.isTagOf('header') || node.isTagOf('section')]);
  const doc = DomDocumentFragment.parse(text);
  marker.addIdForHeaders(doc);
  marker.markAndSwapAll(doc);
  return doc.toHtml();
}

module.exports = {
  mark,
};
