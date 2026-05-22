import { hashPassword, comparePassword } from "./password";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./jwt";
import { revokeRefreshToken } from "./refreshToken";

export class AuthService {
  // =========================
  // REGISTER
  // =========================
  async register(email: string, password: string) {
    const hashed = await hashPassword(password);

    const user = {
      id: crypto.randomUUID(),
      email,
      password: hashed,
    };

    const accessToken = signAccessToken({
      userId: user.id,
    });

    const refreshToken = signRefreshToken({
      userId: user.id,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  // =========================
  // LOGIN
  // =========================
  async login(user: { id: string; password: string }, storedHash: string) {
    const isValid = await comparePassword(user.password, storedHash);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = signAccessToken({
      userId: user.id,
    });

    const refreshToken = signRefreshToken({
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  // =========================
  // REFRESH TOKEN
  // =========================
  async refresh(token: string) {
    const payload = verifyRefreshToken(token) as any;

    if (!payload?.userId) {
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = signAccessToken({
      userId: payload.userId,
    });

    return {
      accessToken: newAccessToken,
    };
  }

  // =========================
  // LOGOUT
  // =========================
  async logout(refreshToken: string) {
    await revokeRefreshToken(refreshToken);

    return {
      success: true,
    };
  }
}

// =========================
// SINGLETON EXPORT (IMPORTANT)
// =========================
export const authService = new AuthService();
