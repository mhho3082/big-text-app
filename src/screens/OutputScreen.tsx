import React from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
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

  return (
    <Pressable style={[styles.outputScreen, { backgroundColor }]} onPress={goHome}>
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
