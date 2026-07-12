/**
 * ==========================================================
 * IMPORT IDEMPOTENCY
 * ==========================================================
 * Production-safe idempotency layer.
 *
 * Responsibilities
 * - Prevent duplicate import execution
 * - Track processed request keys
 * - Provide deterministic import identity
 *
 * No database
 * No cache
 * No infrastructure
 * ==========================================================
 */

/* ==========================================================
 * IDEMPOTENCY RECORD
 * ==========================================================
 */

export interface ImportIdempotencyRecord {
  readonly key: string;

  readonly createdAt: Date;

  readonly completed: boolean;

  readonly resultId?: string;
}

/* ==========================================================
 * IDEMPOTENCY STORE CONTRACT
 * ==========================================================
 */

export interface ImportIdempotencyStore {
  has(
    key: string
  ): boolean;

  get(
    key: string
  ): ImportIdempotencyRecord | undefined;

  set(
    record: ImportIdempotencyRecord
  ): void;

  remove(
    key: string
  ): void;

  clear(): void;
}

/* ==========================================================
 * MEMORY STORE
 * ==========================================================
 */

export class InMemoryImportIdempotencyStore
  implements ImportIdempotencyStore
{
  private readonly records =
    new Map<string, ImportIdempotencyRecord>();

  has(
    key: string
  ): boolean {
    return this.records.has(key);
  }

  get(
    key: string
  ): ImportIdempotencyRecord | undefined {
    return this.records.get(key);
  }

  set(
    record: ImportIdempotencyRecord
  ): void {
    this.records.set(
      record.key,
      record
    );
  }

  remove(
    key: string
  ): void {
    this.records.delete(key);
  }

  clear(): void {
    this.records.clear();
  }
}

/* ==========================================================
 * IDEMPOTENCY SERVICE
 * ==========================================================
 */

export class ImportIdempotencyService {
  constructor(
    private readonly store: ImportIdempotencyStore
  ) {}

  exists(
    key: string
  ): boolean {
    return this.store.has(key);
  }

  register(
    key: string
  ): void {
    this.store.set({
      key,
      createdAt: new Date(),
      completed: false,
    });
  }

  complete(
    key: string,
    resultId: string
  ): void {
    this.store.set({
      key,
      createdAt:
        this.store.get(key)?.createdAt ??
        new Date(),
      completed: true,
      resultId,
    });
  }

  remove(
    key: string
  ): void {
    this.store.remove(key);
  }
}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

const idempotencyStore =
  new InMemoryImportIdempotencyStore();

export const importIdempotency =
  new ImportIdempotencyService(
    idempotencyStore
  );
