import {
  ProductInput,
  ProductProfile,
} from "../00-interfaces";export class ProductUnderstandingEngine {
  analyze(
    product: ProductInput
  ): ProductProfile {
    const title =
      product.title?.trim() || "";

    const description =
      product.description?.trim() || "";

    const category =
      product.category || "general";

    const features =
      this.extractFeatures(
        title,
        description
      );

    const benefits =
      this.extractBenefits(
        features
      );

    const audience =
      this.detectAudience(
        title,
        description,
        category
      );

    const uniqueSellingPoints =
      this.detectUSP(
        title,
        features
      );

    return {
      productId:
        product.productId,

      title,

      category,

      features,

      benefits,

      audience,

      uniqueSellingPoints,
    };
  }

  private extractFeatures(
    title: string,
    description: string
  ): string[] {
    const text =
      `${title} ${description}`.toLowerCase();

    const features: string[] =
      [];

    const rules = [
      "wireless",
      "portable",
      "smart",
      "usb",
      "bluetooth",
      "waterproof",
      "led",
      "rechargeable",
      "mini",
      "foldable",
      "lightweight",
      "fast charging",
    ];

    for (const rule of rules) {
      if (text.includes(rule)) {
        features.push(rule);
      }
    }

    return [
      ...new Set(features),
    ];
  }

  private extractBenefits(
    features: string[]
  ): string[] {
    const benefits: string[] =
      [];

    const map: Record<
      string,
      string
    > = {
      wireless:
        "No cable restrictions",

      portable:
        "Easy to carry",

      smart:
        "Automation and convenience",

      waterproof:
        "Safe for outdoor use",

      rechargeable:
        "Lower long-term cost",

      bluetooth:
        "Easy connectivity",

      foldable:
        "Space saving",

      lightweight:
        "Comfortable daily use",

      led:
        "Energy efficient",
    };

    for (const feature of features) {
      if (map[feature]) {
        benefits.push(
          map[feature]
        );
      }
    }

    return benefits;
  }

  private detectAudience(
    title: string,
    description: string,
    category: string
  ): string[] {
    const text =
      `${title} ${description}`.toLowerCase();

    const audience =
      new Set<string>();

    if (
      text.includes("fitness")
    ) {
      audience.add(
        "fitness enthusiasts"
      );
    }

    if (
      text.includes("gaming")
    ) {
      audience.add("gamers");
    }

    if (
      text.includes("travel")
    ) {
      audience.add(
        "travelers"
      );
    }

    if (
      text.includes("office")
    ) {
      audience.add(
        "office workers"
      );
    }

    if (
      text.includes("home")
    ) {
      audience.add(
        "home users"
      );
    }

    if (
      audience.size === 0
    ) {
      audience.add(
        category.toLowerCase()
      );
    }

    return [...audience];
  }

  private detectUSP(
    title: string,
    features: string[]
  ): string[] {
    const usp: string[] =
      [];

    if (
      features.includes(
        "wireless"
      ) &&
      features.includes(
        "portable"
      )
    ) {
      usp.push(
        "Portable wireless convenience"
      );
    }

    if (
      features.includes(
        "smart"
      )
    ) {
      usp.push(
        "Smart automation capability"
      );
    }

    if (
      features.includes(
        "rechargeable"
      )
    ) {
      usp.push(
        "Long-term reusable product"
      );
    }

    if (
      usp.length === 0
    ) {
      usp.push(
        "Competitive market offer"
      );
    }

    return usp;
  }
}

export const productUnderstandingEngine =
  new ProductUnderstandingEngine();
