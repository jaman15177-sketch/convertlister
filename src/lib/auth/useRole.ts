export function useRole() {
  if (typeof window === "undefined") return null;

  const role = localStorage.getItem("role");

  return role;
}
