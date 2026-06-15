// 🧠 Safe IP extractor for Next.js API routes

export function getIP(req: Request): string {
  const headers = req.headers;

  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  const realIP = headers.get("x-real-ip");
  if (realIP) return realIP;

  return "127.0.0.1";
}
