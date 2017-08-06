// TODO: replace mocha with jasmine
const { expect } = require('chai');

const { mark} = require('./translator');

it('mark translation results and origins', () => {
  expect(mark('<h1>AngularJS to Angular</h1>\n<h1>从 AngularJS 到 Angular 快速参考</h1>'))
    .equal('<h1 translation-origin=off >AngularJS to Angular</h1>\n<h1 translation-result >从 AngularJS 到 Angular 快速参考</h1>');
});
