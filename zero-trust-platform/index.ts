import { encrypt } from "./kms/kms-client";
import { revokeKey } from "./revocation/revoke";

import { createServiceIdentity } from "./identity/service-identity";

import { enforcePolicy } from "./policy/policy-engine";

import { replicateSecret } from "./replication/multi-region";

import { reloadServices } from "./reload/reload-services";

async function main() {
  const encrypted = encrypt("super-secret");

  console.log(encrypted);

  revokeKey("jwt-key-v1");

  const identity =
    createServiceIdentity("auth-service");

  console.log(identity);

  console.log(
    enforcePolicy("auth-service", "read")
  );

  await replicateSecret(encrypted);

  await reloadServices();
}

main();
