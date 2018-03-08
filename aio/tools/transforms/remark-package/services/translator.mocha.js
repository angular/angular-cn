const { expect } = require('chai');

const { mark, addTranslationAttributes, addIdsToHn } = require('./translator');

describe('translator', () => {
  it('mark translation results and origins', () => {
    expect(addTranslationAttributes(`<h2 class="no-toc" id="one-or-two">One or two</h2>
<h2 class="no-toc" id="一或二">一或二</h2>`))
      .eql(`<h2 translation-origin="off"  class="no-toc" id="one-or-two">One or two</h2>
<h2 translation-result  class="no-toc" id="一或二">一或二</h2>`);
  });

  it('should add ids for translation', function () {
    expect(addIdsToHn(`<h2 translation-origin="off"  class="no-toc">One or two</h2>
<h2 translation-result  class="no-toc">一或二</h2>`)).eql(`<h2 translation-origin="off"  class="no-toc">One or two</h2>
<h2 translation-result  class="no-toc" id="one-or-two">一或二</h2>`);
  });
});
