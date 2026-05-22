type QueueJob = {
  type: string;
  payload: any;
};

export const productQueue = {
  add: async (type: string, payload: any) => {
    const job: QueueJob = {
      type,
      payload,
    };

    console.log("Queue job added:", job);

    return {
      success: true,
      jobId: Date.now(),
      job,
    };
  },
};
