export class FeedbackLoop {

  private logs: any[] = [];

  collect(event: any) {
    this.logs.push({
      ...event,
      timestamp: Date.now()
    });
  }

  getHighPerformers() {
    return this.logs.filter(l => l.ctr > 5);
  }

  generateInsights() {
    const high = this.getHighPerformers();

    return {
      avgTitleLength:
        high.reduce((a, b) => a + b.title.length, 0) / (high.length || 1),

      avgBullets:
        high.reduce((a, b) => a + b.bullets.length, 0) / (high.length || 1),

      winningMarketplaces:
        this.topMarketplace(high)
    };
  }

  private topMarketplace(data: any[]) {
    const map: Record<string, number> = {};

    data.forEach(d => {
      map[d.marketplace] = (map[d.marketplace] || 0) + 1;
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])[0];
  }
}
