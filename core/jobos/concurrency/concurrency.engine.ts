export async function runConcurrentWorkers(
  workerFn: () => Promise<void>,
  concurrency = 3
) {
  console.log(
    `⚡ Starting ${concurrency} Workers`
  );

  const workers = [];

  for (
    let i = 0;
    i < concurrency;
    i++
  ) {
    workers.push(workerFn());
  }

  await Promise.all(workers);
}
