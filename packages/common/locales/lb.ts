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
  'lb',
  [
    ['mo.', 'nomë.'],
    ['moies', 'nomëttes'],
  ],
  [
    ['moies', 'nomëttes'],
    ,
  ],
  [
    ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
    ['Son.', 'Méi.', 'Dën.', 'Mët.', 'Don.', 'Fre.', 'Sam.'],
    ['Sonndeg', 'Méindeg', 'Dënschdeg', 'Mëttwoch', 'Donneschdeg', 'Freideg', 'Samschdeg'],
    ['So.', 'Mé.', 'Dë.', 'Më.', 'Do.', 'Fr.', 'Sa.']
  ],
  [
    ['S', 'M', 'D', 'M', 'D', 'F', 'S'], ['Son', 'Méi', 'Dën', 'Mët', 'Don', 'Fre', 'Sam'],
    ['Sonndeg', 'Méindeg', 'Dënschdeg', 'Mëttwoch', 'Donneschdeg', 'Freideg', 'Samschdeg'],
    ['So.', 'Mé.', 'Dë.', 'Më.', 'Do.', 'Fr.', 'Sa.']
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    [
      'Jan.', 'Feb.', 'Mäe.', 'Abr.', 'Mee', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'
    ],
    [
      'Januar', 'Februar', 'Mäerz', 'Abrëll', 'Mee', 'Juni', 'Juli', 'August', 'September',
      'Oktober', 'November', 'Dezember'
    ]
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mäe', 'Abr', 'Mee', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    [
      'Januar', 'Februar', 'Mäerz', 'Abrëll', 'Mee', 'Juni', 'Juli', 'August', 'September',
      'Oktober', 'November', 'Dezember'
    ]
  ],
  [
    ['v. Chr.', 'n. Chr.'],
    ,
  ],
  1, [6, 0], ['dd.MM.yy', 'd. MMM y', 'd. MMMM y', 'EEEE, d. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'Euro',
  {'ATS': ['öS'], 'AUD': ['AU$', '$'], 'THB': ['฿'], 'TWD': ['NT$']}, plural
];
