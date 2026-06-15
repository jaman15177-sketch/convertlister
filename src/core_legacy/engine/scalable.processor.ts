import { validationPipeline } from "@/core/pipeline/validation.pipeline";
import { eventQueue } from "@/core/events/event.queue";
import { logger } from "@/core/observability/logger";

export class ScalableProcessor {
  async process(product: any) {
    const valid = validationPipeline.validate(product);

    logger.info("Processing product", valid.productId);

    eventQueue.publish({
      topic: "PRODUCT_VALIDATED",
      data: valid,
    });

    return valid;
  }
}

export const scalableProcessor = new ScalableProcessor();
