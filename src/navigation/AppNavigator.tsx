import React from 'react';
import { BackHandler, Text, View } from 'react-native';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { recordDisplayOptions } from '../db/appOptions';
import { getPersistedOptions, useAppStore } from '../state/useAppStore';
import type { PersistedAppOptions } from '../state/persistedOptions';
import type { ShareAction, ShareImageAspect } from '../types/output';
import { showToast } from '../native/toast';
import { t } from '../i18n';
import { HistoryScreen } from '../screens/HistoryScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { OutputScreen } from '../screens/OutputScreen';
import { QrScreen } from '../screens/QrScreen';
import { StickerPreviewModal } from '../ui/StickerPreviewModal';
import { styles } from '../styles';
import { loadWidgetOptions, saveWidgetOptions } from '../state/widgetOptions';
import { getHomeTheme } from '../theme';

type RootStackParamList = {
  Home: undefined;
  History: undefined;
  WidgetOutput: { widgetId: number } | undefined;
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
const navigationRef = createNavigationContainerRef<RootStackParamList>();
const appFlowRouteNames: Array<keyof RootStackParamList> = [
  'Home',
  'History',
  'Output',
  'Qr',
];
const widgetFlowRouteNames: Array<keyof RootStackParamList> = ['WidgetOutput'];
const stickerCaptureAspects: ShareImageAspect[] = [
  'landscape',
  'portrait',
  'square',
];

function HomeRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const insets = useSafeAreaInsets();
  const goToOutput = useAppStore(state => state.goToOutput);
  const shareRequestId = useAppStore(state => state.shareRequestId);
  const shareImageAspect = useAppStore(state => state.shareImageAspect);
  const shareAction = useAppStore(state => state.shareAction);
  const text = useAppStore(state => state.text);
  const foregroundColor = useAppStore(state => state.foregroundColor);
  const backgroundColor = useAppStore(state => state.backgroundColor);
  const outputFontFamily = useAppStore(state => state.outputFontFamily);
  const outputFontSizeMode = useAppStore(state => state.outputFontSizeMode);
  const outputFontSize = useAppStore(state => state.outputFontSize);
  const outputScreenOrientation = useAppStore(
    state => state.outputScreenOrientation,
  );
  const outputAnimationStyle = useAppStore(state => state.outputAnimationStyle);
  const outputAnimationInterval = useAppStore(
    state => state.outputAnimationInterval,
  );
  const outputHorizontalAlignment = useAppStore(
    state => state.outputHorizontalAlignment,
  );
  const outputVerticalAlignment = useAppStore(
    state => state.outputVerticalAlignment,
  );
  const homeThemeName = useAppStore(state => state.homeTheme);
  const [stickerPreviewUris, setStickerPreviewUris] = React.useState<
    string[] | null
  >(null);
  const stickerCaptureCountRef = React.useRef(0);
  const stickerPreviewOpenRef = React.useRef(false);
  const homeTheme = getHomeTheme(homeThemeName);

  const openStickerPreview = React.useCallback(() => {
    stickerPreviewOpenRef.current = true;
    stickerCaptureCountRef.current = 0;
    setStickerPreviewUris([]);
    useAppStore.getState().goToShare(stickerCaptureAspects[0], 'sticker');
  }, []);

  const handleStickerCapture = React.useCallback(async (uri: string) => {
    if (!stickerPreviewOpenRef.current) {
      return;
    }

    setStickerPreviewUris(previousUris => [...(previousUris ?? []), uri]);

    stickerCaptureCountRef.current += 1;
    const nextCount = stickerCaptureCountRef.current;
    const nextAspect = stickerCaptureAspects[nextCount];

    if (nextAspect) {
      useAppStore.getState().goToShare(nextAspect, 'sticker');
    } else {
      stickerPreviewOpenRef.current = false;
      useAppStore.getState().goToOutput();
    }
  }, []);

  const closeStickerPreview = React.useCallback(() => {
    stickerPreviewOpenRef.current = false;
    setStickerPreviewUris(null);
  }, []);

  return (
    <>
      <HomeScreen
        insets={insets}
        onOpenHistory={() => navigation.navigate('History')}
        onOpenOutput={() => {
          recordDisplayOptions(
            getPersistedOptions(useAppStore.getState()),
          ).catch(() => undefined);
          goToOutput();
          navigation.navigate('Output');
        }}
        onOpenQr={() => navigation.navigate('Qr')}
        onOpenStickerPreview={openStickerPreview}
        onOpenShare={(
          nextShareImageAspect: 'landscape' | 'portrait' | 'square',
          nextShareAction?: ShareAction,
        ) => {
          useAppStore
            .getState()
            .goToShare(nextShareImageAspect, nextShareAction);
        }}
      />
      {shareRequestId != null ? (
        <OutputScreen
          key={shareRequestId}
          insets={insets}
          mode="share"
          headless
          onExit={() => undefined}
          recordHistory={false}
          shareRequestId={shareRequestId}
          shareImageAspect={shareImageAspect}
          shareAction={shareAction}
          onStickerCapture={handleStickerCapture}
          text={text}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          outputFontFamily={outputFontFamily}
          outputFontSizeMode={outputFontSizeMode}
          outputFontSize={outputFontSize}
          outputScreenOrientation={outputScreenOrientation}
          outputAnimationStyle={outputAnimationStyle}
          outputAnimationInterval={outputAnimationInterval}
          outputHorizontalAlignment={outputHorizontalAlignment}
          outputVerticalAlignment={outputVerticalAlignment}
        />
      ) : null}
      <StickerPreviewModal
        visible={stickerPreviewUris != null}
        imageUris={stickerPreviewUris ?? []}
        onClose={closeStickerPreview}
        theme={homeTheme}
      />
    </>
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
  const outputScreenOrientation = useAppStore(
    state => state.outputScreenOrientation,
  );
  const outputAnimationStyle = useAppStore(state => state.outputAnimationStyle);
  const outputAnimationInterval = useAppStore(
    state => state.outputAnimationInterval,
  );
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
    outputScreenOrientation,
    outputAnimationStyle,
    outputAnimationInterval,
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
        outputScreenOrientation={options.outputScreenOrientation}
        outputAnimationStyle={options.outputAnimationStyle}
        outputAnimationInterval={options.outputAnimationInterval}
        outputHorizontalAlignment={options.outputHorizontalAlignment}
        outputVerticalAlignment={options.outputVerticalAlignment}
      />
    </View>
  );
}

