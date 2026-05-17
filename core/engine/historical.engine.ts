const historyDB: any[] = []

export function historicalEngine(product: any) {

  const exists =
    historyDB.find(p => p.id === product.id)

  if (exists)
    return -10

  historyDB.push(product)

  return 5
}
