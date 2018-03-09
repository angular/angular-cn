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
  if (n === 2) return 2;
  return 5;
}

export default [
  'smn',
  [
    ['ip.', 'ep.'],
    ,
  ],
  ,
  [
    ['p', 'V', 'M', 'K', 'T', 'V', 'L'], ['pas', 'vuo', 'maj', 'kos', 'tuo', 'vás', 'láv'],
    [
      'pasepeeivi', 'vuossaargâ', 'majebaargâ', 'koskoho', 'tuorâstuv', 'vástuppeeivi',
      'lávurduv'
    ],
    ['pa', 'vu', 'ma', 'ko', 'tu', 'vá', 'lá']
  ],
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'], ['pas', 'vuo', 'maj', 'kos', 'tuo', 'vás', 'láv'],
    [
      'pasepeivi', 'vuossargâ', 'majebargâ', 'koskokko', 'tuorâstâh', 'vástuppeivi',
      'lávurdâh'
    ],
    ['pa', 'vu', 'ma', 'ko', 'tu', 'vá', 'lá']
  ],
  [
    ['U', 'K', 'NJ', 'C', 'V', 'K', 'S', 'P', 'Č', 'R', 'S', 'J'],
    [
      'uđiv', 'kuovâ', 'njuhčâ', 'cuáŋui', 'vyesi', 'kesi', 'syeini', 'porge', 'čohčâ',
      'roovvâd', 'skammâ', 'juovlâ'
    ],
    [
      'uđđâivemáánu', 'kuovâmáánu', 'njuhčâmáánu', 'cuáŋuimáánu', 'vyesimáánu',
      'kesimáánu', 'syeinimáánu', 'porgemáánu', 'čohčâmáánu', 'roovvâdmáánu',
      'skammâmáánu', 'juovlâmáánu'
    ]
  ],
  , [['oKr.', 'mKr.'], , ['Ovdil Kristus šoddâm', 'maŋa Kristus šoddâm']], 1, [6, 0],
  ['d.M.y', 'MMM d. y', 'MMMM d. y', 'cccc, MMMM d. y'],
  ['H.mm', 'H.mm.ss', 'H.mm.ss z', 'H.mm.ss zzzz'],
  [
    '{1} {0}',
    '{1} \'tme\' {0}',
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'epiloho', '.'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'euro',
  {'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural
];
