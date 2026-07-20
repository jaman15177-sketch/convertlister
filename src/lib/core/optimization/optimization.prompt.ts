/**
 * ==========================================================
 * AI OPTIMIZATION PROMPT
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility
 * - Build structured AI prompts
 * - Assemble optimization context
 * - Define AI instructions
 *
 * Rules
 * - No AI execution
 * - No quality validation
 * - No approval logic
 * - No marketplace persistence
 * ==========================================================
 */

import type {
  OptimizationContext,
} from "./optimization.context";



/* ==========================================================
 * PROMPT
 * ==========================================================
 */

export interface OptimizationPrompt {

  readonly system:

    string;

  readonly user:

    string;

}



/* ==========================================================
 * BUILDER
 * ==========================================================
 */

export class OptimizationPromptBuilder {

  private constructor() {}



  static build(
    context:
      OptimizationContext
  ): OptimizationPrompt {

    const system = [

      "You are an enterprise ecommerce optimization AI.",

      "Your objective is maximum conversion rate.",

      "Never invent product facts.",

      "Preserve brand identity.",

      "Optimize for buyers first.",

      "Produce marketplace-safe content.",

      "Generate clear, persuasive and trustworthy copy.",

      "Return structured output only.",

    ].join(" ");



    const user = [

      `Marketplace: ${context.marketplace.marketplace}`,

      `Language: ${context.marketplace.language}`,

      `Country: ${context.marketplace.country}`,

      `Category: ${context.product.category}`,

      `Brand: ${context.product.brand}`,

      `Product Type: ${context.product.productType}`,

      `Audience: ${context.customer.audience}`,

      `Intent: ${context.customer.intent}`,

    ].join("\n");



    return {

      system,

      user,

    };

  }

}



/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const optimizationPrompt =
  OptimizationPromptBuilder;
