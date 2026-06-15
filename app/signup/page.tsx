"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * FINAL SAAS SIGNUP PAGE
 * - Auth
 * - Onboarding trigger
 * - Daily credits trigger
 * - Production clean flow
 */

export default function SignupPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!email || !password) {
        setError("Email and password required");
        return;
      }

      // =========================
      // 1. AUTH SIGNUP
      // =========================
      const { data, error: signUpError } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (!data?.user) {
        setError("Signup failed. Try again.");
        return;
      }

      // =========================
      // 2. ONBOARDING PIPELINE
      // =========================
      await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.user.id,
          email: data.user.email,
        }),
      });

      // =========================
      // 3. DAILY CREDITS GRANT
      // =========================
      await fetch("/api/credits/daily", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.user.id,
        }),
      });

      // =========================
      // 4. SUCCESS FLOW
      // =========================
      alert("Account created successfully!");

      // optional redirect
      // window.location.href = "/dashboard";

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Creating account..." : "Signup"}
        </button>
      </div>
    </div>
  );
}

/**
 * CLEAN SAAS UI STYLES
 */
const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f5f6f8",
  },

  card: {
    width: 360,
    padding: 24,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  title: {
    marginBottom: 16,
    fontSize: 22,
    fontWeight: 700,
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    border: "1px solid #ddd",
    borderRadius: 6,
  },

  button: {
    width: "100%",
    padding: 10,
    background: "#000",
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer",
  },

  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
  },
};
