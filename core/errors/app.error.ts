export class AppError extends Error {

  public retryable: boolean
  public code: string

  constructor(
    message: string,
    code = "UNKNOWN_ERROR",
    retryable = true
  ) {

    super(message)

    this.name = "AppError"
    this.code = code
    this.retryable = retryable
  }
}
