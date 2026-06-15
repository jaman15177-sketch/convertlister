/**
 * =========================
 * MODULE 4 CORE INTERFACES
 * PRODUCT INTELLIGENCE SYSTEM
 * =========================
 */

// ----------------------------
// BASE PRODUCT INPUT
// ----------------------------

export interface ProductInput {
  productId: string;
  source: string;

  title: string;
  description?: string;

  category?: string;

  price: number;

  images?: string[];

  metadata?: Record<string, any>;
}

// ----------------------------
// PRODUCT PROFILE (ENGINE OUTPUT)
// ----------------------------

export interface ProductProfile {
  productId: string;

  title: string;

  category: string;

  features: string[];

  benefits: string[];

  audience: string[];

  uniqueSellingPoints: string[];
}

// ----------------------------
// INTENT SYSTEM
// ----------------------------

export type IntentLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "BUY_NOW";

export interface IntentProfile {
  intent: IntentLevel;

  confidence: number;

  keywords: string[];

  emotions: EmotionTrigger[];
}

// ----------------------------
// EMOTION ENGINE
// ----------------------------

export type EmotionTrigger =
  | "SECURITY"
  | "STATUS"
  | "GREED"
  | "FEAR"
  | "CURIOSITY"
  | "DESIRE";

// ----------------------------
// MARKET POSITIONING
// ----------------------------

export interface MarketPosition {
  segment: string;

  positioning: string;

  differentiation: string[];

  competitorGap: number;
}

// ----------------------------
// SCORING SYSTEM
// ----------------------------

export interface ProductScore {
  productId: string;

  marketFitScore: number;

  trendScore: number;

  competitionScore: number;

  profitabilityScore: number;

  winningProbability: number;

  finalScore: number;
}

// ----------------------------
// COPY GENERATION OUTPUT
// ----------------------------

export interface ConversionCopy {
  headline: string;

  subHeadline: string;

  bulletPoints: string[];

  callToAction: string;

  emotionalTrigger: EmotionTrigger[];
}

// ----------------------------
// REVENUE FORECAST
// ----------------------------

export interface RevenuePrediction {
  productId: string;

  estimatedRevenue: number;

  conversionRate: number;

  demandScore: number;
}

// ----------------------------
// PLATFORM ADAPTATION
// ----------------------------

export interface PlatformContent {
  platform: "amazon" | "shopify" | "tiktok" | "aliexpress";

  title: string;

  description: string;

  hashtags?: string[];

  adCopy?: string;
}

// ----------------------------
// SELF-IMPROVEMENT LOOP
// ----------------------------

export interface LearningRecord {
  productId: string;

  decision: string;

  finalScore: number;

  outcome: "SUCCESS" | "FAIL";
}

// ----------------------------
// GLOBAL TYPE EXPORT (OPTIONAL SAFE)
// ----------------------------

export type Decision =
  | "PUBLISH"
  | "OPTIMIZE"
  | "REJECT";
