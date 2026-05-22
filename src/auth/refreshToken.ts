import jwt from "jsonwebtoken";
import { AUTH_CONFIG } from "./config";

const store = new Map<string, string>(); // refreshToken -> userId

export function signRefreshToken(userId: string) {
  const token = jwt.sign({ userId }, AUTH_CONFIG.REFRESH_SECRET, {
    expiresIn: AUTH_CONFIG.REFRESH_EXPIRES_IN,
  });

  store.set(token, userId);
  return token;
}

export function verifyRefreshToken(token: string) {
  const decoded = jwt.verify(token, AUTH_CONFIG.REFRESH_SECRET) as any;

  if (!store.has(token)) {
    throw new Error("Invalid refresh token");
  }

  return decoded;
}

export function revokeRefreshToken(token: string) {
  store.delete(token);
}
