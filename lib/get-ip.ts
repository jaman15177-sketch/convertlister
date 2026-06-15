// 🧠 SAFE IP EXTRACTOR (Next.js API + Edge compatible)

export function getIP(req: Request): string {
  // Try standard headers first (proxy / Vercel / cloud)
  const headers = req.headers;

  const xff = headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }

  const realIP = headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // fallback (dev / local)
  return "127.0.0.1";
}
