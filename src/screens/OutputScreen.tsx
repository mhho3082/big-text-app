import React from 'react';
import {
  Animated,
  Easing,
  PixelRatio,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import { styles } from '../styles';
import { useAppStore } from '../state/useAppStore';
import type { PersistedAppOptions } from '../state/persistedOptions';
import type { ShareImageAspect, ShareAction } from '../types/output';
import { DEFAULT_OUTPUT_ANIMATION_INTERVAL } from '../state/persistedOptions';
import { useAutomaticFontSizeSearch } from '../hooks/useAutomaticFontSizeSearch';
import { useOutputHistoryRecording } from '../hooks/useOutputHistoryRecording';
import { useOutputLifecycle } from '../hooks/useOutputLifecycle';
import { useOutputShare } from '../hooks/useOutputShare';

const OUTPUT_WORD_BREAK = false;

const MIN_CUSTOM_OUTPUT_FONT_SIZE = 8;
const MAX_CUSTOM_OUTPUT_FONT_SIZE = 1024;
const FONT_SIZE_PAN_STEP_PX = 18;
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

  return (
    widestLine <= availableWidth + 0.5 && usedHeight <= availableHeight + 0.5
  );
}

export type OutputScreenProps = Pick<
  PersistedAppOptions,
  | 'text'
  | 'foregroundColor'
  | 'backgroundColor'
  | 'outputFontFamily'
  | 'outputFontSizeMode'
  | 'outputFontSize'
  | 'outputScreenOrientation'
  | 'outputAnimationStyle'
  | 'outputAnimationInterval'
  | 'outputHorizontalAlignment'
  | 'outputVerticalAlignment'
> & {
  insets: { top: number; right: number; bottom: number; left: number };
  mode: 'display' | 'share';
  headless?: boolean;
  onExit: () => void;
  recordHistory?: boolean;
  shareRequestId?: number;
  shareImageAspect?: ShareImageAspect;
  shareAction?: ShareAction;
  onStickerCapture?: (uri: string) => void;
  onOutputFontSizeChange?: (size: number) => void;
};

