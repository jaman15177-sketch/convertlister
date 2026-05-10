export class QualityGuard {

  validateBullets(bullets: string[]) {
    return {
      countOk: bullets.length === 5,

      wordDensityOk: bullets.every(b =>
        this.wordCount(b) >= 10 && this.wordCount(b) <= 20
      ),

      hasBenefitSignal: bullets.some(b =>
        /benefit|solve|improve|reduce|increase/i.test(b)
      )
    };
  }

  validateDescription(sections: string[]) {
    return {
      countOk: sections.length === 5,

      wordRangeOk: sections.every(s =>
        this.wordCount(s) >= 30 && this.wordCount(s) <= 60
      ),

      hasEmotionSignal: sections.some(s =>
        /problem|solution|transform|experience|better/i.test(s)
      )
    };
  }

  private wordCount(text: string): number {
    return text.trim().split(/\s+/).length;
  }
}
