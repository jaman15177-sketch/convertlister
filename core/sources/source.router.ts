import { ApiSource } from "./api.source";
import { ExtensionSource } from "./extension.source";
import { CsvSource } from "./csv.source";
import { ScraperSource } from "./scraper.source";

export class SourceRouter {

  private api = new ApiSource();
  private extension = new ExtensionSource();
  private csv = new CsvSource();
  private scraper = new ScraperSource();

  async route(type: string, payload: any) {

    switch (type) {

      case "api":
        return this.api.get(payload);

      case "extension":
        return this.extension.get(payload);

      case "csv":
        return this.csv.get(payload);

      case "scraper":
        return this.scraper.get(payload);

      default:
        throw new Error("Unknown source type");
    }
  }
}
