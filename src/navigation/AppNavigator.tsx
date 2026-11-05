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

  return (
    <View style={styles.container}>
      {screen === 'home' ? (
        <HomeScreen insets={safeAreaInsets} />
      ) : (
        <OutputScreen insets={safeAreaInsets} />
      )}
    </View>
  );
}
