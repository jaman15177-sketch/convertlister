"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const redis_queue_1 = require("../../../core/queue/redis.queue");
async function POST(req) {
    try {
        const body = await req.json();
        if (!body.urls || !Array.isArray(body.urls)) {
            return server_1.NextResponse.json({
                success: false,
                error: "urls array required"
            }, { status: 400 });
        }
        const jobs = await Promise.all(body.urls.map(async (url) => {
            return await (0, redis_queue_1.addJob)(url);
        }));
        return server_1.NextResponse.json({
            success: true,
            queued: jobs.length,
            jobs
        });
    }
    catch (err) {
        return server_1.NextResponse.json({
            success: false,
            error: "Bulk queue failed"
        }, { status: 500 });
    }
}
