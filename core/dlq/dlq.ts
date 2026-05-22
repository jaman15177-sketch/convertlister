type FailedJob = {
  id?: string;
  error?: string;
  payload?: any;
};

const deadLetterQueue: FailedJob[] = [];

export async function addToDLQ(job: FailedJob) {
  deadLetterQueue.push(job);

  console.log("Job added to DLQ:", job);

  return {
    success: true,
    total: deadLetterQueue.length,
  };
}

export async function getDLQJobs() {
  return deadLetterQueue;
}

export async function clearDLQ() {
  deadLetterQueue.length = 0;

  return {
    success: true,
  };
}
export async function moveToDLQ(job: any, error?: any) {
  const dlqItem = {
    id: job?.id || `dlq-${Date.now()}`,
    payload: job,
    error: error?.message || String(error),
    timestamp: new Date().toISOString(),
  };

  await addToDLQ(dlqItem);

  return {
    success: true,
    moved: true,
  };
}
