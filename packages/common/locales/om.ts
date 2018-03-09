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
  'om',
  [
    ['WD', 'WB'],
    ,
  ],
  ,
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'], ['Dil', 'Wix', 'Qib', 'Rob', 'Kam', 'Jim', 'San'],
    ['Dilbata', 'Wiixata', 'Qibxata', 'Roobii', 'Kamiisa', 'Jimaata', 'Sanbata'],
    ['Dil', 'Wix', 'Qib', 'Rob', 'Kam', 'Jim', 'San']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Ama', 'Gur', 'Bit', 'Elb', 'Cam', 'Wax', 'Ado', 'Hag', 'Ful', 'Onk', 'Sad', 'Mud'],
    [
      'Amajjii', 'Guraandhala', 'Bitooteessa', 'Elba', 'Caamsa', 'Waxabajjii', 'Adooleessa',
      'Hagayya', 'Fuulbana', 'Onkololeessa', 'Sadaasa', 'Muddee'
    ]
  ],
  , [['BCE', 'CE'], , ['Dheengadda Jeesu', 'CE']], 0, [6, 0],
  ['dd/MM/yy', 'dd-MMM-y', 'dd MMMM y', 'EEEE, MMMM d, y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'Br', 'Itoophiyaa Birrii',
  {'ETB': ['Br'], 'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural
];
