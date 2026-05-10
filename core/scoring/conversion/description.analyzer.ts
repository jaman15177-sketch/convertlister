export class DescriptionAnalyzer {
  analyze(content: string): number {
    let score = 50;

    if (content.length > 200) {
      score += 20;
    }

    const emotionalWords = [
      "confidence",
      "comfort",
      "lifestyle",
      "efficiency",
    ];

    const found = emotionalWords.some((word) =>
      content.toLowerCase().includes(word)
    );

    if (found) score += 20;

    return Math.min(score, 100);
  }
}
