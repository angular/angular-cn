(function () {
  var targets = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, header, a, button');
  _.each(targets, function (node) {
    if (isTranslationResult(node)) {
      var prevNode = node.previousElementSibling;
      if (prevNode && !prevNode.classList.contains('nav-list-item')) {
        prevNode.classList.add('hidden');
      }
      node.title = prevNode.innerText;
    }
  });

  function isOriginalEnglish(text) {
    return /[\1-\255⇨]/.test(text);
  }

  function isClonedNode(node1, node2) {
    return node1.parentNode === node2.parentNode && node1.tagName === node2.tagName && node1.className === node2.className;
  }

  function indexOf(node) {
    var i = 0;
    var aNode = node.parentNode.firstChild;
    while (aNode !== node) {
      ++i;
      if (aNode.tagName !== node.tagName) {
        i = 0;
      }
      aNode = aNode.nextElementSibling;
    }
    return i;
  }

  function isTranslationResult(node) {
    var prevNode = node.previousElementSibling;
    return indexOf(node) % 2 === 1 && prevNode && isClonedNode(node, prevNode) && isOriginalEnglish(prevNode.innerText);
  }
})();
