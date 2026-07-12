/**
 * ==========================================================
 * ALIEXPRESS PROFILE
 * ==========================================================
 *
 * Enterprise AliExpress CSV Profile
 *
 * Responsibilities
 * - AliExpress CSV metadata
 * - Header definition
 * - Column mapping
 *
 * Rules
 * - Configuration only
 * - No business logic
 * - No mapping logic
 * ==========================================================
 */

import type {
  CsvProfileContract,
} from "./profile.contract";

export const aliexpressProfile:
  CsvProfileContract = {

  definition: {

    name:
      "aliexpress",

    sourceType:
      "marketplace",

    version:
      "1.0",

    headers: [

      {
        name: "Product ID",
        required: true,
      },

      {
        name: "Product Title",
        required: true,
      },

      {
        name: "Price",
        required: true,
      },

      {
        name: "Currency",
        required: false,
      },

      {
        name: "Main Image",
        required: false,
      },

    ],

    columns: [

      {
        source: "Product ID",
        target: "id",
        required: true,
      },

      {
        source: "Product Title",
        target: "title",
        required: true,
      },

      {
        source: "Price",
        target: "price",
        required: true,
      },

      {
        source: "Currency",
        target: "currency",
        required: false,
      },

      {
        source: "Main Image",
        target: "images",
        required: false,
      },

    ],

  },

  async matches(
    headers
  ) {

    const required =
      this.definition.headers
        .filter(
          header => header.required
        );

    const matched =
      required.every(
        header =>
          headers.includes(
            header.name
          )
      );

    const confidence =
      Math.round(
        required.filter(
          header =>
            headers.includes(
              header.name
            )
        ).length
        * 100
        / required.length
      );

    return {

      matched,

      confidence,

    };

  },

};
