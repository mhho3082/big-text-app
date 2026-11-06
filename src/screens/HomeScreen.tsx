import React from 'react';
import { Pressable, StatusBar, Text, TextInput, View } from 'react-native';
import { defaultOutputFontFamily, getFontDisplayName } from '../fonts';
import { useAppStore } from '../state/useAppStore';
import { ColorButton } from '../ui/ColorButton';
import { ColorPickerModal } from '../ui/ColorPickerModal';
import { FontPickerModal } from '../ui/FontPickerModal';
import { FontSizeModal } from '../ui/FontSizeModal';
import { getHomeTheme } from '../theme';
import { styles } from '../styles';

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
};

export function HomeScreen({ insets }: Props) {
  const homeThemeName = useAppStore(state => state.homeTheme);
  const text = useAppStore(state => state.text);
  const foregroundColor = useAppStore(state => state.foregroundColor);
  const backgroundColor = useAppStore(state => state.backgroundColor);
  const outputFontFamily = useAppStore(state => state.outputFontFamily);
  const outputFontSizeMode = useAppStore(state => state.outputFontSizeMode);
  const outputFontSize = useAppStore(state => state.outputFontSize);
  const outputOneLine = useAppStore(state => state.outputOneLine);
  const outputWordBreak = useAppStore(state => state.outputWordBreak);
  const setText = useAppStore(state => state.setText);
  const setForegroundColor = useAppStore(state => state.setForegroundColor);
  const setBackgroundColor = useAppStore(state => state.setBackgroundColor);
  const setOutputFontFamily = useAppStore(state => state.setOutputFontFamily);
  const setOutputFontSizeMode = useAppStore(state => state.setOutputFontSizeMode);
  const setOutputFontSize = useAppStore(state => state.setOutputFontSize);
  const setOutputOneLine = useAppStore(state => state.setOutputOneLine);
  const setOutputWordBreak = useAppStore(state => state.setOutputWordBreak);
  const toggleHomeTheme = useAppStore(state => state.toggleHomeTheme);
  const goToOutput = useAppStore(state => state.goToOutput);
  const [foregroundPickerVisible, setForegroundPickerVisible] =
    React.useState(false);
  const [backgroundPickerVisible, setBackgroundPickerVisible] =
    React.useState(false);
  const [fontPickerVisible, setFontPickerVisible] = React.useState(false);
  const [fontSizePickerVisible, setFontSizePickerVisible] = React.useState(false);
  const canShowText = text.trim().length > 0;
  const theme = getHomeTheme(homeThemeName);

  return (
    <View
      style={[
        styles.homeScreen,
        { backgroundColor: theme.screenBackground },
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <StatusBar
        barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.statusBarBg}
      />
      <View
        style={[
          styles.homeStatusBar,
          { backgroundColor: theme.screenBackground, borderBottomColor: theme.border },
        ]}
      >
        <Text style={[styles.homeTitle, { color: theme.titleText }]}>Big Text</Text>
        <Pressable
          onPress={toggleHomeTheme}
          style={[styles.homeThemeButton, { backgroundColor: theme.buttonChip }]}
        >
          <Text style={[styles.homeThemeButtonText, { color: theme.buttonChipText }]}>
            {theme.name === 'dark' ? 'Light mode' : 'Dark mode'}
          </Text>
        </Pressable>
      </View>
      <View style={[styles.content, { backgroundColor: theme.screenBackground }]}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: theme.inputBorder,
              backgroundColor: theme.inputBackground,
              color: theme.inputText,
            },
          ]}
          value={text}
          onChangeText={setText}
          placeholder="Type your text"
          placeholderTextColor={theme.placeholderText}
          multiline
          textAlignVertical="top"
        />
        <View style={styles.buttonRow}>
          <ColorButton label="Text" color={foregroundColor} onPress={() => setForegroundPickerVisible(true)} theme={theme} />
          <ColorButton label="Background" color={backgroundColor} onPress={() => setBackgroundPickerVisible(true)} theme={theme} />
        </View>
        <View style={styles.buttonRow}>
          <Pressable
            onPress={() => {
              setFontPickerVisible(true);
            }}
            style={[
              styles.colorButton,
              { borderColor: theme.buttonBorder, backgroundColor: theme.buttonSurface },
            ]}
          >
            <View style={[styles.fontSampleBubble, { backgroundColor: theme.buttonChip }]}>
              <Text style={[styles.fontSampleText, { color: theme.buttonChipText }]}>Aa</Text>
            </View>
            <Text style={[styles.colorButtonText, { color: theme.buttonText }]}>Font: {getFontDisplayName(outputFontFamily || defaultOutputFontFamily)}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setFontSizePickerVisible(true);
            }}
            style={[
              styles.colorButton,
              { borderColor: theme.buttonBorder, backgroundColor: theme.buttonSurface },
            ]}
          >
            <View style={[styles.fontSampleBubble, { backgroundColor: theme.buttonChip }]}>
              <Text style={[styles.fontSampleText, { color: theme.buttonChipText }]}>T</Text>
            </View>
            <Text style={[styles.colorButtonText, { color: theme.buttonText }]}>Size: {outputFontSizeMode === 'automatic' ? 'Auto' : outputFontSize}</Text>
          </Pressable>
        </View>
        <View style={styles.toggleRow}>
          <Pressable
            onPress={() => {
              setOutputOneLine(!outputOneLine);
            }}
            style={({pressed}) => [
              styles.optionButton,
              { borderColor: theme.optionBorder, backgroundColor: theme.surface },
              pressed && styles.optionButtonPressed,
            ]}
          >
            <View style={[styles.optionIndicator, { borderColor: theme.optionBorder }, outputOneLine ? { backgroundColor: theme.optionOn } : { backgroundColor: theme.optionOff }]} />
            <Text style={[styles.optionButtonText, { color: theme.optionText }]}>One line</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setOutputWordBreak(!outputWordBreak);
            }}
            style={({pressed}) => [
              styles.optionButton,
              { borderColor: theme.optionBorder, backgroundColor: theme.surface },
              pressed && styles.optionButtonPressed,
            ]}
          >
            <View style={[styles.optionIndicator, { borderColor: theme.optionBorder }, outputWordBreak ? { backgroundColor: theme.optionOn } : { backgroundColor: theme.optionOff }]} />
            <Text style={[styles.optionButtonText, { color: theme.optionText }]}>Word break</Text>
          </Pressable>
        </View>
        <Pressable
          disabled={!canShowText}
          onPress={goToOutput}
          style={[styles.button, !canShowText && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>Show text</Text>
        </Pressable>
        <Text style={[styles.exitHint, { color: theme.mutedText }]}>Notes: double-tap to exit the display screen</Text>
      </View>
      <ColorPickerModal
        visible={foregroundPickerVisible}
        title="Text color"
        initialColor={foregroundColor}
        onClose={() => setForegroundPickerVisible(false)}
        onColorChange={setForegroundColor}
        theme={theme}
      />
      <ColorPickerModal
        visible={backgroundPickerVisible}
        title="Background color"
        initialColor={backgroundColor}
        onClose={() => setBackgroundPickerVisible(false)}
        onColorChange={setBackgroundColor}
        theme={theme}
      />
      <FontPickerModal
        visible={fontPickerVisible}
        selectedFontFamily={outputFontFamily || defaultOutputFontFamily}
        onClose={() => setFontPickerVisible(false)}
        onFontChange={family => {
          setOutputFontFamily(family);
          setFontPickerVisible(false);
        }}
        theme={theme}
      />
      <FontSizeModal
        visible={fontSizePickerVisible}
        mode={outputFontSizeMode}
        fontSize={outputFontSize}
        onClose={() => setFontSizePickerVisible(false)}
        onModeChange={mode => setOutputFontSizeMode(mode)}
        onFontSizeChange={size => setOutputFontSize(size)}
        theme={theme}
      />
    </View>
  );
}
