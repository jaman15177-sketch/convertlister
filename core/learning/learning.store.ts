import { ListingFeedback } from "./feedback.types";

export class LearningStore {
  private data: ListingFeedback[] = [];

  save(feedback: ListingFeedback) {
    this.data.push(feedback);
  }

  all() {
    return this.data;
  }
}
