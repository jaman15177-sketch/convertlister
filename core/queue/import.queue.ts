export const importQueue: any[] = []

export function addToQueue(
  products: any[]
) {

  importQueue.push(...products)

  console.log(
    `📦 QUEUED: ${products.length}`
  )
}

export function nextProduct() {

  return importQueue.shift()
}

export function queueSize() {

  return importQueue.length
}
