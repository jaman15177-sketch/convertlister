const processedKeys = new Set<string>();

export async function isProcessed(key: string): Promise<boolean> {
  return processedKeys.has(key);
}

export async function markProcessed(key: string): Promise<void> {
  processedKeys.add(key);

  console.log("Marked processed:", key);
}

export async function clearProcessed(): Promise<void> {
  processedKeys.clear();

  console.log("Processed keys cleared");
}
