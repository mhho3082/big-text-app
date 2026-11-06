import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {styles} from '../styles';
import {OutputFontSizeMode} from '../state/useAppStore';

type Props = {
  visible: boolean;
  mode: OutputFontSizeMode;
  fontSize: number;
  onClose: () => void;
  onModeChange: (mode: OutputFontSizeMode) => void;
  onFontSizeChange: (size: number) => void;
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
}: Props) {
  const displaySize = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, fontSize));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {visible ? (
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Font size</Text>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
            <View style={styles.fontSizeModeRow}>
              <Pressable
                onPress={() => onModeChange('automatic')}
                style={({pressed}) => [
                  styles.fontSizeModeButton,
                  mode === 'automatic' && styles.fontSizeModeButtonSelected,
                  pressed && styles.fontSizeModeButtonPressed,
                ]}
              >
                <Text style={styles.fontSizeModeButtonText}>Automatic</Text>
              </Pressable>
              <Pressable
                onPress={() => onModeChange('custom')}
                style={({pressed}) => [
                  styles.fontSizeModeButton,
                  mode === 'custom' && styles.fontSizeModeButtonSelected,
                  pressed && styles.fontSizeModeButtonPressed,
                ]}
              >
                <Text style={styles.fontSizeModeButtonText}>Custom</Text>
              </Pressable>
            </View>
            {mode === 'custom' ? (
              <View style={styles.fontSizeSliderBlock}>
                <View style={styles.fontSizeValueRow}>
                  <Text style={styles.fontSizeLabel}>Size</Text>
                  <Text style={styles.fontSizeValue}>{displaySize}</Text>
                </View>
                <Slider
                  minimumValue={MIN_FONT_SIZE}
                  maximumValue={MAX_FONT_SIZE}
                  step={FONT_SIZE_STEP}
                  value={displaySize}
                  minimumTrackTintColor="#6750a4"
                  maximumTrackTintColor="#3a3a3a"
                  thumbTintColor="#ffffff"
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
