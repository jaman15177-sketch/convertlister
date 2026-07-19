/**
 * ==========================================================
 * SUPABASE PRODUCT MAPPER
 * ==========================================================
 *
 * Database Row
 *        ↓
 * NormalizedProduct Entity
 *
 * Rules:
 * - Pure mapping only
 * - No business logic
 * - No validation
 * ==========================================================
 */


import type {
  UniversalEntity,
} from "../store/universal.types";


import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";


import type {
  SupabaseProductCreateInput,
  SupabaseProductUpdateInput,
  SupabaseProductRow,
} from "./supabase.product.types";



export class SupabaseProductMapper {



  static toEntity(
    row: SupabaseProductRow
  ):
  UniversalEntity<NormalizedProduct>
  {

    return {

      id: row.id,


      metadata: {

        createdAt:
          new Date(row.created_at),

        updatedAt:
          new Date(row.updated_at),

        version:
          row.current_version,

      },


      data: {

        id: row.id,


        title:
          row.title,


        description:
          row.description ?? "",



        price: {

          amount:
            row.price,

          currency:
            row.currency,

        },

source:
  row.source,

marketplace:
  (
    row.metadata as Record<string, unknown>
  )?.marketplace as string ?? "unknown",

attributes:
  (
    row.metadata as Record<string, unknown>
  )?.attributes as Record<string, unknown> ?? {},
        images: {

          urls:
            Array.isArray(row.metadata?.images)
              ? row.metadata.images as string[]
              : [],

        },


        keywords:
          [],



        metadata:
          row.metadata ?? {},



        status: "NORMALIZED"


      },

    };

  }



  static toDatabase(
    input: SupabaseProductCreateInput
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



  static toUpdate(
    input: SupabaseProductUpdateInput
  )
  {

    return {

      ...input,

      updated_at:
        new Date().toISOString(),

    };

  }


}



export const supabaseProductMapper =
  SupabaseProductMapper;
