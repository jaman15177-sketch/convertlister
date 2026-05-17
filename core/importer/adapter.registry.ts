import { amazonAdapter }
from "../adapters/amazon.adapter"

import { aliexpressAdapter }
from "../adapters/aliexpress.adapter"

import { cjAdapter }
from "../adapters/cj.adapter"

export function getAdapter(source: string) {

  const map: any = {
    amazon: amazonAdapter,
    aliexpress: aliexpressAdapter,
    cj: cjAdapter
  }

  return map[source] || null
}
