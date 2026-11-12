import React from 'react';
import { Pressable, StatusBar, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  defaultOutputFontFamily,
  getFontDisplayName,
  maokenSansFontFamily,
} from '../fonts';
import { LANGUAGE_BUTTON_LABELS, t } from '../i18n';
import { useAppStore } from '../state/useAppStore';
import { OutputScreen } from './OutputScreen';
import { ColorButton } from '../ui/ColorButton';
import { ColorPickerModal } from '../ui/ColorPickerModal';
import {
  AlignmentPickerModal,
  getAlignmentLabelKey,
} from '../ui/AlignmentPickerModal';
import { EffectPickerModal } from '../ui/EffectPickerModal';
import { FontPickerModal } from '../ui/FontPickerModal';
import { FontSizeModal } from '../ui/FontSizeModal';
import { SharePickerModal } from '../ui/SharePickerModal';
import { getHomeTheme } from '../theme';
import { styles } from '../styles';
import {
  AArrowUp,
  Moon,
  RotateCcwClock,
  Sparkles,
  Sun,
  TrianglesCenterlineDashedVertical,
  Type,
} from 'lucide-react-native';
import type { ShareAction } from '../types/output';
import { useHomeScreenOrchestration } from '../hooks/useHomeScreenOrchestration';

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
  onOpenHistory: () => void;
  onOpenOutput: () => void;
  onOpenQr: () => void;
  onOpenShare: (
    shareImageAspect: 'landscape' | 'portrait' | 'square',
    shareAction?: ShareAction,
  ) => void;
};

