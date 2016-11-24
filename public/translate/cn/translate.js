// TODO: refactor me!
var sourceVisible = localStorage.getItem('source-visible') === 'true';
(function ($) {
  var content = document.querySelector('article');
  var footer = document.querySelector('.main-footer');
  processContainer(content);
  processContainer(footer);

  if (!sourceVisible) {
    var nodes = document.querySelectorAll('.original-english');
    _.each(nodes, function (node) {
      $(node).addClass('hidden');
    });
  }

  // restore
  content.style.display = 'block';
  footer.style.display = 'block';

  /**
   * Process container recursively.
   * @param container
   */
  function processContainer(container) {
    var count = 0;
    for (var i = 0; i < container.children.length; i++) {
      var node = container.children[i];

      // ignore example code.
      if (node.classList.contains('code-example') ||
        node.tagName === 'CODE-EXAMPLE') {
        continue;
      }

      switch (node.tagName) {
        case 'P':
        case 'H1':
        case 'H2':
        case 'H3':
        case 'H4':
        case 'H5':
        case 'H6':
        case 'HEADER':
          count++;
          if (processBlock(node)) {
            i++;
            count++;
          }
          break;
        case 'TD':
        case 'TH':
        case 'UL':
        case 'OL':
          processContainer(node);
          break;
        default:
          if (node.innerText === 'Back to top') {
            var x = 0;
          }
          if (node.children.length > 0) {
            // For <li><p>...</p></li>, processes it as block.
            if (processContainer(node) <= 1) {
              if (processBlock(node)) {
                i++;
              }
            } else {
              count++;
            }
          } else {
            if (node.tagName === 'A' && node.classList.contains('to-top')) {
              if (processBlock(node)) {
                i++;
              }
            }
          }
          break;
      }
    }

    return count;
  }

  /**
   * Process block elements. The first element is original english, the
   * second element is translated one.
   * @param current the first element.
   * @returns {boolean} Is success?
   */
  function processBlock(current) {
    var sibling = current.nextElementSibling;
    var $current = $(current);
    var $sibling = $(sibling);

    if (sibling) {
      if (sibling.tagName === 'LI') {
        processBlock(sibling);
      }

      if (isClonedNode(current, sibling)) {
        if (isPureEnglish(current.textContent)) {
          $current.addClass('original-english');
          $sibling.addClass('translated');
          $sibling.addClass('translated-cn');
          $sibling.after($current);
          $sibling.on('click', function (event) {
            // for nested structure.
            event.stopPropagation();
            $current.toggleClass('hidden');
          });
          return true;
        }

        console.error('Error: ' + current.innerText);
      }
    }

    return false;
  }

  function isPureEnglish(text) {
    if(text){
      return !/\p{Han}/.test(text);
    }
    return false;

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
})(angular.element);
