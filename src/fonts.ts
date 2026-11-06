import {Platform} from 'react-native';
import type {TextStyle} from 'react-native';

export type FontCategory = (typeof fontOptions)[number]['category'];

export type FontFamilyPair = {
  android: string;
  ios: string;
};

export type FontOption = {
  displayName: string;
  category: FontCategory;
  license: string;
  credit: string;
  androidFamily?: string;
  iosFamily?: string;
  secondaryFamilies?: FontFamilyPair[];
  sample: string;
  fontWeight?: TextStyle['fontWeight'];
};

export const fontOptions: FontOption[] = [
  {
    displayName: 'Roboto',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Roboto Project Authors',
    androidFamily: 'Roboto-Regular',
    iosFamily: 'Roboto',
    sample: 'Aa',
  },
  {
    displayName: 'Oswald',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Oswald Project Authors',
    androidFamily: 'Oswald-Regular',
    iosFamily: 'Oswald',
    sample: 'Aa',
  },
  {
    displayName: 'Atkinson Hyperlegible',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'Braille Institute of America, Inc.',
    androidFamily: 'AtkinsonHyperlegible-Regular',
    iosFamily: 'Atkinson Hyperlegible',
    sample: 'Aa',
  },
  {
    displayName: 'Lexend',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Lexend Project Authors',
    androidFamily: 'Lexend-Regular',
    iosFamily: 'Lexend',
    sample: 'Aa',
  },
  {
    displayName: 'Anton',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Anton Project Authors',
    androidFamily: 'Anton-Regular',
    iosFamily: 'Anton',
    sample: 'Aa',
  },
  {
    displayName: 'Playfair Display',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Playfair Display Project Authors',
    androidFamily: 'PlayfairDisplay-Regular',
    iosFamily: 'Playfair Display',
    sample: 'Aa',
  },
  {
    displayName: 'Cinzel',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Cinzel Project Authors',
    androidFamily: 'Cinzel-Regular',
    iosFamily: 'Cinzel',
    sample: 'Aa',
  },
  {
    displayName: 'Cinzel Decorative',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'Natanael Gama',
    androidFamily: 'CinzelDecorative-Regular',
    iosFamily: 'Cinzel Decorative',
    sample: 'Aa',
  },
  {
    displayName: 'DM Serif Display',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'Adobe and Google LLC',
    androidFamily: 'DMSerifDisplay-Regular',
    iosFamily: 'DM Serif Display',
    sample: 'Aa',
  },
  {
    displayName: 'Lora',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Lora Project Authors',
    androidFamily: 'Lora-Regular',
    iosFamily: 'Lora',
    sample: 'Aa',
  },
  {
    displayName: 'Permanent Marker',
    category: 'english',
    license: 'Apache License 2.0',
    credit: 'Font Diner',
    androidFamily: 'PermanentMarker-Regular',
    iosFamily: 'Permanent Marker',
    sample: 'Aa',
  },
  {
    displayName: 'Delius Unicase',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'Natalia Raices and Igino Marini',
    androidFamily: 'DeliusUnicase-Regular',
    iosFamily: 'Delius Unicase',
    sample: 'Aa',
  },
  {
    displayName: 'Playwrite',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Playwrite Project Authors',
    androidFamily: 'PlaywriteUSTrad-Regular',
    iosFamily: 'Playwrite US Trad',
    sample: 'Aa',
  },
  {
    displayName: 'Playpen Sans',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Playpen Sans Project Authors',
    androidFamily: 'PlaypenSans-Regular',
    iosFamily: 'Playpen Sans',
    sample: 'Aa',
  },
  {
    displayName: 'Orbitron',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Orbitron Project Authors',
    androidFamily: 'Orbitron-Regular',
    iosFamily: 'Orbitron',
    sample: 'Aa',
  },
  {
    displayName: 'Monoton',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'vernon adams',
    androidFamily: 'Monoton-Regular',
    iosFamily: 'Monoton',
    sample: 'Aa',
  },
  {
    displayName: 'Doto',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Doto Project Authors',
    androidFamily: 'Doto-Black',
    iosFamily: 'Doto Black',
    sample: 'Aa',
  },
  {
    displayName: 'Doto Rounded',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Doto Project Authors',
    androidFamily: 'Doto_Rounded-Black',
    iosFamily: 'Doto Rounded Black',
    sample: 'Aa',
  },
  {
    displayName: 'Departure Mono',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'Helena Zhang',
    androidFamily: 'DepartureMono-Regular',
    iosFamily: 'Departure Mono',
    sample: 'Aa',
  },
  {
    displayName: 'Silkscreen',
    category: 'english',
    license: 'SIL Open Font License 1.1',
    credit: 'The Silkscreen Project Authors',
    androidFamily: 'Silkscreen-Regular',
    iosFamily: 'Silkscreen',
    sample: 'Aa',
  },
  {
    displayName: '源流明體',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: 'But Ko',
    androidFamily: 'GenRyuMin2TC-R',
    iosFamily: 'GenRyuMin2 TC',
    sample: '源流明體',
  },
  {
    displayName: '源雲明體',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: 'But Ko',
    androidFamily: 'GenWanMin2TC-R',
    iosFamily: 'GenWanMin2 TC',
    sample: '源雲明體',
  },
  {
    displayName: '源石黑體',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: 'But Ko',
    androidFamily: 'GenSekiGothic2TC-R',
    iosFamily: 'GenSekiGothic2 TC',
    sample: '源石黑體',
  },
  {
    displayName: '芫荽',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: 'The Iansui Project Authors',
    androidFamily: 'Iansui-Regular',
    iosFamily: 'Iansui',
    sample: '芫荽',
  },
  {
    displayName: '饅頭黑體',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: 'Mant0u and The Dela Gothic Project Authors',
    androidFamily: 'MantouSans-Regular',
    iosFamily: 'Mantou Sans',
    sample: '饅頭黑體',
  },
  {
    displayName: '貓啃什錦黑',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: 'Skr-ZERO',
    androidFamily: 'MaokenAssortedSans-TC',
    iosFamily: 'MaokenAssortedSans-TC',
    sample: '貓啃什錦黑',
  },
  {
    displayName: '內海字體',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: 'max32002',
    androidFamily: 'NaikaiFont-Regular',
    iosFamily: 'NaikaiFont',
    sample: '內海字體',
  },
  {
    displayName: '昭源宋體',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: 'The Chiron Sung HK Project Authors',
    androidFamily: 'ChironSungHK-Regular',
    iosFamily: 'Chiron Sung HK',
    sample: '昭源宋體',
  },
  {
    displayName: '昭源黑體',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: 'The Chiron Hei HK Project Authors',
    androidFamily: 'ChironHeiHK-Regular',
    iosFamily: 'Chiron Hei HK',
    sample: '昭源黑體',
  },
  {
    displayName: '昭源環方',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: 'The Chiron GoRound TC Project Authors',
    androidFamily: 'ChironGoRoundTC-Regular',
    iosFamily: 'Chiron GoRound TC',
    sample: '昭源環方',
  },
  {
    displayName: '隨峰體',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: '阿坤',
    androidFamily: 'ThePeakFontBeta_V0_102',
    iosFamily: 'The Peak Font 隨峰體 Beta',
    sample: '隨峰體',
  },
  {
    displayName: '俐方體11號',
    category: 'chinese',
    license: 'SIL Open Font License 1.1',
    credit: 'M+ FONTS PROJECT',
    androidFamily: 'Cubic_11',
    iosFamily: 'Cubic 11',
    sample: '俐方體11號',
  },
];

export function getFontOptionsByCategory(category: FontCategory) {
  return fontOptions.filter(option => option.category === category);
}

export function getFontCategories() {
  return Array.from(new Set(fontOptions.map(option => option.category)));
}

export function getFontCategory(fontFamily: string) {
  const option = fontOptions.find(item => getFontFamily(item) === fontFamily);

  return option?.category;
}

export const defaultOutputFontFamily =
  Platform.OS === 'android'
    ? fontOptions[0].androidFamily ?? fontOptions[0].iosFamily ?? ''
    : fontOptions[0].iosFamily ?? fontOptions[0].androidFamily ?? '';

export function getFontFamily(option: FontOption) {
  return Platform.OS === 'android'
    ? option.androidFamily ?? option.iosFamily ?? ''
    : option.iosFamily ?? option.androidFamily ?? '';
}

export function getFontDisplayName(fontFamily: string) {
  const option = fontOptions.find(item => getFontFamily(item) === fontFamily);

  return option?.displayName ?? fontFamily;
}
