export class AdapterEnforcer {

  enforce(adapter: any) {

    if (typeof adapter.normalize !== "function") {
      throw new Error("Adapter missing normalize()");
    }

    return true;
  }
}
