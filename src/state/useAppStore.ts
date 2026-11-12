import { create } from 'zustand';
import { Appearance } from 'react-native';
import { defaultOutputFontFamily } from '../fonts';
import { AppLanguage, detectSystemLanguage, nextLanguage } from '../i18n';
import { HomeThemeName } from '../theme';
import {
  DEFAULT_OUTPUT_EFFECT_INTERVAL,
  type PersistedAppOptions,
} from './persistedOptions';
import type {
  OutputDisplayStyle,
  OutputFontSizeMode,
  OutputHorizontalAlignment,
  OutputVerticalAlignment,
  ShareAction,
  ShareImageAspect,
} from '../types/output';

export type { PersistedAppOptions } from './persistedOptions';
export type {
  OutputDisplayStyle,
  OutputFontSizeMode,
  OutputHorizontalAlignment,
  OutputVerticalAlignment,
  ShareAction,
  ShareImageAspect,
} from '../types/output';

type AppState = {
  shareRequestId: number | null;
  shareImageAspect: ShareImageAspect;
  shareAction: ShareAction;
  homeTheme: HomeThemeName;
  language: AppLanguage;
  text: string;
  foregroundColor: string;
  backgroundColor: string;
  outputFontFamily: string;
  outputFontSizeMode: OutputFontSizeMode;
  outputFontSize: number;
  outputDisplayStyle: OutputDisplayStyle;
  outputEffectInterval: number;
  outputHorizontalAlignment: OutputHorizontalAlignment;
  outputVerticalAlignment: OutputVerticalAlignment;
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
  setOutputEffectInterval: (interval: number) => void;
  setOutputHorizontalAlignment: (alignment: OutputHorizontalAlignment) => void;
  setOutputVerticalAlignment: (alignment: OutputVerticalAlignment) => void;
  setPersistedOptions: (options: Partial<PersistedAppOptions>) => void;
  goToOutput: () => void;
  goToShare: (
    shareImageAspect?: ShareImageAspect,
    shareAction?: ShareAction,
  ) => void;
  clearShareRequest: () => void;
  goToQr: () => void;
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
    outputEffectInterval: state.outputEffectInterval,
    outputHorizontalAlignment: state.outputHorizontalAlignment,
    outputVerticalAlignment: state.outputVerticalAlignment,
  };
}

export const useAppStore = create<AppState>(set => ({
  shareRequestId: null,
  shareImageAspect: 'landscape',
  shareAction: 'share',
  homeTheme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  language: detectSystemLanguage(),
  text: '',
  foregroundColor: '#ffffff',
  backgroundColor: '#000000',
  outputFontFamily: defaultOutputFontFamily,
  outputFontSizeMode: 'automatic',
  outputFontSize: 120,
  outputDisplayStyle: 'static',
  outputEffectInterval: DEFAULT_OUTPUT_EFFECT_INTERVAL,
  outputHorizontalAlignment: 'center',
  outputVerticalAlignment: 'center',
  toggleHomeTheme: () =>
    set(state => ({
      homeTheme: state.homeTheme === 'dark' ? 'light' : 'dark',
    })),
  setLanguage: language => set({ language }),
  cycleLanguage: () =>
    set(state => ({ language: nextLanguage(state.language) })),
  setText: text => set({ text }),
  setForegroundColor: foregroundColor => set({ foregroundColor }),
  setBackgroundColor: backgroundColor => set({ backgroundColor }),
  setOutputFontFamily: outputFontFamily => set({ outputFontFamily }),
  setOutputFontSizeMode: outputFontSizeMode => set({ outputFontSizeMode }),
  setOutputFontSize: outputFontSize => set({ outputFontSize }),
  setOutputDisplayStyle: outputDisplayStyle => set({ outputDisplayStyle }),
  setOutputEffectInterval: outputEffectInterval =>
    set({ outputEffectInterval }),
  setOutputHorizontalAlignment: outputHorizontalAlignment =>
    set({ outputHorizontalAlignment }),
  setOutputVerticalAlignment: outputVerticalAlignment =>
    set({ outputVerticalAlignment }),
  setPersistedOptions: options => set(options),
  goToOutput: () => set({ shareRequestId: null, shareAction: 'share' }),
  goToShare: (shareImageAspect = 'landscape', shareAction = 'share') => {
    set(state => ({
      shareImageAspect,
      shareAction,
      shareRequestId:
        state.shareRequestId == null ? 1 : state.shareRequestId + 1,
    }));
  },
  clearShareRequest: () => {
    set({ shareRequestId: null });
  },
  goToQr: () => {
    set({ shareRequestId: null, shareAction: 'share' });
  },
  goToHistory: () => {
    set({ shareRequestId: null, shareAction: 'share' });
  },
  showHistoryEntry: options => {
    set({ ...options, shareRequestId: null, shareAction: 'share' });
  },
  applyHistoryEntry: options => {
    set({
      ...options,
      shareRequestId: null,
      shareAction: 'share',
    });
  },
  goHome: () => set({ shareRequestId: null, shareAction: 'share' }),
}));
