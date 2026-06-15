"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGatewayContext = createGatewayContext;
const crypto_1 = __importDefault(require("crypto"));
async function createGatewayContext() {
    return {
        requestId: crypto_1.default.randomUUID(),
        user: {
            id: "user_demo_123",
        },
        org: {
            id: "org_demo_123",
            plan: "pro",
            credits: 100,
        },
    };
}
