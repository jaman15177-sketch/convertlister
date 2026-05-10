export class ApiSource {

  async get(data: any) {
    return {
      source: "api",
      products: Array.isArray(data) ? data : [data]
    };
  }
}
