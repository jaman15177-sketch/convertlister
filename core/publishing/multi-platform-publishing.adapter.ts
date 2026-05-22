type Platform =
  | "SHOPIFY"
  | "AMAZON"
  | "ETSY"
  | "WOOCOMMERCE"
  | "TIKTOK_SHOP";

type PublishStatus =
  | "PENDING"
  | "VALIDATED"
  | "PUBLISHED"
  | "FAILED";

type ProductPayload = {

  title: string;

  description: string;

  bullets: string[];

  price: number;

  images: string[];

  sku: string;

  inventory: number;

  category: string;

  tags?: string[];
};

type PublishJob = {

  id: string;

  platform: Platform;

  payload: ProductPayload;

  status: PublishStatus;

  retryCount: number;

  createdAt: string;

  publishedAt?: string;

  error?: string;
};

type PublishResult = {

  success: boolean;

  platform: Platform;

  externalId?: string;

  status: PublishStatus;

  message: string;
};

type AdapterResponse = {

  jobs: PublishJob[];

  results: PublishResult[];

  metadata: {
    engineVersion: string;
    processedAt: string;
  };
};

// ----------------------------------------------------
// MEMORY STORE (SIMULATION)
// ----------------------------------------------------

const publishingState = new Map<
  string,
  PublishJob
>();

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

function generateId(): string {

  return `pub_${Date.now()}_${Math.floor(
    Math.random() * 100000
  )}`;
}

function validatePayload(
  payload: ProductPayload
): string[] {

  const errors: string[] = [];

  if (!payload.title) {
    errors.push("Missing title");
  }

  if (!payload.description) {
    errors.push("Missing description");
  }

  if (payload.price <= 0) {
    errors.push("Invalid price");
  }

  if (payload.images.length === 0) {
    errors.push("No product images");
  }

  if (!payload.sku) {
    errors.push("Missing SKU");
  }

  return errors;
}

// ----------------------------------------------------
// PLATFORM NORMALIZERS
// ----------------------------------------------------

function normalizeForAmazon(
  payload: ProductPayload
): ProductPayload {

  return {

    ...payload,

    title: payload.title.slice(0, 180),

    bullets: payload.bullets.slice(0, 5),
  };
}

function normalizeForShopify(
  payload: ProductPayload
): ProductPayload {

  return {

    ...payload,

    tags: payload.tags || [],
  };
}

function normalizeForEtsy(
  payload: ProductPayload
): ProductPayload {

  return {

    ...payload,

    title: payload.title.slice(0, 140),
  };
}

function normalizeForTikTok(
  payload: ProductPayload
): ProductPayload {

  return {

    ...payload,

    title: payload.title.slice(0, 80),
  };
}

// ----------------------------------------------------
// ADAPTER ROUTER
// ----------------------------------------------------

function normalizePayload(
  platform: Platform,
  payload: ProductPayload
): ProductPayload {

  switch (platform) {

    case "AMAZON":
      return normalizeForAmazon(payload);

    case "SHOPIFY":
      return normalizeForShopify(payload);

    case "ETSY":
      return normalizeForEtsy(payload);

    case "TIKTOK_SHOP":
      return normalizeForTikTok(payload);

    default:
      return payload;
  }
}

// ----------------------------------------------------
// IDENTITY CHECK
// ----------------------------------------------------

function isDuplicateJob(
  sku: string,
  platform: Platform
): boolean {

  for (const job of publishingState.values()) {

    if (
      job.payload.sku === sku &&
      job.platform === platform &&
      job.status === "PUBLISHED"
    ) {
      return true;
    }
  }

  return false;
}

// ----------------------------------------------------
// MOCK PUBLISHER
// Replace later with real APIs
// ----------------------------------------------------

async function publishToPlatform(
  platform: Platform,
  payload: ProductPayload
): Promise<PublishResult> {

  await new Promise(resolve =>
    setTimeout(resolve, 100)
  );

  return {

    success: true,

    platform,

    externalId:
      `${platform}_${Date.now()}`,

    status: "PUBLISHED",

    message:
      `Published successfully to ${platform}`,
  };
}

// ----------------------------------------------------
// JOB FACTORY
// ----------------------------------------------------

function createJob(
  platform: Platform,
  payload: ProductPayload
): PublishJob {

  return {

    id: generateId(),

    platform,

    payload,

    status: "PENDING",

    retryCount: 0,

    createdAt:
      new Date().toISOString(),
  };
}

// ----------------------------------------------------
// MAIN ENGINE
// ----------------------------------------------------

export async function multiPlatformPublishingAdapter(
  payload: ProductPayload,
  platforms: Platform[]
): Promise<AdapterResponse> {

  const jobs: PublishJob[] = [];

  const results: PublishResult[] = [];

  for (const platform of platforms) {

    // duplicate protection
    if (
      isDuplicateJob(
        payload.sku,
        platform
      )
    ) {

      results.push({

        success: false,

        platform,

        status: "FAILED",

        message:
          "Duplicate publish prevented",
      });

      continue;
    }

    // normalize payload
    const normalizedPayload =
      normalizePayload(
        platform,
        payload
      );

    // validate
    const validationErrors =
      validatePayload(
        normalizedPayload
      );

    const job = createJob(
      platform,
      normalizedPayload
    );

    jobs.push(job);

    // validation failed
    if (validationErrors.length > 0) {

      job.status = "FAILED";

      job.error =
        validationErrors.join(", ");

      results.push({

        success: false,

        platform,

        status: "FAILED",

        message: job.error,
      });

      continue;
    }

    // validation success
    job.status = "VALIDATED";

    try {

      const publishResult =
        await publishToPlatform(
          platform,
          normalizedPayload
        );

      if (publishResult.success) {

        job.status = "PUBLISHED";

        job.publishedAt =
          new Date().toISOString();

        publishingState.set(
          job.id,
          job
        );
      }

      results.push(publishResult);

    } catch (err: any) {

      job.status = "FAILED";

      job.retryCount += 1;

      job.error =
        err?.message ||
        "Unknown publish error";

      results.push({

        success: false,

        platform,

        status: "FAILED",

        message: job.error,
      });
    }
  }

  return {

    jobs,

    results,

    metadata: {

      engineVersion:
        "v2-multi-platform-publishing-final",

      processedAt:
        new Date().toISOString(),
    },
  };
}
