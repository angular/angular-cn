var sourceVisible = localStorage.getItem('source-visible') === 'true';
(function ($) {
  var content = document.querySelector('article');
  var footer = document.querySelector('.main-footer');

  processContainer(content);
  processContainer(footer);

  // restore
  if (content) {
    // default hidden by css
    content.style.display = 'block';
  }
  footer.style.display = 'block';

  /**
   * Process container recursively.
   * @param container
   */
  function processContainer(container) {
    if (!container) {
      return;
    }

    var nodes = container.querySelectorAll('p,h1,h2,h3,h4,h5,h6,header,a');
    for (var i in nodes) {
      (function (node) {
        if (isTranslation(node.textContent)) {
          var $translated = $(node);
          var prevNode = node.previousElementSibling;
          var $english = $(prevNode);
          if (isCorrespondingNode(node, prevNode) && !isTranslation(prevNode.textContent)) {
            var id = $english.attr('id');
            if (id) {
              $translated.attr('id', id);
              $english.removeAttr('id');
            }
            $translated.after($english);
            $translated.addClass('translated');
            $translated.addClass('translated-cn');
            $english.addClass('original-english');
            if (!sourceVisible) {
              $english.addClass('hidden');
            }

            $translated.on('click', function (event) {
              $english.toggleClass('hidden');
            });
          }
        }
      })(nodes[i]);
    }
  }

  function isTranslation(text) {
    return text && /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]/.test(text);
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

  function isCorrespondingNode(node1, node2) {
    return node1 && node2 && node1.tagName === node2.tagName &&
      attributesToString(node1) === attributesToString(node2);
  }
})(angular.element);
