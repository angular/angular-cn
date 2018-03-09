/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// THIS CODE IS GENERATED - DO NOT MODIFY
// See angular/tools/gulp-tasks/cldr/extract.js

import {registerLocaleData} from '../src/i18n/locale_data';

function plural_af(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_af = [
  'af',
  [
    ['v', 'n'],
    ['vm.', 'nm.'],
  ],
  ,
  [
    ['S', 'M', 'D', 'W', 'D', 'V', 'S'], ['So.', 'Ma.', 'Di.', 'Wo.', 'Do.', 'Vr.', 'Sa.'],
    ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
    ['So.', 'Ma.', 'Di.', 'Wo.', 'Do.', 'Vr.', 'Sa.']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan.', 'Feb.', 'Mrt.', 'Apr.', 'Mei', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Des.'],
    [
      'Januarie', 'Februarie', 'Maart', 'April', 'Mei', 'Junie', 'Julie', 'Augustus', 'September',
      'Oktober', 'November', 'Desember'
    ]
  ],
  , [['v.C.', 'n.C.'], , ['voor Christus', 'na Christus']], 0, [6, 0],
  ['y-MM-dd', 'dd MMM y', 'dd MMMM y', 'EEEE, dd MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'R', 'Suid-Afrikaanse rand', {
    'JPY': ['JP¥', '¥'],
    'MXN': [, '$'],
    'RON': [, 'leu'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$'],
    'ZAR': ['R']
  },
  plural_af
];

function plural_am(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === 0 || n === 1) return 1;
  return 5;
}

export const locale_am = [
  'am',
  [
    ['ጠ', 'ከ'],
    ['ጥዋት', 'ከሰዓት'],
  ],
  ,
  [
    ['እ', 'ሰ', 'ማ', 'ረ', 'ሐ', 'ዓ', 'ቅ'], ['እሑድ', 'ሰኞ', 'ማክሰ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'],
    ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'], ['እ', 'ሰ', 'ማ', 'ረ', 'ሐ', 'ዓ', 'ቅ']
  ],
  ,
  [
    ['ጃ', 'ፌ', 'ማ', 'ኤ', 'ሜ', 'ጁ', 'ጁ', 'ኦ', 'ሴ', 'ኦ', 'ኖ', 'ዲ'],
    ['ጃንዩ', 'ፌብሩ', 'ማርች', 'ኤፕሪ', 'ሜይ', 'ጁን', 'ጁላይ', 'ኦገስ', 'ሴፕቴ', 'ኦክቶ', 'ኖቬም', 'ዲሴም'],
    [
      'ጃንዩወሪ', 'ፌብሩወሪ', 'ማርች', 'ኤፕሪል', 'ሜይ', 'ጁን', 'ጁላይ', 'ኦገስት', 'ሴፕቴምበር', 'ኦክቶበር', 'ኖቬምበር',
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
  plural_am
];

function plural_ar(n: number): number {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (n % 100 === Math.floor(n % 100) && n % 100 >= 3 && n % 100 <= 10) return 3;
  if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 99) return 4;
  return 5;
}

export const locale_ar = [
  'ar',
  [
    ['ص', 'م'],
    ,
  ],
  [['ص', 'م'], , ['صباحًا', 'مساءً']],
  [
    ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'], ,
    ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
  ],
  ,
  [
    ['ي', 'ف', 'م', 'أ', 'و', 'ن', 'ل', 'غ', 'س', 'ك', 'ب', 'د'],
    [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر',
      'نوفمبر', 'ديسمبر'
    ],
  ],
  , [['ق.م', 'م'], , ['قبل الميلاد', 'ميلادي']], 6, [5, 6],
  ['d\u200f/M\u200f/y', 'dd\u200f/MM\u200f/y', 'd MMMM y', 'EEEE، d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '\u200e%\u200e', '\u200e+', '\u200e-', 'E', '×', '‰', '∞', 'ليس رقمًا', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], 'ج.م.\u200f', 'جنيه مصري', {
    'AED': ['د.إ.\u200f'],
    'ARS': [, 'AR$'],
    'AUD': ['AU$'],
    'BBD': [, 'BB$'],
    'BHD': ['د.ب.\u200f'],
    'BMD': [, 'BM$'],
    'BND': [, 'BN$'],
    'BSD': [, 'BS$'],
    'BZD': [, 'BZ$'],
    'CAD': ['CA$'],
    'CLP': [, 'CL$'],
    'CNY': ['CN¥'],
    'COP': [, 'CO$'],
    'CUP': [, 'CU$'],
    'DOP': [, 'DO$'],
    'DZD': ['د.ج.\u200f'],
    'EGP': ['ج.م.\u200f', 'E£'],
    'FJD': [, 'FJ$'],
    'GBP': ['£', 'UK£'],
    'GYD': [, 'GY$'],
    'HKD': ['HK$'],
    'IQD': ['د.ع.\u200f'],
    'IRR': ['ر.إ.'],
    'JMD': [, 'JM$'],
    'JOD': ['د.أ.\u200f'],
    'JPY': ['JP¥'],
    'KWD': ['د.ك.\u200f'],
    'KYD': [, 'KY$'],
    'LBP': ['ل.ل.\u200f', 'L£'],
    'LYD': ['د.ل.\u200f'],
    'MAD': ['د.م.\u200f'],
    'MRO': ['أ.م.\u200f'],
    'MXN': ['MX$'],
    'NZD': ['NZ$'],
    'OMR': ['ر.ع.\u200f'],
    'QAR': ['ر.ق.\u200f'],
    'SAR': ['ر.س.\u200f'],
    'SBD': [, 'SB$'],
    'SDD': ['د.س.\u200f'],
    'SDG': ['ج.س.'],
    'SRD': [, 'SR$'],
    'SYP': ['ل.س.\u200f', '£'],
    'THB': ['฿'],
    'TND': ['د.ت.\u200f'],
    'TTD': [, 'TT$'],
    'TWD': ['NT$'],
    'USD': ['US$'],
    'UYU': [, 'UY$'],
    'XXX': ['***'],
    'YER': ['ر.ي.\u200f']
  },
  plural_ar
];

function plural_ar_DZ(n: number): number {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (n % 100 === Math.floor(n % 100) && n % 100 >= 3 && n % 100 <= 10) return 3;
  if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 99) return 4;
  return 5;
}

export const locale_ar_DZ = [
  'ar-DZ',
  [
    ['ص', 'م'],
    ,
  ],
  [['ص', 'م'], , ['صباحًا', 'مساءً']],
  [
    ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'], ,
    ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
  ],
  ,
  [
    ['ج', 'ف', 'م', 'أ', 'م', 'ج', 'ج', 'أ', 'س', 'أ', 'ن', 'د'],
    [
      'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر',
      'نوفمبر', 'ديسمبر'
    ],
  ],
  , [['ق.م', 'م'], , ['قبل الميلاد', 'ميلادي']], 6, [5, 6],
  ['d\u200f/M\u200f/y', 'dd\u200f/MM\u200f/y', 'd MMMM y', 'EEEE، d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '\u200e%\u200e', '\u200e+', '\u200e-', 'E', '×', '‰', '∞', 'ليس رقمًا', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], 'د.ج.\u200f', 'دينار جزائري', {
    'AED': ['د.إ.\u200f'],
    'ARS': [, 'AR$'],
    'AUD': ['AU$'],
    'BBD': [, 'BB$'],
    'BHD': ['د.ب.\u200f'],
    'BMD': [, 'BM$'],
    'BND': [, 'BN$'],
    'BSD': [, 'BS$'],
    'BZD': [, 'BZ$'],
    'CAD': ['CA$'],
    'CLP': [, 'CL$'],
    'CNY': ['CN¥'],
    'COP': [, 'CO$'],
    'CUP': [, 'CU$'],
    'DOP': [, 'DO$'],
    'DZD': ['د.ج.\u200f'],
    'EGP': ['ج.م.\u200f', 'E£'],
    'FJD': [, 'FJ$'],
    'GBP': ['£', 'UK£'],
    'GYD': [, 'GY$'],
    'HKD': ['HK$'],
    'IQD': ['د.ع.\u200f'],
    'IRR': ['ر.إ.'],
    'JMD': [, 'JM$'],
    'JOD': ['د.أ.\u200f'],
    'JPY': ['JP¥'],
    'KWD': ['د.ك.\u200f'],
    'KYD': [, 'KY$'],
    'LBP': ['ل.ل.\u200f', 'L£'],
    'LYD': ['د.ل.\u200f'],
    'MAD': ['د.م.\u200f'],
    'MRO': ['أ.م.\u200f'],
    'MXN': ['MX$'],
    'NZD': ['NZ$'],
    'OMR': ['ر.ع.\u200f'],
    'QAR': ['ر.ق.\u200f'],
    'SAR': ['ر.س.\u200f'],
    'SBD': [, 'SB$'],
    'SDD': ['د.س.\u200f'],
    'SDG': ['ج.س.'],
    'SRD': [, 'SR$'],
    'SYP': ['ل.س.\u200f', '£'],
    'THB': ['฿'],
    'TND': ['د.ت.\u200f'],
    'TTD': [, 'TT$'],
    'TWD': ['NT$'],
    'USD': ['US$'],
    'UYU': [, 'UY$'],
    'XXX': ['***'],
    'YER': ['ر.ي.\u200f']
  },
  plural_ar_DZ
];

