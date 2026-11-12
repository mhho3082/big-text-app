import React from 'react';
import { BackHandler } from 'react-native';
import { setImmersiveMode } from '../native/immersiveMode';
import { setKeepScreenOn } from '../native/keepScreenOn';
import { setSensorRotationEnabled } from '../native/screenOrientation';

type UseAndroidDisplayLifecycleParams = {
  headless: boolean;
  onExit: () => void;
  sensorRotationEnabled?: boolean;
};

export function useAndroidDisplayLifecycle({
  headless,
  onExit,
  sensorRotationEnabled = false,
}: UseAndroidDisplayLifecycleParams) {
  React.useEffect(() => {
    if (headless) {
      return;
    }

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onExit();
        return true;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [headless, onExit]);

  React.useEffect(() => {
    if (headless) {
      return;
    }

    setImmersiveMode(true);
    setKeepScreenOn(true);
    setSensorRotationEnabled(sensorRotationEnabled);

    return () => {
      setImmersiveMode(false);
      setKeepScreenOn(false);
      setSensorRotationEnabled(false);
    };
  }, [headless, sensorRotationEnabled]);
}
