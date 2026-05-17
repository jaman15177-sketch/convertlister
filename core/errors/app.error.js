"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, code = "UNKNOWN_ERROR", retryable = true) {
        super(message);
        this.name = "AppError";
        this.code = code;
        this.retryable = retryable;
    }
}
exports.AppError = AppError;
