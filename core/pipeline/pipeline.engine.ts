import sharp from "sharp";

import { PipelineProduct, PipelineResult } from "./pipeline.types";

import { getConversionScore }
from "../scoring/scoring.engine";

import { runAutomation }
from "../automation/automation.engine";

import { runExport }
from "../export/export.engine";

export class PipelineEngine {

  async process(
    product: PipelineProduct
  ): Promise<PipelineResult> {

    // =========================
    // STEP 1 — IMAGE OPTIMIZE
    // =========================

    const optimizedImage =
      `optimized_${product.id}.webp`;

    await sharp(product.image)
      .resize(2000)
      .webp({ quality: 85 })
      .toFile(optimizedImage);

    // =========================
    // STEP 2 — SCORE
    // =========================

    const scoreResult = getConversionScore({
      width: 2000,
      height: 2000,
      format: "webp",
      hasBackground: true,
      fileSizeKB: 450,
      marketplace: product.marketplace
    });

    // =========================
    // STEP 3 — AUTOMATION
    // =========================

    const automation = runAutomation({
      score: scoreResult.score,
      grade: scoreResult.grade
    });

    // =========================
    // STEP 4 — EXPORT
    // =========================

    const exported = runExport([
      {
        id: product.id,
        title: product.title,
        price: 25,
        marketplace: product.marketplace,
        image: optimizedImage
      }
    ]);

    // =========================
    // FINAL RESULT
    // =========================

    return {
      optimizedImage,
      score: scoreResult.score,
      grade: scoreResult.grade,
      prediction: automation.prediction,
      exported
    };
  }
}
