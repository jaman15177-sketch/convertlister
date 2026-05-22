import { NextResponse } from "next/server";
import { productQueue } from "@/core/queue/queue.client";

interface ProcessRequest {
  url: string;
}

export async function POST(req: Request) {
  try {
    const body: ProcessRequest = await req.json();

    if (!body.url) {
      return NextResponse.json(
        {
          success: false,
          error: "URL is required",
        },
        { status: 400 }
      );
    }

    const job = await productQueue.add("process-job", {
      url: body.url,
    });

    return NextResponse.json({
      success: true,
      message: "Process job queued",
      job,
    });
  } catch (error: any) {
    console.error("Process API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Process failed",
      },
      { status: 500 }
    );
  }
}
