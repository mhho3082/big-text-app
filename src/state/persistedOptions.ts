import type { AppLanguage } from '../i18n';
import type { HomeThemeName } from '../theme';

export type OutputFontSizeMode = 'automatic' | 'custom';
export type OutputDisplayStyle =
  | 'static'
  | 'strobe'
  | 'pulse'
  | 'crossStrobe'
  | 'crossPulse';
export type OutputHorizontalAlignment = 'left' | 'center' | 'right';
export type OutputVerticalAlignment = 'top' | 'center' | 'bottom';
export type ShareImageAspect = 'landscape' | 'portrait' | 'square';
export type ShareAction = 'share' | 'wallpaper';

export const DEFAULT_OUTPUT_EFFECT_INTERVAL = 1;

export type PersistedAppOptions = {
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
};

export const persistedAppOptionKeys = [
  'homeTheme',
  'language',
  'text',
  'foregroundColor',
  'backgroundColor',
  'outputFontFamily',
  'outputFontSizeMode',
  'outputFontSize',
  'outputDisplayStyle',
  'outputEffectInterval',
  'outputHorizontalAlignment',
  'outputVerticalAlignment',
] as const;
