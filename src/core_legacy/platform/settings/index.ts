/**
 * -------------------------
 * PLATFORM SETTINGS EXPORT LAYER
 * -------------------------
 * Single entry point for Settings System
 */

export * from "./settings.types";
export * from "./settings.store";

/**
 * Convenience re-export (optional shortcut)
 */
export { settingsStore } from "./settings.store";
