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
  'es-BO',
  [
    ['a. m.', 'p. m.'],
    ,
  ],
  ,
  [
    ['d', 'l', 'm', 'm', 'j', 'v', 's'], ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
    ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA']
  ],
  [
    ['D', 'L', 'M', 'M', 'J', 'V', 'S'], ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
    ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA']
  ],
  [
    ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    [
      'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'
    ],
    [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre',
      'octubre', 'noviembre', 'diciembre'
    ]
  ],
  , [['a. C.', 'd. C.'], , ['antes de Cristo', 'después de Cristo']], 1, [6, 0],
  ['d/M/yy', 'd MMM \'de\' y', 'd \'de\' MMMM \'de\' y', 'EEEE, d \'de\' MMMM \'de\' y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    '{1}, {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '¤#,##0.00', '#E0'], 'Bs', 'boliviano', {
    'AUD': [, '$'],
    'BOB': ['Bs'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'ESP': ['₧'],
    'EUR': [, '€'],
    'FKP': [, 'FK£'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'RON': [, 'L'],
    'SSP': [, 'SD£'],
    'SYP': [, 'S£'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VEF': [, 'BsF'],
    'VND': [, '₫'],
    'XAF': [],
    'XCD': [, '$'],
    'XOF': []
  },
  plural
];
