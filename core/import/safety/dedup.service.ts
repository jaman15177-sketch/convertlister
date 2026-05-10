export class DedupService {

  private cache = new Set<string>();

  generateKey(product: any) {
    return `${product.title}-${product.price}-${product.marketplace}`;
  }

  isDuplicate(product: any) {
    const key = this.generateKey(product);

    if (this.cache.has(key)) {
      return true;
    }

    this.cache.add(key);
    return false;
  }
}
