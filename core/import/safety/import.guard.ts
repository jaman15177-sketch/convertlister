import { DedupService } from "./dedup.service";

export class ImportGuard {

  private dedup = new DedupService();

  validate(product: any) {

    // ❌ duplicate check
    if (this.dedup.isDuplicate(product)) {
      return {
        allowed: false,
        reason: "DUPLICATE_PRODUCT"
      };
    }

    // ❌ empty check
    if (!product.title || !product.price) {
      return {
        allowed: false,
        reason: "INVALID_PRODUCT"
      };
    }

    return {
      allowed: true
    };
  }
}
