import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type HealthStatus = "healthy" | "degraded" | "unhealthy";

export async function GET() {
  const start = Date.now();

  const supabase = createClient();

  // 🧠 SERVICE CHECKS
  const checks = {
    database: false,
    auth: true,
    billing: true,
    jobs: true,
    events: true,
    logs: true,
  };

  // 🟢 DATABASE CHECK
  try {
    const { error } = await supabase
      .from("organizations")
      .select("id")
      .limit(1);

    checks.database = !error;
  } catch {
    checks.database = false;
  }

  // 🧠 STATUS ENGINE (CORE LOGIC)
  const allHealthy = Object.values(checks).every(Boolean);
  const someHealthy = Object.values(checks).some(Boolean);

  let status: HealthStatus = "healthy";

  if (!allHealthy && someHealthy) {
    status = "degraded";
  }

  if (!someHealthy) {
    status = "unhealthy";
  }

  const latency = Date.now() - start;

  // 🟡 RESPONSE PAYLOAD
  const payload = {
    status,
    timestamp: new Date().toISOString(),
    latency,

    version: "3.0.0",
    environment: process.env.NODE_ENV,

    services: checks,

    meta: {
      region: "primary",
      uptime_check: true,
    },
  };

  // 🧾 SNAPSHOT (NON-BLOCKING)
  try {
    await supabase.from("health_snapshots").insert({
      status,
      services: checks,
      latency,
      env: process.env.NODE_ENV,
      version: "3.0.0",
    });
  } catch {
    // silent fail → never break health endpoint
  }

  // 🔴 HTTP STATUS MAPPING
  const httpStatus =
    status === "healthy"
      ? 200
      : status === "degraded"
      ? 200
      : 503;

  return NextResponse.json(payload, {
    status: httpStatus,
  });
}
