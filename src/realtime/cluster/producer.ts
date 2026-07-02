console.log("🚀 Producer started...");

setInterval(() => {
  const event = {
    organizationId: "tenant_1",
    type: "ADS_METRICS",
    payload: {
      roas: Number((Math.random() * 3).toFixed(2)),
      spend: Math.floor(Math.random() * 1000),
    },
    timestamp: Date.now(),
  };

  console.log("📡 Publishing:", event);
}, 2000);
