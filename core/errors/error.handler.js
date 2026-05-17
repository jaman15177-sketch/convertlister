"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeError = normalizeError;
const app_error_1 = require("./app.error");
function normalizeError(err) {
    // ==========================
    // ALREADY STANDARDIZED
    // ==========================
    if (err instanceof app_error_1.AppError) {
        return err;
    }
    const message = err?.message || "UNKNOWN_ERROR";
    // ==========================
    // NETWORK ERRORS
    // ==========================
    if (message.includes("timeout") ||
        message.includes("ECONNRESET") ||
        message.includes("ETIMEDOUT") ||
        message.includes("socket hang up") ||
        message.includes("network")) {
        return new app_error_1.AppError("NETWORK_FAILURE", "NETWORK_ERROR", true);
    }
    // ==========================
    // RATE LIMIT ERRORS
    // ==========================
    if (message.includes("429") ||
        message.includes("rate limit")) {
        return new app_error_1.AppError("RATE_LIMITED", "RATE_LIMIT_ERROR", true);
    }
    // ==========================
    // CAPTCHA ERRORS
    // ==========================
    if (message.includes("captcha")) {
        return new app_error_1.AppError("CAPTCHA_TRIGGERED", "CAPTCHA_ERROR", false);
    }
    // ==========================
    // AUTH ERRORS
    // ==========================
    if (message.includes("401") ||
        message.includes("403") ||
        message.includes("unauthorized")) {
        return new app_error_1.AppError("AUTH_FAILURE", "AUTH_ERROR", false);
    }
    // ==========================
    // INVALID INPUT
    // ==========================
    if (message.includes("invalid") ||
        message.includes("bad request")) {
        return new app_error_1.AppError("INVALID_INPUT", "VALIDATION_ERROR", false);
    }
    // ==========================
    // UNKNOWN FALLBACK
    // ==========================
    return new app_error_1.AppError(message, "UNHANDLED_ERROR", true);
}
