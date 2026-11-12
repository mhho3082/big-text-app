import React from 'react';
import {
  deleteDisplayHistoryEntry,
  loadDisplayHistory,
  resetDatabase,
} from '../db/appOptions';

export type HistoryEntry = Awaited<
  ReturnType<typeof loadDisplayHistory>
>[number];

export function useHistoryEntries() {
  const [entries, setEntries] = React.useState<HistoryEntry[]>([]);

  const refreshHistory = React.useCallback(async () => {
    const nextEntries = await loadDisplayHistory();
    setEntries(nextEntries);
  }, []);

  const deleteEntry = React.useCallback(
    async (id: number) => {
      await deleteDisplayHistoryEntry(id);
      await refreshHistory();
    },
    [refreshHistory],
  );

  const resetHistory = React.useCallback(async () => {
    await resetDatabase();
    await refreshHistory();
  }, [refreshHistory]);

  React.useEffect(() => {
    let active = true;

    (async () => {
      const nextEntries = await loadDisplayHistory();

      if (active) {
        setEntries(nextEntries);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return {
    deleteEntry,
    entries,
    refreshHistory,
    resetHistory,
  };
}
