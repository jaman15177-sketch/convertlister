/**
 * ==========================================================
 * AI OPTIMIZATION RULES
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility:
 * - Hard optimization rules
 * - Marketplace safety rules
 * - Content generation boundaries
 *
 * Rules:
 * - No AI execution
 * - No prompt generation
 * - No quality scoring
 * - No approval logic
 * ==========================================================
 */


/* ==========================================================
 * TITLE RULES
 * ==========================================================
 */

export interface TitleRules {

  readonly minLength:
    number;

  readonly maxLength:
    number;

  readonly includePrimaryKeyword:
    boolean;

  readonly avoidKeywordStuffing:
    boolean;

}


/* ==========================================================
 * DESCRIPTION RULES
 * ==========================================================
 */

export interface DescriptionRules {

  readonly minLength:
    number;

  readonly maxLength:
    number;

  readonly includeBenefits:
    boolean;

  readonly includeUseCases:
    boolean;

}


/* ==========================================================
 * BULLET RULES
 * ==========================================================
 */

export interface BulletRules {

  readonly minItems:
    number;

  readonly maxItems:
    number;

  readonly benefitFocused:
    boolean;

}


/* ==========================================================
 * MARKETPLACE RULES
 * ==========================================================
 */

export interface MarketplaceRules {

  readonly allowSuperlatives:
    boolean;

  readonly allowMedicalClaims:
    boolean;

  readonly allowGuarantees:
    boolean;

  readonly allowTrademarkUsage:
    boolean;

}


/* ==========================================================
 * OPTIMIZATION RULESET
 * ==========================================================
 */

export interface OptimizationRuleSet {

  readonly title:
    TitleRules;

  readonly description:
    DescriptionRules;

  readonly bullets:
    BulletRules;

  readonly marketplace:
    MarketplaceRules;

}


/* ==========================================================
 * DEFAULT RULESET
 * ==========================================================
 */

export const DEFAULT_OPTIMIZATION_RULES:
  OptimizationRuleSet = {

  title: {

    minLength:
      30,

    maxLength:
      180,

    includePrimaryKeyword:
      true,

    avoidKeywordStuffing:
      true,

  },

  description: {

    minLength:
      300,

    maxLength:
      4000,

    includeBenefits:
      true,

    includeUseCases:
      true,

  },

  bullets: {

    minItems:
      3,

    maxItems:
      7,

    benefitFocused:
      true,

  },

  marketplace: {

    allowSuperlatives:
      false,

    allowMedicalClaims:
      false,

    allowGuarantees:
      false,

    allowTrademarkUsage:
      false,

  },

};
