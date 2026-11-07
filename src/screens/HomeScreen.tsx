import React from 'react';
import { Pressable, StatusBar, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { defaultOutputFontFamily, getFontDisplayName } from '../fonts';
import { LANGUAGE_BUTTON_LABELS, t } from '../i18n';
import { useAppStore } from '../state/useAppStore';
import { ColorButton } from '../ui/ColorButton';
import { ColorPickerModal } from '../ui/ColorPickerModal';
import { AlignmentPickerModal, getAlignmentLabelKey } from '../ui/AlignmentPickerModal';
import { EffectPickerModal } from '../ui/EffectPickerModal';
import { FontPickerModal } from '../ui/FontPickerModal';
import { FontSizeModal } from '../ui/FontSizeModal';
import { getHomeTheme } from '../theme';
import { styles } from '../styles';
import { AArrowUp, Moon, RotateCcwClock, Sparkles, Sun, TrianglesCenterlineDashedVertical, Type } from 'lucide-react-native';

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
  const outputDisplayStyle = useAppStore(state => state.outputDisplayStyle);
  const outputEffectInterval = useAppStore(state => state.outputEffectInterval);
  const outputHorizontalAlignment = useAppStore(state => state.outputHorizontalAlignment);
  const outputVerticalAlignment = useAppStore(state => state.outputVerticalAlignment);
  const setText = useAppStore(state => state.setText);
  const setForegroundColor = useAppStore(state => state.setForegroundColor);
  const setBackgroundColor = useAppStore(state => state.setBackgroundColor);
  const setOutputFontFamily = useAppStore(state => state.setOutputFontFamily);
  const setOutputFontSizeMode = useAppStore(state => state.setOutputFontSizeMode);
  const setOutputFontSize = useAppStore(state => state.setOutputFontSize);
  const setOutputDisplayStyle = useAppStore(state => state.setOutputDisplayStyle);
  const setOutputEffectInterval = useAppStore(state => state.setOutputEffectInterval);
  const setOutputHorizontalAlignment = useAppStore(state => state.setOutputHorizontalAlignment);
  const setOutputVerticalAlignment = useAppStore(state => state.setOutputVerticalAlignment);
  const toggleHomeTheme = useAppStore(state => state.toggleHomeTheme);
  const cycleLanguage = useAppStore(state => state.cycleLanguage);
  const goToHistory = useAppStore(state => state.goToHistory);
  const goToOutput = useAppStore(state => state.goToOutput);
  const goToShare = useAppStore(state => state.goToShare);
  const [foregroundPickerVisible, setForegroundPickerVisible] = React.useState(false);
  const [backgroundPickerVisible, setBackgroundPickerVisible] = React.useState(false);
  const [fontPickerVisible, setFontPickerVisible] = React.useState(false);
  const [fontSizePickerVisible, setFontSizePickerVisible] = React.useState(false);
  const [effectPickerVisible, setEffectPickerVisible] = React.useState(false);
  const [alignmentPickerVisible, setAlignmentPickerVisible] = React.useState(false);
  const canShowText = text.trim().length > 0;
  const theme = getHomeTheme(homeThemeName);
  const translate = (key: string, params?: Record<string, string | number>) => t(key, params, language);

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
          styles.homeStatusBarPadded,
          {
            backgroundColor: theme.screenBackground,
            borderBottomColor: theme.border,
          },
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
            aria-label={theme.name === 'dark' ? translate('home.lightMode') : translate('home.darkMode')}
          >
              {theme.name === 'dark' ?
                <Moon color={theme.buttonText} /> :
                <Sun color={theme.buttonText} />
              }
          </Pressable>
          <Pressable
            onPress={goToHistory}
            aria-label={translate('home.history')}
          >
            <RotateCcwClock color={theme.buttonText} />
          </Pressable>
        </View>
      </View>
      <ScrollView
        style={styles.flexOne}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        contentContainerStyle={[
          styles.homeScrollContent,
          { backgroundColor: theme.screenBackground },
        ]}
      >
        <View style={styles.homeMainContent}>
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
              <Type color={theme.buttonChip} size={20} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.colorButtonText, styles.fontFamilyButtonText, { color: theme.buttonText }]}
              >
                {getFontDisplayName(outputFontFamily || defaultOutputFontFamily)}
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
              <AArrowUp color={theme.buttonChip} size={20} />
              <Text style={[styles.colorButtonText, { color: theme.buttonText }]}> 
                {outputFontSizeMode === 'automatic' ? translate('home.auto') : outputFontSize}
              </Text>
            </Pressable>
          </View>
          <View style={styles.toggleRow}>
            <Pressable
              onPress={() => {
                setEffectPickerVisible(true);
              }}
              style={[
                styles.optionButton,
                { borderColor: theme.optionBorder, backgroundColor: theme.surface },
              ]}
            >
              <Sparkles color={theme.buttonChip} size={20} />
              <Text style={[styles.optionButtonText, { color: theme.optionText }]}> 
                {translate(`home.displayStyle.${outputDisplayStyle}`)}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setAlignmentPickerVisible(true);
              }}
              style={({pressed}) => [
                styles.optionButton,
                { borderColor: theme.optionBorder, backgroundColor: theme.surface },
                pressed && styles.optionButtonPressed,
              ]}
            >
              <TrianglesCenterlineDashedVertical color={theme.buttonChip} size={20} />
              <Text style={[styles.optionButtonText, { color: theme.optionText }]}> 
                {translate(
                  getAlignmentLabelKey(outputHorizontalAlignment, outputVerticalAlignment),
                )}
              </Text>
            </Pressable>
          </View>
          <View style={styles.buttonRow}>
            <Pressable
              disabled={!canShowText}
              onPress={goToOutput}
              style={[styles.button, styles.buttonHalf, !canShowText && styles.buttonDisabled]}
            >
              <Text style={styles.buttonText}>{translate('home.showText')}</Text>
            </Pressable>
            <Pressable
              disabled={!canShowText}
              onPress={goToShare}
              style={[styles.button, styles.buttonHalf, !canShowText && styles.buttonDisabled]}
            >
              <Text style={styles.buttonText}>{translate('home.shareImage')}</Text>
            </Pressable>
          </View>
          <Text style={[styles.exitHint, { color: theme.mutedText }]}>{translate('home.exitHint')}</Text>
        </View>
        <Text style={[styles.homeCredits, { color: theme.mutedText }]}> 
          {translate('home.credits')}
        </Text>
      </ScrollView>
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
      <EffectPickerModal
        visible={effectPickerVisible}
        selectedStyle={outputDisplayStyle}
        interval={outputEffectInterval}
        onClose={() => setEffectPickerVisible(false)}
        onStyleChange={style => setOutputDisplayStyle(style)}
        onIntervalChange={interval => setOutputEffectInterval(interval)}
        theme={theme}
      />
      <AlignmentPickerModal
        visible={alignmentPickerVisible}
        horizontalAlignment={outputHorizontalAlignment}
        verticalAlignment={outputVerticalAlignment}
        onClose={() => setAlignmentPickerVisible(false)}
        onHorizontalAlignmentChange={alignment => setOutputHorizontalAlignment(alignment)}
        onVerticalAlignmentChange={alignment => setOutputVerticalAlignment(alignment)}
        theme={theme}
      />
    </View>
  );
}
