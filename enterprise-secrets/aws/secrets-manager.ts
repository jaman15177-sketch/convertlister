export async function getSecret(name: string) {
  const value = process.env[name];

  if (!value) {
    console.warn(`⚠️ Missing env: ${name}`);
  }

  return value || null;
}

export async function setSecret(name: string, value: string) {
  console.log(`🧠 Secret stored (mock): ${name}`);
  return { success: true };
}

