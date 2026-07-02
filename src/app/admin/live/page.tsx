"use client";

import { useEventStream } from "@/hooks/useEventStream";

export default function LiveAdminPage() {
  const { events } = useEventStream();

  return (
    <div style={{ padding: 20 }}>
      <h1>🔥 LIVE EVENT STREAM</h1>

      <div>
        {events.map((e, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              margin: "10px 0",
              padding: 10,
            }}
          >
            <p>Type: {e.type}</p>
            <p>User: {e.user_id}</p>
            <p>Email: {e.email}</p>
            <p>Time: {e.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
