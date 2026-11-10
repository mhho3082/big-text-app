import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../state/useAppStore';
import { HomeScreen } from '../screens/HomeScreen';
import { OutputScreen } from '../screens/OutputScreen';
import { QrScreen } from '../screens/QrScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { styles } from '../styles';

export function AppNavigator() {
  const safeAreaInsets = useSafeAreaInsets();
  const screen = useAppStore(state => state.screen);
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
  const outputReturnScreen = useAppStore(state => state.outputReturnScreen);
  const outputPreviewOptions = useAppStore(state => state.outputPreviewOptions);
  const shareRequestId = useAppStore(state => state.shareRequestId);
  const shareImageAspect = useAppStore(state => state.shareImageAspect);
  const shareAction = useAppStore(state => state.shareAction);
  const goHome = useAppStore(state => state.goHome);
  const goToHistory = useAppStore(state => state.goToHistory);

  if (screen === 'share') {
    const options = outputPreviewOptions ?? {
      text,
      foregroundColor,
      backgroundColor,
      outputFontFamily,
      outputFontSizeMode,
      outputFontSize,
      outputDisplayStyle,
      outputEffectInterval,
      outputHorizontalAlignment,
      outputVerticalAlignment,
    };

    return (
      <View style={styles.container}>
        <HomeScreen insets={safeAreaInsets} />
        <OutputScreen
          insets={safeAreaInsets}
          mode="share"
          headless
          onExit={goHome}
          text={options.text}
          foregroundColor={options.foregroundColor}
          backgroundColor={options.backgroundColor}
          outputFontFamily={options.outputFontFamily}
          outputFontSizeMode={options.outputFontSizeMode}
          outputFontSize={options.outputFontSize}
          outputDisplayStyle={options.outputDisplayStyle}
          outputEffectInterval={options.outputEffectInterval}
          outputHorizontalAlignment={options.outputHorizontalAlignment}
          outputVerticalAlignment={options.outputVerticalAlignment}
          shareRequestId={shareRequestId}
          shareImageAspect={shareImageAspect}
          shareAction={shareAction}
        />
      </View>
    );
  }

  if (screen === 'qr') {
    return (
      <View style={styles.container}>
        <QrScreen text={outputPreviewOptions?.text ?? text} onExit={goHome} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {screen === 'home' ? (
        <HomeScreen insets={safeAreaInsets} />
      ) : screen === 'history' ? (
        <HistoryScreen insets={safeAreaInsets} />
      ) : (
        <OutputScreen
          insets={safeAreaInsets}
          mode="display"
          onExit={outputReturnScreen === 'history' ? goToHistory : goHome}
          text={outputPreviewOptions?.text ?? text}
          foregroundColor={
            outputPreviewOptions?.foregroundColor ?? foregroundColor
          }
          backgroundColor={
            outputPreviewOptions?.backgroundColor ?? backgroundColor
          }
          outputFontFamily={
            outputPreviewOptions?.outputFontFamily ?? outputFontFamily
          }
          outputFontSizeMode={
            outputPreviewOptions?.outputFontSizeMode ?? outputFontSizeMode
          }
          outputFontSize={
            outputPreviewOptions?.outputFontSize ?? outputFontSize
          }
          outputDisplayStyle={
            outputPreviewOptions?.outputDisplayStyle ?? outputDisplayStyle
          }
          outputEffectInterval={
            outputPreviewOptions?.outputEffectInterval ?? outputEffectInterval
          }
          outputHorizontalAlignment={
            outputPreviewOptions?.outputHorizontalAlignment ??
            outputHorizontalAlignment
          }
          outputVerticalAlignment={
            outputPreviewOptions?.outputVerticalAlignment ??
            outputVerticalAlignment
          }
          shareRequestId={shareRequestId}
          shareImageAspect={shareImageAspect}
          shareAction={shareAction}
        />
      )}
    </View>
  );
}
