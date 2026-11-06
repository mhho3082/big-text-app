import React from 'react';
import { Animated, BackHandler, Easing, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';
import { setImmersiveMode } from '../native/immersiveMode';

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

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
};

export function OutputScreen({ insets }: Props) {
  const screen = useAppStore(state => state.screen);
  const text = useAppStore(state => state.text);
  const foregroundColor = useAppStore(state => state.foregroundColor);
  const backgroundColor = useAppStore(state => state.backgroundColor);
  const outputFontFamily = useAppStore(state => state.outputFontFamily);
  const outputFontSizeMode = useAppStore(state => state.outputFontSizeMode);
  const outputFontSize = useAppStore(state => state.outputFontSize);
  const outputDisplayStyle = useAppStore(state => state.outputDisplayStyle);
  const outputAlignment = useAppStore(state => state.outputAlignment);
  const goHome = useAppStore(state => state.goHome);
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
  const automaticSearchRef = React.useRef({
    best: MIN_AUTOMATIC_OUTPUT_FONT_SIZE,
    high: MAX_AUTOMATIC_OUTPUT_FONT_SIZE,
    low: MIN_AUTOMATIC_OUTPUT_FONT_SIZE,
  });
  const opacity = React.useRef(new Animated.Value(1)).current;

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
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      goHome();
      return true;
    });

    return () => {
      subscription.remove();
    };
  }, [goHome]);

  React.useEffect(() => {
    if (screen === 'output' && outputFontSizeMode === 'automatic') {
      restartAutomaticSearch();
    }
  }, [outputFontSizeMode, restartAutomaticSearch, screen]);

  React.useEffect(() => {
    setImmersiveMode(true);

    return () => {
      setImmersiveMode(false);
    };
  }, []);

  React.useEffect(() => {
    opacity.stopAnimation();

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

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: OUTPUT_EFFECT_HALF_CYCLE_MS,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: OUTPUT_EFFECT_HALF_CYCLE_MS,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();

    return () => {
      loop.stop();
      opacity.setValue(1);
    };
  }, [opacity, outputDisplayStyle]);

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
    text,
    restartAutomaticSearch,
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
      goHome();
      return;
    }

    lastTapAt.current = now;
  }, [goHome]);

  return (
    <Pressable style={[styles.outputScreen, { backgroundColor }]} onPress={handlePress}>
      <View style={[styles.outputFill, { padding: outputPadding }]} onLayout={handleOutputLayout}>
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
        {outputFontSizeMode === 'automatic' ? (
          <View
            pointerEvents="none"
            style={[
              {
                opacity: 0,
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              },
              { padding: outputPadding },
            ]}
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
  );
}
