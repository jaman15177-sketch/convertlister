// src/collectors/signalInputs.ts

import { Signal } from "../types/signal";

/**
 * 🧠 SIGNAL INPUT LAYERS (CORE DATA INGESTION)
 * This layer collects raw signals from multiple sources
 * and converts them into unified Signal format
 */

/* ----------------------------
   1️⃣ Google Trends (mock / API later)
----------------------------- */
export async function getGoogleSignals(): Promise<Signal[]> {
  const data = [
    { keyword: "ai tools for ecommerce", volume: 900 },
    { keyword: "print on demand business", volume: 750 },
    { keyword: "shopify automation tools", volume: 820 },
  ];

  return data.map((item, i) => ({
    id: `google-${Date.now()}-${i}`,
    source: "google",
    keyword: item.keyword,
    volume: item.volume,
    velocity: Math.random() * 100,
    engagement: Math.floor(Math.random() * 300),
    timestamp: Date.now(),
  }));
}

/* ----------------------------
   2️⃣ Reddit Signals (problem discovery)
----------------------------- */
export async function getRedditSignals(): Promise<Signal[]> {
  const data = [
    { keyword: "best side hustle ideas 2026", volume: 600 },
    { keyword: "what business should i start", volume: 700 },
    { keyword: "how to make passive income online", volume: 850 },
  ];

  return data.map((item, i) => ({
    id: `reddit-${Date.now()}-${i}`,
    source: "reddit",
    keyword: item.keyword,
    volume: item.volume,
    velocity: Math.random() * 80,
    engagement: Math.floor(Math.random() * 500),
    timestamp: Date.now(),
    metadata: {
      productIntent: false,
      platform: "reddit",
    },
  }));
}

/* ----------------------------
   3️⃣ TikTok Signals (viral layer mock)
----------------------------- */
export async function getTikTokSignals(): Promise<Signal[]> {
  const data = [
    { keyword: "viral amazon gadgets 2026", volume: 1000 },
    { keyword: "tiktok made me buy it products", volume: 1200 },
    { keyword: "dropshipping winning products", volume: 950 },
  ];

  return data.map((item, i) => ({
    id: `tiktok-${Date.now()}-${i}`,
    source: "tiktok",
    keyword: item.keyword,
    volume: item.volume,
    velocity: Math.random() * 150,
    engagement: Math.floor(Math.random() * 1000),
    timestamp: Date.now(),
    metadata: {
      productIntent: true,
      adSpotted: true,
      platform: "tiktok",
    },
  }));
}

/* ----------------------------
   4️⃣ AliExpress Product Signals
----------------------------- */
export async function getAliExpressSignals(): Promise<Signal[]> {
  const data = [
    { keyword: "portable blender usb rechargeable", volume: 1100 },
    { keyword: "led sunset lamp viral", volume: 1300 },
    { keyword: "smart watch cheap best seller", volume: 980 },
  ];

  return data.map((item, i) => ({
    id: `aliexpress-${Date.now()}-${i}`,
    source: "product",
    keyword: item.keyword,
    volume: item.volume,
    velocity: Math.random() * 120,
    engagement: Math.floor(Math.random() * 600),
    timestamp: Date.now(),
    metadata: {
      productIntent: true,
      platform: "aliexpress",
      confidenceScore: 70 + Math.random() * 30,
    },
  }));
}

/* ----------------------------
   🔥 MASTER COLLECTOR (ALL SOURCES COMBINED)
----------------------------- */
export async function collectAllSignals(): Promise<Signal[]> {
  const [google, reddit, tiktok, aliexpress] = await Promise.all([
    getGoogleSignals(),
    getRedditSignals(),
    getTikTokSignals(),
    getAliExpressSignals(),
  ]);

  return [...google, ...reddit, ...tiktok, ...aliexpress];
}
