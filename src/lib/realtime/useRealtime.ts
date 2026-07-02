import { useEffect, useState } from "react";
import { supabase } from "@/core/ssot/db/supabase.client";

export function useRealtime(
  table: string,
  userId?: string
) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let query: any = (supabase as any)
        .from(table)
        .select("*");

      if (userId) {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query;

      if (!error) {
        setData(data ?? []);
      }

      setLoading(false);
    };

    fetchData();

    const channel = (supabase as any)
      .channel(`realtime-${table}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table,
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      (supabase as any).removeChannel(channel);
    };
  }, [table, userId]);

  return {
    data,
    loading,
  };
}
