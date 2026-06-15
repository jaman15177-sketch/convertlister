import crypto from "crypto";
import { logger } from "../observability/logger";

export class WebhookHandler {
  verifySignature(payload: string, signature: string, secret: string) {
    const hash = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    return hash === signature;
  }

  async handle(event: any) {
    logger.info("WEBHOOK_RECEIVED", {
      type: event.type,
    });

    switch (event.type) {
      case "product.created":
        return this.onProductCreated(event.data);

      case "product.updated":
        return this.onProductUpdated(event.data);

      default:
        logger.warn("UNKNOWN_WEBHOOK", event.type);
    }
  }

  private async onProductCreated(data: any) {
    logger.info("PRODUCT_CREATED_WEBHOOK", data);
  }

  private async onProductUpdated(data: any) {
    logger.info("PRODUCT_UPDATED_WEBHOOK", data);
  }
}

export const webhookHandler = new WebhookHandler();
