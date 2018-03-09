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
  'kab',
  [
    ['n tufat', 'n tmeddit'],
    ,
  ],
  ,
  [
    ['Y', 'S', 'K', 'K', 'S', 'S', 'S'], ['Yan', 'San', 'Kraḍ', 'Kuẓ', 'Sam', 'Sḍis', 'Say'],
    ['Yanass', 'Sanass', 'Kraḍass', 'Kuẓass', 'Samass', 'Sḍisass', 'Sayass'],
    ['Yan', 'San', 'Kraḍ', 'Kuẓ', 'Sam', 'Sḍis', 'Say']
  ],
  ,
  [
    ['Y', 'F', 'M', 'Y', 'M', 'Y', 'Y', 'Ɣ', 'C', 'T', 'N', 'D'],
    ['Yen', 'Fur', 'Meɣ', 'Yeb', 'May', 'Yun', 'Yul', 'Ɣuc', 'Cte', 'Tub', 'Nun', 'Duǧ'],
    [
      'Yennayer', 'Fuṛar', 'Meɣres', 'Yebrir', 'Mayyu', 'Yunyu', 'Yulyu', 'Ɣuct', 'Ctembeṛ',
      'Tubeṛ', 'Nunembeṛ', 'Duǧembeṛ'
    ]
  ],
  , [['snd. T.Ɛ', 'sld. T.Ɛ'], , ['send talalit n Ɛisa', 'seld talalit n Ɛisa']], 6, [5, 6],
  ['d/M/y', 'd MMM, y', 'd MMMM y', 'EEEE d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00¤', '#E0'], 'DA', 'Adinar Azzayri',
  {'DZD': ['DA'], 'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural
];
