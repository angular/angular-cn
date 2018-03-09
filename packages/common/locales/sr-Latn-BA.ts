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
  return 5;
}

export default [
  'sr-Latn-BA',
  [
    ['a', 'p'],
    ['prije podne', 'po podne'],
  ],
  ,
  [
    ['n', 'p', 'u', 's', 'č', 'p', 's'], ['ned.', 'pon.', 'ut.', 'sr.', 'čet.', 'pet.', 'sub.'],
    ['nedjelja', 'ponedeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
    ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su']
  ],
  ,
  [
    ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
    ['jan.', 'feb.', 'mart', 'apr.', 'maj', 'jun', 'jul', 'avg.', 'sept.', 'okt.', 'nov.', 'dec.'],
    [
      'januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar',
      'novembar', 'decembar'
    ]
  ],
  , [['p.n.e.', 'n.e.'], ['p. n. e.', 'n. e.'], ['prije nove ere', 'nove ere']], 1, [6, 0],
  ['d.M.yy.', 'dd.MM.y.', 'dd. MMMM y.', 'EEEE, dd. MMMM y.'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'KM',
  'Bosansko-hercegovačka konvertibilna marka', {
    'AUD': [, '$'],
    'BAM': ['KM'],
    'BYN': [, 'r.'],
    'GEL': [, 'ლ'],
    'KRW': [, '₩'],
    'NZD': [, '$'],
    'TWD': ['NT$'],
    'USD': ['US$', '$'],
    'VND': [, '₫']
  },
  plural
];
