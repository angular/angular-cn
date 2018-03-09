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
  'wae',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['S', 'M', 'Z', 'M', 'F', 'F', 'S'], ['Sun', 'Män', 'Ziš', 'Mit', 'Fró', 'Fri', 'Sam'],
    ['Sunntag', 'Mäntag', 'Zištag', 'Mittwuč', 'Fróntag', 'Fritag', 'Samštag'],
    ['Sun', 'Män', 'Ziš', 'Mit', 'Fró', 'Fri', 'Sam']
  ],
  ,
  [
    ['J', 'H', 'M', 'A', 'M', 'B', 'H', 'Ö', 'H', 'W', 'W', 'C'],
    ['Jen', 'Hor', 'Mär', 'Abr', 'Mei', 'Brá', 'Hei', 'Öig', 'Her', 'Wím', 'Win', 'Chr'],
    [
      'Jenner', 'Hornig', 'Märze', 'Abrille', 'Meije', 'Bráčet', 'Heiwet', 'Öigšte',
      'Herbštmánet', 'Wímánet', 'Wintermánet', 'Chrištmánet'
    ]
  ],
  ,
  [
    ['v. Chr.', 'n. Chr'],
    ,
  ],
  1, [6, 0], ['y-MM-dd', 'd. MMM y', 'd. MMMM y', 'EEEE, d. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '’', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], 'CHF', 'CHF', {}, plural
];
