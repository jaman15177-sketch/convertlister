import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = getRedis();

    if (!redis) {
      return NextResponse.json({
        success: false,
        message: "Redis NOT configured",
      });
    }

    await redis.set("health:check", "ok");

    const value = await redis.get("health:check");

    return NextResponse.json({
      success: true,
      redis: "connected",
      value,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || "unknown error",
      stack: error?.stack || null,
    });
  }
}
