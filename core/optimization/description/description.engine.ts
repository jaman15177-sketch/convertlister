import { Product } from "../../product.model";

import { GeneratedDescription } from "./description.types";

import { StoryFramework } from "./story.framework";

import { UseCaseGenerator } from "./usecase.generator";

import { DescriptionScorer } from "./description.scorer";

export class DescriptionEngine {
  private story = new StoryFramework();

  private usecase = new UseCaseGenerator();

  private scorer = new DescriptionScorer();

  generate(product: Product): GeneratedDescription {
    const storyPart = this.story.build(product.title);

    const useCasePart = this.usecase.generate(
      product.title
    );

    const content = `
${storyPart}

${useCasePart}

Upgrade your experience with ${product.title} and enjoy a smarter, more efficient lifestyle today.
`;

    const score = this.scorer.score(content);

    return {
      content,
      score,
    };
  }
}
