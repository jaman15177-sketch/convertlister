export interface TrendInput {
  productId: string;
  title: string;
  price?: number;
  category?: string;
}

export interface TrendSignal {
  source: string;
  score: number;
}

export interface TrendResult {
  trendScore: number;
  trendLevel: "HOT" | "WARM" | "COLD";
  confidence: number;
  signals: TrendSignal[];
}

export class TrendDetector {
  private readonly viralKeywords = [
    "wireless",
    "smart",
    "portable",
    "automatic",
    "rechargeable",
    "adjustable",
    "premium",
    "eco",
    "led",
    "foldable",
    "mini",
    "pro",
    "max",
    "pet",
    "fitness",
    "beauty",
  ];

  detect(
    input: TrendInput
  ): TrendResult {
    const title = (
      input.title || ""
    ).toLowerCase();

    let score = 0;

    const keywordMatches =
      this.viralKeywords.filter(
        (k) => title.includes(k)
      ).length;

    score += keywordMatches * 8;

    if (
      input.price !== undefined
    ) {
      if (
        input.price >= 15 &&
        input.price <= 80
      ) {
        score += 20;
      } else if (
        input.price >= 10 &&
        input.price <= 120
      ) {
        score += 10;
      }
    }

    const categoryBoost: Record<
      string,
      number
    > = {
      electronics: 15,
      fitness: 12,
      beauty: 12,
      pet: 10,
      baby: 10,
    };

    if (
      input.category &&
      categoryBoost[
        input.category.toLowerCase()
      ]
    ) {
      score +=
        categoryBoost[
          input.category.toLowerCase()
        ];
    }

    score = Math.max(
      5,
      Math.min(100, score)
    );

    let trendLevel:
      | "HOT"
      | "WARM"
      | "COLD";

    if (score >= 70) {
      trendLevel = "HOT";
    } else if (score >= 40) {
      trendLevel = "WARM";
    } else {
      trendLevel = "COLD";
    }

    const confidence =
      Math.min(
        1,
        0.4 +
          keywordMatches * 0.08
      );

    const signals: TrendSignal[] = [
      {
        source: "keyword_engine",
        score,
      },
    ];

    return {
      trendScore: score,
      trendLevel,
      confidence,
      signals,
    };
  }
}

export const trendDetector =
  new TrendDetector();
