import { RETRY_DELAYS } from "./retry.config"

export function getRetryDelay(retryCount: number) {

  const base =
    RETRY_DELAYS[retryCount] || 20000

  const jitter =
    Math.floor(Math.random() * 1000)

  return base + jitter
}
