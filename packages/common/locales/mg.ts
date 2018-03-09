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
  if (n === Math.floor(n) && n >= 0 && n <= 1) return 1;
  return 5;
}

export default [
  'mg',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['A', 'A', 'T', 'A', 'A', 'Z', 'A'], ['Alah', 'Alats', 'Tal', 'Alar', 'Alak', 'Zom', 'Asab'],
    ['Alahady', 'Alatsinainy', 'Talata', 'Alarobia', 'Alakamisy', 'Zoma', 'Asabotsy'],
    ['Alah', 'Alats', 'Tal', 'Alar', 'Alak', 'Zom', 'Asab']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'Mey', 'Jon', 'Jol', 'Aog', 'Sep', 'Okt', 'Nov', 'Des'],
    [
      'Janoary', 'Febroary', 'Martsa', 'Aprily', 'Mey', 'Jona', 'Jolay', 'Aogositra', 'Septambra',
      'Oktobra', 'Novambra', 'Desambra'
    ]
  ],
  , [['BC', 'AD'], , ['Alohan’i JK', 'Aorian’i JK']], 1, [6, 0],
  ['y-MM-dd', 'y MMM d', 'd MMMM y', 'EEEE d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], 'Ar', 'Ariary',
  {'JPY': ['JP¥', '¥'], 'MGA': ['Ar'], 'USD': ['US$', '$']}, plural
];
