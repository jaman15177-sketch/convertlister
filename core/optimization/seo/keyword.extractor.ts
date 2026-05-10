export class KeywordExtractor {
  extract(title: string): string[] {
    if (!title) return [];

    return title
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 3);
  }
}
