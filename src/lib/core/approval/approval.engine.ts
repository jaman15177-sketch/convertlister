/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE ENGINE
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Orchestrate the complete Approval Gate pipeline.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Execute approval policy
 * • Execute approval decision
 * • Create approval result
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute AI optimization
 * ✗ Execute quality validation
 * ✗ Modify product data
 * ✗ Publish marketplace
 * ✗ Persist database
 * ============================================================
 */

import {
  randomUUID,
} from "node:crypto";

import type {
  ApprovalEngineContract,
} from "./approval.contract";

import type {
  ApprovalInput,
} from "./approval.input";

import type {
  ApprovalResult,
  ApprovalAudit,
} from "./approval.types";

import {
  ApprovalPolicy,
} from "./approval.policy";

import {
  ApprovalDecisionEngine,
} from "./approval.decision";

import {
  APPROVAL_SYSTEM,
  APPROVAL_VERSION,
} from "./approval.constants";


export class ApprovalEngine
  implements ApprovalEngineContract {


  constructor(

    private readonly policy:
      ApprovalPolicy,

    private readonly decision:
      ApprovalDecisionEngine,

  ) {}


  async evaluate(
    input:
      ApprovalInput,
  ): Promise<ApprovalResult> {


    const policyPassed =
      await this.policy.evaluate(
        input,
      );


    const decision =
      policyPassed

        ? await this.decision.decide(
            input,
          )

        : {

            status:
              "REJECTED" as const,

            reason:
              "Approval policy failed.",

            policy:
              "POLICY_CHECK",

          };


    const audit:
      ApprovalAudit = {

      executedBy:
        APPROVAL_SYSTEM.EXECUTOR,

      timestamp:
        new Date(),

      version:
        APPROVAL_VERSION.ENGINE,

    };


    return {

      id:
        randomUUID(),

      productId:
        input.quality.productId,

      decision,

      audit,

      createdAt:
        new Date(),

    };

  }

}


/* ============================================================
 * EXPORT
 * ============================================================
 */

export const approvalEngine =
  ApprovalEngine;
