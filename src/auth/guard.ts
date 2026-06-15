import { supabase } from "./supabase";

/**
 * Extracts user from Authorization header (Supabase session)
 * SAFE: no JWT, no custom token logic
 */
export async function getUser(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return null;
    }

    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return null;
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return null;
    }

    return data.user;
  } catch (err) {
    return null;
  }
}

/**
 * STRICT GUARD (use in APIs)
 */
export async function requireUser(req: Request) {
  const user = await getUser(req);

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return user;
}

/**
 * OPTIONAL: admin check (simple role-based)
 * later can connect to DB roles table
 */
export function isAdmin(user: any) {
  return user?.email === "admin@example.com";
}
