import { PREMIUM_WORDS } from "./conversion.rules";

export class TitleAnalyzer {
  analyze(title: string): number {
    let score = 50;

    if (title.length > 40) score += 10;

    if (
      PREMIUM_WORDS.some((word) =>
        title.includes(word)
      )
    ) {
      score += 20;
    }

    if (
      title.toLowerCase().includes("lifestyle")
    ) {
      score += 10;
    }

    return Math.min(score, 100);
  }
}
