"use strict";
// src/collectors/googleTrends.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGoogleTrends = fetchGoogleTrends;
/**
 * 🔥 Google Trends MOCK COLLECTOR
 * Later replace with real API / scraping engine
 */
async function fetchGoogleTrends() {
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
