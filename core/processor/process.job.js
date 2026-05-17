"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processJob = processJob;
async function processJob(job) {
    console.log(`⚙️ PROCESSING: ${job.url}`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(`✅ JOB COMPLETED: ${job.url}`);
}
