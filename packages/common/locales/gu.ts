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
  'gu',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['ર', 'સો', 'મં', 'બુ', 'ગુ', 'શુ', 'શ'],
    [
      'રવિ', 'સોમ', 'મંગળ', 'બુધ', 'ગુરુ', 'શુક્ર',
      'શનિ'
    ],
    [
      'રવિવાર', 'સોમવાર', 'મંગળવાર', 'બુધવાર',
      'ગુરુવાર', 'શુક્રવાર', 'શનિવાર'
    ],
    ['ર', 'સો', 'મં', 'બુ', 'ગુ', 'શુ', 'શ']
  ],
  ,
  [
    [
      'જા', 'ફે', 'મા', 'એ', 'મે', 'જૂ', 'જુ', 'ઑ', 'સ', 'ઑ', 'ન',
      'ડિ'
    ],
    [
      'જાન્યુ', 'ફેબ્રુ', 'માર્ચ', 'એપ્રિલ', 'મે',
      'જૂન', 'જુલાઈ', 'ઑગસ્ટ', 'સપ્ટે', 'ઑક્ટો',
      'નવે', 'ડિસે'
    ],
    [
      'જાન્યુઆરી', 'ફેબ્રુઆરી', 'માર્ચ',
      'એપ્રિલ', 'મે', 'જૂન', 'જુલાઈ', 'ઑગસ્ટ',
      'સપ્ટેમ્બર', 'ઑક્ટોબર', 'નવેમ્બર',
      'ડિસેમ્બર'
    ]
  ],
  ,
  [
    ['ઇ સ પુ', 'ઇસ'], ['ઈ.સ.પૂર્વે', 'ઈ.સ.'],
    ['ઈસવીસન પૂર્વે', 'ઇસવીસન']
  ],
  0, [0, 0], ['d/M/yy', 'd MMM, y', 'd MMMM, y', 'EEEE, d MMMM, y'],
  ['hh:mm a', 'hh:mm:ss a', 'hh:mm:ss a z', 'hh:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    '{1} એ {0} વાગ્યે',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##,##0%', '¤#,##,##0.00', '[#E0]'], '₹',
  'ભારતીય રૂપિયા', {
    'JPY': ['JP¥', '¥'],
    'MUR': [, 'રૂ.'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$']
  },
  plural
];
