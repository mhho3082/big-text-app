import { NativeModules, Platform } from 'react-native';

type KeepScreenOnModule = {
  setEnabled(enabled: boolean): void;
};

const nativeModule = NativeModules.KeepScreenOn as KeepScreenOnModule | undefined;

export function setKeepScreenOn(enabled: boolean) {
  if (Platform.OS !== 'android' || nativeModule == null) {
    return;
  }

  nativeModule.setEnabled(enabled);
}