export function OutputScreen({
  insets,
  mode,
  headless = false,
  onExit,
  recordHistory = true,
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
  shareRequestId,
  shareImageAspect = 'landscape',
  shareAction = 'share',
  onStickerCapture,
  onOutputFontSizeChange,
}: OutputScreenProps) {
  const language = useAppStore(state => state.language);
  const { width, height } = useWindowDimensions();
  const [outputLayout, setOutputLayout] = React.useState({
    width: 0,
    height: 0,
  });
  const lastTapAt = React.useRef(0);
  const captureRefView = React.useRef<React.ComponentRef<typeof View> | null>(
    null,
  );
  const panStartFontSizeRef = React.useRef(outputFontSize);
  const panLastAppliedFontSizeRef = React.useRef(outputFontSize);
  const setOutputFontSize = useAppStore(state => state.setOutputFontSize);
  const clearShareRequest = useAppStore(state => state.clearShareRequest);
  const {
    automaticSearchGeneration,
    automaticOutputFontSize,
    automaticProbeFontSize,
    automaticSearchComplete,
    restartAutomaticSearch,
    submitAutomaticProbeResult,
  } = useAutomaticFontSizeSearch();
  const canAdjustFontSize =
    mode === 'display' && outputFontSizeMode === 'custom';

  const isCrossDisplayStyle =
    outputAnimationStyle === 'crossBlink' ||
    outputAnimationStyle === 'crossPulse';
  const isBlinkStyle =
    outputAnimationStyle === 'blink' || outputAnimationStyle === 'crossBlink';
  const isPulseStyle =
    outputAnimationStyle === 'pulse' || outputAnimationStyle === 'crossPulse';
  const outputVerticalJustifyContent =
    outputVerticalAlignment === 'top'
      ? 'flex-start'
      : outputVerticalAlignment === 'bottom'
      ? 'flex-end'
      : 'center';
  const animationHalfCycleMs =
    (outputAnimationInterval || DEFAULT_OUTPUT_ANIMATION_INTERVAL) * 1000;
  const visibleMixValue = isCrossDisplayStyle ? 0 : 1;
  const hiddenMixValue = isCrossDisplayStyle ? 1 : 0;
  const displayMix = React.useRef(new Animated.Value(visibleMixValue)).current;
  const shouldDelayPulseStart = outputFontSizeMode === 'automatic';

  const animatedTextColor = displayMix.interpolate({
    inputRange: [0, 1],
    outputRange: isCrossDisplayStyle
      ? [foregroundColor, backgroundColor]
      : [backgroundColor, foregroundColor],
  });
  const animatedBackgroundColor = isCrossDisplayStyle
    ? displayMix.interpolate({
        inputRange: [0, 1],
        outputRange: [backgroundColor, foregroundColor],
      })
    : backgroundColor;

  const shareCanvasWidth = React.useMemo(() => {
    const longSide = Math.max(width, height);
    const shortSide = Math.min(width, height);

    if (shareImageAspect === 'portrait') {
      return shortSide;
    }

    if (shareImageAspect === 'square') {
      return longSide;
    }

    return longSide;
  }, [height, shareImageAspect, width]);

  const shareCanvasHeight = React.useMemo(() => {
    const longSide = Math.max(width, height);
    const shortSide = Math.min(width, height);

    if (shareImageAspect === 'portrait') {
      return longSide;
    }

    if (shareImageAspect === 'square') {
      return longSide;
    }

    return shortSide;
  }, [height, shareImageAspect, width]);

  const shareCaptureWidth = React.useMemo(
    () => Math.round(shareCanvasWidth * PixelRatio.get()),
    [shareCanvasWidth],
  );

  const shareCaptureHeight = React.useMemo(
    () => Math.round(shareCanvasHeight * PixelRatio.get()),
    [shareCanvasHeight],
  );

  useOutputLifecycle({
    headless,
    onExit,
    outputFontSizeMode,
    screenOrientation:
      mode === 'display' ? outputScreenOrientation : 'automatic',
    restartAutomaticSearch,
  });

  React.useEffect(() => {
    displayMix.stopAnimation();

    if (mode === 'share') {
      displayMix.setValue(visibleMixValue);
      return;
    }

    if (outputAnimationStyle === 'static') {
      displayMix.setValue(visibleMixValue);
      return;
    }

    if (isBlinkStyle) {
      let visible = true;
      displayMix.setValue(visibleMixValue);

      const interval = setInterval(() => {
        visible = !visible;
        displayMix.setValue(visible ? visibleMixValue : hiddenMixValue);
      }, animationHalfCycleMs);

      return () => {
        clearInterval(interval);
        displayMix.setValue(visibleMixValue);
      };
    }

    if (isPulseStyle) {
      let cancelled = false;
      let initialFrame = 0;
      let secondFrame = 0;

      const runPulseCycle = (toValue: number) => {
        Animated.timing(displayMix, {
          toValue,
          duration: animationHalfCycleMs,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }).start(() => {
          if (cancelled) {
            return;
          }

          runPulseCycle(
            toValue === visibleMixValue ? hiddenMixValue : visibleMixValue,
          );
        });
      };

      displayMix.setValue(visibleMixValue);

      if (shouldDelayPulseStart) {
        initialFrame = requestAnimationFrame(() => {
          secondFrame = requestAnimationFrame(() => {
            if (!cancelled) {
              runPulseCycle(hiddenMixValue);
            }
          });
        });
      } else {
        runPulseCycle(hiddenMixValue);
      }

      return () => {
        cancelled = true;
        cancelAnimationFrame(initialFrame);
        cancelAnimationFrame(secondFrame);
        displayMix.stopAnimation();
        displayMix.setValue(visibleMixValue);
      };
    }

    return undefined;
  }, [
    displayMix,
    animationHalfCycleMs,
    hiddenMixValue,
    isPulseStyle,
    isBlinkStyle,
    mode,
    outputAnimationStyle,
    shouldDelayPulseStart,
    visibleMixValue,
  ]);

  const outputTextColor =
    outputFontSizeMode === 'automatic' && !automaticSearchComplete
      ? backgroundColor
      : outputAnimationStyle === 'static'
      ? foregroundColor
      : animatedTextColor;
  const outputLayerBackgroundColor =
    outputFontSizeMode === 'automatic' && !automaticSearchComplete
      ? backgroundColor
      : isCrossDisplayStyle
      ? animatedBackgroundColor
      : backgroundColor;

  const { flushPendingHistoryUpdate, queueHistoryUpdate } =
    useOutputHistoryRecording({ enabled: canAdjustFontSize && recordHistory });

  const applyCustomFontSize = React.useCallback(
    (nextFontSize: number) => {
      if (!canAdjustFontSize) {
        return;
      }

      const clampedFontSize = Math.min(
        MAX_CUSTOM_OUTPUT_FONT_SIZE,
        Math.max(MIN_CUSTOM_OUTPUT_FONT_SIZE, nextFontSize),
      );

      if (clampedFontSize === outputFontSize) {
        return;
      }

      if (onOutputFontSizeChange) {
        onOutputFontSizeChange(clampedFontSize);
      } else {
        setOutputFontSize(clampedFontSize);
      }

      queueHistoryUpdate();
    },
    [
      canAdjustFontSize,
      onOutputFontSizeChange,
      outputFontSize,
      queueHistoryUpdate,
      setOutputFontSize,
    ],
  );

  const fontSizePanGesture = usePanGesture({
    runOnJS: true,
    enabled: canAdjustFontSize,
    activeOffsetX: [-12, 12],
    activeOffsetY: [-12, 12],
    onBegin: () => {
      if (!canAdjustFontSize) {
        return;
      }

      panStartFontSizeRef.current = outputFontSize;
      panLastAppliedFontSizeRef.current = outputFontSize;
    },
    onUpdate: event => {
      if (!canAdjustFontSize) {
        return;
      }

      const totalSteps = Math.trunc(
        -event.translationY / FONT_SIZE_PAN_STEP_PX,
      );
      const nextFontSize = panStartFontSizeRef.current + totalSteps * 2;

      if (nextFontSize === panLastAppliedFontSizeRef.current) {
        return;
      }

      panLastAppliedFontSizeRef.current = nextFontSize;
      applyCustomFontSize(nextFontSize);
    },
    onFinalize: () => {
      if (!canAdjustFontSize) {
        return;
      }

      flushPendingHistoryUpdate();
    },
  });

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
  const outputKey = `${width}x${height}:${outputFontSizeMode}:${outputFontSize}:${outputScreenOrientation}:${outputAnimationStyle}:${outputHorizontalAlignment}:${outputVerticalAlignment}:${text.length}`;

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

    if (outputFontSizeMode === 'automatic') {
      restartAutomaticSearch();
    }
  }, [
    outputFontSizeMode,
    outputLayout.height,
    outputLayout.width,
    restartAutomaticSearch,
  ]);

  React.useEffect(() => {
    if (outputFontSizeMode !== 'automatic') {
      return;
    }

    restartAutomaticSearch();
  }, [
    availableHeight,
    availableWidth,
    outputHorizontalAlignment,
    outputFontFamily,
    outputFontSizeMode,
    outputVerticalAlignment,
    restartAutomaticSearch,
    text,
  ]);

  const handleAutomaticTextLayout = React.useCallback(
    (event: { nativeEvent: { lines: readonly TextLayoutLine[] } }) => {
      if (outputFontSizeMode !== 'automatic') {
        return;
      }

      const currentProbeFontSize = automaticProbeFontSize;
      const fits = doesAutomaticFontSizeFit(
        event.nativeEvent.lines,
        availableWidth,
        availableHeight,
      );

      submitAutomaticProbeResult(currentProbeFontSize, fits);
    },
    [
      availableHeight,
      availableWidth,
      automaticProbeFontSize,
      outputFontSizeMode,
      submitAutomaticProbeResult,
    ],
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

  useOutputShare({
    automaticSearchComplete,
    captureRefView,
    clearShareRequest,
    language,
    mode,
    onExit,
    onStickerCapture,
    outputFontSizeMode,
    shareAction,
    shareCaptureHeight,
    shareCaptureWidth,
    shareRequestId,
  });

  return (
    <View
      pointerEvents={headless ? 'none' : 'auto'}
      style={[
        styles.outputScreen,
        headless && styles.outputHeadlessScreen,
        { backgroundColor },
      ]}
    >
      {!headless ? (
        <GestureDetector gesture={fontSizePanGesture}>
          <View
            style={[
              styles.outputScreenPressable,
              mode === 'share' && styles.outputShareCanvas,
              mode === 'share' && {
                width: shareCanvasWidth,
                height: shareCanvasHeight,
              },
            ]}
          >
            <Pressable
              style={styles.outputFill}
              onPress={handlePress}
              onLayout={handleOutputLayout}
            >
              <Animated.View
                ref={captureRefView}
                collapsable={false}
                style={[
                  styles.outputCaptureLayer,
                  {
                    padding: outputPadding,
                    backgroundColor: outputLayerBackgroundColor,
                    justifyContent: outputVerticalJustifyContent,
                  },
                ]}
              >
                <Animated.Text
                  key={outputKey}
                  ellipsizeMode="clip"
                  lineBreakStrategyIOS={OUTPUT_WORD_BREAK ? 'standard' : 'none'}
                  textBreakStrategy={
                    OUTPUT_WORD_BREAK ? 'highQuality' : 'simple'
                  }
                  style={[
                    styles.outputText,
                    {
                      textAlign: outputHorizontalAlignment,
                      color: outputTextColor,
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
              </Animated.View>
              {outputFontSizeMode === 'automatic' ? (
                <View
                  pointerEvents="none"
                  style={[
                    styles.outputHiddenMeasurementLayer,
                    { padding: outputPadding },
                  ]}
                >
                  <Text
                    key={automaticSearchGeneration}
                    ellipsizeMode="clip"
                    onTextLayout={handleAutomaticTextLayout}
                    lineBreakStrategyIOS={
                      OUTPUT_WORD_BREAK ? 'standard' : 'none'
                    }
                    textBreakStrategy={
                      OUTPUT_WORD_BREAK ? 'highQuality' : 'simple'
                    }
                    style={[
                      styles.outputText,
                      {
                        textAlign: outputHorizontalAlignment,
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
            </Pressable>
          </View>
        </GestureDetector>
      ) : (
        <View
          style={[
            styles.outputFill,
            mode === 'share' && styles.outputShareCanvas,
            mode === 'share' && {
              width: shareCanvasWidth,
              height: shareCanvasHeight,
            },
          ]}
          onLayout={handleOutputLayout}
        >
          <Animated.View
            ref={captureRefView}
            collapsable={false}
            style={[
              styles.outputCaptureLayer,
              {
                padding: outputPadding,
                backgroundColor: outputLayerBackgroundColor,
                justifyContent: outputVerticalJustifyContent,
              },
            ]}
          >
            <Animated.Text
              key={outputKey}
              ellipsizeMode="clip"
              lineBreakStrategyIOS={OUTPUT_WORD_BREAK ? 'standard' : 'none'}
              textBreakStrategy={OUTPUT_WORD_BREAK ? 'highQuality' : 'simple'}
              style={[
                styles.outputText,
                {
                  textAlign: outputHorizontalAlignment,
                  color: outputTextColor,
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
          </Animated.View>
          {outputFontSizeMode === 'automatic' ? (
            <View
              pointerEvents="none"
              style={[
                styles.outputHiddenMeasurementLayer,
                { padding: outputPadding },
              ]}
            >
              <Text
                key={automaticSearchGeneration}
                ellipsizeMode="clip"
                onTextLayout={handleAutomaticTextLayout}
                lineBreakStrategyIOS={OUTPUT_WORD_BREAK ? 'standard' : 'none'}
                textBreakStrategy={OUTPUT_WORD_BREAK ? 'highQuality' : 'simple'}
                style={[
                  styles.outputText,
                  {
                    textAlign: outputHorizontalAlignment,
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
