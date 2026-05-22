import { Signal } from "../types/signal";

/**
 * ❤️ VALIDATION SCORE ENGINE
 * Purpose: Check if market is REALLY confirming the trend
 *
 * Core idea:
 * - engagement = social proof
 * - ads = commercial validation
 * - productIntent = buying confirmation
 * - confidenceScore = data trust level
 */

export function calculateValidationScore(signal: Signal): number {
  const engagement = signal.engagement ?? 0;

  // 🧠 STEP 1: social proof (likes, upvotes, clicks)
  const engagementScore = Math.log1p(engagement) * 6;

  // 🧠 STEP 2: commercial validation (ads = money is being spent)
  let adBoost = 0;

  if (signal.metadata?.adSpotted) {
    adBoost = 25;
  }

  // 🧠 STEP 3: buying intent confirmation
  let intentBoost = 0;

  if (signal.metadata?.productIntent) {
    intentBoost = 30;
  }

  // 🧠 STEP 4: data reliability score
  const confidence = signal.metadata?.confidenceScore ?? 50;
  const confidenceScore = confidence * 0.4;

  // 🧠 STEP 5: platform trust weighting
  let platformBoost = 0;

  const platform = signal.metadata?.platform;

  if (platform === "aliexpress") {
    platformBoost = 20; // direct buying platform
  } else if (platform === "tiktok") {
    platformBoost = 18; // viral commerce engine
  } else if (platform === "google") {
    platformBoost = 15; // search validation
  } else if (platform === "reddit") {
    platformBoost = 10; // early awareness
  }

  // 📊 FINAL VALIDATION SCORE
  const validationScore =
    engagementScore +
    adBoost +
    intentBoost +
    confidenceScore +
    platformBoost;

  return Math.round(validationScore * 100) / 100;
}
