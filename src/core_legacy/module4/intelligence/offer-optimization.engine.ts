import { ProductInput } from "../00-interfaces";

export interface OfferOptimizationResult {
  productId: string;

  offerScore: number;

  offerType:
    | "FLASH_SALE"
    | "BUNDLE_OFFER"
    | "PREMIUM_VALUE"
    | "DISCOUNT_STRATEGY"
    | "PSYCHOLOGICAL_ANCHOR"
    | "LIMITED_TIME_EXCLUSIVE";

  optimizedPrice: number;

  originalPrice: number;

  discountPercentage: number;

  bundleSuggestion: string[];

  urgencyHooks: string[];

  valueStack: string[];

  scarcityTriggers: string[];

  bonusOffers: string[];

  recommendedHeadline: string;

  conversionBoostEstimate: number;

  confidence: number;
}

export class OfferOptimizationEngine {
  optimize(product: ProductInput): OfferOptimizationResult {
    const offerScore =
      this.calculateOfferScore(product);

    const offerType =
      this.getOfferType(product, offerScore);

    const optimizedPrice =
      this.calculateOptimizedPrice(product, offerType);

    const discountPercentage =
      this.calculateDiscount(product, optimizedPrice);

    const bundleSuggestion =
      this.generateBundles(product);

    const urgencyHooks =
      this.generateUrgencyHooks(product);

    const valueStack =
      this.generateValueStack(product);

    const scarcityTriggers =
      this.generateScarcityTriggers(product);

    const bonusOffers =
      this.generateBonusOffers(product);

    const recommendedHeadline =
      this.generateHeadline(product, offerType);

    const conversionBoostEstimate =
      this.calculateConversionBoost(offerScore);

    const confidence =
      this.calculateConfidence(product);

    return {
      productId: product.productId,
      offerScore,
      offerType,
      optimizedPrice,
      originalPrice: product.price,
      discountPercentage,
      bundleSuggestion,
      urgencyHooks,
      valueStack,
      scarcityTriggers,
      bonusOffers,
      recommendedHeadline,
      conversionBoostEstimate,
      confidence,
    };
  }

  // -----------------------------
  // OFFER SCORE ENGINE
  // -----------------------------
  private calculateOfferScore(product: ProductInput): number {
    let score = 40;

    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("limited")) score += 20;
    if (text.includes("discount")) score += 20;
    if (text.includes("bundle")) score += 25;
    if (product.price < 30) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // OFFER TYPE ENGINE
  // -----------------------------
  private getOfferType(
    product: ProductInput,
    score: number
  ): OfferOptimizationResult["offerType"] {
    const text = product.title.toLowerCase();

    if (score > 80) return "LIMITED_TIME_EXCLUSIVE";
    if (text.includes("bundle")) return "BUNDLE_OFFER";
    if (text.includes("premium")) return "PREMIUM_VALUE";
    if (product.price < 20) return "DISCOUNT_STRATEGY";

    if (score > 60) return "FLASH_SALE";

    return "PSYCHOLOGICAL_ANCHOR";
  }

  // -----------------------------
  // PRICE OPTIMIZATION ENGINE
  // -----------------------------
  private calculateOptimizedPrice(
    product: ProductInput,
    offerType: OfferOptimizationResult["offerType"]
  ): number {
    const price = product.price;

    switch (offerType) {
      case "FLASH_SALE":
        return Math.round(price * 0.8);

      case "DISCOUNT_STRATEGY":
        return Math.round(price * 0.7);

      case "BUNDLE_OFFER":
        return Math.round(price * 0.9);

      case "LIMITED_TIME_EXCLUSIVE":
        return Math.round(price * 0.85);

      default:
        return price;
    }
  }

  // -----------------------------
  // DISCOUNT ENGINE
  // -----------------------------
  private calculateDiscount(
    product: ProductInput,
    optimizedPrice: number
  ): number {
    if (product.price <= 0) return 0;

    const discount =
      ((product.price - optimizedPrice) /
        product.price) *
      100;

    return Math.round(Math.max(0, discount));
  }

  // -----------------------------
  // BUNDLE ENGINE
  // -----------------------------
  private generateBundles(product: ProductInput): string[] {
    return [
      "Buy 1 Get 1 Offer",
      "Premium Accessory Bundle",
      "Extended Warranty Pack",
    ];
  }

  // -----------------------------
  // URGENCY ENGINE
  // -----------------------------
  private generateUrgencyHooks(product: ProductInput): string[] {
    return [
      "Limited Time Offer",
      "Only Few Left in Stock",
      "Price Increasing Soon",
    ];
  }

  // -----------------------------
  // VALUE STACK ENGINE
  // -----------------------------
  private generateValueStack(product: ProductInput): string[] {
    return [
      "High Quality Guaranteed",
      "Fast Shipping Included",
      "Best Price Assurance",
      "Lifetime Value Benefit",
    ];
  }

  // -----------------------------
  // SCARCITY ENGINE
  // -----------------------------
  private generateScarcityTriggers(product: ProductInput): string[] {
    return [
      "Only 10 Left",
      "Hurry Before Stock Runs Out",
      "Exclusive Offer Ends Soon",
    ];
  }

  // -----------------------------
  // BONUS ENGINE
  // -----------------------------
  private generateBonusOffers(product: ProductInput): string[] {
    return [
      "Free Setup Guide",
      "Bonus Accessory Included",
      "VIP Support Access",
    ];
  }

  // -----------------------------
  // HEADLINE ENGINE
  // -----------------------------
  private generateHeadline(
    product: ProductInput,
    offerType: OfferOptimizationResult["offerType"]
  ): string {
    if (offerType === "LIMITED_TIME_EXCLUSIVE") {
      return `🔥 Exclusive Limited-Time Offer on ${product.title}`;
    }

    if (offerType === "FLASH_SALE") {
      return `⚡ Flash Sale: ${product.title} - Save Now`;
    }

    return `💡 Best Deal on ${product.title} Today`;
  }

  // -----------------------------
  // CONVERSION BOOST ENGINE
  // -----------------------------
  private calculateConversionBoost(score: number): number {
    if (score > 80) return 40;
    if (score > 60) return 25;
    if (score > 40) return 15;
    return 5;
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(product: ProductInput): number {
    let confidence = 65;

    if (product.price < 50) confidence += 10;
    if (product.title.length > 10) confidence += 10;

    return Math.min(100, confidence);
  }
}

export const offerOptimizationEngine =
  new OfferOptimizationEngine();
