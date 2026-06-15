"use client";

import { useEffect, useState } from "react";

export default function CreditBadge({ userId }: { userId: string }) {
  const [credits, setCredits] = useState(0);
  const [spent, setSpent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await fetch(`/api/credits/me?userId=${userId}`);
        const data = await res.json();

        setCredits(data.balance || 0);
        setSpent(data.spent_today || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [userId]);

  if (loading) return <div>Loading credits...</div>;

  return (
    <div
      style={{
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 8,
        width: 220,
      }}
    >
      <h4>💰 Credits</h4>

      <p>Balance: <b>{credits}</b></p>
      <p>Spent Today: <b>{spent}</b></p>

      {credits <= 10 && (
        <p style={{ color: "red" }}>
          ⚠ Low credits — buy more
        </p>
      )}
    </div>
  );
}
