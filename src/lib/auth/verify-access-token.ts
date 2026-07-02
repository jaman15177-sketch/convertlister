import "server-only";

import { supabaseAdmin } from "@/core/ssot/db/supabase.admin";

export interface AuthenticatedUser {
  id: string;
  email: string;
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export async function verifyAccessToken(
  authorization: string | null
): Promise<AuthenticatedUser> {
  if (!authorization) {
    throw new UnauthorizedError("Missing Authorization header");
  }

  if (!authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Invalid Authorization header");
  }

  const accessToken = authorization.slice(7).trim();

  if (!accessToken) {
    throw new UnauthorizedError("Missing access token");
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(accessToken);

  if (error || !user) {
    throw new UnauthorizedError("Invalid or expired access token");
  }

  if (!user.email) {
    throw new UnauthorizedError("Authenticated user has no email");
  }

  return {
    id: user.id,
    email: user.email,
  };
}
