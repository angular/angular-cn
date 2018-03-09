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
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (v === 0 && i % 100 === 1) return 1;
  if (v === 0 && i % 100 === 2) return 2;
  if (v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 3 && i % 100 <= 4 || !(v === 0))
    return 3;
  return 5;
}

export default [
  'sl',
  [
    ['d', 'p'],
    ['dop.', 'pop.'],
  ],
  [['d', 'p'], ['dop.', 'pop.'], ['dopoldne', 'popoldne']],
  [
    ['n', 'p', 't', 's', 'č', 'p', 's'], ['ned.', 'pon.', 'tor.', 'sre.', 'čet.', 'pet.', 'sob.'],
    ['nedelja', 'ponedeljek', 'torek', 'sreda', 'četrtek', 'petek', 'sobota'],
    ['ned.', 'pon.', 'tor.', 'sre.', 'čet.', 'pet.', 'sob.']
  ],
  ,
  [
    ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
    ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'avg.', 'sep.', 'okt.', 'nov.', 'dec.'],
    [
      'januar', 'februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september',
      'oktober', 'november', 'december'
    ]
  ],
  , [['pr. Kr.', 'po Kr.'], , ['pred Kristusom', 'po Kristusu']], 1, [6, 0],
  ['d. MM. yy', 'd. MMM y', 'dd. MMMM y', 'EEEE, dd. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '−', 'e', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'evro', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'GBP': [, '£'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'XCD': [, '$']
  },
  plural
];
