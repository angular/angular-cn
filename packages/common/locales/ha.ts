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
  'ha',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['L', 'L', 'T', 'L', 'A', 'J', 'A'], ['Lah', 'Lit', 'Tal', 'Lar', 'Alh', 'Jum', 'Asa'],
    ['Lahadi', 'Litinin', 'Talata', 'Laraba', 'Alhamis', 'Jummaʼa', 'Asabar'],
    ['Lh', 'Li', 'Ta', 'Lr', 'Al', 'Ju', 'As']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'Y', 'Y', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Fab', 'Mar', 'Afi', 'May', 'Yun', 'Yul', 'Agu', 'Sat', 'Okt', 'Nuw', 'Dis'],
    [
      'Janairu', 'Faburairu', 'Maris', 'Afirilu', 'Mayu', 'Yuni', 'Yuli', 'Agusta', 'Satumba',
      'Oktoba', 'Nuwamba', 'Disamba'
    ]
  ],
  , [['KHAI', 'BHAI'], , ['Kafin haihuwar annab', 'Bayan haihuwar annab']], 1, [6, 0],
  ['d/M/yy', 'd MMM, y', 'd MMMM, y', 'EEEE, d MMMM, y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], '₦', 'Naira',
  {'JPY': ['JP¥', '¥'], 'NGN': ['₦'], 'USD': ['US$', '$']}, plural
];
