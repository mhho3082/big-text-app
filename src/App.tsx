import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation/AppNavigator';
import { styles } from './styles';
import { loadPersistedAppOptions, savePersistedAppOptions } from './db/appOptions';
import { getPersistedOptions, useAppStore } from './state/useAppStore';

function App() {
  React.useEffect(() => {
    let active = true;
    let suppressSave = true;
    let lastSavedJson = '';

    const unsubscribe = useAppStore.subscribe(state => {
      const nextOptions = getPersistedOptions(state);
      const nextJson = JSON.stringify(nextOptions);

      if (nextJson === lastSavedJson) {
        return;
      }

      lastSavedJson = nextJson;

      if (active && !suppressSave) {
        void savePersistedAppOptions(nextOptions);
      }
    });

    void (async () => {
      const storedOptions = await loadPersistedAppOptions();

      if (!active) {
        return;
      }

      useAppStore.setState(storedOptions);
      lastSavedJson = JSON.stringify(getPersistedOptions(useAppStore.getState()));
      suppressSave = false;
      void savePersistedAppOptions(getPersistedOptions(useAppStore.getState()));
    })();

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <AppNavigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
