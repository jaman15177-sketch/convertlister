import { Queue } from "bullmq";
import { connection } from "../../queue/redis.connection";

export const importQueue = new Queue("import-queue", {
  connection,
});
