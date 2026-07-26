/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT ENGINE
 * ===========================================================
 *
 * File:
 * ready-product.engine.ts
 *
 * Responsibility
 * -----------------------------------------------------------
 * Ready Product orchestration engine.
 *
 * Coordinates
 * -----------------------------------------------------------
 * ✓ Store
 * ✓ Service
 *
 * Must NOT
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Marketplace
 * ✗ API
 * ✗ External Services
 *
 * ===========================================================
 */

import { ReadyProductStore } from "./ready-product.store";

import type {
  ReadyProduct,
} from "./ready-product.types";

import {
  buildReadyProduct,
} from "./ready-product.builder";

import type {
  ReadyProductServiceInput,
  ReadyProductServiceOutput,
} from "./ready-product.builder";
import {
  saveReadyProduct,
} from "./ready-product.store";
/**
 * Engine Options
 */
export interface ReadyProductEngineOptions {

  readonly store: ReadyProductStore;

}


/**
 * Engine State
 */
export interface ReadyProductEngineState {

  readonly initialized: boolean;

}


/**
 * Engine Result
 */
export interface ReadyProductEngineResult {

  readonly success: boolean;

  readonly product?: ReadyProduct;

  readonly output?: ReadyProductServiceOutput;

  readonly error?: string;

}
/**
 * ===========================================================
 * Ready Product Engine
 * Part-2
 * ===========================================================
 */



/**
 * Ready Product Engine
 */
export class ReadyProductEngine {

  private readonly store:
    ReadyProductStore;

  private initialized = false;


  constructor(
    options: ReadyProductEngineOptions,
  ) {

    this.store =
      options.store;

    this.initialized = true;

  }


  /**
   * Engine State
   */
  getState():
    ReadyProductEngineState {

    return {

      initialized:
        this.initialized,

    };

  }

}
/**
 * ===========================================================
 * Ready Product Engine Operations
 * Part-3
 * ===========================================================
 */


/**
 * Execute Ready Product Pipeline
 */
export async function executeReadyProductPipeline(
  engine: ReadyProductEngine,
  input: ReadyProductServiceInput,
): Promise<ReadyProductEngineResult> {

 const output =
  await buildReadyProduct(
    input,
  );


  if (!output.valid) {

    return {

      success: false,

      output,

      error: "READY_PRODUCT_VALIDATION_FAILED",

    };

  }


  if (!output.product) {

    return {

      success: false,

      output,

      error: "READY_PRODUCT_MAPPING_FAILED",

    };

  }


  await saveReadyProduct(

    engine["store"],

    output.product,

  );


  return {

    success: true,

    product: output.product,

    output,

  };

}
/**
 * ===========================================================
 * Ready Product Engine Helpers
 * Part-4 Final
 * ===========================================================
 */


/**
 * Engine Ready Check
 */
export function isReadyProductEngineReady(
  engine: ReadyProductEngine,
): boolean {

  return engine
    .getState()
    .initialized;

}



/**
 * Engine Health
 */
export function getReadyProductEngineHealth(
  engine: ReadyProductEngine,
): ReadyProductEngineState {

  return engine.getState();

}



/**
 * Engine Repository
 */
export function getReadyProductEngineStore(
  engine: ReadyProductEngine,
): ReadyProductStore {

  return engine["store"];

}



/**
 * Create Ready Product Engine
 */
export function createReadyProductEngine(
  options: ReadyProductEngineOptions,
): ReadyProductEngine {

  return new ReadyProductEngine(
    options,
  );

}
