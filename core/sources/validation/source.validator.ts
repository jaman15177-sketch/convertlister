export class SourceValidator {

  validate(output: any) {

    if (!output) {
      throw new Error("Source output is empty");
    }

    if (typeof output.source !== "string") {
      throw new Error("Invalid source type");
    }

    if (!Array.isArray(output.products)) {
      throw new Error("Products must be an array");
    }

    return {
      valid: true,
      data: output
    };
  }
}
