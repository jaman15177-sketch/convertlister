let intervalId: NodeJS.Timeout | null = null;

export const intervalScheduler = {
  start(ms: number) {
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
      console.log("⏱ Scheduler tick:", new Date().toISOString());
    }, ms);

    console.log(`✅ Scheduler started (${ms}ms interval)`);
  },

  stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      console.log("🛑 Scheduler stopped");
    }
  },
};
