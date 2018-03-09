/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// THIS CODE IS GENERATED - DO NOT MODIFY
// See angular/tools/gulp-tasks/cldr/extract.js

function plural(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export default [
  'or', [['ପୂ', 'ଅ'], ['am', 'pm'], ['AM', 'PM']],
  [
    ['AM', 'ଅପରାହ୍ନ'],
    ['ପୂର୍ବାହ୍ନ', 'ଅପରାହ୍ନ'],
  ],
  [
    ['ର', 'ସୋ', 'ମ', 'ବୁ', 'ଗୁ', 'ଶୁ', 'ଶ'],
    [
      'ରବି', 'ସୋମ', 'ମଙ୍ଗଳ', 'ବୁଧ', 'ଗୁରୁ', 'ଶୁକ୍ର',
      'ଶନି'
    ],
    [
      'ରବିବାର', 'ସୋମବାର', 'ମଙ୍ଗଳବାର', 'ବୁଧବାର',
      'ଗୁରୁବାର', 'ଶୁକ୍ରବାର', 'ଶନିବାର'
    ],
    [
      'ରବି', 'ସୋମ', 'ମଙ୍ଗଳ', 'ବୁଧ', 'ଗୁରୁ', 'ଶୁକ୍ର',
      'ଶନି'
    ]
  ],
  ,
  [
    [
      'ଜା', 'ଫେ', 'ମା', 'ଅ', 'ମଇ', 'ଜୁ', 'ଜୁ', 'ଅ', 'ସେ', 'ଅ',
      'ନ', 'ଡି'
    ],
    [
      'ଜାନୁଆରୀ', 'ଫେବୃଆରୀ', 'ମାର୍ଚ୍ଚ',
      'ଅପ୍ରେଲ', 'ମଇ', 'ଜୁନ', 'ଜୁଲାଇ', 'ଅଗଷ୍ଟ',
      'ସେପ୍ଟେମ୍ବର', 'ଅକ୍ଟୋବର', 'ନଭେମ୍ବର',
      'ଡିସେମ୍ବର'
    ],
  ],
  , [['BC', 'AD'], , ['ଖ୍ରୀଷ୍ଟପୂର୍ବ', 'ଖ୍ରୀଷ୍ଟାବ୍ଦ']],
  0, [0, 0], ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{0} ଠାରେ {1}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##,##0%', '¤ #,##,##0.00', '#E0'], '₹', 'ଟଙ୍କା', {}, plural
];
