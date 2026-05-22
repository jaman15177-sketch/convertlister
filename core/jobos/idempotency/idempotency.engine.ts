const inMemoryLock = new Set<string>();

export function acquireLock(jobId: string): boolean {
  if (inMemoryLock.has(jobId)) return false;
  inMemoryLock.add(jobId);
  return true;
}

export function releaseLock(jobId: string) {
  inMemoryLock.delete(jobId);
}
