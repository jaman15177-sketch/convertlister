import { NextResponse } from "next/server";
import { productQueue } from "@/core/queue/queue.client";

const MAX_BATCH_SIZE = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const products = body.products;

    // Validate input
    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: "Products must be an array" },
        { status: 400 }
      );
    }

    // Batch limit
    if (products.length > MAX_BATCH_SIZE) {
      return NextResponse.json(
        { error: `Max ${MAX_BATCH_SIZE} products allowed` },
        { status: 400 }
      );
    }

    // Queue products individually
    for (const product of products) {
      await productQueue.add("product-job", {
        product,
      });
    }

    return NextResponse.json({
      success: true,
      queued: products.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to ingest products" },
      { status: 500 }
    );
  }
}