function WidgetOutputRoute({
  route,
}: NativeStackScreenProps<RootStackParamList, 'WidgetOutput'>) {
  const insets = useSafeAreaInsets();
  const language = useAppStore(state => state.language);
  const clearLaunchRequest = useAppStore(state => state.clearLaunchRequest);
  const widgetOutputWidgetId = useAppStore(state => state.widgetOutputWidgetId);
  const goToOutput = useAppStore(state => state.goToOutput);
  const goHome = useAppStore(state => state.goHome);
  const [options, setOptions] = React.useState<
    PersistedAppOptions | null | undefined
  >(undefined);
  const [outputFontSize, setOutputFontSize] = React.useState<number | null>(
    null,
  );
  const widgetId = route.params?.widgetId ?? widgetOutputWidgetId;

  const handleOutputFontSizeChange = React.useCallback(
    (size: number) => {
      setOutputFontSize(size);

      if (widgetId == null) {
        return;
      }

      setOptions(current => {
        if (!current) {
          return current;
        }

        const nextOptions = { ...current, outputFontSize: size };

        saveWidgetOptions(widgetId, nextOptions).catch(() => undefined);

        return nextOptions;
      });
    },
    [widgetId],
  );

  React.useEffect(() => {
    let active = true;

    if (widgetId == null) {
      setOptions(null);
      return;
    }

    loadWidgetOptions(widgetId)
      .then(nextOptions => {
        if (!active) {
          return;
        }

        setOptions(nextOptions);
        setOutputFontSize(nextOptions?.outputFontSize ?? null);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [widgetId]);

  React.useEffect(() => {
    if (widgetId == null || options !== null) {
      return;
    }

    showToast(
      widgetId == null
        ? t('widgetOutput.missingWidgetId', undefined, language)
        : t('widgetOutput.noSavedOptions', { widgetId }, language),
    );
    clearLaunchRequest();
    goHome();
    goToOutput();
  }, [clearLaunchRequest, goHome, goToOutput, language, options, widgetId]);

  return (
    <View style={styles.container}>
      {options ? (
        <OutputScreen
          insets={insets}
          mode="display"
          recordHistory={false}
          onExit={() => {
            clearLaunchRequest();
            BackHandler.exitApp();
          }}
          onOutputFontSizeChange={handleOutputFontSizeChange}
          text={options.text}
          foregroundColor={options.foregroundColor}
          backgroundColor={options.backgroundColor}
          outputFontFamily={options.outputFontFamily}
          outputFontSizeMode={options.outputFontSizeMode}
          outputFontSize={outputFontSize ?? options.outputFontSize}
          outputScreenOrientation={options.outputScreenOrientation}
          outputAnimationStyle={options.outputAnimationStyle}
          outputAnimationInterval={options.outputAnimationInterval}
          outputHorizontalAlignment={options.outputHorizontalAlignment}
          outputVerticalAlignment={options.outputVerticalAlignment}
        />
      ) : options === null ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <Text style={{ color: '#ffffff', textAlign: 'center' }}>
            {widgetId == null
              ? t('widgetOutput.missingWidgetId', undefined, language)
              : t('widgetOutput.noSavedOptions', { widgetId }, language)}
          </Text>
        </View>
      ) : null}
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
  const initialLaunchTarget = useAppStore(state => state.launchTarget);
  const initialWidgetOutputWidgetId = useAppStore(
    state => state.widgetOutputWidgetId,
  );
  const launchRequestId = useAppStore(state => state.launchRequestId);
  const launchTarget = useAppStore(state => state.launchTarget);
  const clearLaunchRequest = useAppStore(state => state.clearLaunchRequest);
  const [navigationReady, setNavigationReady] = React.useState(false);
  const lastHandledLaunchRequestIdRef = React.useRef<number | null>(null);
  const initialLaunchRequestIdRef = React.useRef<number | null>(
    launchRequestId,
  );

  const initialState = React.useMemo(() => {
    if (
      initialLaunchTarget === 'widgetOutput' &&
      initialWidgetOutputWidgetId != null
    ) {
      return {
        index: 0,
        routes: [
          {
            name: 'WidgetOutput',
            params: { widgetId: initialWidgetOutputWidgetId },
          },
        ],
      };
    }

    return {
      index: 0,
      routes: [{ name: 'Home' }],
    };
  }, [initialLaunchTarget, initialWidgetOutputWidgetId]);

  React.useEffect(() => {
    if (launchRequestId == null) {
      return;
    }

    if (!navigationReady) {
      return;
    }

    if (lastHandledLaunchRequestIdRef.current === launchRequestId) {
      return;
    }

    if (launchRequestId === initialLaunchRequestIdRef.current) {
      return;
    }

    lastHandledLaunchRequestIdRef.current = launchRequestId;

    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (
      (launchTarget === 'widgetOutput' &&
        currentRouteName != null &&
        widgetFlowRouteNames.includes(currentRouteName)) ||
      (launchTarget === 'home' &&
        currentRouteName != null &&
        appFlowRouteNames.includes(currentRouteName))
    ) {
      clearLaunchRequest();
      return;
    }

    if (launchTarget === 'widgetOutput') {
      const widgetId = useAppStore.getState().widgetOutputWidgetId;

      if (widgetId == null) {
        return;
      }

      navigationRef.resetRoot({
        index: 0,
        routes: [
          {
            name: 'WidgetOutput',
            params: { widgetId },
          },
        ],
      });
    } else if (launchTarget === 'home') {
      navigationRef.resetRoot({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }

    clearLaunchRequest();
  }, [clearLaunchRequest, launchRequestId, launchTarget, navigationReady]);

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      onReady={() => setNavigationReady(true)}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeRoute} />
        <Stack.Screen name="History" component={HistoryRoute} />
        <Stack.Screen name="WidgetOutput" component={WidgetOutputRoute} />
        <Stack.Screen name="Output" component={OutputRoute} />
        <Stack.Screen name="Qr" component={QrRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
