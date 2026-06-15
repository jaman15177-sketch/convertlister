"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withWalletLock = withWalletLock;
const lockMap = new Map();
async function withWalletLock(userId, fn) {
    if (lockMap.get(userId)) {
        throw new Error("Wallet is locked (concurrent request)");
    }
    lockMap.set(userId, true);
    try {
        const result = await fn();
        return result;
    }
    finally {
        lockMap.set(userId, false);
    }
}
