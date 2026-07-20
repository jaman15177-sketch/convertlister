/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE PUBLIC EXPORT
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Single public entry point for Approval Gate module.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Export public APIs
 * • Hide internal structure
 * • Maintain stable imports
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute approval logic
 * ✗ Execute policy
 * ✗ Execute AI
 * ✗ Execute quality validation
 * ✗ Persist database
 * ============================================================
 */


/* ============================================================
 * TYPES
 * ============================================================
 */

export * from "./approval.types";


/* ============================================================
 * CONTRACTS
 * ============================================================
 */

export * from "./approval.contract";


/* ============================================================
 * CONFIGURATION
 * ============================================================
 */

export * from "./approval.constants";

export * from "./approval.config";

export * from "./approval.errors";


/* ============================================================
 * INPUT / CONTEXT
 * ============================================================
 */

export * from "./approval.input";

export * from "./approval.context";


/* ============================================================
 * POLICY / RULES / DECISION
 * ============================================================
 */

export * from "./approval.policy";

export * from "./approval.rules";

export * from "./approval.decision";


/* ============================================================
 * CORE ENGINE
 * ============================================================
 */

export * from "./approval.engine";


/* ============================================================
 * AUDIT / OUTPUT
 * ============================================================
 */

export * from "./approval.audit";

export * from "./approval.output";


/* ============================================================
 * VERSION
 * ============================================================
 */

export * from "./approval.version";
