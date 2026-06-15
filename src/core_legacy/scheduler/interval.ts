import { importEngine } from "../import/engine/import.engine";
import { RawProduct } from "../import/types/import.types";

/**
 * ==========================================================
 * INTERVAL LOOP SCHEDULER
 * ==========================================================
 * Lightweight auto-import engine
 * Replaces cron if needed
 * ==========================================================
 */

class IntervalScheduler {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  /**
   * Start auto loop
   */
  start(intervalMs: number = 300000) {
    if (this.intervalId) return;

    console.log("⏱️ Interval Scheduler started");

    this.intervalId = setInterval(async () => {
      await this.runCycle();
    }, intervalMs);
  }

  /**
   * Stop loop
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    console.log("⛔ Interval Scheduler stopped");
  }

  /**
   * One execution cycle
   */
  private async runCycle() {
    if (this.isRunning) {
      console.log("⚠️ Cycle skipped (already running)");
      return;
    }

    this.isRunning = true;

    try {
      console.log("🔄 Auto Import Cycle Started");

      /**
       * =========================================
       * MOCK SOURCE (replace with APIs later)
       * =========================================
       */
      const mockProducts: RawProduct[] = [
        {
          source: "shopify",
          sourceProductId: "int_001",
          payload: {
            id: "int_001",
            title: "Interval Product",
            body_html: "Auto imported via interval loop",
            variants: [{ price: "120" }],
            images: [],
          },
          importedAt: new Date(),
        },
      ];

      let success = 0;
      let failed = 0;

      for (const product of mockProducts) {
        const result =
          await importEngine.importProduct(product);

        if (result.success) {
          success++;
        } else {
          failed++;
        }
      }

      console.log(
        `✅ Cycle Done | Success: ${success} | Failed: ${failed}`
      );

    } catch (err) {
      console.error("❌ Interval error:", err);
    } finally {
      this.isRunning = false;
    }
  }
}

/**
 * Singleton export
 */
export const intervalScheduler =
  new IntervalScheduler();
