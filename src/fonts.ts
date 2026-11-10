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
  remarkKey?: string;
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
    androidFamily: 'ChironSungHK-R',
    iosFamily: 'ChironSungHK-Regular',
  },
  {
    displayName: '昭源黑體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'Tamcy',
    androidFamily: 'ChironHeiHK-R',
    iosFamily: 'ChironHeiHK-Regular',
  },
  {
    displayName: '昭源環方',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'Tamcy',
    androidFamily: 'ChironGoRoundTC-400R',
    iosFamily: 'ChironGoRoundTC-Regular',
  },
  {
    displayName: '源流明體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'But Ko',
    remarkKey: 'fontRemark.heavy',
    androidFamily: 'GenRyuMin2TC-H',
    iosFamily: 'GenRyuMin2TC-H',
  },
  {
    displayName: '源樣黑體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'But Ko',
    remarkKey: 'fontRemark.heavy',
    androidFamily: 'GenYoGothic2TC-H',
    iosFamily: 'GenYoGothic2TC-H',
  },
  {
    displayName: '貓啃什錦黑',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'ZERO子',
    remarkKey: 'fontRemark.tcVersion',
    androidFamily: 'MaokenAssortedSans',
    iosFamily: 'MaokenAssortedSans',
  },
  {
    displayName: '隨峰體Plus',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: '阿坤、Jeffrey Xuan、宇文滿月',
    androidFamily: 'ThePeakFontPlus-Regular',
    iosFamily: 'ThePeakFontPlus',
  },
  {
    displayName: '芫荽',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'But Ko',
    androidFamily: 'Iansui-Regular',
    iosFamily: 'Iansui-Regular',
  },
  {
    displayName: '內海字體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'max32002',
    androidFamily: 'NaikaiFont-Regular',
    iosFamily: 'NaikaiFont-Regular',
  },
  {
    displayName: '大波浪圓體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'max32002',
    androidFamily: 'PopGothicCjkTc-Regular',
    iosFamily: 'PopGothicCjkTc-Regular',
  },
  {
    displayName: '鐵蒺藜體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: '奈白不弍',
    androidFamily: 'Tiejili-Regular',
    iosFamily: 'TiejiliSC-Regular',
  },
  {
    displayName: '饅頭黑體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'Mant0u and The Dela Gothic Project Authors',
    androidFamily: 'MantouSans-Regular',
    iosFamily: 'MantouSans',
  },
  {
    displayName: '遊趣體',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: '仲代骆驼',
    remarkKey: 'fontRemark.tcVersion',
    androidFamily: 'ChildFunSansTC',
    iosFamily: 'ChildFunSans-TC',
  },
  {
    displayName: 'WD-XL 滑油字',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'NFSL2001',
    androidFamily: 'WD-XLLubrifontTC-Regular',
    iosFamily: 'WD-XLLubrifontTC-Regular',
  },
  {
    displayName: '俐方體11號',
    category: 'traditionalChinese',
    licenseKey: 'license.ofl11',
    credit: 'ACh-K',
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
    iosFamily: 'Doto-Black',
  },
  {
    displayName: 'Doto Rounded',
    category: 'english',
    licenseKey: 'license.ofl11',
    credit: 'Óliver Lalan',
    androidFamily: 'Doto_Rounded-Black',
    iosFamily: 'DotoRounded-Black',
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
