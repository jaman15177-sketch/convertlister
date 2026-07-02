"use client";

import { useState, useEffect } from "react";
export function useAlertStream() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "alert.created") {
        setAlerts((prev) => [msg.data, ...prev]);
      }

      if (msg.type === "alert.updated") {
        setAlerts((prev) =>
          prev.map((a) =>
            a.id === msg.data.id ? msg.data : a
          )
        );
      }
    };

    return () => ws.close();
  }, []);

  return { alerts };
}