export function HomeScreen({
  insets,
  onOpenHistory,
  onOpenOutput,
  onOpenQr,
  onOpenShare,
}: Props) {
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
  const outputHorizontalAlignment = useAppStore(
    state => state.outputHorizontalAlignment,
  );
  const outputVerticalAlignment = useAppStore(
    state => state.outputVerticalAlignment,
  );
  const setText = useAppStore(state => state.setText);
  const setForegroundColor = useAppStore(state => state.setForegroundColor);
  const setBackgroundColor = useAppStore(state => state.setBackgroundColor);
  const setOutputFontFamily = useAppStore(state => state.setOutputFontFamily);
  const setOutputFontSizeMode = useAppStore(
    state => state.setOutputFontSizeMode,
  );
  const setOutputFontSize = useAppStore(state => state.setOutputFontSize);
  const setOutputDisplayStyle = useAppStore(
    state => state.setOutputDisplayStyle,
  );
  const setOutputEffectInterval = useAppStore(
    state => state.setOutputEffectInterval,
  );
  const setOutputHorizontalAlignment = useAppStore(
    state => state.setOutputHorizontalAlignment,
  );
  const setOutputVerticalAlignment = useAppStore(
    state => state.setOutputVerticalAlignment,
  );
  const toggleHomeTheme = useAppStore(state => state.toggleHomeTheme);
  const cycleLanguage = useAppStore(state => state.cycleLanguage);
  const shareRequestId = useAppStore(state => state.shareRequestId);
  const shareImageAspect = useAppStore(state => state.shareImageAspect);
  const shareAction = useAppStore(state => state.shareAction);
  const canShowText = (text ?? '').trim().length > 0;
  const theme = getHomeTheme(homeThemeName);
  const translate = (key: string, params?: Record<string, string | number>) =>
    t(key, params, language);
  const {
    activePicker,
    closePicker,
    openShareImage,
    openShareImagePortrait,
    openShareImageSquare,
    openShareQr,
    openShareText,
    setActivePicker,
    setAsWallpaper,
  } = useHomeScreenOrchestration({ text, onOpenQr, onOpenShare });

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
        <Text
          style={[
            styles.homeTitle,
            styles.homeTitleMaoken,
            { color: theme.titleText, fontFamily: maokenSansFontFamily },
          ]}
        >
          {translate('app.title')}
        </Text>
        <View style={styles.homeStatusBarActions}>
          <Pressable
            onPress={cycleLanguage}
            style={[
              styles.homeThemeButton,
              { backgroundColor: theme.buttonChip },
            ]}
          >
            <Text
              style={[
                styles.homeThemeButtonText,
                { color: theme.buttonChipText },
              ]}
            >
              {LANGUAGE_BUTTON_LABELS[language]}
            </Text>
          </Pressable>
          <Pressable
            onPress={toggleHomeTheme}
            aria-label={
              theme.name === 'dark'
                ? translate('home.lightMode')
                : translate('home.darkMode')
            }
          >
            {theme.name === 'dark' ? (
              <Moon color={theme.buttonText} />
            ) : (
              <Sun color={theme.buttonText} />
            )}
          </Pressable>
          <Pressable
            onPress={onOpenHistory}
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
            <ColorButton
              label={translate('home.textColor')}
              color={foregroundColor}
              onPress={() => setActivePicker('foreground')}
              theme={theme}
            />
            <ColorButton
              label={translate('home.backgroundColor')}
              color={backgroundColor}
              onPress={() => setActivePicker('background')}
              theme={theme}
            />
          </View>
          <View style={styles.buttonRow}>
            <Pressable
              onPress={() => {
                setActivePicker('font');
              }}
              style={[
                styles.colorButton,
                {
                  borderColor: theme.buttonBorder,
                  backgroundColor: theme.buttonSurface,
                },
              ]}
            >
              <Type color={theme.buttonChip} size={20} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.colorButtonText,
                  styles.fontFamilyButtonText,
                  { color: theme.buttonText },
                ]}
              >
                {getFontDisplayName(
                  outputFontFamily || defaultOutputFontFamily,
                )}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setActivePicker('fontSize');
              }}
              style={[
                styles.colorButton,
                {
                  borderColor: theme.buttonBorder,
                  backgroundColor: theme.buttonSurface,
                },
              ]}
            >
              <AArrowUp color={theme.buttonChip} size={20} />
              <Text
                style={[styles.colorButtonText, { color: theme.buttonText }]}
              >
                {outputFontSizeMode === 'automatic'
                  ? translate('home.auto')
                  : outputFontSize}
              </Text>
            </Pressable>
          </View>
          <View style={styles.toggleRow}>
            <Pressable
              onPress={() => {
                setActivePicker('effect');
              }}
              style={[
                styles.optionButton,
                {
                  borderColor: theme.optionBorder,
                  backgroundColor: theme.surface,
                },
              ]}
            >
              <Sparkles color={theme.buttonChip} size={20} />
              <Text
                style={[styles.optionButtonText, { color: theme.optionText }]}
              >
                {translate(`home.displayStyle.${outputDisplayStyle}`)}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setActivePicker('alignment');
              }}
              style={({ pressed }) => [
                styles.optionButton,
                {
                  borderColor: theme.optionBorder,
                  backgroundColor: theme.surface,
                },
                pressed && styles.optionButtonPressed,
              ]}
            >
              <TrianglesCenterlineDashedVertical
                color={theme.buttonChip}
                size={20}
              />
              <Text
                style={[styles.optionButtonText, { color: theme.optionText }]}
              >
                {translate(
                  getAlignmentLabelKey(
                    outputHorizontalAlignment,
                    outputVerticalAlignment,
                  ),
                )}
              </Text>
            </Pressable>
          </View>
          <View style={styles.buttonRow}>
            <Pressable
              disabled={!canShowText}
              onPress={onOpenOutput}
              style={[
                styles.button,
                styles.buttonHalf,
                !canShowText && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.buttonText}>
                {translate('home.showText')}
              </Text>
            </Pressable>
            <Pressable
              disabled={!canShowText}
              onPress={() => setActivePicker('share')}
              style={[
                styles.button,
                styles.buttonHalf,
                !canShowText && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.buttonText}>{translate('home.share')}</Text>
            </Pressable>
          </View>
          <Text style={[styles.exitHint, { color: theme.mutedText }]}>
            {translate('home.exitHint')}
          </Text>
        </View>
        <Text style={[styles.homeCredits, { color: theme.mutedText }]}>
          {translate('home.credits')}
        </Text>
      </ScrollView>
      <ColorPickerModal
        visible={activePicker === 'foreground'}
        title={translate('home.textColor')}
        initialColor={foregroundColor}
        onClose={closePicker}
        onColorChange={setForegroundColor}
        theme={theme}
      />
      <ColorPickerModal
        visible={activePicker === 'background'}
        title={translate('home.backgroundColor')}
        initialColor={backgroundColor}
        onClose={closePicker}
        onColorChange={setBackgroundColor}
        theme={theme}
      />
      <FontPickerModal
        visible={activePicker === 'font'}
        selectedFontFamily={outputFontFamily || defaultOutputFontFamily}
        onClose={closePicker}
        onFontChange={family => {
          setOutputFontFamily(family);
          closePicker();
        }}
        theme={theme}
      />
      <FontSizeModal
        visible={activePicker === 'fontSize'}
        mode={outputFontSizeMode}
        fontSize={outputFontSize}
        onClose={closePicker}
        onModeChange={mode => setOutputFontSizeMode(mode)}
        onFontSizeChange={size => setOutputFontSize(size)}
        theme={theme}
      />
      <EffectPickerModal
        visible={activePicker === 'effect'}
        selectedStyle={outputDisplayStyle}
        interval={outputEffectInterval}
        onClose={closePicker}
        onStyleChange={style => setOutputDisplayStyle(style)}
        onIntervalChange={interval => setOutputEffectInterval(interval)}
        theme={theme}
      />
      <AlignmentPickerModal
        visible={activePicker === 'alignment'}
        horizontalAlignment={outputHorizontalAlignment}
        verticalAlignment={outputVerticalAlignment}
        onClose={closePicker}
        onHorizontalAlignmentChange={alignment =>
          setOutputHorizontalAlignment(alignment)
        }
        onVerticalAlignmentChange={alignment =>
          setOutputVerticalAlignment(alignment)
        }
        theme={theme}
      />
      <SharePickerModal
        visible={activePicker === 'share'}
        onClose={closePicker}
        onShareAsImageLandscape={openShareImage}
        onShareAsImagePortrait={openShareImagePortrait}
        onShareAsImageSquare={openShareImageSquare}
        onSetAsWallpaper={setAsWallpaper}
        onShareAsText={openShareText}
        onShareAsQr={openShareQr}
        theme={theme}
      />
      <View pointerEvents="none" style={styles.hiddenShareHost}>
        <OutputScreen
          key={shareRequestId ?? 'idle'}
          insets={{ top: 0, right: 0, bottom: 0, left: 0 }}
          mode="share"
          headless
          onExit={() => undefined}
          text={text}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          outputFontFamily={outputFontFamily}
          outputFontSizeMode={outputFontSizeMode}
          outputFontSize={outputFontSize}
          outputDisplayStyle={outputDisplayStyle}
          outputEffectInterval={outputEffectInterval}
          outputHorizontalAlignment={outputHorizontalAlignment}
          outputVerticalAlignment={outputVerticalAlignment}
          shareRequestId={shareRequestId}
          shareImageAspect={shareImageAspect}
          shareAction={shareAction}
        />
      </View>
    </View>
  );
}
