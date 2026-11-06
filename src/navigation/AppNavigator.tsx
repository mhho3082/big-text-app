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

  if (screen === 'share') {
    return (
      <View style={styles.container}>
        <HomeScreen insets={safeAreaInsets} />
        <OutputScreen insets={safeAreaInsets} mode="share" headless />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {screen === 'home' ? (
        <HomeScreen insets={safeAreaInsets} />
      ) : (
        <OutputScreen insets={safeAreaInsets} mode="display" />
      )}
    </View>
  );
}
