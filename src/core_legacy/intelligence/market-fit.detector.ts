export interface MarketFitResult {
  score: number;
  grade: "A" | "B" | "C" | "D";
  reasons: string[];
}

export interface ProductInput {
  title: string;
  category?: string;
  price?: number;
  imagesCount?: number;
  descriptionLength?: number;
}

export class MarketFitDetector {
  detect(product: ProductInput): MarketFitResult {
    let score = 0;
    const reasons: string[] = [];

    const title =
      (product.title || "").toLowerCase();

    const winningKeywords = [
      "wireless",
      "portable",
      "smart",
      "automatic",
      "rechargeable",
      "adjustable",
      "premium",
      "eco",
      "led",
      "foldable",
      "mini"
    ];

    const saturatedKeywords = [
      "generic",
      "basic",
      "simple"
    ];

    const keywordMatches =
      winningKeywords.filter(k =>
        title.includes(k)
      ).length;

    score += keywordMatches * 8;

    if (keywordMatches > 0) {
      reasons.push(
        `Winning keywords found: ${keywordMatches}`
      );
    }

    const saturatedMatches =
      saturatedKeywords.filter(k =>
        title.includes(k)
      ).length;

    score -= saturatedMatches * 5;

    if (
      product.price !== undefined
    ) {
      if (
        product.price >= 15 &&
        product.price <= 80
      ) {
        score += 20;
        reasons.push(
          "Healthy ecommerce price range"
        );
      } else {
        score += 5;
      }
    }

    if (
      product.imagesCount !== undefined
    ) {
      if (product.imagesCount >= 5) {
        score += 15;
        reasons.push(
          "Strong visual assets"
        );
      } else if (
        product.imagesCount >= 3
      ) {
        score += 8;
      }
    }

    if (
      product.descriptionLength !==
      undefined
    ) {
      if (
        product.descriptionLength >= 500
      ) {
        score += 15;
        reasons.push(
          "Detailed description"
        );
      } else if (
        product.descriptionLength >=
        200
      ) {
        score += 8;
      }
    }

    const highFitCategories = [
      "electronics",
      "fitness",
      "beauty",
      "pet",
      "baby"
    ];

    if (
      product.category &&
      highFitCategories.includes(
        product.category
      )
    ) {
      score += 20;
      reasons.push(
        "Historically strong category"
      );
    }

    score = Math.max(
      0,
      Math.min(100, score)
    );

    let grade:
      | "A"
      | "B"
      | "C"
      | "D";

    if (score >= 80) {
      grade = "A";
    } else if (score >= 60) {
      grade = "B";
    } else if (score >= 40) {
      grade = "C";
    } else {
      grade = "D";
    }

    return {
      score,
      grade,
      reasons,
    };
  }
}

export const marketFitDetector =
  new MarketFitDetector();
