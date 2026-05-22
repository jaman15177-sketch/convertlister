export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "dev_secret",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
};
