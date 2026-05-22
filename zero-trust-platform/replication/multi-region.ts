const regions = [
  "us-east-1",
  "eu-west-1",
  "asia-south1",
];

export async function replicateSecret(
  secret: any
) {
  for (const region of regions) {
    console.log(
      `🌍 Replicating secret to ${region}`
    );
  }
}
