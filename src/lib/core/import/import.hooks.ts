/**
 * ==========================================================
 * IMPORT HOOKS
 * ==========================================================
 * Lifecycle hooks for the Import subsystem.
 *
 * Responsibilities
 * - Hook contracts
 * - Hook registry
 * - Safe execution
 *
 * No queue
 * No logging
 * No infrastructure
 * ==========================================================
 */

import type { AdapterProduct } from "@/adapters/core/adapter.contract";
import type { ImportResult, ImportSource } from "./import.types";

/* ==========================================================
 * HOOK CONTEXT
 * ========================================================== */

export interface ImportHookContext {
  readonly jobId: string;

  readonly organizationId: string;

  readonly requestId?: string;

  readonly userId?: string;

  readonly source: ImportSource;
}

/* ==========================================================
 * IMPORT HOOKS
 * ========================================================== */

export interface ImportHooks {
  beforeImport?(
    context: ImportHookContext
  ): void | Promise<void>;

  afterImport?(
    result: ImportResult,
    context: ImportHookContext
  ): void | Promise<void>;

  beforeProduct?(
    product: unknown,
    context: ImportHookContext
  ): void | Promise<void>;

  afterProduct?(
    product: AdapterProduct,
    context: ImportHookContext
  ): void | Promise<void>;

  onError?(
    error: Error,
    context: ImportHookContext
  ): void | Promise<void>;
}

/* ==========================================================
 * HOOK REGISTRY
 * ========================================================== */


export interface RegisteredImportHook {
  readonly priority?: number;

  readonly hooks: ImportHooks;
}
export class ImportHookRegistry {
  private readonly hooks: RegisteredImportHook[] = [];

register(
  hook: RegisteredImportHook
): void {
  this.hooks.push(hook);

  this.hooks.sort(
    (a, b) =>
      (b.priority ?? 0) -
      (a.priority ?? 0)
  );
}


  getAll(): readonly RegisteredImportHook[] {
    return this.hooks;
  }


  clear(): void {
    this.hooks.length = 0;
  }
}

/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const importHooks = new ImportHookRegistry();
