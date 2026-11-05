import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useAppStore } from '../state/useAppStore';
import { ColorButton } from '../ui/ColorButton';
import { ColorPickerModal } from '../ui/ColorPickerModal';
import { styles } from '../styles';

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
};

export function HomeScreen({ insets }: Props) {
  const text = useAppStore(state => state.text);
  const foregroundColor = useAppStore(state => state.foregroundColor);
  const backgroundColor = useAppStore(state => state.backgroundColor);
  const setText = useAppStore(state => state.setText);
  const setForegroundColor = useAppStore(state => state.setForegroundColor);
  const setBackgroundColor = useAppStore(state => state.setBackgroundColor);
  const goToOutput = useAppStore(state => state.goToOutput);
  const [foregroundPickerVisible, setForegroundPickerVisible] = React.useState(false);
  const [backgroundPickerVisible, setBackgroundPickerVisible] = React.useState(false);

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
        <View style={styles.colorRow}>
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
        <Pressable onPress={goToOutput} style={styles.button}>
          <Text style={styles.buttonText}>Show text</Text>
        </Pressable>
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
    </View>
  );
}
