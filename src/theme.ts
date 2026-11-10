export const BRAND_ACCENT = '#6750a4';
export const STATE_SUCCESS = '#2ecc71';
export const STATE_DANGER = '#e74c3c';
export const SURFACE_WHITE = '#ffffff';
export const SURFACE_BLACK = '#000000';
export const QUATERNARY_TEXT = 'rgba(255,255,255,0.18)';

export type HomeThemeName = 'light' | 'dark';

export type HomeTheme = {
  name: HomeThemeName;
  screenBackground: string;
  surface: string;
  border: string;
  titleText: string;
  mutedText: string;
  buttonText: string;
  buttonSurface: string;
  buttonBorder: string;
  buttonChip: string;
  buttonChipText: string;
  swatchBorder: string;
  inputBackground: string;
  inputBorder: string;
  inputText: string;
  placeholderText: string;
  optionText: string;
  optionOn: string;
  optionOff: string;
  optionBorder: string;
  modalBackdrop: string;
  modalSheet: string;
  modalText: string;
  modalMutedText: string;
  modalCloseIcon: string;
  modalPanel: string;
  modalTabBar: string;
  modalTabActive: string;
  modalTabInactive: string;
  modalSelectedCard: string;
  modalSelectedCardBorder: string;
  modalSliderTrack: string;
  modalSliderThumb: string;
  historyCardBorder: string;
  historyActionBackground: string;
  historyActionText: string;
};

export const homeThemes: Record<HomeThemeName, HomeTheme> = {
  light: {
    name: 'light',
    screenBackground: '#f5f2ec',
    surface: SURFACE_WHITE,
    border: '#d4c8b8',
    titleText: '#1e1a16',
    mutedText: '#6d6257',
    buttonText: '#1e1a16',
    buttonSurface: SURFACE_WHITE,
    buttonBorder: '#d4c8b8',
    buttonChip: '#1e1a16',
    buttonChipText: SURFACE_WHITE,
    swatchBorder: '#9f9487',
    inputBackground: SURFACE_WHITE,
    inputBorder: '#d4c8b8',
    inputText: '#1e1a16',
    placeholderText: '#8a7d6f',
    optionText: '#1e1a16',
    optionOn: STATE_SUCCESS,
    optionOff: STATE_DANGER,
    optionBorder: '#d4c8b8',
    modalBackdrop: 'rgba(0,0,0,0.24)',
    modalSheet: '#fffaf3',
    modalText: '#1e1a16',
    modalMutedText: '#6d6257',
    modalCloseIcon: '#1e1a16',
    modalPanel: '#ebe2d6',
    modalTabBar: '#fffaf3',
    modalTabActive: '#1e1a16',
    modalTabInactive: '#8a7d6f',
    modalSelectedCard: '#f3ebe0',
    modalSelectedCardBorder: BRAND_ACCENT,
    modalSliderTrack: '#d4c8b8',
    modalSliderThumb: '#1e1a16',
    historyCardBorder: '#d4c8b8',
    historyActionBackground: '#1e1a16',
    historyActionText: SURFACE_WHITE,
  },
  dark: {
    name: 'dark',
    screenBackground: '#111111',
    surface: '#1b1b1b',
    border: '#333333',
    titleText: SURFACE_WHITE,
    mutedText: '#9a9a9a',
    buttonText: SURFACE_WHITE,
    buttonSurface: '#1b1b1b',
    buttonBorder: '#333333',
    buttonChip: '#f5f2ec',
    buttonChipText: '#1e1a16',
    swatchBorder: '#555555',
    inputBackground: '#1b1b1b',
    inputBorder: '#333333',
    inputText: SURFACE_WHITE,
    placeholderText: '#848484',
    optionText: SURFACE_WHITE,
    optionOn: STATE_SUCCESS,
    optionOff: STATE_DANGER,
    optionBorder: '#333333',
    modalBackdrop: 'rgba(0,0,0,0.4)',
    modalSheet: '#111111',
    modalText: SURFACE_WHITE,
    modalMutedText: '#8f8f8f',
    modalCloseIcon: '#848484',
    modalPanel: '#1b1b1b',
    modalTabBar: '#111111',
    modalTabActive: SURFACE_WHITE,
    modalTabInactive: '#a7a7a7',
    modalSelectedCard: '#221b33',
    modalSelectedCardBorder: '#8b73d8',
    modalSliderTrack: '#3a3a3a',
    modalSliderThumb: SURFACE_WHITE,
    historyCardBorder: '#333333',
    historyActionBackground: '#f5f2ec',
    historyActionText: '#1e1a16',
  },
};

export function getHomeTheme(name: HomeThemeName): HomeTheme {
  return homeThemes[name];
}
