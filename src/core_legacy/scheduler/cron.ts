import { importEngine } from "../import/engine/import.engine";
import { RawProduct } from "../import/types/import.types";

/**
 * ==========================================================
 * CRON SCHEDULER (AUTO IMPORT ENGINE CORE)
 * ==========================================================
 * - Runs periodic import cycles
 * - Calls Import Engine automatically
 * - Future: connect Shopify/Amazon/TikTok APIs
 * ==========================================================
 */

class CronScheduler {
  private intervalId: NodeJS.Timeout | null = null;

  /**
   * Start scheduler
   */
  start(intervalMs: number = 300000) {
    if (this.intervalId) return;

    console.log("⏱️ Cron Scheduler started");

    this.intervalId = setInterval(async () => {
      await this.runCycle();
    }, intervalMs);
  }

  /**
   * Stop scheduler
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    console.log("⛔ Cron Scheduler stopped");
  }

  /**
   * Single cycle execution
   */
  private async runCycle() {
    try {
      console.log("🔄 Auto Import Cycle Started");

      /**
       * ==================================================
       * TEMP MOCK SOURCE (replace with real APIs later)
       * ==================================================
       */
      const mockProducts: RawProduct[] = [
        {
          source: "shopify",
          sourceProductId: "auto_001",
          payload: {
            id: "auto_001",
            title: "Auto Product",
            body_html: "Auto imported product",
            variants: [{ price: "99" }],
            images: [],
          },
          importedAt: new Date(),
        },
      ];

      let successCount = 0;

      for (const product of mockProducts) {
        const result =
          await importEngine.importProduct(product);

        if (result.success) {
          successCount++;
        }
      }

      console.log(
        `✅ Cycle Completed | Imported: ${successCount}`
      );
    } catch (err) {
      console.error(
        "❌ Cron cycle error:",
        err
      );
    }
  }
}

/**
 * Singleton instance
 */
export const cronScheduler =
  new CronScheduler();xy

