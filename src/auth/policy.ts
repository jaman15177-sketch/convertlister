export function authorize(role: string, action: string) {
  const rules: Record<string, string[]> = {
    admin: ["*"],
    user: ["READ", "CREATE"],
    system: ["READ"],
  };

  const allowed = rules[role] || [];

  if (allowed.includes("*")) return true;

  if (!allowed.includes(action)) {
    throw new Error("FORBIDDEN");
  }

  return true;
}
