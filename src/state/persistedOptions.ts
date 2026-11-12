import type { AppLanguage } from '../i18n';
import type { HomeThemeName } from '../theme';
import type {
  OutputDisplayStyle,
  OutputFontSizeMode,
  OutputHorizontalAlignment,
  OutputVerticalAlignment,
} from '../types/output';

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
