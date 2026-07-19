/**
 * ============================================================
 * CONVERTLISTER
 * BOOTSTRAP INDEX
 * Enterprise Production Ready
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Central application bootstrap
 * • Execute startup sequence
 * • Prevent duplicate initialization
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute business logic
 * ✗ Import products
 * ✗ Publish products
 * ✗ Call marketplace APIs
 * ============================================================
 */

import { DatabaseBootstrap } from "./bootstrap.database";
import { CacheBootstrap } from "./bootstrap.cache";
import { QueueBootstrap } from "./bootstrap.queue";
import { EventsBootstrap } from "./bootstrap.events";
import { MonitoringBootstrap } from "./bootstrap.monitoring";
import { AdapterBootstrap } from "./bootstrap.adapters";

export class Bootstrap {

  private static initialized = false;

  /**
   * Initialize application
   */
  static async initialize(): Promise<void> {

    if (this.initialized) {
      return;
    }

    /**
     * Startup order
     */
    await DatabaseBootstrap.initialize();

    await CacheBootstrap.initialize();

    await QueueBootstrap.initialize();

    await EventsBootstrap.initialize();

    await MonitoringBootstrap.initialize();

    await AdapterBootstrap.initialize();

    this.initialized = true;

  }

  /**
   * Bootstrap state
   */
  static isInitialized(): boolean {

    return this.initialized;

  }

}

export async function bootstrap(): Promise<void> {

  await Bootstrap.initialize();

}
