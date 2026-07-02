import { NextResponse } from "next/server";

import {
  getCurrentUser,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} from "@/lib/auth/get-current-user";
import {
  addCredits,
  removeCredits,
} from "@/lib/admin/credit-admin";

interface CreditRequest {
  action: "add" | "remove";
  userId: string;
  amount: number;
}

export async function POST(req: Request) {
  try {
    // Authentication
    const currentUser = await getCurrentUser(req);

    // Authorization
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          error: "FORBIDDEN",
          message: "Administrator privileges required",
        },
        { status: 403 }
      );
    }

    const body = (await req.json()) as CreditRequest;

    if (!body.userId) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_USER_ID",
        },
        { status: 400 }
      );
    }

    if (
      typeof body.amount !== "number" ||
      !Number.isFinite(body.amount) ||
      body.amount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_AMOUNT",
        },
        { status: 400 }
      );
    }

    switch (body.action) {
      case "add": {
        const result = await addCredits(body.userId, body.amount);

        return NextResponse.json(result);
      }

      case "remove": {
        const result = await removeCredits(body.userId, body.amount);

        return NextResponse.json(result);
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: "INVALID_ACTION",
          },
          { status: 400 }
        );
    }
  } catch (err: unknown) {
  if (err instanceof UnauthorizedError) {
    return NextResponse.json(
      {
        success: false,
        error: "UNAUTHORIZED",
        message: err.message,
      },
      { status: 401 }
    );
  }

  if (err instanceof BadRequestError) {
    return NextResponse.json(
      {
        success: false,
        error: "BAD_REQUEST",
        message: err.message,
      },
      { status: 400 }
    );
  }

  if (err instanceof ForbiddenError) {
    return NextResponse.json(
      {
        success: false,
        error: "FORBIDDEN",
        message: err.message,
      },
      { status: 403 }
    );
  }

  if (err instanceof SyntaxError) {
    return NextResponse.json(
      {
        success: false,
        error: "INVALID_JSON",
        message: "Request body contains invalid JSON",
      },
      { status: 400 }
    );
  }

  console.error("Admin Credits API Error:", err);

    return NextResponse.json(
    {
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
    { status: 500 }
  );
  }
}
