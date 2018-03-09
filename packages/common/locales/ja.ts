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
  'ja',
  [
    ['午前', '午後'],
    ,
  ],
  ,
  [
    ['日', '月', '火', '水', '木', '金', '土'], ,
    ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    ['日', '月', '火', '水', '木', '金', '土']
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    [
      '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月',
      '12月'
    ],
  ],
  ,
  [
    ['BC', 'AD'],
    ['紀元前', '西暦'],
  ],
  0, [6, 0], ['y/MM/dd', , 'y年M月d日', 'y年M月d日EEEE'],
  ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H時mm分ss秒 zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '￥', '日本円',
  {'CNY': ['元', '￥'], 'JPY': ['￥'], 'RON': [, 'レイ']}, plural
];
