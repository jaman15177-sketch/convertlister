import { runPipeline } from "@/src/pipeline/runPipeline";

export async function GET() {
  try {
    await runPipeline();

    return Response.json({
      success: true,
      message: "Pipeline executed successfully",
      time: new Date().toISOString(),
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
