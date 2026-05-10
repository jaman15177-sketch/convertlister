import { NextResponse } from "next/server";
import { PipelineService } from "@/core/engine/pipeline.service";

export async function POST(req: Request) {
  const input = await req.json();

  const pipeline = new PipelineService();

  const result = await pipeline.run(input);

  return NextResponse.json(result);
}
