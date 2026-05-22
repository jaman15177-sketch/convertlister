type Severity =
  | "INFO"
  | "WARNING"
  | "CRITICAL";

type ValidationIssue = {

  field: string;

  severity: Severity;

  message: string;
};

type ValidationResult = {

  valid: boolean;

  score: number;

  normalizedPayload: any;

  issues: ValidationIssue[];

  metadata: {
    engineVersion: string;
    validatedAt: string;
  };
};

type ValidationPayload = {

  title?: string;

  description?: string;

  bullets?: string[];

  price?: number;

  compareAtPrice?: number;

  sku?: string;

  inventory?: number;

  images?: string[];

  category?: string;

  tags?: string[];

  platform?: string;
};

// ----------------------------------------------------
// MEMORY / IDEMPOTENCY
// ----------------------------------------------------

const processedSKUs = new Set<string>();

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

function clamp(
  value: number,
  min: number,
  max: number
): number {

  return Math.max(
    min,
    Math.min(max, value)
  );
}

function addIssue(
  issues: ValidationIssue[],
  field: string,
  severity: Severity,
  message: string
) {

  issues.push({
    field,
    severity,
    message,
  });
}

function normalizeText(
  text?: string
): string {

  if (!text) return "";

  return text
    .trim()
    .replace(/\s+/g, " ");
}

// ----------------------------------------------------
// TITLE VALIDATION
// ----------------------------------------------------

function validateTitle(
  payload: ValidationPayload,
  issues: ValidationIssue[]
) {

  const title =
    normalizeText(payload.title);

  if (!title) {

    addIssue(
      issues,
      "title",
      "CRITICAL",
      "Missing title"
    );

    return;
  }

  if (title.length < 10) {

    addIssue(
      issues,
      "title",
      "WARNING",
      "Title too short"
    );
  }

  if (title.length > 180) {

    addIssue(
      issues,
      "title",
      "WARNING",
      "Title too long"
    );
  }

  if (
    /(best ever|guaranteed|instant)/i
      .test(title)
  ) {

    addIssue(
      issues,
      "title",
      "WARNING",
      "Potential risky marketing language"
    );
  }
}

// ----------------------------------------------------
// DESCRIPTION VALIDATION
// ----------------------------------------------------

function validateDescription(
  payload: ValidationPayload,
  issues: ValidationIssue[]
) {

  const description =
    normalizeText(
      payload.description
    );

  if (!description) {

    addIssue(
      issues,
      "description",
      "CRITICAL",
      "Missing description"
    );

    return;
  }

  if (description.length < 50) {

    addIssue(
      issues,
      "description",
      "WARNING",
      "Description too short"
    );
  }
}

// ----------------------------------------------------
// PRICE VALIDATION
// ----------------------------------------------------

function validatePrice(
  payload: ValidationPayload,
  issues: ValidationIssue[]
) {

  if (
    payload.price === undefined
  ) {

    addIssue(
      issues,
      "price",
      "CRITICAL",
      "Missing price"
    );

    return;
  }

  if (payload.price <= 0) {

    addIssue(
      issues,
      "price",
      "CRITICAL",
      "Invalid price"
    );
  }

  if (
    payload.compareAtPrice &&
    payload.compareAtPrice <
      payload.price
  ) {

    addIssue(
      issues,
      "compareAtPrice",
      "WARNING",
      "Compare-at price lower than actual price"
    );
  }
}

// ----------------------------------------------------
// SKU VALIDATION
// ----------------------------------------------------

function validateSKU(
  payload: ValidationPayload,
  issues: ValidationIssue[]
) {

  if (!payload.sku) {

    addIssue(
      issues,
      "sku",
      "CRITICAL",
      "Missing SKU"
    );

    return;
  }

  if (
    processedSKUs.has(
      payload.sku
    )
  ) {

    addIssue(
      issues,
      "sku",
      "CRITICAL",
      "Duplicate SKU detected"
    );
  }
}

// ----------------------------------------------------
// INVENTORY VALIDATION
// ----------------------------------------------------

function validateInventory(
  payload: ValidationPayload,
  issues: ValidationIssue[]
) {

  if (
    payload.inventory === undefined
  ) {

    addIssue(
      issues,
      "inventory",
      "WARNING",
      "Inventory missing"
    );

    return;
  }

  if (
    payload.inventory < 0
  ) {

    addIssue(
      issues,
      "inventory",
      "CRITICAL",
      "Negative inventory"
    );
  }
}

// ----------------------------------------------------
// IMAGE VALIDATION
// ----------------------------------------------------

function validateImages(
  payload: ValidationPayload,
  issues: ValidationIssue[]
) {

  const images =
    payload.images || [];

  if (images.length === 0) {

    addIssue(
      issues,
      "images",
      "CRITICAL",
      "No images found"
    );

    return;
  }

  if (images.length < 3) {

    addIssue(
      issues,
      "images",
      "WARNING",
      "Too few product images"
    );
  }
}

// ----------------------------------------------------
// BULLET VALIDATION
// ----------------------------------------------------

function validateBullets(
  payload: ValidationPayload,
  issues: ValidationIssue[]
) {

  const bullets =
    payload.bullets || [];

  if (bullets.length === 0) {

    addIssue(
      issues,
      "bullets",
      "WARNING",
      "Missing bullet points"
    );

    return;
  }

  if (bullets.length < 3) {

    addIssue(
      issues,
      "bullets",
      "WARNING",
      "Too few bullet points"
    );
  }
}

// ----------------------------------------------------
// SCORING ENGINE
// ----------------------------------------------------

function calculateValidationScore(
  issues: ValidationIssue[]
): number {

  let score = 100;

  for (const issue of issues) {

    switch (issue.severity) {

      case "CRITICAL":
        score -= 30;
        break;

      case "WARNING":
        score -= 10;
        break;

      case "INFO":
        score -= 2;
        break;
    }
  }

  return clamp(score, 0, 100);
}

// ----------------------------------------------------
// NORMALIZATION
// ----------------------------------------------------

function normalizePayload(
  payload: ValidationPayload
): ValidationPayload {

  return {

    ...payload,

    title:
      normalizeText(
        payload.title
      ),

    description:
      normalizeText(
        payload.description
      ),

    bullets:
      payload.bullets?.map(
        normalizeText
      ) || [],

    tags:
      payload.tags?.map(
        normalizeText
      ) || [],
  };
}

// ----------------------------------------------------
// MAIN ENGINE
// ----------------------------------------------------

export function universalValidationEngine(
  payload: ValidationPayload
): ValidationResult {

  const issues: ValidationIssue[] = [];

  const normalizedPayload =
    normalizePayload(payload);

  // validators
  validateTitle(
    normalizedPayload,
    issues
  );

  validateDescription(
    normalizedPayload,
    issues
  );

  validatePrice(
    normalizedPayload,
    issues
  );

  validateSKU(
    normalizedPayload,
    issues
  );

  validateInventory(
    normalizedPayload,
    issues
  );

  validateImages(
    normalizedPayload,
    issues
  );

  validateBullets(
    normalizedPayload,
    issues
  );

  // duplicate memory update
  if (
    normalizedPayload.sku
  ) {

    processedSKUs.add(
      normalizedPayload.sku
    );
  }

  const score =
    calculateValidationScore(
      issues
    );

  const criticalIssues =
    issues.filter(
      i => i.severity === "CRITICAL"
    );

  return {

    valid:
      criticalIssues.length === 0,

    score,

    normalizedPayload,

    issues,

    metadata: {

      engineVersion:
        "v3-universal-validation-final",

      validatedAt:
        new Date().toISOString(),
    },
  };
}
