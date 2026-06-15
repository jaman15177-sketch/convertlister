export function getStatusStyle(status: string) {
  switch (status) {
    case "pending":
      return { color: "#f59e0b", background: "#fffbeb" };

    case "running":
      return { color: "#3b82f6", background: "#eff6ff" };

    case "completed":
      return { color: "#10b981", background: "#ecfdf5" };

    case "failed":
      return { color: "#ef4444", background: "#fef2f2" };

    default:
      return { color: "#6b7280", background: "#f9fafb" };
  }
}
