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
    androidFamily: 'Roboto-Regular',
    iosFamily: 'Roboto',
    sample: 'Aa',
  },
  {
    displayName: 'Oswald',
    category: 'english',
    androidFamily: 'Oswald-Regular',
    iosFamily: 'Oswald',
    sample: 'Aa',
  },
  {
    displayName: 'Atkinson Hyperlegible',
    category: 'english',
    androidFamily: 'AtkinsonHyperlegible-Regular',
    iosFamily: 'Atkinson Hyperlegible',
    sample: 'Aa',
  },
  {
    displayName: 'Lexend',
    category: 'english',
    androidFamily: 'Lexend-Regular',
    iosFamily: 'Lexend',
    sample: 'Aa',
  },
  {
    displayName: 'Anton',
    category: 'english',
    androidFamily: 'Anton-Regular',
    iosFamily: 'Anton',
    sample: 'Aa',
  },
  {
    displayName: 'Playfair Display',
    category: 'english',
    androidFamily: 'PlayfairDisplay-Regular',
    iosFamily: 'Playfair Display',
    sample: 'Aa',
  },
  {
    displayName: 'Cinzel',
    category: 'english',
    androidFamily: 'Cinzel-Regular',
    iosFamily: 'Cinzel',
    sample: 'Aa',
  },
  {
    displayName: 'Cinzel Decorative',
    category: 'english',
    androidFamily: 'CinzelDecorative-Regular',
    iosFamily: 'Cinzel Decorative',
    sample: 'Aa',
  },
  {
    displayName: 'DM Serif Display',
    category: 'english',
    androidFamily: 'DMSerifDisplay-Regular',
    iosFamily: 'DM Serif Display',
    sample: 'Aa',
  },
  {
    displayName: 'Lora',
    category: 'english',
    androidFamily: 'Lora-Regular',
    iosFamily: 'Lora',
    sample: 'Aa',
  },
  {
    displayName: 'Permanent Marker',
    category: 'english',
    androidFamily: 'PermanentMarker-Regular',
    iosFamily: 'Permanent Marker',
    sample: 'Aa',
  },
  {
    displayName: 'Delius Unicase',
    category: 'english',
    androidFamily: 'DeliusUnicase-Regular',
    iosFamily: 'Delius Unicase',
    sample: 'Aa',
  },
  {
    displayName: 'Playwrite',
    category: 'english',
    androidFamily: 'PlaywriteUSTrad-Regular',
    iosFamily: 'Playwrite US Trad',
    sample: 'Aa',
  },
  {
    displayName: 'Playpen Sans',
    category: 'english',
    androidFamily: 'PlaypenSans-Regular',
    iosFamily: 'Playpen Sans',
    sample: 'Aa',
  },
  {
    displayName: 'Doto',
    category: 'english',
    androidFamily: 'Doto-Black',
    iosFamily: 'Doto Black',
    sample: 'Aa',
  },
  {
    displayName: 'Doto Rounded',
    category: 'english',
    androidFamily: 'Doto_Rounded-Black',
    iosFamily: 'Doto Rounded Black',
    sample: 'Aa',
  },
  {
    displayName: 'Orbitron',
    category: 'english',
    androidFamily: 'Orbitron-Regular',
    iosFamily: 'Orbitron',
    sample: 'Aa',
  },
  {
    displayName: 'Monoton',
    category: 'english',
    androidFamily: 'Monoton-Regular',
    iosFamily: 'Monoton',
    sample: 'Aa',
  },
  {
    displayName: 'Departure Mono',
    category: 'english',
    androidFamily: 'DepartureMono-Regular',
    iosFamily: 'Departure Mono',
    sample: 'Aa',
  },
  {
    displayName: 'Silkscreen',
    category: 'english',
    androidFamily: 'Silkscreen-Regular',
    iosFamily: 'Silkscreen',
    sample: 'Aa',
  },
  {
    displayName: '源流明體',
    category: 'chinese',
    androidFamily: 'GenRyuMin2TC-R',
    iosFamily: 'GenRyuMin2 TC',
    sample: '源流明體',
  },
  {
    displayName: '源雲明體',
    category: 'chinese',
    androidFamily: 'GenWanMin2TC-R',
    iosFamily: 'GenWanMin2 TC',
    sample: '源雲明體',
  },
  {
    displayName: '源石黑體',
    category: 'chinese',
    androidFamily: 'GenSekiGothic2TC-R',
    iosFamily: 'GenSekiGothic2 TC',
    sample: '源石黑體',
  },
  {
    displayName: '芫荽',
    category: 'chinese',
    androidFamily: 'Iansui-Regular',
    iosFamily: 'Iansui',
    sample: '芫荽',
  },
  {
    displayName: '饅頭黑體',
    category: 'chinese',
    androidFamily: 'MantouSans-Regular',
    iosFamily: 'Mantou Sans',
    sample: '饅頭黑體',
  },
  {
    displayName: '貓啃什錦黑',
    category: 'chinese',
    androidFamily: 'MaokenAssortedSans-TC',
    iosFamily: 'MaokenAssortedSans-TC',
    sample: '貓啃什錦黑',
  },
  {
    displayName: '內海字體',
    category: 'chinese',
    androidFamily: 'NaikaiFont-Regular',
    iosFamily: 'NaikaiFont',
    sample: '內海字體',
  },
  {
    displayName: '昭源宋體',
    category: 'chinese',
    androidFamily: 'ChironSungHK-Regular',
    iosFamily: 'Chiron Sung HK',
    sample: '昭源宋體',
  },
  {
    displayName: '昭源黑體',
    category: 'chinese',
    androidFamily: 'ChironHeiHK-Regular',
    iosFamily: 'Chiron Hei HK',
    sample: '昭源黑體',
  },
  {
    displayName: '昭源環方',
    category: 'chinese',
    androidFamily: 'ChironGoRoundTC-Regular',
    iosFamily: 'Chiron GoRound TC',
    sample: '昭源環方',
  },
  {
    displayName: '隨峰體',
    category: 'chinese',
    androidFamily: 'ThePeakFontBeta_V0_102',
    iosFamily: 'The Peak Font 隨峰體 Beta',
    sample: '隨峰體',
  },
  {
    displayName: '俐方體11號',
    category: 'chinese',
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
