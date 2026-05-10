import { Product } from "../../product.model";

import { POWER_WORDS } from "./title.rules";

import { GeneratedTitle } from "./title.types";

import { TitleScorer } from "./title.scorer";

export class TitleEngine {
  private scorer = new TitleScorer();

  generate(product: Product): GeneratedTitle {
    const powerWord = POWER_WORDS[0];

    const title = `${powerWord} ${product.title} For Modern Lifestyle`;

    const score = this.scorer.score(title);

    return {
      value: title,
      score,
    };
  }
}
