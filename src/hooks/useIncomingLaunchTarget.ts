import React from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useAppStore } from '../state/useAppStore';

type LaunchTarget = 'home' | 'widgetOutput';

function parseLaunchTarget(
  target: string | null | undefined,
): { launchTarget: LaunchTarget; widgetOutputWidgetId: number | null } | null {
  if (!target) {
    return null;
  }

  if (target.startsWith('widgetOutput:')) {
    const widgetId = Number(target.slice('widgetOutput:'.length));

    if (!Number.isFinite(widgetId)) {
      return null;
    }

    return { launchTarget: 'widgetOutput', widgetOutputWidgetId: widgetId };
  }

  if (target === 'home') {
    return { launchTarget: 'home', widgetOutputWidgetId: null };
  }

  return null;
}

function applyIncomingLaunchTarget(target: string | null | undefined) {
  const parsed = parseLaunchTarget(target);

  if (!parsed) {
    return;
  }

  useAppStore.setState({
    launchTarget: parsed.launchTarget,
    widgetOutputWidgetId: parsed.widgetOutputWidgetId,
    launchRequestId: Date.now(),
  });
}

export function useIncomingLaunchTarget() {
  const [launchTargetReady, setLaunchTargetReady] = React.useState(false);

  React.useEffect(() => {
    const { AppLaunch } = NativeModules;

    if (!AppLaunch) {
      setLaunchTargetReady(true);
      return;
    }

    const emitter = new NativeEventEmitter(AppLaunch);

    AppLaunch.getInitialLaunchTarget()
      .then(target => {
        applyIncomingLaunchTarget(target);
        setLaunchTargetReady(true);
      })
      .catch(() => {
        setLaunchTargetReady(true);
      });

    const subscription = emitter.addListener(
      'launchTargetReceived',
      (...args) => {
        const target = typeof args[0] === 'string' ? args[0] : null;
        applyIncomingLaunchTarget(target);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return launchTargetReady;
}
