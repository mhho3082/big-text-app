import React from 'react';
import { Animated, BackHandler, Easing, Pressable, useWindowDimensions, View } from 'react-native';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';
import { setImmersiveMode } from '../native/immersiveMode';

const AUTOMATIC_OUTPUT_FONT_SIZE = 999;
const OUTPUT_EFFECT_HALF_CYCLE_MS = 1200;

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
};

export function OutputScreen({ insets }: Props) {
  const text = useAppStore(state => state.text);
  const foregroundColor = useAppStore(state => state.foregroundColor);
  const backgroundColor = useAppStore(state => state.backgroundColor);
  const outputFontFamily = useAppStore(state => state.outputFontFamily);
  const outputFontSizeMode = useAppStore(state => state.outputFontSizeMode);
  const outputFontSize = useAppStore(state => state.outputFontSize);
  const outputOneLine = useAppStore(state => state.outputOneLine);
  const outputWordBreak = useAppStore(state => state.outputWordBreak);
  const outputDisplayStyle = useAppStore(state => state.outputDisplayStyle);
  const outputAlignment = useAppStore(state => state.outputAlignment);
  const goHome = useAppStore(state => state.goHome);
  const { width, height } = useWindowDimensions();
  const [layoutTick, setLayoutTick] = React.useState(0);
  const lastTapAt = React.useRef(0);
  const opacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      goHome();
      return true;
    });

    return () => {
      subscription.remove();
    };
  }, [goHome]);

  React.useLayoutEffect(() => {
    setLayoutTick(tick => tick + 1);
  }, [width, height]);

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

  const outputKey = `${width}x${height}:${layoutTick}:${outputFontSizeMode}:${outputFontSize}:${outputOneLine}:${outputWordBreak}:${outputDisplayStyle}:${outputAlignment}:${text.length}`;

  const outputPadding = Math.max(
    32,
    insets.top,
    insets.bottom,
    insets.left,
    insets.right,
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
      <View style={[styles.outputFill, { padding: outputPadding }]}> 
        <Animated.Text
          key={outputKey}
          adjustsFontSizeToFit={outputFontSizeMode === 'automatic'}
          ellipsizeMode="clip"
          lineBreakStrategyIOS={outputWordBreak ? 'standard' : 'none'}
          minimumFontScale={0.05}
          numberOfLines={outputOneLine ? 1 : undefined}
          textBreakStrategy={outputWordBreak ? 'highQuality' : 'simple'}
          style={[
            styles.outputText,
            {
              textAlign: outputAlignment,
              opacity,
            },
            {
              color: foregroundColor,
              fontFamily: outputFontFamily,
              fontSize:
                outputFontSizeMode === 'automatic'
                  ? AUTOMATIC_OUTPUT_FONT_SIZE
                  : outputFontSize,
            },
          ]}
        >
          {text || ' '}
        </Animated.Text>
      </View>
    </Pressable>
  );
}
