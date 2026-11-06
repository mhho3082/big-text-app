import React from 'react';
import { Pressable, StatusBar, Text, TextInput, View } from 'react-native';
import { defaultOutputFontFamily, getFontDisplayName } from '../fonts';
import { LANGUAGE_BUTTON_LABELS, t } from '../i18n';
import { OutputAlignment, OutputDisplayStyle, useAppStore } from '../state/useAppStore';
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
  const language = useAppStore(state => state.language);
  const text = useAppStore(state => state.text);
  const foregroundColor = useAppStore(state => state.foregroundColor);
  const backgroundColor = useAppStore(state => state.backgroundColor);
  const outputFontFamily = useAppStore(state => state.outputFontFamily);
  const outputFontSizeMode = useAppStore(state => state.outputFontSizeMode);
  const outputFontSize = useAppStore(state => state.outputFontSize);
  const outputOneLine = useAppStore(state => state.outputOneLine);
  const outputWordBreak = useAppStore(state => state.outputWordBreak);
  const outputDisplayStyle = useAppStore(state => state.outputDisplayStyle);
  const outputAlignment = useAppStore(state => state.outputAlignment);
  const setText = useAppStore(state => state.setText);
  const setForegroundColor = useAppStore(state => state.setForegroundColor);
  const setBackgroundColor = useAppStore(state => state.setBackgroundColor);
  const setOutputFontFamily = useAppStore(state => state.setOutputFontFamily);
  const setOutputFontSizeMode = useAppStore(state => state.setOutputFontSizeMode);
  const setOutputFontSize = useAppStore(state => state.setOutputFontSize);
  const setOutputOneLine = useAppStore(state => state.setOutputOneLine);
  const setOutputWordBreak = useAppStore(state => state.setOutputWordBreak);
  const setOutputDisplayStyle = useAppStore(state => state.setOutputDisplayStyle);
  const setOutputAlignment = useAppStore(state => state.setOutputAlignment);
  const toggleHomeTheme = useAppStore(state => state.toggleHomeTheme);
  const cycleLanguage = useAppStore(state => state.cycleLanguage);
  const goToOutput = useAppStore(state => state.goToOutput);
  const [foregroundPickerVisible, setForegroundPickerVisible] = React.useState(false);
  const [backgroundPickerVisible, setBackgroundPickerVisible] = React.useState(false);
  const [fontPickerVisible, setFontPickerVisible] = React.useState(false);
  const [fontSizePickerVisible, setFontSizePickerVisible] = React.useState(false);
  const canShowText = text.trim().length > 0;
  const theme = getHomeTheme(homeThemeName);
  const translate = (key: string, params?: Record<string, string | number>) => t(key, params, language);
  const cycleOption = <T extends string>(value: T, options: readonly T[], setter: (next: T) => void) => {
    const index = options.indexOf(value);
    setter(options[(index + 1) % options.length] ?? options[0]);
  };

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
      />
      <View
        style={[
          styles.homeStatusBar,
          { backgroundColor: theme.screenBackground, borderBottomColor: theme.border },
        ]}
      >
        <Text style={[styles.homeTitle, { color: theme.titleText }]}>{translate('app.title')}</Text>
        <View style={styles.homeStatusBarActions}>
          <Pressable
            onPress={cycleLanguage}
            style={[styles.homeThemeButton, { backgroundColor: theme.buttonChip }]}
          >
            <Text style={[styles.homeThemeButtonText, { color: theme.buttonChipText }]}> 
              {LANGUAGE_BUTTON_LABELS[language]}
            </Text>
          </Pressable>
          <Pressable
            onPress={toggleHomeTheme}
            style={[styles.homeThemeButton, { backgroundColor: theme.buttonChip }]}
          >
            <Text style={[styles.homeThemeButtonText, { color: theme.buttonChipText }]}> 
              {theme.name === 'dark' ? translate('home.lightMode') : translate('home.darkMode')}
            </Text>
          </Pressable>
        </View>
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
          placeholder={translate('home.textPlaceholder')}
          placeholderTextColor={theme.placeholderText}
          multiline
          textAlignVertical="top"
        />
        <View style={styles.buttonRow}>
          <ColorButton label={translate('home.textColor')} color={foregroundColor} onPress={() => setForegroundPickerVisible(true)} theme={theme} />
          <ColorButton label={translate('home.backgroundColor')} color={backgroundColor} onPress={() => setBackgroundPickerVisible(true)} theme={theme} />
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
            <Text style={[styles.colorButtonText, { color: theme.buttonText }]}> 
              {translate('home.font')}: {getFontDisplayName(outputFontFamily || defaultOutputFontFamily)}
            </Text>
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
            <Text style={[styles.colorButtonText, { color: theme.buttonText }]}> 
              {translate('home.fontSize')}: {outputFontSizeMode === 'automatic' ? translate('home.auto') : outputFontSize}
            </Text>
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
            <Text style={[styles.optionButtonText, { color: theme.optionText }]}>{translate('home.oneLine')}</Text>
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
            <Text style={[styles.optionButtonText, { color: theme.optionText }]}>{translate('home.wordBreak')}</Text>
          </Pressable>
        </View>
        <View style={styles.toggleRow}>
          <Pressable
            onPress={() => {
              cycleOption<OutputDisplayStyle>(outputDisplayStyle, ['static', 'strobe', 'pulse'], setOutputDisplayStyle);
            }}
            style={({pressed}) => [
              styles.optionButton,
              { borderColor: theme.optionBorder, backgroundColor: theme.surface },
              pressed && styles.optionButtonPressed,
            ]}
          >
            <Text style={[styles.optionButtonText, { color: theme.optionText }]}> 
              {translate('home.displayStyle.label')}: {translate(`home.displayStyle.${outputDisplayStyle}`)}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              cycleOption<OutputAlignment>(outputAlignment, ['left', 'center', 'right'], setOutputAlignment);
            }}
            style={({pressed}) => [
              styles.optionButton,
              { borderColor: theme.optionBorder, backgroundColor: theme.surface },
              pressed && styles.optionButtonPressed,
            ]}
          >
            <Text style={[styles.optionButtonText, { color: theme.optionText }]}> 
              {translate('home.alignment.label')}: {translate(`home.alignment.${outputAlignment}`)}
            </Text>
          </Pressable>
        </View>
        <Pressable
          disabled={!canShowText}
          onPress={goToOutput}
          style={[styles.button, !canShowText && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>{translate('home.showText')}</Text>
        </Pressable>
        <Text style={[styles.exitHint, { color: theme.mutedText }]}>{translate('home.exitHint')}</Text>
      </View>
      <ColorPickerModal
        visible={foregroundPickerVisible}
        title={translate('home.textColor')}
        initialColor={foregroundColor}
        onClose={() => setForegroundPickerVisible(false)}
        onColorChange={setForegroundColor}
        theme={theme}
      />
      <ColorPickerModal
        visible={backgroundPickerVisible}
        title={translate('home.backgroundColor')}
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
