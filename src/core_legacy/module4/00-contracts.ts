import { z } from "zod";

// =======================================
// PRODUCT CONTRACT
// =======================================

export const ProductContract =
  z.object({
    productId: z.string(),

    source: z.string(),

    title: z.string(),

    description: z
      .string()
      .optional(),

    category: z
      .string()
      .optional(),

    price: z.number(),

    images: z
      .array(z.string())
      .optional(),

    tags: z
      .array(z.string())
      .optional(),

    metadata: z
      .record(z.any())
      .optional(),
  });

// =======================================
// COPY CONTRACT
// =======================================

export const CopyContract =
  z.object({
    headline: z.string(),

    bullets: z.array(
      z.string()
    ),

    description: z.string(),

    cta: z.string(),
  });

// =======================================
// SCORE CONTRACT
// =======================================

export const ScoreContract =
  z.object({
    score: z.number().min(0).max(100),
  });

// =======================================
// REVENUE CONTRACT
// =======================================

export const RevenueContract =
  z.object({
    monthlyRevenue: z.number(),

    annualRevenue: z.number(),

    confidence: z.number(),
  });

// =======================================
// VALIDATORS
// =======================================

export function validateProduct(
  input: unknown
) {
  return ProductContract.parse(
    input
  );
}

export function validateCopy(
  input: unknown
) {
  return CopyContract.parse(
    input
  );
}
