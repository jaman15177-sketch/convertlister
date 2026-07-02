import { Queue } from "bullmq";

/**
 * ==========================================================
 * TENANT ISOLATED QUEUE SYSTEM
 * ==========================================================
 */

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
};

export function getOrganizationQueue(
  organizationId: string
): Queue {
  return new Queue(
    `organization:${organizationId}`,
    {
      connection,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 3,
      },
    }
  );
}
