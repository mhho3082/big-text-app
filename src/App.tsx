import React from 'react';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation/AppNavigator';
import { styles } from './styles';
import { useIncomingSharedText } from './hooks/useIncomingSharedText';
import { usePersistedAppOptionsSync } from './hooks/usePersistedAppOptionsSync';

enableScreens();

function App() {
  useIncomingSharedText();
  usePersistedAppOptionsSync();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <AppNavigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
