import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text as RNText,
  TextInput,
  useColorScheme,
  Pressable,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { create } from 'zustand';

type Screen = 'home' | 'output';

type AppState = {
  screen: Screen;
  text: string;
  setText: (text: string) => void;
  goToOutput: () => void;
  goHome: () => void;
};

const useAppStore = create<AppState>(set => ({
  screen: 'home',
  text: '',
  setText: text => set({ text }),
  goToOutput: () => set({ screen: 'output' }),
  goHome: () => set({ screen: 'home' }),
}));

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
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

function HomeScreen({
  insets,
}: {
  insets: { top: number; right: number; bottom: number; left: number };
}) {
  const text = useAppStore(state => state.text);
  const setText = useAppStore(state => state.setText);
  const goToOutput = useAppStore(state => state.goToOutput);

  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={styles.content}>
        <RNText style={styles.title}>Big Text</RNText>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type your text"
          placeholderTextColor="#777"
          multiline
          textAlignVertical="top"
        />
        <Pressable onPress={goToOutput} style={styles.button}>
          <RNText style={styles.buttonText}>Show text</RNText>
        </Pressable>
      </View>
    </View>
  );
}

function OutputScreen({
  insets,
}: {
  insets: { top: number; right: number; bottom: number; left: number };
}) {
  const text = useAppStore(state => state.text);
  const goHome = useAppStore(state => state.goHome);
  const lastTapAtRef = React.useRef<number | null>(null);
  const outputPadding = Math.max(
    32,
    insets.top,
    insets.bottom,
    insets.left,
    insets.right,
  );

  const handleTap = React.useCallback(() => {
    const now = Date.now();

    if (lastTapAtRef.current !== null && now - lastTapAtRef.current < 300) {
      lastTapAtRef.current = null;
      goHome();
      return;
    }

    lastTapAtRef.current = now;
  }, [goHome]);

  return (
    <Pressable style={styles.outputScreen} onPress={handleTap}>
      <View style={[styles.outputFill]}>
        <RNText
          adjustsFontSizeToFit={true}
          style={[styles.outputText, { margin: outputPadding }]}
        >
          {text || ' '}
        </RNText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
  },
  input: {
    minHeight: 160,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#1b1b1b',
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#6750a4',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  outputScreen: { flex: 1 },
  outputFill: {
    flex: 1,
    overflow: 'hidden',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outputText: {
    color: '#ffffff',
    fontSize: 999,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default App;
