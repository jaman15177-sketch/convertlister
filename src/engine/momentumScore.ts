import { Signal } from "../types/signal";

/**
 * 🚀 MOMENTUM SCORE ENGINE
 * Purpose: Measure how FAST a trend is growing
 *
 * Core idea:
 * - velocity = growth speed
 * - engagement = attention acceleration
 * - platform boost = virality multiplier
 */

export function calculateMomentumScore(signal: Signal): number {
  const velocity = signal.velocity ?? 0;
  const engagement = signal.engagement ?? 0;

  // 🧠 STEP 1: base momentum (growth speed is key signal)
  const velocityScore = Math.sqrt(velocity * 10);
  // sqrt prevents extreme spikes from fake data

  // 🧠 STEP 2: engagement acceleration (attention growth)
  const engagementScore = Math.log1p(engagement) * 5;

  // 🧠 STEP 3: platform virality boost
  let platformBoost = 0;

  const platform = signal.metadata?.platform;

  if (platform === "tiktok") {
    platformBoost = 6; // highest virality engine
  } else if (platform === "google") {
    platformBoost = 4;
  } else if (platform === "reddit") {
    platformBoost = 3;
  } else if (platform === "aliexpress") {
    platformBoost = 5; // strong ecommerce velocity
  }

  // 🧠 STEP 4: product intent acceleration
  let intentBoost = 0;

  if (signal.metadata?.productIntent) {
    intentBoost = 5;
  }

  if (signal.metadata?.adSpotted) {
    intentBoost += 3;
  }

  // 📊 FINAL MOMENTUM SCORE
  const momentumScore =
    velocityScore * 8 +
    engagementScore * 2 +
    platformBoost * 3 +
    intentBoost * 4;

  return Math.round(momentumScore * 100) / 100;
}
