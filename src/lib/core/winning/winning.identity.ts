/**
 * ==========================================================
 * WINNING IDENTITY
 * ==========================================================
 *
 * Enterprise Winning Identity
 *
 * Responsibilities
 * - Generate winning candidate identity
 * - Validate identity
 * - Identity helpers
 *
 * Rules
 * - No repository
 * - No scoring
 * - No detection
 * - Identity only
 * ==========================================================
 */

/* ==========================================================
 * IDENTITY TYPE
 * ==========================================================
 */

export interface WinningIdentity {

  readonly id: string;

  readonly createdAt: Date;

}

/* ==========================================================
 * WINNING IDENTITY GENERATOR
 * ==========================================================
 */

export class WinningIdentityGenerator {

  private constructor() {}

  /**
   * ========================================================
   * GENERATE
   * ========================================================
   */

  static generate(
    prefix = "win"
  ): string {

    const timestamp =
      Date.now().toString(36);

    const random =
      Math.random()
        .toString(36)
        .substring(2, 10);

    return `${prefix}_${timestamp}_${random}`;

  }

  /**
   * ========================================================
   * CREATE
   * ========================================================
   */

  static create(
    prefix = "win"
  ): WinningIdentity {

    return {

      id: this.generate(prefix),

      createdAt: new Date(),

    };

  }

  /**
   * ========================================================
   * VALIDATE
   * ========================================================
   */

  static isValid(
    id: string
  ): boolean {

    return (
      typeof id === "string" &&
      id.trim().length >= 5
    );

  }

  /**
   * ========================================================
   * MATCH
   * ========================================================
   */

  static equals(
    first: string,
    second: string
  ): boolean {

    return first === second;

  }

}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningIdentity =
  WinningIdentityGenerator;
