/**
 * ==========================================================
 * WINNING RULES
 * ==========================================================
 *
 * Enterprise Winning Rule Library
 *
 * Responsibilities
 * - Evaluate independent rules
 * - Produce rule results
 * - No scoring
 * - No confidence
 * - No ranking
 * - No detector logic
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

/* ==========================================================
 * RULE
 * ==========================================================
 */

export interface WinningRule {

  readonly id: string;

  readonly name: string;

  readonly weight: number;

  evaluate(
    product: NormalizedProduct
  ): boolean;

}

/* ==========================================================
 * RULE RESULT
 * ==========================================================
 */

export interface WinningRuleResult {

  readonly id: string;

  readonly name: string;

  readonly weight: number;

  readonly passed: boolean;

}

/* ==========================================================
 * RULE LIBRARY
 * ==========================================================
 */

export class WinningRules {

  private constructor() {}

  static readonly rules:
    readonly WinningRule[] = [

    {
      id: "title",

      name: "Good Title",

      weight: 10,

      evaluate: product =>
        product.title.trim().length >= 20,
    },

    {
      id: "description",

      name: "Good Description",

      weight: 10,

      evaluate: product =>
        (product.description?.trim().length ?? 0) >=
        100,
    },

    {
      id: "images",

      name: "Enough Images",

      weight: 10,

      evaluate: product =>
        product.images.urls.length >= 3,
    },

    {
      id: "price",

      name: "Valid Price",

      weight: 10,

      evaluate: product =>
        product.price.amount > 0,
    },

    {
      id: "attributes",

      name: "Has Attributes",

      weight: 10,

      evaluate: product =>
        Object.keys(
          product.attributes
        ).length > 0,
    },

    {
      id: "keywords",

      name: "Good Keywords",

      weight: 10,

      evaluate: product =>
        product.keywords.length >= 5,
    },

    {
      id: "brand",

      name: "Brand",

      weight: 10,

      evaluate: product =>
        Boolean(product.brand),
    },

    {
      id: "category",

      name: "Category",

      weight: 10,

      evaluate: product =>
        Boolean(product.category),
    },

    {
      id: "marketplace",

      name: "Marketplace",

      weight: 10,

      evaluate: product =>
        Boolean(product.marketplace),
    },

    {
      id: "source",

      name: "Source",

      weight: 10,

      evaluate: product =>
        Boolean(product.source),
    },

  ];

  /* ========================================================
   * EXECUTE
   * ========================================================
   */

  static evaluate(
    product: NormalizedProduct
  ): readonly WinningRuleResult[] {

    return this.rules.map(
      rule => ({

        id: rule.id,

        name: rule.name,

        weight: rule.weight,

        passed:
          rule.evaluate(
            product
          ),

      })
    );

  }

}
