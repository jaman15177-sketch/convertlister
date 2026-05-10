import fs from "fs";
import { ExportProduct } from "./export.types";

export function exportCSV(
  products: ExportProduct[],
  output = "products.csv"
) {

  const headers =
    "id,title,price,marketplace,image\n";

  const rows = products.map(product => {

    return [
      product.id,
      product.title,
      product.price,
      product.marketplace,
      product.image
    ].join(",");

  }).join("\n");

  fs.writeFileSync(output, headers + rows);

  return output;
}
