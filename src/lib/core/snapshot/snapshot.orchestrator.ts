/**
 * ===========================================================
 * CONVERTLISTER
 * SNAPSHOT ENGINE
 * ===========================================================
 *
 * File:
 * snapshot.orchestrator.ts
 *
 * Responsibility
 * -----------------------------------------------------------
 * Coordinates Product Snapshot persistence flow.
 *
 * Flow
 * -----------------------------------------------------------
 * Snapshot Engine
 *      ↓
 * Product Snapshot Mapper
 *      ↓
 * Repository
 *      ↓
 * Database / Storage (future)
 *
 * Must NOT
 * -----------------------------------------------------------
 * ✗ SQL
 * ✗ Supabase
 * ✗ API
 * ✗ Marketplace
 *
 * ===========================================================
 */

import type {
  ProductSnapshot as EngineProductSnapshot,
} from "./snapshot.types";

import type {
  ProductSnapshot as ProductSnapshotModel,
} from "./product.snapshot.types";

import type {
  ProductSnapshotRepositoryProvider,
} from "./product.snapshot.repository";

import {
  adaptEngineSnapshotToProductSnapshot,
} from "./product.snapshot.adapter";
import {
  ProductSnapshotValidationError,
} from "./product.snapshot.errors";

export interface SnapshotOrchestratorResult {

  readonly success: boolean;

  readonly snapshot: ProductSnapshotModel;

}

export class SnapshotOrchestrator {

  constructor(

    private readonly repository:
      ProductSnapshotRepositoryProvider,

  ) {}

  async execute(
  snapshot: EngineProductSnapshot,
): Promise<SnapshotOrchestratorResult> {

    const mapped =
  adaptEngineSnapshotToProductSnapshot(snapshot);
    if (!mapped) {

      throw new ProductSnapshotValidationError(
        "Snapshot mapping failed",
      );

    }

    await this.repository.save(mapped);

    return {

      success: true,

      snapshot: mapped,

    };

  }

}
