import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {styles} from '../styles';
import {OutputFontSizeMode} from '../state/useAppStore';
import {HomeTheme} from '../theme';

type Props = {
  visible: boolean;
  mode: OutputFontSizeMode;
  fontSize: number;
  onClose: () => void;
  onModeChange: (mode: OutputFontSizeMode) => void;
  onFontSizeChange: (size: number) => void;
  theme: HomeTheme;
};

const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 240;
const FONT_SIZE_STEP = 2;

export function FontSizeModal({
  visible,
  mode,
  fontSize,
  onClose,
  onModeChange,
  onFontSizeChange,
  theme,
}: Props) {
  const displaySize = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, fontSize));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {visible ? (
        <View style={[styles.backdrop, { backgroundColor: theme.modalBackdrop }]}>
          <View style={[styles.sheet, { backgroundColor: theme.modalSheet }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.modalText }]}>Font size</Text>
              <Pressable onPress={onClose} style={[styles.closeButton, { backgroundColor: theme.modalButton }]}>
                <Text style={[styles.closeButtonText, { color: theme.modalButtonText }]}>Close</Text>
              </Pressable>
            </View>
            <View style={styles.fontSizeModeRow}>
              <Pressable
                onPress={() => onModeChange('automatic')}
                style={({pressed}) => [
                  styles.fontSizeModeButton,
                  {
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  },
                  mode === 'automatic' && styles.fontSizeModeButtonSelected,
                  mode === 'automatic' && {
                    borderColor: theme.modalSelectedCardBorder,
                    backgroundColor: theme.modalSelectedCard,
                  },
                  pressed && styles.fontSizeModeButtonPressed,
                ]}
              >
                <Text style={[styles.fontSizeModeButtonText, { color: theme.modalText }]}>Automatic</Text>
              </Pressable>
              <Pressable
                onPress={() => onModeChange('custom')}
                style={({pressed}) => [
                  styles.fontSizeModeButton,
                  {
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  },
                  mode === 'custom' && styles.fontSizeModeButtonSelected,
                  mode === 'custom' && {
                    borderColor: theme.modalSelectedCardBorder,
                    backgroundColor: theme.modalSelectedCard,
                  },
                  pressed && styles.fontSizeModeButtonPressed,
                ]}
              >
                <Text style={[styles.fontSizeModeButtonText, { color: theme.modalText }]}>Custom</Text>
              </Pressable>
            </View>
            {mode === 'custom' ? (
              <View style={styles.fontSizeSliderBlock}>
                <View style={styles.fontSizeValueRow}>
                  <Text style={[styles.fontSizeLabel, { color: theme.modalText }]}>Size</Text>
                  <Text style={[styles.fontSizeValue, { color: theme.modalText }]}>{displaySize}</Text>
                </View>
                <Slider
                  minimumValue={MIN_FONT_SIZE}
                  maximumValue={MAX_FONT_SIZE}
                  step={FONT_SIZE_STEP}
                  value={displaySize}
                  minimumTrackTintColor="#6750a4"
                  maximumTrackTintColor={theme.modalSliderTrack}
                  thumbTintColor={theme.modalSliderThumb}
                  onValueChange={value => onFontSizeChange(Math.round(value))}
                  style={styles.fontSizeSlider}
                />
              </View>
            ) : null}
          </View>
        </View>
      ) : null}
    </Modal>
  );
}
