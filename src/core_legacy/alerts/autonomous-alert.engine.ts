import { realtimeEventBus } from "@/core/events/realtime-event-bus";
import { autoDecisionEngine } from "@/core/engine/auto-decision.engine";
import { supabaseAdmin } from "@/lib/server/supabase-admin";

export class AutonomousAlertEngine {
  async process(product: any) {
    const decision = autoDecisionEngine.decide({
      score: product.finalScore || 0,
      marketFit: product.marketFitScore || 0,
      trend: product.trendScore || 0,
      profit: product.profitabilityScore || 0,
      competition: product.competitionScore || 0,
    });

    // 1. Save decision to DB
    const { data } = await supabaseAdmin
      .from("autonomous_actions")
      .insert({
        product_id: product.productId,
        action: decision.action,
        status: "PENDING",
        payload: product,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    // 2. Emit real-time event
    await realtimeEventBus.emit({
      topic: "AUTONOMOUS_ALERT",
      data: {
        productId: product.productId,
        decision,
      },
    });

    // 3. Auto-execution logic
    if (decision.action === "EXECUTE") {
      await this.execute(product);
    }

    return {
      saved: data,
      decision,
    };
  }

  private async execute(product: any) {
    console.log("🚀 AUTONOMOUS EXECUTION:", product.productId);

    await supabaseAdmin
      .from("autonomous_actions")
      .update({
        status: "EXECUTED",
      })
      .eq("product_id", product.productId);
  }
}

export const autonomousAlertEngine =
  new AutonomousAlertEngine();
