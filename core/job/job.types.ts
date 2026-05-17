export interface Job {
  jobId: string
  url: string
  status: "queued" | "processing" | "done" | "failed"
  retryCount: number
  createdAt: number
}
