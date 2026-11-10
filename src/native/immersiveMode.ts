import { NativeModules, Platform } from 'react-native';

type ImmersiveModeModule = {
  setEnabled(enabled: boolean): void;
};

const nativeModule = NativeModules.ImmersiveMode as
  | ImmersiveModeModule
  | undefined;

export function setImmersiveMode(enabled: boolean) {
  if (Platform.OS !== 'android' || nativeModule == null) {
    return;
  }

  nativeModule.setEnabled(enabled);
}
