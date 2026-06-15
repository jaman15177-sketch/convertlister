"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWS = initWS;
exports.broadcast = broadcast;
const ws_1 = require("ws");
let wss;
function initWS(server) {
    wss = new ws_1.WebSocketServer({ server });
}
function broadcast(event, data) {
    if (!wss)
        return;
    const payload = JSON.stringify({ event, data });
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(payload);
        }
    });
}
