export function mtls(req: any, res: any, next: any) {
  const cert = req.headers["x-service-cert"];

  if (!cert || cert !== "valid-cert") {
    return res.status(403).json({
      error: "mTLS verification failed",
    });
  }

  next();
}
