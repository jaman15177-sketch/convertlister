export class ExtensionSource {

  async get(payload: any) {
    return {
      source: "extension",
      products: payload.products || []
    };
  }
}
