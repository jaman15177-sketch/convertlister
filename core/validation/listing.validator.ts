export class ListingValidator {
  validate(data: any) {
    const issues: string[] = [];

    // Title validation
    if (!data.title || data.title.length < 20) {
      issues.push("Weak title");
    }

    // Description validation
    if (!data.description || data.description.length < 80) {
      issues.push("Weak description");
    }

    // Bullet validation
    if (!data.bullets || data.bullets.length < 3) {
      issues.push("Missing bullet points");
    }

    // SEO validation
    if (!data.seoKeywords || data.seoKeywords.length < 5) {
      issues.push("Weak SEO keywords");
    }

    // Price validation
    if (!data.price || data.price <= 0) {
      issues.push("Invalid price");
    }

    return {
      passed: issues.length === 0,
      issues,
    };
  }
}
