export class TitleScorer {
  score(title: string): number {
    let score = 50;

    if (title.length > 40) score += 10;

    if (title.length < 120) score += 10;

    if (title.includes("Premium")) score += 10;

    if (title.includes("Best")) score += 10;

    return Math.min(score, 100);
  }
}
