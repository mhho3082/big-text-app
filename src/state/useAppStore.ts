import { create } from 'zustand';
import { Appearance } from 'react-native';
import { defaultOutputFontFamily } from '../fonts';
import { AppLanguage, nextLanguage, setLanguage as setI18nLanguage } from '../i18n';
import { HomeThemeName } from '../theme';
import { recordDisplayOptions } from '../db/appOptions';
import type { PersistedAppOptions } from './persistedOptions';

export type { PersistedAppOptions } from './persistedOptions';
export type OutputFontSizeMode = PersistedAppOptions['outputFontSizeMode'];
export type OutputDisplayStyle = PersistedAppOptions['outputDisplayStyle'];
export type OutputAlignment = PersistedAppOptions['outputAlignment'];

export type Screen = 'home' | 'output' | 'share' | 'history';

type AppState = {
  screen: Screen;
  outputReturnScreen: Exclude<Screen, 'output' | 'share'>;
  outputPreviewOptions: PersistedAppOptions | null;
  homeTheme: HomeThemeName;
  language: AppLanguage;
  text: string;
  foregroundColor: string;
  backgroundColor: string;
  outputFontFamily: string;
  outputFontSizeMode: OutputFontSizeMode;
  outputFontSize: number;
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
  setOutputDisplayStyle: (style: OutputDisplayStyle) => void;
  setOutputAlignment: (alignment: OutputAlignment) => void;
  setPersistedOptions: (options: Partial<PersistedAppOptions>) => void;
  goToOutput: () => void;
  goToShare: () => void;
  goToHistory: () => void;
  showHistoryEntry: (options: PersistedAppOptions) => void;
  applyHistoryEntry: (options: PersistedAppOptions) => void;
  goHome: () => void;
};

export function getPersistedOptions(state: AppState): PersistedAppOptions {
  return {
    homeTheme: state.homeTheme,
    language: state.language,
    text: state.text,
    foregroundColor: state.foregroundColor,
    backgroundColor: state.backgroundColor,
    outputFontFamily: state.outputFontFamily,
    outputFontSizeMode: state.outputFontSizeMode,
    outputFontSize: state.outputFontSize,
    outputDisplayStyle: state.outputDisplayStyle,
    outputAlignment: state.outputAlignment,
  };
}

export const useAppStore = create<AppState>((set, get) => ({
  screen: 'home',
  outputReturnScreen: 'home',
  outputPreviewOptions: null,
  homeTheme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  language: 'en',
  text: '',
  foregroundColor: '#ffffff',
  backgroundColor: '#111111',
  outputFontFamily: defaultOutputFontFamily,
  outputFontSizeMode: 'automatic',
  outputFontSize: 120,
  outputDisplayStyle: 'static',
  outputAlignment: 'center',
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
  setOutputDisplayStyle: outputDisplayStyle => set({ outputDisplayStyle }),
  setOutputAlignment: outputAlignment => set({ outputAlignment }),
  setPersistedOptions: options => set(options),
  goToOutput: () => {
    recordDisplayOptions(getPersistedOptions(get())).catch(() => undefined);
    set({ screen: 'output', outputReturnScreen: 'home', outputPreviewOptions: null });
  },
  goToShare: () => {
    recordDisplayOptions(getPersistedOptions(get())).catch(() => undefined);
    set({ screen: 'share', outputReturnScreen: 'home', outputPreviewOptions: null });
  },
  goToHistory: () => {
    set({ screen: 'history', outputPreviewOptions: null });
  },
  showHistoryEntry: options => {
    set({ screen: 'output', outputReturnScreen: 'history', outputPreviewOptions: options });
  },
  applyHistoryEntry: options => {
    set({
      ...options,
      screen: 'home',
      outputReturnScreen: 'home',
      outputPreviewOptions: null,
    });
  },
  goHome: () => set({ screen: 'home', outputReturnScreen: 'home', outputPreviewOptions: null }),
}));
