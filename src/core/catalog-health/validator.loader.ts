/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health
 * Validator Loader
 * ============================================================
 */

import { validatorRegistry } from "./validator.registry";

import { TitleValidator } from "./validators/title.validator";
import { DescriptionValidator } from "./validators/description.validator";
import { BulletPointValidator } from "./validators/bullet-point.validator";
import { BrandValidator } from "./validators/brand.validator";
import { CategoryValidator } from "./validators/category.validator";
import { PriceValidator } from "./validators/price.validator";
import { ImageValidator } from "./validators/image.validator";
import SEOValidator from "./validators/seo.validator";
import { DuplicateValidator } from "./validators/duplicate.validator";
import { VariantValidator } from "./validators/variant.validator";
import { MarketplaceValidator } from "./validators/marketplace.validator";

let loaded = false;

export function loadCatalogValidators(): void {
  if (loaded) {
    return;
  }

  validatorRegistry.register(new TitleValidator(), "title");
  validatorRegistry.register(new DescriptionValidator(), "description");
  validatorRegistry.register(new BulletPointValidator(), "bulletPoints");
  validatorRegistry.register(new BrandValidator(), "brand");
  validatorRegistry.register(new CategoryValidator(), "category");
  validatorRegistry.register(new PriceValidator(), "price");
  validatorRegistry.register(new ImageValidator(), "image");
  validatorRegistry.register(new SEOValidator(), "seo");
  validatorRegistry.register(new DuplicateValidator(), "duplicate");
  validatorRegistry.register(new VariantValidator(), "variant");
  validatorRegistry.register(new MarketplaceValidator(), "marketplace");

  loaded = true;
}
