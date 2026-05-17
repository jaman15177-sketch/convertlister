import { getAdapter }
from "./adapter.registry"

export function getSourceAdapter(source: string) {

  const adapter = getAdapter(source)

  if (!adapter) {

    console.log(
      "❌ NO ADAPTER FOUND:",
      source
    )

    return null
  }

  return adapter
}
