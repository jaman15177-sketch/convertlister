/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.score.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product AI Score Domain Contracts
 *
 * Layer:
 * -----------------------------------------------------------
 * Ready Product Library
 *
 * Supports:
 * -----------------------------------------------------------
 * ✓ AI Ranking Score
 * ✓ Conversion Score
 * ✓ Quality Score
 * ✓ Confidence Score
 * ✓ Score Breakdown
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Store
 * ✗ Service
 * ✗ Engine
 * ✗ API
 *
 * ===========================================================
 */



import type {
  ReadyProduct,
} from "./ready-product.types";



/**
 * ===========================================================
 * Score Types
 * ===========================================================
 */

export const READY_PRODUCT_SCORE_TYPES = {

  AI:
    "AI",

  CONVERSION:
    "CONVERSION",

  QUALITY:
    "QUALITY",

  MARKET:
    "MARKET",

} as const;



export type ReadyProductScoreType =
  typeof READY_PRODUCT_SCORE_TYPES[
    keyof typeof READY_PRODUCT_SCORE_TYPES
  ];



/**
 * ===========================================================
 * Score Range
 * ===========================================================
 */

export const READY_PRODUCT_SCORE_RANGE = {

  MIN:
    0,

  MAX:
    100,

} as const;



/**
 * ===========================================================
 * Score Factor
 * ===========================================================
 */

export interface ReadyProductScoreFactor {


  readonly name:
    string;


  readonly weight:
    number;


  readonly score:
    number;


  readonly contribution?:
    number;

}



/**
 * ===========================================================
 * Score Breakdown
 * ===========================================================
 */

export interface ReadyProductScoreBreakdown {


  readonly factors:
    readonly ReadyProductScoreFactor[];



  readonly totalScore:
    number;

}



/**
 * ===========================================================
 * Main Score Contract
 * ===========================================================
 */

export interface ReadyProductScore {


  readonly productId:
    string;



  readonly type:
    ReadyProductScoreType;



  readonly score:
    number;



  readonly confidenceScore?:
    number;



  readonly breakdown?:
    ReadyProductScoreBreakdown;



  readonly generatedByAI?:
    boolean;



  readonly generatedAt?:
    string;

}



/**
 * ===========================================================
 * Score Builder Input
 * ===========================================================
 */

export interface ReadyProductScoreBuilderInput {


  readonly product:
    ReadyProduct;



  readonly score:
    number;



  readonly type?:
    ReadyProductScoreType;



  readonly confidenceScore?:
    number;



  readonly factors?:
    readonly ReadyProductScoreFactor[];

}



/**
 * ===========================================================
 * Score Factory
 * ===========================================================
 */

export function createReadyProductScore(

  input:
    ReadyProductScoreBuilderInput,

): ReadyProductScore {


  return {


    productId:
      input.product.id,


    type:
      input.type ??
      READY_PRODUCT_SCORE_TYPES.AI,


    score:
      normalizeReadyProductScore(
        input.score,
      ),


    confidenceScore:
      input.confidenceScore,


    breakdown:
      input.factors
        ? {

            factors:
              input.factors,


            totalScore:
              normalizeReadyProductScore(
                input.score,
              ),

          }

        : undefined,


    generatedByAI:
      true,


  };

}



/**
 * ===========================================================
 * Normalize Score
 * ===========================================================
 */

export function normalizeReadyProductScore(

  score:
    number,

): number {


  if (

    score < READY_PRODUCT_SCORE_RANGE.MIN

  ) {

    return READY_PRODUCT_SCORE_RANGE.MIN;

  }



  if (

    score > READY_PRODUCT_SCORE_RANGE.MAX

  ) {

    return READY_PRODUCT_SCORE_RANGE.MAX;

  }



  return Math.round(score);

}



/**
 * ===========================================================
 * Score Guard
 * ===========================================================
 */

export function isReadyProductScore(

  value:
    unknown,

): value is ReadyProductScore {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }



  const score =
    value as Partial<ReadyProductScore>;



  return (

    typeof score.productId === "string" &&

    typeof score.score === "number"

  );

}



/**
 * ===========================================================
 * Score Helpers
 * ===========================================================
 */

export function isHighScoreReadyProduct(

  score:
    ReadyProductScore,

): boolean {


  return score.score >= 80;

}



export function isLowScoreReadyProduct(

  score:
    ReadyProductScore,

): boolean {


  return score.score < 50;

}



export function getReadyProductScorePercentage(

  score:
    ReadyProductScore,

): number {


  return score.score;

}
