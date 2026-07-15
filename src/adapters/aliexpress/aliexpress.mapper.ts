/**
 * ==========================================================
 * ALIEXPRESS MAPPER
 * ==========================================================
 *
 * Maps AliExpress raw product data
 * into common AdapterProduct format.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Convert marketplace fields
 * • Prepare adapter output
 * • Keep source metadata
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Normalize business data
 * ✗ Create canonical identity
 * ✗ Save Universal Store
 * ✗ Make winning decision
 * ==========================================================
 */


import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  AliExpressRawProduct,
} from "./aliexpress.types";



export class AliExpressMapper {



  /**
   * Map single product
   */
  public map(
    product: AliExpressRawProduct
  ): AdapterProduct {


    return {

      id:
        product.id,


      title:
        product.title ?? "",


      price:
        Number(
          product.price ?? 0
        ),


      currency:
        product.currency ?? "USD",


      source:
        "aliexpress",


      images:
        product.images ?? [],


      metadata: {

        description:
          product.description,

        category:
          product.category,

        discount:
          product.discount,

        shippingCost:
          product.shippingCost,

        deliveryEstimate:
          product.deliveryEstimate,

        reviewCount:
          product.reviewCount,

        rating:
          product.rating,

        orders:
          product.orders,

        storeName:
          product.storeName,

        storeRating:
          product.storeRating,

        brand:
          product.brand,

        sku:
          product.sku,

        variants:
          product.variants,

        stock:
          product.stock,

        attributes:
          product.attributes,

        tags:
          product.tags,

        url:
          product.url,

        region:
          product.region,

      },

    };

  }



  /**
   * Map multiple products
   */
  public mapMany(
    products: AliExpressRawProduct[]
  ): AdapterProduct[] {


    return products.map(
      product =>
        this.map(product)
    );

  }


}



export const aliExpressMapper =
  new AliExpressMapper();
