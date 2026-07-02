import "server-only";

import type { NextRequest } from "next/server";

import { supabaseAdmin } from "@/core/ssot/db/supabase.admin";
import {
  verifyAccessToken,
  UnauthorizedError,
} from "@/lib/auth/verify-access-token";

export { UnauthorizedError };
export interface CurrentUser {
  id: string;
  email: string;
  organizationId: string;
  role: string;
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function getCurrentUser(
  req: Request | NextRequest
): Promise<CurrentUser> {
  // 1. Verify Supabase JWT
  const authUser = await verifyAccessToken(
    req.headers.get("authorization")
  );

  // 2. Active Organization
  const organizationId = req.headers
    .get("x-organization-id")
    ?.trim();

  if (!organizationId) {
    throw new BadRequestError(
      "Missing X-Organization-Id header"
    );
  }

  // 3. Load membership for THIS tenant only
  const { data: membership, error } = await supabaseAdmin
    .from("organization_members")
    .select("organization_id, role")
    .eq("user_id", authUser.id)
    .eq("organization_id", organizationId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load organization membership: ${error.message}`
    );
  }

  if (!membership) {
    throw new ForbiddenError(
      "User is not a member of this organization"
    );
  }

  return {
    id: authUser.id,
    email: authUser.email,
    organizationId: membership.organization_id,
    role: membership.role,
  };
}
