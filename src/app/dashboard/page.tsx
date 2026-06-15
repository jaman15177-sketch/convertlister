"use client";

import { useAlertStream } from "@/hooks/use-alert-stream";

export default function Dashboard() {
  const { alerts } = useAlertStream();

  return (
    <div style={{ padding: 20 }}>
      <h1>SaaS v3 Monitoring Dashboard</h1>

      <h3>Live Alerts: {alerts.length}</h3>

      <div>
        {alerts.map((a) => (
          <div
            key={a.id}
            style={{
              border: "1px solid #333",
              margin: 10,
              padding: 10,
            }}
          >
            <b>{a.job_id}</b>
            <p>{a.message}</p>
            <small>Severity: {a.severity}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
