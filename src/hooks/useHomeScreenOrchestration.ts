import React from 'react';
import Share from 'react-native-share';
import type { ShareAction } from '../types/output';

type ActivePicker =
  | 'foreground'
  | 'background'
  | 'font'
  | 'fontSize'
  | 'animation'
  | 'alignment'
  | 'share'
  | null;

type UseHomeScreenOrchestrationParams = {
  text: string;
  shareTitle: string;
  onOpenQr: () => void;
  onOpenShare: (
    shareImageAspect: 'landscape' | 'portrait' | 'square',
    shareAction?: ShareAction,
  ) => void;
};

export function useHomeScreenOrchestration({
  text,
  shareTitle,
  onOpenQr,
  onOpenShare,
}: UseHomeScreenOrchestrationParams) {
  const [activePicker, setActivePicker] = React.useState<ActivePicker>(null);

  const closePicker = React.useCallback(() => {
    setActivePicker(null);
  }, []);

  const shareAsText = React.useCallback(async () => {
    try {
      await Share.open({
        title: shareTitle,
        message: text,
        failOnCancel: false,
      });
    } catch {
      // Ignore share failures and return to the caller.
    }
  }, [shareTitle, text]);

  const openShareImage = React.useCallback(() => {
    closePicker();
    onOpenShare('landscape');
  }, [closePicker, onOpenShare]);

  const openShareImagePortrait = React.useCallback(() => {
    closePicker();
    onOpenShare('portrait');
  }, [closePicker, onOpenShare]);

  const openShareImageSquare = React.useCallback(() => {
    closePicker();
    onOpenShare('square');
  }, [closePicker, onOpenShare]);

  const setAsWallpaper = React.useCallback(() => {
    closePicker();
    onOpenShare('portrait', 'wallpaper');
  }, [closePicker, onOpenShare]);

  const openShareText = React.useCallback(() => {
    closePicker();
    shareAsText().catch(() => undefined);
  }, [closePicker, shareAsText]);

  const openShareQr = React.useCallback(() => {
    closePicker();
    onOpenQr();
  }, [closePicker, onOpenQr]);

  return {
    activePicker,
    closePicker,
    openShareImage,
    openShareImagePortrait,
    openShareImageSquare,
    openShareQr,
    openShareText,
    setActivePicker,
    setAsWallpaper,
  };
}
