import type { AppLanguage } from '../i18n';
import type { HomeThemeName } from '../theme';
import type {
  OutputAnimationStyle,
  OutputFontSizeMode,
  OutputHorizontalAlignment,
  OutputVerticalAlignment,
} from '../types/output';

export const DEFAULT_OUTPUT_ANIMATION_INTERVAL = 1;

export type PersistedAppOptions = {
  homeTheme: HomeThemeName;
  language: AppLanguage;
  text: string;
  foregroundColor: string;
  backgroundColor: string;
  outputFontFamily: string;
  outputFontSizeMode: OutputFontSizeMode;
  outputFontSize: number;
  outputAnimationStyle: OutputAnimationStyle;
  outputAnimationInterval: number;
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
  'outputAnimationStyle',
  'outputAnimationInterval',
  'outputHorizontalAlignment',
  'outputVerticalAlignment',
] as const;
