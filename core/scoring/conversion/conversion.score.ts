import { TitleAnalyzer } from "./title.analyzer";

import { PricingAnalyzer } from "./pricing.analyzer";

import { BulletAnalyzer } from "./bullet.analyzer";

import { DescriptionAnalyzer } from "./description.analyzer";

import { ConversionScoreResult } from "./conversion.types";

import { MIN_CONVERSION_SCORE } from "./conversion.rules";

export class ConversionScorer {
  private title = new TitleAnalyzer();

  private pricing = new PricingAnalyzer();

  private bullets = new BulletAnalyzer();

  private description = new DescriptionAnalyzer();

  calculate(data: any): ConversionScoreResult {
    const titleScore = this.title.analyze(
      data.title || ""
    );

    const pricingScore = this.pricing.analyze(
      data.price || 0
    );

    const bulletScore = this.bullets.analyze(
      data.bullets || []
    );

    const descriptionScore =
      this.description.analyze(
        data.description || ""
      );

    const totalScore = Math.round(
      (titleScore +
        pricingScore +
        bulletScore +
        descriptionScore) / 4
    );

    return {
      totalScore,

      titleScore,

      pricingScore,

      bulletScore,

      descriptionScore,

      passed:
        totalScore >= MIN_CONVERSION_SCORE,
    };
  }
}
