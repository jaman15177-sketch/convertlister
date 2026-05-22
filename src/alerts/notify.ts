export async function sendAlert(item: any) {
  // Only alert for high value winners
  if (item.score < 120) return;

  console.log("🚨 WINNER ALERT DETECTED:");
  console.log("Keyword:", item.keyword);
  console.log("Score:", item.score);
  console.log("Source:", item.source);

  // 🔥 Future upgrades:
  // 1. Telegram Bot
  // 2. Email (Resend / Sendgrid)
  // 3. Discord Webhook
}
