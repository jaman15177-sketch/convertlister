// src/collectors/googleTrends.ts

import { Signal } from "../types/signal";

/**
 * 🔥 Google Trends MOCK COLLECTOR
 * Later replace with real API / scraping engine
 */
export async function fetchGoogleTrends(): Promise<Signal[]> {
  const trends = [
    { keyword: "AI tools for ecommerce", volume: 850 },
    { keyword: "print on demand shirts", volume: 620 },
    { keyword: "dropshipping automation", volume: 990 },
    { keyword: "faceless youtube channel", volume: 770 },
    { keyword: "shopify winning products", volume: 910 },
  ];

  return trends.map((t, i) => ({
    id: `google-${Date.now()}-${i}`,
    source: "google",
    keyword: t.keyword,
    volume: t.volume,
    velocity: Math.random() * 100, // mock momentum
    engagement: Math.floor(Math.random() * 500),
    timestamp: Date.now(),
  }));
}
