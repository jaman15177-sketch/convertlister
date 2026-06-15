import {
  ProductInput,
  IntentProfile,
  EmotionTrigger,
} from "../00-interfaces";

export class CustomerPsychologyEngine {
  analyze(
    product: ProductInput
  ): IntentProfile {
    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    const emotions =
      this.detectEmotions(text);

    const intent =
      this.detectIntent(text);

    const keywords =
      this.extractPsychologyKeywords(text);

    const confidence =
      this.calculateConfidence(
        emotions,
        intent
      );

    return {
      intent,
      confidence,
      keywords,
      emotions,
    };
  }

  private detectIntent(
    text: string
  ): "LOW" | "MEDIUM" | "HIGH" | "BUY_NOW" {
    let score = 0;

    if (text.includes("buy")) score += 30;
    if (text.includes("cheap")) score += 15;
    if (text.includes("best")) score += 20;
    if (text.includes("limited")) score += 25;
    if (text.includes("discount")) score += 20;
    if (text.includes("offer")) score += 15;

    if (score >= 70) return "BUY_NOW";
    if (score >= 45) return "HIGH";
    if (score >= 25) return "MEDIUM";
    return "LOW";
  }

  private detectEmotions(
    text: string
  ): EmotionTrigger[] {
    const emotions: EmotionTrigger[] = [];

    if (text.includes("secure") || text.includes("safe")) {
      emotions.push("SECURITY");
    }

    if (text.includes("best") || text.includes("premium")) {
      emotions.push("STATUS");
    }

    if (text.includes("cheap") || text.includes("discount")) {
      emotions.push("GREED");
    }

    if (text.includes("limited") || text.includes("now")) {
      emotions.push("FEAR");
    }

    if (text.includes("why") || text.includes("how")) {
      emotions.push("CURIOSITY");
    }

    if (emotions.length === 0) {
      emotions.push("DESIRE");
    }

    return emotions;
  }

  private extractPsychologyKeywords(
    text: string
  ): string[] {
    const triggers = [
      "limited time",
      "exclusive",
      "premium",
      "discount",
      "best seller",
      "guarantee",
      "free shipping",
      "new arrival",
    ];

    return triggers.filter((t) =>
      text.includes(t.split(" ")[0])
    );
  }

  private calculateConfidence(
    emotions: EmotionTrigger[],
    intent: string
  ): number {
    let score = emotions.length * 15;

    if (intent === "BUY_NOW") score += 40;
    if (intent === "HIGH") score += 25;
    if (intent === "MEDIUM") score += 15;

    return Math.min(100, score);
  }
}

// ✅ FIX: INSTANCE EXPORT (CRITICAL)
export const customerPsychologyEngine =
  new CustomerPsychologyEngine();
