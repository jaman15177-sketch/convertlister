import { supabase } from "@/core/ssot/db/supabase.client";

type Payment = {
  id: string;
  trx_id: string;
  amount: number;
  credits: number;
  sender_number: string;
  status: string;
  created_at: string;
};

export default async function AdminPaymentsPage() {
  const { data: payments, error } = await supabase
    .from("payment_requests")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading payments</div>;
  }

  const safePayments = (payments ?? []) as Payment[];

  return (
    <div style={{ padding: 20 }}>
      <h1>Pending Payments</h1>

      {safePayments.length === 0 && <p>No pending payments</p>}

      {safePayments.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: 10,
            padding: 10,
          }}
        >
          <p><b>TrxID:</b> {p.trx_id}</p>
          <p><b>Amount:</b> {p.amount}</p>
          <p><b>Credits:</b> {p.credits}</p>
          <p><b>Sender:</b> {p.sender_number}</p>

          <form action="/api/approve-payment" method="POST">
            <input type="hidden" name="paymentId" value={p.id} />

            <button
              style={{
                background: "green",
                color: "white",
                padding: 8,
                marginTop: 10,
              }}
            >
              Approve
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
