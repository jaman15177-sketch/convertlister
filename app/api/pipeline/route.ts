import { NextResponse } from "next/server";
import { PipelineService } from "@/core/engine/pipeline.service";

export async function POST(req: Request) {
  try {
    const input = await req.json();

    // Use static method (correct architecture)
    const result = await PipelineService.run(input);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error("Pipeline error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Pipeline failed",
      },
      { status: 500 }
    );
  }
}
