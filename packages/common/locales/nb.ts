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
  'nb',
  [
    ['a', 'p'],
    ['a.m.', 'p.m.'],
  ],
  [
    ['a.m.', 'p.m.'],
    ,
  ],
  [
    ['S', 'M', 'T', 'O', 'T', 'F', 'L'], ['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.'],
    ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    ['sø.', 'ma.', 'ti.', 'on.', 'to.', 'fr.', 'lø.']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['jan.', 'feb.', 'mar.', 'apr.', 'mai', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'des.'],
    [
      'januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober',
      'november', 'desember'
    ]
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
    [
      'januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober',
      'november', 'desember'
    ]
  ],
  [['f.Kr.', 'e.Kr.'], , ['før Kristus', 'etter Kristus']], 1, [6, 0],
  ['dd.MM.y', 'd. MMM y', 'd. MMMM y', 'EEEE d. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  ['{1}, {0}', , '{1} \'kl\'. {0}', '{1} {0}'],
  [',', ' ', ';', '%', '+', '−', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '¤ #,##0.00', '#E0'], 'kr', 'norske kroner', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NOK': ['kr'],
    'NZD': [, '$'],
    'RON': [, 'L'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VND': [, '₫'],
    'XAF': [],
    'XCD': [, '$'],
    'XPF': []
  },
  plural
];
