import { Product } from "../product.model";

import { TitleEngine } from "../optimization/title.engine";
import { SEOEngine } from "../optimization/seo.engine";
import { BulletEngine } from "../optimization/bullet.engine";
import { PricingEngine } from "../optimization/pricing.engine";

import { ListingValidator } from "../validation/listing.validator";

export class OptimizeService {
  private titleEngine = new TitleEngine();
  private seoEngine = new SEOEngine();
  private bulletEngine = new BulletEngine();
  private pricingEngine = new PricingEngine();

  private validator = new ListingValidator();

  run(product: Product) {
    const optimizedTitle = this.titleEngine.generate(product);

    const valid = this.validator.validate(optimizedTitle);

    if (!valid) {
      throw new Error("Invalid title generated");
    }

    const seoKeywords = this.seoEngine.generate(product);

    const bulletPoints = this.bulletEngine.generate(product);

    const pricing = this.pricingEngine.calculate(product);

    return {
      optimizedTitle,
      seoKeywords,
      bulletPoints,
      ...pricing,
    };
  }
}
