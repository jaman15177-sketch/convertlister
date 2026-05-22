type QueueJob = {
  id: string;
  payload: any;
};

const queue: QueueJob[] = [];

export async function addToQueue(payload: any) {
  const job = {
    id: crypto.randomUUID(),
    payload,
  };

  queue.push(job);

  return {
    success: true,
    job,
  };
}

export async function getNextJob() {
  return queue.shift() || null;
}

export async function getQueueLength() {
  return queue.length;
}
