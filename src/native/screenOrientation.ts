import { NativeModules, Platform } from 'react-native';

type ScreenOrientationModule = {
  setSensorRotationEnabled(enabled: boolean): void;
};

const nativeModule = NativeModules.ScreenOrientation as
  | ScreenOrientationModule
  | undefined;

export function setSensorRotationEnabled(enabled: boolean) {
  if (Platform.OS !== 'android' || nativeModule == null) {
    return;
  }

  nativeModule.setSensorRotationEnabled(enabled);
}
