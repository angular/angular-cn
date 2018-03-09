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
  return 5;
}

export default [
  'kok',
  [
    ['म.पू.', 'म.नं.'],
    ,
  ],
  ,
  [
    ['आ', 'सो', 'मं', 'बु', 'गु', 'शु', 'शे'],
    [
      'आयतार', 'सोमार', 'मंगळार', 'बुधवार',
      'गुरुवार', 'शुक्रार', 'शेनवार'
    ],
    ,
    [
      'आय', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र',
      'शेन'
    ]
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    [
      'जानेवारी', 'फेब्रुवारी', 'मार्च',
      'एप्रिल', 'मे', 'जून', 'जुलाय', 'आगोस्त',
      'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर',
      'डिसेंबर'
    ],
  ],
  ,
  [
    ['क्रिस्तपूर्व', 'क्रिस्तशखा'],
    ,
  ],
  0, [0, 0], ['d-M-yy', 'dd-MM-y', 'd MMMM y', 'EEEE d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##,##0%', '¤ #,##,##0.00', '#E0'], '₹', 'INR',
  {'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural
];
