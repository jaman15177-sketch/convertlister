/**
 * ==========================================================
 * REPOSITORY EXPORTS
 * ==========================================================
 *
 * Public export boundary for Repository subsystem.
 *
 * Responsibilities:
 * - Centralize repository exports
 * - Keep import paths clean
 * - No logic
 *
 * ==========================================================
 */


/* ==========================================================
 * BASE REPOSITORY
 * ========================================================== */

export * from "./repository.interface";

export * from "./repository.types";

export * from "./universal.repository";



/* ==========================================================
 * PRODUCT REPOSITORY
 * ========================================================== */

export * from "./product.repository";

export * from "./product.repository.types";
export * from "./product.repository.memory";
