export function detectSaaSFraud(input: {
  usage: number;
  ip?: string;
}) {
  const { usage, ip } = input;

  let risk = 0;

  if (usage > 5000) risk += 50;
  if (!ip) risk += 20;

  return {
    blocked: risk > 70,
    risk,
  };
}
