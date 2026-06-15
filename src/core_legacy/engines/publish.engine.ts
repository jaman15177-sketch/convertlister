export class PublishEngine {
  publish(product: any) {
    return {
      ...product,
      status: "published",
      publishedAt: new Date(),
      live: true,
    };
  }
}

export const publishEngine = new PublishEngine();
