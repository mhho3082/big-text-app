import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
};

export function OutputScreen({ insets }: Props) {
  const text = useAppStore(state => state.text);
  const foregroundColor = useAppStore(state => state.foregroundColor);
  const backgroundColor = useAppStore(state => state.backgroundColor);
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
    <Pressable
      style={[styles.outputScreen, { backgroundColor }]}
      onPress={handleTap}
    >
      <View style={styles.outputFill}>
        <Text
          adjustsFontSizeToFit={true}
          style={[
            styles.outputText,
            { color: foregroundColor, margin: outputPadding },
          ]}
        >
          {text || ' '}
        </Text>
      </View>
    </Pressable>
  );
}
