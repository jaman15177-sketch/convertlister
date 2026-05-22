export class HSM {
  async sign(payload: string) {
    return `signed:${payload}`;
  }

  async verify(signature: string) {
    return signature.startsWith("signed:");
  }
}
