export class BulletScorer {
  score(bullets: string[]): number {
    let score = 50;

    if (bullets.length >= 5) score += 20;

    const totalLength = bullets.join(" ").length;

    if (totalLength > 200) score += 10;

    if (
      bullets.some((b) => b.toLowerCase().includes("premium"))
    ) {
      score += 10;
    }

    return Math.min(score, 100);
  }
}
