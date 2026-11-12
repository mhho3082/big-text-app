import React from 'react';
import { useAndroidDisplayLifecycle } from './useAndroidDisplayLifecycle';

type UseOutputLifecycleParams = {
  headless: boolean;
  onExit: () => void;
  outputFontSizeMode: 'automatic' | 'custom';
  restartAutomaticSearch: () => void;
};

export function useOutputLifecycle({
  headless,
  onExit,
  outputFontSizeMode,
  restartAutomaticSearch,
}: UseOutputLifecycleParams) {
  useAndroidDisplayLifecycle({
    headless,
    onExit,
    sensorRotationEnabled: true,
  });

  React.useEffect(() => {
    if (outputFontSizeMode === 'automatic') {
      restartAutomaticSearch();
    }
  }, [outputFontSizeMode, restartAutomaticSearch]);
}
