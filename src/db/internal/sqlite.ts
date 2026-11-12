import { open, type DB } from '@op-engineering/op-sqlite';

function splitStatements(sql: string): string[] {
  return sql
    .split(';')
    .map(statement => statement.trim())
    .filter(statement => statement.length > 0);
}

export type QueuedDatabase = {
  ensureDb: () => Promise<DB>;
  enqueueWrite: <T>(fn: (db: DB) => Promise<T>) => Promise<T>;
};

export function createQueuedDatabase(
  name: string,
  initSql: string,
): QueuedDatabase {
  let db: DB | null = null;
  let initPromise: Promise<DB> | null = null;
  let writeQueue: Promise<void> = Promise.resolve();

  async function ensureDb(): Promise<DB> {
    if (db) {
      return db;
    }

    if (!initPromise) {
      initPromise = (async () => {
        const database = open({ name });
        for (const statement of splitStatements(initSql)) {
          await database.execute(statement);
        }
        db = database;
        return database;
      })();
    }

    return initPromise;
  }

  function enqueueWrite<T>(fn: (db: DB) => Promise<T>): Promise<T> {
    const result = writeQueue.then(async () => fn(await ensureDb()));
    writeQueue = result.then(
      () => {},
      () => {},
    );
    return result;
  }

  return {
    ensureDb,
    enqueueWrite,
  };
}
