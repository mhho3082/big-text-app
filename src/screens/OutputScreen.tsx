import React from 'react';
import { BackHandler, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
};

export function OutputScreen({ insets }: Props) {
  const text = useAppStore(state => state.text);
  const foregroundColor = useAppStore(state => state.foregroundColor);
  const backgroundColor = useAppStore(state => state.backgroundColor);
  const outputFontFamily = useAppStore(state => state.outputFontFamily);
  const goHome = useAppStore(state => state.goHome);
  const { width, height } = useWindowDimensions();
  const [layoutTick, setLayoutTick] = React.useState(0);
  const lastTapAt = React.useRef(0);

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

  const outputKey = `${width}x${height}:${layoutTick}`;

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
        <Text
          key={outputKey}
          adjustsFontSizeToFit={true}
          style={[
            styles.outputText,
            {
              color: foregroundColor,
              fontFamily: outputFontFamily,
            },
          ]}
        >
          {text || ' '}
        </Text>
      </View>
    </Pressable>
  );
}
