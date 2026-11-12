import React from 'react';
import { Pressable, StatusBar, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  AArrowUp,
  Moon,
  RotateCcwClock,
  Sparkles,
  Sun,
  TrianglesCenterlineDashedVertical,
  Type,
} from 'lucide-react-native';
import {
  defaultOutputFontFamily,
  getFontDisplayName,
  maokenSansFontFamily,
} from '../fonts';
import { LANGUAGE_BUTTON_LABELS, t } from '../i18n';
import { useAppStore } from '../state/useAppStore';
import type { PersistedAppOptions } from '../state/persistedOptions';
import type { ShareAction } from '../types/output';
import { ColorButton } from '../ui/ColorButton';
import { ColorPickerModal } from '../ui/ColorPickerModal';
import {
  AlignmentPickerModal,
  getAlignmentLabelKey,
} from '../ui/AlignmentPickerModal';
import { AnimationPickerModal } from '../ui/AnimationPickerModal';
import { FontPickerModal } from '../ui/FontPickerModal';
import { FontSizeModal } from '../ui/FontSizeModal';
import { SharePickerModal } from '../ui/SharePickerModal';
import { getHomeTheme } from '../theme';
import { styles } from '../styles';
import { useHomeScreenOrchestration } from '../hooks/useHomeScreenOrchestration';
import type { WidgetOptions } from '../state/persistedOptions';

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
  options: PersistedAppOptions | WidgetOptions;
  title: string;
  homeMode: boolean;
  widgetMode?: boolean;
  confirmLabel?: string;
  onWidgetNameChange?: (name: string) => void;
  onConfirm?: (options: PersistedAppOptions | WidgetOptions) => void;
  onOpenHistory?: () => void;
  onOpenOutput?: () => void;
  onOpenQr?: () => void;
  onOpenShare?: (
    shareImageAspect: 'landscape' | 'portrait' | 'square',
    shareAction?: ShareAction,
  ) => void;
};

