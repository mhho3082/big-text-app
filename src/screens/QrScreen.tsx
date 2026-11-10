import React from 'react';
import {
  BackHandler,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { setImmersiveMode } from '../native/immersiveMode';
import { setKeepScreenOn } from '../native/keepScreenOn';
import { styles } from '../styles';
import { SURFACE_BLACK, SURFACE_WHITE } from '../theme';

type Props = {
  text: string;
  onExit: () => void;
};

export function QrScreen({ text, onExit }: Props) {
  const { width, height } = useWindowDimensions();
  const lastTapAt = React.useRef(0);
  const qrSize = Math.max(1, Math.floor(Math.min(width, height) * 0.86));

  React.useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onExit();
        return true;
      },
    );

    setImmersiveMode(true);
    setKeepScreenOn(true);

    return () => {
      subscription.remove();
      setImmersiveMode(false);
      setKeepScreenOn(false);
    };
  }, [onExit]);

  const handlePress = React.useCallback(() => {
    const now = Date.now();

    if (now - lastTapAt.current < 300) {
      lastTapAt.current = 0;
      onExit();
      return;
    }

    lastTapAt.current = now;
  }, [onExit]);

  return (
    <View
      style={[
        styles.qrScreen,
        styles.qrScreenCenter,
        { backgroundColor: SURFACE_BLACK },
      ]}
    >
      <Pressable style={styles.qrScreenFill} onPress={handlePress}>
        <View style={styles.qrScreenCenter}>
          <QRCode
            value={text || ' '}
            size={qrSize}
            color={SURFACE_WHITE}
            backgroundColor={SURFACE_BLACK}
            quietZone={0}
          />
        </View>
      </Pressable>
    </View>
  );
}
