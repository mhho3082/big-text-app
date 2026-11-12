import React from 'react';
import {
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { t } from '../i18n';
import {
  DEFAULT_OUTPUT_ANIMATION_INTERVAL,
  type OutputAnimationStyle,
} from '../state/persistedOptions';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';
import { BRAND_ACCENT, HomeTheme } from '../theme';
import { X } from 'lucide-react-native';

type Props = {
  visible: boolean;
  selectedStyle: OutputAnimationStyle;
  interval: number;
  onClose: () => void;
  onStyleChange: (style: OutputAnimationStyle) => void;
  onIntervalChange: (interval: number) => void;
  theme: HomeTheme;
};

const DISPLAY_STYLES: OutputAnimationStyle[] = [
  'static',
  'blink',
  'pulse',
  'crossBlink',
  'crossPulse',
];

const MIN_ANIMATION_INTERVAL = 0.1;
const MAX_ANIMATION_INTERVAL = 10;
const ANIMATION_INTERVAL_STEP = 0.1;

export function AnimationPickerModal({
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
    MAX_ANIMATION_INTERVAL,
    Math.max(
      MIN_ANIMATION_INTERVAL,
      interval || DEFAULT_OUTPUT_ANIMATION_INTERVAL,
    ),
  );
  const animationColumns = React.useMemo(() => {
    const usableWidth = Math.max(layout.width - 64, 320);
    return Math.max(2, Math.floor(usableWidth / 180));
  }, [layout.width]);
  const animationRows = React.useMemo(() => {
    const rows: OutputAnimationStyle[][] = [];

    for (
      let index = 0;
      index < DISPLAY_STYLES.length;
      index += animationColumns
    ) {
      rows.push(DISPLAY_STYLES.slice(index, index + animationColumns));
    }

    return rows;
  }, [animationColumns]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {visible ? (
        <View
          style={[styles.backdrop, { backgroundColor: theme.modalBackdrop }]}
        >
          <View style={[styles.sheet, { backgroundColor: theme.modalSheet }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.modalText }]}>
                {t('animationPicker.title', undefined, language)}
              </Text>
              <Pressable
                onPress={onClose}
                aria-label={t('modal.close', undefined, language)}
              >
                <X color={theme.modalCloseIcon} strokeWidth={2.5} />
              </Pressable>
            </View>
            <View style={styles.animationOptionList}>
              {animationRows.map((row, rowIndex) => (
                <View
                  key={`animation-row-${rowIndex}`}
                  style={styles.animationOptionRow}
                >
                  {row.map(style => {
                    const selected = style === selectedStyle;
                    const isOddLastOption =
                      rowIndex === animationRows.length - 1 && row.length === 1;

                    return (
                      <Pressable
                        key={style}
                        onPress={() => onStyleChange(style)}
                        style={({ pressed }) => [
                          styles.animationOptionButton,
                          isOddLastOption && styles.oddLastOption,
                          {
                            borderColor: theme.border,
                            backgroundColor: theme.surface,
                          },
                          selected && styles.animationOptionButtonSelected,
                          selected && {
                            borderColor: theme.modalSelectedCardBorder,
                            backgroundColor: theme.modalSelectedCard,
                          },
                          pressed && styles.animationOptionButtonPressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.animationOptionButtonText,
                            { color: theme.modalText },
                          ]}
                        >
                          {t(
                            `home.animationStyle.${style}`,
                            undefined,
                            language,
                          )}
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
                  <Text
                    style={[styles.fontSizeLabel, { color: theme.modalText }]}
                  >
                    {t('animationPicker.interval', undefined, language)}
                  </Text>
                  <Text
                    style={[styles.fontSizeValue, { color: theme.modalText }]}
                  >
                    {displayInterval.toFixed(1)}s
                  </Text>
                </View>
                <Slider
                  minimumValue={MIN_ANIMATION_INTERVAL}
                  maximumValue={MAX_ANIMATION_INTERVAL}
                  step={ANIMATION_INTERVAL_STEP}
                  value={displayInterval}
                  minimumTrackTintColor={BRAND_ACCENT}
                  maximumTrackTintColor={theme.modalSliderTrack}
                  thumbTintColor={theme.modalSliderThumb}
                  onValueChange={value =>
                    onIntervalChange(Math.round(value * 10) / 10)
                  }
                  style={styles.fontSizeSlider}
                />
                <Text
                  style={[styles.modalBody, { color: theme.modalMutedText }]}
                >
                  {t('animationPicker.intervalNote', undefined, language)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      ) : null}
    </Modal>
  );
}
