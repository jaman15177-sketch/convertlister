export class ScraperSource {

  async get(scrapedData: any[]) {
    return {
      source: "scraper",
      products: scrapedData
    };
  }
}
