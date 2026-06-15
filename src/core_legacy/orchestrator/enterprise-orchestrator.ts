import { eventQueue } from "@/core/events/event.queue";
import { scalableProcessor } from "@/core/engine/scalable.processor";
import { logger } from "@/core/observability/logger";

export class EnterpriseOrchestrator {
  init() {
    logger.info("Enterprise Orchestrator starting...");

    // EVENT PIPELINE
    eventQueue.subscribe("PRODUCT_VALIDATED", async (product) => {
      logger.info("Validated product received", product.productId);

      await this.analyze(product);
    });
  }

  async run(products: any[]) {
    logger.info("Batch ingest", products.length);

    for (const p of products) {
      await scalableProcessor.process(p);
    }
  }

  private async analyze(product: any) {
    // PLACEHOLDER: connect decision engine here
    logger.info("Analyzing product", product.title);

    eventQueue.publish({
      topic: "PRODUCT_ANALYZED",
      data: product,
    });
  }
}

export const enterpriseOrchestrator =
  new EnterpriseOrchestrator();
