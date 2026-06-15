export interface ProductEntity {
  globalId: string;

  title: string;

  sources: {
    source: string;
    sourceId: string;
    price: number;
  }[];

  metadata?: Record<string, any>;
}