function plural_az(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_az = [
  'az',
  [
    ['a', 'p'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['7', '1', '2', '3', '4', '5', '6'], ['B.', 'B.E.', 'Ç.A.', 'Ç.', 'C.A.', 'C.', 'Ş.'],
    ['bazar', 'bazar ertəsi', 'çərşənbə axşamı', 'çərşənbə', 'cümə axşamı', 'cümə', 'şənbə'],
    ['B.', 'B.E.', 'Ç.A.', 'Ç.', 'C.A.', 'C.', 'Ş.']
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avq', 'sen', 'okt', 'noy', 'dek'],
    [
      'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr',
      'noyabr', 'dekabr'
    ]
  ],
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avq', 'sen', 'okt', 'noy', 'dek'],
    [
      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr',
      'Noyabr', 'Dekabr'
    ]
  ],
  [['e.ə.', 'y.e.'], , ['eramızdan əvvəl', 'yeni era']], 1, [6, 0],
  ['dd.MM.yy', 'd MMM y', 'd MMMM y', 'd MMMM y, EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], '₼', 'Azərbaycan Manatı', {
    'AZN': ['₼'],
    'JPY': ['JP¥', '¥'],
    'RON': [, 'ley'],
    'SYP': [, 'S£'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$']
  },
  plural_az
];

function plural_be(n: number): number {
  if (n % 10 === 1 && !(n % 100 === 11)) return 1;
  if (n % 10 === Math.floor(n % 10) && n % 10 >= 2 && n % 10 <= 4 &&
      !(n % 100 >= 12 && n % 100 <= 14))
    return 3;
  if (n % 10 === 0 || n % 10 === Math.floor(n % 10) && n % 10 >= 5 && n % 10 <= 9 ||
      n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 14)
    return 4;
  return 5;
}

export const locale_be = [
  'be',
  [
    ['am', 'pm'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['н', 'п', 'а', 'с', 'ч', 'п', 'с'], ['нд', 'пн', 'аў', 'ср', 'чц', 'пт', 'сб'],
    ['нядзеля', 'панядзелак', 'аўторак', 'серада', 'чацвер', 'пятніца', 'субота'],
    ['нд', 'пн', 'аў', 'ср', 'чц', 'пт', 'сб']
  ],
  ,
  [
    ['с', 'л', 'с', 'к', 'м', 'ч', 'л', 'ж', 'в', 'к', 'л', 'с'],
    ['сту', 'лют', 'сак', 'кра', 'мая', 'чэр', 'ліп', 'жні', 'вер', 'кас', 'ліс', 'сне'],
    [
      'студзеня', 'лютага', 'сакавіка', 'красавіка', 'мая', 'чэрвеня', 'ліпеня', 'жніўня',
      'верасня', 'кастрычніка', 'лістапада', 'снежня'
    ]
  ],
  [
    ['с', 'л', 'с', 'к', 'м', 'ч', 'л', 'ж', 'в', 'к', 'л', 'с'],
    ['сту', 'лют', 'сак', 'кра', 'май', 'чэр', 'ліп', 'жні', 'вер', 'кас', 'ліс', 'сне'],
    [
      'студзень', 'люты', 'сакавік', 'красавік', 'май', 'чэрвень', 'ліпень', 'жнівень', 'верасень',
      'кастрычнік', 'лістапад', 'снежань'
    ]
  ],
  [['да н.э.', 'н.э.'], , ['да нараджэння Хрыстова', 'ад нараджэння Хрыстова']], 1, [6, 0],
  ['d.MM.yy', 'd.MM.y', 'd MMMM y \'г\'.', 'EEEE, d MMMM y \'г\'.'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss, zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'у\' {0}',
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'Br', 'беларускі рубель', {
    'AUD': ['A$'],
    'BBD': [, 'Bds$'],
    'BMD': [, 'BD$'],
    'BRL': [, 'R$'],
    'BSD': [, 'B$'],
    'BYN': ['Br'],
    'BZD': [, 'BZ$'],
    'CAD': [, 'CA$'],
    'CUC': [, 'CUC$'],
    'CUP': [, '$MN'],
    'DOP': [, 'RD$'],
    'FJD': [, 'FJ$'],
    'FKP': [, 'FK£'],
    'GYD': [, 'G$'],
    'ISK': [, 'Íkr'],
    'JMD': [, 'J$'],
    'KYD': [, 'CI$'],
    'LRD': [, 'L$'],
    'MXN': ['MX$'],
    'NAD': [, 'N$'],
    'NZD': [, 'NZ$'],
    'RUB': ['₽', 'руб.'],
    'SBD': [, 'SI$'],
    'SGD': [, 'S$'],
    'TTD': [, 'TT$'],
    'UYU': [, '$U'],
    'XCD': ['EC$']
  },
  plural_be
];

function plural_bg(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_bg = [
  'bg', [['am', 'pm'], , ['пр.об.', 'сл.об.']],
  [
    ['am', 'pm'],
    ,
  ],
  [
    ['н', 'п', 'в', 'с', 'ч', 'п', 'с'], ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота'],
    ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
  ],
  ,
  [
    ['я', 'ф', 'м', 'а', 'м', 'ю', 'ю', 'а', 'с', 'о', 'н', 'д'],
    ['яну', 'фев', 'март', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек'],
    [
      'януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври',
      'ноември', 'декември'
    ]
  ],
  , [['пр.Хр.', 'сл.Хр.'], , ['преди Христа', 'след Христа']], 1, [6, 0],
  ['d.MM.yy \'г\'.', 'd.MM.y \'г\'.', 'd MMMM y \'г\'.', 'EEEE, d MMMM y \'г\'.'],
  ['H:mm \'ч\'.', 'H:mm:ss \'ч\'.', 'H:mm:ss \'ч\'. z', 'H:mm:ss \'ч\'. zzzz'],
  [
    '{1}, {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '0.00 ¤', '#E0'], 'лв.', 'Български лев', {
    'ARS': [],
    'AUD': [],
    'BBD': [],
    'BDT': [],
    'BGN': ['лв.'],
    'BMD': [],
    'BND': [],
    'BRL': [],
    'BSD': [],
    'BYN': [],
    'BZD': [],
    'CAD': [],
    'CLP': [],
    'CNY': [],
    'COP': [],
    'CRC': [],
    'CUP': [],
    'DOP': [],
    'FJD': [],
    'GBP': [, '£'],
    'GIP': [],
    'GYD': [],
    'HKD': [],
    'ILS': [],
    'INR': [],
    'JMD': [],
    'JPY': [, '¥'],
    'KHR': [],
    'KRW': [],
    'KYD': [],
    'KZT': [],
    'LAK': [],
    'LRD': [],
    'MNT': [],
    'MXN': [],
    'NAD': [],
    'NGN': [],
    'NZD': [],
    'PHP': [],
    'PYG': [],
    'RON': [],
    'SBD': [],
    'SGD': [],
    'SRD': [],
    'SSP': [],
    'TRY': [],
    'TTD': [],
    'TWD': [],
    'UAH': [],
    'USD': ['щ.д.', '$'],
    'UYU': [],
    'VND': [],
    'XCD': [, '$']
  },
  plural_bg
];

function plural_bn(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === 0 || n === 1) return 1;
  return 5;
}

export const locale_bn = [
  'bn',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['র', 'সো', 'ম', 'বু', 'বৃ', 'শু', 'শ'], ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'],
    ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
    ['রঃ', 'সোঃ', 'মঃ', 'বুঃ', 'বৃঃ', 'শুঃ', 'শোঃ']
  ],
  [
    ['র', 'সো', 'ম', 'বু', 'বৃ', 'শু', 'শ'], ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'],
    ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহষ্পতিবার', 'শুক্রবার', 'শনিবার'],
    ['রঃ', 'সোঃ', 'মঃ', 'বুঃ', 'বৃঃ', 'শুঃ', 'শনি']
  ],
  [
    ['জা', 'ফে', 'মা', 'এ', 'মে', 'জুন', 'জু', 'আ', 'সে', 'অ', 'ন', 'ডি'],
    [
      'জানু', 'ফেব', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর',
      'ডিসেম্বর'
    ],
    [
      'জানুয়ারী', 'ফেব্রুয়ারী', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর',
      'নভেম্বর', 'ডিসেম্বর'
    ]
  ],
  [
    ['জা', 'ফে', 'মা', 'এ', 'মে', 'জুন', 'জু', 'আ', 'সে', 'অ', 'ন', 'ডি'],
    [
      'জানুয়ারী', 'ফেব্রুয়ারী', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর',
      'নভেম্বর', 'ডিসেম্বর'
    ],
  ],
  [['খ্রিস্টপূর্ব', 'খৃষ্টাব্দ'], , ['খ্রিস্টপূর্ব', 'খ্রীষ্টাব্দ']], 5, [6, 0],
  ['d/M/yy', 'd MMM, y', 'd MMMM, y', 'EEEE, d MMMM, y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##,##0%', '#,##,##0.00¤', '#E0'], '৳', 'বাংলাদেশী টাকা',
  {'BDT': ['৳'], 'JPY': ['JP¥', '¥'], 'THB': ['฿'], 'TWD': ['NT$'], 'USD': ['US$', '$']}, plural_bn
];

function plural_br(n: number): number {
  if (n % 10 === 1 && !(n % 100 === 11 || n % 100 === 71 || n % 100 === 91)) return 1;
  if (n % 10 === 2 && !(n % 100 === 12 || n % 100 === 72 || n % 100 === 92)) return 2;
  if (n % 10 === Math.floor(n % 10) && (n % 10 >= 3 && n % 10 <= 4 || n % 10 === 9) &&
      !(n % 100 >= 10 && n % 100 <= 19 || n % 100 >= 70 && n % 100 <= 79 ||
        n % 100 >= 90 && n % 100 <= 99))
    return 3;
  if (!(n === 0) && n % 1e6 === 0) return 4;
  return 5;
}

export const locale_br = [
  'br',
  [
    ['am', 'gm'],
    ['A.M.', 'G.M.'],
  ],
  [
    ['A.M.', 'G.M.'],
    ,
  ],
  [
    ['Su', 'L', 'Mz', 'Mc', 'Y', 'G', 'Sa'], ['Sul', 'Lun', 'Meu.', 'Mer.', 'Yaou', 'Gwe.', 'Sad.'],
    ['Sul', 'Lun', 'Meurzh', 'Mercʼher', 'Yaou', 'Gwener', 'Sadorn'],
    ['Sul', 'Lun', 'Meu.', 'Mer.', 'Yaou', 'Gwe.', 'Sad.']
  ],
  ,
  [
    ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    [
      'Gen.', 'Cʼhwe.', 'Meur.', 'Ebr.', 'Mae', 'Mezh.', 'Goue.', 'Eost', 'Gwen.', 'Here', 'Du',
      'Kzu.'
    ],
    [
      'Genver', 'Cʼhwevrer', 'Meurzh', 'Ebrel', 'Mae', 'Mezheven', 'Gouere', 'Eost', 'Gwengolo',
      'Here', 'Du', 'Kerzu'
    ]
  ],
  [
    ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    [
      'Gen.', 'Cʼhwe.', 'Meur.', 'Ebr.', 'Mae', 'Mezh.', 'Goue.', 'Eost', 'Gwen.', 'Here', 'Du',
      'Ker.'
    ],
    [
      'Genver', 'Cʼhwevrer', 'Meurzh', 'Ebrel', 'Mae', 'Mezheven', 'Gouere', 'Eost', 'Gwengolo',
      'Here', 'Du', 'Kerzu'
    ]
  ],
  [['a-raok J.K.', 'goude J.K.'], , ['a-raok Jezuz-Krist', 'goude Jezuz-Krist']], 1, [6, 0],
  ['y-MM-dd', 'y MMM d', 'y MMMM d', 'y MMMM d, EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    '{1} \'da\' {0}',
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'euro', {
    'AUD': ['$A', '$'],
    'BRL': [, 'R$'],
    'CAD': ['$CA', '$'],
    'CNY': [, '¥'],
    'EGP': [, '£ E'],
    'GBP': ['£ RU', '£'],
    'HKD': ['$ HK', '$'],
    'ILS': [, '₪'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'LBP': [, '£L'],
    'NZD': ['$ ZN', '$'],
    'TOP': [, '$ T'],
    'TWD': [, '$'],
    'USD': ['$ SU', '$'],
    'VND': [, '₫'],
    'XCD': [, '$']
  },
  plural_br
];

function plural_bs(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length,
      f = parseInt(n.toString().replace(/^[^.]*\.?/, ''), 10) || 0;
  if (v === 0 && i % 10 === 1 && !(i % 100 === 11) || f % 10 === 1 && !(f % 100 === 11)) return 1;
  if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
          !(i % 100 >= 12 && i % 100 <= 14) ||
      f % 10 === Math.floor(f % 10) && f % 10 >= 2 && f % 10 <= 4 &&
          !(f % 100 >= 12 && f % 100 <= 14))
    return 3;
  return 5;
}

export const locale_bs = [
  'bs',
  [
    ['prijepodne', 'popodne'],
    ,
  ],
  ,
  [
    ['N', 'P', 'U', 'S', 'Č', 'P', 'S'], ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
    ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
    ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub']
  ],
  [
    ['n', 'p', 'u', 's', 'č', 'p', 's'], ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
    ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
    ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub']
  ],
  [
    ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
    ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
    [
      'januar', 'februar', 'mart', 'april', 'maj', 'juni', 'juli', 'avgust', 'septembar', 'oktobar',
      'novembar', 'decembar'
    ]
  ],
  , [['p. n. e.', 'n. e.'], , ['prije nove ere', 'nove ere']], 1, [6, 0],
  ['d.M.yy.', 'd. MMM y.', 'd. MMMM y.', 'EEEE, d. MMMM y.'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    '{1} \'u\' {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'KM', 'Bosanskohercegovačka konvertibilna marka', {
    'AUD': [, '$'],
    'BAM': ['KM'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'HRK': ['kn'],
    'ILS': [, '₪'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'RSD': ['din.'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': [, '$'],
    'XCD': [, '$'],
    'XPF': []
  },
  plural_bs
];

function plural_ca(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_ca = [
  'ca',
  [
    ['a. m.', 'p. m.'],
    ,
  ],
  ,
  [
    ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'], ['dg.', 'dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.'],
    ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'],
    ['dg.', 'dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.']
  ],
  ,
  [
    ['GN', 'FB', 'MÇ', 'AB', 'MG', 'JN', 'JL', 'AG', 'ST', 'OC', 'NV', 'DS'],
    [
      'de gen.', 'de febr.', 'de març', 'd’abr.', 'de maig', 'de juny', 'de jul.', 'd’ag.',
      'de set.', 'd’oct.', 'de nov.', 'de des.'
    ],
    [
      'de gener', 'de febrer', 'de març', 'd’abril', 'de maig', 'de juny', 'de juliol', 'd’agost',
      'de setembre', 'd’octubre', 'de novembre', 'de desembre'
    ]
  ],
  [
    ['GN', 'FB', 'MÇ', 'AB', 'MG', 'JN', 'JL', 'AG', 'ST', 'OC', 'NV', 'DS'],
    [
      'gen.', 'febr.', 'març', 'abr.', 'maig', 'juny', 'jul.', 'ag.', 'set.', 'oct.', 'nov.', 'des.'
    ],
    [
      'gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre',
      'novembre', 'desembre'
    ]
  ],
  [['aC', 'dC'], , ['abans de Crist', 'després de Crist']], 1, [6, 0],
  ['d/M/yy', 'd MMM y', 'd MMMM \'de\' y', 'EEEE, d MMMM \'de\' y'],
  ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss zzzz'],
  [
    '{1} {0}',
    '{1}, {0}',
    '{1} \'a\' \'les\' {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '€', 'euro', {
    'AUD': ['AU$', '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': ['¥'],
    'ESP': ['₧'],
    'JPY': ['JP¥', '¥'],
    'MXN': [, '$'],
    'THB': ['฿'],
    'USD': [, '$'],
    'VEF': [],
    'XCD': [, '$']
  },
  plural_ca
];

function plural_chr(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_chr = [
  'chr',
  [
    ['Ꮜ', 'Ꮢ'],
    ['ᏌᎾᎴ', 'ᏒᎯᏱᎢᏗᏢ'],
  ],
  [
    ['ᏌᎾᎴ', 'ᏒᎯᏱᎢᏗᏢ'],
    ,
  ],
  [
    ['Ꮖ', 'Ꮙ', 'Ꮤ', 'Ꮶ', 'Ꮕ', 'Ꮷ', 'Ꭴ'], ['ᏆᏍᎬ', 'ᏉᏅᎯ', 'ᏔᎵᏁ', 'ᏦᎢᏁ', 'ᏅᎩᏁ', 'ᏧᎾᎩ', 'ᏈᏕᎾ'],
    ['ᎤᎾᏙᏓᏆᏍᎬ', 'ᎤᎾᏙᏓᏉᏅᎯ', 'ᏔᎵᏁᎢᎦ', 'ᏦᎢᏁᎢᎦ', 'ᏅᎩᏁᎢᎦ', 'ᏧᎾᎩᎶᏍᏗ', 'ᎤᎾᏙᏓᏈᏕᎾ'],
    ['ᏍᎬ', 'ᏅᎯ', 'ᏔᎵ', 'ᏦᎢ', 'ᏅᎩ', 'ᏧᎾ', 'ᏕᎾ']
  ],
  ,
  [
    ['Ꭴ', 'Ꭷ', 'Ꭰ', 'Ꭷ', 'Ꭰ', 'Ꮥ', 'Ꭻ', 'Ꭶ', 'Ꮪ', 'Ꮪ', 'Ꮕ', 'Ꭵ'],
    ['ᎤᏃ', 'ᎧᎦ', 'ᎠᏅ', 'ᎧᏬ', 'ᎠᏂ', 'ᏕᎭ', 'ᎫᏰ', 'ᎦᎶ', 'ᏚᎵ', 'ᏚᏂ', 'ᏅᏓ', 'ᎥᏍ'],
    ['ᎤᏃᎸᏔᏅ', 'ᎧᎦᎵ', 'ᎠᏅᏱ', 'ᎧᏬᏂ', 'ᎠᏂᏍᎬᏘ', 'ᏕᎭᎷᏱ', 'ᎫᏰᏉᏂ', 'ᎦᎶᏂ', 'ᏚᎵᏍᏗ', 'ᏚᏂᏅᏗ', 'ᏅᏓᏕᏆ', 'ᎥᏍᎩᏱ']
  ],
  , [['BC', 'AD'], , ['ᏧᏓᎷᎸ ᎤᎷᎯᏍᏗ ᎦᎶᏁᏛ', 'ᎠᏃ ᏙᎻᏂ']], 0, [6, 0],
  ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} ᎤᎾᎢ {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '$', 'US ᎠᏕᎳ', {'JPY': ['JP¥', '¥']}, plural_chr
];

function plural_cs(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  if (i === Math.floor(i) && i >= 2 && i <= 4 && v === 0) return 3;
  if (!(v === 0)) return 4;
  return 5;
}

export const locale_cs = [
  'cs',
  [
    ['dop.', 'odp.'],
    ,
  ],
  ,
  [
    ['N', 'P', 'Ú', 'S', 'Č', 'P', 'S'], ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
    ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
    ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so']
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
    [
      'ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října',
      'listopadu', 'prosince'
    ]
  ],
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
    [
      'leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen',
      'listopad', 'prosinec'
    ]
  ],
  [['př.n.l.', 'n.l.'], ['př. n. l.', 'n. l.'], ['před naším letopočtem', 'našeho letopočtu']], 1,
  [6, 0], ['dd.MM.yy', 'd. M. y', 'd. MMMM y', 'EEEE d. MMMM y'],
  ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'Kč', 'česká koruna', {
    'AUD': ['AU$', '$'],
    'CSK': ['Kčs'],
    'CZK': ['Kč'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': ['JP¥', '¥'],
    'RON': [, 'L'],
    'TWD': ['NT$'],
    'USD': ['US$', '$'],
    'VND': [, '₫'],
    'XEU': ['ECU']
  },
  plural_cs
];

function plural_cy(n: number): number {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (n === 3) return 3;
  if (n === 6) return 4;
  return 5;
}

export const locale_cy = [
  'cy',
  [
    ['b', 'h'],
    ['yb', 'yh'],
  ],
  [
    ['yb', 'yh'],
    ,
  ],
  [
    ['S', 'Ll', 'M', 'M', 'I', 'G', 'S'], ['Sul', 'Llun', 'Maw', 'Mer', 'Iau', 'Gwen', 'Sad'],
    [
      'Dydd Sul', 'Dydd Llun', 'Dydd Mawrth', 'Dydd Mercher', 'Dydd Iau', 'Dydd Gwener',
      'Dydd Sadwrn'
    ],
    ['Su', 'Ll', 'Ma', 'Me', 'Ia', 'Gw', 'Sa']
  ],
  [
    ['S', 'Ll', 'M', 'M', 'I', 'G', 'S'], ['Sul', 'Llun', 'Maw', 'Mer', 'Iau', 'Gwe', 'Sad'],
    [
      'Dydd Sul', 'Dydd Llun', 'Dydd Mawrth', 'Dydd Mercher', 'Dydd Iau', 'Dydd Gwener',
      'Dydd Sadwrn'
    ],
    ['Su', 'Ll', 'Ma', 'Me', 'Ia', 'Gw', 'Sa']
  ],
  [
    ['I', 'Ch', 'M', 'E', 'M', 'M', 'G', 'A', 'M', 'H', 'T', 'Rh'],
    ['Ion', 'Chwef', 'Maw', 'Ebrill', 'Mai', 'Meh', 'Gorff', 'Awst', 'Medi', 'Hyd', 'Tach', 'Rhag'],
    [
      'Ionawr', 'Chwefror', 'Mawrth', 'Ebrill', 'Mai', 'Mehefin', 'Gorffennaf', 'Awst', 'Medi',
      'Hydref', 'Tachwedd', 'Rhagfyr'
    ]
  ],
  [
    ['I', 'Ch', 'M', 'E', 'M', 'M', 'G', 'A', 'M', 'H', 'T', 'Rh'],
    ['Ion', 'Chw', 'Maw', 'Ebr', 'Mai', 'Meh', 'Gor', 'Awst', 'Medi', 'Hyd', 'Tach', 'Rhag'],
    [
      'Ionawr', 'Chwefror', 'Mawrth', 'Ebrill', 'Mai', 'Mehefin', 'Gorffennaf', 'Awst', 'Medi',
      'Hydref', 'Tachwedd', 'Rhagfyr'
    ]
  ],
  [['C', 'O'], ['CC', 'OC'], ['Cyn Crist', 'Oed Crist']], 1, [6, 0],
  ['dd/MM/yy', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    '{1} \'am\' {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '£', 'Punt Prydain', {
    'BDT': [, 'TK'],
    'BWP': [],
    'HKD': ['HK$'],
    'JPY': ['JP¥', '¥'],
    'KRW': [, '₩'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$'],
    'ZAR': [],
    'ZMW': []
  },
  plural_cy
];

function plural_da(n: number): number {
  let i = Math.floor(Math.abs(n)),
      t = parseInt(n.toString().replace(/^[^.]*\.?|0+$/g, ''), 10) || 0;
  if (n === 1 || !(t === 0) && (i === 0 || i === 1)) return 1;
  return 5;
}

export const locale_da = [
  'da',
  [
    ['a', 'p'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['S', 'M', 'T', 'O', 'T', 'F', 'L'], ['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.'],
    ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø']
  ],
  [
    ['S', 'M', 'T', 'O', 'T', 'F', 'L'], ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'],
    ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø']
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
    [
      'januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september',
      'oktober', 'november', 'december'
    ]
  ],
  ,
  [
    ['fKr', 'eKr'],
    ['f.Kr.', 'e.Kr.'],
  ],
  1, [6, 0], ['dd/MM/y', 'd. MMM y', 'd. MMMM y', 'EEEE \'den\' d. MMMM y'],
  ['HH.mm', 'HH.mm.ss', 'HH.mm.ss z', 'HH.mm.ss zzzz'],
  [
    '{1} {0}',
    ,
    '{1} \'kl\'. {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', '.'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'kr.', 'dansk krone', {
    'AUD': ['AU$', '$'],
    'DKK': ['kr.'],
    'ISK': [, 'kr.'],
    'JPY': ['JP¥', '¥'],
    'NOK': [, 'kr.'],
    'RON': [, 'L'],
    'SEK': [, 'kr.'],
    'THB': ['฿'],
    'TWD': ['NT$']
  },
  plural_da
];

function plural_de(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_de = [
  'de',
  [
    ['vm.', 'nm.'],
    ['AM', 'PM'],
  ],
  [
    ['vorm.', 'nachm.'],
    ,
  ],
  [
    ['S', 'M', 'D', 'M', 'D', 'F', 'S'], ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
    ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
  ],
  [
    ['S', 'M', 'D', 'M', 'D', 'F', 'S'], ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'],
    [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober',
      'November', 'Dezember'
    ]
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober',
      'November', 'Dezember'
    ]
  ],
  [
    ['v. Chr.', 'n. Chr.'],
    ,
  ],
  1, [6, 0], ['dd.MM.yy', 'dd.MM.y', 'd. MMMM y', 'EEEE, d. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'um\' {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '·', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'Euro', {
    'ATS': ['öS'],
    'AUD': ['AU$', '$'],
    'BGM': ['BGK'],
    'BGO': ['BGJ'],
    'CUC': [, 'Cub$'],
    'DEM': ['DM'],
    'FKP': [, 'Fl£'],
    'GNF': [, 'F.G.'],
    'KMF': [, 'FC'],
    'RON': [, 'L'],
    'RWF': [, 'F.Rw'],
    'SYP': [],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'ZMW': [, 'K']
  },
  plural_de
];

function plural_de_AT(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_de_AT = [
  'de-AT',
  [
    ['vm.', 'nm.'],
    ['AM', 'PM'],
  ],
  [
    ['vm.', 'nm.'],
    ['vorm.', 'nachm.'],
  ],
  [
    ['S', 'M', 'D', 'M', 'D', 'F', 'S'], ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
    ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
  ],
  [
    ['S', 'M', 'D', 'M', 'D', 'F', 'S'], ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jän.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'],
    [
      'Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober',
      'November', 'Dezember'
    ]
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jän', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    [
      'Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober',
      'November', 'Dezember'
    ]
  ],
  [
    ['v. Chr.', 'n. Chr.'],
    ,
  ],
  1, [6, 0], ['dd.MM.yy', 'dd.MM.y', 'd. MMMM y', 'EEEE, d. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'um\' {0}',
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '·', '‰', '∞', 'NaN', ':', '.'],
  ['#,##0.###', '#,##0 %', '¤ #,##0.00', '#E0'], '€', 'Euro', {
    'ATS': ['öS'],
    'AUD': ['AU$', '$'],
    'BGM': ['BGK'],
    'BGO': ['BGJ'],
    'CUC': [, 'Cub$'],
    'DEM': ['DM'],
    'FKP': [, 'Fl£'],
    'GNF': [, 'F.G.'],
    'KMF': [, 'FC'],
    'RON': [, 'L'],
    'RWF': [, 'F.Rw'],
    'SYP': [],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'ZMW': [, 'K']
  },
  plural_de_AT
];

function plural_de_CH(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_de_CH = [
  'de-CH',
  [
    ['vm.', 'nm.'],
    ['AM', 'PM'],
  ],
  [
    ['vorm.', 'nachm.'],
    ,
  ],
  [
    ['S', 'M', 'D', 'M', 'D', 'F', 'S'], ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
    ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
  ],
  [
    ['S', 'M', 'D', 'M', 'D', 'F', 'S'], ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'],
    [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober',
      'November', 'Dezember'
    ]
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober',
      'November', 'Dezember'
    ]
  ],
  [
    ['v. Chr.', 'n. Chr.'],
    ,
  ],
  1, [6, 0], ['dd.MM.yy', 'dd.MM.y', 'd. MMMM y', 'EEEE, d. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'um\' {0}',
  ],
  ['.', '’', ';', '%', '+', '-', 'E', '·', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00;¤-#,##0.00', '#E0'], 'CHF', 'Schweizer Franken', {
    'ATS': ['öS'],
    'AUD': ['AU$', '$'],
    'BGM': ['BGK'],
    'BGO': ['BGJ'],
    'CUC': [, 'Cub$'],
    'DEM': ['DM'],
    'EUR': [],
    'FKP': [, 'Fl£'],
    'GNF': [, 'F.G.'],
    'KMF': [, 'FC'],
    'RON': [, 'L'],
    'RWF': [, 'F.Rw'],
    'SYP': [],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'ZMW': [, 'K']
  },
  plural_de_CH
];

function plural_el(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_el = [
  'el',
  [
    ['πμ', 'μμ'],
    ['π.μ.', 'μ.μ.'],
  ],
  ,
  [
    ['Κ', 'Δ', 'Τ', 'Τ', 'Π', 'Π', 'Σ'], ['Κυρ', 'Δευ', 'Τρί', 'Τετ', 'Πέμ', 'Παρ', 'Σάβ'],
    ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
    ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πέ', 'Πα', 'Σά']
  ],
  ,
  [
    ['Ι', 'Φ', 'Μ', 'Α', 'Μ', 'Ι', 'Ι', 'Α', 'Σ', 'Ο', 'Ν', 'Δ'],
    ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαΐ', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'],
    [
      'Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου',
      'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου'
    ]
  ],
  [
    ['Ι', 'Φ', 'Μ', 'Α', 'Μ', 'Ι', 'Ι', 'Α', 'Σ', 'Ο', 'Ν', 'Δ'],
    ['Ιαν', 'Φεβ', 'Μάρ', 'Απρ', 'Μάι', 'Ιούν', 'Ιούλ', 'Αύγ', 'Σεπ', 'Οκτ', 'Νοέ', 'Δεκ'],
    [
      'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος',
      'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'
    ]
  ],
  [['π.Χ.', 'μ.Χ.'], , ['προ Χριστού', 'μετά Χριστόν']], 1, [6, 0],
  ['d/M/yy', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} - {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'e', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '€', 'Ευρώ',
  {'GRD': ['Δρχ'], 'JPY': ['JP¥', '¥'], 'THB': ['฿']}, plural_el
];

function plural_en_AU(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_en_AU = [
  'en-AU',
  [
    ['am', 'pm'],
    ,
  ],
  ,
  [
    ['Su.', 'M.', 'Tu.', 'W.', 'Th.', 'F.', 'Sa.'],
    ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['Su.', 'Mon.', 'Tu.', 'Wed.', 'Th.', 'Fri.', 'Sat.']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
    [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ]
  ],
  , [['B', 'A'], ['BC', 'AD'], ['Before Christ', 'Anno Domini']], 0, [6, 0],
  ['d/M/yy', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'at\' {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'e', '×', '‰', '∞', 'NaN', '.'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '$', 'Australian Dollar', {
    'AUD': ['$'],
    'BDT': [, 'Tk'],
    'BOB': [, '$b'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'CUP': [, '₱'],
    'EGP': [, '£'],
    'EUR': [, '€'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'ISK': [, 'Kr'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'PYG': [, 'Gs'],
    'SCR': ['Rs'],
    'SEK': [, 'Kr'],
    'TWD': [, '$'],
    'USD': [, '$'],
    'UYU': [, '$U'],
    'VND': [, '₫'],
    'XAF': [],
    'XCD': [, '$'],
    'XOF': [],
    'XPF': ['CFP']
  },
  plural_en_AU
];

function plural_en_CA(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_en_CA = [
  'en-CA',
  [
    ['a', 'p'],
    ['a.m.', 'p.m.'],
  ],
  [
    ['a.m.', 'p.m.'],
    ,
  ],
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'], ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
    [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ]
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ]
  ],
  [['B', 'A'], ['BC', 'AD'], ['Before Christ', 'Anno Domini']], 0, [6, 0],
  ['y-MM-dd', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'at\' {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'e', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '$', 'Canadian Dollar',
  {'CAD': ['$'], 'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural_en_CA
];

function plural_en_GB(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_en_GB = [
  'en-GB',
  [
    ['a', 'p'],
    ['am', 'pm'],
  ],
  [
    ['am', 'pm'],
    ,
  ],
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ]
  ],
  , [['B', 'A'], ['BC', 'AD'], ['Before Christ', 'Anno Domini']], 1, [6, 0],
  ['dd/MM/y', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'at\' {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '£', 'British Pound',
  {'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural_en_GB
];

function plural_en_IE(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_en_IE = [
  'en-IE', [['a', 'p'], ['AM', 'PM'], ['a.m.', 'p.m.']],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ]
  ],
  , [['B', 'A'], ['BC', 'AD'], ['Before Christ', 'Anno Domini']], 0, [6, 0],
  ['dd/MM/y', 'd MMM y', 'd MMMM y', 'EEEE d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'at\' {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '€', 'Euro',
  {'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural_en_IE
];

function plural_en_IN(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_en_IN = [
  'en-IN',
  [
    ['a', 'p'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ]
  ],
  , [['B', 'A'], ['BC', 'AD'], ['Before Christ', 'Anno Domini']], 0, [0, 0],
  ['dd/MM/yy', 'dd-MMM-y', 'd MMMM y', 'EEEE, d MMMM, y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'at\' {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##,##0%', '¤ #,##,##0.00', '#E0'], '₹', 'Indian Rupee',
  {'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural_en_IN
];

function plural_en_SG(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_en_SG = [
  'en-SG',
  [
    ['a', 'p'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ]
  ],
  , [['B', 'A'], ['BC', 'AD'], ['Before Christ', 'Anno Domini']], 0, [6, 0],
  ['d/M/yy', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'at\' {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '$', 'Singapore Dollar',
  {'JPY': ['JP¥', '¥'], 'SGD': ['$'], 'USD': ['US$', '$']}, plural_en_SG
];

function plural_en_ZA(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_en_ZA = [
  'en-ZA',
  [
    ['a', 'p'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ]
  ],
  , [['B', 'A'], ['BC', 'AD'], ['Before Christ', 'Anno Domini']], 0, [6, 0],
  ['y/MM/dd', 'dd MMM y', 'dd MMMM y', 'EEEE, dd MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'at\' {0}',
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'R', 'South African Rand',
  {'JPY': ['JP¥', '¥'], 'USD': ['US$', '$'], 'ZAR': ['R']}, plural_en_ZA
];

function plural_es(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_es = [
  'es',
  [
    ['a. m.', 'p. m.'],
    ,
  ],
  ,
  [
    ['D', 'L', 'M', 'X', 'J', 'V', 'S'], ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
    ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA']
  ],
  ,
  [
    ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    [
      'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sept.', 'oct.', 'nov.',
      'dic.'
    ],
    [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre',
      'octubre', 'noviembre', 'diciembre'
    ]
  ],
  , [['a. C.', 'd. C.'], , ['antes de Cristo', 'después de Cristo']], 1, [6, 0],
  ['d/M/yy', 'd MMM y', 'd \'de\' MMMM \'de\' y', 'EEEE, d \'de\' MMMM \'de\' y'],
  ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss (zzzz)'],
  [
    '{1} {0}',
    ,
    '{1}, {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'euro', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CNY': [, '¥'],
    'EGP': [],
    'ESP': ['₧'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'RON': [, 'L'],
    'THB': ['฿'],
    'TWD': [, 'NT$'],
    'USD': ['US$', '$'],
    'XAF': [],
    'XCD': [, '$'],
    'XOF': []
  },
  plural_es
];

function plural_es_419(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_es_419 = [
  'es-419',
  [
    ['a. m.', 'p. m.'],
    ['a.m.', 'p.m.'],
  ],
  [
    ['a.m.', 'p.m.'],
    ,
  ],
  [
    ['d', 'l', 'm', 'm', 'j', 'v', 's'], ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
    ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA']
  ],
  [
    ['D', 'L', 'M', 'M', 'J', 'V', 'S'], ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
    ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA']
  ],
  [
    ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    [
      'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'
    ],
    [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre',
      'octubre', 'noviembre', 'diciembre'
    ]
  ],
  , [['a. C.', 'd. C.'], , ['antes de Cristo', 'después de Cristo']], 1, [6, 0],
  ['d/M/yy', 'd MMM y', 'd \'de\' MMMM \'de\' y', 'EEEE, d \'de\' MMMM \'de\' y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    '{1}, {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '¤#,##0.00', '#E0'], 'EUR', 'euro', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'ESP': ['₧'],
    'EUR': [, '€'],
    'FKP': [, 'FK£'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'RON': [, 'L'],
    'SSP': [, 'SD£'],
    'SYP': [, 'S£'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VEF': [, 'BsF'],
    'VND': [, '₫'],
    'XAF': [],
    'XCD': [, '$'],
    'XOF': []
  },
  plural_es_419
];

function plural_es_MX(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_es_MX = [
  'es-MX',
  [
    ['a. m.', 'p. m.'],
    ,
  ],
  ,
  [
    ['D', 'L', 'M', 'M', 'J', 'V', 'S'], ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
    ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sá']
  ],
  [
    ['D', 'L', 'M', 'M', 'J', 'V', 'S'], ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
    ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA']
  ],
  [
    ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre',
      'octubre', 'noviembre', 'diciembre'
    ]
  ],
  [
    ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    [
      'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'
    ],
    [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre',
      'octubre', 'noviembre', 'diciembre'
    ]
  ],
  [['a. C.', 'd. C.'], , ['antes de Cristo', 'después de Cristo']], 0, [6, 0],
  ['dd/MM/yy', 'd MMM y', 'd \'de\' MMMM \'de\' y', 'EEEE, d \'de\' MMMM \'de\' y'],
  ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    '{1}, {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '¤#,##0.00', '#E0'], '$', 'peso mexicano', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'BYN': [, 'p.'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'ESP': ['₧'],
    'EUR': [, '€'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MXN': ['$'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VEF': [, 'BsF'],
    'VND': [, '₫'],
    'XAF': [],
    'XCD': [, '$'],
    'XOF': []
  },
  plural_es_MX
];

function plural_es_US(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_es_US = [
  'es-US',
  [
    ['a. m.', 'p. m.'],
    ,
  ],
  ,
  [
    ['D', 'L', 'M', 'M', 'J', 'V', 'S'], ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
    ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA']
  ],
  ,
  [
    ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    [
      'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'
    ],
    [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre',
      'octubre', 'noviembre', 'diciembre'
    ]
  ],
  , [['a. C.', 'd. C.'], , ['antes de Cristo', 'después de Cristo']], 0, [6, 0],
  ['d/M/yy', 'd MMM y', 'd \'de\' MMMM \'de\' y', 'EEEE, d \'de\' MMMM \'de\' y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    '{1}, {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '¤#,##0.00', '#E0'], '$', 'dólar estadounidense', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'ESP': ['₧'],
    'EUR': [, '€'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'VEF': [, 'BsF'],
    'VND': [, '₫'],
    'XAF': [],
    'XCD': [, '$'],
    'XOF': []
  },
  plural_es_US
];

function plural_et(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_et = [
  'et',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['P', 'E', 'T', 'K', 'N', 'R', 'L'], ,
    ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'],
    ['P', 'E', 'T', 'K', 'N', 'R', 'L']
  ],
  ,
  [
    ['J', 'V', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['jaan', 'veebr', 'märts', 'apr', 'mai', 'juuni', 'juuli', 'aug', 'sept', 'okt', 'nov', 'dets'],
    [
      'jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september',
      'oktoober', 'november', 'detsember'
    ]
  ],
  , [['eKr', 'pKr'], , ['enne Kristust', 'pärast Kristust']], 1, [6, 0],
  ['dd.MM.yy', 'd. MMM y', 'd. MMMM y', 'EEEE, d. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '−', '×10^', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '€', 'euro',
  {'AUD': ['AU$', '$'], 'EEK': ['kr'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_et
];

function plural_eu(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_eu = [
  'eu',
  [
    ['g', 'a'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['I', 'A', 'A', 'A', 'O', 'O', 'L'], ['ig.', 'al.', 'ar.', 'az.', 'og.', 'or.', 'lr.'],
    ['igandea', 'astelehena', 'asteartea', 'asteazkena', 'osteguna', 'ostirala', 'larunbata'],
    ['ig.', 'al.', 'ar.', 'az.', 'og.', 'or.', 'lr.']
  ],
  [
    ['I', 'A', 'A', 'A', 'O', 'O', 'L'], ['ig.', 'al.', 'ar.', 'az.', 'og.', 'or.', 'lr.'],
    ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata'],
    ['ig.', 'al.', 'ar.', 'az.', 'og.', 'or.', 'lr.']
  ],
  [
    ['U', 'O', 'M', 'A', 'M', 'E', 'U', 'A', 'I', 'U', 'A', 'A'],
    [
      'urt.', 'ots.', 'mar.', 'api.', 'mai.', 'eka.', 'uzt.', 'abu.', 'ira.', 'urr.', 'aza.', 'abe.'
    ],
    [
      'urtarrila', 'otsaila', 'martxoa', 'apirila', 'maiatza', 'ekaina', 'uztaila', 'abuztua',
      'iraila', 'urria', 'azaroa', 'abendua'
    ]
  ],
  [
    ['U', 'O', 'M', 'A', 'M', 'E', 'U', 'A', 'I', 'U', 'A', 'A'],
    [
      'urt.', 'ots.', 'mar.', 'api.', 'mai.', 'eka.', 'uzt.', 'abu.', 'ira.', 'urr.', 'aza.', 'abe.'
    ],
    [
      'urtarrila', 'Otsaila', 'Martxoa', 'Apirila', 'Maiatza', 'Ekaina', 'Uztaila', 'Abuztua',
      'Iraila', 'Urria', 'Azaroa', 'Abendua'
    ]
  ],
  [['K.a.', 'K.o.'], , ['K.a.', 'Kristo ondoren']], 1, [6, 0],
  [
    'yy/M/d', 'y MMM d', 'y(\'e\')\'ko\' MMMM\'ren\' d(\'a\')',
    'y(\'e\')\'ko\' MMMM\'ren\' d(\'a\'), EEEE'
  ],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss (z)', 'HH:mm:ss (zzzz)'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '−', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '% #,##0', '#,##0.00 ¤', '#E0'], '€', 'euroa',
  {'ESP': ['₧'], 'JPY': ['JP¥', '¥'], 'THB': ['฿'], 'TWD': ['NT$'], 'USD': ['US$', '$']}, plural_eu
];

function plural_fa(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === 0 || n === 1) return 1;
  return 5;
}

export const locale_fa = [
  'fa', [['ق', 'ب'], ['ق.ظ.', 'ب.ظ.'], ['قبل\u200cازظهر', 'بعدازظهر']],
  [['ق.ظ.', 'ب.ظ.'], , ['قبل\u200cازظهر', 'بعدازظهر']],
  [
    ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
    ['یکشنبه', 'دوشنبه', 'سه\u200cشنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'], ,
    ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش']
  ],
  ,
  [
    ['ژ', 'ف', 'م', 'آ', 'م', 'ژ', 'ژ', 'ا', 'س', 'ا', 'ن', 'د'],
    [
      'ژانویهٔ', 'فوریهٔ', 'مارس', 'آوریل', 'مهٔ', 'ژوئن', 'ژوئیهٔ', 'اوت', 'سپتامبر', 'اکتبر',
      'نوامبر', 'دسامبر'
    ],
  ],
  [
    ['ژ', 'ف', 'م', 'آ', 'م', 'ژ', 'ژ', 'ا', 'س', 'ا', 'ن', 'د'],
    [
      'ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر',
      'نوامبر', 'دسامبر'
    ],
  ],
  [['ق', 'م'], ['ق.م.', 'م.'], ['قبل از میلاد', 'میلادی']], 6, [5, 5],
  ['y/M/d', 'd MMM y', 'd MMMM y', 'EEEE d MMMM y'],
  ['H:mm', 'H:mm:ss', 'H:mm:ss (z)', 'H:mm:ss (zzzz)'],
  [
    '{1}،\u200f {0}',
    ,
    '{1}، ساعت {0}',
  ],
  ['.', ',', ';', '%', '\u200e+', '\u200e−', 'E', '×', '‰', '∞', 'ناعدد', ':'],
  ['#,##0.###', '#,##0%', '\u200e¤ #,##0.00', '#E0'], 'ریال', 'ریال ایران', {
    'AFN': ['؋'],
    'CAD': ['$CA', '$'],
    'CNY': ['¥CN', '¥'],
    'HKD': ['$HK', '$'],
    'IRR': ['ریال'],
    'MXN': ['$MX', '$'],
    'NZD': ['$NZ', '$'],
    'THB': ['฿'],
    'XCD': ['$EC', '$']
  },
  plural_fa
];

function plural_fi(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_fi = [
  'fi',
  [
    ['ap.', 'ip.'],
    ,
  ],
  ,
  [
    ['S', 'M', 'T', 'K', 'T', 'P', 'L'], ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
    [
      'sunnuntaina', 'maanantaina', 'tiistaina', 'keskiviikkona', 'torstaina', 'perjantaina',
      'lauantaina'
    ],
    ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la']
  ],
  [
    ['S', 'M', 'T', 'K', 'T', 'P', 'L'], ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
    ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai'],
    ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la']
  ],
  [
    ['T', 'H', 'M', 'H', 'T', 'K', 'H', 'E', 'S', 'L', 'M', 'J'],
    [
      'tammik.', 'helmik.', 'maalisk.', 'huhtik.', 'toukok.', 'kesäk.', 'heinäk.', 'elok.',
      'syysk.', 'lokak.', 'marrask.', 'jouluk.'
    ],
    [
      'tammikuuta', 'helmikuuta', 'maaliskuuta', 'huhtikuuta', 'toukokuuta', 'kesäkuuta',
      'heinäkuuta', 'elokuuta', 'syyskuuta', 'lokakuuta', 'marraskuuta', 'joulukuuta'
    ]
  ],
  [
    ['T', 'H', 'M', 'H', 'T', 'K', 'H', 'E', 'S', 'L', 'M', 'J'],
    [
      'tammi', 'helmi', 'maalis', 'huhti', 'touko', 'kesä', 'heinä', 'elo', 'syys', 'loka',
      'marras', 'joulu'
    ],
    [
      'tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu',
      'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'
    ]
  ],
  [['eKr', 'jKr'], ['eKr.', 'jKr.'], ['ennen Kristuksen syntymää', 'jälkeen Kristuksen syntymän']],
  1, [6, 0], ['d.M.y', , 'd. MMMM y', 'cccc d. MMMM y'],
  ['H.mm', 'H.mm.ss', 'H.mm.ss z', 'H.mm.ss zzzz'],
  [
    '{1} {0}',
    '{1} \'klo\' {0}',
    ,
  ],
  [',', ' ', ';', '%', '+', '−', 'E', '×', '‰', '∞', 'epäluku', '.'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'euro', {
    'AOA': [],
    'ARS': [],
    'AUD': [],
    'BAM': [],
    'BBD': [],
    'BDT': [],
    'BMD': [],
    'BND': [],
    'BOB': [],
    'BRL': [],
    'BSD': [],
    'BWP': [],
    'BYN': [],
    'BZD': [],
    'CAD': [],
    'CLP': [],
    'CNY': [],
    'COP': [],
    'CRC': [],
    'CUC': [],
    'CUP': [],
    'CZK': [],
    'DKK': [],
    'DOP': [],
    'EGP': [],
    'ESP': [],
    'FIM': ['mk'],
    'FJD': [],
    'FKP': [],
    'GEL': [],
    'GIP': [],
    'GNF': [],
    'GTQ': [],
    'GYD': [],
    'HKD': [],
    'HNL': [],
    'HRK': [],
    'HUF': [],
    'IDR': [],
    'ILS': [],
    'INR': [],
    'ISK': [],
    'JMD': [],
    'KHR': [],
    'KMF': [],
    'KPW': [],
    'KRW': [],
    'KYD': [],
    'KZT': [],
    'LAK': [],
    'LBP': [],
    'LKR': [],
    'LRD': [],
    'LTL': [],
    'LVL': [],
    'MGA': [],
    'MMK': [],
    'MNT': [],
    'MUR': [],
    'MXN': [],
    'MYR': [],
    'NAD': [],
    'NGN': [],
    'NIO': [],
    'NOK': [],
    'NPR': [],
    'NZD': [],
    'PHP': [],
    'PKR': [],
    'PLN': [],
    'PYG': [],
    'RON': [],
    'RUR': [],
    'RWF': [],
    'SBD': [],
    'SEK': [],
    'SGD': [],
    'SHP': [],
    'SRD': [],
    'SSP': [],
    'STD': [],
    'SYP': [],
    'THB': [],
    'TOP': [],
    'TRY': [],
    'TTD': [],
    'TWD': [],
    'UAH': [],
    'UYU': [],
    'VEF': [],
    'VND': [],
    'XCD': [],
    'XPF': [],
    'ZAR': [],
    'ZMW': []
  },
  plural_fi
];

function plural_fr(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === 0 || i === 1) return 1;
  return 5;
}

export const locale_fr = [
  'fr',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['D', 'L', 'M', 'M', 'J', 'V', 'S'], ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    ['di', 'lu', 'ma', 'me', 'je', 've', 'sa']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    [
      'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.',
      'déc.'
    ],
    [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre',
      'octobre', 'novembre', 'décembre'
    ]
  ],
  , [['av. J.-C.', 'ap. J.-C.'], , ['avant Jésus-Christ', 'après Jésus-Christ']], 1, [6, 0],
  ['dd/MM/y', 'd MMM y', 'd MMMM y', 'EEEE d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    '{1} \'à\' {0}',
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'euro', {
    'ARS': ['$AR', '$'],
    'AUD': ['$AU', '$'],
    'BEF': ['FB'],
    'BMD': ['$BM', '$'],
    'BND': ['$BN', '$'],
    'BSD': ['$BS', '$'],
    'BZD': ['$BZ', '$'],
    'CAD': ['$CA', '$'],
    'CLP': ['$CL', '$'],
    'CNY': [, '¥'],
    'COP': ['$CO', '$'],
    'CYP': ['£CY'],
    'EGP': [, '£E'],
    'FJD': ['$FJ', '$'],
    'FKP': ['£FK', '£'],
    'FRF': ['F'],
    'GBP': ['£GB', '£'],
    'GIP': ['£GI', '£'],
    'HKD': [, '$'],
    'IEP': ['£IE'],
    'ILP': ['£IL'],
    'ITL': ['₤IT'],
    'JPY': [, '¥'],
    'KMF': [, 'FC'],
    'LBP': ['£LB', '£L'],
    'MTP': ['£MT'],
    'MXN': ['$MX', '$'],
    'NAD': ['$NA', '$'],
    'NIO': [, '$C'],
    'NZD': ['$NZ', '$'],
    'RHD': ['$RH'],
    'RON': [, 'L'],
    'RWF': [, 'FR'],
    'SBD': ['$SB', '$'],
    'SGD': ['$SG', '$'],
    'SRD': ['$SR', '$'],
    'TTD': ['$TT', '$'],
    'TWD': [, 'NT$'],
    'USD': ['$US', '$'],
    'UYU': ['$UY', '$'],
    'WST': ['WS$'],
    'XCD': [, '$'],
    'XPF': ['FCFP'],
    'ZMW': [, 'Kw']
  },
  plural_fr
];

function plural_fr_CA(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === 0 || i === 1) return 1;
  return 5;
}

export const locale_fr_CA = [
  'fr-CA',
  [
    ['a', 'p'],
    ['a.m.', 'p.m.'],
  ],
  [
    ['a.m.', 'p.m.'],
    ,
  ],
  [
    ['D', 'L', 'M', 'M', 'J', 'V', 'S'], ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    ['di', 'lu', 'ma', 'me', 'je', 've', 'sa']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    [
      'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juill.', 'août', 'sept.', 'oct.', 'nov.',
      'déc.'
    ],
    [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre',
      'octobre', 'novembre', 'décembre'
    ]
  ],
  , [['av. J.-C.', 'ap. J.-C.'], , ['avant Jésus-Christ', 'après Jésus-Christ']], 0, [6, 0],
  ['yy-MM-dd', 'd MMM y', 'd MMMM y', 'EEEE d MMMM y'],
  [
    'HH \'h\' mm', 'HH \'h\' mm \'min\' ss \'s\'', 'HH \'h\' mm \'min\' ss \'s\' z',
    'HH \'h\' mm \'min\' ss \'s\' zzzz'
  ],
  [
    '{1} {0}',
    ,
    '{1} \'à\' {0}',
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '$', 'dollar canadien', {
    'AUD': ['$ AU', '$'],
    'BEF': ['FB'],
    'BYN': [, 'Br'],
    'CAD': ['$'],
    'CYP': ['£CY'],
    'EGP': [, '£E'],
    'FRF': ['F'],
    'GEL': [],
    'HKD': ['$ HK', '$'],
    'IEP': ['£IE'],
    'ILP': ['£IL'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'ITL': ['₤IT'],
    'KRW': [, '₩'],
    'LBP': [, '£L'],
    'MTP': ['£MT'],
    'MXN': [, '$'],
    'NZD': ['$ NZ', '$'],
    'RHD': ['$RH'],
    'RON': [, 'L'],
    'RWF': [, 'FR'],
    'SGD': ['$ SG', '$'],
    'TWD': [, 'NT$'],
    'USD': ['$ US', '$'],
    'VND': [, '₫'],
    'WST': ['WS$'],
    'XAF': [],
    'XCD': [, '$'],
    'XOF': [],
    'XPF': []
  },
  plural_fr_CA
];

function plural_ga(n: number): number {
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (n === Math.floor(n) && n >= 3 && n <= 6) return 3;
  if (n === Math.floor(n) && n >= 7 && n <= 10) return 4;
  return 5;
}

export const locale_ga = [
  'ga',
  [
    ['a', 'p'],
    ['r.n.', 'i.n.'],
  ],
  [
    ['a', 'p'],
    ['a.m.', 'p.m.'],
  ],
  [
    ['D', 'L', 'M', 'C', 'D', 'A', 'S'], ['Domh', 'Luan', 'Máirt', 'Céad', 'Déar', 'Aoine', 'Sath'],
    [
      'Dé Domhnaigh', 'Dé Luain', 'Dé Máirt', 'Dé Céadaoin', 'Déardaoin', 'Dé hAoine', 'Dé Sathairn'
    ],
    ['Do', 'Lu', 'Má', 'Cé', 'Dé', 'Ao', 'Sa']
  ],
  ,
  [
    ['E', 'F', 'M', 'A', 'B', 'M', 'I', 'L', 'M', 'D', 'S', 'N'],
    [
      'Ean', 'Feabh', 'Márta', 'Aib', 'Beal', 'Meith', 'Iúil', 'Lún', 'MFómh', 'DFómh', 'Samh',
      'Noll'
    ],
    [
      'Eanáir', 'Feabhra', 'Márta', 'Aibreán', 'Bealtaine', 'Meitheamh', 'Iúil', 'Lúnasa',
      'Meán Fómhair', 'Deireadh Fómhair', 'Samhain', 'Nollaig'
    ]
  ],
  , [['RC', 'AD'], , ['Roimh Chríost', 'Anno Domini']], 0, [6, 0],
  ['dd/MM/y', 'd MMM y', 'd MMMM y', 'EEEE d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '€', 'Euro', {'THB': ['฿'], 'TWD': ['NT$']},
  plural_ga
];

function plural_gl(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_gl = [
  'gl',
  [
    ['a.m.', 'p.m.'],
    ,
  ],
  ,
  [
    ['d.', 'l.', 'm.', 'm.', 'x.', 'v.', 's.'],
    ['dom.', 'luns', 'mar.', 'mér.', 'xov.', 'ven.', 'sáb.'],
    ['domingo', 'luns', 'martes', 'mércores', 'xoves', 'venres', 'sábado'],
    ['do.', 'lu.', 'ma.', 'mé.', 'xo.', 've.', 'sá.']
  ],
  [
    ['D', 'L', 'M', 'M', 'X', 'V', 'S'], ['Dom.', 'Luns', 'Mar.', 'Mér.', 'Xov.', 'Ven.', 'Sáb.'],
    ['Domingo', 'Luns', 'Martes', 'Mércores', 'Xoves', 'Venres', 'Sábado'],
    ['Do', 'Lu', 'Ma', 'Mé', 'Xo', 'Ve', 'Sá']
  ],
  [
    ['x.', 'f.', 'm.', 'a.', 'm.', 'x.', 'x.', 'a.', 's.', 'o.', 'n.', 'd.'],
    [
      'xan.', 'feb.', 'mar.', 'abr.', 'maio', 'xuño', 'xul.', 'ago.', 'set.', 'out.', 'nov.', 'dec.'
    ],
    [
      'xaneiro', 'febreiro', 'marzo', 'abril', 'maio', 'xuño', 'xullo', 'agosto', 'setembro',
      'outubro', 'novembro', 'decembro'
    ]
  ],
  [
    ['X', 'F', 'M', 'A', 'M', 'X', 'X', 'A', 'S', 'O', 'N', 'D'],
    [
      'Xan.', 'Feb.', 'Mar.', 'Abr.', 'Maio', 'Xuño', 'Xul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dec.'
    ],
    [
      'Xaneiro', 'Febreiro', 'Marzo', 'Abril', 'Maio', 'Xuño', 'Xullo', 'Agosto', 'Setembro',
      'Outubro', 'Novembro', 'Decembro'
    ]
  ],
  [['a.C.', 'd.C.'], , ['antes de Cristo', 'despois de Cristo']], 1, [6, 0],
  ['dd/MM/yy', 'dd/MM/y', 'd \'de\' MMMM \'de\' y', 'EEEE, d \'de\' MMMM \'de\' y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{0}, {1}',
    ,
    '{0} \'do\' {1}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'Euro', {
    'ESP': ['₧'],
    'JPY': ['JP¥', '¥'],
    'KMF': [, 'FC'],
    'MXN': ['$MX', '$'],
    'RUB': [, 'руб'],
    'THB': ['฿'],
    'TWD': ['NT$']
  },
  plural_gl
];

function plural_gsw(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_gsw = [
  'gsw', [['vorm.', 'nam.'], , ['am Vormittag', 'am Namittag']],
  [['vorm.', 'nam.'], , ['Vormittag', 'Namittag']],
  [
    ['S', 'M', 'D', 'M', 'D', 'F', 'S'], ['Su.', 'Mä.', 'Zi.', 'Mi.', 'Du.', 'Fr.', 'Sa.'],
    ['Sunntig', 'Määntig', 'Ziischtig', 'Mittwuch', 'Dunschtig', 'Friitig', 'Samschtig'],
    ['Su.', 'Mä.', 'Zi.', 'Mi.', 'Du.', 'Fr.', 'Sa.']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'Auguscht', 'Septämber',
      'Oktoober', 'Novämber', 'Dezämber'
    ]
  ],
  ,
  [
    ['v. Chr.', 'n. Chr.'],
    ,
  ],
  1, [6, 0], ['dd.MM.yy', 'dd.MM.y', 'd. MMMM y', 'EEEE, d. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', '’', ';', '%', '+', '−', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'CHF', 'Schwiizer Franke', {'ATS': ['öS']},
  plural_gsw
];

function plural_gu(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === 0 || n === 1) return 1;
  return 5;
}

export const locale_gu = [
  'gu',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['ર', 'સો', 'મં', 'બુ', 'ગુ', 'શુ', 'શ'], ['રવિ', 'સોમ', 'મંગળ', 'બુધ', 'ગુરુ', 'શુક્ર', 'શનિ'],
    ['રવિવાર', 'સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર'],
    ['ર', 'સો', 'મં', 'બુ', 'ગુ', 'શુ', 'શ']
  ],
  ,
  [
    ['જા', 'ફે', 'મા', 'એ', 'મે', 'જૂ', 'જુ', 'ઑ', 'સ', 'ઑ', 'ન', 'ડિ'],
    ['જાન્યુ', 'ફેબ્રુ', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન', 'જુલાઈ', 'ઑગસ્ટ', 'સપ્ટે', 'ઑક્ટો', 'નવે', 'ડિસે'],
    [
      'જાન્યુઆરી', 'ફેબ્રુઆરી', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન', 'જુલાઈ', 'ઑગસ્ટ', 'સપ્ટેમ્બર', 'ઑક્ટોબર', 'નવેમ્બર',
      'ડિસેમ્બર'
    ]
  ],
  , [['ઇ સ પુ', 'ઇસ'], ['ઈ.સ.પૂર્વે', 'ઈ.સ.'], ['ઈસવીસન પૂર્વે', 'ઇસવીસન']], 0, [0, 0],
  ['d/M/yy', 'd MMM, y', 'd MMMM, y', 'EEEE, d MMMM, y'],
  ['hh:mm a', 'hh:mm:ss a', 'hh:mm:ss a z', 'hh:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    '{1} એ {0} વાગ્યે',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##,##0%', '¤#,##,##0.00', '[#E0]'], '₹', 'ભારતીય રૂપિયા',
  {'JPY': ['JP¥', '¥'], 'MUR': [, 'રૂ.'], 'THB': ['฿'], 'TWD': ['NT$'], 'USD': ['US$', '$']},
  plural_gu
];

function plural_haw(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_haw = [
  'haw',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'], ['LP', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
    ['Lāpule', 'Poʻakahi', 'Poʻalua', 'Poʻakolu', 'Poʻahā', 'Poʻalima', 'Poʻaono'],
    ['LP', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6']
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['Ian.', 'Pep.', 'Mal.', 'ʻAp.', 'Mei', 'Iun.', 'Iul.', 'ʻAu.', 'Kep.', 'ʻOk.', 'Now.', 'Kek.'],
    [
      'Ianuali', 'Pepeluali', 'Malaki', 'ʻApelila', 'Mei', 'Iune', 'Iulai', 'ʻAukake', 'Kepakemapa',
      'ʻOkakopa', 'Nowemapa', 'Kekemapa'
    ]
  ],
  ,
  [
    ['BCE', 'CE'],
    ,
  ],
  0, [6, 0], ['d/M/yy', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '$', 'USD', {'JPY': ['JP¥', '¥']}, plural_haw
];

function plural_hi(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === 0 || n === 1) return 1;
  return 5;
}

export const locale_hi = [
  'hi',
  [
    ['पू', 'अ'],
    ['पूर्वाह्न', 'अपराह्न'],
  ],
  ,
  [
    ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'], ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
    ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श']
  ],
  ,
  [
    ['ज', 'फ़', 'मा', 'अ', 'म', 'जू', 'जु', 'अ', 'सि', 'अ', 'न', 'दि'],
    ['जन॰', 'फ़र॰', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुल॰', 'अग॰', 'सित॰', 'अक्तू॰', 'नव॰', 'दिस॰'],
    [
      'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्तूबर', 'नवंबर',
      'दिसंबर'
    ]
  ],
  , [['ईसा-पूर्व', 'ईस्वी'], , ['ईसा-पूर्व', 'ईसवी सन']], 0, [0, 0],
  ['d/M/yy', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} को {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##,##0%', '¤#,##,##0.00', '[#E0]'], '₹', 'भारतीय रुपया',
  {'JPY': ['JP¥', '¥'], 'RON': [, 'लेई'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_hi
];

function plural_hr(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length,
      f = parseInt(n.toString().replace(/^[^.]*\.?/, ''), 10) || 0;
  if (v === 0 && i % 10 === 1 && !(i % 100 === 11) || f % 10 === 1 && !(f % 100 === 11)) return 1;
  if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
          !(i % 100 >= 12 && i % 100 <= 14) ||
      f % 10 === Math.floor(f % 10) && f % 10 >= 2 && f % 10 <= 4 &&
          !(f % 100 >= 12 && f % 100 <= 14))
    return 3;
  return 5;
}

export const locale_hr = [
  'hr',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['N', 'P', 'U', 'S', 'Č', 'P', 'S'], ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
    ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
    ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub']
  ],
  [
    ['n', 'p', 'u', 's', 'č', 'p', 's'], ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
    ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
    ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub']
  ],
  [
    ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
    ['sij', 'velj', 'ožu', 'tra', 'svi', 'lip', 'srp', 'kol', 'ruj', 'lis', 'stu', 'pro'],
    [
      'siječnja', 'veljače', 'ožujka', 'travnja', 'svibnja', 'lipnja', 'srpnja', 'kolovoza',
      'rujna', 'listopada', 'studenoga', 'prosinca'
    ]
  ],
  [
    ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
    ['sij', 'velj', 'ožu', 'tra', 'svi', 'lip', 'srp', 'kol', 'ruj', 'lis', 'stu', 'pro'],
    [
      'siječanj', 'veljača', 'ožujak', 'travanj', 'svibanj', 'lipanj', 'srpanj', 'kolovoz', 'rujan',
      'listopad', 'studeni', 'prosinac'
    ]
  ],
  [['pr.n.e.', 'AD'], ['pr. Kr.', 'po. Kr.'], ['prije Krista', 'poslije Krista']], 1, [6, 0],
  ['dd. MM. y.', 'd. MMM y.', 'd. MMMM y.', 'EEEE, d. MMMM y.'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss (zzzz)'],
  [
    '{1} {0}',
    ,
    '{1} \'u\' {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'HRK', 'hrvatska kuna', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'EUR': [, '€'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VND': [, '₫'],
    'XCD': [, '$'],
    'XPF': []
  },
  plural_hr
];

function plural_hu(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_hu = [
  'hu',
  [
    ['de.', 'du.'],
    ,
  ],
  ,
  [
    ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz'], ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
    ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat'],
    ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo']
  ],
  ,
  [
    ['J', 'F', 'M', 'Á', 'M', 'J', 'J', 'A', 'Sz', 'O', 'N', 'D'],
    [
      'jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.',
      'dec.'
    ],
    [
      'január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus',
      'szeptember', 'október', 'november', 'december'
    ]
  ],
  , [['ie.', 'isz.'], ['i. e.', 'i. sz.'], ['Krisztus előtt', 'időszámításunk szerint']], 1, [6, 0],
  ['y. MM. dd.', 'y. MMM d.', 'y. MMMM d.', 'y. MMMM d., EEEE'],
  ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'Ft', 'magyar forint', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'EUR': [, '€'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'HUF': ['Ft'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VND': [, '₫'],
    'XCD': [, '$']
  },
  plural_hu
];

function plural_hy(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === 0 || i === 1) return 1;
  return 5;
}

export const locale_hy = [
  'hy',
  [
    ['ա', 'հ'],
    ['ԿԱ', 'ԿՀ'],
  ],
  [
    ['ԿԱ', 'ԿՀ'],
    ,
  ],
  [
    ['Կ', 'Ե', 'Ե', 'Չ', 'Հ', 'Ո', 'Շ'], ['կիր', 'երկ', 'երք', 'չրք', 'հնգ', 'ուր', 'շբթ'],
    ['կիրակի', 'երկուշաբթի', 'երեքշաբթի', 'չորեքշաբթի', 'հինգշաբթի', 'ուրբաթ', 'շաբաթ'],
    ['կր', 'եկ', 'եք', 'չք', 'հգ', 'ու', 'շբ']
  ],
  ,
  [
    ['Հ', 'Փ', 'Մ', 'Ա', 'Մ', 'Հ', 'Հ', 'Օ', 'Ս', 'Հ', 'Ն', 'Դ'],
    ['հնվ', 'փտվ', 'մրտ', 'ապր', 'մյս', 'հնս', 'հլս', 'օգս', 'սեպ', 'հոկ', 'նոյ', 'դեկ'],
    [
      'հունվարի', 'փետրվարի', 'մարտի', 'ապրիլի', 'մայիսի', 'հունիսի', 'հուլիսի', 'օգոստոսի',
      'սեպտեմբերի', 'հոկտեմբերի', 'նոյեմբերի', 'դեկտեմբերի'
    ]
  ],
  [
    ['Հ', 'Փ', 'Մ', 'Ա', 'Մ', 'Հ', 'Հ', 'Օ', 'Ս', 'Հ', 'Ն', 'Դ'],
    ['հնվ', 'փտվ', 'մրտ', 'ապր', 'մյս', 'հնս', 'հլս', 'օգս', 'սեպ', 'հոկ', 'նոյ', 'դեկ'],
    [
      'հունվար', 'փետրվար', 'մարտ', 'ապրիլ', 'մայիս', 'հունիս', 'հուլիս', 'օգոստոս', 'սեպտեմբեր',
      'հոկտեմբեր', 'նոյեմբեր', 'դեկտեմբեր'
    ]
  ],
  [['մ.թ.ա.', 'մ.թ.'], , ['Քրիստոսից առաջ', 'Քրիստոսից հետո']], 1, [6, 0],
  ['dd.MM.yy', 'dd MMM, y թ.', 'dd MMMM, y թ.', 'y թ. MMMM d, EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'ՈչԹ', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '֏', 'հայկական դրամ',
  {'AMD': ['֏'], 'JPY': ['JP¥', '¥'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_hy
];

function plural_in(n: number): number {
  return 5;
}

export const locale_in = [
  'id',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['M', 'S', 'S', 'R', 'K', 'J', 'S'], ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
    ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
    [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September',
      'Oktober', 'November', 'Desember'
    ]
  ],
  , [['SM', 'M'], , ['Sebelum Masehi', 'Masehi']], 0, [6, 0],
  ['dd/MM/yy', 'd MMM y', 'd MMMM y', 'EEEE, dd MMMM y'],
  ['HH.mm', 'HH.mm.ss', 'HH.mm.ss z', 'HH.mm.ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', '.'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'Rp', 'Rupiah Indonesia', {
    'AUD': ['AU$', '$'],
    'IDR': ['Rp'],
    'INR': ['Rs', '₹'],
    'JPY': ['JP¥', '¥'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$']
  },
  plural_in
];

function plural_is(n: number): number {
  let i = Math.floor(Math.abs(n)),
      t = parseInt(n.toString().replace(/^[^.]*\.?|0+$/g, ''), 10) || 0;
  if (t === 0 && i % 10 === 1 && !(i % 100 === 11) || !(t === 0)) return 1;
  return 5;
}

export const locale_is = [
  'is',
  [
    ['f.', 'e.'],
    ['f.h.', 'e.h.'],
  ],
  [
    ['f.h.', 'e.h.'],
    ,
  ],
  [
    ['S', 'M', 'Þ', 'M', 'F', 'F', 'L'], ['sun.', 'mán.', 'þri.', 'mið.', 'fim.', 'fös.', 'lau.'],
    [
      'sunnudagur', 'mánudagur', 'þriðjudagur', 'miðvikudagur', 'fimmtudagur', 'föstudagur',
      'laugardagur'
    ],
    ['su.', 'má.', 'þr.', 'mi.', 'fi.', 'fö.', 'la.']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'Á', 'S', 'O', 'N', 'D'],
    ['jan.', 'feb.', 'mar.', 'apr.', 'maí', 'jún.', 'júl.', 'ágú.', 'sep.', 'okt.', 'nóv.', 'des.'],
    [
      'janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní', 'júlí', 'ágúst', 'september', 'október',
      'nóvember', 'desember'
    ]
  ],
  , [['f.k.', 'e.k.'], ['f.Kr.', 'e.Kr.'], ['fyrir Krist', 'eftir Krist']], 1, [6, 0],
  ['d.M.y', 'd. MMM y', 'd. MMMM y', 'EEEE, d. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'kl\'. {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'ISK', 'íslensk króna', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'EUR': [, '€'],
    'GBP': [, '£'],
    'INR': [, '₹'],
    'JPY': ['JP¥', '¥'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VND': [, '₫']
  },
  plural_is
];

function plural_it(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_it = [
  'it',
  [
    ['m.', 'p.'],
    ['AM', 'PM'],
  ],
  ,
  [
    ['D', 'L', 'M', 'M', 'G', 'V', 'S'], ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
    ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
    ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab']
  ],
  ,
  [
    ['G', 'F', 'M', 'A', 'M', 'G', 'L', 'A', 'S', 'O', 'N', 'D'],
    ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
    [
      'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre',
      'ottobre', 'novembre', 'dicembre'
    ]
  ],
  , [['aC', 'dC'], ['a.C.', 'd.C.'], ['avanti Cristo', 'dopo Cristo']], 1, [6, 0],
  ['dd/MM/yy', 'd MMM y', 'd MMMM y', 'EEEE d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '€', 'euro', {
    'BRL': [, 'R$'],
    'BYN': [, 'Br'],
    'EGP': [, '£E'],
    'HKD': [, '$'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NOK': [, 'NKr'],
    'THB': ['฿'],
    'TWD': [, 'NT$'],
    'USD': [, '$']
  },
  plural_it
];

function plural_iw(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  if (i === 2 && v === 0) return 2;
  if (v === 0 && !(n >= 0 && n <= 10) && n % 10 === 0) return 4;
  return 5;
}

export const locale_iw = [
  'he',
  [
    ['לפנה״צ', 'אחה״צ'],
    ,
  ],
  [
    ['לפנה״צ', 'אחה״צ'],
    ['AM', 'PM'],
  ],
  [
    ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
    ['יום א׳', 'יום ב׳', 'יום ג׳', 'יום ד׳', 'יום ה׳', 'יום ו׳', 'שבת'],
    ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'יום שבת'],
    ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['ינו׳', 'פבר׳', 'מרץ', 'אפר׳', 'מאי', 'יוני', 'יולי', 'אוג׳', 'ספט׳', 'אוק׳', 'נוב׳', 'דצמ׳'],
    [
      'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר',
      'נובמבר', 'דצמבר'
    ]
  ],
  , [['לפנה״ס', 'לספירה'], , ['לפני הספירה', 'לספירה']], 0, [5, 6],
  ['d.M.y', 'd בMMM y', 'd בMMMM y', 'EEEE, d בMMMM y'],
  ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} בשעה {0}',
  ],
  ['.', ',', ';', '%', '\u200e+', '\u200e-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '\u200f#,##0.00 ¤;\u200f-#,##0.00 ¤', '#E0'], '₪', 'שקל חדש',
  {'CNY': ['\u200eCN¥\u200e', '¥'], 'ILP': ['ל״י'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_iw
];

function plural_ja(n: number): number {
  return 5;
}

export const locale_ja = [
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
    ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
  {'CNY': ['元', '￥'], 'JPY': ['￥'], 'RON': [, 'レイ']}, plural_ja
];

function plural_ka(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_ka = [
  'ka',
  [
    ['a', 'p'],
    ['AM', 'PM'],
  ],
  [['AM', 'PM'], , ['AM', 'შუადღ. შემდეგ']],
  [
    ['კ', 'ო', 'ს', 'ო', 'ხ', 'პ', 'შ'], ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
    ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'],
    ['კვ', 'ორ', 'სმ', 'ოთ', 'ხთ', 'პრ', 'შბ']
  ],
  ,
  [
    ['ი', 'თ', 'მ', 'ა', 'მ', 'ი', 'ი', 'ა', 'ს', 'ო', 'ნ', 'დ'],
    ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
    [
      'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო',
      'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ]
  ],
  , [['ძვ. წ.', 'ახ. წ.'], , ['ძველი წელთაღრიცხვით', 'ახალი წელთაღრიცხვით']], 1, [6, 0],
  ['dd.MM.yy', 'd MMM. y', 'd MMMM, y', 'EEEE, dd MMMM, y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'არ არის რიცხვი', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '₾', 'ქართული ლარი', {
    'AUD': [, '$'],
    'CNY': [, '¥'],
    'GEL': ['₾'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'NZD': [, '$'],
    'TWD': ['NT$'],
    'USD': ['US$', '$'],
    'VND': [, '₫']
  },
  plural_ka
];

function plural_kk(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_kk = [
  'kk',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['Ж', 'Д', 'С', 'С', 'Б', 'Ж', 'С'], ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб'],
    ['жексенбі', 'дүйсенбі', 'сейсенбі', 'сәрсенбі', 'бейсенбі', 'жұма', 'сенбі'],
    ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб']
  ],
  [
    ['Ж', 'Д', 'С', 'С', 'Б', 'Ж', 'С'], ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб'],
    ['Жексенбі', 'Дүйсенбі', 'Сейсенбі', 'Сәрсенбі', 'Бейсенбі', 'Жұма', 'Сенбі'],
    ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб']
  ],
  [
    ['Қ', 'А', 'Н', 'С', 'М', 'М', 'Ш', 'Т', 'Қ', 'Қ', 'Қ', 'Ж'],
    [
      'қаң.', 'ақп.', 'нау.', 'сәу.', 'мам.', 'мау.', 'шіл.', 'там.', 'қыр.', 'қаз.', 'қар.', 'жел.'
    ],
    [
      'қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек',
      'қазан', 'қараша', 'желтоқсан'
    ]
  ],
  [
    ['Қ', 'А', 'Н', 'С', 'М', 'М', 'Ш', 'Т', 'Қ', 'Қ', 'Қ', 'Ж'],
    [
      'Қаң.', 'Ақп.', 'Нау.', 'Сәу.', 'Мам.', 'Мау.', 'Шіл.', 'Там.', 'Қыр.', 'Қаз.', 'Қар.', 'Жел.'
    ],
    [
      'Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек',
      'Қазан', 'Қараша', 'Желтоқсан'
    ]
  ],
  [['б.з.д.', 'б.з.'], , ['Біздің заманымызға дейін', 'біздің заманымыз']], 1, [6, 0],
  ['dd.MM.yy', 'y \'ж\'. dd MMM', 'y \'ж\'. d MMMM', 'y \'ж\'. d MMMM, EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'сан емес', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '₸', 'Қазақстан теңгесі',
  {'JPY': ['JP¥', '¥'], 'KZT': ['₸'], 'RUB': ['₽'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_kk
];

function plural_km(n: number): number {
  return 5;
}

export const locale_km = [
  'km',
  [
    ['a', 'p'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['អ', 'ច', 'អ', 'ព', 'ព', 'ស', 'ស'], ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'], ,
    ['អា', 'ច', 'អ', 'ពុ', 'ព្រ', 'សុ', 'ស']
  ],
  ,
  [
    ['ម', 'ក', 'ម', 'ម', 'ឧ', 'ម', 'ក', 'ស', 'ក', 'ត', 'វ', 'ធ'],
    ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'],
  ],
  , [['មុន គ.ស.', 'គ.ស.'], , ['មុន​គ្រិស្តសករាជ', 'គ្រិស្តសករាជ']], 0,
  [6, 0], ['d/M/yy', 'd MMM y', 'd MMMM y', 'EEEE d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} នៅ​ម៉ោង {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00¤', '#E0'], '៛', 'រៀល​កម្ពុជា',
  {'JPY': ['JP¥', '¥'], 'KHR': ['៛'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_km
];

function plural_kn(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === 0 || n === 1) return 1;
  return 5;
}

export const locale_kn = [
  'kn',
  [
    ['ಪೂ', 'ಅ'],
    ['ಪೂರ್ವಾಹ್ನ', 'ಅಪರಾಹ್ನ'],
  ],
  [
    ['ಪೂರ್ವಾಹ್ನ', 'ಅಪರಾಹ್ನ'],
    ,
  ],
  [
    ['ಭಾ', 'ಸೋ', 'ಮಂ', 'ಬು', 'ಗು', 'ಶು', 'ಶ'], ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'],
    ['ಭಾನುವಾರ', 'ಸೋಮವಾರ', 'ಮಂಗಳವಾರ', 'ಬುಧವಾರ', 'ಗುರುವಾರ', 'ಶುಕ್ರವಾರ', 'ಶನಿವಾರ'],
    ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ']
  ],
  ,
  [
    ['ಜ', 'ಫೆ', 'ಮಾ', 'ಏ', 'ಮೇ', 'ಜೂ', 'ಜು', 'ಆ', 'ಸೆ', 'ಅ', 'ನ', 'ಡಿ'],
    ['ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿ', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗ', 'ಸೆಪ್ಟೆಂ', 'ಅಕ್ಟೋ', 'ನವೆಂ', 'ಡಿಸೆಂ'],
    [
      'ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್',
      'ಡಿಸೆಂಬರ್'
    ]
  ],
  [
    ['ಜ', 'ಫೆ', 'ಮಾ', 'ಏ', 'ಮೇ', 'ಜೂ', 'ಜು', 'ಆ', 'ಸೆ', 'ಅ', 'ನ', 'ಡಿ'],
    ['ಜನ', 'ಫೆಬ್ರ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿ', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗ', 'ಸೆಪ್ಟೆಂ', 'ಅಕ್ಟೋ', 'ನವೆಂ', 'ಡಿಸೆಂ'],
    [
      'ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್',
      'ಡಿಸೆಂಬರ್'
    ]
  ],
  [['ಕ್ರಿ.ಪೂ', 'ಕ್ರಿ.ಶ'], , ['ಕ್ರಿಸ್ತ ಪೂರ್ವ', 'ಕ್ರಿಸ್ತ ಶಕ']], 0, [0, 0],
  ['d/M/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
  ['hh:mm a', 'hh:mm:ss a', 'hh:mm:ss a z', 'hh:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '₹', 'ಭಾರತೀಯ ರೂಪಾಯಿ',
  {'JPY': ['JP¥', '¥'], 'RON': [, 'ಲೀ'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_kn
];

function plural_ko(n: number): number {
  return 5;
}

export const locale_ko = [
  'ko', [['AM', 'PM'], , ['오전', '오후']], ,
  [
    ['일', '월', '화', '수', '목', '금', '토'], ,
    ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    ['일', '월', '화', '수', '목', '금', '토']
  ],
  ,
  [
    ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    ,
  ],
  , [['BC', 'AD'], , ['기원전', '서기']], 0, [6, 0],
  ['yy. M. d.', 'y. M. d.', 'y년 M월 d일', 'y년 M월 d일 EEEE'],
  ['a h:mm', 'a h:mm:ss', 'a h시 m분 s초 z', 'a h시 m분 s초 zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '₩', '대한민국 원',
  {'AUD': ['AU$', '$'], 'JPY': ['JP¥', '¥'], 'RON': [, 'L'], 'TWD': ['NT$'], 'USD': ['US$', '$']},
  plural_ko
];

function plural_ky(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_ky = [
  'ky', [['тң', 'тк'], , ['таңкы', 'түштөн кийинки']], ,
  [
    ['Ж', 'Д', 'Ш', 'Ш', 'Б', 'Ж', 'И'],
    ['жек.', 'дүй.', 'шейш.', 'шарш.', 'бейш.', 'жума', 'ишм.'],
    ['жекшемби', 'дүйшөмбү', 'шейшемби', 'шаршемби', 'бейшемби', 'жума', 'ишемби'],
    ['жек.', 'дүй.', 'шейш.', 'шарш.', 'бейш.', 'жума', 'ишм.']
  ],
  [
    ['Ж', 'Д', 'Ш', 'Ш', 'Б', 'Ж', 'И'],
    ['жек.', 'дүй.', 'шейш.', 'шарш.', 'бейш.', 'жума', 'ишм.'],
    ['жекшемби', 'дүйшөмбү', 'шейшемби', 'шаршемби', 'бейшемби', 'жума', 'ишемби'],
    ['жк', 'дш.', 'шш.', 'шр.', 'бш.', 'жм.', 'иш.']
  ],
  [
    ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'],
    ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'],
    [
      'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь',
      'ноябрь', 'декабрь'
    ]
  ],
  [
    ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'],
    ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
      'Ноябрь', 'Декабрь'
    ]
  ],
  [['б.з.ч.', 'б.з.'], , ['биздин заманга чейин', 'биздин заман']], 1, [6, 0],
  ['d/M/yy', 'y-\'ж\'., d-MMM', 'y-\'ж\'., d-MMMM', 'y-\'ж\'., d-MMMM, EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'сан эмес', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'сом', 'Кыргызстан сому', {
    'AUD': [, '$'],
    'BMD': [, 'BD$'],
    'BRL': [, 'R$'],
    'BSD': [, 'B$'],
    'BZD': [, 'BZ$'],
    'CAD': [, 'C$'],
    'DOP': [, 'RD$'],
    'EGP': [, 'LE'],
    'GBP': [, '£'],
    'HKD': [, 'HK$'],
    'HRK': [, 'Kn'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JMD': [, 'J$'],
    'JPY': ['JP¥', '¥'],
    'KGS': ['сом'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'THB': ['฿'],
    'TTD': [, 'TT$'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'XCD': [, '$']
  },
  plural_ky
];

function plural_ln(n: number): number {
  if (n === Math.floor(n) && n >= 0 && n <= 1) return 1;
  return 5;
}

export const locale_ln = [
  'ln',
  [
    ['ntɔ́ngɔ́', 'mpókwa'],
    ,
  ],
  ,
  [
    ['e', 'y', 'm', 'm', 'm', 'm', 'p'], ['eye', 'ybo', 'mbl', 'mst', 'min', 'mtn', 'mps'],
    [
      'eyenga', 'mokɔlɔ mwa yambo', 'mokɔlɔ mwa míbalé', 'mokɔlɔ mwa mísáto', 'mokɔlɔ ya mínéi',
      'mokɔlɔ ya mítáno', 'mpɔ́sɔ'
    ],
    ['eye', 'ybo', 'mbl', 'mst', 'min', 'mtn', 'mps']
  ],
  ,
  [
    ['y', 'f', 'm', 'a', 'm', 'y', 'y', 'a', 's', 'ɔ', 'n', 'd'],
    ['yan', 'fbl', 'msi', 'apl', 'mai', 'yun', 'yul', 'agt', 'stb', 'ɔtb', 'nvb', 'dsb'],
    [
      'sánzá ya yambo', 'sánzá ya míbalé', 'sánzá ya mísáto', 'sánzá ya mínei', 'sánzá ya mítáno',
      'sánzá ya motóbá', 'sánzá ya nsambo', 'sánzá ya mwambe', 'sánzá ya libwa', 'sánzá ya zómi',
      'sánzá ya zómi na mɔ̌kɔ́', 'sánzá ya zómi na míbalé'
    ]
  ],
  , [['libóso ya', 'nsima ya Y'], , ['Yambo ya Yézu Krís', 'Nsima ya Yézu Krís']], 1, [6, 0],
  ['d/M/y', 'd MMM y', 'd MMMM y', 'EEEE d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'FC', 'Falánga ya Kongó',
  {'CDF': ['FC'], 'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural_ln
];

function plural_lo(n: number): number {
  return 5;
}

export const locale_lo = [
  'lo',
  [
    ['ກທ', 'ຫຼທ'],
    ['ກ່ອນທ່ຽງ', 'ຫຼັງທ່ຽງ'],
  ],
  ,
  [
    ['ອາ', 'ຈ', 'ອ', 'ພ', 'ພຫ', 'ສຸ', 'ສ'], ['ອາທິດ', 'ຈັນ', 'ອັງຄານ', 'ພຸດ', 'ພະຫັດ', 'ສຸກ', 'ເສົາ'],
    ['ວັນອາທິດ', 'ວັນຈັນ', 'ວັນອັງຄານ', 'ວັນພຸດ', 'ວັນພະຫັດ', 'ວັນສຸກ', 'ວັນເສົາ'],
    ['ອາ.', 'ຈ.', 'ອ.', 'ພ.', 'ພຫ.', 'ສຸ.', 'ສ.']
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    [
      'ມ.ກ.', 'ກ.ພ.', 'ມ.ນ.', 'ມ.ສ.', 'ພ.ພ.', 'ມິ.ຖ.', 'ກ.ລ.', 'ສ.ຫ.', 'ກ.ຍ.', 'ຕ.ລ.', 'ພ.ຈ.', 'ທ.ວ.'
    ],
    [
      'ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖຸນາ', 'ກໍລະກົດ', 'ສິງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ',
      'ທັນວາ'
    ]
  ],
  , [['ກ່ອນ ຄ.ສ.', 'ຄ.ສ.'], , ['ກ່ອນຄຣິດສັກກະລາດ', 'ຄຣິດສັກກະລາດ']], 0, [6, 0],
  ['d/M/y', 'd MMM y', 'd MMMM y', 'EEEE ທີ d MMMM G y'],
  ['H:mm', 'H:mm:ss', 'H ໂມງ m ນາທີ ss ວິນາທີ z', 'H ໂມງ m ນາທີ ss ວິນາທີ zzzz'],
  [
    '{1}, {0}',
    ,
    ,
  ],
  [
    ',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞',
    'ບໍ່​ແມ່ນ​ໂຕ​ເລກ', ':'
  ],
  ['#,##0.###', '#,##0%', '¤#,##0.00;¤-#,##0.00', '#'], '₭', 'ລາວ ກີບ',
  {'JPY': ['JP¥', '¥'], 'LAK': ['₭'], 'THB': ['฿'], 'TWD': ['NT$'], 'USD': ['US$', '$']}, plural_lo
];

function plural_lt(n: number): number {
  let f = parseInt(n.toString().replace(/^[^.]*\.?/, ''), 10) || 0;
  if (n % 10 === 1 && !(n % 100 >= 11 && n % 100 <= 19)) return 1;
  if (n % 10 === Math.floor(n % 10) && n % 10 >= 2 && n % 10 <= 9 &&
      !(n % 100 >= 11 && n % 100 <= 19))
    return 3;
  if (!(f === 0)) return 4;
  return 5;
}

export const locale_lt = [
  'lt',
  [
    ['pr. p.', 'pop.'],
    ['priešpiet', 'popiet'],
  ],
  ,
  [
    ['S', 'P', 'A', 'T', 'K', 'P', 'Š'], ['sk', 'pr', 'an', 'tr', 'kt', 'pn', 'št'],
    [
      'sekmadienis', 'pirmadienis', 'antradienis', 'trečiadienis', 'ketvirtadienis', 'penktadienis',
      'šeštadienis'
    ],
    ['Sk', 'Pr', 'An', 'Tr', 'Kt', 'Pn', 'Št']
  ],
  ,
  [
    ['S', 'V', 'K', 'B', 'G', 'B', 'L', 'R', 'R', 'S', 'L', 'G'],
    [
      'saus.', 'vas.', 'kov.', 'bal.', 'geg.', 'birž.', 'liep.', 'rugp.', 'rugs.', 'spal.',
      'lapkr.', 'gruod.'
    ],
    [
      'sausio', 'vasario', 'kovo', 'balandžio', 'gegužės', 'birželio', 'liepos', 'rugpjūčio',
      'rugsėjo', 'spalio', 'lapkričio', 'gruodžio'
    ]
  ],
  [
    ['S', 'V', 'K', 'B', 'G', 'B', 'L', 'R', 'R', 'S', 'L', 'G'],
    [
      'saus.', 'vas.', 'kov.', 'bal.', 'geg.', 'birž.', 'liep.', 'rugp.', 'rugs.', 'spal.',
      'lapkr.', 'gruod.'
    ],
    [
      'sausis', 'vasaris', 'kovas', 'balandis', 'gegužė', 'birželis', 'liepa', 'rugpjūtis',
      'rugsėjis', 'spalis', 'lapkritis', 'gruodis'
    ]
  ],
  [['pr. Kr.', 'po Kr.'], , ['prieš Kristų', 'po Kristaus']], 1, [6, 0],
  ['y-MM-dd', , 'y \'m\'. MMMM d \'d\'.', 'y \'m\'. MMMM d \'d\'., EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '−', '×10^', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'Euras', {
    'AUD': [, '$'],
    'BDT': [],
    'BRL': [, 'R$'],
    'BYN': [, 'Br'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [],
    'INR': [],
    'JPY': [, '¥'],
    'KHR': [],
    'KRW': [, '₩'],
    'LAK': [],
    'MNT': [],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'PLN': [, 'zl'],
    'PYG': [, 'Gs'],
    'RUB': [, 'rb'],
    'TWD': [, '$'],
    'USD': [, '$'],
    'VND': [],
    'XAF': [],
    'XCD': [, '$'],
    'XOF': [],
    'XPF': []
  },
  plural_lt
];

function plural_lv(n: number): number {
  let v = n.toString().replace(/^[^.]*\.?/, '').length,
      f = parseInt(n.toString().replace(/^[^.]*\.?/, ''), 10) || 0;
  if (n % 10 === 0 || n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 19 ||
      v === 2 && f % 100 === Math.floor(f % 100) && f % 100 >= 11 && f % 100 <= 19)
    return 0;
  if (n % 10 === 1 && !(n % 100 === 11) || v === 2 && f % 10 === 1 && !(f % 100 === 11) ||
      !(v === 2) && f % 10 === 1)
    return 1;
  return 5;
}

export const locale_lv = [
  'lv', [['priekšp.', 'pēcp.'], , ['priekšpusdienā', 'pēcpusdienā']],
  [['priekšp.', 'pēcpusd.'], , ['priekšpusdiena', 'pēcpusdiena']],
  [
    ['S', 'P', 'O', 'T', 'C', 'P', 'S'],
    ['svētd.', 'pirmd.', 'otrd.', 'trešd.', 'ceturtd.', 'piektd.', 'sestd.'],
    ['svētdiena', 'pirmdiena', 'otrdiena', 'trešdiena', 'ceturtdiena', 'piektdiena', 'sestdiena'],
    ['Sv', 'Pr', 'Ot', 'Tr', 'Ce', 'Pk', 'Se']
  ],
  [
    ['S', 'P', 'O', 'T', 'C', 'P', 'S'],
    ['Svētd.', 'Pirmd.', 'Otrd.', 'Trešd.', 'Ceturtd.', 'Piektd.', 'Sestd.'],
    ['Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena'],
    ['Sv', 'Pr', 'Ot', 'Tr', 'Ce', 'Pk', 'Se']
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    [
      'janv.', 'febr.', 'marts', 'apr.', 'maijs', 'jūn.', 'jūl.', 'aug.', 'sept.', 'okt.', 'nov.',
      'dec.'
    ],
    [
      'janvāris', 'februāris', 'marts', 'aprīlis', 'maijs', 'jūnijs', 'jūlijs', 'augusts',
      'septembris', 'oktobris', 'novembris', 'decembris'
    ]
  ],
  , [['p.m.ē.', 'm.ē.'], , ['pirms mūsu ēras', 'mūsu ērā']], 1, [6, 0],
  ['dd.MM.yy', 'y. \'gada\' d. MMM', 'y. \'gada\' d. MMMM', 'EEEE, y. \'gada\' d. MMMM'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NS', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '€', 'eiro',
  {'AUD': ['AU$', '$'], 'LVL': ['Ls'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_lv
];

function plural_mk(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length,
      f = parseInt(n.toString().replace(/^[^.]*\.?/, ''), 10) || 0;
  if (v === 0 && i % 10 === 1 || f % 10 === 1) return 1;
  return 5;
}

export const locale_mk = [
  'mk', [['претпл.', 'попл.'], , ['претпладне', 'попладне']], ,
  [
    ['н', 'п', 'в', 'с', 'ч', 'п', 'с'], ['нед.', 'пон.', 'вт.', 'сре.', 'чет.', 'пет.', 'саб.'],
    ['недела', 'понеделник', 'вторник', 'среда', 'четврток', 'петок', 'сабота'],
    ['нед.', 'пон.', 'вто.', 'сре.', 'чет.', 'пет.', 'саб.']
  ],
  [
    ['н', 'п', 'в', 'с', 'ч', 'п', 'с'], ['нед.', 'пон.', 'вто.', 'сре.', 'чет.', 'пет.', 'саб.'],
    ['недела', 'понеделник', 'вторник', 'среда', 'четврток', 'петок', 'сабота'],
    ['нед.', 'пон.', 'вто.', 'сре.', 'чет.', 'пет.', 'саб.']
  ],
  [
    ['ј', 'ф', 'м', 'а', 'м', 'ј', 'ј', 'а', 'с', 'о', 'н', 'д'],
    [
      'јан.', 'фев.', 'мар.', 'апр.', 'мај', 'јун.', 'јул.', 'авг.', 'септ.', 'окт.', 'ноем.',
      'дек.'
    ],
    [
      'јануари', 'февруари', 'март', 'април', 'мај', 'јуни', 'јули', 'август', 'септември',
      'октомври', 'ноември', 'декември'
    ]
  ],
  , [['пр.н.е.', 'н.е.'], , ['пред нашата ера', 'од нашата ера']], 1, [6, 0],
  ['dd.M.yy', 'dd.M.y', 'dd MMMM y', 'EEEE, dd MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'ден', 'Македонски денар', {
    'AUD': [, '$'],
    'CNY': [, '¥'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MKD': ['ден'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'USD': ['US$', '$'],
    'VND': [, '₫']
  },
  plural_mk
];

function plural_ml(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_ml = [
  'ml',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['ഞ', 'തി', 'ചൊ', 'ബു', 'വ്യാ', 'വെ', 'ശ'],
    ['ഞായർ', 'തിങ്കൾ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'വെള്ളി', 'ശനി'],
    [
      'ഞായറാഴ്\u200cച', 'തിങ്കളാഴ്\u200cച', 'ചൊവ്വാഴ്ച', 'ബുധനാഴ്\u200cച', 'വ്യാഴാഴ്\u200cച',
      'വെള്ളിയാഴ്\u200cച', 'ശനിയാഴ്\u200cച'
    ],
    ['ഞാ', 'തി', 'ചൊ', 'ബു', 'വ്യാ', 'വെ', 'ശ']
  ],
  [
    ['ഞാ', 'തി', 'ചൊ', 'ബു', 'വ്യാ', 'വെ', 'ശ'],
    ['ഞായർ', 'തിങ്കൾ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'വെള്ളി', 'ശനി'],
    [
      'ഞായറാഴ്\u200cച', 'തിങ്കളാഴ്\u200cച', 'ചൊവ്വാഴ്\u200cച', 'ബുധനാഴ്\u200cച', 'വ്യാഴാഴ്\u200cച',
      'വെള്ളിയാഴ്\u200cച', 'ശനിയാഴ്\u200cച'
    ],
    ['ഞാ', 'തി', 'ചൊ', 'ബു', 'വ്യാ', 'വെ', 'ശ']
  ],
  [
    ['ജ', 'ഫെ', 'മാ', 'ഏ', 'മെ', 'ജൂൺ', 'ജൂ', 'ഓ', 'സെ', 'ഒ', 'ന', 'ഡി'],
    ['ജനു', 'ഫെബ്രു', 'മാർ', 'ഏപ്രി', 'മേയ്', 'ജൂൺ', 'ജൂലൈ', 'ഓഗ', 'സെപ്റ്റം', 'ഒക്ടോ', 'നവം', 'ഡിസം'],
    [
      'ജനുവരി', 'ഫെബ്രുവരി', 'മാർച്ച്', 'ഏപ്രിൽ', 'മേയ്', 'ജൂൺ', 'ജൂലൈ', 'ഓഗസ്റ്റ്', 'സെപ്റ്റംബർ', 'ഒക്\u200cടോബർ',
      'നവംബർ', 'ഡിസംബർ'
    ]
  ],
  , [['ക്രി.മു.', 'എഡി'], , ['ക്രിസ്\u200cതുവിന് മുമ്പ്', 'ആന്നോ ഡൊമിനി']], 0, [0, 0],
  ['d/M/yy', 'y, MMM d', 'y, MMMM d', 'y, MMMM d, EEEE'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '₹', 'ഇന്ത്യൻ രൂപ', {'THB': ['฿'], 'TWD': ['NT$']},
  plural_ml
];

function plural_mn(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_mn = [
  'mn', [['үө', 'үх'], ['ҮӨ', 'ҮХ'], ['ү.ө', 'ү.х']],
  [
    ['ҮӨ', 'ҮХ'],
    ,
  ],
  [
    ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'], ,
    ['ням', 'даваа', 'мягмар', 'лхагва', 'пүрэв', 'баасан', 'бямба'],
    ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя']
  ],
  ,
  [
    ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
    [
      '1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар', '7-р сар', '8-р сар',
      '9-р сар', '10-р сар', '11-р сар', '12-р сар'
    ],
    [
      'Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар',
      'Зургаадугаар сар', 'Долдугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар',
      'Арван нэгдүгээр сар', 'Арван хоёрдугаар сар'
    ]
  ],
  , [['МЭӨ', 'МЭ'], , ['манай эриний өмнөх', 'манай эриний']], 1, [6, 0],
  ['y.MM.dd', , 'y \'оны\' MMM\'ын\' d', 'y \'оны\' MMM\'ын\' d. EEEE \'гараг\'.'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss (z)', 'HH:mm:ss (zzzz)'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], '₮', 'төгрөг',
  {'JPY': ['JP¥', '¥'], 'MNT': ['₮'], 'SEK': [, 'кр'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_mn
];

function plural_mo(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  if (!(v === 0) || n === 0 ||
      !(n === 1) && n % 100 === Math.floor(n % 100) && n % 100 >= 1 && n % 100 <= 19)
    return 3;
  return 5;
}

export const locale_mo = [
  'ro-MD',
  [
    ['a.m.', 'p.m.'],
    ,
  ],
  ,
  [
    ['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S'], ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
    ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'],
    ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ']
  ],
  ,
  [
    ['I', 'F', 'M', 'A', 'M', 'I', 'I', 'A', 'S', 'O', 'N', 'D'],
    [
      'ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.', 'iul.', 'aug.', 'sept.', 'oct.', 'nov.', 'dec.'
    ],
    [
      'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie',
      'octombrie', 'noiembrie', 'decembrie'
    ]
  ],
  , [['î.Hr.', 'd.Hr.'], , ['înainte de Hristos', 'după Hristos']], 1, [6, 0],
  ['dd.MM.y', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'L', 'leu moldovenesc', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'EUR': [, '€'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MDL': ['L'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VND': [, '₫'],
    'XCD': [, '$']
  },
  plural_mo
];

function plural_mr(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === 0 || n === 1) return 1;
  return 5;
}

export const locale_mr = [
  'mr',
  [
    ['स', 'सं'],
    ['म.पू.', 'म.उ.'],
  ],
  [
    ['म.पू.', 'म.उ.'],
    ,
  ],
  [
    ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'], ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
    ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श']
  ],
  ,
  [
    ['जा', 'फे', 'मा', 'ए', 'मे', 'जू', 'जु', 'ऑ', 'स', 'ऑ', 'नो', 'डि'],
    ['जाने', 'फेब्रु', 'मार्च', 'एप्रि', 'मे', 'जून', 'जुलै', 'ऑग', 'सप्टें', 'ऑक्टो', 'नोव्हें', 'डिसें'],
    [
      'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर',
      'डिसेंबर'
    ]
  ],
  , [['इ. स. पू.', 'इ. स.'], , ['ईसवीसनपूर्व', 'ईसवीसन']], 0, [0, 0],
  ['d/M/yy', 'd MMM, y', 'd MMMM, y', 'EEEE, d MMMM, y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} रोजी {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##0%', '¤#,##0.00', '[#E0]'], '₹', 'भारतीय रुपया',
  {'JPY': ['JP¥', '¥'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_mr
];

function plural_ms(n: number): number {
  return 5;
}

export const locale_ms = [
  'ms',
  [
    ['a', 'p'],
    ['PG', 'PTG'],
  ],
  ,
  [
    ['A', 'I', 'S', 'R', 'K', 'J', 'S'], ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
    ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
    ['Ah', 'Is', 'Se', 'Ra', 'Kh', 'Ju', 'Sa']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'O', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'],
    [
      'Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober',
      'November', 'Disember'
    ]
  ],
  ,
  [
    ['S.M.', 'TM'],
    ,
  ],
  1, [6, 0], ['d/MM/yy', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'RM', 'Ringgit Malaysia', {
    'CAD': [, '$'],
    'JPY': ['JP¥', '¥'],
    'MXN': [, '$'],
    'MYR': ['RM'],
    'TWD': ['NT$'],
    'USD': [, '$']
  },
  plural_ms
];

function plural_mt(n: number): number {
  if (n === 1) return 1;
  if (n === 0 || n % 100 === Math.floor(n % 100) && n % 100 >= 2 && n % 100 <= 10) return 3;
  if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 19) return 4;
  return 5;
}

export const locale_mt = [
  'mt',
  [
    ['am', 'pm'],
    ['AM', 'PM'],
  ],
  ,
  [
    ['Ħd', 'T', 'Tl', 'Er', 'Ħm', 'Ġm', 'Sb'], ['Ħad', 'Tne', 'Tli', 'Erb', 'Ħam', 'Ġim', 'Sib'],
    ['Il-Ħadd', 'It-Tnejn', 'It-Tlieta', 'L-Erbgħa', 'Il-Ħamis', 'Il-Ġimgħa', 'Is-Sibt'],
    ['Ħad', 'Tne', 'Tli', 'Erb', 'Ħam', 'Ġim', 'Sib']
  ],
  [
    ['Ħd', 'Tn', 'Tl', 'Er', 'Ħm', 'Ġm', 'Sb'], ['Ħad', 'Tne', 'Tli', 'Erb', 'Ħam', 'Ġim', 'Sib'],
    ['Il-Ħadd', 'It-Tnejn', 'It-Tlieta', 'L-Erbgħa', 'Il-Ħamis', 'Il-Ġimgħa', 'Is-Sibt'],
    ['Ħad', 'Tne', 'Tli', 'Erb', 'Ħam', 'Ġim', 'Sib']
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'Ġ', 'L', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Fra', 'Mar', 'Apr', 'Mej', 'Ġun', 'Lul', 'Aww', 'Set', 'Ott', 'Nov', 'Diċ'],
    [
      'Jannar', 'Frar', 'Marzu', 'April', 'Mejju', 'Ġunju', 'Lulju', 'Awwissu', 'Settembru',
      'Ottubru', 'Novembru', 'Diċembru'
    ]
  ],
  [
    ['Jn', 'Fr', 'Mz', 'Ap', 'Mj', 'Ġn', 'Lj', 'Aw', 'St', 'Ob', 'Nv', 'Dċ'],
    ['Jan', 'Fra', 'Mar', 'Apr', 'Mej', 'Ġun', 'Lul', 'Aww', 'Set', 'Ott', 'Nov', 'Diċ'],
    [
      'Jannar', 'Frar', 'Marzu', 'April', 'Mejju', 'Ġunju', 'Lulju', 'Awwissu', 'Settembru',
      'Ottubru', 'Novembru', 'Diċembru'
    ]
  ],
  [['QK', 'WK'], , ['Qabel Kristu', 'Wara Kristu']], 0, [6, 0],
  ['dd/MM/y', 'dd MMM y', 'd \'ta\'’ MMMM y', 'EEEE, d \'ta\'’ MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '€', 'ewro',
  {'JPY': ['JP¥', '¥'], 'USD': ['US$', '$']}, plural_mt
];

function plural_my(n: number): number {
  return 5;
}

export const locale_my = [
  'my',
  [
    ['နံနက်', 'ညနေ'],
    ,
  ],
  ,
  [
    ['တ', 'တ', 'အ', 'ဗ', 'က', 'သ', 'စ'],
    ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'],
    ,
  ],
  ,
  [
    ['ဇ', 'ဖ', 'မ', 'ဧ', 'မ', 'ဇ', 'ဇ', 'ဩ', 'စ', 'အ', 'န', 'ဒ'],
    ['ဇန်', 'ဖေ', 'မတ်', 'ဧ', 'မေ', 'ဇွန်', 'ဇူ', 'ဩ', 'စက်', 'အောက်', 'နို', 'ဒီ'],
    [
      'ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်', 'ဇူလိုင်', 'ဩဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ',
      'ဒီဇင်ဘာ'
    ]
  ],
  , [['ဘီစီ', 'အေဒီ'], , ['ခရစ်တော် မပေါ်မီနှစ်', 'ခရစ်နှစ်']], 0, [6, 0],
  ['dd-MM-yy', 'y၊ MMM d', 'y၊ d MMMM', 'y၊ MMMM d၊ EEEE'],
  ['B H:mm', 'B HH:mm:ss', 'z HH:mm:ss', 'zzzz HH:mm:ss'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'ဂဏန်းမဟုတ်သော', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'K', 'မြန်မာ ကျပ်', {
    'ANG': ['NAf'],
    'AWG': ['Afl'],
    'BBD': [, 'Bds$'],
    'BSD': [, 'B$'],
    'HTG': ['G'],
    'JPY': ['JP¥', '¥'],
    'MMK': ['K'],
    'PAB': ['B/.'],
    'THB': ['฿'],
    'TTD': ['TT$', '$'],
    'USD': ['US$', '$']
  },
  plural_my
];

function plural_ne(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_ne = [
  'ne',
  [
    ['पूर्वाह्न', 'अपराह्न'],
    ,
  ],
  ,
  [
    ['आ', 'सो', 'म', 'बु', 'बि', 'शु', 'श'], ['आइत', 'सोम', 'मङ्गल', 'बुध', 'बिहि', 'शुक्र', 'शनि'],
    ['आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'],
    ['आइत', 'सोम', 'मङ्गल', 'बुध', 'बिहि', 'शुक्र', 'शनि']
  ],
  ,
  [
    ['जन', 'फेब', 'मार्च', 'अप्र', 'मे', 'जुन', 'जुल', 'अग', 'सेप', 'अक्टो', 'नोभे', 'डिसे'],
    [
      'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जुन', 'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर',
      'डिसेम्बर'
    ],
  ],
  [
    ['जन', 'फेेब', 'मार्च', 'अप्र', 'मे', 'जुन', 'जुल', 'अग', 'सेप', 'अक्टो', 'नोभे', 'डिसे'],
    [
      'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जुन', 'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर',
      'डिसेम्बर'
    ],
  ],
  [
    ['ईसा पूर्व', 'सन्'],
    ,
  ],
  0, [6, 0], ['yy/M/d', 'y MMM d', 'y MMMM d', 'y MMMM d, EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], 'नेरू', 'नेपाली रूपैयाँ',
  {'JPY': ['JP¥', '¥'], 'NPR': ['नेरू', 'रू'], 'THB': ['฿'], 'USD': ['US$', '$']}, plural_ne
];

function plural_nl(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_nl = [
  'nl',
  [
    ['a.m.', 'p.m.'],
    ,
  ],
  ,
  [
    ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'], ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
    ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
    [
      'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september',
      'oktober', 'november', 'december'
    ]
  ],
  , [['v.C.', 'n.C.'], ['v.Chr.', 'n.Chr.'], ['voor Christus', 'na Christus']], 1, [6, 0],
  ['dd-MM-yy', 'd MMM y', 'd MMMM y', 'EEEE d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    '{1} \'om\' {0}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00;¤ -#,##0.00', '#E0'], '€', 'Euro', {
    'AUD': ['AU$', '$'],
    'CAD': ['C$', '$'],
    'FJD': ['FJ$', '$'],
    'JPY': ['JP¥', '¥'],
    'SBD': ['SI$', '$'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$'],
    'XPF': []
  },
  plural_nl
];

function plural_no(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_no = [
  'nb',
  [
    ['a', 'p'],
    ['a.m.', 'p.m.'],
  ],
  [
    ['a.m.', 'p.m.'],
    ,
  ],
  [
    ['S', 'M', 'T', 'O', 'T', 'F', 'L'], ['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.'],
    ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    ['sø.', 'ma.', 'ti.', 'on.', 'to.', 'fr.', 'lø.']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['jan.', 'feb.', 'mar.', 'apr.', 'mai', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'des.'],
    [
      'januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober',
      'november', 'desember'
    ]
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
    [
      'januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober',
      'november', 'desember'
    ]
  ],
  [['f.Kr.', 'e.Kr.'], , ['før Kristus', 'etter Kristus']], 1, [6, 0],
  ['dd.MM.y', 'd. MMM y', 'd. MMMM y', 'EEEE d. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  ['{1}, {0}', , '{1} \'kl\'. {0}', '{1} {0}'],
  [',', ' ', ';', '%', '+', '−', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '¤ #,##0.00', '#E0'], 'kr', 'norske kroner', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NOK': ['kr'],
    'NZD': [, '$'],
    'RON': [, 'L'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VND': [, '₫'],
    'XAF': [],
    'XCD': [, '$'],
    'XPF': []
  },
  plural_no
];

function plural_or(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_or = [
  'or', [['ପୂ', 'ଅ'], ['am', 'pm'], ['AM', 'PM']],
  [
    ['AM', 'ଅପରାହ୍ନ'],
    ['ପୂର୍ବାହ୍ନ', 'ଅପରାହ୍ନ'],
  ],
  [
    ['ର', 'ସୋ', 'ମ', 'ବୁ', 'ଗୁ', 'ଶୁ', 'ଶ'], ['ରବି', 'ସୋମ', 'ମଙ୍ଗଳ', 'ବୁଧ', 'ଗୁରୁ', 'ଶୁକ୍ର', 'ଶନି'],
    ['ରବିବାର', 'ସୋମବାର', 'ମଙ୍ଗଳବାର', 'ବୁଧବାର', 'ଗୁରୁବାର', 'ଶୁକ୍ରବାର', 'ଶନିବାର'],
    ['ରବି', 'ସୋମ', 'ମଙ୍ଗଳ', 'ବୁଧ', 'ଗୁରୁ', 'ଶୁକ୍ର', 'ଶନି']
  ],
  ,
  [
    ['ଜା', 'ଫେ', 'ମା', 'ଅ', 'ମଇ', 'ଜୁ', 'ଜୁ', 'ଅ', 'ସେ', 'ଅ', 'ନ', 'ଡି'],
    [
      'ଜାନୁଆରୀ', 'ଫେବୃଆରୀ', 'ମାର୍ଚ୍ଚ', 'ଅପ୍ରେଲ', 'ମଇ', 'ଜୁନ', 'ଜୁଲାଇ', 'ଅଗଷ୍ଟ', 'ସେପ୍ଟେମ୍ବର', 'ଅକ୍ଟୋବର',
      'ନଭେମ୍ବର', 'ଡିସେମ୍ବର'
    ],
  ],
  , [['BC', 'AD'], , ['ଖ୍ରୀଷ୍ଟପୂର୍ବ', 'ଖ୍ରୀଷ୍ଟାବ୍ଦ']], 0, [0, 0],
  ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{0} ଠାରେ {1}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##,##0%', '¤ #,##,##0.00', '#E0'], '₹', 'ଟଙ୍କା', {}, plural_or
];

function plural_pa(n: number): number {
  if (n === Math.floor(n) && n >= 0 && n <= 1) return 1;
  return 5;
}

export const locale_pa = [
  'pa',
  [
    ['ਸ.', 'ਸ਼.'],
    ['ਪੂ.ਦੁ.', 'ਬਾ.ਦੁ.'],
  ],
  [
    ['ਪੂ.ਦੁ.', 'ਬਾ.ਦੁ.'],
    ,
  ],
  [
    ['ਐ', 'ਸੋ', 'ਮੰ', 'ਬੁੱ', 'ਵੀ', 'ਸ਼ੁੱ', 'ਸ਼'], ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁੱਧ', 'ਵੀਰ', 'ਸ਼ੁੱਕਰ', 'ਸ਼ਨਿੱਚਰ'],
    ['ਐਤਵਾਰ', 'ਸੋਮਵਾਰ', 'ਮੰਗਲਵਾਰ', 'ਬੁੱਧਵਾਰ', 'ਵੀਰਵਾਰ', 'ਸ਼ੁੱਕਰਵਾਰ', 'ਸ਼ਨਿੱਚਰਵਾਰ'],
    ['ਐਤ', 'ਸੋਮ', 'ਮੰਗ', 'ਬੁੱਧ', 'ਵੀਰ', 'ਸ਼ੁੱਕ', 'ਸ਼ਨਿੱ']
  ],
  ,
  [
    ['ਜ', 'ਫ਼', 'ਮਾ', 'ਅ', 'ਮ', 'ਜੂ', 'ਜੁ', 'ਅ', 'ਸ', 'ਅ', 'ਨ', 'ਦ'],
    ['ਜਨ', 'ਫ਼ਰ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾ', 'ਅਗ', 'ਸਤੰ', 'ਅਕਤੂ', 'ਨਵੰ', 'ਦਸੰ'],
    [
      'ਜਨਵਰੀ', 'ਫ਼ਰਵਰੀ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈਲ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾਈ', 'ਅਗਸਤ', 'ਸਤੰਬਰ', 'ਅਕਤੂਬਰ', 'ਨਵੰਬਰ', 'ਦਸੰਬਰ'
    ]
  ],
  , [['ਈ.ਪੂ.', 'ਸੰਨ'], ['ਈ. ਪੂ.', 'ਸੰਨ'], ['ਈਸਵੀ ਪੂਰਵ', 'ਈਸਵੀ ਸੰਨ']], 0, [0, 0],
  ['d/M/yy', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##,##0%', '¤ #,##,##0.00', '[#E0]'], '₹', 'ਭਾਰਤੀ ਰੁਪਇਆ',
  {'JPY': ['JP¥', '¥'], 'THB': ['฿'], 'TWD': ['NT$'], 'USD': ['US$', '$']}, plural_pa
];

function plural_pl(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
      !(i % 100 >= 12 && i % 100 <= 14))
    return 3;
  if (v === 0 && !(i === 1) && i % 10 === Math.floor(i % 10) && i % 10 >= 0 && i % 10 <= 1 ||
      v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 ||
      v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 12 && i % 100 <= 14)
    return 4;
  return 5;
}

export const locale_pl = [
  'pl',
  [
    ['a', 'p'],
    ['AM', 'PM'],
  ],
  ,
  [
    ['n', 'p', 'w', 'ś', 'c', 'p', 's'], ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
    ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'],
    ['nie', 'pon', 'wto', 'śro', 'czw', 'pią', 'sob']
  ],
  [
    ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'], ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
    ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'],
    ['nie', 'pon', 'wto', 'śro', 'czw', 'pią', 'sob']
  ],
  [
    ['s', 'l', 'm', 'k', 'm', 'c', 'l', 's', 'w', 'p', 'l', 'g'],
    ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
    [
      'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września',
      'października', 'listopada', 'grudnia'
    ]
  ],
  [
    ['S', 'L', 'M', 'K', 'M', 'C', 'L', 'S', 'W', 'P', 'L', 'G'],
    ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
    [
      'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień',
      'październik', 'listopad', 'grudzień'
    ]
  ],
  [['p.n.e.', 'n.e.'], , ['przed naszą erą', 'naszej ery']], 1, [6, 0],
  ['dd.MM.y', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} {0}',
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'zł', 'złoty polski', {
    'AUD': [, '$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'PLN': ['zł'],
    'RON': [, 'lej'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VND': [, '₫']
  },
  plural_pl
];

function plural_pt(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === Math.floor(i) && i >= 0 && i <= 1) return 1;
  return 5;
}

export const locale_pt = [
  'pt',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'], ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    [
      'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira',
      'sábado'
    ],
    ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro',
      'outubro', 'novembro', 'dezembro'
    ]
  ],
  , [['a.C.', 'd.C.'], , ['antes de Cristo', 'depois de Cristo']], 0, [6, 0],
  ['dd/MM/y', 'd \'de\' MMM \'de\' y', 'd \'de\' MMMM \'de\' y', 'EEEE, d \'de\' MMMM \'de\' y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], 'R$', 'Real brasileiro', {
    'AUD': ['AU$', '$'],
    'JPY': ['JP¥', '¥'],
    'PTE': ['Esc.'],
    'RON': [, 'L'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$']
  },
  plural_pt
];

function plural_pt_PT(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === Math.floor(i) && i >= 0 && i <= 1) return 1;
  return 5;
}

export const locale_pt_PT = [
  'pt-PT', [['a.m.', 'p.m.'], , ['da manhã', 'da tarde']], [['a.m.', 'p.m.'], , ['manhã', 'tarde']],
  [
    ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
    [
      'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira',
      'sábado'
    ],
    ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro',
      'outubro', 'novembro', 'dezembro'
    ]
  ],
  , [['a.C.', 'd.C.'], , ['antes de Cristo', 'depois de Cristo']], 1, [6, 0],
  ['dd/MM/yy', 'dd/MM/y', 'd \'de\' MMMM \'de\' y', 'EEEE, d \'de\' MMMM \'de\' y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'às\' {0}',
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '€', 'euro', {
    'AUD': ['AU$', '$'],
    'JPY': ['JP¥', '¥'],
    'PTE': ['​'],
    'RON': [, 'L'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$']
  },
  plural_pt_PT
];

function plural_ro(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  if (!(v === 0) || n === 0 ||
      !(n === 1) && n % 100 === Math.floor(n % 100) && n % 100 >= 1 && n % 100 <= 19)
    return 3;
  return 5;
}

export const locale_ro = [
  'ro',
  [
    ['a.m.', 'p.m.'],
    ,
  ],
  ,
  [
    ['D', 'L', 'M', 'M', 'J', 'V', 'S'], ['dum.', 'lun.', 'mar.', 'mie.', 'joi', 'vin.', 'sâm.'],
    ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'],
    ['du.', 'lu.', 'ma.', 'mi.', 'joi', 'vi.', 'sâ.']
  ],
  ,
  [
    ['I', 'F', 'M', 'A', 'M', 'I', 'I', 'A', 'S', 'O', 'N', 'D'],
    [
      'ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.', 'iul.', 'aug.', 'sept.', 'oct.', 'nov.', 'dec.'
    ],
    [
      'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie',
      'octombrie', 'noiembrie', 'decembrie'
    ]
  ],
  , [['î.Hr.', 'd.Hr.'], , ['înainte de Hristos', 'după Hristos']], 1, [6, 0],
  ['dd.MM.y', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'RON', 'leu românesc', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'EUR': [, '€'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VND': [, '₫'],
    'XCD': [, '$']
  },
  plural_ro
];

function plural_ru(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (v === 0 && i % 10 === 1 && !(i % 100 === 11)) return 1;
  if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
      !(i % 100 >= 12 && i % 100 <= 14))
    return 3;
  if (v === 0 && i % 10 === 0 ||
      v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 ||
      v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 11 && i % 100 <= 14)
    return 4;
  return 5;
}

export const locale_ru = [
  'ru',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'], ,
    ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
  ],
  [
    ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'], ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
  ],
  [
    ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'],
    [
      'янв.', 'февр.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сент.', 'окт.', 'нояб.',
      'дек.'
    ],
    [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
      'октября', 'ноября', 'декабря'
    ]
  ],
  [
    ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'],
    [
      'янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.',
      'дек.'
    ],
    [
      'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь',
      'ноябрь', 'декабрь'
    ]
  ],
  [['до н.э.', 'н.э.'], ['до н. э.', 'н. э.'], ['до Рождества Христова', 'от Рождества Христова']],
  1, [6, 0], ['dd.MM.y', 'd MMM y \'г\'.', 'd MMMM y \'г\'.', 'EEEE, d MMMM y \'г\'.'],
  ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'не число', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '₽', 'российский рубль', {
    'GEL': [, 'ლ'],
    'RON': [, 'L'],
    'RUB': ['₽'],
    'RUR': ['р.'],
    'THB': ['฿'],
    'TMT': ['ТМТ'],
    'TWD': ['NT$'],
    'UAH': ['₴'],
    'XXX': ['XXXX']
  },
  plural_ru
];

function plural_sh(n: number): number {
  return 5;
}

export const locale_sh = [
  'sr-Latn',
  [
    ['a', 'p'],
    ['pre podne', 'po podne'],
  ],
  [
    ['pre podne', 'po podne'],
    ,
  ],
  [
    ['n', 'p', 'u', 's', 'č', 'p', 's'], ['ned', 'pon', 'uto', 'sre', 'čet', 'pet', 'sub'],
    ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'],
    ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su']
  ],
  ,
  [
    ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
    ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
    [
      'januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar',
      'novembar', 'decembar'
    ]
  ],
  , [['p.n.e.', 'n.e.'], ['p. n. e.', 'n. e.'], ['pre nove ere', 'nove ere']], 1, [6, 0],
  ['d.M.yy.', 'dd.MM.y.', 'dd. MMMM y.', 'EEEE, dd. MMMM y.'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'RSD', 'Srpski dinar', {
    'AUD': [, '$'],
    'BAM': ['KM'],
    'BYN': [, 'r.'],
    'GEL': [, 'ლ'],
    'KRW': [, '₩'],
    'NZD': [, '$'],
    'TWD': ['NT$'],
    'USD': ['US$', '$'],
    'VND': [, '₫']
  },
  plural_sh
];

function plural_si(n: number): number {
  let i = Math.floor(Math.abs(n)), f = parseInt(n.toString().replace(/^[^.]*\.?/, ''), 10) || 0;
  if (n === 0 || n === 1 || i === 0 && f === 1) return 1;
  return 5;
}

export const locale_si = [
  'si',
  [
    ['පෙ', 'ප'],
    ['පෙ.ව.', 'ප.ව.'],
  ],
  [
    ['පෙ.ව.', 'ප.ව.'],
    ,
  ],
  [
    ['ඉ', 'ස', 'අ', 'බ', 'බ්\u200dර', 'සි', 'සෙ'],
    ['ඉරිදා', 'සඳුදා', 'අඟහ', 'බදාදා', 'බ්\u200dරහස්', 'සිකු', 'සෙන'],
    ['ඉරිදා', 'සඳුදා', 'අඟහරුවාදා', 'බදාදා', 'බ්\u200dරහස්පතින්දා', 'සිකුරාදා', 'සෙනසුරාදා'],
    ['ඉරි', 'සඳු', 'අඟ', 'බදා', 'බ්\u200dරහ', 'සිකු', 'සෙන']
  ],
  ,
  [
    ['ජ', 'පෙ', 'මා', 'අ', 'මැ', 'ජූ', 'ජූ', 'අ', 'සැ', 'ඔ', 'නෙ', 'දෙ'],
    ['ජන', 'පෙබ', 'මාර්තු', 'අප්\u200dරේල්', 'මැයි', 'ජූනි', 'ජූලි', 'අගෝ', 'සැප්', 'ඔක්', 'නොවැ', 'දෙසැ'],
    [
      'ජනවාරි', 'පෙබරවාරි', 'මාර්තු', 'අප්\u200dරේල්', 'මැයි', 'ජූනි', 'ජූලි', 'අගෝස්තු', 'සැප්තැම්බර්', 'ඔක්තෝබර්',
      'නොවැම්බර්', 'දෙසැම්බර්'
    ]
  ],
  [
    ['ජ', 'පෙ', 'මා', 'අ', 'මැ', 'ජූ', 'ජූ', 'අ', 'සැ', 'ඔ', 'නෙ', 'දෙ'],
    ['ජන', 'පෙබ', 'මාර්', 'අප්\u200dරේල්', 'මැයි', 'ජූනි', 'ජූලි', 'අගෝ', 'සැප්', 'ඔක්', 'නොවැ', 'දෙසැ'],
    [
      'ජනවාරි', 'පෙබරවාරි', 'මාර්තු', 'අප්\u200dරේල්', 'මැයි', 'ජූනි', 'ජූලි', 'අගෝස්තු', 'සැප්තැම්බර්', 'ඔක්තෝබර්',
      'නොවැම්බර්', 'දෙසැම්බර්'
    ]
  ],
  [['ක්\u200dරි.පූ.', 'ක්\u200dරි.ව.'], , ['ක්\u200dරිස්තු පූර්ව', 'ක්\u200dරිස්තු වර්ෂ']], 1, [6, 0],
  ['y-MM-dd', 'y MMM d', 'y MMMM d', 'y MMMM d, EEEE'],
  ['HH.mm', 'HH.mm.ss', 'HH.mm.ss z', 'HH.mm.ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', '.'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#'], 'රු.', 'ශ්\u200dරී ලංකා රුපියල', {
    'JPY': ['JP¥', '¥'],
    'LKR': ['රු.'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$'],
    'XOF': ['සිෆ්එ']
  },
  plural_si
];

function plural_sk(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  if (i === Math.floor(i) && i >= 2 && i <= 4 && v === 0) return 3;
  if (!(v === 0)) return 4;
  return 5;
}

export const locale_sk = [
  'sk',
  [
    ['AM', 'PM'],
    ,
  ],
  ,
  [
    ['n', 'p', 'u', 's', 'š', 'p', 's'], ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so'],
    ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'],
    ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so']
  ],
  ,
  [
    ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
    ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec'],
    [
      'januára', 'februára', 'marca', 'apríla', 'mája', 'júna', 'júla', 'augusta', 'septembra',
      'októbra', 'novembra', 'decembra'
    ]
  ],
  [
    ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
    ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec'],
    [
      'január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október',
      'november', 'december'
    ]
  ],
  [['pred Kr.', 'po Kr.'], , ['pred Kristom', 'po Kristovi']], 1, [6, 0],
  ['d. M. y', , 'd. MMMM y', 'EEEE d. MMMM y'], ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss zzzz'],
  [
    '{1} {0}',
    '{1}, {0}',
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'e', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'euro', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': ['NIS', '₪'],
    'INR': [, '₹'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'USD': [, '$'],
    'VND': [, '₫']
  },
  plural_sk
];

function plural_sl(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (v === 0 && i % 100 === 1) return 1;
  if (v === 0 && i % 100 === 2) return 2;
  if (v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 3 && i % 100 <= 4 || !(v === 0))
    return 3;
  return 5;
}

export const locale_sl = [
  'sl',
  [
    ['d', 'p'],
    ['dop.', 'pop.'],
  ],
  [['d', 'p'], ['dop.', 'pop.'], ['dopoldne', 'popoldne']],
  [
    ['n', 'p', 't', 's', 'č', 'p', 's'], ['ned.', 'pon.', 'tor.', 'sre.', 'čet.', 'pet.', 'sob.'],
    ['nedelja', 'ponedeljek', 'torek', 'sreda', 'četrtek', 'petek', 'sobota'],
    ['ned.', 'pon.', 'tor.', 'sre.', 'čet.', 'pet.', 'sob.']
  ],
  ,
  [
    ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
    ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'avg.', 'sep.', 'okt.', 'nov.', 'dec.'],
    [
      'januar', 'februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september',
      'oktober', 'november', 'december'
    ]
  ],
  , [['pr. Kr.', 'po Kr.'], , ['pred Kristusom', 'po Kristusu']], 1, [6, 0],
  ['d. MM. yy', 'd. MMM y', 'dd. MMMM y', 'EEEE, dd. MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '−', 'e', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'evro', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'GBP': [, '£'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'XCD': [, '$']
  },
  plural_sl
];

function plural_sq(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_sq = [
  'sq',
  [
    ['e paradites', 'e pasdites'],
    ,
  ],
  [
    ['paradite', 'pasdite'],
    ,
  ],
  [
    ['D', 'H', 'M', 'M', 'E', 'P', 'Sh'], ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht'],
    ['e diel', 'e hënë', 'e martë', 'e mërkurë', 'e enjte', 'e premte', 'e shtunë'],
    ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht']
  ],
  [
    ['D', 'H', 'M', 'M', 'E', 'P', 'Sh'], ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht'],
    ['E diel', 'E hënë', 'E martë', 'E mërkurë', 'E enjte', 'E premte', 'E shtunë'],
    ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht']
  ],
  [
    ['j', 'sh', 'm', 'p', 'm', 'q', 'k', 'g', 'sh', 't', 'n', 'dh'],
    ['jan', 'shk', 'mar', 'pri', 'maj', 'qer', 'korr', 'gush', 'sht', 'tet', 'nën', 'dhj'],
    [
      'janar', 'shkurt', 'mars', 'prill', 'maj', 'qershor', 'korrik', 'gusht', 'shtator', 'tetor',
      'nëntor', 'dhjetor'
    ]
  ],
  [
    ['J', 'Sh', 'M', 'P', 'M', 'Q', 'K', 'G', 'Sh', 'T', 'N', 'Dh'],
    ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer', 'Korr', 'Gush', 'Sht', 'Tet', 'Nën', 'Dhj'],
    [
      'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor',
      'Nëntor', 'Dhjetor'
    ]
  ],
  [['p.K.', 'mb.K.'], , ['para Krishtit', 'mbas Krishtit']], 1, [6, 0],
  ['d.M.yy', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a, z', 'h:mm:ss a, zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'në\' {0}',
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'Lekë', 'Leku shqiptar',
  {'ALL': ['Lekë'], 'JPY': ['JP¥', '¥'], 'THB': ['฿'], 'USD': ['US$', '$']}, plural_sq
];

function plural_sr(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length,
      f = parseInt(n.toString().replace(/^[^.]*\.?/, ''), 10) || 0;
  if (v === 0 && i % 10 === 1 && !(i % 100 === 11) || f % 10 === 1 && !(f % 100 === 11)) return 1;
  if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
          !(i % 100 >= 12 && i % 100 <= 14) ||
      f % 10 === Math.floor(f % 10) && f % 10 >= 2 && f % 10 <= 4 &&
          !(f % 100 >= 12 && f % 100 <= 14))
    return 3;
  return 5;
}

export const locale_sr = [
  'sr',
  [
    ['a', 'p'],
    ['пре подне', 'по подне'],
  ],
  [
    ['пре подне', 'по подне'],
    ,
  ],
  [
    ['н', 'п', 'у', 'с', 'ч', 'п', 'с'], ['нед', 'пон', 'уто', 'сре', 'чет', 'пет', 'суб'],
    ['недеља', 'понедељак', 'уторак', 'среда', 'четвртак', 'петак', 'субота'],
    ['не', 'по', 'ут', 'ср', 'че', 'пе', 'су']
  ],
  ,
  [
    ['ј', 'ф', 'м', 'а', 'м', 'ј', 'ј', 'а', 'с', 'о', 'н', 'д'],
    ['јан', 'феб', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'сеп', 'окт', 'нов', 'дец'],
    [
      'јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар',
      'новембар', 'децембар'
    ]
  ],
  , [['п.н.е.', 'н.е.'], ['п. н. е.', 'н. е.'], ['пре нове ере', 'нове ере']], 1, [6, 0],
  ['d.M.yy.', 'dd.MM.y.', 'dd. MMMM y.', 'EEEE, dd. MMMM y.'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'RSD', 'Српски динар', {
    'AUD': [, '$'],
    'BAM': ['КМ', 'KM'],
    'GEL': [, 'ლ'],
    'KRW': [, '₩'],
    'NZD': [, '$'],
    'TWD': ['NT$'],
    'USD': ['US$', '$'],
    'VND': [, '₫']
  },
  plural_sr
];

function plural_sv(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_sv = [
  'sv',
  [
    ['fm', 'em'],
    ,
  ],
  [['fm', 'em'], ['f.m.', 'e.m.'], ['förmiddag', 'eftermiddag']],
  [
    ['S', 'M', 'T', 'O', 'T', 'F', 'L'], ['sön', 'mån', 'tis', 'ons', 'tors', 'fre', 'lör'],
    ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
    ['sö', 'må', 'ti', 'on', 'to', 'fr', 'lö']
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['jan.', 'feb.', 'mars', 'apr.', 'maj', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
    [
      'januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september',
      'oktober', 'november', 'december'
    ]
  ],
  , [['f.Kr.', 'e.Kr.'], , ['före Kristus', 'efter Kristus']], 1, [6, 0],
  ['y-MM-dd', 'd MMM y', 'd MMMM y', 'EEEE d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', '\'kl\'. HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '−', '×10^', '×', '‰', '∞', '¤¤¤', ':'],
  ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'kr', 'svensk krona', {
    'AUD': [, '$'],
    'BBD': ['Bds$', '$'],
    'BMD': ['BM$', '$'],
    'BRL': ['BR$', 'R$'],
    'BSD': ['BS$', '$'],
    'BZD': ['BZ$', '$'],
    'CNY': [, '¥'],
    'DKK': ['Dkr', 'kr'],
    'DOP': ['RD$', '$'],
    'EEK': ['Ekr'],
    'EGP': ['EG£', 'E£'],
    'ESP': [],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'IEP': ['IE£'],
    'INR': [, '₹'],
    'ISK': ['Ikr', 'kr'],
    'JMD': ['JM$', '$'],
    'JPY': [, '¥'],
    'KRW': [, '₩'],
    'NOK': ['Nkr', 'kr'],
    'NZD': [, '$'],
    'RON': [, 'L'],
    'SEK': ['kr'],
    'TWD': [, 'NT$'],
    'USD': ['US$', '$'],
    'VND': [, '₫']
  },
  plural_sv
];

function plural_sw(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_sw = [
  'sw',
  [
    ['am', 'pm'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    ['Jumapili', 'Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi'],
    ,
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ago', 'Sep', 'Okt', 'Nov', 'Des'],
    [
      'Januari', 'Februari', 'Machi', 'Aprili', 'Mei', 'Juni', 'Julai', 'Agosti', 'Septemba',
      'Oktoba', 'Novemba', 'Desemba'
    ]
  ],
  , [['KK', 'BK'], , ['Kabla ya Kristo', 'Baada ya Kristo']], 1, [6, 0],
  ['dd/MM/y', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'TSh', 'Shilingi ya Tanzania', {
    'JPY': ['JP¥', '¥'],
    'KES': ['Ksh'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'TZS': ['TSh'],
    'USD': ['US$', '$']
  },
  plural_sw
];

function plural_ta(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_ta = [
  'ta',
  [
    ['மு.ப', 'பி.ப'],
    ['முற்பகல்', 'பிற்பகல்'],
  ],
  ,
  [
    ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச'],
    ['ஞாயி.', 'திங்.', 'செவ்.', 'புத.', 'வியா.', 'வெள்.', 'சனி'],
    ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'],
    ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச']
  ],
  ,
  [
    ['ஜ', 'பி', 'மா', 'ஏ', 'மே', 'ஜூ', 'ஜூ', 'ஆ', 'செ', 'அ', 'ந', 'டி'],
    ['ஜன.', 'பிப்.', 'மார்.', 'ஏப்.', 'மே', 'ஜூன்', 'ஜூலை', 'ஆக.', 'செப்.', 'அக்.', 'நவ.', 'டிச.'],
    [
      'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்',
      'டிசம்பர்'
    ]
  ],
  , [['கி.மு.', 'கி.பி.'], , ['கிறிஸ்துவுக்கு முன்', 'அன்னோ டோமினி']], 0, [0, 0],
  ['d/M/yy', 'd MMM, y', 'd MMMM, y', 'EEEE, d MMMM, y'],
  ['a h:mm', 'a h:mm:ss', 'a h:mm:ss z', 'a h:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} ’அன்று’ {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##,##0%', '¤ #,##,##0.00', '#E0'], '₹', 'இந்திய ரூபாய்',
  {'THB': ['฿'], 'TWD': ['NT$']}, plural_ta
];

function plural_te(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_te = [
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
    ['ఆ', 'సో', 'మ', 'బు', 'గు', 'శు', 'శ'], ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'],
    ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'],
    ['ఆది', 'సోమ', 'మం', 'బుధ', 'గురు', 'శుక్ర', 'శని']
  ],
  ,
  [
    ['జ', 'ఫి', 'మా', 'ఏ', 'మే', 'జూ', 'జు', 'ఆ', 'సె', 'అ', 'న', 'డి'],
    ['జన', 'ఫిబ్ర', 'మార్చి', 'ఏప్రి', 'మే', 'జూన్', 'జులై', 'ఆగ', 'సెప్టెం', 'అక్టో', 'నవం', 'డిసెం'],
    [
      'జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జులై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్',
      'డిసెంబర్'
    ]
  ],
  , [['క్రీపూ', 'క్రీశ'], , ['క్రీస్తు పూర్వం', 'క్రీస్తు శకం']], 0, [0, 0],
  ['dd-MM-yy', 'd MMM, y', 'd MMMM, y', 'd, MMMM y, EEEE'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    '{1} {0}కి',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##,##0.###', '#,##0%', '¤#,##,##0.00', '#E0'], '₹', 'రూపాయి',
  {'JPY': ['JP¥', '¥'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_te
];

function plural_th(n: number): number {
  return 5;
}

export const locale_th = [
  'th',
  [
    ['a', 'p'],
    ['ก่อนเที่ยง', 'หลังเที่ยง'],
  ],
  [
    ['ก่อนเที่ยง', 'หลังเที่ยง'],
    ,
  ],
  [
    ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'], ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
    ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'],
    ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
  ],
  ,
  [
    [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.',
      'ธ.ค.'
    ],
    ,
    [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน',
      'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ]
  ],
  , [['ก่อน ค.ศ.', 'ค.ศ.'], ['ปีก่อน ค.ศ.', 'ค.ศ.'], ['ปีก่อนคริสต์ศักราช', 'คริสต์ศักราช']], 0, [6, 0],
  ['d/M/yy', 'd MMM y', 'd MMMM G y', 'EEEEที่ d MMMM G y'],
  ['HH:mm', 'HH:mm:ss', 'H นาฬิกา mm นาที ss วินาที z', 'H นาฬิกา mm นาที ss วินาที zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'THB', 'บาท',
  {'AUD': ['AU$', '$'], 'TWD': ['NT$'], 'USD': ['US$', '$']}, plural_th
];

function plural_tl(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length,
      f = parseInt(n.toString().replace(/^[^.]*\.?/, ''), 10) || 0;
  if (v === 0 && (i === 1 || i === 2 || i === 3) ||
      v === 0 && !(i % 10 === 4 || i % 10 === 6 || i % 10 === 9) ||
      !(v === 0) && !(f % 10 === 4 || f % 10 === 6 || f % 10 === 9))
    return 1;
  return 5;
}

export const locale_tl = [
  'fil',
  [
    ['am', 'pm'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['Lin', 'Lun', 'Mar', 'Miy', 'Huw', 'Biy', 'Sab'], ,
    ['Linggo', 'Lunes', 'Martes', 'Miyerkules', 'Huwebes', 'Biyernes', 'Sabado'],
    ['Li', 'Lu', 'Ma', 'Mi', 'Hu', 'Bi', 'Sa']
  ],
  ,
  [
    ['Ene', 'Peb', 'Mar', 'Abr', 'May', 'Hun', 'Hul', 'Ago', 'Set', 'Okt', 'Nob', 'Dis'], ,
    [
      'Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo', 'Hulyo', 'Agosto', 'Setyembre',
      'Oktubre', 'Nobyembre', 'Disyembre'
    ]
  ],
  [
    ['E', 'P', 'M', 'A', 'M', 'Hun', 'Hul', 'Ago', 'Set', 'Okt', 'Nob', 'Dis'],
    ['Ene', 'Peb', 'Mar', 'Abr', 'May', 'Hun', 'Hul', 'Ago', 'Set', 'Okt', 'Nob', 'Dis'],
    [
      'Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo', 'Hulyo', 'Agosto', 'Setyembre',
      'Oktubre', 'Nobyembre', 'Disyembre'
    ]
  ],
  [['BC', 'AD'], , ['Before Christ', 'Anno Domini']], 0, [6, 0],
  ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'nang\' {0}',
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '₱', 'Piso ng Pilipinas',
  {'PHP': ['₱'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_tl
];

function plural_tr(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_tr = [
  'tr',
  [
    ['öö', 'ös'],
    ['ÖÖ', 'ÖS'],
  ],
  [
    ['ÖÖ', 'ÖS'],
    ,
  ],
  [
    ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'], ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    ['Pa', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct']
  ],
  ,
  [
    ['O', 'Ş', 'M', 'N', 'M', 'H', 'T', 'A', 'E', 'E', 'K', 'A'],
    ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim',
      'Kasım', 'Aralık'
    ]
  ],
  , [['MÖ', 'MS'], , ['Milattan Önce', 'Milattan Sonra']], 1, [6, 0],
  ['d.MM.y', 'd MMM y', 'd MMMM y', 'd MMMM y EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '%#,##0', '¤#,##0.00', '#E0'], '₺', 'Türk Lirası',
  {'AUD': ['AU$', '$'], 'RON': [, 'L'], 'THB': ['฿'], 'TRY': ['₺'], 'TWD': ['NT$']}, plural_tr
];

function plural_uk(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (v === 0 && i % 10 === 1 && !(i % 100 === 11)) return 1;
  if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
      !(i % 100 >= 12 && i % 100 <= 14))
    return 3;
  if (v === 0 && i % 10 === 0 ||
      v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 ||
      v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 11 && i % 100 <= 14)
    return 4;
  return 5;
}

export const locale_uk = [
  'uk',
  [
    ['дп', 'пп'],
    ,
  ],
  ,
  [
    ['Н', 'П', 'В', 'С', 'Ч', 'П', 'С'], ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'пʼятниця', 'субота'],
    ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
  ],
  ,
  [
    ['с', 'л', 'б', 'к', 'т', 'ч', 'л', 'с', 'в', 'ж', 'л', 'г'],
    [
      'січ.', 'лют.', 'бер.', 'квіт.', 'трав.', 'черв.', 'лип.', 'серп.', 'вер.', 'жовт.', 'лист.',
      'груд.'
    ],
    [
      'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня',
      'жовтня', 'листопада', 'грудня'
    ]
  ],
  [
    ['С', 'Л', 'Б', 'К', 'Т', 'Ч', 'Л', 'С', 'В', 'Ж', 'Л', 'Г'],
    ['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру'],
    [
      'січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень',
      'вересень', 'жовтень', 'листопад', 'грудень'
    ]
  ],
  [['до н.е.', 'н.е.'], ['до н. е.', 'н. е.'], ['до нашої ери', 'нашої ери']], 1, [6, 0],
  ['dd.MM.yy', 'd MMM y \'р\'.', 'd MMMM y \'р\'.', 'EEEE, d MMMM y \'р\'.'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'о\' {0}',
  ],
  [',', ' ', ';', '%', '+', '-', 'Е', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '₴', 'українська гривня', {
    'AUD': [, '$'],
    'BRL': [, 'R$'],
    'CAD': [, '$'],
    'CNY': [, '¥'],
    'EUR': [, '€'],
    'GBP': [, '£'],
    'HKD': [, '$'],
    'ILS': [, '₪'],
    'INR': [, '₹'],
    'KRW': [, '₩'],
    'MXN': [, '$'],
    'NZD': [, '$'],
    'TWD': [, 'NT$'],
    'UAH': ['₴'],
    'UAK': ['крб.'],
    'USD': [, '$'],
    'VND': [, '₫'],
    'XCD': [, '$']
  },
  plural_uk
];

function plural_ur(n: number): number {
  let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}

export const locale_ur = [
  'ur',
  [
    ['a', 'p'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
    ,
  ],
  ,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    [
      'جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر',
      'دسمبر'
    ],
  ],
  ,
  [
    ['قبل مسیح', 'عیسوی'],
    ,
  ],
  0, [6, 0], ['d/M/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '\u200e+', '\u200e-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], 'Rs', 'پاکستانی روپیہ',
  {'JPY': ['JP¥', '¥'], 'PKR': ['Rs'], 'THB': ['฿'], 'TWD': ['NT$']}, plural_ur
];

function plural_uz(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export const locale_uz = [
  'uz',
  [
    ['TO', 'TK'],
    ,
  ],
  ,
  [
    ['Y', 'D', 'S', 'C', 'P', 'J', 'S'], ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'],
    ['yakshanba', 'dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba'],
    ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh']
  ],
  ,
  [
    ['Y', 'F', 'M', 'A', 'M', 'I', 'I', 'A', 'S', 'O', 'N', 'D'],
    ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek'],
    [
      'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr',
      'noyabr', 'dekabr'
    ]
  ],
  [
    ['Y', 'F', 'M', 'A', 'M', 'I', 'I', 'A', 'S', 'O', 'N', 'D'],
    ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
    [
      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr',
      'Noyabr', 'Dekabr'
    ]
  ],
  [['m.a.', 'milodiy'], , ['miloddan avvalgi', 'milodiy']], 1, [6, 0],
  ['dd/MM/yy', 'd-MMM, y', 'd-MMMM, y', 'EEEE, d-MMMM, y'],
  ['HH:mm', 'HH:mm:ss', 'H:mm:ss (z)', 'H:mm:ss (zzzz)'],
  [
    '{1}, {0}',
    ,
    ,
  ],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'son emas', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'soʻm', 'O‘zbekiston so‘mi',
  {'JPY': ['JP¥', '¥'], 'USD': ['US$', '$'], 'UZS': ['soʻm']}, plural_uz
];

function plural_vi(n: number): number {
  return 5;
}

export const locale_vi = [
  'vi',
  [
    ['s', 'c'],
    ['SA', 'CH'],
  ],
  [
    ['SA', 'CH'],
    ,
  ],
  [
    ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'],
    ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
    ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    [
      'thg 1', 'thg 2', 'thg 3', 'thg 4', 'thg 5', 'thg 6', 'thg 7', 'thg 8', 'thg 9', 'thg 10',
      'thg 11', 'thg 12'
    ],
    [
      'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8',
      'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'
    ]
  ],
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    [
      'Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10',
      'Thg 11', 'Thg 12'
    ],
    [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
      'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ]
  ],
  [
    ['tr. CN', 'sau CN'],
    ['Trước CN', 'sau CN'],
  ],
  1, [6, 0], ['dd/MM/y', 'd MMM, y', 'd MMMM, y', 'EEEE, d MMMM, y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{0}, {1}',
    ,
    '{0} {1}',
  ],
  [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '₫', 'Đồng Việt Nam',
  {'AUD': ['AU$', '$'], 'JPY': ['JP¥', '¥'], 'THB': ['฿'], 'TWD': ['NT$'], 'USD': ['US$', '$']},
  plural_vi
];

function plural_zh(n: number): number {
  return 5;
}

export const locale_zh = [
  'zh',
  [
    ['上午', '下午'],
    ,
  ],
  ,
  [
    ['日', '一', '二', '三', '四', '五', '六'],
    ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ]
  ],
  ,
  [
    ['公元前', '公元'],
    ,
  ],
  0, [6, 0], ['y/M/d', 'y年M月d日', , 'y年M月d日EEEE'],
  ['ah:mm', 'ah:mm:ss', 'z ah:mm:ss', 'zzzz ah:mm:ss'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '￥', '人民币', {
    'AUD': ['AU$', '$'],
    'CNY': ['￥', '¥'],
    'ILR': ['ILS'],
    'JPY': ['JP¥', '¥'],
    'KRW': ['￦', '₩'],
    'TWD': ['NT$'],
    'USD': ['US$', '$']
  },
  plural_zh
];

function plural_zh_CN(n: number): number {
  return 5;
}

export const locale_zh_CN = [
  'zh-Hans',
  [
    ['上午', '下午'],
    ,
  ],
  ,
  [
    ['日', '一', '二', '三', '四', '五', '六'],
    ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  ],
  ,
  [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ]
  ],
  ,
  [
    ['公元前', '公元'],
    ,
  ],
  0, [6, 0], ['y/M/d', 'y年M月d日', , 'y年M月d日EEEE'],
  ['ah:mm', 'ah:mm:ss', 'z ah:mm:ss', 'zzzz ah:mm:ss'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '￥', '人民币', {
    'AUD': ['AU$', '$'],
    'CNY': ['￥', '¥'],
    'ILR': ['ILS'],
    'JPY': ['JP¥', '¥'],
    'KRW': ['￦', '₩'],
    'TWD': ['NT$'],
    'USD': ['US$', '$']
  },
  plural_zh_CN
];

function plural_zh_HK(n: number): number {
  return 5;
}

export const locale_zh_HK = [
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
    ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
  {'AUD': ['AU$', '$'], 'RON': [, 'L'], 'USD': ['US$', '$']}, plural_zh_HK
];

function plural_zh_TW(n: number): number {
  return 5;
}

export const locale_zh_TW = [
  'zh-Hant',
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
    ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  ],
  ,
  [
    ['西元前', '西元'],
    ,
  ],
  0, [6, 0], ['y/M/d', 'y年M月d日', , 'y年M月d日 EEEE'],
  ['ah:mm', 'ah:mm:ss', 'ah:mm:ss [z]', 'ah:mm:ss [zzzz]'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', '非數值', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '$', '新台幣',
  {'AUD': ['AU$', '$'], 'KRW': ['￦', '₩'], 'RON': [, 'L'], 'TWD': ['$'], 'USD': ['US$', '$']},
  plural_zh_TW
];

function plural_zu(n: number): number {
  let i = Math.floor(Math.abs(n));
  if (i === 0 || n === 1) return 1;
  return 5;
}

export const locale_zu = [
  'zu',
  [
    ['a', 'p'],
    ['AM', 'PM'],
  ],
  [
    ['AM', 'PM'],
    ,
  ],
  [
    ['S', 'M', 'B', 'T', 'S', 'H', 'M'], ['Son', 'Mso', 'Bil', 'Tha', 'Sin', 'Hla', 'Mgq'],
    ['ISonto', 'UMsombuluko', 'ULwesibili', 'ULwesithathu', 'ULwesine', 'ULwesihlanu', 'UMgqibelo'],
    ['Son', 'Mso', 'Bil', 'Tha', 'Sin', 'Hla', 'Mgq']
  ],
  ,
  [
    ['J', 'F', 'M', 'E', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mas', 'Eph', 'Mey', 'Jun', 'Jul', 'Aga', 'Sep', 'Okt', 'Nov', 'Dis'],
    [
      'Januwari', 'Februwari', 'Mashi', 'Ephreli', 'Meyi', 'Juni', 'Julayi', 'Agasti', 'Septhemba',
      'Okthoba', 'Novemba', 'Disemba'
    ]
  ],
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mas', 'Eph', 'Mey', 'Jun', 'Jul', 'Aga', 'Sep', 'Okt', 'Nov', 'Dis'],
    [
      'Januwari', 'Februwari', 'Mashi', 'Ephreli', 'Meyi', 'Juni', 'Julayi', 'Agasti', 'Septhemba',
      'Okthoba', 'Novemba', 'Disemba'
    ]
  ],
  [
    ['BC', 'AD'],
    ,
  ],
  0, [6, 0], ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1} {0}',
    ,
    ,
  ],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'R', 'i-South African Rand', {
    'BYN': [, 'P.'],
    'DKK': [, 'Kr'],
    'HRK': [, 'Kn'],
    'ISK': [, 'Kr'],
    'JPY': ['JP¥', '¥'],
    'NOK': [, 'Kr'],
    'PLN': [, 'Zł'],
    'SEK': [, 'Kr'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'USD': ['US$', '$'],
    'ZAR': ['R']
  },
  plural_zu
];


let l: any;

switch (goog.LOCALE) {
  case 'af':
    l = locale_af;
    break;
  case 'am':
    l = locale_am;
    break;
  case 'ar':
    l = locale_ar;
    break;
  case 'ar-DZ':
  case 'ar_DZ':
    l = locale_ar_DZ;
    break;
  case 'az':
    l = locale_az;
    break;
  case 'be':
    l = locale_be;
    break;
  case 'bg':
    l = locale_bg;
    break;
  case 'bn':
    l = locale_bn;
    break;
  case 'br':
    l = locale_br;
    break;
  case 'bs':
    l = locale_bs;
    break;
  case 'ca':
    l = locale_ca;
    break;
  case 'chr':
    l = locale_chr;
    break;
  case 'cs':
    l = locale_cs;
    break;
  case 'cy':
    l = locale_cy;
    break;
  case 'da':
    l = locale_da;
    break;
  case 'de':
    l = locale_de;
    break;
  case 'de-AT':
  case 'de_AT':
    l = locale_de_AT;
    break;
  case 'de-CH':
  case 'de_CH':
    l = locale_de_CH;
    break;
  case 'el':
    l = locale_el;
    break;
  case 'en-AU':
  case 'en_AU':
    l = locale_en_AU;
    break;
  case 'en-CA':
  case 'en_CA':
    l = locale_en_CA;
    break;
  case 'en-GB':
  case 'en_GB':
    l = locale_en_GB;
    break;
  case 'en-IE':
  case 'en_IE':
    l = locale_en_IE;
    break;
  case 'en-IN':
  case 'en_IN':
    l = locale_en_IN;
    break;
  case 'en-SG':
  case 'en_SG':
    l = locale_en_SG;
    break;
  case 'en-ZA':
  case 'en_ZA':
    l = locale_en_ZA;
    break;
  case 'es':
    l = locale_es;
    break;
  case 'es-419':
  case 'es_419':
    l = locale_es_419;
    break;
  case 'es-MX':
  case 'es_MX':
    l = locale_es_MX;
    break;
  case 'es-US':
  case 'es_US':
    l = locale_es_US;
    break;
  case 'et':
    l = locale_et;
    break;
  case 'eu':
    l = locale_eu;
    break;
  case 'fa':
    l = locale_fa;
    break;
  case 'fi':
    l = locale_fi;
    break;
  case 'fr':
    l = locale_fr;
    break;
  case 'fr-CA':
  case 'fr_CA':
    l = locale_fr_CA;
    break;
  case 'ga':
    l = locale_ga;
    break;
  case 'gl':
    l = locale_gl;
    break;
  case 'gsw':
    l = locale_gsw;
    break;
  case 'gu':
    l = locale_gu;
    break;
  case 'haw':
    l = locale_haw;
    break;
  case 'hi':
    l = locale_hi;
    break;
  case 'hr':
    l = locale_hr;
    break;
  case 'hu':
    l = locale_hu;
    break;
  case 'hy':
    l = locale_hy;
    break;
  case 'in':
  case 'id':
    l = locale_in;
    break;
  case 'is':
    l = locale_is;
    break;
  case 'it':
    l = locale_it;
    break;
  case 'iw':
  case 'he':
    l = locale_iw;
    break;
  case 'ja':
    l = locale_ja;
    break;
  case 'ka':
    l = locale_ka;
    break;
  case 'kk':
    l = locale_kk;
    break;
  case 'km':
    l = locale_km;
    break;
  case 'kn':
    l = locale_kn;
    break;
  case 'ko':
    l = locale_ko;
    break;
  case 'ky':
    l = locale_ky;
    break;
  case 'ln':
    l = locale_ln;
    break;
  case 'lo':
    l = locale_lo;
    break;
  case 'lt':
    l = locale_lt;
    break;
  case 'lv':
    l = locale_lv;
    break;
  case 'mk':
    l = locale_mk;
    break;
  case 'ml':
    l = locale_ml;
    break;
  case 'mn':
    l = locale_mn;
    break;
  case 'mo':
  case 'ro-MD':
  case 'ro_MD':
    l = locale_mo;
    break;
  case 'mr':
    l = locale_mr;
    break;
  case 'ms':
    l = locale_ms;
    break;
  case 'mt':
    l = locale_mt;
    break;
  case 'my':
    l = locale_my;
    break;
  case 'ne':
    l = locale_ne;
    break;
  case 'nl':
    l = locale_nl;
    break;
  case 'no':
  case 'nb':
  case 'no-NO':
  case 'no_NO':
    l = locale_no;
    break;
  case 'or':
    l = locale_or;
    break;
  case 'pa':
    l = locale_pa;
    break;
  case 'pl':
    l = locale_pl;
    break;
  case 'pt':
  case 'pt-BR':
  case 'pt_BR':
    l = locale_pt;
    break;
  case 'pt-PT':
  case 'pt_PT':
    l = locale_pt_PT;
    break;
  case 'ro':
    l = locale_ro;
    break;
  case 'ru':
    l = locale_ru;
    break;
  case 'sh':
  case 'sr-Latn':
  case 'sr_Latn':
    l = locale_sh;
    break;
  case 'si':
    l = locale_si;
    break;
  case 'sk':
    l = locale_sk;
    break;
  case 'sl':
    l = locale_sl;
    break;
  case 'sq':
    l = locale_sq;
    break;
  case 'sr':
    l = locale_sr;
    break;
  case 'sv':
    l = locale_sv;
    break;
  case 'sw':
    l = locale_sw;
    break;
  case 'ta':
    l = locale_ta;
    break;
  case 'te':
    l = locale_te;
    break;
  case 'th':
    l = locale_th;
    break;
  case 'tl':
  case 'fil':
    l = locale_tl;
    break;
  case 'tr':
    l = locale_tr;
    break;
  case 'uk':
    l = locale_uk;
    break;
  case 'ur':
    l = locale_ur;
    break;
  case 'uz':
    l = locale_uz;
    break;
  case 'vi':
    l = locale_vi;
    break;
  case 'zh':
    l = locale_zh;
    break;
  case 'zh-CN':
  case 'zh_CN':
  case 'zh-Hans-CN':
  case 'zh_Hans_CN':
  case 'zh-Hans':
  case 'zh_Hans':
    l = locale_zh_CN;
    break;
  case 'zh-HK':
  case 'zh_HK':
  case 'zh-Hant-HK':
  case 'zh_Hant_HK':
    l = locale_zh_HK;
    break;
  case 'zh-TW':
  case 'zh_TW':
  case 'zh-Hant-TW':
  case 'zh_Hant_TW':
  case 'zh-Hant':
  case 'zh_Hant':
    l = locale_zh_TW;
    break;
  case 'zu':
    l = locale_zu;
    break;
}

if (l) {
  registerLocaleData(l, goog.LOCALE);
}
