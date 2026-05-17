"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJob = createJob;
const uuid_1 = require("uuid");
const job_hash_1 = require("./job.hash");
function createJob(url) {
    return {
        jobId: (0, uuid_1.v4)(),
        url,
        urlHash: (0, job_hash_1.createUrlHash)(url),
        retryCount: 0
    };
}
