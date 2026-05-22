export function verifyWorkloadIdentity(
  identity: any
) {
  return !!identity?.id;
}
