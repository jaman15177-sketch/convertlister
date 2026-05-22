import { Signal } from "../types/signal";
import { calculateDemandScore } from "./demandScore";
import { calculateMomentumScore } from "./momentumScore";
import { calculateValidationScore } from "./validationScore";
import { calculateIntentScore } from "./intentScore";

/**
 * 🧠 FINAL WINNING SCORE ENGINE
 * Purpose: Decide if a product is a "REAL WINNER"
 *
 * Philosophy:
 * - Demand = people want it
 * - Momentum = it's growing
 * - Validation = market confirms it
 * - Intent = people ready to buy
 */

export function calculateWinningScore(signal: Signal) {
  // 🔥 STEP 1: individual layer scores
  const demand = calculateDemandScore(signal);
  const momentum = calculateMomentumScore(signal);
  const validation = calculateValidationScore(signal);
  const intent = calculateIntentScore(signal);

  // 🧠 STEP 2: normalized weighting system
  // (this is the “Minea-style intelligence balance”)

  const demandWeight = 0.25;
  const momentumWeight = 0.35;
  const validationWeight = 0.2;
  const intentWeight = 0.4;

  // ⚠️ NOTE: Intent has highest influence (money signal priority)

  // 📊 STEP 3: composite score
  const rawScore =
    demand * demandWeight +
    momentum * momentumWeight +
    validation * validationWeight +
    intent * intentWeight;

  // 🧠 STEP 4: synergy bonus (cross-signal amplification)
  let synergyBonus = 0;

  if (momentum > 50 && intent > 40) {
    synergyBonus += 15; // viral + buying = winner zone
  }

  if (demand > 60 && validation > 50) {
    synergyBonus += 10; // strong market confirmation
  }

  if (momentum > 80 && validation > 70 && intent > 60) {
    synergyBonus += 25; // SUPER WINNER signal
  }

  // 🧠 STEP 5: risk penalty (filter fake trends)
  let riskPenalty = 0;

  if (validation < 20 && momentum > 70) {
    riskPenalty += 20; // hype without validation
  }

  if (intent < 10 && demand > 80) {
    riskPenalty += 15; // curiosity without buying intent
  }

  // 📊 FINAL SCORE
  const finalScore = rawScore + synergyBonus - riskPenalty;

  return Math.round(finalScore * 100) / 100;
}

/**
 * 🏆 WINNER CLASSIFIER
 */
export function classifyWinner(score: number) {
  if (score >= 120) return "🔥 SUPER WINNER";
  if (score >= 90) return "🚀 WINNER";
  if (score >= 60) return "⚡ POTENTIAL";
  if (score >= 30) return "⚠️ WEAK SIGNAL";
  return "❌ NO MARKET FIT";
}
