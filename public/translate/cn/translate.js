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
  if (content) {
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
    var count = 0;
    for (var i = 0; i < container.children.length; i++) {
      var node = container.children[i];
      var ignoredTagNames = ['CODE-EXAMPLE', 'SCRIPT', 'CODE', 'EM'];
      // ignore example code.
      if (node.classList.contains('code-example') ||
        ignoredTagNames.indexOf(node.tagName) >= 0) {
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
        case 'DIV':
          processContainer(node);
          break;
        default:
          if (processContainer(node) <= 1) {
            if (processBlock(node)) {
              i++;
              count++;
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
      if (isClonedNode(current, sibling)) {
        if (isPureEnglish(current.textContent)) {
          if (sibling.children) {
            processContainer(sibling);
          }
          if(!isPureEnglish(sibling.textContent)){
            $current.addClass('original-english');
            $sibling.addClass('translated');
            $sibling.addClass('translated-cn');
            $sibling.after($current);
            $sibling.on('click', function (event) {
              // for nested structure.
              event.stopPropagation();
              $current.toggleClass('hidden');
            });
            // addSpacingBetweenCnAndEn(sibling);
            return true;
          }
          
        }
      }
    }

    return false;
  }

  function isPureEnglish(text) {
    if (text) {
      text = text.replace('在线例子', '');
      return /^[\1-\255—’“”ç®…à\u200B]*$/.test(text);
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
    return node1.tagName === node2.tagName && node1.tagName !== 'TR' &&
      attributesToString(node1) === attributesToString(node2);
  }

  // function addSpacingBetweenCnAndEn(nodeCn) {
  //     var text = nodeCn.innerHTML;
  //     text = text.replace(/([\x20-\xff]+)/g, function (word) {
  //         if (!word.replace(/\s/, '')) {
  //             return '';
  //         } else if (/<[^>]*>/.test(word)) {
  //             return ' ' + word + ' ';
  //         } else {
  //             return ' ' + word + ' ';
  //         }
  //     });
  //     nodeCn.innerHTML = text;
  // }
})(angular.element);
