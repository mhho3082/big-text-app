import React from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useAppStore } from '../state/useAppStore';

type LaunchTarget = 'home' | 'widgetOutput';

function applyIncomingLaunchTarget(target: string | null | undefined) {
  if (target !== 'home' && target !== 'widgetOutput') {
    return;
  }

  useAppStore.setState({
    launchTarget: target,
    launchRequestId: Date.now(),
  });
}

export function useIncomingLaunchTarget() {
  React.useEffect(() => {
    const { AppLaunch } = NativeModules;

    if (!AppLaunch) {
      return;
    }

    const emitter = new NativeEventEmitter(AppLaunch);

    AppLaunch.getInitialLaunchTarget()
      .then(applyIncomingLaunchTarget)
      .catch(() => undefined);

    const subscription = emitter.addListener(
      'launchTargetReceived',
      (target: LaunchTarget) => {
        applyIncomingLaunchTarget(target);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);
}
