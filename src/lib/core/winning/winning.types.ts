

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";
 
export interface WinningExplanation {

  readonly summary: string;

  readonly factors:
    readonly string[];

  readonly strengths:
    readonly string[];

  readonly weaknesses:
    readonly string[];

}

export interface WinningCandidate {

  readonly id: string;

  readonly product: NormalizedProduct;

  readonly score: number;

  readonly confidence: number;

  readonly winner: boolean;

  readonly passed: boolean;

  readonly reasons:
    readonly string[];

  readonly explanation:
    WinningExplanation;

  readonly createdAt:
    Date;

}
