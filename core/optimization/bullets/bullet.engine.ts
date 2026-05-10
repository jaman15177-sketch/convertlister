import { Product } from "../../product.model";

import { BULLET_TEMPLATES } from "./bullet.templates";

import { GeneratedBullets } from "./bullet.types";

import { BulletScorer } from "./bullet.scorer";

import { ObjectionHandler } from "./objection.handler";

export class BulletEngine {
  private scorer = new BulletScorer();

  private objections = new ObjectionHandler();

  generate(product: Product): GeneratedBullets {
    const generated = BULLET_TEMPLATES.map((template) =>
      template.replace("{title}", product.title)
    );

    const objectionBullets = this.objections.reduce(
      product.title
    );

    const bullets = [
      ...generated,
      ...objectionBullets,
    ];

    const score = this.scorer.score(bullets);

    return {
      bullets,
      score,
    };
  }
}
