import { settingsStore } from "../core/platform/settings";

async function runSettingsTest() {
  console.log("🧪 SETTINGS SYSTEM TEST START");

  // =========================
  // 1. GET DEFAULT SETTINGS
  // =========================
  const initial = settingsStore.get();

  if (!initial.import.enabledSources.includes("shopify")) {
    throw new Error("❌ Default sources missing");
  }

  console.log("✔ Default settings loaded");

  // =========================
  // 2. UPDATE IMPORT SETTINGS
  // =========================
  settingsStore.updateImport({
    batchSize: 100,
    autoImport: false,
  });

  const updated1 = settingsStore.get();

  if (updated1.import.batchSize !== 100) {
    throw new Error("❌ Import settings not updated");
  }

  console.log("✔ Import settings updated");

  // =========================
  // 3. UPDATE INTELLIGENCE SETTINGS
  // =========================
  settingsStore.updateIntelligence({
    scoringThreshold: 85,
  });

  const updated2 = settingsStore.get();

  if (updated2.intelligence.scoringThreshold !== 85) {
    throw new Error("❌ Intelligence settings failed");
  }

  console.log("✔ Intelligence settings updated");

  // =========================
  // 4. UPDATE DISTRIBUTION SETTINGS
  // =========================
  settingsStore.updateDistribution({
    enableAds: true,
  });

  const updated3 = settingsStore.get();

  if (!updated3.distribution.enableAds) {
    throw new Error("❌ Distribution update failed");
  }

  console.log("✔ Distribution settings updated");

  // =========================
  // 5. ENABLE / DISABLE SOURCE
  // =========================
  settingsStore.disableSource("etsy");
  settingsStore.enableSource("etsy");

  const final = settingsStore.get();

  if (!final.import.enabledSources.includes("etsy")) {
    throw new Error("❌ Source toggle failed");
  }

  console.log("✔ Source enable/disable working");

  // =========================
  // FINAL STATE OUTPUT
  // =========================
  console.log("🧠 FINAL SETTINGS STATE:");
  console.log(JSON.stringify(final, null, 2));

  console.log("🎉 SETTINGS SYSTEM TEST PASSED");
}

runSettingsTest().catch((err) => {
  console.error("❌ SETTINGS TEST FAILED:", err);
});
