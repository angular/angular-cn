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
  'tk', [['öň', 'soň'], ['go.öň', 'go.soň'], ['günortadan öň', 'günortadan soň']],
  [['öň', 'soň'], ['g.öň', 'g.soň'], ['günortadan öň', 'günortadan soň']],
  [
    ['Ý', 'D', 'S', 'Ç', 'P', 'A', 'Ş'], ['ýek', 'duş', 'siş', 'çar', 'pen', 'ann', 'şen'],
    ['ýekşenbe', 'duşenbe', 'sişenbe', 'çarşenbe', 'penşenbe', 'anna', 'şenbe'],
    ['ýb', 'db', 'sb', 'çb', 'pb', 'an', 'şb']
  ],
  [
    ['Ý', 'D', 'S', 'Ç', 'P', 'A', 'Ş'], ['Ýek', 'Duş', 'Siş', 'Çar', 'Pen', 'Ann', 'Şen'],
    ['Ýekşenbe', 'Duşenbe', 'Sişenbe', 'Çarşenbe', 'Penşenbe', 'Anna', 'Şenbe'],
    ['Ýb', 'Db', 'Sb', 'Çb', 'Pb', 'An', 'Şb']
  ],
  [
    ['Ý', 'F', 'M', 'A', 'M', 'I', 'I', 'A', 'S', 'O', 'N', 'D'],
    ['ýan', 'few', 'mart', 'apr', 'maý', 'iýun', 'iýul', 'awg', 'sen', 'okt', 'noý', 'dek'],
    [
      'ýanwar', 'fewral', 'mart', 'aprel', 'maý', 'iýun', 'iýul', 'awgust', 'sentýabr',
      'oktýabr', 'noýabr', 'dekabr'
    ]
  ],
  [
    ['Ý', 'F', 'M', 'A', 'M', 'I', 'I', 'A', 'S', 'O', 'N', 'D'],
    ['Ýan', 'Few', 'Mart', 'Apr', 'Maý', 'Iýun', 'Iýul', 'Awg', 'Sen', 'Okt', 'Noý', 'Dek'],
    [
      'Ýanwar', 'Fewral', 'Mart', 'Aprel', 'Maý', 'Iýun', 'Iýul', 'Awgust', 'Sentýabr',
      'Oktýabr', 'Noýabr', 'Dekabr'
    ]
  ],
  [['B.e.öň', 'B.e.'], , ['Isadan öň', 'Isadan soň']], 1, [6, 0],
  ['dd.MM.y', 'd MMM y', 'd MMMM y', 'd MMMM y EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'san däl', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'TMT', 'Türkmen manady',
  {'EUR': [, '€'], 'GBP': [, '£'], 'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural
];
