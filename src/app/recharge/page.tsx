"use client";

import { useState } from "react";
import { PAYMENT_CONFIG } from "@/config/payment";

export default function RechargePage() {
  const [trxId, setTrxId] = useState("");
  const [sender, setSender] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submitRecharge() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/recharge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 100,
          credits: 100,
          trx_id: trxId,
          sender_number: sender,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Recharge request submitted successfully!");
        setTrxId("");
        setSender("");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h1>Recharge Credits</h1>

      <div
        style={{
          padding: 10,
          background: "#f5f5f5",
          marginBottom: 20,
        }}
      >
        <p>
          Send bKash to:{" "}
          <b style={{ fontSize: 18 }}>
            {PAYMENT_CONFIG.bkashNumber}
          </b>
        </p>
        <p>Rate: 1 Taka = 1 Credit</p>
      </div>

      <input
        placeholder="Transaction ID"
        value={trxId}
        onChange={(e) => setTrxId(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: 10,
          marginBottom: 10,
        }}
      />

      <input
        placeholder="Sender Number"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: 10,
          marginBottom: 10,
        }}
      />

      <button
        onClick={submitRecharge}
        disabled={loading}
        style={{
          padding: 10,
          width: "100%",
          background: loading ? "gray" : "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Submitting..." : "Submit Recharge"}
      </button>

      {message && (
        <p style={{ marginTop: 15, color: "blue" }}>
          {message}
        </p>
      )}
    </div>
  );
}
