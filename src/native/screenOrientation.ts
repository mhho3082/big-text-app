import { NativeModules, Platform } from 'react-native';
import type { OutputScreenOrientation } from '../types/output';

type ScreenOrientationModule = {
  setScreenOrientation(orientation: OutputScreenOrientation): void;
};

const nativeModule = NativeModules.ScreenOrientation as
  | ScreenOrientationModule
  | undefined;

export function setScreenOrientation(orientation: OutputScreenOrientation) {
  if (Platform.OS !== 'android' || nativeModule == null) {
    return;
  }

  nativeModule.setScreenOrientation(orientation);
}
