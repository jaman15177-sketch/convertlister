type Policy = {
  service: string;
  action: string;
};

const policies: Policy[] = [
  {
    service: "auth-service",
    action: "read",
  },
];

export function enforcePolicy(
  service: string,
  action: string
) {
  return policies.some(
    p =>
      p.service === service &&
      p.action === action
  );
}
