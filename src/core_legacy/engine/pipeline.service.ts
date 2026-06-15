export class PipelineService {
  static async run(input: any) {
    if (!input) {
      throw new Error("Pipeline input missing");
    }

    // simulate processing layers
    const processed = {
      original: input,
      normalized: typeof input === "string" ? input : JSON.stringify(input),
      score: Math.random() * 100,
    };

    return processed;
  }
}
