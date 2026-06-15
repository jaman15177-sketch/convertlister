import { rateLimit } from "@/lib/rate-limit";
import { getIP } from "@/lib/get-ip";

export async function apiGuard(req: Request) {
  const ip = getIP(req);

  // GLOBAL PROTECTION (MUST HAVE)
  await rateLimit(`global:${ip}`, 100, 60);

  return { ip };
}
