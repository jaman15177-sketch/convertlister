/**
 * ==========================================================
 * UNIVERSAL STORE
 * ==========================================================
 *
 * Generic in-memory storage abstraction.
 *
 * Responsibilities:
 * - Generic key/value storage
 * - Type-safe access
 * - Reusable by any repository
 *
 * Used by:
 * - Product Repository
 * - User Repository (future)
 * - Organization Repository (future)
 * - Snapshot Repository (future)
 *
 * ==========================================================
 */

export class UniversalStore<T> {
  private store = new Map<string, T>();

  set(key: string, value: T): void {
    this.store.set(key, value);
  }

  get(key: string): T | undefined {
    return this.store.get(key);
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  keys(): string[] {
    return Array.from(this.store.keys());
  }

  values(): T[] {
    return Array.from(this.store.values());
  }

  size(): number {
    return this.store.size;
  }
}
