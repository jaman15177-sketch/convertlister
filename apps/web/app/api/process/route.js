"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const redis_queue_1 = require("../../../core/queue/redis.queue");
async function POST(req) {
    try {
        const body = await req.json();
        if (!body.url) {
            return server_1.NextResponse.json({
                success: false,
                error: "URL required"
            }, { status: 400 });
        }
        const job = await (0, redis_queue_1.addJob)(body.url);
        return server_1.NextResponse.json({
            success: true,
            data: job
        });
    }
    catch (err) {
        return server_1.NextResponse.json({
            success: false,
            error: "Process failed"
        }, { status: 500 });
    }
}
