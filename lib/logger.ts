export function log(event: string, data?: any) {
  console.log(`[PIPELINE ENGINE] ${event}`, data || {});
}
