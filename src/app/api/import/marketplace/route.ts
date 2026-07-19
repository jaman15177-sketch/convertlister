/**
 * ============================================================
 * CONVERTLISTER
 * MARKETPLACE IMPORT API
 * Enterprise Production Ready
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Authenticate request
 * • Parse request body
 * • Delegate to ImportOrchestrator
 * • Return JSON response
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute adapter logic
 * ✗ Normalize products
 * ✗ Save products
 * ✗ Execute business rules
 * ============================================================
 */

import { NextResponse } from "next/server";

import {
  getCurrentUser,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} from "@/lib/auth/get-current-user";

import {
  importOrchestrator,
} from "@/lib/core/import/import.orchestrator";

import type {
  MarketplaceImportApiRequest,
  MarketplaceImportResponse,
} from "../import.dto";
export async function POST(
  req: Request
) {
  try {

    await getCurrentUser(req);

    const body =
  await req.json() as MarketplaceImportApiRequest;
    const result =
      await importOrchestrator.fetch({
        source: body.source,
        query: body.query,
      });

    const response: MarketplaceImportResponse = {

      success: true,

      source: result.source,

      products: result.products,

      imported: result.products.length,

      message:
        "Marketplace products fetched successfully.",

    };

    return NextResponse.json(
      response,
      {
        status: 200,
      }
    );

  } catch (err) {

    if (
      err instanceof UnauthorizedError
    ) {

      return NextResponse.json(
        {
          success: false,
          error: err.message,
        },
        {
          status: 401,
        }
      );

    }

    if (
      err instanceof BadRequestError
    ) {

      return NextResponse.json(
        {
          success: false,
          error: err.message,
        },
        {
          status: 400,
        }
      );

    }

    if (
      err instanceof ForbiddenError
    ) {

      return NextResponse.json(
        {
          success: false,
          error: err.message,
        },
        {
          status: 403,
        }
      );

    }

    if (
      err instanceof SyntaxError
    ) {

      return NextResponse.json(
        {
          success: false,
          error: "INVALID_JSON",
        },
        {
          status: 400,
        }
      );

    }

    return NextResponse.json(
      {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "INTERNAL_SERVER_ERROR",
      },
      {
        status: 500,
      }
    );

  }

}
