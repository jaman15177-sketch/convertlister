// tiktok-trend-signal.engine.ts
// PRODUCTION FINAL — TikTok Trend Signal Intelligence Engine

/**
 * =========================================
 * TYPES
 * =========================================
 */

type TikTokSignal = {
  keyword: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  growthRate: number; // % growth per hour/day
  videoCount: number; // how many videos using trend
  avgWatchTime: number; // seconds
  engagementRate: number; // %
};

type TrendResult = {
  keyword: string;
  trendScore: number;
  viralityScore: number;
  momentumScore: number;
  saturationLevel: number;
  decision: "HOT" | "WARM" | "COLD" | "DECLINING";
  confidence: number;
  reasoning: string[];
};

/**
 * =========================================
 * UTIL ENGINE
 * =========================================
 */

class MathUtil {
  static clamp(value: number, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  }

  static normalize(value: number, max: number) {
    if (max === 0) return 0;
    return (value / max) * 100;
  }
}

/**
 * =========================================
 * VIRALITY ENGINE
 * =========================================
 */

class ViralityEngine {
  calculate(signal: TikTokSignal): number {
    const shareWeight = signal.shares * 0.4;
    const likeWeight = signal.likes * 0.2;
    const commentWeight = signal.comments * 0.2;
    const watchWeight = signal.avgWatchTime * 0.2;

    const raw =
      shareWeight +
      likeWeight +
      commentWeight +
      watchWeight;

    return MathUtil.clamp(raw / 1000);
  }
}

/**
 * =========================================
 * MOMENTUM ENGINE
 * =========================================
 */

class MomentumEngine {
  calculate(signal: TikTokSignal): number {
    const growth = signal.growthRate * 0.6;
    const engagement = signal.engagementRate * 0.4;

    return MathUtil.clamp(growth + engagement);
  }
}

/**
 * =========================================
 * SATURATION ENGINE
 * =========================================
 */

class SaturationEngine {
  calculate(signal: TikTokSignal): number {
    // More videos = higher saturation = lower opportunity
    const saturation =
      MathUtil.normalize(signal.videoCount, 100000);

    return MathUtil.clamp(saturation);
  }
}

/**
 * =========================================
 * TREND SCORING ENGINE
 * =========================================
 */

class TrendScoringEngine {
  calculate(input: {
    virality: number;
    momentum: number;
    saturation: number;
  }): number {
    const score =
      input.virality * 0.4 +
      input.momentum * 0.4 +
      (100 - input.saturation) * 0.2;

    return MathUtil.clamp(score);
  }
}

/**
 * =========================================
 * CONFIDENCE ENGINE
 * =========================================
 */

class ConfidenceEngine {
  calculate(
    score: number,
    signal: TikTokSignal
  ): number {
    let confidence = score * 0.6;

    if (signal.growthRate > 80) confidence += 10;
    if (signal.engagementRate > 70) confidence += 10;
    if (signal.avgWatchTime > 20) confidence += 10;

    return MathUtil.clamp(confidence);
  }
}

/**
 * =========================================
 * DECISION ENGINE
 * =========================================
 */

class DecisionEngine {
  decide(
    score: number,
    confidence: number,
    saturation: number
  ): TrendResult["decision"] {
    if (
      score > 80 &&
      confidence > 75 &&
      saturation < 50
    ) {
      return "HOT";
    }

    if (score > 60) return "WARM";

    if (score > 40) return "COLD";

    return "DECLINING";
  }
}

/**
 * =========================================
 * REASONING ENGINE
 * =========================================
 */

class ReasoningEngine {
  explain(
    signal: TikTokSignal,
    score: number
  ): string[] {
    const reasons: string[] = [];

    if (signal.growthRate > 70)
      reasons.push("High growth velocity detected");

    if (signal.engagementRate > 60)
      reasons.push("Strong audience engagement");

    if (signal.shares > 10000)
      reasons.push("High shareability factor");

    if (signal.videoCount < 5000)
      reasons.push("Low competition saturation");

    if (score > 80)
      reasons.push("Viral breakout pattern confirmed");

    if (score < 50)
      reasons.push("Weak trend momentum");

    return reasons;
  }
}

/**
 * =========================================
 * MASTER TIKTOK TREND ENGINE
 * =========================================
 */

export class TikTokTrendSignalEngine {
  private viralityEngine = new ViralityEngine();
  private momentumEngine = new MomentumEngine();
  private saturationEngine = new SaturationEngine();
  private scoringEngine = new TrendScoringEngine();
  private confidenceEngine = new ConfidenceEngine();
  private decisionEngine = new DecisionEngine();
  private reasoningEngine = new ReasoningEngine();

  analyze(signal: TikTokSignal): TrendResult {
    /**
     * STEP 1 — SIGNAL PROCESSING
     */
    const virality = this.viralityEngine.calculate(signal);
    const momentum = this.momentumEngine.calculate(signal);
    const saturation = this.saturationEngine.calculate(signal);

    /**
     * STEP 2 — TREND SCORE
     */
    const trendScore = this.scoringEngine.calculate({
      virality,
      momentum,
      saturation,
    });

    /**
     * STEP 3 — CONFIDENCE
     */
    const confidence = this.confidenceEngine.calculate(
      trendScore,
      signal
    );

    /**
     * STEP 4 — DECISION
     */
    const decision = this.decisionEngine.decide(
      trendScore,
      confidence,
      saturation
    );

    /**
     * STEP 5 — REASONING
     */
    const reasoning = this.reasoningEngine.explain(
      signal,
      trendScore
    );

    return {
      keyword: signal.keyword,
      trendScore: Number(trendScore.toFixed(2)),
      viralityScore: Number(virality.toFixed(2)),
      momentumScore: Number(momentum.toFixed(2)),
      saturationLevel: Number(saturation.toFixed(2)),
      decision,
      confidence: Number(confidence.toFixed(2)),
      reasoning,
    };
  }
}

/**
 * =========================================
 * EXAMPLE RUN
 * =========================================
 */

const engine = new TikTokTrendSignalEngine();

const result = engine.analyze({
  keyword: "wireless earbuds review",
  views: 1200000,
  likes: 250000,
  shares: 85000,
  comments: 42000,
  growthRate: 88,
  videoCount: 3200,
  avgWatchTime: 27,
  engagementRate: 79,
});

console.log(JSON.stringify(result, null, 2));
