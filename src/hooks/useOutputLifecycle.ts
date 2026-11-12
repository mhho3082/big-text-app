import React from 'react';
import { useAndroidDisplayLifecycle } from './useAndroidDisplayLifecycle';
import type { OutputScreenOrientation } from '../types/output';

type UseOutputLifecycleParams = {
  headless: boolean;
  onExit: () => void;
  outputFontSizeMode: 'automatic' | 'custom';
  screenOrientation: OutputScreenOrientation;
  restartAutomaticSearch: () => void;
};

export function useOutputLifecycle({
  headless,
  onExit,
  outputFontSizeMode,
  screenOrientation,
  restartAutomaticSearch,
}: UseOutputLifecycleParams) {
  useAndroidDisplayLifecycle({
    headless,
    onExit,
    screenOrientation,
  });

  React.useEffect(() => {
    if (outputFontSizeMode === 'automatic') {
      restartAutomaticSearch();
    }
  }, [outputFontSizeMode, restartAutomaticSearch]);
}
