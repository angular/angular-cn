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
  'zh-Hant-HK',
  [
    ['上午', '下午'],
    ,
  ],
  ,
  [
    ['日', '一', '二', '三', '四', '五', '六'],
    ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    ['日', '一', '二', '三', '四', '五', '六']
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
    ['西元前', '西元'],
    ['公元前', '公元'],
  ],
  0, [6, 0], ['d/M/y', 'y年M月d日', , 'y年M月d日EEEE'],
  ['ah:mm', 'ah:mm:ss', 'ah:mm:ss [z]', 'ah:mm:ss [zzzz]'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', '非數值', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'HK$', '港元',
  {'AUD': ['AU$', '$'], 'RON': [, 'L'], 'USD': ['US$', '$']}, plural
];
