export interface MetaAdSignal {
  impressions: number;
  clicks: number;
  conversions: number;

  spend: number;
  revenue: number;

  ctr?: number;
  cpc?: number;
  cpa?: number;
  roas?: number;

  frequency: number;
}

export interface MetaAdScoreResult {
  confidence: number;
  insights: string[];
}

export class MetaAdsAnalysisEngine {
  analyze(signal: MetaAdSignal): MetaAdScoreResult {
    let confidence = 50;
    const insights: string[] = [];

    // =========================
    // CTR SIGNAL
    // =========================
    if (signal.impressions > 0) {
      const ctr = signal.clicks / signal.impressions;
      if (ctr > 0.05) {
        confidence += 10;
        insights.push("High CTR performance");
      }
    }

    // =========================
    // CONVERSION SIGNAL
    // =========================
    if (signal.conversions > 50) {
      confidence += 10;
      insights.push("Strong conversion volume");
    }

    // =========================
    // ROAS SIGNAL (SAFE)
    // =========================
    const roas =
      signal.roas ??
      (signal.revenue && signal.spend ? signal.revenue / signal.spend : 0);

    if (typeof roas === "number" && roas > 2) {
      confidence += 10;
      insights.push("High ROAS performance");
    }

    // =========================
    // FREQUENCY PENALTY
    // =========================
    if (signal.frequency < 3) {
      confidence += 10;
      insights.push("Healthy ad frequency");
    } else {
      confidence -= 10;
      insights.push("Ad fatigue risk detected");
    }

    // =========================
    // FINAL CLAMP
    // =========================
    confidence = Math.max(0, Math.min(100, confidence));

    return {
      confidence,
      insights,
    };
  }
}
