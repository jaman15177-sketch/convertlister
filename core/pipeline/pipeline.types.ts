
export interface PipelineProduct {
  id: string;
  title: string;
  image: string;
  marketplace: "amazon" | "shopify" | "etsy" | "tiktok";
}

export interface PipelineResult {
  optimizedImage: string;
  score: number;
  grade: string;
  prediction: string;
  exported: {
    jsonFile: string;
    csvFile: string;
  };
}
