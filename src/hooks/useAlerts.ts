"use client";

import { useState, useEffect } from "react";
export function useAlerts() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onmessage = (msg) => {
      const event = JSON.parse(msg.data);

      if (event.type === "alert.updated") {
        setAlerts((prev) => {
          const exists = prev.find((a) => a.id === event.payload.id);

          if (exists) {
            return prev.map((a) =>
              a.id === event.payload.id ? event.payload : a
            );
          }

          return [event.payload, ...prev];
        });
      }
    };

    return () => ws.close();
  }, []);

  return alerts;
}
