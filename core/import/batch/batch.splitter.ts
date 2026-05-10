export class BatchSplitter {

  split(items: any[], size = 30) {
    const batches = [];

    for (let i = 0; i < items.length; i += size) {
      batches.push(items.slice(i, i + size));
    }

    return batches;
  }
}
