/**
 * ==========================================================
 * SUPABASE PRODUCT MAPPER
 * ==========================================================
 *
 * Production Data Transformation Layer
 *
 * Responsibilities:
 * - Supabase row → Domain entity
 * - Domain entity → Supabase payload
 *
 * Rules:
 * - No database calls
 * - No validation
 * - No business rules
 * - Pure transformation only
 * ==========================================================
 */


import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";


import type {
  UniversalEntity,
} from "../store/universal.types";


import type {
  SupabaseProductCreateInput,
  SupabaseProductUpdateInput,
  SupabaseProductRow,
} from "./supabase.product.types";

/**
 * ==========================================================
 * SUPABASE PRODUCT MAPPER
 * ==========================================================
 */

export class SupabaseProductMapper {


  /**
   * Supabase Row
   *
   * ↓
   *
   * Universal Entity
   */
  static toEntity(
    row: SupabaseProductRow
  ):
    UniversalEntity<AdapterProduct>
  {

    return {

  id: row.id,

  metadata: {

    createdAt:
      new Date(
        row.created_at
      ),

    updatedAt:
      new Date(
        row.updated_at
      ),

    version:
      row.current_version,

  },


  data: {

        id: row.id,

        title:
          row.title,


        price:
          row.price,


        currency:
          row.currency,


        source:
          row.source,


        images:
          Array.isArray(
            row.metadata?.images
          )
            ? row.metadata.images as string[]
            : [],


        metadata: {

          ...(row.metadata ?? {}),

          status:
            row.status,

          catalogHealthScore:
            row.catalog_health_score,

          catalogHealthGrade:
            row.catalog_health_grade,

          winningScore:
            row.winning_score,

          isReady:
            row.is_ready,

          version:
            row.current_version,

        },

      },

    };

  }



  /**
   * Create Input
   *
   * ↓
   *
   * Supabase Insert Payload
   */
  static toDatabase(
    input:
      SupabaseProductCreateInput
  )
  {

    return {

      organization_id:
        input.organization_id,


      title:
        input.title,


      description:
        input.description ?? null,


      price:
        input.price,


      currency:
        input.currency,


      source:
        input.source,


      status:
        input.status ?? "raw",


      is_ready:
        false,


      current_version:
        1,


      metadata:
        input.metadata ?? {},

    };

  }



  /**
   * Partial update mapper
   */
  static toUpdate(
  input: SupabaseProductUpdateInput
)
  {

    return {

      ...input,

      updated_at:
        new Date()
          .toISOString(),

    };

  }


}



export const supabaseProductMapper =
  SupabaseProductMapper;
