export async function GET() {
  return Response.json({
    success: true,
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT_SET",
    redis_url: process.env.UPSTASH_REDIS_REST_URL || "NOT_SET",
  });
}
