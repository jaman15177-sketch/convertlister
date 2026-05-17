"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env.local" });
require("dotenv/config");
console.log("🚀 WORKER STARTED");
async function startWorker() {
    try {
        console.log("♻️ RECOVERY STARTED");
        // 🔥 TEST LOOP (replace later with real queue)
        for (let i = 1; i <= 5; i++) {
            console.log("⚙️ PROCESSING JOB:", i);
            await new Promise((r) => setTimeout(r, 500));
            console.log("✅ DONE:", i);
        }
        console.log("🏁 READY");
    }
    catch (err) {
        console.error("❌ WORKER ERROR:", err);
    }
}
startWorker();
