import { importAmazonProducts }
from "./amazon.importer"

import { importAliExpressProducts }
from "./aliexpress.importer"

import { importCJProducts }
from "./cjdropshipping.importer"

export async function importAllProducts() {

  const amazon =
    await importAmazonProducts()

  const aliexpress =
    await importAliExpressProducts()

  const cj =
    await importCJProducts()

  return [
    ...amazon,
    ...aliexpress,
    ...cj
  ]
}
