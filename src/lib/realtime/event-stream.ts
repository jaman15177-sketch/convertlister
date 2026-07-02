import { supabase } from "@/core/ssot/db/supabase.client";

type EventPayload = {
  id: string;
  type: "login" | "payment" | "wallet" | "system";
  user_id: string;
  email?: string;
  meta?: any;
  created_at?: string;
};

/**
 * 🔥 LIVE EVENT STREAM (REAL-TIME CORE ENGINE)
 * - listens Supabase DB changes
 * - streams to admin dashboard
 * - zero polling
 */
export class EventStream {
  private channel: any;

  /**
   * Start realtime listener
   */
  start(callback: (event: EventPayload) => void) {
    this.channel = supabase
      .channel("live-events-stream")

      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "events",
        },
        (payload) => {
          const event = payload.new as EventPayload;

          // 🚀 send to admin dashboard
          callback(event);
        }
      )

      .subscribe((status) => {
        console.log("🔴 EventStream status:", status);
      });

    return this.channel;
  }

  /**
   * Stop stream
   */
  stop() {
    if (this.channel) {
      supabase.removeChannel(this.channel);
    }
  }
}

/**
 * 🔥 SINGLETON (SSOT)
 */
export const eventStream = new EventStream();
