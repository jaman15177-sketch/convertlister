export async function authGuard(ctx: any) {
  const token = ctx.req.headers.get("authorization");

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  // MOCK: replace with Supabase/JWT verify
  const user = {
    id: "user_123",
    role: "pro",
  };

  return { user };
}
