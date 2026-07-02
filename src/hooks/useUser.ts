import { useAuth } from "@/providers/auth-provider";

export function useUser() {
  const ctx = useAuth();

  if (!ctx) {
    throw new Error("useUser must be used inside AuthProvider");
  }

  const { user, loading } = ctx;

  return { user, loading };
}
