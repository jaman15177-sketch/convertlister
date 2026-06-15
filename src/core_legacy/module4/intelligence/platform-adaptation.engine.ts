import { ProductInput } from "../00-interfaces";

export type PlatformType =
  | "AMAZON"
  | "SHOPIFY"
  | "TIKTOK"
  | "FACEBOOK_ADS"
  | "GOOGLE_ADS"
  | "INSTAGRAM"
  | "LANDING_PAGE";

export interface PlatformAdaptationResult {
  productId: string;

  platform: PlatformType;

  adaptedTitle: string;

  adaptedDescription: string;

  adCopy: string;

  hook: string;

  cta: string;

  hashtags: string[];

  seoKeywords: string[];

  creativeDirection: string;

  conversionFocus:
    | "CLICK"
    | "VIEW"
    | "BUY"
    | "ENGAGE"
    | "RETARGET";

  emotionalTone:
    | "HYPE"
    | "TRUST"
    | "LUXURY"
    | "PROBLEM_SOLVING"
    | "URGENCY";

  estimatedCTRBoost: number;

  confidence: number;
}

export class PlatformAdaptationEngine {
  adapt(product: ProductInput): PlatformAdaptationResult[] {
    const platforms: PlatformType[] = [
      "AMAZON",
      "SHOPIFY",
      "TIKTOK",
      "FACEBOOK_ADS",
      "GOOGLE_ADS",
      "INSTAGRAM",
      "LANDING_PAGE",
    ];

    return platforms.map((platform) =>
      this.adaptToPlatform(product, platform)
    );
  }

  // -----------------------------
  // PLATFORM ADAPTATION CORE
  // -----------------------------
  private adaptToPlatform(
    product: ProductInput,
    platform: PlatformType
  ): PlatformAdaptationResult {
    const hook = this.generateHook(product, platform);

    const adaptedTitle = this.adaptTitle(product, platform);

    const adaptedDescription = this.adaptDescription(product, platform);

    const adCopy = this.generateAdCopy(product, platform);

    const cta = this.generateCTA(product, platform);

    const hashtags = this.generateHashtags(product, platform);

    const seoKeywords = this.generateKeywords(product, platform);

    const creativeDirection = this.getCreativeDirection(platform);

    const conversionFocus = this.getConversionFocus(platform);

    const emotionalTone = this.getEmotionalTone(product, platform);

    const estimatedCTRBoost = this.calculateCTRBoost(platform);

    const confidence = this.calculateConfidence(product, platform);

    return {
      productId: product.productId,
      platform,
      adaptedTitle,
      adaptedDescription,
      adCopy,
      hook,
      cta,
      hashtags,
      seoKeywords,
      creativeDirection,
      conversionFocus,
      emotionalTone,
      estimatedCTRBoost,
      confidence,
    };
  }

  // -----------------------------
  // TITLE ADAPTATION ENGINE
  // -----------------------------
  private adaptTitle(product: ProductInput, platform: PlatformType): string {
    const title = product.title;

    switch (platform) {
      case "AMAZON":
        return `${title} | High Quality & Fast Shipping`;

      case "SHOPIFY":
        return `🔥 ${title} - Limited Stock Available`;

      case "TIKTOK":
        return `You NEED this! ${title}`;

      case "FACEBOOK_ADS":
        return `${title} - Best Deal 2026`;

      case "GOOGLE_ADS":
        return `${title} - Buy Online at Best Price`;

      case "INSTAGRAM":
        return `✨ ${title} ✨`;

      case "LANDING_PAGE":
        return `Discover the Power of ${title}`;

      default:
        return title;
    }
  }

  // -----------------------------
  // DESCRIPTION ENGINE
  // -----------------------------
  private adaptDescription(
    product: ProductInput,
    platform: PlatformType
  ): string {
    const base = product.description || "High quality product";

    switch (platform) {
      case "AMAZON":
        return `${base} - Trusted quality, fast delivery, customer satisfaction guaranteed.`;

      case "TIKTOK":
        return `This is going VIRAL 🔥 Don't miss out!`;

      case "FACEBOOK_ADS":
        return `Limited time offer - grab yours now!`;

      case "SHOPIFY":
        return `Exclusive deal available only today.`;

      case "LANDING_PAGE":
        return `Experience premium quality and unmatched performance.`;

      default:
        return base;
    }
  }

  // -----------------------------
  // AD COPY ENGINE
  // -----------------------------
  private generateAdCopy(
    product: ProductInput,
    platform: PlatformType
  ): string {
    const title = product.title;

    if (platform === "TIKTOK") {
      return `🚀 Stop scrolling! ${title} is changing the game in 2026!`;
    }

    if (platform === "FACEBOOK_ADS") {
      return `🔥 Don't miss this exclusive offer on ${title}`;
    }

    if (platform === "GOOGLE_ADS") {
      return `Buy ${title} online at best price with fast delivery`;
    }

    return `Get ${title} today and upgrade your experience`;
  }

