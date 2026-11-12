import React from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useAppStore } from '../state/useAppStore';

function applyIncomingText(text: string | null | undefined) {
  if (typeof text !== 'string' || text.length === 0) {
    return;
  }

  useAppStore.setState({ text });
}

export function useIncomingSharedText() {
  React.useEffect(() => {
    const { ShareText } = NativeModules;

    if (!ShareText) {
      return;
    }

    const emitter = new NativeEventEmitter(ShareText);

    ShareText.getInitialText()
      .then(applyIncomingText)
      .catch(() => undefined);

    const subscription = emitter.addListener('shareTextReceived', text => {
      applyIncomingText(text as string | null | undefined);
    });

    return () => {
      subscription.remove();
    };
  }, []);
}
