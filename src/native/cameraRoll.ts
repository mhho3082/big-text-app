import { PermissionsAndroid, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

async function hasAndroidWritePermission() {
  if (Platform.OS !== 'android' || Number(Platform.Version) >= 29) {
    return true;
  }

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const alreadyGranted = await PermissionsAndroid.check(permission);

  if (alreadyGranted) {
    return true;
  }

  const result = await PermissionsAndroid.request(permission);

  return result === PermissionsAndroid.RESULTS.GRANTED;
}

export async function saveImageToCameraRoll(uri: string) {
  if (!(await hasAndroidWritePermission())) {
    throw new Error('Camera roll permission denied');
  }

  await CameraRoll.saveAsset(uri, { type: 'photo' });
}
