import { create } from 'zustand';
import { Appearance } from 'react-native';
import { defaultOutputFontFamily } from '../fonts';
import { AppLanguage, nextLanguage, setLanguage as setI18nLanguage } from '../i18n';
import { HomeThemeName } from '../theme';

export type Screen = 'home' | 'output';
export type OutputFontSizeMode = 'automatic' | 'custom';
export type OutputDisplayStyle = 'static' | 'strobe' | 'pulse';
export type OutputAlignment = 'left' | 'center' | 'right';

type AppState = {
  screen: Screen;
  homeTheme: HomeThemeName;
  language: AppLanguage;
  text: string;
  foregroundColor: string;
  backgroundColor: string;
  outputFontFamily: string;
  outputFontSizeMode: OutputFontSizeMode;
  outputFontSize: number;
  outputOneLine: boolean;
  outputWordBreak: boolean;
  outputDisplayStyle: OutputDisplayStyle;
  outputAlignment: OutputAlignment;
  toggleHomeTheme: () => void;
  setLanguage: (language: AppLanguage) => void;
  cycleLanguage: () => void;
  setText: (text: string) => void;
  setForegroundColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setOutputFontFamily: (family: string) => void;
  setOutputFontSizeMode: (mode: OutputFontSizeMode) => void;
  setOutputFontSize: (size: number) => void;
  setOutputOneLine: (oneLine: boolean) => void;
  setOutputWordBreak: (wordBreak: boolean) => void;
  setOutputDisplayStyle: (style: OutputDisplayStyle) => void;
  setOutputAlignment: (alignment: OutputAlignment) => void;
  goToOutput: () => void;
  goHome: () => void;
};

export const useAppStore = create<AppState>(set => ({
  screen: 'home',
  homeTheme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  language: 'en',
  text: '',
  foregroundColor: '#ffffff',
  backgroundColor: '#111111',
  outputFontFamily: defaultOutputFontFamily,
  outputFontSizeMode: 'automatic',
  outputFontSize: 120,
  outputOneLine: false,
  outputWordBreak: false,
  outputDisplayStyle: 'static',
  outputAlignment: 'left',
  toggleHomeTheme: () =>
    set(state => ({ homeTheme: state.homeTheme === 'dark' ? 'light' : 'dark' })),
  setLanguage: language =>
    set(() => {
      setI18nLanguage(language);
      return { language };
    }),
  cycleLanguage: () =>
    set(state => {
      const language = nextLanguage(state.language);
      setI18nLanguage(language);
      return { language };
    }),
  setText: text => set({ text }),
  setForegroundColor: foregroundColor => set({ foregroundColor }),
  setBackgroundColor: backgroundColor => set({ backgroundColor }),
  setOutputFontFamily: outputFontFamily => set({ outputFontFamily }),
  setOutputFontSizeMode: outputFontSizeMode => set({ outputFontSizeMode }),
  setOutputFontSize: outputFontSize => set({ outputFontSize }),
  setOutputOneLine: outputOneLine => set({ outputOneLine }),
  setOutputWordBreak: outputWordBreak => set({ outputWordBreak }),
  setOutputDisplayStyle: outputDisplayStyle => set({ outputDisplayStyle }),
  setOutputAlignment: outputAlignment => set({ outputAlignment }),
  goToOutput: () => set({ screen: 'output' }),
  goHome: () => set({ screen: 'home' }),
}));
