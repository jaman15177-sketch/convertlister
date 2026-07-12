/**
 * ==========================================================
 * UNIVERSAL HOOKS
 * ==========================================================
 *
 * Lifecycle hook system for Universal Store.
 *
 * Responsibilities:
 * - Before/after lifecycle hooks
 * - Hook registration
 * - Safe execution boundary
 *
 * Rules:
 * - No database dependency
 * - No event bus
 * - No infrastructure
 * ==========================================================
 */


import type {
  UniversalEntity,
} from "./universal.types";



/* ==========================================================
 * HOOK CONTEXT
 * ========================================================== */

export interface UniversalHookContext {

  readonly entityId: string;

  readonly timestamp: Date;

}



/* ==========================================================
 * HOOK CONTRACT
 * ========================================================== */

export interface UniversalHooks<T = unknown> {


  beforeCreate?(
    entity: UniversalEntity<T>,
    context: UniversalHookContext
  ):
    void | Promise<void>;



  afterCreate?(
    entity: UniversalEntity<T>,
    context: UniversalHookContext
  ):
    void | Promise<void>;



  beforeUpdate?(
    entity: UniversalEntity<T>,
    context: UniversalHookContext
  ):
    void | Promise<void>;



  afterUpdate?(
    entity: UniversalEntity<T>,
    context: UniversalHookContext
  ):
    void | Promise<void>;



  beforeDelete?(
    entityId: string,
    context: UniversalHookContext
  ):
    void | Promise<void>;



  afterDelete?(
    entityId: string,
    context: UniversalHookContext
  ):
    void | Promise<void>;

}



/* ==========================================================
 * REGISTERED HOOK
 * ========================================================== */

export interface RegisteredUniversalHook<T = unknown> {

  readonly priority?: number;

  readonly hooks:
    UniversalHooks<T>;

}



/* ==========================================================
 * HOOK REGISTRY
 * ========================================================== */

export class UniversalHookRegistry<T = unknown> {


  private readonly hooks:
    RegisteredUniversalHook<T>[] = [];



  register(
    hook: RegisteredUniversalHook<T>
  ): void {

    this.hooks.push(hook);


    this.hooks.sort(
      (a, b) =>
        (b.priority ?? 0) -
        (a.priority ?? 0)
    );

  }



  getAll():
    readonly RegisteredUniversalHook<T>[] {

    return this.hooks;

  }



  clear(): void {

    this.hooks.length = 0;

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalHooks =
  new UniversalHookRegistry();
