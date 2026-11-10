import React from 'react';
import { Modal, Pressable, Text as RNText, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ColorPicker, {
  HueSlider,
  Panel1,
  InputWidget,
  Swatches,
} from 'reanimated-color-picker';
import { t } from '../i18n';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';
import { HomeTheme } from '../theme';
import { X } from 'lucide-react-native';

type Props = {
  visible: boolean;
  title: string;
  initialColor: string;
  onClose: () => void;
  onColorChange: (color: string) => void;
  theme: HomeTheme;
};

const SWATCHES_COLORS = [
  // Grayscale
  '#FFFFFF',
  '#9E9E9E',
  '#000000',
  // Defaults from reanimated-color-picker,
  // except 9E9E9E
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#607D8B',
];

export function ColorPickerModal({
  visible,
  title,
  initialColor,
  onClose,
  onColorChange,
  theme,
}: Props) {
  const language = useAppStore(state => state.language);
  const [draftColor, setDraftColor] = React.useState(initialColor);

  React.useEffect(() => {
    if (visible) {
      setDraftColor(initialColor);
    }
  }, [initialColor, visible]);

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
              <RNText style={[styles.modalTitle, { color: theme.modalText }]}>
                {title}
              </RNText>
              <Pressable
                onPress={onClose}
                aria-label={t('modal.close', undefined, language)}
              >
                <X color={theme.modalCloseIcon} strokeWidth={2.5} />
              </Pressable>
            </View>
            <ScrollView
              style={styles.colorPickerBody}
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
                <InputWidget
                  inputStyle={[
                    styles.colorTextInput,
                    { color: theme.inputText },
                  ]}
                  inputTitleStyle={[
                    styles.colorTextInput,
                    { color: theme.placeholderText },
                  ]}
                  iconColor={theme.modalText}
                  disableAlphaChannel
                />
                <View
                  style={[
                    styles.colorDivider,
                    { backgroundColor: theme.border },
                  ]}
                />
                <Panel1 style={styles.panel} />
                <HueSlider style={styles.hueSlider} />
                <Swatches
                  colors={SWATCHES_COLORS}
                  style={[
                    styles.colorSwatches,
                    { backgroundColor: theme.modalPanel },
                  ]}
                  swatchStyle={[
                    styles.colorSwatchChip,
                    { borderColor: theme.swatchBorder },
                  ]}
                />
              </ColorPicker>
            </ScrollView>
          </View>
        </View>
      ) : null}
    </Modal>
  );
}
