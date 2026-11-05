import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import {fontOptions, getFontFamily} from '../fonts';
import {styles} from '../styles';

type Props = {
  visible: boolean;
  selectedFontFamily: string;
  onClose: () => void;
  onFontChange: (family: string) => void;
};

export function FontPickerModal({
  visible,
  selectedFontFamily,
  onClose,
  onFontChange,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {visible ? (
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Output font</Text>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
            <View style={styles.fontGrid}>
              {fontOptions.map(option => {
                const family = getFontFamily(option);
                const selected = family === selectedFontFamily;

                return (
                  <Pressable
                    key={option.displayName}
                    onPress={() => onFontChange(family)}
                    style={({pressed}) => [
                      styles.fontChoiceButton,
                      selected && styles.fontChoiceButtonSelected,
                      pressed && styles.fontChoiceButtonPressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.fontChoicePreview,
                        {fontFamily: family},
                      ]}
                    >
                      {option.sample}
                    </Text>
                    <Text style={styles.fontChoiceLabel}>{option.displayName}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      ) : null}
    </Modal>
  );
}
