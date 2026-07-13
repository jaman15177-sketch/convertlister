import { NextResponse } from "next/server";

import {
  getCurrentUser,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} from "@/lib/auth/get-current-user";

import {
  importService,
  ImportMode,
  ImportSource,
} from "@/lib/core/import";

import type {
  ImportRequest,
} from "@/lib/core/import";

import type {
  ImportApiRequest,
} from "./import.dto";

export async function POST(
  req: Request
) {
  try {

    const user =
      await getCurrentUser(req);

    const body =
      await req.json() as ImportApiRequest;

    if (
      !body.products ||
      !Array.isArray(body.products)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_PRODUCTS",
        },
        {
          status: 400,
        }
      );
    }

    const request: ImportRequest = {

      organizationId:
        user.organizationId,

      source:
        body.source as ImportSource,

      mode:
        ImportMode.FULL,

      products:
        [...body.products],

    };

    const result =
      await importService.import(
        request
      );

    return NextResponse.json(
      result,
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

    console.error(
      "Import API Error:",
      err
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "INTERNAL_SERVER_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}
