import { SourceOutput } from "./source.contract";

export class SourceEnforcer {

  enforce<T>(output: any): SourceOutput<T> {

    // 1. MUST exist
    if (!output) {
      throw new Error("SOURCE ERROR: Output is empty");
    }

    // 2. MUST have source
    if (typeof output.source !== "string") {
      throw new Error("SOURCE ERROR: 'source' must be string");
    }

    // 3. MUST be array
    if (!Array.isArray(output.products)) {
      throw new Error("SOURCE ERROR: 'products' must be array");
    }

    // 4. EMPTY array allowed but must exist
    if (output.products.length === undefined) {
      throw new Error("SOURCE ERROR: Invalid products structure");
    }

    return output;
  }
}
