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
  if (n === Math.floor(n) && n >= 0 && n <= 1) return 1;
  return 5;
}

export default [
  'ti',
  [
    ['ንጉሆ ሰዓተ', 'ድሕር ሰዓት'],
    ,
  ],
  ,
  [
    ['ሰ', 'ሰ', 'ሰ', 'ረ', 'ሓ', 'ዓ', 'ቀ'],
    ['ሰን', 'ሰኑ', 'ሰሉ', 'ረቡ', 'ሓሙ', 'ዓር', 'ቀዳ'],
    ['ሰንበት', 'ሰኑይ', 'ሠሉስ', 'ረቡዕ', 'ኃሙስ', 'ዓርቢ', 'ቀዳም'],
    ['ሰን', 'ሰኑ', 'ሰሉ', 'ረቡ', 'ሓሙ', 'ዓር', 'ቀዳ']
  ],
  [
    ['ሰ', 'ሰ', 'ሠ', 'ረ', 'ሓ', 'ዓ', 'ቀ'],
    ['ሰን', 'ሰኑ', 'ሰሉ', 'ረቡ', 'ሓሙ', 'ዓር', 'ቀዳ'],
    ['ሰንበት', 'ሰኑይ', 'ሰሉስ', 'ረቡዕ', 'ሓሙስ', 'ዓርቢ', 'ቀዳም'],
    ['ሰን', 'ሰኑ', 'ሰሉ', 'ረቡ', 'ሓሙ', 'ዓር', 'ቀዳ']
  ],
  [
    ['ጥ', 'ለ', 'መ', 'ሚ', 'ግ', 'ሰ', 'ሓ', 'ነ', 'መ', 'ጥ', 'ሕ', 'ታ'],
    [
      'ጥሪ', 'ለካ', 'መጋ', 'ሚያ', 'ግን', 'ሰነ', 'ሓም', 'ነሓ', 'መስ',
      'ጥቅ', 'ሕዳ', 'ታሕ'
    ],
    [
      'ጥሪ', 'ለካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰነ',
      'ሓምለ', 'ነሓሰ', 'መስከረም', 'ጥቅምቲ', 'ሕዳር', 'ታሕሳስ'
    ]
  ],
  , [['ዓ/ዓ', 'ዓ/ም'], , ['ዓ/ዓ', 'ዓመተ ምህረት']], 0, [6, 0],
  ['dd/MM/yy', 'dd-MMM-y', 'dd MMMM y', 'EEEE፣ dd MMMM መዓልቲ y G'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'Br', 'የኢትዮጵያ ብር',
  {'ETB': ['Br'], 'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural
];
