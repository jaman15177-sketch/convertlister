/**
 * ==========================================================
 * WINNING RULES
 * ==========================================================
 *
 * Enterprise Winning Rule Engine
 *
 * Responsibilities
 * - Centralized scoring rules
 * - Rule weights
 * - Pure evaluation
 *
 * Rules
 * - No repository
 * - No detector
 * - No persistence
 * - Pure business rules
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

/* ==========================================================
 * RESULT
 * ==========================================================
 */

export interface WinningRuleResult {

  readonly name: string;

  readonly score: number;

  readonly passed: boolean;

  readonly reason: string;

}

/* ==========================================================
 * RULE
 * ==========================================================
 */

export interface WinningRule {

  readonly name: string;

  readonly weight: number;

  evaluate(
    product: NormalizedProduct
  ): WinningRuleResult;

}

/* ==========================================================
 * RULES
 * ==========================================================
 */

export const winningRules:
  readonly WinningRule[] = [

  {
    name: "Title",

    weight: 10,

    evaluate(product) {

      const passed =
        product.title.trim().length >= 20;

      return {

        name: "Title",

        score:
          passed ? 10 : 0,

        passed,

        reason:
          passed
            ? "Good title"
            : "Short title",

      };

    },

  },

  {
    name: "Description",

    weight: 10,

    evaluate(product) {

      const description =
  product.description ?? "";

const passed =
  description
    .trim()
    .length >= 100;
      return {

        name: "Description",

        score:
          passed ? 10 : 0,

        passed,

        reason:
          passed
            ? "Good description"
            : "Weak description",

      };

    },

  },

  {
    name: "Images",

    weight: 10,

    evaluate(product) {

      const passed =
        product.images.urls.length >= 3;

      return {

        name: "Images",

        score:
          passed ? 10 : 0,

        passed,

        reason:
          passed
            ? "Enough images"
            : "Few images",

      };

    },

  },

  {
    name: "Price",

    weight: 10,

    evaluate(product) {

      const passed =
        product.price.amount > 0;

      return {

        name: "Price",

        score:
          passed ? 10 : 0,

        passed,

        reason:
          passed
            ? "Valid price"
            : "Invalid price",

      };

    },

  },

  {
    name: "Attributes",

    weight: 10,

    evaluate(product) {

      const passed =
        Object.keys(
          product.attributes
        ).length > 0;

      return {

        name: "Attributes",

        score:
          passed ? 10 : 0,

        passed,

        reason:
          passed
            ? "Attributes available"
            : "No attributes",

      };

    },

  },

  {
    name: "Keywords",

    weight: 10,

    evaluate(product) {

      const passed =
        product.keywords.length >= 5;

      return {

        name: "Keywords",

        score:
          passed ? 10 : 0,

        passed,

        reason:
          passed
            ? "Good keywords"
            : "Weak keywords",

      };

    },

  },

  {
    name: "Brand",

    weight: 10,

    evaluate(product) {

      const passed =
        !!product.brand;

      return {

        name: "Brand",

        score:
          passed ? 10 : 0,

        passed,

        reason:
          passed
            ? "Brand available"
            : "Brand missing",

      };

    },

  },

  {
    name: "Category",

    weight: 10,

    evaluate(product) {

      const passed =
        !!product.category;

      return {

        name: "Category",

        score:
          passed ? 10 : 0,

        passed,

        reason:
          passed
            ? "Category available"
            : "Category missing",

      };

    },

  },

  {
    name: "Marketplace",

    weight: 10,

    evaluate(product) {

      const passed =
        !!product.marketplace;

      return {

        name: "Marketplace",

        score:
          passed ? 10 : 0,

        passed,

        reason:
          passed
            ? "Marketplace available"
            : "Marketplace missing",

      };

    },

  },

  {
    name: "Source",

    weight: 10,

    evaluate(product) {

      const passed =
        !!product.source;

      return {

        name: "Source",

        score:
          passed ? 10 : 0,

        passed,

        reason:
          passed
            ? "Source available"
            : "Source missing",

      };

    },

  },

];
