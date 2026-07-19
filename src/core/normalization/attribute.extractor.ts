/**
 * ============================================================
 * CONVERTLISTER
 * ATTRIBUTE EXTRACTOR
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Extract product attributes
 * • Standardize common fields
 * • Prepare canonical identity data
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ AI prediction
 * ✗ Winning logic
 * ✗ Database access
 * ============================================================
 */


import type {
  NormalizedAttributes,
} from "./normalizer.types";



export class AttributeExtractor {



  /**
   * Extract attributes
   */
  public extract(
    input: Record<string, unknown>
  ): NormalizedAttributes {


    return {

      color:
        this.getValue(
          input,
          [
            "color",
            "colour",
          ]
        ),


      size:
        this.getValue(
          input,
          [
            "size",
            "dimension",
          ]
        ),


      material:
        this.getValue(
          input,
          [
            "material",
            "fabric",
            "type",
          ]
        ),


      brand:
        this.getValue(
          input,
          [
            "brand",
            "manufacturer",
          ]
        ),


      model:
        this.getValue(
          input,
          [
            "model",
            "modelNumber",
          ]
        ),


      variant:
        this.getValue(
          input,
          [
            "variant",
            "style",
          ]
        ),


    };

  }



  /**
   * Find first available value
   */
  private getValue(
    input: Record<string, unknown>,
    keys: string[]
  ): string | undefined {


    for (
      const key of keys
    ) {

      const value =
        input[key];


      if (
        typeof value === "string" &&
        value.trim()
      ) {

        return value.trim();

      }

    }


    return undefined;

  }


}



export const attributeExtractor =
  new AttributeExtractor();
