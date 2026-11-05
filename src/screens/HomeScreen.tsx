import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { defaultOutputFontFamily, getFontDisplayName } from '../fonts';
import { useAppStore } from '../state/useAppStore';
import { ColorButton } from '../ui/ColorButton';
import { ColorPickerModal } from '../ui/ColorPickerModal';
import { FontPickerModal } from '../ui/FontPickerModal';
import { styles } from '../styles';

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
};

export function HomeScreen({ insets }: Props) {
  const text = useAppStore(state => state.text);
  const foregroundColor = useAppStore(state => state.foregroundColor);
  const backgroundColor = useAppStore(state => state.backgroundColor);
  const outputFontFamily = useAppStore(state => state.outputFontFamily);
  const setText = useAppStore(state => state.setText);
  const setForegroundColor = useAppStore(state => state.setForegroundColor);
  const setBackgroundColor = useAppStore(state => state.setBackgroundColor);
  const setOutputFontFamily = useAppStore(state => state.setOutputFontFamily);
  const goToOutput = useAppStore(state => state.goToOutput);
  const [foregroundPickerVisible, setForegroundPickerVisible] =
    React.useState(false);
  const [backgroundPickerVisible, setBackgroundPickerVisible] =
    React.useState(false);
  const [fontPickerVisible, setFontPickerVisible] = React.useState(false);
  const canShowText = text.trim().length > 0;

  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Big Text</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type your text"
          placeholderTextColor="#777"
          multiline
          textAlignVertical="top"
        />
        <View style={styles.buttonRow}>
          <ColorButton
            label="Text"
            color={foregroundColor}
            onPress={() => {
              setForegroundPickerVisible(true);
            }}
          />
          <ColorButton
            label="Background"
            color={backgroundColor}
            onPress={() => {
              setBackgroundPickerVisible(true);
            }}
          />
        </View>
        <View style={styles.buttonRow}>
          <Pressable
            onPress={() => {
              setFontPickerVisible(true);
            }}
            style={styles.colorButton}
          >
            <View style={styles.fontSampleBubble}>
              <Text style={styles.fontSampleText}>Aa</Text>
            </View>
            <Text style={styles.colorButtonText}>
              Font:{' '}
              {getFontDisplayName(outputFontFamily || defaultOutputFontFamily)}
            </Text>
          </Pressable>
        </View>
        <Pressable
          disabled={!canShowText}
          onPress={goToOutput}
          style={[styles.button, !canShowText && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>Show text</Text>
        </Pressable>
        <Text style={styles.exitHint}>Notes: double-tap to exit the display screen</Text>
      </View>
      <ColorPickerModal
        visible={foregroundPickerVisible}
        title="Text color"
        initialColor={foregroundColor}
        onClose={() => setForegroundPickerVisible(false)}
        onColorChange={setForegroundColor}
      />
      <ColorPickerModal
        visible={backgroundPickerVisible}
        title="Background color"
        initialColor={backgroundColor}
        onClose={() => setBackgroundPickerVisible(false)}
        onColorChange={setBackgroundColor}
      />
      <FontPickerModal
        visible={fontPickerVisible}
        selectedFontFamily={outputFontFamily || defaultOutputFontFamily}
        onClose={() => setFontPickerVisible(false)}
        onFontChange={family => {
          setOutputFontFamily(family);
          setFontPickerVisible(false);
        }}
      />
    </View>
  );
}