  // -----------------------------
  // HOOK ENGINE
  // -----------------------------
  private generateHook(
    product: ProductInput,
    platform: PlatformType
  ): string {
    const text = product.title.toLowerCase();

    if (platform === "TIKTOK") {
      return "THIS WILL CHANGE YOUR LIFE 🔥";
    }

    if (text.includes("smart")) {
      return "Smart Tech That Works Instantly";
    }

    return "Best Choice for Modern Users";
  }

  // -----------------------------
  // CTA ENGINE
  // -----------------------------
  private generateCTA(
    product: ProductInput,
    platform: PlatformType
  ): string {
    if (platform === "TIKTOK") return "Tap & Buy Now 🔥";
    if (platform === "FACEBOOK_ADS") return "Shop Now";
    if (platform === "GOOGLE_ADS") return "Buy Online Today";
    if (platform === "AMAZON") return "Add to Cart";
    if (platform === "SHOPIFY") return "Get Yours Now";

    return "Learn More";
  }

  // -----------------------------
  // HASHTAG ENGINE
  // -----------------------------
  private generateHashtags(
    product: ProductInput,
    platform: PlatformType
  ): string[] {
    if (platform !== "TIKTOK" && platform !== "INSTAGRAM") {
      return [];
    }

    return [
      "#trending",
      "#viral",
      "#mustbuy",
      "#2026product",
      "#tech",
    ];
  }

  // -----------------------------
  // SEO KEYWORDS ENGINE
  // -----------------------------
  private generateKeywords(
    product: ProductInput,
    platform: PlatformType
  ): string[] {
    return [
      product.title.toLowerCase(),
      "best price",
      "fast shipping",
      "online buy",
      "2026 trending",
    ];
  }

  // -----------------------------
  // CREATIVE DIRECTION ENGINE
  // -----------------------------
  private getCreativeDirection(platform: PlatformType): string {
    switch (platform) {
      case "TIKTOK":
        return "High-energy viral video style";

      case "FACEBOOK_ADS":
        return "Problem-solution focused ad";

      case "GOOGLE_ADS":
        return "Search intent optimized listing";

      case "AMAZON":
        return "Trust + review-driven content";

      case "SHOPIFY":
        return "Scarcity + urgency ecommerce style";

      case "INSTAGRAM":
        return "Aesthetic lifestyle branding";

      case "LANDING_PAGE":
        return "Deep conversion storytelling";

      default:
        return "Generic marketing creative";
    }
  }

  // -----------------------------
  // CONVERSION FOCUS ENGINE
  // -----------------------------
  private getConversionFocus(platform: PlatformType): PlatformAdaptationResult["conversionFocus"] {
    switch (platform) {
      case "TIKTOK":
        return "VIEW";

      case "GOOGLE_ADS":
        return "CLICK";

      case "AMAZON":
        return "BUY";

      case "SHOPIFY":
        return "BUY";

      case "FACEBOOK_ADS":
        return "ENGAGE";

      case "INSTAGRAM":
        return "ENGAGE";

      default:
        return "CLICK";
    }
  }

  // -----------------------------
  // EMOTIONAL TONE ENGINE
  // -----------------------------
  private getEmotionalTone(
    product: ProductInput,
    platform: PlatformType
  ): PlatformAdaptationResult["emotionalTone"] {
    if (platform === "TIKTOK") return "HYPE";
    if (platform === "AMAZON") return "TRUST";
    if (platform === "SHOPIFY") return "URGENCY";

    const text = product.title.toLowerCase();

    if (text.includes("luxury")) return "LUXURY";

    return "PROBLEM_SOLVING";
  }

  // -----------------------------
  // CTR BOOST ENGINE
  // -----------------------------
  private calculateCTRBoost(platform: PlatformType): number {
    switch (platform) {
      case "TIKTOK":
        return 45;

      case "FACEBOOK_ADS":
        return 30;

      case "GOOGLE_ADS":
        return 25;

      case "AMAZON":
        return 20;

      default:
        return 15;
    }
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(
    product: ProductInput,
    platform: PlatformType
  ): number {
    let confidence = 60;

    if (product.price < 50) confidence += 10;
    if (product.title.length > 10) confidence += 10;

    if (platform === "AMAZON") confidence += 10;

    return Math.min(100, confidence);
  }
}

export const platformAdaptationEngine =
  new PlatformAdaptationEngine();
