import React from 'react';
import { Modal, Pressable, Text, useWindowDimensions, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { t } from '../i18n';
import { DEFAULT_OUTPUT_EFFECT_INTERVAL, type OutputDisplayStyle } from '../state/persistedOptions';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';
import { HomeTheme } from '../theme';
import { X } from 'lucide-react-native';

type Props = {
  visible: boolean;
  selectedStyle: OutputDisplayStyle;
  interval: number;
  onClose: () => void;
  onStyleChange: (style: OutputDisplayStyle) => void;
  onIntervalChange: (interval: number) => void;
  theme: HomeTheme;
};

const DISPLAY_STYLES: OutputDisplayStyle[] = [
  'static',
  'strobe',
  'pulse',
  'crossStrobe',
  'crossPulse',
];

const MIN_EFFECT_INTERVAL = 0.1;
const MAX_EFFECT_INTERVAL = 10;
const EFFECT_INTERVAL_STEP = 0.1;

export function EffectPickerModal({
  visible,
  selectedStyle,
  interval,
  onClose,
  onStyleChange,
  onIntervalChange,
  theme,
}: Props) {
  const language = useAppStore(state => state.language);
  const layout = useWindowDimensions();
  const displayInterval = Math.min(
    MAX_EFFECT_INTERVAL,
    Math.max(MIN_EFFECT_INTERVAL, interval || DEFAULT_OUTPUT_EFFECT_INTERVAL),
  );
  const effectColumns = React.useMemo(() => {
    const usableWidth = Math.max(layout.width - 64, 320);
    return Math.max(2, Math.floor(usableWidth / 180));
  }, [layout.width]);
  const effectRows = React.useMemo(() => {
    const rows: OutputDisplayStyle[][] = [];

    for (let index = 0; index < DISPLAY_STYLES.length; index += effectColumns) {
      rows.push(DISPLAY_STYLES.slice(index, index + effectColumns));
    }

    return rows;
  }, [effectColumns]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {visible ? (
        <View style={[styles.backdrop, { backgroundColor: theme.modalBackdrop }]}>
          <View style={[styles.sheet, { backgroundColor: theme.modalSheet }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.modalText }]}>
                {t('effectPicker.title', undefined, language)}
              </Text>
              <Pressable onPress={onClose} aria-label={t('modal.close', undefined, language)}>
                <X color={theme.modalButton} />
              </Pressable>
            </View>
            <View style={styles.effectOptionList}>
              {effectRows.map((row, rowIndex) => (
                <View key={`effect-row-${rowIndex}`} style={styles.effectOptionRow}>
                  {row.map(style => {
                    const selected = style === selectedStyle;
                    const isOddLastOption =
                      rowIndex === effectRows.length - 1 && row.length === 1;

                    return (
                      <Pressable
                        key={style}
                        onPress={() => onStyleChange(style)}
                        style={({ pressed }) => [
                          styles.effectOptionButton,
                          isOddLastOption && styles.oddLastOption,
                          {
                            borderColor: theme.border,
                            backgroundColor: theme.surface,
                          },
                          selected && styles.effectOptionButtonSelected,
                          selected && {
                            borderColor: theme.modalSelectedCardBorder,
                            backgroundColor: theme.modalSelectedCard,
                          },
                          pressed && styles.effectOptionButtonPressed,
                        ]}
                      >
                        <Text style={[styles.effectOptionButtonText, { color: theme.modalText }]}>
                          {t(`home.displayStyle.${style}`, undefined, language)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>
            {selectedStyle !== 'static' ? (
              <View style={styles.fontSizeSliderBlock}>
                <View style={styles.fontSizeValueRow}>
                  <Text style={[styles.fontSizeLabel, { color: theme.modalText }]}>
                    {t('effectPicker.interval', undefined, language)}
                  </Text>
                  <Text style={[styles.fontSizeValue, { color: theme.modalText }]}>
                    {displayInterval.toFixed(1)}s
                  </Text>
                </View>
                <Slider
                  minimumValue={MIN_EFFECT_INTERVAL}
                  maximumValue={MAX_EFFECT_INTERVAL}
                  step={EFFECT_INTERVAL_STEP}
                  value={displayInterval}
                  minimumTrackTintColor="#6750a4"
                  maximumTrackTintColor={theme.modalSliderTrack}
                  thumbTintColor={theme.modalSliderThumb}
                  onValueChange={value => onIntervalChange(Math.round(value * 10) / 10)}
                  style={styles.fontSizeSlider}
                />
                <Text style={[styles.modalBody, { color: theme.modalMutedText }]}>
                  {t('effectPicker.intervalNote', undefined, language)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      ) : null}
    </Modal>
  );
}
