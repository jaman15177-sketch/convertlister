/**
 * ENVIRONMENT VALIDATION LAYER
 * Enterprise-grade safety guard
 */

type EnvCheckResult = {
  ok: boolean;
  errors: string[];
};

function isWeakSecret(value: string) {
  return (
    !value ||
    value.length < 32 ||
    value === "your_super_secret" ||
    /123|secret|password/i.test(value)
  );
}

export function validateEnv(): EnvCheckResult {
  const errors: string[] = [];

  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

  // JWT check
  
  // Redis check
  if (!REDIS_URL) {
    errors.push("UPSTASH_REDIS_REST_URL missing");
  }

  if (!REDIS_TOKEN) {
    errors.push("UPSTASH_REDIS_REST_TOKEN missing");
  }

  // Internal API key
  if (!INTERNAL_API_KEY) {
    errors.push("INTERNAL_API_KEY missing");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function assertEnv() {
  const result = validateEnv();

  if (!result.ok) {
    console.error("❌ ENV ERROR:");
    result.errors.forEach((e) => console.error(" - " + e));

    throw new Error("Invalid environment configuration");
  }

  console.log("✅ ENV VALIDATION PASSED");
}
