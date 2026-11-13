import { Image } from 'react-native';
import PhotoManipulator from 'react-native-photo-manipulator';

const STICKER_PREVIEW_SIZE = 512;
const STICKER_PREVIEW_CANVAS = require('../../assets/sticker-canvas-512.png');

function getImageSize(uri: string) {
  return new Promise<{ height: number; width: number }>((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => {
        resolve({ width, height });
      },
      reject,
    );
  });
}

function fitWithinStickerPreview(width: number, height: number) {
  const scale = Math.min(
    STICKER_PREVIEW_SIZE / width,
    STICKER_PREVIEW_SIZE / height,
    1,
  );

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

export async function prepareStickerPreviewImage(uri: string) {
  const { width, height } = await getImageSize(uri);
  const targetSize = fitWithinStickerPreview(width, height);
  const resizedUri = await PhotoManipulator.crop(
    uri,
    {
      x: 0,
      y: 0,
      width,
      height,
    },
    targetSize,
    'image/png',
  );

  return PhotoManipulator.overlayImage(
    STICKER_PREVIEW_CANVAS,
    resizedUri,
    {
      x: Math.round((STICKER_PREVIEW_SIZE - targetSize.width) / 2),
      y: Math.round((STICKER_PREVIEW_SIZE - targetSize.height) / 2),
    },
    'image/png',
  );
}
