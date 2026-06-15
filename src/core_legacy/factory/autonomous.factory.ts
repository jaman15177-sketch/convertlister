import { marketFitDetector } from "../intelligence/market-fit.detector";
import { trendDetector } from "../intelligence/trend.detector";
import { competitionDetector } from "../intelligence/competition.detector";
import { profitabilityEngine } from "../intelligence/profitability.engine";
import { winningProbabilityEngine } from "../intelligence/winning-probability.engine";
import { productRankingEngine } from "../intelligence/product-ranking.engine";

export type FactoryStage =
  | "IMPORT"
  | "SCORE"
  | "OPTIMIZE"
  | "RANK"
  | "PUBLISH";

export interface FactoryInput {
  productId: string;
  title: string;
  category?: string;
  price?: number;

  imagesCount?: number;
  descriptionLength?: number;

  tiktokMentions?: number;
  googleTrendScore?: number;
  amazonRankChange?: number;
  shopifyOrders24h?: number;
  socialEngagement?: number;
}

export interface FactoryResult {
  productId: string;

  stage: FactoryStage;

  marketFitScore: number;
  trendScore: number;
  competitionScore: number;
  profitScore: number;
  winningProbability: number;

  finalRankScore: number;

  decision:
    | "PUBLISH"
    | "OPTIMIZE"
    | "REJECT";

  signals: string[];
}

export class AutonomousFactory {
  async execute(
    input: FactoryInput
  ): Promise<FactoryResult> {
    const signals: string[] = [];

    // -------------------------
    // STAGE 1: MARKET FIT
    // -------------------------
    const marketFit =
      marketFitDetector.detect(input);

    signals.push(
      ...marketFit.reasons
    );

    // -------------------------
    // STAGE 2: TREND
    // -------------------------
    const trend =
      trendDetector.detect(input);

    signals.push(
      `Trend: ${trend.trendLevel}`
    );

    // -------------------------
    // STAGE 3: COMPETITION
    // -------------------------
    const competition =
      competitionDetector.detect({
        competitorCount: 100,
        averageRating: 4.5,
        averageReviewCount: 2000,
        topSellerDominance: 60,
        adDensity: 50,
      });

    signals.push(
      `Competition: ${competition.competitionLevel}`
    );

    // -------------------------
    // STAGE 4: PROFITABILITY
    // -------------------------
    const profit =
      profitabilityEngine.calculate({
        sellingPrice:
          input.price ?? 0,

        productCost:
          (input.price ?? 0) * 0.4,

        shippingCost: 3,
        adCost: 5,
        packagingCost: 1,
      });

    signals.push(
      `Profit: ${profit.verdict}`
    );

    // -------------------------
    // STAGE 5: WINNING PROBABILITY
    // -------------------------
    const win =
      winningProbabilityEngine.calculate(
        {
          marketFitScore:
            marketFit.score,

          trendScore:
            trend.trendScore,

          profitScore:
            profit.profitScore,

          competitionScore:
            competition.competitionScore,

          supplierScore: 80,
        }
      );

    // -------------------------
    // STAGE 6: FINAL RANK SCORE
    // -------------------------
    const finalRankScore =
      productRankingEngine.rank([
        {
          productId:
            input.productId,

          title: input.title,

          marketFitScore:
            marketFit.score,

          trendScore:
            trend.trendScore,

          winningProbability:
            win.winningProbability,

          profitabilityScore:
            profit.profitScore,

          competitionScore:
            competition.competitionScore,
        },
      ])[0].finalScore;

    // -------------------------
    // DECISION ENGINE
    // -------------------------
    let decision:
      | "PUBLISH"
      | "OPTIMIZE"
      | "REJECT";

    if (finalRankScore >= 80) {
      decision = "PUBLISH";
    } else if (
      finalRankScore >= 60
    ) {
      decision = "OPTIMIZE";
    } else {
      decision = "REJECT";
    }

    return {
      productId: input.productId,

      stage: "PUBLISH",

      marketFitScore:
        marketFit.score,

      trendScore: trend.trendScore,

      competitionScore:
        competition.competitionScore,

      profitScore: profit.profitScore,

      winningProbability:
        win.winningProbability,

      finalRankScore,

      decision,

      signals,
    };
  }
}

export const autonomousFactory =
  new AutonomousFactory();
