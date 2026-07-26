/*
===========================================================
READY PRODUCT LIBRARY

PRODUCT SNAPSHOTS

INDEXES
===========================================================
*/

-- Organization

create index if not exists idx_product_snapshots_organization_id
on product_snapshots (organization_id);

-- Product

create index if not exists idx_product_snapshots_product_id
on product_snapshots (product_id);

-- Freeze

create index if not exists idx_product_snapshots_freeze_id
on product_snapshots (freeze_id);

-- Approval

create index if not exists idx_product_snapshots_approval_id
on product_snapshots (approval_id);

-- Status

create index if not exists idx_product_snapshots_status
on product_snapshots (status);

-- Marketplace

create index if not exists idx_product_snapshots_source_marketplace
on product_snapshots (source_marketplace);

-- Category

create index if not exists idx_product_snapshots_category
on product_snapshots (category);

-- Sale Price

create index if not exists idx_product_snapshots_sale_price
on product_snapshots (sale_price);

-- Listing Fee

create index if not exists idx_product_snapshots_listing_fee
on product_snapshots (listing_fee);

-- AI Score

create index if not exists idx_product_snapshots_ai_score
on product_snapshots (ai_score);

-- Health Score

create index if not exists idx_product_snapshots_health_score
on product_snapshots (health_score);

-- Created

create index if not exists idx_product_snapshots_created_at
on product_snapshots (created_at desc);

-- Frozen

create index if not exists idx_product_snapshots_frozen_at
on product_snapshots (frozen_at desc);

-- Search

create index if not exists idx_product_snapshots_title
on product_snapshots
using gin (to_tsvector('simple', coalesce(title,'')));

-- Description Search

create index if not exists idx_product_snapshots_description
on product_snapshots
using gin (to_tsvector('simple', coalesce(description,'')));

-- Tags

create index if not exists idx_product_snapshots_tags
on product_snapshots
using gin(tags);

-- SEO Keywords

create index if not exists idx_product_snapshots_seo_keywords
on product_snapshots
using gin(seo_keywords);

-- Images

create index if not exists idx_product_snapshots_images
on product_snapshots
using gin(images);

-- Supported Marketplaces

create index if not exists idx_product_snapshots_supported_marketplaces
on product_snapshots
using gin(supported_marketplaces);
