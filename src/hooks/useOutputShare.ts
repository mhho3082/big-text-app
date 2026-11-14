import React from 'react';
import type { View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { t, type AppLanguage } from '../i18n';
import { showToast } from '../native/toast';
import { setWallpaper } from '../native/wallpaper';
import { prepareStickerPreviewImage } from '../utils/stickerPreview';

type UseOutputShareParams = {
  automaticSearchComplete: boolean;
  clearShareRequest: () => void;
  language: AppLanguage;
  mode: 'display' | 'share';
  onExit: () => void;
  onShareCapture?: (uri: string) => Promise<void> | void;
  onStickerCapture?: (uri: string) => Promise<void> | void;
  outputFontSizeMode: 'automatic' | 'custom';
  shareAction: 'share' | 'wallpaper' | 'sticker';
  shareCaptureHeight: number;
  shareCaptureWidth: number;
  shareRequestId?: number;
  captureRefView: React.RefObject<React.ComponentRef<typeof View> | null>;
};

function formatShareCaptureFileName(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `big-text-share-${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${milliseconds}`;
}

export function useOutputShare({
  automaticSearchComplete,
  captureRefView,
  clearShareRequest,
  language,
  mode,
  onExit,
  onShareCapture,
  onStickerCapture,
  outputFontSizeMode,
  shareAction,
  shareCaptureHeight,
  shareCaptureWidth,
  shareRequestId,
}: UseOutputShareParams) {
  const handledShareRequestIdRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (mode !== 'share') {
      return;
    }

    if (shareRequestId == null) {
      return;
    }

    if (shareAction === 'sticker' && onStickerCapture == null) {
      return;
    }

    if (handledShareRequestIdRef.current === shareRequestId) {
      return;
    }

    if (outputFontSizeMode === 'automatic' && !automaticSearchComplete) {
      return;
    }

    handledShareRequestIdRef.current = shareRequestId;

    let cancelled = false;

    const waitForReady = () => {
      if (cancelled) {
        return;
      }

      if (outputFontSizeMode === 'automatic' && !automaticSearchComplete) {
        requestAnimationFrame(waitForReady);
        return;
      }

      doShare().catch(() => undefined);
    };

    const doShare = async () => {
      const node = captureRefView.current;

      if (!node) {
        return;
      }

      try {
        const uri = await captureRef(node as never, {
          format: 'png',
          quality: 1,
          width: shareCaptureWidth,
          height: shareCaptureHeight,
          fileName: formatShareCaptureFileName(new Date()),
        });

        if (cancelled) {
          return;
        }

        if (shareAction === 'wallpaper') {
          await setWallpaper(uri);
          showToast(t('home.wallpaperSet', undefined, language));
        } else if (shareAction === 'sticker') {
          const preparedUri = await prepareStickerPreviewImage(uri);
          if (cancelled) {
            return;
          }

          await onStickerCapture?.(preparedUri);
        } else {
          await onShareCapture?.(uri);
        }
      } catch {
        // Ignore wallpaper/share failures and return to the caller.
      } finally {
        if (!cancelled && shareAction !== 'sticker') {
          onExit();
          clearShareRequest();
        }
      }
    };

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(waitForReady);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [
    automaticSearchComplete,
    captureRefView,
    clearShareRequest,
    language,
    mode,
    onExit,
    onShareCapture,
    onStickerCapture,
    outputFontSizeMode,
    shareAction,
    shareCaptureHeight,
    shareCaptureWidth,
    shareRequestId,
  ]);
}
