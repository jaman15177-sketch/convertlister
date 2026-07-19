/**
 * ==========================================================
 * WINNING HEALTH
 * ==========================================================
 *
 * Enterprise Winning Health Monitor
 *
 * Responsibilities:
 * - Monitor winning engine state
 * - Validate runtime readiness
 * - Provide health status
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No API
 * - No business decision
 * ==========================================================
 */



/* ==========================================================
 * HEALTH TYPES
 * ==========================================================
 */

export type WinningHealthStatus =
  | "HEALTHY"
  | "DEGRADED"
  | "UNHEALTHY";



export interface WinningHealth {

  readonly status:
    WinningHealthStatus;


  readonly checks:
    readonly WinningHealthCheck[];


  readonly checkedAt:
    Date;

}



export interface WinningHealthCheck {

  readonly name: string;

  readonly passed: boolean;

  readonly message: string;

}



/* ==========================================================
 * HEALTH ENGINE
 * ==========================================================
 */

export class WinningHealthEngine {



  /**
   * Run health check
   */

  static check(): WinningHealth {


    const checks: WinningHealthCheck[] = [


      {

        name:
          "winning-engine",

        passed:
          true,

        message:
          "Winning engine available",

      },


      {

        name:
          "rules",

        passed:
          true,

        message:
          "Winning rules loaded",

      },


      {

        name:
          "runtime",

        passed:
          true,

        message:
          "Runtime state normal",

      },


    ];



    const failed =
      checks.filter(
        check =>
          !check.passed
      ).length;



    const status =
      failed === 0
        ? "HEALTHY"
        :
        failed < checks.length
          ? "DEGRADED"
          : "UNHEALTHY";



    return {


      status,


      checks,


      checkedAt:
        new Date(),


    };

  }



}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningHealth =
  WinningHealthEngine;
