import { supabaseAdmin } from "@/lib/server/supabase-admin";

export class FeedbackLoopEngine {
  async record(product: any, outcome: "SUCCESS" | "FAIL") {
    await supabaseAdmin.from("historical_learning").insert({
      product_id: product.productId,
      decision: product.decision,
      score: product.finalScore,
      outcome,
      created_at: new Date().toISOString(),
    });
  }

  async getStats() {
    const { data } = await supabaseAdmin
      .from("historical_learning")
      .select("*");

    const total = data?.length || 0;
    const success =
      data?.filter((d) => d.outcome === "SUCCESS").length || 0;

    return {
      total,
      successRate: total ? success / total : 0,
    };
  }
}

export const feedbackLoopEngine =
  new FeedbackLoopEngine();
