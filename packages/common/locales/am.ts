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
  if (i === 0 || n === 1) return 1;
  return 5;
}

export default [
  'am',
  [
    ['ጠ', 'ከ'],
    ['ጥዋት', 'ከሰዓት'],
  ],
  ,
  [
    ['እ', 'ሰ', 'ማ', 'ረ', 'ሐ', 'ዓ', 'ቅ'],
    ['እሑድ', 'ሰኞ', 'ማክሰ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'],
    ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'],
    ['እ', 'ሰ', 'ማ', 'ረ', 'ሐ', 'ዓ', 'ቅ']
  ],
  ,
  [
    ['ጃ', 'ፌ', 'ማ', 'ኤ', 'ሜ', 'ጁ', 'ጁ', 'ኦ', 'ሴ', 'ኦ', 'ኖ', 'ዲ'],
    [
      'ጃንዩ', 'ፌብሩ', 'ማርች', 'ኤፕሪ', 'ሜይ', 'ጁን', 'ጁላይ',
      'ኦገስ', 'ሴፕቴ', 'ኦክቶ', 'ኖቬም', 'ዲሴም'
    ],
    [
      'ጃንዩወሪ', 'ፌብሩወሪ', 'ማርች', 'ኤፕሪል', 'ሜይ', 'ጁን',
      'ጁላይ', 'ኦገስት', 'ሴፕቴምበር', 'ኦክቶበር', 'ኖቬምበር',
      'ዲሴምበር'
    ]
  ],
  , [['ዓ/ዓ', 'ዓ/ም'], , ['ዓመተ ዓለም', 'ዓመተ ምሕረት']], 0, [6, 0],
  ['dd/MM/y', 'd MMM y', 'd MMMM y', 'EEEE ፣d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'ብር', 'የኢትዮጵያ ብር', {
    'AUD': ['AU$', '$'],
    'CNH': ['የቻይና ዩዋን'],
    'ETB': ['ብር'],
    'JPY': ['JP¥', '¥'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$']
  },
  plural
];
