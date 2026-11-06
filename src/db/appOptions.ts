import { open, type DB } from '@op-engineering/op-sqlite';
import { persistedAppOptionKeys, type PersistedAppOptions } from '../state/persistedOptions';

type StoredValueRow = {
  value: string | null;
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

  try {
    const parsed = JSON.parse(row.value);

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const result: Partial<PersistedAppOptions> = {};

      for (const key of persistedAppOptionKeys) {
        const value = (parsed as Record<string, unknown>)[key];

        if (value !== undefined) {
          (result as Record<string, unknown>)[key] = value;
        }
      }

      return result;
    }
  } catch {
    return {};
  }

  return {};
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
    await database.execute('DELETE FROM display_history WHERE options_json = ?', [optionsJson]);
    await database.execute(
      'INSERT INTO display_history (created_at, options_json) VALUES (?, ?)',
      [Date.now(), optionsJson],
    );
  });
}
