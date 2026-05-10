async function processProducts(adapter: BaseAdapter) {
  const raw = await adapter.fetch();

  const products = raw.map(adapter.normalize);

  return products;
}
