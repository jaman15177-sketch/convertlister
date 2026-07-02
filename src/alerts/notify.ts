export async function sendAlert(item: {
  score: number;
  [key: string]: any;
}) {
  // Only alert for high value winners
  if (item.score < 120) return;

  // alert logic here
}
