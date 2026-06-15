import { z } from "zod";

export const ProductContract = z.object({
  productId: z.string().min(1),
  source: z.string(),
  title: z.string(),
  price: z.number().min(0),
  images: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
});

export type ProductDTO = z.infer<typeof ProductContract>;
