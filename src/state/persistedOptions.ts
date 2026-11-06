import type { AppLanguage } from '../i18n';
import type { HomeThemeName } from '../theme';

export type OutputFontSizeMode = 'automatic' | 'custom';
export type OutputDisplayStyle = 'static' | 'strobe' | 'pulse';
export type OutputAlignment = 'left' | 'center' | 'right';

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
  outputAlignment: OutputAlignment;
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
  'outputAlignment',
] as const;
