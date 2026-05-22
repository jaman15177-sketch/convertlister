import { runPipeline } from "../../src/pipeline/runPipeline";

export async function startWorker() {
  console.log("⚙️ Pipeline worker started");

  try {
    const result = await runPipeline();

    // normalize pipeline response
    const status = result?.status ?? "unknown";
    const message = result?.message ?? "";
    const total = result?.data?.length ?? 0;

    console.log("✅ Pipeline completed", {
      status,
      message,
      total,
    });

    return {
      ok: status === "ok" || status === "success",
      status,
      message,
      total,
    };
  } catch (error) {
    console.error("❌ Worker failed:", error);

    return {
      ok: false,
      status: "error",
      message: "worker execution failed",
      total: 0,
    };
  }
}

export default startWorker;
