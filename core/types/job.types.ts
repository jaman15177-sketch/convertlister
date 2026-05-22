export interface Job {
  id: string;

  type?: string;

  url?: string;

  payload?: any;

  status?: "pending" | "processing" | "done" | "failed";

  userId?: string;

  maxAttempts?: number;

  attempts?: number;

  createdAt?: string;

  updatedAt?: string;

  failedReason?: string;
}
