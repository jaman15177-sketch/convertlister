import { ExportProduct } from "./export.types";

import { exportJSON } from "./json.exporter";
import { exportCSV } from "./csv.exporter";

export function runExport(
  products: ExportProduct[]
) {

  const jsonFile = exportJSON(products);
  const csvFile = exportCSV(products);

  return {
    jsonFile,
    csvFile
  };
}
