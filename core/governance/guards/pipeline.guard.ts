export class PipelineGuard {

  allow(product: any) {

    if (!product.title) {
      throw new Error("Pipeline blocked: missing title");
    }

    if (typeof product.price !== "number") {
      throw new Error("Pipeline blocked: invalid price");
    }

    return true;
  }
}
