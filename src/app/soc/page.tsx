"use client";

import { useEffect, useState } from "react";

type SOCEvent = {
  type: "API_ATTACK" | "FRAUD" | "TENANT_BREACH" | "RATE_LIMIT" | "SYSTEM";
  organizationId: string;
  riskScore: number;
  ip: string;
  timestamp: number;
};

export default function SOCPage() {
  const [events, setEvents] = useState<SOCEvent[]>([]);
  const [status, setStatus] = useState("disconnected");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = () => {
      setStatus("connected");
    };

    ws.onclose = () => {
      setStatus("disconnected");
    };

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);

        if (data.type !== "SYSTEM") {
          setEvents((prev) => [data, ...prev.slice(0, 100)]);
        }
      } catch {}
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "monospace", background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      
      <h1>🚨 REAL-TIME SOC DASHBOARD</h1>

      <p>Status: {status === "connected" ? "🟢 LIVE" : "🔴 OFFLINE"}</p>

      <div style={{ marginTop: 20 }}>
        {events.map((e, i) => (
          <div
            key={i}
            style={{
              padding: 12,
              marginBottom: 10,
              border: "1px solid #333",
              borderRadius: 8,
              background:
                e.riskScore > 85
                  ? "#3b0000"
                  : e.riskScore > 60
                  ? "#3b2a00"
                  : "#111",
            }}
          >
            <div>🔥 TYPE: {e.type}</div>
            <div>🏢 TENANT: {e.organizationId}</div>
            <div>🌐 IP: {e.ip}</div>
            <div>⚠ RISK: {e.riskScore}</div>
            <div>⏱ TIME: {new Date(e.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
