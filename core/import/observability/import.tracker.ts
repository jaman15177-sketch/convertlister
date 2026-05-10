export class ImportTracker {

  private stats = {
    total: 0,
    success: 0,
    failed: 0,
  };

  trackSuccess() {
    this.stats.total++;
    this.stats.success++;
  }

  trackFail() {
    this.stats.total++;
    this.stats.failed++;
  }

  getStats() {
    return this.stats;
  }
}
