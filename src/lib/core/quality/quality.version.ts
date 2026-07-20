/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE VERSION
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Version information for the Quality Engine.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Engine version
 * • API version
 * • Rules version
 * • Report version
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute validation
 * ✗ Execute scoring
 * ✗ Execute approval logic
 * ✗ Execute AI
 * ✗ Persist database
 * ============================================================
 */

/* ============================================================
 * VERSION INFORMATION
 * ============================================================
 */

export interface QualityVersion {

  readonly engine: string;

  readonly api: string;

  readonly rules: string;

  readonly report: string;

}

/* ============================================================
 * CURRENT VERSION
 * ============================================================
 */

export const qualityVersion:
  QualityVersion = {

  engine:
    "1.0.0",

  api:
    "1.0.0",

  rules:
    "1.0.0",

  report:
    "1.0.0",

};

/* ============================================================
 * EXPORT
 * ============================================================
 */

export default qualityVersion;
