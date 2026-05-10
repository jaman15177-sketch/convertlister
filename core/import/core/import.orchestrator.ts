import { ImportValidator } from "./import.validator";
import { ImportTransformer } from "./import.transformer";
import { BatchSplitter } from "../batch/batch.splitter";
import { importQueue } from "../queue/import.queue";

export class ImportOrchestrator {

  private validator = new ImportValidator();
  private transformer = new ImportTransformer();
  private batcher = new BatchSplitter();

  async execute(products: any[]) {

    // STEP 1: batch split
    const batches = this.batcher.split(products, 30);

    for (const batch of batches) {

      for (const product of batch) {

        // STEP 2: validate
        const check = this.validator.validate(product);

        if (!check.valid) continue;

        // STEP 3: normalize
        const clean = this.transformer.normalize(product);

        // STEP 4: push to queue
        await importQueue.add("import-job", {
          product: clean,
        });
      }
    }

    return {
      status: "imported",
      batches: batches.length
    };
  }
}
