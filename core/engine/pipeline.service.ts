export class PipelineService {
  static async run(input?: any) {
    console.log("Pipeline running...");
    
    return {
      status: "ok",
      message: "pipeline service active",
      input: input ?? null,
      data: []
    };
  }
}
