/**
 * ============================================================
 * CONVERTLISTER
 * PRICE NORMALIZER
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Normalize product price
 * • Standardize currency
 * • Handle invalid values
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Currency exchange
 * ✗ Payment calculation
 * ✗ Profit logic
 * ============================================================
 */


import {
  NORMALIZER_DEFAULTS,
  NORMALIZER_PRICE_RULES,
} from "./normalizer.constants";

import type {
  NormalizedPrice,
} from "./normalizer.types";



export class PriceNormalizer {


  /**
   * Normalize price
   */
  public normalize(
    price: unknown,
    currency?: unknown
  ): NormalizedPrice {


    const amount =
      this.normalizeAmount(
        price
      );


    return {

      amount,

      currency:
        this.normalizeCurrency(
          currency
        ),

    };

  }



  /**
   * Normalize amount
   */
  private normalizeAmount(
    value: unknown
  ): number {


    const parsed =
      Number(value);



    if (
      !Number.isFinite(parsed) ||
      parsed <
      NORMALIZER_PRICE_RULES
        .minimumPrice
    ) {

      return NORMALIZER_PRICE_RULES
        .fallbackPrice;

    }



    return Number(
      parsed.toFixed(2)
    );

  }



  /**
   * Normalize currency
   */
  private normalizeCurrency(
    currency: unknown
  ): string {


    if (
      typeof currency !== "string" ||
      !currency.trim()
    ) {

      return NORMALIZER_DEFAULTS
        .currency;

    }



    return currency
      .trim()
      .toUpperCase();

  }


}



export const priceNormalizer =
  new PriceNormalizer();
