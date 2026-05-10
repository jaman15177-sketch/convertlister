export class PipelineLogger {

  log(step: string, message: string) {
    console.log(`[${step}] ${message}`);
  }

  error(step: string, message: string) {
    console.error(`[${step}] ERROR: ${message}`);
  }
}
