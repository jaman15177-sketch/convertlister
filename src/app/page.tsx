export default function HomePage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>ConvertLister</h1>

      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/recharge">Recharge</a></li>
        <li><a href="/soc">SOC</a></li>
        <li><a href="/admin/dashboard">Admin Dashboard</a></li>
      </ul>
    </main>
  );
}
