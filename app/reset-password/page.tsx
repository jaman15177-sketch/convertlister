"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendResetLink = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      {
        redirectTo: `${window.location.origin}/update-password`,
      }
    );

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "If an account exists for this email, a password reset link has been sent."
    );
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-6">
        Forgot Password
      </h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={sendResetLink}
        disabled={loading}
        className="w-full border p-3 rounded"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      {message && (
        <p className="mt-4 text-sm">
          {message}
        </p>
      )}
    </div>
  );
}
