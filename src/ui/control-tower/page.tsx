"use client";

import { useEffect, useState } from "react";

/**
 * =========================================
 * TYPES
 * =========================================
 */

type Engine = {
  name: string;
  score: number;
};

type State = {
  type: string;
  tenantId: string;
  event?: any;
  state?: {
    ADS_METRICS?: any;
    HEALTH?: any;
    lastUpdated?: number;
  };
};

/**
 * =========================================
 * COLOR ENGINE (UI LAYER)
 * =========================================
 */

function getColor(score: number) {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-500";
  return "text-red-500";
}

/**
 * =========================================
 * MAIN CONTROL TOWER UI
 * =========================================
 */

export default function ControlTower() {
  const [state, setState] = useState<State | null>(null);
  const [connected, setConnected] = useState(false);

  /**
   * WebSocket connection
   */
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      setConnected(true);

      ws.send(
        JSON.stringify({
          type: "SUBSCRIBE",
          tenantId: "tenant_1",
        })
      );
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      setState(data);
    };

    ws.onclose = () => {
      setConnected(false);
    };

    return () => ws.close();
  }, []);

  const healthScore =
    state?.state?.HEALTH?.score ?? 0;

  const adsROAS =
    state?.state?.ADS_METRICS?.roas ?? 0;

  const spend =
    state?.state?.ADS_METRICS?.spend ?? 0;

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          SaaS Control Tower
        </h1>

        <div
          className={
            connected
              ? "text-green-400"
              : "text-red-500"
          }
        >
          {connected ? "LIVE" : "DISCONNECTED"}
        </div>
      </div>

      {/* HEALTH PANEL */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-900 rounded-xl">
          <p className="text-sm text-gray-400">
            System Health
          </p>
          <p
            className={`text-2xl font-bold ${getColor(
              healthScore
            )}`}
          >
            {healthScore}
          </p>
        </div>

        <div className="p-4 bg-gray-900 rounded-xl">
          <p className="text-sm text-gray-400">
            ROAS
          </p>
          <p className="text-2xl font-bold text-blue-400">
            {adsROAS}
          </p>
        </div>

        <div className="p-4 bg-gray-900 rounded-xl">
          <p className="text-sm text-gray-400">
            Spend
          </p>
          <p className="text-2xl font-bold text-purple-400">
            ${spend}
          </p>
        </div>
      </div>

      {/* LIVE EVENT STREAM */}
      <div className="mt-6 p-4 bg-gray-900 rounded-xl">
        <h2 className="text-lg font-bold mb-2">
          Live Event Stream
        </h2>

        <pre className="text-xs text-gray-300 overflow-auto">
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </div>
  );
}
