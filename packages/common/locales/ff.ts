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
  let i = Math.floor(Math.abs(n));
  if (i === 0 || i === 1) return 1;
  return 5;
}

export default [
  'ff',
  [
    ['subaka', 'kikiiɗe'],
    ,
  ],
  ,
  [
    ['d', 'a', 'm', 'n', 'n', 'm', 'h'], ['dew', 'aaɓ', 'maw', 'nje', 'naa', 'mwd', 'hbi'],
    ['dewo', 'aaɓnde', 'mawbaare', 'njeslaare', 'naasaande', 'mawnde', 'hoore-biir'],
    ['dew', 'aaɓ', 'maw', 'nje', 'naa', 'mwd', 'hbi']
  ],
  ,
  [
    ['s', 'c', 'm', 's', 'd', 'k', 'm', 'j', 's', 'y', 'j', 'b'],
    ['sii', 'col', 'mbo', 'see', 'duu', 'kor', 'mor', 'juk', 'slt', 'yar', 'jol', 'bow'],
    [
      'siilo', 'colte', 'mbooy', 'seeɗto', 'duujal', 'korse', 'morso', 'juko', 'siilto',
      'yarkomaa', 'jolal', 'bowte'
    ]
  ],
  , [['H-I', 'C-I'], , ['Hade Iisa', 'Caggal Iisa']], 1, [6, 0],
  ['d/M/y', 'd MMM, y', 'd MMMM y', 'EEEE d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'CFA', 'Mbuuɗu Seefaa BCEAO',
  {'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural
];
