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
  return 5;
}

export default [
  'gl',
  [
    ['a.m.', 'p.m.'],
    ,
  ],
  ,
  [
    ['d.', 'l.', 'm.', 'm.', 'x.', 'v.', 's.'],
    ['dom.', 'luns', 'mar.', 'mér.', 'xov.', 'ven.', 'sáb.'],
    ['domingo', 'luns', 'martes', 'mércores', 'xoves', 'venres', 'sábado'],
    ['do.', 'lu.', 'ma.', 'mé.', 'xo.', 've.', 'sá.']
  ],
  [
    ['D', 'L', 'M', 'M', 'X', 'V', 'S'], ['Dom.', 'Luns', 'Mar.', 'Mér.', 'Xov.', 'Ven.', 'Sáb.'],
    ['Domingo', 'Luns', 'Martes', 'Mércores', 'Xoves', 'Venres', 'Sábado'],
    ['Do', 'Lu', 'Ma', 'Mé', 'Xo', 'Ve', 'Sá']
  ],
  [
    ['x.', 'f.', 'm.', 'a.', 'm.', 'x.', 'x.', 'a.', 's.', 'o.', 'n.', 'd.'],
    [
      'xan.', 'feb.', 'mar.', 'abr.', 'maio', 'xuño', 'xul.', 'ago.', 'set.', 'out.', 'nov.',
      'dec.'
    ],
    [
      'xaneiro', 'febreiro', 'marzo', 'abril', 'maio', 'xuño', 'xullo', 'agosto', 'setembro',
      'outubro', 'novembro', 'decembro'
    ]
  ],
  [
    ['X', 'F', 'M', 'A', 'M', 'X', 'X', 'A', 'S', 'O', 'N', 'D'],
    [
      'Xan.', 'Feb.', 'Mar.', 'Abr.', 'Maio', 'Xuño', 'Xul.', 'Ago.', 'Set.', 'Out.', 'Nov.',
      'Dec.'
    ],
    [
      'Xaneiro', 'Febreiro', 'Marzo', 'Abril', 'Maio', 'Xuño', 'Xullo', 'Agosto', 'Setembro',
      'Outubro', 'Novembro', 'Decembro'
    ]
  ],
  [['a.C.', 'd.C.'], , ['antes de Cristo', 'despois de Cristo']], 1, [6, 0],
  ['dd/MM/yy', 'dd/MM/y', 'd \'de\' MMMM \'de\' y', 'EEEE, d \'de\' MMMM \'de\' y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{0}, {1}',
    ,
    '{0} \'do\' {1}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'Euro', {
    'ESP': ['₧'],
    'JPY': ['JP¥', '¥'],
    'KMF': [, 'FC'],
    'MXN': ['$MX', '$'],
    'RUB': [, 'руб'],
    'THB': ['฿'],
    'TWD': ['NT$']
  },
  plural
];
