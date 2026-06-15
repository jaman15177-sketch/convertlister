"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebSocket = initWebSocket;
const ws_1 = require("ws");
const event_bus_1 = require("../bus/event-bus");
let wss;
function initWebSocket(server) {
    wss = new ws_1.WebSocketServer({ server });
    wss.on("connection", (ws) => {
        ws.send(JSON.stringify({ type: "connected" }));
    });
    event_bus_1.eventBus.on("alert.created", (data) => {
        broadcast({ type: "alert.created", data });
    });
    event_bus_1.eventBus.on("alert.updated", (data) => {
        broadcast({ type: "alert.updated", data });
    });
}
function broadcast(payload) {
    if (!wss)
        return;
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(payload));
        }
    });
}
