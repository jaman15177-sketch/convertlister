/**
 * ============================================================
 * ALIEXPRESS ADAPTER INTEGRATION TEST
 * ============================================================
 */

import { AdapterBootstrap }
  from "@/lib/bootstrap/bootstrap.adapters";

import { AdapterRegistry }
  from "@/core/registry/adapter.registry";

async function main(): Promise<void> {

  AdapterBootstrap.initialize();

  console.log(
    "Registered adapters:",
    AdapterRegistry.list()
  );

  const result =
    await AdapterRegistry.execute(
      "aliexpress",
      {
        keyword: "wireless mouse",
        page: 1,
        pageSize: 5,
      }
    );

  if (!result.success) {

    console.error(
      "Adapter failed:",
      result.error
    );

    process.exit(1);

  }

  console.log(
    "Products fetched:",
    result.data.length
  );

  console.log(
    result.data
  );

}

main().catch((error) => {

  console.error(error);

  process.exit(1);

});
