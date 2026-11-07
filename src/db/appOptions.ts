import { open, type DB } from '@op-engineering/op-sqlite';
import { persistedAppOptionKeys, type PersistedAppOptions } from '../state/persistedOptions';

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

const DB_NAME = 'big-text-app.db';

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

let db: DB | null = null;
let initPromise: Promise<DB> | null = null;
let writeQueue: Promise<void> = Promise.resolve();

function splitStatements(sql: string): string[] {
  return sql
    .split(';')
    .map(statement => statement.trim())
    .filter(statement => statement.length > 0);
}

function parsePersistedOptionsJson(value: string): Partial<PersistedAppOptions> | null {
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

function enqueueWrite<T>(fn: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(fn);
  writeQueue = result.then(
    () => {},
    () => {},
  );
  return result;
}

async function ensureDb(): Promise<DB> {
  if (db) {
    return db;
  }

  if (!initPromise) {
    initPromise = (async () => {
      const database = open({ name: DB_NAME });
      for (const statement of splitStatements(INIT_SQL)) {
        await database.execute(statement);
      }
      db = database;
      return database;
    })();
  }

  return initPromise;
}

export async function loadPersistedAppOptions(): Promise<Partial<PersistedAppOptions>> {
  const database = await ensureDb();
  const res = await database.execute('SELECT value FROM app_options WHERE id = 1');
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
  return enqueueWrite(async () => {
    const database = await ensureDb();
    await database.execute('DELETE FROM display_history WHERE id = ?', [id]);
  });
}

export function resetDatabase(): Promise<void> {
  return enqueueWrite(async () => {
    const database = await ensureDb();

    await database.execute('DROP TABLE IF EXISTS display_history');
    await database.execute('DROP TABLE IF EXISTS app_options');

    for (const statement of splitStatements(INIT_SQL)) {
      await database.execute(statement);
    }
  });
}

export function savePersistedAppOptions(options: PersistedAppOptions): Promise<void> {
  return enqueueWrite(async () => {
    const database = await ensureDb();
    await database.execute(
      'INSERT INTO app_options (id, value, updated_at) VALUES (1, ?, ?) ON CONFLICT(id) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at',
      [JSON.stringify(options), Date.now()],
    );
  });
}

export function recordDisplayOptions(options: PersistedAppOptions): Promise<void> {
  return enqueueWrite(async () => {
    const database = await ensureDb();
    const optionsJson = JSON.stringify(options);
    const res = await database.execute('SELECT id, options_json FROM display_history');
    const rows = (res.rows ?? []) as DisplayHistoryRow[];

    for (const row of rows) {
      if (!row.options_json) {
        continue;
      }

      const parsed = parsePersistedOptionsJson(row.options_json);

      if (parsed?.text === options.text) {
        await database.execute('DELETE FROM display_history WHERE id = ?', [row.id]);
      }
    }

    await database.execute(
      'INSERT INTO display_history (created_at, options_json) VALUES (?, ?)',
      [Date.now(), optionsJson],
    );
  });
}
