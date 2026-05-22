type Platform =
  | "SHOPIFY"
  | "AMAZON"
  | "TIKTOK"
  | "META"
  | "ETSY";

type Positioning =
  | "PREMIUM"
  | "MASS"
  | "BUDGET"
  | "NICHE";

type CreativeInput = {

  productName: string;

  category: string;

  audience: string;

  benefits: string[];

  painPoints: string[];

  keywords: string[];

  positioning: Positioning;

  platform: Platform;

  trendScore: number;

  emotionalTriggers?: string[];
};

type CreativeVariant = {

  id: string;

  title: string;

  hook: string;

  bullets: string[];

  description: string;

  cta: string;

  angle: string;

  platformFitScore: number;

  engagementScore: number;

  conversionScore: number;

  trustScore: number;

  finalScore: number;
};

type CreativeOSOutput = {

  winner: CreativeVariant;

  rankedVariants: CreativeVariant[];

  experimentationQueue: CreativeVariant[];

  platformStrategy: string;

  recommendations: string[];

  metadata: {
    engineVersion: string;
    generatedAt: string;
  };
};

// ----------------------------------------------------
// CREATIVE MEMORY SYSTEM
// ----------------------------------------------------

const creativeMemory = {

  highPerformingAngles: [
    "Problem → Solution",
    "Before vs After",
    "Transformation Story",
    "Social Proof",
    "Trend Explosion",
  ],

  highPerformingHooks: [
    "Still struggling with",
    "Why everyone is switching",
    "The smarter way to",
    "This trend is exploding",
  ],

  bannedPatterns: [
    "best product ever",
    "guaranteed results",
    "instant success",
  ],
};

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalize(v: number) {
  return clamp(v, 0, 100);
}

// ----------------------------------------------------
// PLATFORM STRATEGY
// ----------------------------------------------------

function getPlatformStrategy(
  platform: Platform
): string {

  switch (platform) {

    case "AMAZON":
      return "SEO + trust + conversion";

    case "SHOPIFY":
      return "Brand storytelling + retention";

    case "TIKTOK":
      return "Fast hooks + emotional momentum";

    case "META":
      return "Scroll-stopping emotional creative";

    case "ETSY":
      return "Lifestyle + handcrafted positioning";

    default:
      return "General optimization";
  }
}

// ----------------------------------------------------
// TITLE ENGINE
// ----------------------------------------------------

function generateTitle(
  input: CreativeInput
): string {

  const keyword =
    input.keywords[0] || input.category;

  switch (input.platform) {

    case "AMAZON":
      return `${input.productName} | ${keyword} for ${input.audience}`;

    case "TIKTOK":
      return `Why ${input.productName} is Going Viral`;

    case "META":
      return `${input.productName} Changed Everything`;

    default:
      return `${input.productName} — Premium ${input.category}`;
  }
}

// ----------------------------------------------------
// HOOK ENGINE
// ----------------------------------------------------

function generateHook(
  input: CreativeInput
): string {

  const pain =
    input.painPoints[0] || "daily frustration";

  const emotional =
    input.emotionalTriggers?.[0] || "confidence";

  const hooks = [

    `Still struggling with ${pain}?`,

    `Why everyone is switching to ${input.productName}.`,

    `The smarter way to improve your ${input.category}.`,

    `Unlock more ${emotional} with ${input.productName}.`,

    `This trend is exploding for a reason.`,
  ];

  return random(hooks);
}

// ----------------------------------------------------
// BULLET ENGINE
// ----------------------------------------------------

function generateBullets(
  input: CreativeInput
): string[] {

  return input.benefits.map((benefit) => {

    return `✔ ${benefit}`;
  });
}

// ----------------------------------------------------
// DESCRIPTION ENGINE
// ----------------------------------------------------

function generateDescription(
  input: CreativeInput
): string {

  return `${input.productName} helps ${input.audience} achieve ${input.benefits.join(", ")} while solving ${input.painPoints.join(", ")}. Designed for performance, usability, and modern expectations.`;
}

// ----------------------------------------------------
// CTA ENGINE
// ----------------------------------------------------

