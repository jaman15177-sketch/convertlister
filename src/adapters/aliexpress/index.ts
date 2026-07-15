/**
 * ==========================================================
 * ALIEXPRESS ADAPTER INDEX
 * ==========================================================
 *
 * Public exports for AliExpress Adapter module.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Central export point
 * • Hide internal file structure
 * • Provide clean imports
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Business logic
 * ✗ Runtime execution
 * ✗ Data processing
 * ==========================================================
 */


export {
  AliExpressAdapter,
  aliExpressAdapter,
} from "./aliexpress.adapter";


export {
  aliExpressClient,
  AliExpressClient,
} from "./aliexpress.client";


export {
  aliExpressAuth,
  AliExpressAuth,
} from "./aliexpress.auth";


export {
  aliExpressSearch,
  AliExpressSearch,
} from "./aliexpress.search";


export {
  aliExpressProduct,
  AliExpressProduct,
} from "./aliexpress.product";


export {
  aliExpressShipping,
  AliExpressShippingService,
} from "./aliexpress.shipping";


export {
  aliExpressReview,
  AliExpressReviewService,
} from "./aliexpress.review";


export {
  aliExpressStore,
  AliExpressStoreService,
} from "./aliexpress.store";


export {
  aliExpressInventory,
  AliExpressInventoryService,
} from "./aliexpress.inventory";


export {
  aliExpressCategory,
  AliExpressCategoryService,
} from "./aliexpress.category";


export {
  aliExpressMapper,
  AliExpressMapper,
} from "./aliexpress.mapper";


export {
  aliExpressValidator,
  AliExpressValidator,
} from "./aliexpress.validator";


export {
  aliExpressParser,
  AliExpressParser,
} from "./aliexpress.parser";


export {
  aliExpressRetry,
  AliExpressRetry,
} from "./aliexpress.client.retry";


export type {
  AliExpressRawProduct,
  AliExpressSearchQuery,
  AliExpressResponse,
  AliExpressShipping,
  AliExpressStore,
  AliExpressReview,
} from "./aliexpress.types";


export {
  AliExpressError,
  AliExpressAuthError,
  AliExpressApiError,
  AliExpressProductNotFoundError,
  AliExpressResponseError,
} from "./aliexpress.errors";
