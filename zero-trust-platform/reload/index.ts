import { reloadService } from "./reload-engine";

async function main() {
  const result =
    await reloadService("auth");

  console.log(result);
}

main();
