const blacklist = [
  "fake",
  "counterfeit",
  "replica",
  "clone"
]

export function blacklistEngine(product: any) {

  const title = (product.title || "").toLowerCase()

  let penalty = 0

  blacklist.forEach(word => {
    if (title.includes(word))
      penalty += 100
  })

  return penalty
}
