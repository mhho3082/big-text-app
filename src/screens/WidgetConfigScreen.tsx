import React from 'react';
import { t } from '../i18n';
import type { WidgetOptions } from '../state/persistedOptions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WidgetSettingsScreen } from './WidgetSettingsScreen';
import { styles } from '../styles';
import { useAppStore } from '../state/useAppStore';

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
  options: WidgetOptions;
  onConfirm: (options: WidgetOptions) => void;
  onWidgetNameChange?: (name: string) => void;
};

export function WidgetConfigScreen({
  insets,
  options,
  onConfirm,
  onWidgetNameChange,
}: Props) {
  const language = useAppStore(state => state.language);

  return (
    <GestureHandlerRootView style={styles.root}>
      <WidgetSettingsScreen
        homeMode={false}
        widgetMode
        insets={insets}
        title={t('widgetConfig.title', undefined, language)}
        options={options}
        confirmLabel={t('widgetConfig.confirm', undefined, language)}
        onWidgetNameChange={onWidgetNameChange}
        onConfirm={nextOptions => onConfirm(nextOptions as WidgetOptions)}
      />
    </GestureHandlerRootView>
  );
}
