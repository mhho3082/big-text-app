import { NativeModules, Platform } from 'react-native';

type ToastModule = {
  show(message: string): void;
};

const nativeModule = NativeModules.Toast as ToastModule | undefined;

export function showToast(message: string) {
  if (Platform.OS !== 'android' || nativeModule == null) {
    return;
  }

  nativeModule.show(message);
}
