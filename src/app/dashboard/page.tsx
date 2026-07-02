"use client";

import { useAlertStream } from "@/hooks/use-alert-stream";
import { useRealtime } from "@/lib/realtime/useRealtime";

export default function Dashboard() {
  const { alerts } = useAlertStream();

  // 🔥 REALTIME DATA (SAFE ADDITION)
  const userId = "CURRENT_USER_ID"; // replace later with auth

  const { data: wallet } = useRealtime("wallets", userId);
  const { data: listings } = useRealtime("listings", userId);
  const { data: transactions } = useRealtime("transactions", userId);

  return (
    <div style={{ padding: 20 }}>

      <h1>SaaS v3 Monitoring Dashboard</h1>

      {/* 🔥 ALERT SYSTEM (OLD FEATURE SAFE) */}
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

      {/* 💰 WALLET (NEW SAFE ADDITION) */}
      <h2>💰 Wallet</h2>
      {wallet.map((w) => (
        <div key={w.id}>
          Credits: {w.credits} | Balance: ${w.balance}
        </div>
      ))}

      {/* 📦 LISTINGS */}
      <h2>📦 Listings</h2>
      {listings.map((l) => (
        <div key={l.id}>
          {l.title} - {l.status}
        </div>
      ))}

      {/* 💳 TRANSACTIONS */}
      <h2>💳 Transactions</h2>
      {transactions.map((t) => (
        <div key={t.id}>
          {t.type} - ${t.amount}
        </div>
      ))}

    </div>
  );
}
