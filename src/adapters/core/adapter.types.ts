/**
 * ==========================================================
 * ADAPTER TYPES
 * ==========================================================
 *
 * Shared types for all marketplace adapters.
 *
 * Rules
 * ----------------------------------------------------------
 * • Types only
 * • No business logic
 * • No implementation
 * • Shared by every adapter
 * ==========================================================
 */

import type { ImportSource } from "@/lib/core/import";

/* ==========================================================
 * SEARCH QUERY
 * ==========================================================
 */

export interface AdapterSearchQuery {
  keyword: string;

  page?: number;

  pageSize?: number;

  region?: string;

  language?: string;

  currency?: string;
}

/* ==========================================================
 * PAGINATION
 * ==========================================================
 */

export interface AdapterPagination {
  page: number;

  pageSize: number;

  total?: number;

  hasNext?: boolean;
}

/* ==========================================================
 * ADAPTER CONFIG
 * ==========================================================
 */

export interface AdapterConfig {
  timeout: number;

  retry: number;

  cache: boolean;

  rateLimit: number;
}

/* ==========================================================
 * ADAPTER METADATA
 * ==========================================================
 */

export interface AdapterMetadata {
  source: ImportSource;

  region?: string;

  currency?: string;

  language?: string;

  fetchedAt: Date;
}

/* ==========================================================
 * ADAPTER EXECUTION CONTEXT
 * ==========================================================
 */

export interface AdapterContext {
  organizationId: string;

  requestId: string;

  metadata: AdapterMetadata;
}
