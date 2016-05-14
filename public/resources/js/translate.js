(function () {
  var nodes = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, header, a, button, small');
  _.each(nodes, function (node) {
    if (isTranslationResult(node)) {
      var prevNode = node.previousElementSibling;
      if (prevNode && isPureEnglish(prevNode.innerText) && !prevNode.classList.contains('nav-list-item')) {
        if (location.hostname === 'localhost') {
          prevNode.classList.add('original-english-debug');
        } else {
          prevNode.classList.add('original-english');
        }
        node.title = prevNode.innerText;
        node.id = prevNode.id;
        node.classList.add('translated');
        node.classList.add('translated-cn');
      }
    }
  });

  function isPureEnglish(text) {
    return /^[\1-\255—’“”ç]*$/.test(text);
  }

  function attributesToString(node) {
    return _.chain(node.attributes)
      .map(function (value) {
        if (value.name === 'id') {
          return '';
        } else {
          return value.name + '=' + value.value;
        }
      })
      .sortBy()
      .value()
      .join(';');
  }

  function isClonedNode(node1, node2) {
    return node1.tagName === node2.tagName &&
      attributesToString(node1) === attributesToString(node2);
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
    return indexOf(node) % 2 === 1 && prevNode && isClonedNode(node, prevNode) && isPureEnglish(prevNode.innerText);
  }
})();
