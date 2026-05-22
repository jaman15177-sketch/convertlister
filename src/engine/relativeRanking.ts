import { Signal } from "../types/signal";
import { calculateWinningScore } from "./winningScore";

/**
 * 🏆 RELATIVE RANKING ENGINE
 * Goal: Convert raw scores into market-relative winners
 *
 * Core idea:
 * - Not absolute scoring
 * - Ranking vs population
 * - Only top 5% = WINNERS
 */

export type RankedSignal = Signal & {
  score: number;
  percentile: number;
  label: "🔥 SUPER WINNER" | "🚀 WINNER" | "⚡ POTENTIAL" | "❌ WEAK";
};

/**
 * 📊 MAIN RANKING FUNCTION
 */
export function rankSignals(signals: Signal[]): RankedSignal[] {
  // 🧠 STEP 1: attach scores
  const scored = signals.map((s) => ({
    ...s,
    score: calculateWinningScore(s),
  }));

  // 📈 STEP 2: sort descending
  const sorted = scored.sort((a, b) => b.score - a.score);

  const total = sorted.length;

  // 🧠 STEP 3: assign percentile + labels
  const ranked: RankedSignal[] = sorted.map((item, index) => {
    const percentile = ((total - index) / total) * 100;

    let label: RankedSignal["label"];

    // 🔥 TOP 5% = SUPER WINNER
    if (percentile >= 95) {
      label = "🔥 SUPER WINNER";
    }
    // 🚀 NEXT 15%
    else if (percentile >= 80) {
      label = "🚀 WINNER";
    }
    // ⚡ MID RANGE
    else if (percentile >= 50) {
      label = "⚡ POTENTIAL";
    }
    // ❌ BOTTOM
    else {
      label = "❌ WEAK";
    }

    return {
      ...item,
      percentile: Math.round(percentile * 100) / 100,
      label,
    };
  });

  return ranked;
}

/**
 * 🏆 GET ONLY TOP WINNERS (TOP 5%)
 */
export function getTopWinners(signals: Signal[]): RankedSignal[] {
  const ranked = rankSignals(signals);

  return ranked.filter((s) => s.percentile >= 95);
}
