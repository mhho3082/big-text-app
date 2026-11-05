import React from 'react';
import { Modal, Pressable, Text as RNText, View } from 'react-native';
import ColorPicker, {
  HueSlider,
  Panel1,
  InputWidget,
  Preview,
} from 'reanimated-color-picker';
import { styles } from '../styles';

type Props = {
  visible: boolean;
  title: string;
  initialColor: string;
  onClose: () => void;
  onColorChange: (color: string) => void;
};

export function ColorPickerModal({
  visible,
  title,
  initialColor,
  onClose,
  onColorChange,
}: Props) {
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
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.modalHeader}>
              <RNText style={styles.modalTitle}>{title}</RNText>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <RNText style={styles.closeButtonText}>Close</RNText>
              </Pressable>
            </View>
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
              <InputWidget
                inputStyle={styles.colorTextInput}
                inputTitleStyle={styles.colorTextInput}
                iconColor='#ffffff'
              />
              <Preview style={styles.preview} hideText hideInitialColor />
            </ColorPicker>
          </View>
        </View>
      ) : null}
    </Modal>
  );
}
