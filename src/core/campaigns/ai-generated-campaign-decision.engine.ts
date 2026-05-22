// ai-generated-campaign-decision.engine.ts
// PRODUCTION FINAL — AI Campaign Strategy & Decision Engine

/**
 * =========================================
 * TYPES
 * =========================================
 */

type CampaignInput = {
  id: string;
  productName: string;
  category: string;

  budget: number;

  trendScore: number;
  demandScore: number;
  marginScore: number;

  competitionLevel: number;
  saturationLevel: number;

  ctrExpectation: number;
  conversionExpectation: number;

  audienceQuality: number; // 0–100
};

type CampaignDecision =
  | "LAUNCH_AGGRESSIVE"
  | "LAUNCH_TEST"
  | "OPTIMIZE_BEFORE_LAUNCH"
  | "PAUSE"
  | "REJECT";

type CampaignResult = {
  campaignId: string;

  campaignScore: number;
  riskScore: number;
  confidence: number;

  decision: CampaignDecision;

  recommendedBudget: number;

  channels: string[];

  targetingLevel: "BROAD" | "NARROW" | "ULTRA_NARROW";

  reasoning: string[];

  predictedOutcome: {
    expectedROAS: number;
    expectedCTR: number;
    failureRisk: number;
  };
};

/**
 * =========================================
 * UTIL ENGINE
 * =========================================
 */

class MathUtil {
  static clamp(v: number, min = 0, max = 100) {
    return Math.max(min, Math.min(max, v));
  }

  static avg(arr: number[]) {
    if (!arr.length) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }
}

/**
 * =========================================
 * SCORING ENGINE
 * =========================================
 */

class CampaignScoringEngine {
  calculate(input: CampaignInput): number {
    const score =
      input.trendScore * 0.25 +
      input.demandScore * 0.20 +
      input.marginScore * 0.20 +
      input.audienceQuality * 0.15 +
      (100 - input.competitionLevel) * 0.10 +
      (100 - input.saturationLevel) * 0.10;

    return MathUtil.clamp(score);
  }
}

/**
 * =========================================
 * RISK ENGINE
 * =========================================
 */

class CampaignRiskEngine {
  calculate(input: CampaignInput): number {
    let risk = 0;

    if (input.competitionLevel > 70) risk += 30;
    if (input.saturationLevel > 70) risk += 25;
    if (input.audienceQuality < 40) risk += 20;
    if (input.trendScore < 40) risk += 15;
    if (input.marginScore < 30) risk += 10;

    return MathUtil.clamp(risk);
  }
}

/**
 * =========================================
 * BUDGET ENGINE
 * =========================================
 */

class BudgetEngine {
  calculate(input: CampaignInput, score: number): number {
    const base = input.budget;

    const multiplier =
      score > 80 ? 1.5 :
      score > 60 ? 1.2 :
      score > 40 ? 0.8 :
      0.5;

    return base * multiplier;
  }
}

/**
 * =========================================
 * CHANNEL ENGINE
 * =========================================
 */

class ChannelEngine {
  decide(input: CampaignInput, score: number): string[] {
    const channels: string[] = [];

    if (input.audienceQuality > 70 && score > 70) {
      channels.push("META_ADS");
      channels.push("GOOGLE_ADS");
    }

    if (input.trendScore > 75) {
      channels.push("TIKTOK_ADS");
    }

    if (input.demandScore > 70) {
      channels.push("YOUTUBE_ADS");
    }

    if (channels.length === 0) {
      channels.push("RESEARCH_ONLY");
    }

    return channels;
  }
}

/**
 * =========================================
 * TARGETING ENGINE
 * =========================================
 */

class TargetingEngine {
  decide(input: CampaignInput): CampaignResult["targetingLevel"] {
    if (input.audienceQuality > 80) return "NARROW";
    if (input.audienceQuality > 60) return "BROAD";
    return "ULTRA_NARROW";
  }
}

