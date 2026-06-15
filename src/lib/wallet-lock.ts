const lockMap = new Map<string, boolean>();

export async function withWalletLock(
  userId: string,
  fn: () => Promise<any>
) {
  if (lockMap.get(userId)) {
    throw new Error("Wallet is locked (concurrent request)");
  }

  lockMap.set(userId, true);

  try {
    const result = await fn();
    return result;
  } finally {
    lockMap.set(userId, false);
  }
}
