export function createJob(input: {
  id?: string;
  type: string;
  payload: any;
  userId?: string;
  maxAttempts?: number;
}) {
  return {
    id: input.id ?? crypto.randomUUID(),

    userId: input.userId ?? "system",
    maxAttempts: input.maxAttempts ?? 3,

    type: input.type,
    payload: input.payload,

    status: "pending",
    attempts: 0,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
