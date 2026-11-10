import { NativeModules, Platform } from 'react-native';

type WallpaperModule = {
  setWallpaper(uri: string): Promise<void>;
};

const nativeModule = NativeModules.Wallpaper as WallpaperModule | undefined;

export function setWallpaper(uri: string) {
  if (Platform.OS !== 'android' || nativeModule == null) {
    return Promise.resolve();
  }

  return nativeModule.setWallpaper(uri);
}
