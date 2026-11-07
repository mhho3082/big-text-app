import React from 'react';
import { Modal, Pressable, Text as RNText, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ColorPicker, { HueSlider, Panel1, InputWidget, Preview, Swatches } from 'reanimated-color-picker';
import { t } from '../i18n';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';
import { HomeTheme } from '../theme';

type Props = {
  visible: boolean;
  title: string;
  initialColor: string;
  onClose: () => void;
  onColorChange: (color: string) => void;
  theme: HomeTheme;
};

export function ColorPickerModal({ visible, title, initialColor, onClose, onColorChange, theme }: Props) {
  const language = useAppStore(state => state.language);
  const [draftColor, setDraftColor] = React.useState(initialColor);

  React.useEffect(() => {
    if (visible) {
      setDraftColor(initialColor);
    }
  }, [initialColor, visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {visible ? (
        <View style={[styles.backdrop, { backgroundColor: theme.modalBackdrop }]}>
          <View style={[styles.sheet, { backgroundColor: theme.modalSheet }]}> 
            <View style={styles.modalHeader}>
              <RNText style={[styles.modalTitle, { color: theme.modalText }]}>{title}</RNText>
              <Pressable onPress={onClose} style={[styles.closeButton, { backgroundColor: theme.modalButton }]}> 
                <RNText style={[styles.closeButtonText, { color: theme.modalButtonText }]}>{t('modal.close', undefined, language)}</RNText>
              </Pressable>
            </View>
            <ScrollView
              style={styles.fontPickerBody}
              contentContainerStyle={styles.picker}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
            >
              <ColorPicker
                style={styles.picker}
                value={draftColor}
                onCompleteJS={colors => {
                  setDraftColor(colors.hex);
                  onColorChange(colors.hex);
                }}
              >
                <Panel1 style={styles.panel} />
                <HueSlider style={styles.hueSlider} />
                <Swatches style={[styles.colorSwatches, { backgroundColor: theme.modalPanel }]} swatchStyle={[styles.colorSwatchChip, { borderColor: theme.swatchBorder }]} />
                <InputWidget inputStyle={[styles.colorTextInput, { color: theme.inputText }]} inputTitleStyle={[styles.colorTextInput, { color: theme.inputText }]} iconColor={theme.colorPickerIcon} />
                <Preview
                  style={[
                    styles.preview,
                    {
                      backgroundColor: theme.modalPreview,
                      borderColor: theme.modalPreviewBorder,
                    },
                  ]}
                  hideText
                  hideInitialColor
                />
              </ColorPicker>
            </ScrollView>
          </View>
        </View>
      ) : null}
    </Modal>
  );
}
