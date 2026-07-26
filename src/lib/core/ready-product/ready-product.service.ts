/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT SERVICE
 * ============================================================================
 *
 * Responsibility:
 * Business Service Layer
 *
 * ============================================================================
 */


import {
  readyProductRepository,
} from "./ready-product.repository";


import {
  readyProductValidator,
} from "./ready-product.validator";


import type {
  ReadyProduct,
  CreateReadyProductInput,
  UpdateReadyProductInput,
  ReadyProductFilters,
  PaginationOptions,
  PaginationResult,
} from "./ready-product.types";
/**
 * ============================================================================
 * LEGACY COMPATIBILITY TYPES
 * ============================================================================
 */

export interface ReadyProductServiceInput {

  readonly input:
    CreateReadyProductInput;

}



export interface ReadyProductServiceOutput {

  readonly product:
    ReadyProduct;

}


export class ReadyProductService {



  public async create(
    input: CreateReadyProductInput,
  ): Promise<ReadyProduct> {


    readyProductValidator.validateCreate(
      input,
    );


    return await readyProductRepository.create(
      input,
    );

  }
/**
 * ============================================================================
 * GET BY ID
 * ============================================================================
 */

  public async getById(
    id: string,
    organization_id: string,
  ): Promise<ReadyProduct | null> {


    readyProductValidator.validateId(
      id,
    );


    return await readyProductRepository.findById(
      id,
      organization_id,
    );

  }





/**
 * ============================================================================
 * LIST
 * ============================================================================
 */

  public async list(
    filters: ReadyProductFilters,
    pagination: PaginationOptions,
  ): Promise<PaginationResult<ReadyProduct>> {


    return await readyProductRepository.findMany(
      filters,
      pagination,
    );

  }
/**
 * ============================================================================
 * UPDATE
 * ============================================================================
 */

  public async update(
    id: string,
    organization_id: string,
    input: UpdateReadyProductInput,
  ): Promise<ReadyProduct> {


    readyProductValidator.validateId(
      id,
    );



    readyProductValidator.validateUpdate(
      input,
    );



    return await readyProductRepository.update(
      id,
      organization_id,
      input,
    );

  }
/**
 * ============================================================================
 * DELETE
 * ============================================================================
 */

  public async remove(
    id: string,
    organization_id: string,
  ): Promise<void> {


    readyProductValidator.validateId(
      id,
    );



    await readyProductRepository.delete(
      id,
      organization_id,
    );

  }


}/**
 * ============================================================================
 * LEGACY BUILD FUNCTION
 * ============================================================================
 */

export async function buildReadyProduct(
  input: ReadyProductServiceInput,
): Promise<ReadyProductServiceOutput> {

  const product =
    await readyProductService.create(
      input.input,
    );

  return {

    product,

  };

}/**
 * ============================================================================
 * LEGACY CREATE WRAPPER
 * ============================================================================
 */

export async function createReadyProduct(
  input: CreateReadyProductInput,
): Promise<ReadyProduct> {

  return readyProductService.create(
    input,
  );

}



/**
 * ============================================================================
 * LEGACY UPDATE WRAPPER
 * ============================================================================
 */

export async function updateReadyProduct(
  id: string,
  organization_id: string,
  input: UpdateReadyProductInput,
): Promise<ReadyProduct> {

  return readyProductService.update(
    id,
    organization_id,
    input,
  );

}/**
 * ============================================================================
 * LEGACY GET WRAPPER
 * ============================================================================
 */

export async function getReadyProduct(
  id: string,
  organization_id: string,
): Promise<ReadyProduct | null> {

  return readyProductService.getById(
    id,
    organization_id,
  );

}



/**
 * ============================================================================
 * LEGACY DELETE WRAPPER
 * ============================================================================
 */

export async function deleteReadyProduct(
  id: string,
  organization_id: string,
): Promise<void> {

  await readyProductService.remove(
    id,
    organization_id,
  );

}



/**
 * ============================================================================
 * LEGACY LIST WRAPPER
 * ============================================================================
 */

export async function listReadyProducts(
  filters: ReadyProductFilters,
  pagination: PaginationOptions,
): Promise<PaginationResult<ReadyProduct>> {

  return readyProductService.list(
    filters,
    pagination,
  );

}/**
 * ============================================================================
 * LEGACY COMPATIBILITY EXPORTS
 * ============================================================================
 *
 * Compatibility layer for:
 * ✓ engine.ts
 * ✓ contract.ts
 * ✓ factory.ts
 * ✓ future migration
 *
 * Remove after full migration.
 * ============================================================================
 */

export type ReadyProductBuildInput =
  ReadyProductServiceInput;

export type ReadyProductBuildOutput =
  ReadyProductServiceOutput;



/**
 * ============================================================================
 * FILE COMPLETE
 * ============================================================================
 *
 * ready-product.service.ts
 *
 * ✓ Service Class
 * ✓ Singleton
 * ✓ Create
 * ✓ Update
 * ✓ Delete
 * ✓ Get
 * ✓ List
 * ✓ Legacy Compatibility
 *
 * ============================================================================
 */
/**
 * ============================================================================
 * SINGLETON
 * ============================================================================
 */

export const readyProductService =
  new ReadyProductService();



/**
 * ============================================================================
 * FILE COMPLETE
 * ============================================================================
 *
 * ready-product.service.ts
 *
 * ✓ Create
 * ✓ Get By ID
 * ✓ List
 * ✓ Update
 * ✓ Delete
 * ✓ Validator Integration
 * ✓ Repository Integration
 * ✓ Singleton Export
 *
 * Single Source of Truth
 * ============================================================================
 */