function generateCTA(
  positioning: Positioning
): string {

  switch (positioning) {

    case "PREMIUM":
      return "Upgrade Your Experience";

    case "BUDGET":
      return "Get More for Less";

    case "NICHE":
      return "Discover the Difference";

    default:
      return "Try It Today";
  }
}

// ----------------------------------------------------
// ANGLE ENGINE
// ----------------------------------------------------

function generateAngle(): string {

  return random(
    creativeMemory.highPerformingAngles
  );
}

// ----------------------------------------------------
// SAFETY FILTER
// ----------------------------------------------------

function passesSafetyFilter(
  text: string
): boolean {

  const lower = text.toLowerCase();

  return !creativeMemory.bannedPatterns.some(
    pattern => lower.includes(pattern)
  );
}

// ----------------------------------------------------
// SCORING ENGINE
// ----------------------------------------------------

function scoreVariant(
  variant: CreativeVariant,
  input: CreativeInput
): CreativeVariant {

  let platformFit = 50;

  if (
    input.platform === "TIKTOK" &&
    variant.hook.includes("viral")
  ) {
    platformFit += 20;
  }

  if (
    input.platform === "AMAZON" &&
    variant.title.length < 120
  ) {
    platformFit += 20;
  }

  let engagement = 50;

  if (
    creativeMemory.highPerformingHooks.some(
      h => variant.hook.includes(h)
    )
  ) {
    engagement += 25;
  }

  engagement += input.trendScore * 0.2;

  let conversion = 50;

  if (variant.bullets.length >= 3) {
    conversion += 20;
  }

  if (
    creativeMemory.highPerformingAngles.includes(
      variant.angle
    )
  ) {
    conversion += 20;
  }

  let trust = 60;

  if (
    passesSafetyFilter(
      variant.description
    )
  ) {
    trust += 20;
  }

  variant.platformFitScore =
    normalize(platformFit);

  variant.engagementScore =
    normalize(engagement);

  variant.conversionScore =
    normalize(conversion);

  variant.trustScore =
    normalize(trust);

  variant.finalScore = normalize(

    variant.platformFitScore * 0.25 +

    variant.engagementScore * 0.3 +

    variant.conversionScore * 0.3 +

    variant.trustScore * 0.15
  );

  return variant;
}

// ----------------------------------------------------
// VARIANT FACTORY
// ----------------------------------------------------

function createVariant(
  input: CreativeInput,
  index: number
): CreativeVariant {

  const variant: CreativeVariant = {

    id: `creative-${Date.now()}-${index}`,

    title: generateTitle(input),

    hook: generateHook(input),

    bullets: generateBullets(input),

    description: generateDescription(input),

    cta: generateCTA(input.positioning),

    angle: generateAngle(),

    platformFitScore: 0,

    engagementScore: 0,

    conversionScore: 0,

    trustScore: 0,

    finalScore: 0,
  };

  return scoreVariant(
    variant,
    input
  );
}

// ----------------------------------------------------
// MAIN CREATIVE OS
// ----------------------------------------------------

export function autonomousCreativeOS(
  input: CreativeInput
): CreativeOSOutput {

  const variants: CreativeVariant[] = [];

  // generate multiple variants
  for (let i = 0; i < 8; i++) {

    variants.push(
      createVariant(input, i)
    );
  }

  // ranking
  variants.sort(
    (a, b) => b.finalScore - a.finalScore
  );

  const winner = variants[0];

  // experimentation queue
  const experimentationQueue =
    variants.slice(1, 4);

  // recommendations
  const recommendations: string[] = [];

  if (input.platform === "TIKTOK") {

    recommendations.push(
      "Deploy fast hook creatives within first 2 seconds"
    );
  }

  if (input.platform === "AMAZON") {

    recommendations.push(
      "Optimize image stack for trust conversion"
    );
  }

  if (input.trendScore > 80) {

    recommendations.push(
      "Increase creative refresh frequency"
    );
  }

  recommendations.push(
    "Run continuous A/B testing"
  );

  return {

    winner,

    rankedVariants: variants,

    experimentationQueue,

    platformStrategy:
      getPlatformStrategy(input.platform),

    recommendations,

    metadata: {

      engineVersion:
        "v2-autonomous-creative-os-final",

      generatedAt:
        new Date().toISOString(),
    },
  };
}