/**
 * =========================================
 * CONFIDENCE ENGINE
 * =========================================
 */

class ConfidenceEngine {
  calculate(score: number, risk: number): number {
    const confidence = score * 0.6 + (100 - risk) * 0.4;
    return MathUtil.clamp(confidence);
  }
}

/**
 * =========================================
 * DECISION ENGINE
 * =========================================
 */

class DecisionEngine {
  decide(score: number, risk: number): CampaignDecision {
    if (score > 80 && risk < 30) return "LAUNCH_AGGRESSIVE";
    if (score > 60 && risk < 50) return "LAUNCH_TEST";
    if (risk > 70) return "PAUSE";
    if (score < 40) return "REJECT";
    return "OPTIMIZE_BEFORE_LAUNCH";
  }
}

/**
 * =========================================
 * REASONING ENGINE
 * =========================================
 */

class ReasoningEngine {
  explain(input: CampaignInput, score: number, risk: number): string[] {
    const r: string[] = [];

    if (input.trendScore > 75) r.push("Strong trend signal detected");
    if (input.demandScore > 70) r.push("High demand potential");
    if (input.marginScore > 70) r.push("Healthy profit margin");
    if (input.competitionLevel > 70) r.push("High competition risk");
    if (input.saturationLevel > 70) r.push("Market saturation warning");
    if (score > 80) r.push("High campaign success probability");
    if (risk > 70) r.push("High failure risk detected");

    return r;
  }
}

/**
 * =========================================
 * PREDICTION ENGINE
 * =========================================
 */

class PredictionEngine {
  predict(score: number, risk: number) {
    return {
      expectedROAS: Math.max(0, score / 25),
      expectedCTR: Math.max(0, score / 20),
      failureRisk: risk,
    };
  }
}

/**
 * =========================================
 * MASTER CAMPAIGN ENGINE
 * =========================================
 */

export class AICampaignDecisionEngine {
  private scoring = new CampaignScoringEngine();
  private risk = new CampaignRiskEngine();
  private budget = new BudgetEngine();
  private channel = new ChannelEngine();
  private targeting = new TargetingEngine();
  private confidence = new ConfidenceEngine();
  private decision = new DecisionEngine();
  private reasoning = new ReasoningEngine();
  private prediction = new PredictionEngine();

  analyze(input: CampaignInput): CampaignResult {
    const campaignScore = this.scoring.calculate(input);
    const riskScore = this.risk.calculate(input);

    const confidence = this.confidence.calculate(campaignScore, riskScore);

    const decision = this.decision.decide(campaignScore, riskScore);

    const recommendedBudget = this.budget.calculate(input, campaignScore);

    const channels = this.channel.decide(input, campaignScore);

    const targetingLevel = this.targeting.decide(input);

    const reasoning = this.reasoning.explain(input, campaignScore, riskScore);

    const predictedOutcome = this.prediction.predict(campaignScore, riskScore);

    return {
      campaignId: input.id,

      campaignScore: Number(campaignScore.toFixed(2)),
      riskScore: Number(riskScore.toFixed(2)),
      confidence: Number(confidence.toFixed(2)),

      decision,

      recommendedBudget: Number(recommendedBudget.toFixed(2)),

      channels,

      targetingLevel,

      reasoning,

      predictedOutcome,
    };
  }
}

/**
 * =========================================
 * EXAMPLE RUN
 * =========================================
 */

const engine = new AICampaignDecisionEngine();

const result = engine.analyze({
  id: "camp_001",
  productName: "Wireless Earbuds",
  category: "Electronics",

  budget: 1000,

  trendScore: 85,
  demandScore: 80,
  marginScore: 75,

  competitionLevel: 45,
  saturationLevel: 30,

  ctrExpectation: 2.5,
  conversionExpectation: 4.2,

  audienceQuality: 78,
});

console.log(JSON.stringify(result, null, 2));
