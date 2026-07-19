/**
 * ==========================================================
 * UNIVERSAL ENGINE
 * ==========================================================
 *
 * Enterprise orchestration layer for Universal Store.
 *
 * Responsibilities
 * - Validate entity
 * - Deduplicate
 * - Create snapshot
 * - Delegate CRUD to UniversalService
 *
 * Rules
 * - No database logic
 * - No API logic
 * - No queue logic
 * ==========================================================
 */

import type {
  UniversalEntity,
  UniversalQuery,
  UniversalStoreResult,
} from "./universal.types";

import { UniversalService } from "./universal.service";
import { universalValidator } from "./universal.validator";
import { universalDeduplicator } from "./universal.deduplicator";
import { universalSnapshot } from "./universal.snapshot";

export class UniversalEngine<T = unknown> {

  constructor(
    private readonly service: UniversalService<T>,
  ) {}

  async create(
    entity: UniversalEntity<T>,
  ): Promise<
    UniversalStoreResult<UniversalEntity<T>>
  > {

    universalValidator.validate(entity);

    universalSnapshot.create(
      entity.id,
      entity.data,
      entity.metadata.version,
    );

    return this.service.create(entity);
  }

  async update(
    entity: UniversalEntity<T>,
  ): Promise<
    UniversalStoreResult<UniversalEntity<T>>
  > {

    universalValidator.validate(entity);

    universalSnapshot.create(
      entity.id,
      entity.data,
      entity.metadata.version,
    );

    return this.service.update(entity);
  }

  async save(
    entity: UniversalEntity<T>,
  ): Promise<
    UniversalStoreResult<UniversalEntity<T>>
  > {

    return this.create(entity);
  }

  async get(
    id: string,
  ): Promise<
    UniversalStoreResult<UniversalEntity<T>>
  > {

    return this.service.get(id);
  }

  async search(
    query: UniversalQuery = {},
  ): Promise<
    UniversalStoreResult<
      readonly UniversalEntity<T>[]
    >
  > {

    return this.service.search(query);
  }

  async remove(
    id: string,
  ): Promise<
    UniversalStoreResult<boolean>
  > {

    return this.service.remove(id);
  }

  async exists(
    entity: UniversalEntity<T>,
  ): Promise<boolean> {

    const result =
      await this.service.search({});

    return universalDeduplicator.isDuplicate(
      result.data.map(item => item.data),
      entity.data,
    );
  }

}
