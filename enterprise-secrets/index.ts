import { rotateSecret } from "./rotation/rotate";
import { activateSecret } from "./rotation/rollout";

async function main() {
  const rotated = await rotateSecret(
    "jwt-signing-key"
  );

  activateSecret(
    rotated.name,
    JSON.stringify(rotated.encrypted)
  );

  console.log(rotated);
}

main();
