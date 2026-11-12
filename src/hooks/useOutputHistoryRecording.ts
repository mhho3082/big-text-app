import React from 'react';
import { recordDisplayOptions } from '../db/appOptions';
import { getPersistedOptions, useAppStore } from '../state/useAppStore';

const FONT_SIZE_HISTORY_DEBOUNCE_MS = 300;

type UseOutputHistoryRecordingParams = {
  enabled: boolean;
};

export function useOutputHistoryRecording({
  enabled,
}: UseOutputHistoryRecordingParams) {
  const historyUpdateTimeoutRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const historyUpdatePendingRef = React.useRef(false);

  const flushPendingHistoryUpdate = React.useCallback(() => {
    if (!historyUpdatePendingRef.current) {
      return;
    }

    historyUpdatePendingRef.current = false;

    if (historyUpdateTimeoutRef.current != null) {
      clearTimeout(historyUpdateTimeoutRef.current);
      historyUpdateTimeoutRef.current = null;
    }

    recordDisplayOptions(getPersistedOptions(useAppStore.getState())).catch(
      () => undefined,
    );
  }, []);

  const queueHistoryUpdate = React.useCallback(() => {
    if (!enabled) {
      return;
    }

    historyUpdatePendingRef.current = true;

    if (historyUpdateTimeoutRef.current != null) {
      clearTimeout(historyUpdateTimeoutRef.current);
    }

    historyUpdateTimeoutRef.current = setTimeout(() => {
      historyUpdateTimeoutRef.current = null;
      flushPendingHistoryUpdate();
    }, FONT_SIZE_HISTORY_DEBOUNCE_MS);
  }, [enabled, flushPendingHistoryUpdate]);

  React.useEffect(() => {
    return () => {
      flushPendingHistoryUpdate();
    };
  }, [flushPendingHistoryUpdate]);

  return {
    flushPendingHistoryUpdate,
    queueHistoryUpdate,
  };
}
