import { ProductInput } from "../00-interfaces";

export interface ConversionCopyResult {
  productId: string;

  title: string;

  hook: string;

  primaryCopy: string;

  bulletPoints: string[];

  emotionalTrigger: string;

  painPoints: string[];

  benefits: string[];

  objectionsHandled: string[];

  callToAction: string;

  adVariants: {
    facebook: string;
    google: string;
    tiktok: string;
  };

  landingPageHeadline: string;

  landingPageSubheadline: string;

  seoDescription: string;

  conversionScore: number;

  confidence: number;
}

export class ConversionCopyGeneratorEngine {
  generate(product: ProductInput): ConversionCopyResult {
    const hook = this.generateHook(product);

    const emotionalTrigger =
      this.detectEmotionalTrigger(product);

    const painPoints =
      this.generatePainPoints(product);

    const benefits =
      this.generateBenefits(product);

    const objectionsHandled =
      this.handleObjections(product);

    const primaryCopy =
      this.generatePrimaryCopy(product, benefits, painPoints);

    const bulletPoints =
      this.generateBulletPoints(benefits);

    const callToAction =
      this.generateCTA(product);

    const adVariants =
      this.generateAdVariants(product, hook);

    const landingPageHeadline =
      this.generateLandingHeadline(product);

    const landingPageSubheadline =
      this.generateLandingSubheadline(product);

    const seoDescription =
      this.generateSEO(product);

    const conversionScore =
      this.calculateScore(product, benefits, painPoints);

    const confidence =
      this.calculateConfidence(product);

    return {
      productId: product.productId,
      title: product.title,
      hook,
      primaryCopy,
      bulletPoints,
      emotionalTrigger,
      painPoints,
      benefits,
      objectionsHandled,
      callToAction,
      adVariants,
      landingPageHeadline,
      landingPageSubheadline,
      seoDescription,
      conversionScore,
      confidence,
    };
  }

  // -----------------------------
  // HOOK ENGINE (ATTENTION GRABBER)
  // -----------------------------
  private generateHook(product: ProductInput): string {
    const text = product.title.toLowerCase();

    if (text.includes("portable")) {
      return "🚀 The Ultimate Portable Solution You Didn’t Know You Needed";
    }

    if (text.includes("smart")) {
      return "🧠 Smart Technology That Works For You Instantly";
    }

    return "🔥 This Product Is Changing the Game in 2026";
  }

  // -----------------------------
  // EMOTIONAL TRIGGER ENGINE
  // -----------------------------
  private detectEmotionalTrigger(product: ProductInput): string {
    const text = product.title.toLowerCase();

    if (text.includes("cheap")) return "VALUE_SEEKING";
    if (text.includes("premium")) return "STATUS_DESIRE";
    if (text.includes("fast")) return "SPEED_DESIRE";

    return "CONVENIENCE_DESIRE";
  }

  // -----------------------------
  // PAIN POINT ENGINE
  // -----------------------------
  private generatePainPoints(product: ProductInput): string[] {
    return [
      "Tired of inefficient traditional solutions",
      "Frustrated with limited usability",
      "Need faster and easier alternatives",
    ];
  }

  // -----------------------------
  // BENEFIT ENGINE
  // -----------------------------
  private generateBenefits(product: ProductInput): string[] {
    return [
      "Saves time instantly",
      "Easy to use with no setup",
      "Portable and flexible design",
      "Long-term cost efficient",
    ];
  }

  // -----------------------------
  // OBJECTION HANDLING ENGINE
  // -----------------------------
  private handleObjections(product: ProductInput): string[] {
    return [
      "No complicated installation required",
      "Works out of the box",
      "Affordable for all users",
      "Durable and long-lasting",
    ];
  }

  // -----------------------------
  // PRIMARY SALES COPY ENGINE
  // -----------------------------
  private generatePrimaryCopy(
    product: ProductInput,
    benefits: string[],
    painPoints: string[]
  ): string {
    return `
🔥 ${product.title} — Designed for Maximum Efficiency

Tired of slow, outdated solutions?

This product is built to solve real problems:

${painPoints.map(p => `• ${p}`).join("\n")}

Why users love it:

${benefits.map(b => `✔ ${b}`).join("\n")}

👉 Experience a smarter way to solve your needs today.
    `.trim();
  }

  // -----------------------------
  // BULLET POINT ENGINE
  // -----------------------------
  private generateBulletPoints(benefits: string[]): string[] {
    return benefits.map(
      b => `✔ ${b}`
    );
  }

  // -----------------------------
  // CTA ENGINE
  // -----------------------------
  private generateCTA(product: ProductInput): string {
    if (product.price < 30) {
      return "🔥 Buy Now Before Stock Runs Out";
    }

    return "👉 Get Yours Today & Upgrade Your Experience";
  }

  // -----------------------------
  // AD VARIANT ENGINE
  // -----------------------------
  private generateAdVariants(product: ProductInput, hook: string) {
    return {
      facebook: `${hook} | Limited Offer Available Now!`,
      google: `${product.title} - Best Price & Fast Shipping`,
      tiktok: `You NEED this! ${product.title} 🔥`,
    };
  }

  // -----------------------------
  // LANDING PAGE ENGINE
  // -----------------------------
  private generateLandingHeadline(product: ProductInput): string {
    return `The Smart Way to Use ${product.title}`;
  }

  private generateLandingSubheadline(product: ProductInput): string {
    return "High performance. Simple usage. Maximum results.";
  }

  // -----------------------------
  // SEO ENGINE
  // -----------------------------
  private generateSEO(product: ProductInput): string {
    return `${product.title} - best price, fast delivery, smart solution 2026`;
  }

  // -----------------------------
  // SCORE ENGINE
  // -----------------------------
  private calculateScore(
    product: ProductInput,
    benefits: string[],
    painPoints: string[]
  ): number {
    let score = 40;

    if (benefits.length > 3) score += 20;
    if (painPoints.length > 2) score += 15;
    if (product.price < 50) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(product: ProductInput): number {
    let confidence = 60;

    if (product.title.length > 10) confidence += 10;
    if (product.price < 50) confidence += 10;

    return Math.min(100, confidence);
  }
}

export const conversionCopyGeneratorEngine =
  new ConversionCopyGeneratorEngine();
