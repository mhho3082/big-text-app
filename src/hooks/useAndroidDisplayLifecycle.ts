import React from 'react';
import { BackHandler } from 'react-native';
import { setImmersiveMode } from '../native/immersiveMode';
import { setKeepScreenOn } from '../native/keepScreenOn';
import {
  resetScreenOrientation,
  setScreenOrientation,
} from '../native/screenOrientation';
import type { OutputScreenOrientation } from '../types/output';

type UseAndroidDisplayLifecycleParams = {
  headless: boolean;
  onExit: () => void;
  screenOrientation?: OutputScreenOrientation;
};

export function useAndroidDisplayLifecycle({
  headless,
  onExit,
  screenOrientation,
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
    if (screenOrientation != null) {
      setScreenOrientation(screenOrientation);
    }

    return () => {
      setImmersiveMode(false);
      setKeepScreenOn(false);
      resetScreenOrientation();
    };
  }, [headless, screenOrientation]);
}
