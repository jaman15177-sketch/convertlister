import { v4 as uuidv4 } from "uuid"
import { createUrlHash } from "./job.hash"
import { Job } from "./job"

export function createJob(url: string): Job {

  return {
    jobId: uuidv4(),
    url,
    urlHash: createUrlHash(url),
    retryCount: 0
  }
}
