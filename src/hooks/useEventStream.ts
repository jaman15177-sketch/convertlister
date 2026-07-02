"use client";

import { useEffect, useState } from "react";
import { eventStream } from "@/lib/realtime/event-stream";

export function useEventStream() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const channel = eventStream.start((event) => {
      setEvents((prev) => [event, ...prev]);
    });

    return () => {
      eventStream.stop();
    };
  }, []);

  return { events };
}
