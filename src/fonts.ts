import {Platform} from 'react-native';
import type {TextStyle} from 'react-native';

export type FontCategory = 'english' | 'chinese';

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
];

export function getFontOptionsByCategory(category: FontCategory) {
  return fontOptions.filter(option => option.category === category);
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
