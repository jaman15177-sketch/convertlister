import { runScheduler } from "@/lib/jobos/core/scheduler";

export async function GET() {
  try {
    const result = await runScheduler();

    return Response.json({
      success: true,
      result,
      time: new Date().toISOString(),
    });
  } catch (e: any) {
    return Response.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}
