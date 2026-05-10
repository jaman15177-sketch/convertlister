import fs from "fs";
import { ExportProduct } from "./export.types";

export function exportJSON(
  products: ExportProduct[],
  output = "products.json"
) {

  fs.writeFileSync(
    output,
    JSON.stringify(products, null, 2)
  );

  return output;
}