export function WidgetSettingsScreen({
  insets,
  options,
  title,
  homeMode,
  widgetMode = false,
  confirmLabel,
  onWidgetNameChange,
  onConfirm,
  onOpenHistory,
  onOpenOutput,
  onOpenQr,
  onOpenShare,
}: Props) {
  const homeThemeName = useAppStore(state => state.homeTheme);
  const language = useAppStore(state => state.language);
  const setStoreText = useAppStore(state => state.setText);
  const setStoreForegroundColor = useAppStore(
    state => state.setForegroundColor,
  );
  const setStoreBackgroundColor = useAppStore(
    state => state.setBackgroundColor,
  );
  const setStoreOutputFontFamily = useAppStore(
    state => state.setOutputFontFamily,
  );
  const setStoreOutputFontSizeMode = useAppStore(
    state => state.setOutputFontSizeMode,
  );
  const setStoreOutputFontSize = useAppStore(state => state.setOutputFontSize);
  const setStoreOutputScreenOrientation = useAppStore(
    state => state.setOutputScreenOrientation,
  );
  const setStoreOutputAnimationStyle = useAppStore(
    state => state.setOutputAnimationStyle,
  );
  const setStoreOutputAnimationInterval = useAppStore(
    state => state.setOutputAnimationInterval,
  );
  const setStoreOutputHorizontalAlignment = useAppStore(
    state => state.setOutputHorizontalAlignment,
  );
  const setStoreOutputVerticalAlignment = useAppStore(
    state => state.setOutputVerticalAlignment,
  );
  const toggleHomeTheme = useAppStore(state => state.toggleHomeTheme);
  const cycleLanguage = useAppStore(state => state.cycleLanguage);
  const theme = getHomeTheme(homeThemeName);
  const translate = (key: string, params?: Record<string, string | number>) =>
    t(key, params, language);

  const [text, setText] = React.useState(options.text);
  const [widgetName, setWidgetName] = React.useState(
    'widgetName' in options ? options.widgetName : '',
  );
  const widgetNameRef = React.useRef(widgetName);
  const [foregroundColor, setForegroundColor] = React.useState(
    options.foregroundColor,
  );
  const [backgroundColor, setBackgroundColor] = React.useState(
    options.backgroundColor,
  );
  const [outputFontFamily, setOutputFontFamily] = React.useState(
    options.outputFontFamily,
  );
  const [outputFontSizeMode, setOutputFontSizeMode] = React.useState(
    options.outputFontSizeMode,
  );
  const [outputFontSize, setOutputFontSize] = React.useState(
    options.outputFontSize,
  );
  const [outputScreenOrientation, setOutputScreenOrientation] = React.useState(
    options.outputScreenOrientation,
  );
  const [outputAnimationStyle, setOutputAnimationStyle] = React.useState(
    options.outputAnimationStyle,
  );
  const [outputAnimationInterval, setOutputAnimationInterval] = React.useState(
    options.outputAnimationInterval,
  );
  const [outputHorizontalAlignment, setOutputHorizontalAlignment] =
    React.useState(options.outputHorizontalAlignment);
  const [outputVerticalAlignment, setOutputVerticalAlignment] = React.useState(
    options.outputVerticalAlignment,
  );

  React.useEffect(() => {
    setText(options.text);
    const nextWidgetName = 'widgetName' in options ? options.widgetName : '';
    widgetNameRef.current = nextWidgetName;
    setWidgetName(nextWidgetName);
    setForegroundColor(options.foregroundColor);
    setBackgroundColor(options.backgroundColor);
    setOutputFontFamily(options.outputFontFamily);
    setOutputFontSizeMode(options.outputFontSizeMode);
    setOutputFontSize(options.outputFontSize);
    setOutputScreenOrientation(options.outputScreenOrientation);
    setOutputAnimationStyle(options.outputAnimationStyle);
    setOutputAnimationInterval(options.outputAnimationInterval);
    setOutputHorizontalAlignment(options.outputHorizontalAlignment);
    setOutputVerticalAlignment(options.outputVerticalAlignment);
  }, [options]);

  const alignmentLabel = translate(
    getAlignmentLabelKey(outputHorizontalAlignment, outputVerticalAlignment),
  );
  const orientationLabel =
    outputScreenOrientation === 'automatic'
      ? ''
      : translate(`home.orientation.${outputScreenOrientation}`);
  const alignmentButtonLabel = orientationLabel
    ? `${alignmentLabel}${translate(
        'home.alignmentOrientationSeparator',
      )}${orientationLabel}`
    : alignmentLabel;
  const isConfirmDisabled =
    !(text ?? '').trim().length ||
    (widgetMode && !(widgetName ?? '').trim().length);

  const openQr = onOpenQr ?? (() => undefined);
  const openShare = onOpenShare ?? (() => undefined);
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
  } = useHomeScreenOrchestration({
    text,
    shareTitle: translate('app.title'),
    onOpenQr: openQr,
    onOpenShare: openShare,
  });

  const handleConfirm = () => {
    onConfirm?.({
      ...options,
      text,
      ...(widgetMode ? { widgetName: widgetNameRef.current } : {}),
      foregroundColor,
      backgroundColor,
      outputFontFamily,
      outputFontSizeMode,
      outputFontSize,
      outputScreenOrientation,
      outputAnimationStyle,
      outputAnimationInterval,
      outputHorizontalAlignment,
      outputVerticalAlignment,
    });
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
          {title}
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
          {homeMode ? (
            <Pressable
              onPress={onOpenHistory}
              aria-label={translate('home.history')}
            >
              <RotateCcwClock color={theme.buttonText} />
            </Pressable>
          ) : null}
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
          {widgetMode ? (
            <>
              <TextInput
                style={[
                  styles.input,
                  styles.widgetNameInput,
                  {
                    borderColor: theme.inputBorder,
                    backgroundColor: theme.inputBackground,
                    color: theme.inputText,
                  },
                ]}
                value={widgetName}
                onChangeText={name => {
                  widgetNameRef.current = name;
                  setWidgetName(name);
                  onWidgetNameChange?.(name);
                }}
                placeholder={translate('widgetConfig.name')}
                placeholderTextColor={theme.placeholderText}
                numberOfLines={1}
                multiline={false}
                textAlignVertical="center"
              />
            </>
          ) : null}
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
            onChangeText={nextText => {
              setText(nextText);
              if (homeMode) {
                setStoreText(nextText);
              }
            }}
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
              onPress={() => setActivePicker('font')}
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
              onPress={() => setActivePicker('fontSize')}
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
              onPress={() => setActivePicker('animation')}
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
                {translate(`home.animationStyle.${outputAnimationStyle}`)}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setActivePicker('alignment')}
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
                {alignmentButtonLabel}
              </Text>
            </Pressable>
          </View>
          {onConfirm ? (
            <Pressable
              disabled={isConfirmDisabled}
              onPress={handleConfirm}
              style={[
                styles.button,
                isConfirmDisabled && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.buttonText}>
                {confirmLabel ?? translate('home.confirm')}
              </Text>
            </Pressable>
          ) : (
            <>
              <Text style={[styles.exitHint, { color: theme.mutedText }]}>
                {translate('home.exitHint')}
              </Text>
              <View style={styles.buttonRow}>
                <Pressable
                  disabled={!(text ?? '').trim().length}
                  onPress={onOpenOutput}
                  style={[
                    styles.button,
                    styles.buttonHalf,
                    !(text ?? '').trim().length && styles.buttonDisabled,
                  ]}
                >
                  <Text style={styles.buttonText}>
                    {translate('home.showText')}
                  </Text>
                </Pressable>
                <Pressable
                  disabled={!(text ?? '').trim().length}
                  onPress={() => setActivePicker('share')}
                  style={[
                    styles.button,
                    styles.buttonHalf,
                    !(text ?? '').trim().length && styles.buttonDisabled,
                  ]}
                >
                  <Text style={styles.buttonText}>
                    {translate('home.share')}
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <ColorPickerModal
        visible={activePicker === 'foreground'}
        title={translate('home.textColor')}
        initialColor={foregroundColor}
        onClose={closePicker}
        onColorChange={nextColor => {
          setForegroundColor(nextColor);
          if (homeMode) {
            setStoreForegroundColor(nextColor);
          }
        }}
        theme={theme}
      />
      <ColorPickerModal
        visible={activePicker === 'background'}
        title={translate('home.backgroundColor')}
        initialColor={backgroundColor}
        onClose={closePicker}
        onColorChange={nextColor => {
          setBackgroundColor(nextColor);
          if (homeMode) {
            setStoreBackgroundColor(nextColor);
          }
        }}
        theme={theme}
      />
      <FontPickerModal
        visible={activePicker === 'font'}
        selectedFontFamily={outputFontFamily || defaultOutputFontFamily}
        onClose={closePicker}
        onFontChange={family => {
          setOutputFontFamily(family);
          if (homeMode) {
            setStoreOutputFontFamily(family);
          }
          closePicker();
        }}
        theme={theme}
      />
      <FontSizeModal
        visible={activePicker === 'fontSize'}
        mode={outputFontSizeMode}
        fontSize={outputFontSize}
        onClose={closePicker}
        onModeChange={mode => {
          setOutputFontSizeMode(mode);
          if (homeMode) {
            setStoreOutputFontSizeMode(mode);
          }
        }}
        onFontSizeChange={size => {
          setOutputFontSize(size);
          if (homeMode) {
            setStoreOutputFontSize(size);
          }
        }}
        theme={theme}
      />
      <AnimationPickerModal
        visible={activePicker === 'animation'}
        selectedStyle={outputAnimationStyle}
        interval={outputAnimationInterval}
        onClose={closePicker}
        onStyleChange={style => {
          setOutputAnimationStyle(style);
          if (homeMode) {
            setStoreOutputAnimationStyle(style);
          }
        }}
        onIntervalChange={interval => {
          setOutputAnimationInterval(interval);
          if (homeMode) {
            setStoreOutputAnimationInterval(interval);
          }
        }}
        theme={theme}
      />
      <AlignmentPickerModal
        visible={activePicker === 'alignment'}
        horizontalAlignment={outputHorizontalAlignment}
        verticalAlignment={outputVerticalAlignment}
        screenOrientation={outputScreenOrientation}
        onClose={closePicker}
        onHorizontalAlignmentChange={alignment => {
          setOutputHorizontalAlignment(alignment);
          if (homeMode) {
            setStoreOutputHorizontalAlignment(alignment);
          }
        }}
        onVerticalAlignmentChange={alignment => {
          setOutputVerticalAlignment(alignment);
          if (homeMode) {
            setStoreOutputVerticalAlignment(alignment);
          }
        }}
        onScreenOrientationChange={orientation => {
          setOutputScreenOrientation(orientation);
          if (homeMode) {
            setStoreOutputScreenOrientation(orientation);
          }
        }}
        theme={theme}
      />
      {homeMode ? (
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
      ) : null}
    </View>
  );
}
