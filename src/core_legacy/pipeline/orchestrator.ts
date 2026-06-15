import { eventBus } from "../events/event-bus.redis";

export type PipelineStep =
  | "IMPORT_PRODUCT"
  | "SCORE_PRODUCT"
  | "OPTIMIZE_PRODUCT"
  | "PUBLISH_PRODUCT";

export interface PipelineContext<T = any> {
  traceId: string;
  tenantId?: string;
  step: PipelineStep;
  data: T;
  retryCount?: number;
}

export class PipelineOrchestrator {
  private maxRetries = 3;

  /**
   * ENTRY POINT
   * This is the ONLY method external systems should call
   */
  async execute<T>(
    step: PipelineStep,
    data: T,
    tenantId?: string
  ) {
    const context: PipelineContext<T> = {
      traceId: this.generateTraceId(),
      tenantId,
      step,
      data,
      retryCount: 0,
    };

    return this.dispatch(context);
  }

  /**
   * CORE DISPATCHER (FACTORY ENGINE BRAIN)
   */
  private async dispatch<T>(ctx: PipelineContext<T>) {
    try {
      console.log("🚀 PIPELINE START:", ctx.step, ctx.traceId);

      await eventBus.publish("pipeline-events", {
        event: ctx.step,
        traceId: ctx.traceId,
        tenantId: ctx.tenantId,
        data: ctx.data,
        timestamp: Date.now(),
      });

      const nextStep = this.getNextStep(ctx.step);

      if (!nextStep) {
        console.log("🏁 PIPELINE COMPLETE:", ctx.traceId);
        return {
          success: true,
          traceId: ctx.traceId,
          completed: true,
        };
      }

      // auto-chain next step
      return this.execute(nextStep, ctx.data, ctx.tenantId);
    } catch (error: any) {
      console.error("❌ PIPELINE FAILED:", error.message);

      if ((ctx.retryCount ?? 0) < this.maxRetries) {
        console.log("🔁 RETRYING PIPELINE:", ctx.traceId);

        return this.dispatch({
          ...ctx,
          retryCount: (ctx.retryCount ?? 0) + 1,
        });
      }

      await this.handleFailure(ctx, error);

      return {
        success: false,
        traceId: ctx.traceId,
        error: error.message,
      };
    }
  }

  /**
   * PIPELINE FLOW DEFINITIONS
   */
  private getNextStep(step: PipelineStep): PipelineStep | null {
    switch (step) {
      case "IMPORT_PRODUCT":
        return "SCORE_PRODUCT";

      case "SCORE_PRODUCT":
        return "OPTIMIZE_PRODUCT";

      case "OPTIMIZE_PRODUCT":
        return "PUBLISH_PRODUCT";

      case "PUBLISH_PRODUCT":
        return null;

      default:
        return null;
    }
  }

  /**
   * FAILURE HANDLING (DLQ READY HOOK)
   */
  private async handleFailure<T>(
    ctx: PipelineContext<T>,
    error: Error
  ) {
    await eventBus.publish("pipeline-failed", {
      event: "PIPELINE_FAILED",
      traceId: ctx.traceId,
      tenantId: ctx.tenantId,
      data: {
        step: ctx.step,
        payload: ctx.data,
        error: error.message,
      },
      timestamp: Date.now(),
    });

    console.error("💀 SENT TO FAILURE STREAM:", ctx.traceId);
  }

  /**
   * TRACE ID GENERATOR (OBSERVABILITY CORE)
   */
  private generateTraceId() {
    return `trace_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;
  }
}

export const pipeline = new PipelineOrchestrator();
