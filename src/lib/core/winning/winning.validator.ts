/**
 * ==========================================================
 * WINNING VALIDATOR
 * ==========================================================
 *
 * Enterprise Winning Detection Validator
 *
 * Responsibilities
 * - Validate winning input
 * - Validate required product fields
 * - Protect engine boundary
 *
 * Rules
 * - No scoring logic
 * - No detection logic
 * - No repository access
 * - Validation only
 * ==========================================================
 */

import type {
  WinningCandidate,
} from "./winning.types";

import {
  WinningValidationError,
} from "./winning.errors";

/* ==========================================================
 * WINNING VALIDATOR
 * ==========================================================
 */

export class WinningValidator {

  /**
   * ========================================================
   * VALIDATE CANDIDATE
   * ========================================================
   */

  validate(
    candidate: WinningCandidate
  ): void {

    if (!candidate) {

      throw new WinningValidationError(
        "Winning candidate is required."
      );

    }

    this.validateIdentity(candidate);

    this.validateProduct(candidate);

    this.validatePrice(candidate);

    this.validateImages(candidate);

    this.validateMarketplace(candidate);

    this.validateSource(candidate);

    this.validateAttributes(candidate);

    this.validateKeywords(candidate);

    this.validateStatus(candidate);

    this.validateMetadata(candidate);

  }

  /**
   * ========================================================
   * IDENTITY
   * ========================================================
   */

  private validateIdentity(
    candidate: WinningCandidate
  ): void {

    if (!candidate.id?.trim()) {

      throw new WinningValidationError(
        "Candidate id is required."
      );

    }

  }

  /**
   * ========================================================
   * PRODUCT
   * ========================================================
   */

  private validateProduct(
    candidate: WinningCandidate
  ): void {

    if (!candidate.product.title?.trim()) {

      throw new WinningValidationError(
        "Product title is required."
      );

    }

  }

  /**
   * ========================================================
   * PRICE
   * ========================================================
   */

  private validatePrice(
    candidate: WinningCandidate
  ): void {

    if (
      candidate.product.price.amount <= 0
    ) {

      throw new WinningValidationError(
        "Product price must be greater than zero."
      );

    }

    if (
      !candidate.product.price.currency?.trim()
    ) {

      throw new WinningValidationError(
        "Product currency is required."
      );

    }

  }

  /**
   * ========================================================
   * IMAGES
   * ========================================================
   */

  private validateImages(
    candidate: WinningCandidate
  ): void {

    if (
      candidate.product.images.urls.length === 0
    ) {

      throw new WinningValidationError(
        "At least one product image is required."
      );

    }

  }

  /**
   * ========================================================
   * MARKETPLACE
   * ========================================================
   */

  private validateMarketplace(
    candidate: WinningCandidate
  ): void {

    if (
      !candidate.product.marketplace?.trim()
    ) {

      throw new WinningValidationError(
        "Marketplace is required."
      );

    }

  }

  /**
   * ========================================================
   * SOURCE
   * ========================================================
   */

  private validateSource(
    candidate: WinningCandidate
  ): void {

    if (
      !candidate.product.source?.trim()
    ) {

      throw new WinningValidationError(
        "Source is required."
      );

    }

  }

  /**
   * ========================================================
   * ATTRIBUTES
   * ========================================================
   */

  private validateAttributes(
    candidate: WinningCandidate
  ): void {

    if (!candidate.product.attributes) {

      throw new WinningValidationError(
        "Attributes are required."
      );

    }

  }

  /**
   * ========================================================
   * KEYWORDS
   * ========================================================
   */

  private validateKeywords(
    candidate: WinningCandidate
  ): void {

    if (
      !Array.isArray(
        candidate.product.keywords
      )
    ) {

      throw new WinningValidationError(
        "Keywords must be an array."
      );

    }

  }

  /**
   * ========================================================
   * STATUS
   * ========================================================
   */

  private validateStatus(
    candidate: WinningCandidate
  ): void {

    if (
      !candidate.product.status
    ) {

      throw new WinningValidationError(
        "Status is required."
      );

    }

  }

  /**
   * ========================================================
   * METADATA
   * ========================================================
   */

  private validateMetadata(
    candidate: WinningCandidate
  ): void {

    if (
      candidate.product.metadata &&
      typeof candidate.product.metadata !== "object"
    ) {

      throw new WinningValidationError(
        "Metadata must be an object."
      );

    }

  }

}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningValidator =
  new WinningValidator();
