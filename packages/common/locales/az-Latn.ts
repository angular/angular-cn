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
  'az-Latn',
  [
    ['a', 'p'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['7', '1', '2', '3', '4', '5', '6'], ['B.', 'B.E.', 'Ç.A.', 'Ç.', 'C.A.', 'C.', 'Ş.'],
    [
      'bazar', 'bazar ertəsi', 'çərşənbə axşamı', 'çərşənbə', 'cümə axşamı',
      'cümə', 'şənbə'
    ],
    ['B.', 'B.E.', 'Ç.A.', 'Ç.', 'C.A.', 'C.', 'Ş.']
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avq', 'sen', 'okt', 'noy', 'dek'],
    [
      'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr',
      'noyabr', 'dekabr'
    ]
  ],
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avq', 'sen', 'okt', 'noy', 'dek'],
    [
      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr',
      'Noyabr', 'Dekabr'
    ]
  ],
  [['e.ə.', 'y.e.'], , ['eramızdan əvvəl', 'yeni era']], 1, [6, 0],
  ['dd.MM.yy', 'd MMM y', 'd MMMM y', 'd MMMM y, EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], '₼', 'Azərbaycan Manatı', {
    'AZN': ['₼'],
    'JPY': ['JP¥', '¥'],
    'RON': [, 'ley'],
    'SYP': [, 'S£'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$']
  },
  plural
];
