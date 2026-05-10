export class ContractEnforcer {

  enforce(product: any) {

    const required = ["title", "price"];

    for (const field of required) {

      if (!(field in product)) {
        throw new Error(`Missing contract field: ${field}`);
      }
    }

    return true;
  }
}
