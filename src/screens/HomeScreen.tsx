import React from 'react';
import type { ShareAction } from '../types/output';
import { WidgetSettingsScreen } from './WidgetSettingsScreen';
import { useAppStore } from '../state/useAppStore';

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
  onOpenHistory: () => void;
  onOpenOutput: () => void;
  onOpenQr: () => void;
  onOpenShare: (
    shareImageAspect: 'landscape' | 'portrait' | 'square',
    shareAction?: ShareAction,
  ) => void;
};

export function HomeScreen({
  insets,
  onOpenHistory,
  onOpenOutput,
  onOpenQr,
  onOpenShare,
}: Props) {
  const homeTheme = useAppStore(state => state.homeTheme);
  const language = useAppStore(state => state.language);
  const text = useAppStore(state => state.text);
  const foregroundColor = useAppStore(state => state.foregroundColor);
  const backgroundColor = useAppStore(state => state.backgroundColor);
  const outputFontFamily = useAppStore(state => state.outputFontFamily);
  const outputFontSizeMode = useAppStore(state => state.outputFontSizeMode);
  const outputFontSize = useAppStore(state => state.outputFontSize);
  const outputScreenOrientation = useAppStore(
    state => state.outputScreenOrientation,
  );
  const outputAnimationStyle = useAppStore(state => state.outputAnimationStyle);
  const outputAnimationInterval = useAppStore(
    state => state.outputAnimationInterval,
  );
  const outputHorizontalAlignment = useAppStore(
    state => state.outputHorizontalAlignment,
  );
  const outputVerticalAlignment = useAppStore(
    state => state.outputVerticalAlignment,
  );

  return (
    <WidgetSettingsScreen
      homeMode
      insets={insets}
      title="Big Text"
      options={{
        homeTheme,
        language,
        text,
        foregroundColor,
        backgroundColor,
        outputFontFamily,
        outputFontSizeMode,
        outputFontSize,
        outputScreenOrientation,
        outputAnimationStyle,
        outputAnimationInterval,
        outputHorizontalAlignment,
        outputVerticalAlignment,
      }}
      onOpenHistory={onOpenHistory}
      onOpenOutput={onOpenOutput}
      onOpenQr={onOpenQr}
      onOpenShare={onOpenShare}
    />
  );
}
