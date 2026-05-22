import EventEmitter from "events";

// ======================================================
// SOURCE TYPES
// ======================================================

export type SignalSource =
  | "TIKTOK"
  | "META_ADS"
  | "ALIEXPRESS"
  | "SHOPIFY"
  | "GOOGLE_TRENDS";

// ======================================================
// RAW SIGNAL
// ======================================================

export type RawSignal = {

  source: SignalSource;

  productId: string;

  timestamp: number;

  metrics: {

    views?: number;

    likes?: number;

    comments?: number;

    shares?: number;

    orders?: number;

    reviews?: number;

    ctr?: number;

    cvr?: number;

    trendIndex?: number;
  };
};

// ======================================================
// NORMALIZED SIGNAL
// ======================================================

export type NormalizedSignal = {

  id: string;

  source: SignalSource;

  productId: string;

  velocityScore: number;

  engagementScore: number;

  demandScore: number;

  reliabilityScore: number;

  anomalyScore: number;

  finalSignalScore: number;

  metadata: {

    ingestedAt: string;

    engineVersion: string;
  };
};

// ======================================================
// EVENT BUS
// ======================================================

export const signalBus =
  new EventEmitter();

// ======================================================
// HELPERS
// ======================================================

function clamp(
  value: number,
  min: number,
  max: number
): number {

  return Math.max(
    min,
    Math.min(max, value)
  );
}

function normalize(
  value: number,
  max: number
): number {

  return clamp(
    (value / max) * 100,
    0,
    100
  );
}

function uniqueSignalId(
  signal: RawSignal
): string {

  return `${signal.source}-${signal.productId}-${signal.timestamp}`;
}

// ======================================================
// SOURCE RELIABILITY
// ======================================================

const SOURCE_CONFIDENCE = {

  TIKTOK: 75,

  META_ADS: 90,

  ALIEXPRESS: 88,

  SHOPIFY: 82,

  GOOGLE_TRENDS: 70,
};

// ======================================================
// IN-MEMORY DEDUP CACHE
// production -> redis
// ======================================================

const processedSignals =
  new Set<string>();

// ======================================================
// ANOMALY DETECTION
// ======================================================

function detectAnomaly(
  metrics: RawSignal["metrics"]
): number {

  let anomaly = 0;

  // fake engagement

  if (
    (metrics.likes || 0) > 50000 &&
    (metrics.comments || 0) < 100
  ) {
    anomaly += 40;
  }

  // suspicious views

  if (
    (metrics.views || 0) > 1000000 &&
    (metrics.shares || 0) < 10
  ) {
    anomaly += 30;
  }

  // impossible ctr

  if (
    (metrics.ctr || 0) > 35
  ) {
    anomaly += 25;
  }

  return clamp(
    anomaly,
    0,
    100
  );
}

// ======================================================
// NORMALIZATION ENGINE
// ======================================================

