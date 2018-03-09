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
  if (n === 0) return 0;
  if ((i === 0 || i === 1) && !(n === 0)) return 1;
  return 5;
}

export default [
  'lag',
  [
    ['TOO', 'MUU'],
    ,
  ],
  ,
  [
    ['P', 'T', 'E', 'O', 'A', 'I', 'M'],
    ['Píili', 'Táatu', 'Íne', 'Táano', 'Alh', 'Ijm', 'Móosi'],
    ['Jumapíiri', 'Jumatátu', 'Jumaíne', 'Jumatáano', 'Alamíisi', 'Ijumáa', 'Jumamóosi'],
    ['Píili', 'Táatu', 'Íne', 'Táano', 'Alh', 'Ijm', 'Móosi']
  ],
  ,
  [
    ['F', 'N', 'K', 'I', 'I', 'I', 'M', 'V', 'S', 'I', 'S', 'S'],
    [
      'Fúngatɨ', 'Naanɨ', 'Keenda', 'Ikúmi', 'Inyambala', 'Idwaata', 'Mʉʉnchɨ', 'Vɨɨrɨ',
      'Saatʉ', 'Inyi', 'Saano', 'Sasatʉ'
    ],
    [
      'Kʉfúngatɨ', 'Kʉnaanɨ', 'Kʉkeenda', 'Kwiikumi', 'Kwiinyambála', 'Kwiidwaata',
      'Kʉmʉʉnchɨ', 'Kʉvɨɨrɨ', 'Kʉsaatʉ', 'Kwiinyi', 'Kʉsaano', 'Kʉsasatʉ'
    ]
  ],
  , [['KSA', 'KA'], , ['Kɨrɨsitʉ sɨ anavyaal', 'Kɨrɨsitʉ akavyaalwe']], 1, [6, 0],
  ['dd/MM/y', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], 'TSh', 'Shilíingi ya Taansanía',
  {'JPY': ['JP¥', '¥'], 'TZS': ['TSh'], 'USD': ['US$', '$']}, plural
];
