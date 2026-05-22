import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("🚀 WORKER STARTED");

// placeholder worker bootstrap
export async function startWorker() {
  return {
    ok: true,
    message: "worker initialized",
  };
}
