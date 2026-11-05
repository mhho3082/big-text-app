import {Platform} from 'react-native';

export type FontOption = {
  displayName: string;
  androidFamily: string;
  iosFamily: string;
  sample: string;
};

export const fontOptions: FontOption[] = [
  {
    displayName: 'Roboto',
    androidFamily: 'Roboto-Regular',
    iosFamily: 'Roboto',
    sample: 'Aa',
  },
  {
    displayName: 'Roboto Condensed',
    androidFamily: 'Roboto_Condensed-Regular',
    iosFamily: 'Roboto Condensed',
    sample: 'Aa',
  },
  {
    displayName: 'Roboto SemiCondensed',
    androidFamily: 'Roboto_SemiCondensed-Regular',
    iosFamily: 'Roboto SemiCondensed',
    sample: 'Aa',
  },
  {
    displayName: 'Open Sans',
    androidFamily: 'OpenSans-Regular',
    iosFamily: 'Open Sans',
    sample: 'Aa',
  },
  {
    displayName: 'Open Sans Condensed',
    androidFamily: 'OpenSans_Condensed-Regular',
    iosFamily: 'Open Sans Condensed',
    sample: 'Aa',
  },
  {
    displayName: 'Open Sans SemiCondensed',
    androidFamily: 'OpenSans_SemiCondensed-Regular',
    iosFamily: 'Open Sans SemiCondensed',
    sample: 'Aa',
  },
  {
    displayName: 'Oswald',
    androidFamily: 'Oswald-Regular',
    iosFamily: 'Oswald',
    sample: 'Aa',
  },
  {
    displayName: 'Permanent Marker',
    androidFamily: 'PermanentMarker-Regular',
    iosFamily: 'Permanent Marker',
    sample: 'Aa',
  },
  {
    displayName: 'Playfair Display',
    androidFamily: 'PlayfairDisplay-Regular',
    iosFamily: 'Playfair Display',
    sample: 'Aa',
  },
  {
    displayName: 'Playwrite',
    androidFamily: 'PlaywriteUSTrad-Regular',
    iosFamily: 'Playwrite US Trad',
    sample: 'Aa',
  },
  {
    displayName: 'Playpen Sans',
    androidFamily: 'PlaypenSans-Regular',
    iosFamily: 'Playpen Sans',
    sample: 'Aa',
  },
  {
    displayName: 'Delius Unicase',
    androidFamily: 'DeliusUnicase-Regular',
    iosFamily: 'Delius Unicase',
    sample: 'Aa',
  },
  {
    displayName: 'Departure Mono',
    androidFamily: 'DepartureMono-Regular',
    iosFamily: 'Departure Mono',
    sample: 'Aa',
  },
];

export const defaultOutputFontFamily =
  Platform.OS === 'android'
    ? fontOptions[0].androidFamily
    : fontOptions[0].iosFamily;

export function getFontFamily(option: FontOption) {
  return Platform.OS === 'android' ? option.androidFamily : option.iosFamily;
}

export function getFontDisplayName(fontFamily: string) {
  const option = fontOptions.find(item => getFontFamily(item) === fontFamily);

  return option?.displayName ?? fontFamily;
}
