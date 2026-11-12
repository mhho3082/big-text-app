import { create } from 'zustand';
import { Appearance } from 'react-native';
import { defaultOutputFontFamily } from '../fonts';
import { AppLanguage, detectSystemLanguage, nextLanguage } from '../i18n';
import { HomeThemeName } from '../theme';
import {
  DEFAULT_OUTPUT_ANIMATION_INTERVAL,
  type PersistedAppOptions,
} from './persistedOptions';
import type {
  OutputAnimationStyle,
  OutputFontSizeMode,
  OutputHorizontalAlignment,
  OutputScreenOrientation,
  OutputVerticalAlignment,
  ShareAction,
  ShareImageAspect,
} from '../types/output';

export type { PersistedAppOptions } from './persistedOptions';
export type {
  OutputAnimationStyle,
  OutputFontSizeMode,
  OutputHorizontalAlignment,
  OutputScreenOrientation,
  OutputVerticalAlignment,
  ShareAction,
  ShareImageAspect,
} from '../types/output';

type AppState = {
  launchRequestId: number | null;
  launchTarget: 'home' | 'widgetOutput' | null;
  widgetOutputWidgetId: number | null;
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
  outputScreenOrientation: OutputScreenOrientation;
  outputAnimationStyle: OutputAnimationStyle;
  outputAnimationInterval: number;
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
  setOutputScreenOrientation: (orientation: OutputScreenOrientation) => void;
  setOutputAnimationStyle: (style: OutputAnimationStyle) => void;
  setOutputAnimationInterval: (interval: number) => void;
  setOutputHorizontalAlignment: (alignment: OutputHorizontalAlignment) => void;
  setOutputVerticalAlignment: (alignment: OutputVerticalAlignment) => void;
  setPersistedOptions: (options: Partial<PersistedAppOptions>) => void;
  goToOutput: () => void;
  requestWidgetOutput: () => void;
  requestHomeScreen: () => void;
  goToShare: (
    shareImageAspect?: ShareImageAspect,
    shareAction?: ShareAction,
  ) => void;
  clearLaunchRequest: () => void;
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
    outputScreenOrientation: state.outputScreenOrientation,
    outputAnimationStyle: state.outputAnimationStyle,
    outputAnimationInterval: state.outputAnimationInterval,
    outputHorizontalAlignment: state.outputHorizontalAlignment,
    outputVerticalAlignment: state.outputVerticalAlignment,
  };
}

export function getDefaultPersistedOptions(): PersistedAppOptions {
  return {
    homeTheme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
    language: detectSystemLanguage(),
    text: '',
    foregroundColor: '#ffffff',
    backgroundColor: '#000000',
    outputFontFamily: defaultOutputFontFamily,
    outputFontSizeMode: 'automatic',
    outputFontSize: 120,
    outputScreenOrientation: 'automatic',
    outputAnimationStyle: 'static',
    outputAnimationInterval: DEFAULT_OUTPUT_ANIMATION_INTERVAL,
    outputHorizontalAlignment: 'center',
    outputVerticalAlignment: 'center',
  };
}

export const useAppStore = create<AppState>(set => ({
  launchRequestId: null,
  launchTarget: null,
  widgetOutputWidgetId: null,
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
  outputScreenOrientation: 'automatic',
  outputAnimationStyle: 'static',
  outputAnimationInterval: DEFAULT_OUTPUT_ANIMATION_INTERVAL,
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
  setOutputScreenOrientation: outputScreenOrientation =>
    set({ outputScreenOrientation }),
  setOutputAnimationStyle: outputAnimationStyle =>
    set({ outputAnimationStyle }),
  setOutputAnimationInterval: outputAnimationInterval =>
    set({ outputAnimationInterval }),
  setOutputHorizontalAlignment: outputHorizontalAlignment =>
    set({ outputHorizontalAlignment }),
  setOutputVerticalAlignment: outputVerticalAlignment =>
    set({ outputVerticalAlignment }),
  setPersistedOptions: options => set(options),
  goToOutput: () => set({ shareRequestId: null, shareAction: 'share' }),
  requestWidgetOutput: () =>
    set(state => ({
      launchTarget: 'widgetOutput',
      launchRequestId:
        state.launchRequestId == null ? 1 : state.launchRequestId + 1,
    })),
  requestHomeScreen: () =>
    set(state => ({
      launchTarget: 'home',
      launchRequestId:
        state.launchRequestId == null ? 1 : state.launchRequestId + 1,
    })),
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
  clearLaunchRequest: () => {
    set({
      launchRequestId: null,
      launchTarget: null,
      widgetOutputWidgetId: null,
    });
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
