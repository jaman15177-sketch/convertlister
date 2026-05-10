export class CsvSource {

  async get(rows: any[]) {
    return {
      source: "csv",
      products: rows.map(r => ({
        title: r.title,
        price: Number(r.price),
      }))
    };
  }
}
