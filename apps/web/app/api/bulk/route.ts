import { NextResponse } from "next/server";
import { productQueue } from "@/core/queue/queue.client";

interface BulkRequest {
  urls: string[];
}

export async function POST(req: Request) {
  try {
    const body: BulkRequest = await req.json();

    if (!body.urls || !Array.isArray(body.urls)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input: urls must be an array",
        },
        { status: 400 }
      );
    }

    // Queue each URL as a separate job
    const jobs = [];

    for (const url of body.urls) {
      const job = await productQueue.add("bulk-job", {
        url,
      });

      jobs.push(job);
    }

    return NextResponse.json({
      success: true,
      message: "Bulk jobs queued successfully",
      count: body.urls.length,
      jobs,
    });
  } catch (error: any) {
    console.error("Bulk API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Bulk processing failed",
      },
      { status: 500 }
    );
  }
}
