"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * PRODUCTION-GRADE LOGOUT PAGE
 * - Clears Supabase session
 * - Ensures secure redirect
 * - Prevents stale auth state
 */

export default function LogoutPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // =========================
        // 1. SIGN OUT USER
        // =========================
        await supabase.auth.signOut();

        // =========================
        // 2. FORCE NAVIGATION RESET
        // =========================
        router.replace("/login");

        // Optional: full reload ensures no cached auth state
        router.refresh();
      } catch (err) {
        // fallback safety
        console.error("Logout failed:", err);
        router.replace("/login");
      }
    };

    performLogout();
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600">Logging you out...</p>
    </div>
  );
}
