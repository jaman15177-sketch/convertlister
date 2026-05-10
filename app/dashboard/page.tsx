"use client";

import { useState } from "react";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleProcess() {
    if (!file) return;

    setLoading(true);

    const res = await fetch("/api/mock", {
      method: "POST",
      body: JSON.stringify({ name: file.name }),
    });

    const data = await res.json();
    setResult(data);

    setLoading(false);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>ConvertLister Dashboard</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={handleProcess} style={{ marginTop: 20 }}>
        {loading ? "Processing..." : "Process Image"}
      </button>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>Result</h3>
          <p>Score: {result.score}</p>
          <p>Grade: {result.grade}</p>
          <p>Prediction: {result.prediction}</p>
        </div>
      )}
    </div>
  );
}
