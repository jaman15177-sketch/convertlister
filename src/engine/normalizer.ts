// src/engine/normalizer.ts

import { Signal } from "../types/signal";

/**
 * 🧹 Normalizer Layer
 * Purpose: Clean + standardize all incoming signals
 * This ensures scoring engine gets consistent data
 */
export function normalize(signals: Signal[]): Signal[] {
  return signals.map((s) => {
    return {
      ...s,

      // 🧼 keyword cleanup (critical for dedup + clustering)
      keyword: s.keyword
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " "),

      // 📊 safe defaults (avoid NaN breaking scoring engine)
      volume: s.volume ?? 0,
      engagement: s.engagement ?? 0,
      velocity: s.velocity ?? 0,

      // ⏱ ensure timestamp exists
      timestamp: s.timestamp ?? Date.now(),

      // 🧠 optional metadata safety
      metadata: s.metadata ?? {},
    };
  });
}
