"use client";

import { useEffect, useState } from "react";

export default function WalletCard({ userId }: { userId: string }) {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWallet() {
      try {
        const res = await fetch("/api/wallet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (data?.balance !== undefined) {
          setBalance(data.balance);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWallet();
  }, [userId]);

  if (loading) {
    return <div>Loading wallet...</div>;
  }

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        maxWidth: 300,
      }}
    >
      <h3>Your Wallet</h3>

      <p style={{ fontSize: 24, fontWeight: "bold" }}>
        {balance} Credits
      </p>

      <p>1 product = 10 credits</p>
    </div>
  );
}
