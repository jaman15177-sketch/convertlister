import CreditBadge from "@/components/CreditBadge";

/**
 * SAAS DASHBOARD (FINAL CLEAN VERSION)
 * - Credit system integrated
 * - Ready for auth upgrade
 * - Production-safe layout structure
 */

export default function Dashboard() {
  // TODO: replace with real auth user from Supabase session
  const userId = "replace-with-auth-user-id";

  return (
    <div style={styles.container}>
      
      {/* =========================
          HEADER SECTION (TOP BAR)
      ========================= */}
      <div style={styles.header}>
        
        <div>
          <h2 style={styles.title}>Dashboard</h2>
          <p style={styles.subtitle}>
            Manage your products & usage
          </p>
        </div>

        {/* 💰 CREDIT SYSTEM (REVENUE ENGINE UI) */}
        <CreditBadge userId={userId} />
      </div>

      {/* =========================
          MAIN CONTENT AREA
      ========================= */}
      <div style={styles.content}>

        <div style={styles.card}>
          <h3>📦 Products</h3>
          <p>Create and manage your products here.</p>
        </div>

        <div style={styles.card}>
          <h3>📊 Analytics</h3>
          <p>Track usage, credits, and revenue signals.</p>
        </div>

        <div style={styles.card}>
          <h3>⚙️ Settings</h3>
          <p>Manage organization and billing settings.</p>
        </div>

      </div>

    </div>
  );
}

/**
 * INLINE STYLES (clean + no dependency)
 * production-safe minimal UI
 */
const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: 24,
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 16,
    borderBottom: "1px solid #e5e7eb",
  },

  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
  },

  subtitle: {
    margin: 0,
    fontSize: 14,
    color: "#6b7280",
  },

  content: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
};
