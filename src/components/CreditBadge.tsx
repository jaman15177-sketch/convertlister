type CreditBadgeProps = {
  userId: string;
};

export default function CreditBadge({
  userId,
}: CreditBadgeProps) {
  return (
    <div
      style={{
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        background: "#ffffff",
        fontSize: "14px",
      }}
    >
      Credits: DEV MODE
      <br />
      User: {userId}
    </div>
  );
}
