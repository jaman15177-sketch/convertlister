export type Result<T> = {
  success: true;
  data: T;
};

export type ErrorResult = {
  success: false;
  error: string;
};

export type AsyncResult<T> = Promise<Result<T> | ErrorResult>;

export function ok<T>(data: T): Result<T> {
  return {
    success: true,
    data,
  };
}

export function fail(error: string): ErrorResult {
  return {
    success: false,
    error,
  };
}
