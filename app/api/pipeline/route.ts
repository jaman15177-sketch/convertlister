import { NextResponse } from "next/server";
import { PipelineService } from "@/core/engine/pipeline.service";

export async function POST(req: Request) {
  const input = await req.json();

  const result = await PipelineService.run(input);

  return NextResponse.json({
    success: true,
    data: result,
  });
}
