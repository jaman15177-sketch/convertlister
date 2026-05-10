export class DescriptionScorer {
  score(content: string): number {
    let score = 50;

    if (content.length > 200) score += 15;

    if (
      content.toLowerCase().includes("convenience")
    ) {
      score += 10;
    }

    if (
      content.toLowerCase().includes("confidence")
    ) {
      score += 10;
    }

    if (
      content.toLowerCase().includes("lifestyle")
    ) {
      score += 10;
    }

    return Math.min(score, 100);
  }
}
