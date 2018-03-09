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
  'kl',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'], ['sab', 'ata', 'mar', 'pin', 'sis', 'tal', 'arf'],
    [
      'sabaat', 'ataasinngorneq', 'marlunngorneq', 'pingasunngorneq', 'sisamanngorneq',
      'tallimanngorneq', 'arfininngorneq'
    ],
    ['sab', 'ata', 'mar', 'pin', 'sis', 'tal', 'arf']
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
    [
      'januari', 'februari', 'martsi', 'aprili', 'maji', 'juni', 'juli', 'augustusi', 'septemberi',
      'oktoberi', 'novemberi', 'decemberi'
    ]
  ],
  ,
  [
    ['BCE', 'CE'],
    ,
  ],
  1, [6, 0], ['y-MM-dd', 'y MMM d', 'y MMMM d', 'y MMMM d, EEEE'],
  ['HH.mm', 'HH.mm.ss', 'HH.mm.ss z', 'HH.mm.ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '¤#,##0.00;¤-#,##0.00', '#E0'], 'kr.', 'DKK',
  {'DKK': ['kr.', 'kr'], 'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural
];
