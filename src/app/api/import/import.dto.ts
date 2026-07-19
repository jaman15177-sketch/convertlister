import type { RawProduct } from "@/core/normalization/normalizer.types";
import type { AdapterQuery } from "@/adapters/core/adapter.contract";
import type { ImportSource } from "@/lib/core/import";
import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";
/**
 * ============================================================
 * MANUAL IMPORT REQUEST
 * ============================================================
 */

export interface ImportApiRequest {

  readonly source: ImportSource;

  readonly products: RawProduct[];

}

/**
 * ============================================================
 * MARKETPLACE IMPORT REQUEST
 * ============================================================
 */

export interface MarketplaceImportApiRequest {

  readonly source: ImportSource;

  readonly query: AdapterQuery;

}
export interface MarketplaceImportResponse {

  readonly success: boolean;

  readonly source: ImportSource;

  readonly products: readonly AdapterProduct[];
  readonly imported: number;

  readonly message: string;

}
