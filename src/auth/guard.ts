import { supabase } from "@/lib/supabase";import type { User } from "@supabase/supabase-js";

/**
 * Extracts user from Authorization header (Supabase session)
 * SAFE: no JWT custom parsing
 */
export async function getUser(req: Request): Promise<User | null> {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) return null;

    const token = authHeader.replace("Bearer ", "");

    if (!token) return null;

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) return null;

    return data.user;
  } catch {
    return null;
  }
}

/**
 * STRICT GUARD (use in APIs)
 */
export async function requireUser(req: Request): Promise<User> {
  const user = await getUser(req);

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return user;
}

/**
 * ROLE CHECK (typed)
 */
export function isAdmin(user: User | null | undefined): boolean {
  return user?.email === "admin@example.com";
}
