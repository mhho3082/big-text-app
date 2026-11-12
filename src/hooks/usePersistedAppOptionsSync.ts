import React from 'react';
import { setLanguage as setI18nLanguage } from '../i18n';
import {
  loadPersistedAppOptions,
  savePersistedAppOptions,
} from '../db/appOptions';
import { getPersistedOptions, useAppStore } from '../state/useAppStore';

export function usePersistedAppOptionsSync() {
  const language = useAppStore(state => state.language);

  React.useEffect(() => {
    setI18nLanguage(language);
  }, [language]);

  React.useEffect(() => {
    let active = true;
    let suppressSave = true;
    let lastSavedJson = '';

    const unsubscribe = useAppStore.subscribe(state => {
      const nextOptions = getPersistedOptions(state);
      const nextJson = JSON.stringify(nextOptions);

      if (nextJson === lastSavedJson) {
        return;
      }

      lastSavedJson = nextJson;

      if (active && !suppressSave) {
        savePersistedAppOptions(nextOptions);
      }
    });

    (async () => {
      const storedOptions = await loadPersistedAppOptions();

      if (!active) {
        return;
      }

      const currentText = useAppStore.getState().text;

      useAppStore.setState({
        ...storedOptions,
        text: currentText || storedOptions.text || '',
      });
      lastSavedJson = JSON.stringify(
        getPersistedOptions(useAppStore.getState()),
      );
      suppressSave = false;
      savePersistedAppOptions(getPersistedOptions(useAppStore.getState()));
    })();

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);
}
