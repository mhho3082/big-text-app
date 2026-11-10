import React from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation/AppNavigator';
import { styles } from './styles';
import {
  loadPersistedAppOptions,
  savePersistedAppOptions,
} from './db/appOptions';
import { getPersistedOptions, useAppStore } from './state/useAppStore';

function App() {
  React.useEffect(() => {
    const { ShareText } = NativeModules;

    if (!ShareText) {
      return;
    }

    const emitter = new NativeEventEmitter(ShareText);

    const applySharedText = (text: string | null | undefined) => {
      if (typeof text !== 'string' || text.length === 0) {
        return;
      }

      useAppStore.setState({ text, screen: 'home' });
    };

    ShareText.getInitialText()
      .then(applySharedText)
      .catch(() => undefined);

    const subscription = emitter.addListener('shareTextReceived', text => {
      applySharedText(text as string | null | undefined);
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
        savePersistedAppOptions(nextOptions);
      }
    });

    (async () => {
      const storedOptions = await loadPersistedAppOptions();

      if (!active) {
        return;
      }

      const currentText = useAppStore.getState().text;

      useAppStore.setState({
        ...storedOptions,
        text: currentText || storedOptions.text || '',
      });
      lastSavedJson = JSON.stringify(
        getPersistedOptions(useAppStore.getState()),
      );
      suppressSave = false;
      savePersistedAppOptions(getPersistedOptions(useAppStore.getState()));
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
