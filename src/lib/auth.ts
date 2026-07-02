import { supabase } from "./supabase";

export type AuthUser = {
  id: string;
  email?: string;
};

/**
 * Secure server-side auth extraction
 */
export async function getUser(req: Request): Promise<AuthUser | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) return null;

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) return null;

  return {
    id: data.user.id,
    email: data.user.email,
  };
}
