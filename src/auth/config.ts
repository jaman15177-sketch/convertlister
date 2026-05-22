export const AUTH_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || "dev_secret",
  REFRESH_SECRET: process.env.REFRESH_SECRET || "dev_refresh_secret",
  ACCESS_EXPIRES_IN: "15m",
  REFRESH_EXPIRES_IN: "7d",
};
