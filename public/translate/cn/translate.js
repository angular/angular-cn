// TODO: refactor me!
var sourceVisible = localStorage.getItem('source-visible') === 'true';
(function ($) {
    var content = document.querySelector('article.docs-content');
    var footer = document.querySelector('.main-footer');

    processContainer(content);

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
                    if (processBlock(node)) {
                        i++;
                    }
                    break;
                case 'TD':
                case 'TH':
                    processContainer(node);
                    return; // stop
                default:
                    if (node.children.length > 0) {
                        processContainer(node);
                        // For <li><p>...</p></li>, processes it as block.
                        if (node.children.length === 1) {
                            if (processBlock(node)) {
                                i++;
                            }
                        }
                    }
                    break;
            }
        }
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
                    $current.addClass('original-english');
                    $sibling.addClass('translated');
                    $sibling.addClass('translated-cn');
                    $sibling.after($current);
                    $sibling.on('click', function() {
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
        return !/\p{Han}/.test(text);
    }

    function attributesToString(node) {
        return _.chain(node.attributes)
            .map(function (value) {
                if (value.name === 'id' || value.name === 'class') {
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
