import React from 'react';
import { Animated, BackHandler, Easing, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import { styles } from '../styles';
import { setImmersiveMode } from '../native/immersiveMode';
import type {
  OutputAlignment,
  OutputDisplayStyle,
  OutputFontSizeMode,
  PersistedAppOptions,
} from '../state/persistedOptions';

const MIN_AUTOMATIC_OUTPUT_FONT_SIZE = 8;
const MAX_AUTOMATIC_OUTPUT_FONT_SIZE = 1032;
const INITIAL_AUTOMATIC_OUTPUT_FONT_SIZE = Math.floor(
  (MIN_AUTOMATIC_OUTPUT_FONT_SIZE + MAX_AUTOMATIC_OUTPUT_FONT_SIZE) / 2,
);
const OUTPUT_EFFECT_HALF_CYCLE_MS = 1200;

type TextLayoutLine = {
  height: number;
  width: number;
};

function doesAutomaticFontSizeFit(
  lines: readonly TextLayoutLine[],
  availableWidth: number,
  availableHeight: number,
) {
  if (availableWidth <= 0 || availableHeight <= 0) {
    return false;
  }

  if (lines.length === 0) {
    return true;
  }

  let usedHeight = 0;
  let widestLine = 0;

  for (const line of lines) {
    usedHeight += line.height;
    widestLine = Math.max(widestLine, line.width);
  }

  return widestLine <= availableWidth + 0.5 && usedHeight <= availableHeight + 0.5;
}

export type OutputScreenProps = Pick<
  PersistedAppOptions,
  | 'text'
  | 'foregroundColor'
  | 'backgroundColor'
  | 'outputFontFamily'
  | 'outputFontSizeMode'
  | 'outputFontSize'
  | 'outputDisplayStyle'
  | 'outputAlignment'
> & {
  insets: { top: number; right: number; bottom: number; left: number };
  mode: 'display' | 'share';
  headless?: boolean;
  onExit: () => void;
};

export function OutputScreen({
  insets,
  mode,
  headless = false,
  onExit,
  text,
  foregroundColor,
  backgroundColor,
  outputFontFamily,
  outputFontSizeMode,
  outputFontSize,
  outputDisplayStyle,
  outputAlignment,
}: OutputScreenProps) {
  const { width, height } = useWindowDimensions();
  const [outputLayout, setOutputLayout] = React.useState({ width: 0, height: 0 });
  const [layoutTick, setLayoutTick] = React.useState(0);
  const [automaticSearchGeneration, setAutomaticSearchGeneration] = React.useState(0);
  const [automaticOutputFontSize, setAutomaticOutputFontSize] = React.useState(
    MIN_AUTOMATIC_OUTPUT_FONT_SIZE,
  );
  const [automaticProbeFontSize, setAutomaticProbeFontSize] = React.useState(
    INITIAL_AUTOMATIC_OUTPUT_FONT_SIZE,
  );
  const [automaticSearchComplete, setAutomaticSearchComplete] = React.useState(false);
  const lastTapAt = React.useRef(0);
  const captureRefView = React.useRef<React.ElementRef<typeof View> | null>(null);
  const shareRequestedRef = React.useRef(false);
  const automaticSearchRef = React.useRef({
    best: MIN_AUTOMATIC_OUTPUT_FONT_SIZE,
    high: MAX_AUTOMATIC_OUTPUT_FONT_SIZE,
    low: MIN_AUTOMATIC_OUTPUT_FONT_SIZE,
  });
  const opacity = React.useRef(new Animated.Value(0)).current;

  const restartAutomaticSearch = React.useCallback(() => {
    automaticSearchRef.current = {
      best: MIN_AUTOMATIC_OUTPUT_FONT_SIZE,
      high: MAX_AUTOMATIC_OUTPUT_FONT_SIZE,
      low: MIN_AUTOMATIC_OUTPUT_FONT_SIZE,
    };
    setAutomaticSearchGeneration(generation => generation + 1);
    setAutomaticOutputFontSize(MIN_AUTOMATIC_OUTPUT_FONT_SIZE);
    setAutomaticProbeFontSize(INITIAL_AUTOMATIC_OUTPUT_FONT_SIZE);
    setAutomaticSearchComplete(false);
  }, []);

  React.useEffect(() => {
    if (headless) {
      return;
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onExit();
      return true;
    });

    return () => {
      subscription.remove();
    };
  }, [headless, onExit]);

  React.useEffect(() => {
    if (outputFontSizeMode === 'automatic') {
      restartAutomaticSearch();
    }
  }, [outputFontSizeMode, restartAutomaticSearch]);

  React.useEffect(() => {
    if (headless) {
      return;
    }

    setImmersiveMode(true);

    return () => {
      setImmersiveMode(false);
    };
  }, [headless]);

  React.useEffect(() => {
    opacity.stopAnimation();

    if (mode === 'share') {
      opacity.setValue(1);
      return;
    }

    if (outputDisplayStyle === 'static') {
      opacity.setValue(1);
      return;
    }

    if (outputDisplayStyle === 'strobe') {
      let visible = true;
      opacity.setValue(1);

      const interval = setInterval(() => {
        visible = !visible;
        opacity.setValue(visible ? 1 : 0);
      }, OUTPUT_EFFECT_HALF_CYCLE_MS);

      return () => {
        clearInterval(interval);
        opacity.setValue(1);
      };
    }

    opacity.setValue(0);

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: OUTPUT_EFFECT_HALF_CYCLE_MS,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: OUTPUT_EFFECT_HALF_CYCLE_MS,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1, resetBeforeIteration: false },
    );

    loop.start();

    return () => {
      loop.stop();
      opacity.setValue(0);
    };
  }, [mode, opacity, outputDisplayStyle]);

  const outputKey = `${width}x${height}:${layoutTick}:${outputFontSizeMode}:${outputFontSize}:${outputDisplayStyle}:${outputAlignment}:${text.length}`;

  const outputPadding = Math.max(
    32,
    insets.top,
    insets.bottom,
    insets.left,
    insets.right,
  );
  const layoutWidth = outputLayout.width > 0 ? outputLayout.width : width;
  const layoutHeight = outputLayout.height > 0 ? outputLayout.height : height;
  const availableWidth = Math.max(0, layoutWidth - outputPadding * 2);
  const availableHeight = Math.max(0, layoutHeight - outputPadding * 2);

  const handleOutputLayout = React.useCallback(
    (event: { nativeEvent: { layout: { width: number; height: number } } }) => {
      const nextWidth = event.nativeEvent.layout.width;
      const nextHeight = event.nativeEvent.layout.height;

      setOutputLayout(current => {
        if (current.width === nextWidth && current.height === nextHeight) {
          return current;
        }

        return { width: nextWidth, height: nextHeight };
      });
    },
    [],
  );

  React.useEffect(() => {
    if (outputLayout.width === 0 && outputLayout.height === 0) {
      return;
    }

    setLayoutTick(tick => tick + 1);
    if (outputFontSizeMode === 'automatic') {
      restartAutomaticSearch();
    }
  }, [outputFontSizeMode, outputLayout.height, outputLayout.width, restartAutomaticSearch]);

  React.useEffect(() => {
    if (outputFontSizeMode !== 'automatic') {
      return;
    }

    restartAutomaticSearch();
  }, [
    availableHeight,
    availableWidth,
    outputAlignment,
    outputFontFamily,
    outputFontSizeMode,
    restartAutomaticSearch,
    text,
  ]);

  const handleAutomaticTextLayout = React.useCallback(
    (event: { nativeEvent: { lines: readonly TextLayoutLine[] } }) => {
      if (outputFontSizeMode !== 'automatic') {
        return;
      }

      const search = automaticSearchRef.current;
      const currentProbeFontSize = automaticProbeFontSize;
      const fits = doesAutomaticFontSizeFit(event.nativeEvent.lines, availableWidth, availableHeight);

      if (fits) {
        search.best = currentProbeFontSize;
        search.low = currentProbeFontSize + 1;
      } else {
        search.high = currentProbeFontSize - 1;
      }

      if (search.low <= search.high) {
        setAutomaticProbeFontSize(Math.floor((search.low + search.high) / 2));
        return;
      }

      setAutomaticOutputFontSize(search.best);
      setAutomaticSearchComplete(true);
    },
    [availableHeight, availableWidth, automaticProbeFontSize, outputFontSizeMode],
  );

  const handlePress = React.useCallback(() => {
    const now = Date.now();

    if (now - lastTapAt.current < 300) {
      lastTapAt.current = 0;
      onExit();
      return;
    }

    lastTapAt.current = now;
  }, [onExit]);

  React.useEffect(() => {
    if (mode !== 'share' || shareRequestedRef.current) {
      return;
    }

    if (outputFontSizeMode === 'automatic' && !automaticSearchComplete) {
      return;
    }

    let cancelled = false;
    shareRequestedRef.current = true;

    const doShare = async () => {
      const node = captureRefView.current;

      if (!node) {
        return;
      }

      try {
        const uri = await captureRef(node as never, { format: 'png', quality: 1 });

        if (cancelled) {
          return;
        }

        await Share.open({
          title: 'Big Text',
          url: uri,
          type: 'image/png',
          failOnCancel: false,
        });
      } catch {
        // Ignore share failures and return to the caller.
      } finally {
        if (!cancelled) {
          onExit();
        }
      }
    };

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        doShare().catch(() => undefined);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [automaticSearchComplete, mode, onExit, outputFontSizeMode]);

  return (
    <View
      pointerEvents={headless ? 'none' : 'auto'}
      style={[styles.outputScreen, headless && styles.outputHeadlessScreen, { backgroundColor }]}
    >
      {!headless ? (
        <Pressable style={styles.outputScreenPressable} onPress={handlePress}>
          <View style={styles.outputFill} onLayout={handleOutputLayout}>
            <View
              ref={captureRefView}
              collapsable={false}
              style={[styles.outputCaptureLayer, { padding: outputPadding, backgroundColor }]}
            >
              <Animated.Text
                key={outputKey}
                ellipsizeMode="clip"
                style={[
                  styles.outputText,
                  {
                    textAlign: outputAlignment,
                    opacity,
                    color:
                      outputFontSizeMode === 'automatic' && !automaticSearchComplete
                        ? backgroundColor
                        : foregroundColor,
                  },
                  {
                    fontFamily: outputFontFamily,
                    fontSize:
                      outputFontSizeMode === 'automatic'
                        ? automaticOutputFontSize
                        : outputFontSize,
                  },
                ]}
              >
                {text || ' '}
              </Animated.Text>
            </View>
            {outputFontSizeMode === 'automatic' ? (
              <View
                pointerEvents="none"
                style={[styles.outputHiddenMeasurementLayer, { padding: outputPadding }]}
              >
                <Text
                  key={automaticSearchGeneration}
                  ellipsizeMode="clip"
                  onTextLayout={handleAutomaticTextLayout}
                  style={[
                    styles.outputText,
                    {
                      textAlign: outputAlignment,
                    },
                    {
                      color: backgroundColor,
                      fontFamily: outputFontFamily,
                      fontSize: automaticProbeFontSize,
                    },
                  ]}
                >
                  {text || ' '}
                </Text>
              </View>
            ) : null}
          </View>
        </Pressable>
      ) : (
        <View style={styles.outputFill} onLayout={handleOutputLayout}>
          <View
            ref={captureRefView}
            collapsable={false}
            style={[styles.outputCaptureLayer, { padding: outputPadding, backgroundColor }]}
          >
            <Animated.Text
              key={outputKey}
              ellipsizeMode="clip"
              style={[
                styles.outputText,
                {
                  textAlign: outputAlignment,
                  opacity,
                  color:
                    outputFontSizeMode === 'automatic' && !automaticSearchComplete
                      ? backgroundColor
                      : foregroundColor,
                },
                {
                  fontFamily: outputFontFamily,
                  fontSize:
                    outputFontSizeMode === 'automatic'
                      ? automaticOutputFontSize
                      : outputFontSize,
                },
              ]}
            >
              {text || ' '}
            </Animated.Text>
          </View>
          {outputFontSizeMode === 'automatic' ? (
            <View
              pointerEvents="none"
              style={[styles.outputHiddenMeasurementLayer, { padding: outputPadding }]}
            >
              <Text
                key={automaticSearchGeneration}
                ellipsizeMode="clip"
                onTextLayout={handleAutomaticTextLayout}
                style={[
                  styles.outputText,
                  {
                    textAlign: outputAlignment,
                  },
                  {
                    color: backgroundColor,
                    fontFamily: outputFontFamily,
                    fontSize: automaticProbeFontSize,
                  },
                ]}
              >
                {text || ' '}
              </Text>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
}
