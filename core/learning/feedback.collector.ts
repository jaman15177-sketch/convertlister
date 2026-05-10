import { ListingFeedback } from "./feedback.types";

export class FeedbackCollector {
  private store: ListingFeedback[] = [];

  collect(data: ListingFeedback) {
    this.store.push(data);
  }

  getAll() {
    return this.store;
  }
}
