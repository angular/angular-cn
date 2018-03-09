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
  if (i === 1 && v === 0) return 1;
  if (!(v === 0) || n === 0 ||
      !(n === 1) && n % 100 === Math.floor(n % 100) && n % 100 >= 1 && n % 100 <= 19)
    return 3;
  return 5;
}

export default [
  'ro-MD',
  [
    ['a.m.', 'p.m.'],
    ,
  ],
  ,
  [
    ['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S'], ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
    ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'],
    ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ']
  ],
  ,
  [
    ['I', 'F', 'M', 'A', 'M', 'I', 'I', 'A', 'S', 'O', 'N', 'D'],
    [
      'ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.', 'iul.', 'aug.', 'sept.', 'oct.', 'nov.', 'dec.'
    ],
    [
      'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie',
      'octombrie', 'noiembrie', 'decembrie'
    ]
  ],
  , [['î.Hr.', 'd.Hr.'], , ['înainte de Hristos', 'după Hristos']], 1, [6, 0],
  ['dd.MM.y', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'L', 'leu moldovenesc', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'EUR': [, '€'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MDL': ['L'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VND': [, '₫'],
    'XCD': [, '$']
  },
  plural
];
