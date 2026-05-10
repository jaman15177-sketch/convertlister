export class BulletAnalyzer {
  analyze(bullets: string[]): number {
    let score = 50;

    if (bullets.length >= 5) {
      score += 20;
    }

    const trustWords = [
      "premium",
      "reliable",
      "durable",
    ];

    const found = bullets.some((bullet) =>
      trustWords.some((word) =>
        bullet.toLowerCase().includes(word)
      )
    );

    if (found) score += 20;

    return Math.min(score, 100);
  }
}
