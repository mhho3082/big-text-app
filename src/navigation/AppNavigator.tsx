import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../state/useAppStore';
import type {
  PersistedAppOptions,
  ShareAction,
} from '../state/persistedOptions';
import { HistoryScreen } from '../screens/HistoryScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { OutputScreen } from '../screens/OutputScreen';
import { QrScreen } from '../screens/QrScreen';
import { styles } from '../styles';

type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Output:
    | {
        options?: PersistedAppOptions;
        returnTo?: 'home' | 'history';
      }
    | undefined;
  Qr:
    | {
        text?: string;
        returnTo?: 'home' | 'history';
      }
    | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const insets = useSafeAreaInsets();
  const goToOutput = useAppStore(state => state.goToOutput);

  return (
    <HomeScreen
      insets={insets}
      onOpenHistory={() => navigation.navigate('History')}
      onOpenOutput={() => {
        goToOutput();
        navigation.navigate('Output');
      }}
      onOpenQr={() => navigation.navigate('Qr')}
      onOpenShare={(
        shareImageAspect: 'landscape' | 'portrait' | 'square',
        shareAction?: ShareAction,
      ) => {
        useAppStore.getState().goToShare(shareImageAspect, shareAction);
      }}
    />
  );
}

function HistoryRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'History'>) {
  const insets = useSafeAreaInsets();

  return (
    <HistoryScreen
      insets={insets}
      onClose={() => navigation.goBack()}
      onShowEntry={options =>
        navigation.navigate('Output', { options, returnTo: 'history' })
      }
      onApplyEntry={options => {
        useAppStore.getState().applyHistoryEntry(options);
        navigation.navigate('Home');
      }}
    />
  );
}

function OutputRoute({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Output'>) {
  const insets = useSafeAreaInsets();
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
  const options = route.params?.options ?? {
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
  const returnTo = route.params?.returnTo ?? 'home';

  return (
    <View style={styles.container}>
      <OutputScreen
        insets={insets}
        mode="display"
        onExit={() => {
          if (returnTo === 'history') {
            navigation.goBack();
            return;
          }

          navigation.popToTop();
        }}
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
      />
    </View>
  );
}

function QrRoute({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Qr'>) {
  const storedText = useAppStore(state => state.text);
  const text = route.params?.text ?? storedText;
  const returnTo = route.params?.returnTo ?? 'home';

  return (
    <View style={styles.container}>
      <QrScreen
        text={text}
        onExit={() => {
          if (returnTo === 'history') {
            navigation.goBack();
            return;
          }

          navigation.popToTop();
        }}
      />
    </View>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeRoute} />
        <Stack.Screen name="History" component={HistoryRoute} />
        <Stack.Screen name="Output" component={OutputRoute} />
        <Stack.Screen name="Qr" component={QrRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
