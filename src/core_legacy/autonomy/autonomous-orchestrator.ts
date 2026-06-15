import { autonomousAlertEngine } from "@/core/alerts/autonomous-alert.engine";
import { feedbackLoopEngine } from "@/core/feedback/feedback-loop.engine";
import { selfOptimizingWeightEngine } from "@/core/optimization/self-optimizing-weight.engine";

export class AutonomousOrchestrator {
  async run(product: any) {
    // 1. Alert decision
    const result =
      await autonomousAlertEngine.process(product);

    // 2. Feedback learning
    await feedbackLoopEngine.record(product, "SUCCESS");

    // 3. Auto weight tuning
    const weights =
      await selfOptimizingWeightEngine.optimize();

    return {
      result,
      weights,
    };
  }
}

export const autonomousOrchestrator =
  new AutonomousOrchestrator();
