type Platform =
  | "SHOPIFY"
  | "AMAZON"
  | "TIKTOK"
  | "META"
  | "ETSY";

type Metrics = {

  impressions: number;

  clicks: number;

  conversions: number;

  revenue: number;

  adSpend: number;

  addToCart?: number;

  bounceRate?: number;
};

type InputEvent = {

  id: string;

  creativeId: string;

  platform: Platform;

  metrics: Metrics;
};

type Decision =
  | "SCALE"
  | "OPTIMIZE"
  | "KILL"
  | "TEST_NEW_VARIANT";

type FeedbackOutput = {

  creativeId: string;

  platform: Platform;

  ctr: number;

  cvr: number;

  roas: number;

  engagementScore: number;

  efficiencyScore: number;

  performanceScore: number;

  decision: Decision;

  signals: string[];

  memoryState: {

    historicalScore: number[];

    trendDirection:
      "IMPROVING" |
      "STABLE" |
      "DECLINING";
  };

  metadata: {

    engineVersion: string;

    evaluatedAt: string;
  };
};

// ----------------------------------------------------
// MEMORY LAYER
// ----------------------------------------------------

const memoryStore = new Map<
  string,
  number[]
>();

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

function clamp(v: number, min: number, max: number) {

  return Math.max(min, Math.min(max, v));
}

function safeDiv(a: number, b: number) {

  return b === 0 ? 0 : a / b;
}

// ----------------------------------------------------
// CORE METRICS
// ----------------------------------------------------

function ctr(clicks: number, impressions: number) {

  return clamp(
    safeDiv(clicks, impressions) * 100,
    0,
    100
  );
}

function cvr(conversions: number, clicks: number) {

  return clamp(
    safeDiv(conversions, clicks) * 100,
    0,
    100
  );
}

function roas(revenue: number, spend: number) {

  return safeDiv(revenue, spend);
}

// ----------------------------------------------------
// SCORE ENGINE
// ----------------------------------------------------

function computeScores(
  ctrVal: number,
  cvrVal: number,
  roasVal: number
) {

  const engagement =
    ctrVal * 0.6 +
    cvrVal * 0.4;

  const efficiency =
    roasVal * 25;

  const performance =
    clamp(
      engagement * 0.4 +
      efficiency * 0.6,
      0,
      100
    );

  return {
    engagement,
    efficiency,
    performance,
  };
}

// ----------------------------------------------------
// DECISION ENGINE
// ----------------------------------------------------

function decide(
  performance: number,
  roasVal: number,
  ctrVal: number
): Decision {

  if (performance > 80 && roasVal > 2) {
    return "SCALE";
  }

  if (performance > 50) {
    return "OPTIMIZE";
  }

  if (roasVal < 1) {
    return "KILL";
  }

  if (ctrVal < 2) {
    return "TEST_NEW_VARIANT";
  }

  return "OPTIMIZE";
}

// ----------------------------------------------------
// SIGNAL ENGINE
// ----------------------------------------------------

function generateSignals(
  ctrVal: number,
  cvrVal: number,
  roasVal: number
): string[] {

  const signals: string[] = [];

  if (ctrVal < 2) {
    signals.push("Weak hook - improve creative opening");
  }

  if (cvrVal < 1.5) {
    signals.push("Low conversion - optimize offer or landing page");
  }

  if (roasVal < 1) {
    signals.push("Unprofitable - reduce spend or pause campaign");
  }

  if (roasVal > 3) {
    signals.push("High ROI - scale aggressively");
  }

  return signals;
}

// ----------------------------------------------------
// MEMORY ENGINE
// ----------------------------------------------------

function updateMemory(
  creativeId: string,
  score: number
) {

  const history =
    memoryStore.get(creativeId) || [];

  history.push(score);

  memoryStore.set(creativeId, history);

  return history;
}

function trend(
  history: number[]
): "IMPROVING" | "STABLE" | "DECLINING" {

  if (history.length < 2) return "STABLE";

  const last = history[history.length - 1];

  const prev = history[history.length - 2];

  if (last > prev + 2) return "IMPROVING";

  if (last < prev - 2) return "DECLINING";

  return "STABLE";
}

// ----------------------------------------------------
// MAIN ENGINE
// ----------------------------------------------------

export function analyticsFeedbackLoopEngine(
  input: InputEvent
): FeedbackOutput {

  const m = input.metrics;

  const ctrVal =
    ctr(m.clicks, m.impressions);

  const cvrVal =
    cvr(m.conversions, m.clicks);

  const roasVal =
    roas(m.revenue, m.adSpend);

  const {
    engagement,
    efficiency,
    performance,
  } = computeScores(
    ctrVal,
    cvrVal,
    roasVal
  );

  const decision =
    decide(
      performance,
      roasVal,
      ctrVal
    );

  const signals =
    generateSignals(
      ctrVal,
      cvrVal,
      roasVal
    );

  const history =
    updateMemory(
      input.creativeId,
      performance
    );

  return {

    creativeId: input.creativeId,

    platform: input.platform,

    ctr: ctrVal,

    cvr: cvrVal,

    roas: roasVal,

    engagementScore: engagement,

    efficiencyScore: efficiency,

    performanceScore: performance,

    decision,

    signals,

    memoryState: {

      historicalScore: history,

      trendDirection: trend(history),
    },

    metadata: {

      engineVersion:
        "v2-feedback-loop-production-final",

      evaluatedAt:
        new Date().toISOString(),
    },
  };
}
