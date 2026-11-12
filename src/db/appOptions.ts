import {
  persistedAppOptionKeys,
  type PersistedAppOptions,
} from '../state/persistedOptions';
import { createQueuedDatabase } from './internal/sqlite';

type StoredValueRow = {
  value: string | null;
};

type DisplayHistoryRow = {
  id: number;
  created_at: number;
  options_json: string | null;
};

export type DisplayHistoryEntry = {
  id: number;
  createdAt: number;
  options: PersistedAppOptions;
};

const INIT_SQL = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS app_options (
  id INTEGER PRIMARY KEY NOT NULL CHECK (id = 1),
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS display_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  created_at INTEGER NOT NULL,
  options_json TEXT NOT NULL
);
`;

const { ensureDb, enqueueWrite } = createQueuedDatabase(
  'big-text-app.db',
  INIT_SQL,
);

function parsePersistedOptionsJson(
  value: string,
): Partial<PersistedAppOptions> | null {
  try {
    const parsed = JSON.parse(value);

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const result: Partial<PersistedAppOptions> = {};

      for (const key of persistedAppOptionKeys) {
        const nextValue = (parsed as Record<string, unknown>)[key];

        if (nextValue !== undefined) {
          (result as Record<string, unknown>)[key] = nextValue;
        }
      }

      return result;
    }
  } catch {
    return null;
  }

  return null;
}

export async function loadPersistedAppOptions(): Promise<
  Partial<PersistedAppOptions>
> {
  const database = await ensureDb();
  const res = await database.execute(
    'SELECT value FROM app_options WHERE id = 1',
  );
  const row = (res.rows ?? [])[0] as StoredValueRow | undefined;

  if (!row?.value) {
    return {};
  }

  const parsed = parsePersistedOptionsJson(row.value);

  if (parsed) {
    return parsed;
  }

  return {};
}

export async function loadDisplayHistory(): Promise<DisplayHistoryEntry[]> {
  const database = await ensureDb();
  const res = await database.execute(
    'SELECT id, created_at, options_json FROM display_history ORDER BY created_at DESC, id DESC',
  );
  const rows = (res.rows ?? []) as DisplayHistoryRow[];

  return rows.flatMap(row => {
    if (!row.options_json) {
      return [];
    }

    const parsed = parsePersistedOptionsJson(row.options_json);

    if (!parsed) {
      return [];
    }

    return [
      {
        id: row.id,
        createdAt: row.created_at,
        options: parsed as PersistedAppOptions,
      },
    ];
  });
}

export function deleteDisplayHistoryEntry(id: number): Promise<void> {
  return enqueueWrite(async database => {
    await database.execute('DELETE FROM display_history WHERE id = ?', [id]);
  });
}

export function resetDatabase(): Promise<void> {
  return enqueueWrite(async database => {
    await database.execute('DROP TABLE IF EXISTS display_history');
    await database.execute('DROP TABLE IF EXISTS app_options');

    for (const initStatement of INIT_SQL.split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0)) {
      await database.execute(initStatement);
    }
  });
}

export function savePersistedAppOptions(
  options: PersistedAppOptions,
): Promise<void> {
  return enqueueWrite(async database => {
    await database.execute(
      'INSERT INTO app_options (id, value, updated_at) VALUES (1, ?, ?) ON CONFLICT(id) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at',
      [JSON.stringify(options), Date.now()],
    );
  });
}

export function recordDisplayOptions(
  options: PersistedAppOptions,
): Promise<void> {
  return enqueueWrite(async database => {
    const optionsJson = JSON.stringify(options);
    const res = await database.execute(
      'SELECT id, options_json FROM display_history',
    );
    const rows = (res.rows ?? []) as DisplayHistoryRow[];

    for (const row of rows) {
      if (!row.options_json) {
        continue;
      }

      const parsed = parsePersistedOptionsJson(row.options_json);

      if (parsed?.text === options.text) {
        await database.execute('DELETE FROM display_history WHERE id = ?', [
          row.id,
        ]);
      }
    }

    await database.execute(
      'INSERT INTO display_history (created_at, options_json) VALUES (?, ?)',
      [Date.now(), optionsJson],
    );
  });
}
