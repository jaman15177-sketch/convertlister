/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT REPOSITORY
 * ============================================================================
 *
 * Responsibility:
 * Supabase persistence layer
 *
 * ============================================================================
 */

import { createClient } from "@/lib/supabase/server";

import type {
  ReadyProduct,
  CreateReadyProductInput,
  UpdateReadyProductInput,
  ReadyProductFilters,
  PaginationOptions,
  PaginationResult,
  ReadyProductRepositoryContract,
} from "./ready-product.types";
/**
 * ============================================================================
 * REPOSITORY PROVIDER CONTRACT
 * ============================================================================
 */

/**
 * ============================================================================
 * REPOSITORY PROVIDER CONTRACT
 * ============================================================================
 */

export interface ReadyProductRepositoryProvider {

  findById(
    id: string,
    organization_id: string,
  ): Promise<ReadyProduct | null>;

  save(
    input: CreateReadyProductInput,
  ): Promise<ReadyProduct>;

  update(
    id: string,
    organization_id: string,
    input: UpdateReadyProductInput,
  ): Promise<ReadyProduct>;

  delete(
    id: string,
    organization_id: string,
  ): Promise<void>;

  search(
    filters: ReadyProductFilters,
    pagination: PaginationOptions,
  ): Promise<PaginationResult<ReadyProduct>>;

  health(): Promise<boolean>;

}

export class ReadyProductRepository
  implements ReadyProductRepositoryContract {


  private async client() {

    return createClient();

  }


  private calculateRange(
    pagination: PaginationOptions,
  ) {

    const page =
      Math.max(
        pagination.page,
        1,
      );


    const limit =
      Math.min(
        Math.max(
          pagination.limit,
          1,
        ),
        100,
      );


    const from =
      (page - 1) * limit;


    const to =
      from + limit - 1;


    return {

      page,

      limit,

      from,

      to,

    };

  }


  private buildPagination<T>(
    items: T[],
    total: number,
    page: number,
    limit: number,
  ): PaginationResult<T> {


    return {

      items,

      total,

      page,

      limit,

    };

  }
/**
 * ============================================================================
 * FIND BY ID
 * ============================================================================
 */

  public async findById(
    id: string,
    organization_id: string,
  ): Promise<ReadyProduct | null> {


    const supabase =
      await this.client();


    const {
      data,
      error,
    } = await supabase

      .from("ready_products")

      .select("*")

      .eq(
        "id",
        id,
      )

      .eq(
        "organization_id",
        organization_id,
      )

      .maybeSingle();



    if (error) {

      throw error;

    }


    return data as ReadyProduct | null;

  }



/**
 * ============================================================================
 * EXISTS
 * ============================================================================
 */

  public async exists(
    id: string,
    organization_id: string,
  ): Promise<boolean> {


    const supabase =
      await this.client();



    const {
      count,
      error,
    } = await supabase

      .from("ready_products")

      .select(
        "id",
        {
          count: "exact",
          head: true,
        },
      )

      .eq(
        "id",
        id,
      )

      .eq(
        "organization_id",
        organization_id,
      );



    if (error) {

      throw error;

    }



    return (
      (count ?? 0) > 0
    );

  }
/**
 * ============================================================================
 * CREATE
 * ============================================================================
 */

  public async create(
    input: CreateReadyProductInput,
  ): Promise<ReadyProduct> {


    const supabase =
      await this.client();



    const {
      data,
      error,
    } = await supabase

      .from("ready_products")

      .insert(
        input,
      )

      .select("*")

      .single();



    if (error) {

      throw error;

    }



    return data as ReadyProduct;

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


    const supabase =
      await this.client();



    const {
      data,
      error,
    } = await supabase

      .from("ready_products")

      .update(
        input,
      )

      .eq(
        "id",
        id,
      )

      .eq(
        "organization_id",
        organization_id,
      )

      .select("*")

      .single();



    if (error) {

      throw error;

    }



    return data as ReadyProduct;

  }
/**
 * ============================================================================
 * DELETE
 * ============================================================================
 */

  public async delete(
    id: string,
    organization_id: string,
  ): Promise<void> {


    const supabase =
      await this.client();



    const {
      error,
    } = await supabase

      .from("ready_products")

      .delete()

      .eq(
        "id",
        id,
      )

      .eq(
        "organization_id",
        organization_id,
      );



    if (error) {

      throw error;

    }

  }





/**
 * ============================================================================
 * FIND MANY
 * ============================================================================
 */

  public async findMany(
    filters: ReadyProductFilters,
    pagination: PaginationOptions,
  ): Promise<PaginationResult<ReadyProduct>> {


    const supabase =
      await this.client();



    const {
      from,
      to,
      page,
      limit,
    } =
      this.calculateRange(
        pagination,
      );



    let query =
      supabase

        .from("ready_products")

        .select(
          "*",
          {
            count: "exact",
          },
        )

        .eq(
          "organization_id",
          filters.organization_id,
        );



    if (
      filters.status
    ) {

      query =
        query.eq(
          "status",
          filters.status,
        );

    }



    if (
      filters.marketplace
    ) {

      query =
        query.eq(
          "marketplace",
          filters.marketplace,
        );

    }



    if (
      filters.category
    ) {

      query =
        query.eq(
          "category",
          filters.category,
        );

    }



    if (
      filters.search
    ) {

      query =
        query.ilike(
          "title",
          `%${filters.search}%`,
        );

    }



    const {
      data,
      count,
      error,
    } =
      await query.range(
        from,
        to,
      );



    if (error) {

      throw error;

    }



    return this.buildPagination(

      (data ?? []) as ReadyProduct[],

      count ?? 0,

      page,

      limit,

    );

  }
/**
 * ============================================================================
 * COMPATIBILITY SAVE
 * ============================================================================
 */

public async save(
  input: CreateReadyProductInput,
): Promise<ReadyProduct> {

  return this.create(
    input,
  );

}



/**
 * ============================================================================
 * COMPATIBILITY SEARCH
 * ============================================================================
 */

public async search(
  filters: ReadyProductFilters,
  pagination: PaginationOptions,
): Promise<PaginationResult<ReadyProduct>> {

  return this.findMany(
    filters,
    pagination,
  );

}



/**
 * ============================================================================
 * HEALTH
 * ============================================================================
 */

public async health(): Promise<boolean> {

  try {

    const supabase =
      await this.client();

    const {
      error,
    } = await supabase

      .from("ready_products")

      .select(
        "id",
        {
          head: true,
          count: "exact",
        },
      )

      .limit(1);

    return !error;

  } catch {

    return false;

  }

}
/**
 * ============================================================================
 * CLASS COMPLETE
 * ============================================================================
 */

}



/**
 * ============================================================================
 * SINGLETON
 * ============================================================================
 */

export const readyProductRepository =
  new ReadyProductRepository();



/**
 * ============================================================================
 * FILE COMPLETE
 * ============================================================================
 *
 * ready-product.repository.ts
 *
 * ✓ Supabase Client
 * ✓ Create
 * ✓ Find By ID
 * ✓ Find Many
 * ✓ Update
 * ✓ Delete
 * ✓ Exists
 * ✓ Organization Isolation
 * ✓ Singleton Export
 *
 * Single Source of Truth
 * ============================================================================
 */
