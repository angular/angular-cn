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
  'ca-AD',
  [
    ['a. m.', 'p. m.'],
    ,
  ],
  ,
  [
    ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'], ['dg.', 'dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.'],
    ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'],
    ['dg.', 'dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.']
  ],
  ,
  [
    ['GN', 'FB', 'MÇ', 'AB', 'MG', 'JN', 'JL', 'AG', 'ST', 'OC', 'NV', 'DS'],
    [
      'de gen.', 'de febr.', 'de març', 'd’abr.', 'de maig', 'de juny', 'de jul.', 'd’ag.',
      'de set.', 'd’oct.', 'de nov.', 'de des.'
    ],
    [
      'de gener', 'de febrer', 'de març', 'd’abril', 'de maig', 'de juny', 'de juliol',
      'd’agost', 'de setembre', 'd’octubre', 'de novembre', 'de desembre'
    ]
  ],
  [
    ['GN', 'FB', 'MÇ', 'AB', 'MG', 'JN', 'JL', 'AG', 'ST', 'OC', 'NV', 'DS'],
    [
      'gen.', 'febr.', 'març', 'abr.', 'maig', 'juny', 'jul.', 'ag.', 'set.', 'oct.', 'nov.',
      'des.'
    ],
    [
      'gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre',
      'novembre', 'desembre'
    ]
  ],
  [['aC', 'dC'], , ['abans de Crist', 'després de Crist']], 1, [6, 0],
  ['d/M/yy', 'd MMM y', 'd MMMM \'de\' y', 'EEEE, d MMMM \'de\' y'],
  ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss zzzz'],
  [
    '{1} {0}',
    '{1}, {0}',
    '{1} \'a\' \'les\' {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '€', 'euro', {
    'AUD': ['AU$', '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': ['¥'],
    'ESP': ['₧'],
    'JPY': ['JP¥', '¥'],
    'MXN': [, '$'],
    'THB': ['฿'],
    'USD': [, '$'],
    'VEF': [],
    'XCD': [, '$']
  },
  plural
];
