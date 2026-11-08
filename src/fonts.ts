import { Platform } from 'react-native';
import type { TextStyle } from 'react-native';

export type FontCategory = 'english' | 'traditionalChinese';

export type FontFamilyPair = {
  android: string;
  ios: string;
};

export type FontOption = {
  displayName: string;
  category: FontCategory;
  licenseKey: string;
  credit: string;
  androidFamily?: string; // The filename
  iosFamily?: string; // The PostScript name
  secondaryFamilies?: FontFamilyPair[];
  fontWeight?: TextStyle['fontWeight'];
};

export const fontOptions: FontOption[] = [
  {
    displayName: '昭源宋體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'Tamcy',
    androidFamily: 'ChironSungHK-Regular',
    iosFamily: 'Chiron Sung HK',
  },
  {
    displayName: '昭源黑體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'Tamcy',
    androidFamily: 'ChironHeiHK-Regular',
    iosFamily: 'Chiron Hei HK',
  },
  {
    displayName: '昭源環方',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'Tamcy',
    androidFamily: 'ChironGoRoundTC-Regular',
    iosFamily: 'Chiron GoRound TC',
  },
  {
    displayName: '源流明體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'But Ko',
    androidFamily: 'GenRyuMin2TC-R',
    iosFamily: 'GenRyuMin2 TC',
  },
  {
    displayName: '源雲明體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'But Ko',
    androidFamily: 'GenWanMin2TC-R',
    iosFamily: 'GenWanMin2 TC',
  },
  {
    displayName: '源石黑體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'But Ko',
    androidFamily: 'GenSekiGothic2TC-R',
    iosFamily: 'GenSekiGothic2 TC',
  },
  {
    displayName: '獅尾四季春',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'max32002',
    androidFamily: 'SweiSpringCJKtc-Regular',
    iosFamily: 'Swei Spring CJK TC',
  },
  {
    displayName: '獅尾圓體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'max32002',
    androidFamily: 'SweiGothicCJKtc-Regular',
    iosFamily: 'Swei Gothic CJK TC',
  },
  {
    displayName: '芫荽',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'But Ko',
    androidFamily: 'Iansui-Regular',
    iosFamily: 'Iansui',
  },
  {
    displayName: '內海字體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'max32002',
    androidFamily: 'NaikaiFont-Regular',
    iosFamily: 'NaikaiFont',
  },
  {
    displayName: '饅頭黑體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'Mant0u and The Dela Gothic Project Authors',
    androidFamily: 'MantouSans-Regular',
    iosFamily: 'Mantou Sans',
  },
  {
    displayName: '貓啃什錦黑',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'Skr-ZERO',
    androidFamily: 'MaokenAssortedSans-TC',
    iosFamily: 'MaokenAssortedSans-TC',
  },
  {
    displayName: '隨峰體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: '阿坤',
    androidFamily: 'ThePeakFontBeta_V0_102',
    iosFamily: 'The Peak Font 隨峰體 Beta',
  },
  {
    displayName: '俐方體11號',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'M+ FONTS PROJECT',
    androidFamily: 'Cubic_11',
    iosFamily: 'Cubic 11',
  },
  {
    displayName: 'Inter',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Rasmus Andersson',
    androidFamily: 'Inter-Regular',
    iosFamily: 'Inter',
  },
  {
    displayName: 'Oswald',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Vernon Adams, Kalapi Gajjar, Cyreal',
    androidFamily: 'Oswald-Regular',
    iosFamily: 'Oswald',
  },
  {
    displayName: 'Atkinson Hyperlegible',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Braille Institute of America, Inc.',
    androidFamily: 'AtkinsonHyperlegible-Regular',
    iosFamily: 'Atkinson Hyperlegible',
  },
  {
    displayName: 'Urbanist',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Corey Hu',
    androidFamily: 'Urbanist-Regular',
    iosFamily: 'Urbanist',
  },
  {
    displayName: 'Lexend',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit:
      'Bonnie Shaver-Troup, Thomas Jockin, Santiago Orozco, Héctor Gómez, Superunion',
    androidFamily: 'Lexend-Regular',
    iosFamily: 'Lexend',
  },
  {
    displayName: 'Anton',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Vernon Adams',
    androidFamily: 'Anton-Regular',
    iosFamily: 'Anton',
  },
  {
    displayName: 'Playfair Display',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Claus Eggers Sørensen',
    androidFamily: 'PlayfairDisplay-Regular',
    iosFamily: 'Playfair Display',
  },
  {
    displayName: 'Cinzel',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Natanael Gama',
    androidFamily: 'Cinzel-Regular',
    iosFamily: 'Cinzel',
  },
  {
    displayName: 'Cinzel Decorative',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Natanael Gama',
    androidFamily: 'CinzelDecorative-Regular',
    iosFamily: 'Cinzel Decorative',
  },
  {
    displayName: 'DM Serif Display',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Adobe and Google LLC',
    androidFamily: 'DMSerifDisplay-Regular',
    iosFamily: 'DM Serif Display',
  },
  {
    displayName: 'Lora',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Cyreal',
    androidFamily: 'Lora-Regular',
    iosFamily: 'Lora',
  },
  {
    displayName: 'JetBrains Mono',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'JetBrains, Philipp Nurullin, Konstantin Bulenkov',
    androidFamily: 'JetBrainsMono-Regular',
    iosFamily: 'JetBrains Mono',
  },
  {
    displayName: 'Permanent Marker',
    category: 'english',
    licenseKey: 'license.apache20',
    credit: 'Font Diner',
    androidFamily: 'PermanentMarker-Regular',
    iosFamily: 'Permanent Marker',
  },
  {
    displayName: 'Delius Unicase',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Natalia Raices and Igino Marini',
    androidFamily: 'DeliusUnicase-Regular',
    iosFamily: 'Delius Unicase',
  },
  {
    displayName: 'Playwrite',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'TypeTogether, Veronika Burian, José Scaglione',
    androidFamily: 'PlaywriteUSTrad-Regular',
    iosFamily: 'Playwrite US Trad',
  },
  {
    displayName: 'Playpen Sans',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit:
      'TypeTogether, Laura Meseguer, Veronika Burian, José Scaglione, Kostas Bartsokas, Vera Evstafieva, Tom Grace, Yorlmar Campos',
    androidFamily: 'PlaypenSans-Regular',
    iosFamily: 'Playpen Sans',
  },
  {
    displayName: 'Orbitron',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Matt McInerney',
    androidFamily: 'Orbitron-Regular',
    iosFamily: 'Orbitron',
  },
  {
    displayName: 'Monoton',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'vernon adams',
    androidFamily: 'Monoton-Regular',
    iosFamily: 'Monoton',
  },
  {
    displayName: 'Doto',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Óliver Lalan',
    androidFamily: 'Doto-Black',
    iosFamily: 'Doto Black',
  },
  {
    displayName: 'Doto Rounded',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Óliver Lalan',
    androidFamily: 'Doto_Rounded-Black',
    iosFamily: 'Doto Rounded Black',
  },
  {
    displayName: 'Departure Mono',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Helena Zhang',
    androidFamily: 'DepartureMono-Regular',
    iosFamily: 'Departure Mono',
  },
  {
    displayName: 'Silkscreen',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Jason Kottke',
    androidFamily: 'Silkscreen-Regular',
    iosFamily: 'Silkscreen',
  },
];

const maokenSansFontOption = fontOptions.find(option => option.displayName === '貓啃什錦黑');

export const maokenSansFontFamily = Platform.OS === 'android'
  ? maokenSansFontOption?.androidFamily ?? maokenSansFontOption?.iosFamily
  : maokenSansFontOption?.iosFamily ?? maokenSansFontOption?.androidFamily;

const FONT_CATEGORY_ORDER: FontCategory[] = ['traditionalChinese', 'english'];

const CHIRON_FONT_NAMES = new Set(['昭源宋體', '昭源黑體', '昭源環方']);

export function getFontOptionsByCategory(category: FontCategory) {
  const options = fontOptions.filter(option => option.category === category);

  if (category !== 'traditionalChinese') {
    return options;
  }

  const chironFonts = options.filter(option => CHIRON_FONT_NAMES.has(option.displayName));
  const otherFonts = options.filter(option => !CHIRON_FONT_NAMES.has(option.displayName));

  return [...chironFonts, ...otherFonts];
}

export function getFontCategories() {
  return FONT_CATEGORY_ORDER.filter(category => fontOptions.some(option => option.category === category));
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
