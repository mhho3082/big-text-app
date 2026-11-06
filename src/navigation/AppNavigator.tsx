import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../state/useAppStore';
import { HomeScreen } from '../screens/HomeScreen';
import { OutputScreen } from '../screens/OutputScreen';
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
  const outputAlignment = useAppStore(state => state.outputAlignment);
  const goHome = useAppStore(state => state.goHome);

  if (screen === 'share') {
    return (
      <View style={styles.container}>
        <HomeScreen insets={safeAreaInsets} />
        <OutputScreen
          insets={safeAreaInsets}
          mode="share"
          headless
          onExit={goHome}
          text={text}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          outputFontFamily={outputFontFamily}
          outputFontSizeMode={outputFontSizeMode}
          outputFontSize={outputFontSize}
          outputDisplayStyle={outputDisplayStyle}
          outputAlignment={outputAlignment}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {screen === 'home' ? (
        <HomeScreen insets={safeAreaInsets} />
      ) : (
        <OutputScreen
          insets={safeAreaInsets}
          mode="display"
          onExit={goHome}
          text={text}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          outputFontFamily={outputFontFamily}
          outputFontSizeMode={outputFontSizeMode}
          outputFontSize={outputFontSize}
          outputDisplayStyle={outputDisplayStyle}
          outputAlignment={outputAlignment}
        />
      )}
    </View>
  );
}
