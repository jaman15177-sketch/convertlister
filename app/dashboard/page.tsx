"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"

export default function Dashboard() {

  const [items, setItems] = useState<any[]>([])

  async function load() {

    const { data } =
      await supabase
        .from("product_metrics")
        .select("*")
        .order("winning_score", {
          ascending: false
        })

    setItems(data || [])
  }

  useEffect(() => {

    load()

    const channel =
      supabase
        .channel("live-products")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "product_metrics"
          },
          () => load()
        )
        .subscribe()

    return () =>
      supabase.removeChannel(channel)

  }, [])

  return (
    <div style={{ padding: 20 }}>

      <h1>🔥 Winning Products SaaS</h1>

      {items.map((p, i) => (

        <div key={i}
          style={{
            padding: 10,
            border: "1px solid #ddd",
            marginBottom: 10
          }}
        >

          <h3>{p.title}</h3>

          <p>💰 ${p.price}</p>
          <p>⭐ {p.rating}</p>
          <p>📊 {p.reviews_count}</p>

          <p>
            🏆 SCORE: {p.winning_score}
          </p>

        </div>

      ))}

    </div>
  )
}
