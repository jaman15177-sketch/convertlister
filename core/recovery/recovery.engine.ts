// core/recovery/recovery.engine.ts

type RecoveryEvent = {
  id: string;
  type: string;
  payload?: any;
  error?: string;
};

const memoryRecoveryLog: RecoveryEvent[] = [];

export async function logRecovery(event: RecoveryEvent) {
  memoryRecoveryLog.push(event);

  console.log("🛟 Recovery logged:", event.id);

  return {
    success: true,
    total: memoryRecoveryLog.length,
  };
}

export async function getRecoveryLogs() {
  return memoryRecoveryLog;
}

export async function clearRecoveryLogs() {
  memoryRecoveryLog.length = 0;

  return {
    success: true,
  };
}
