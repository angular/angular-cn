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
  'te',
  [
    ['ఉ', 'సా'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['ఆ', 'సో', 'మ', 'బు', 'గు', 'శు', 'శ'],
    [
      'ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర',
      'శని'
    ],
    [
      'ఆదివారం', 'సోమవారం', 'మంగళవారం',
      'బుధవారం', 'గురువారం', 'శుక్రవారం',
      'శనివారం'
    ],
    [
      'ఆది', 'సోమ', 'మం', 'బుధ', 'గురు', 'శుక్ర',
      'శని'
    ]
  ],
  ,
  [
    [
      'జ', 'ఫి', 'మా', 'ఏ', 'మే', 'జూ', 'జు', 'ఆ', 'సె', 'అ', 'న',
      'డి'
    ],
    [
      'జన', 'ఫిబ్ర', 'మార్చి', 'ఏప్రి', 'మే',
      'జూన్', 'జులై', 'ఆగ', 'సెప్టెం', 'అక్టో',
      'నవం', 'డిసెం'
    ],
    [
      'జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్',
      'మే', 'జూన్', 'జులై', 'ఆగస్టు',
      'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్',
      'డిసెంబర్'
    ]
  ],
  ,
  [
    ['క్రీపూ', 'క్రీశ'], ,
    ['క్రీస్తు పూర్వం', 'క్రీస్తు శకం']
  ],
  0, [0, 0], ['dd-MM-yy', 'd MMM, y', 'd MMMM, y', 'd, MMMM y, EEEE'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    '{1} {0}కి',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##0%', '¤#,##,##0.00', '#E0'], '₹', 'రూపాయి',
  {'JPY': ['JP¥', '¥'], 'THB': ['฿'], 'TWD': ['NT$']}, plural
];