export function ingestSignal(
  signal: RawSignal
): NormalizedSignal | null {

  // -----------------------------------------
  // DEDUPLICATION
  // -----------------------------------------

  const signalId =
    uniqueSignalId(signal);

  if (
    processedSignals.has(signalId)
  ) {

    console.log(
      "⚠️ Duplicate signal skipped:",
      signalId
    );

    return null;
  }

  processedSignals.add(signalId);

  // -----------------------------------------
  // RAW METRICS
  // -----------------------------------------

  const metrics =
    signal.metrics;

  // -----------------------------------------
  // ENGAGEMENT SCORE
  // -----------------------------------------

  const engagementRaw =

    (metrics.likes || 0) * 0.30 +

    (metrics.comments || 0) * 0.25 +

    (metrics.shares || 0) * 0.45;

  const engagementScore =

    normalize(
      engagementRaw,
      100000
    );

  // -----------------------------------------
  // DEMAND SCORE
  // -----------------------------------------

  const demandRaw =

    (metrics.orders || 0) * 0.70 +

    (metrics.reviews || 0) * 0.30;

  const demandScore =

    normalize(
      demandRaw,
      25000
    );

  // -----------------------------------------
  // VELOCITY SCORE
  // -----------------------------------------

  const velocityRaw =

    (metrics.views || 0) * 0.40 +

    (metrics.trendIndex || 0) * 0.60;

  const velocityScore =

    normalize(
      velocityRaw,
      1000000
    );

  // -----------------------------------------
  // RELIABILITY
  // -----------------------------------------

  const reliabilityScore =

    SOURCE_CONFIDENCE[
      signal.source
    ];

  // -----------------------------------------
  // ANOMALY
  // -----------------------------------------

  const anomalyScore =

    detectAnomaly(metrics);

  // -----------------------------------------
  // FINAL SIGNAL SCORE
  // -----------------------------------------

  let finalSignalScore =

    (velocityScore * 0.30) +

    (engagementScore * 0.25) +

    (demandScore * 0.25) +

    (reliabilityScore * 0.20);

  // anomaly dampening

  finalSignalScore =

    finalSignalScore -

    (anomalyScore * 0.25);

  finalSignalScore =

    clamp(
      finalSignalScore,
      0,
      100
    );

  // -----------------------------------------
  // NORMALIZED SIGNAL
  // -----------------------------------------

  const normalizedSignal = {

    id: signalId,

    source:
      signal.source,

    productId:
      signal.productId,

    velocityScore:
      Number(
        velocityScore.toFixed(2)
      ),

    engagementScore:
      Number(
        engagementScore.toFixed(2)
      ),

    demandScore:
      Number(
        demandScore.toFixed(2)
      ),

    reliabilityScore,

    anomalyScore,

    finalSignalScore:
      Number(
        finalSignalScore.toFixed(2)
      ),

    metadata: {

      ingestedAt:
        new Date().toISOString(),

      engineVersion:
        "v3-production",
    },
  };

  // -----------------------------------------
  // EVENT EMIT
  // -----------------------------------------

  signalBus.emit(
    "signal.ingested",
    normalizedSignal
  );

  return normalizedSignal;
}

// ======================================================
// REAL-TIME SIGNAL COLLECTORS
// ======================================================

export async function collectTikTokSignals() {

  const fakeSignal: RawSignal = {

    source: "TIKTOK",

    productId: "viral-tiktok-product",

    timestamp: Date.now(),

    metrics: {

      views: 850000,

      likes: 42000,

      comments: 3800,

      shares: 9500,

      trendIndex: 92,

      ctr: 7.5,
    },
  };

  return ingestSignal(fakeSignal);
}

export async function collectMetaAdSignals() {

  const fakeSignal: RawSignal = {

    source: "META_ADS",

    productId: "meta-winning-product",

    timestamp: Date.now(),

    metrics: {

      views: 520000,

      likes: 12000,

      comments: 800,

      shares: 2100,

      ctr: 5.2,

      cvr: 3.8,

      trendIndex: 78,
    },
  };

  return ingestSignal(fakeSignal);
}

export async function collectAliExpressSignals() {

  const fakeSignal: RawSignal = {

    source: "ALIEXPRESS",

    productId: "aliexpress-trending-product",

    timestamp: Date.now(),

    metrics: {

      orders: 9200,

      reviews: 1800,

      trendIndex: 88,
    },
  };

  return ingestSignal(fakeSignal);
}

// ======================================================
// REAL-TIME ORCHESTRATOR
// ======================================================

export async function startRealtimeCollectors() {

  console.log(
    "🚀 REALTIME SIGNAL COLLECTORS STARTED"
  );

  setInterval(async () => {

    await collectTikTokSignals();

    await collectMetaAdSignals();

    await collectAliExpressSignals();

  }, 5000);
}

// ======================================================
// EVENT SUBSCRIBERS
// ======================================================

signalBus.on(
  "signal.ingested",
  (signal: NormalizedSignal) => {

    console.log(
      "\n📡 SIGNAL INGESTED:"
    );

    console.dir(signal, {
      depth: null,
    });
  }
);
