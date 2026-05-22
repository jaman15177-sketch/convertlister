import { getSupabase } from "../../lib/supabase-client";

const supabase = getSupabase();

interface Product {
  title: string;
  url: string;
  score?: number;
}

export async function runWinnerPipeline(products: Product[]) {
  console.log("🏆 Winner Pipeline Started");

  if (!products || products.length === 0) {
    return {
      success: false,
      message: "No products provided",
      data: [],
    };
  }

  const results = [];

  for (const product of products) {
    const score = product.score ?? 0;

    try {
      const { data, error } = await supabase
        .from("product_metrics")
        .insert(
          {
            job_id: "auto",
            title: product.title,
            url: product.url,
            winning_score: score,
          } as any
        )
        .select();

      if (error) {
        console.error("Insert error:", error);
        continue;
      }

      results.push(data);
    } catch (err) {
      console.error("Pipeline error:", err);
    }
  }

  return {
    success: true,
    processed: products.length,
    inserted: results.length,
    data: results,
  };
}
export async function processProduct(product: any) {
  const result = await runWinnerPipeline([product]);

  return result;
}
