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
 * MEMORY PRODUCT REPOSITORY
 * ========================================================== */

export * from "./product.repository";

export * from "./product.repository.types";

export * from "./product.repository.memory";



/* ==========================================================
 * SUPABASE PRODUCT REPOSITORY
 * ========================================================== */

export * from "./supabase.product.types";

export * from "./supabase.product.contract";

export * from "./supabase.product.mapper";

export * from "./supabase.product.errors";

export * from "./supabase.product.repository";
