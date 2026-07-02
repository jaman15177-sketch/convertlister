import { getUser } from "@/lib/auth";
import { rateLimitGuard } from "@/lib/rate-limit/redis-rate-limit";

export async function secureAPI(req: Request) {
  const user = await getUser(req);

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  const rl = await rateLimitGuard(user.id);

  if (!rl.success) {
    throw new Error("RATE_LIMITED");
  }

  return { user };
}
