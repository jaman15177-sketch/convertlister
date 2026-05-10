export class ValidationGate {

  validateListing(data: any) {
    const errors: string[] = [];

    // TITLE CHECK
    if (!data.title || data.title.length < 10) {
      errors.push("Title too weak");
    }

    // BULLET CHECK
    if (!data.bullets || data.bullets.length < 4) {
      errors.push("Insufficient bullets");
    }

    // DESCRIPTION CHECK
    if (!data.description || data.description.length < 100) {
      errors.push("Description too short");
    }

    // PRICE CHECK
    if (!data.price || data.price <= 0) {
      errors.push("Invalid price");
    }

    return {
      passed: errors.length === 0,
      errors
    };
  }
}
