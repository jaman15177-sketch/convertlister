/*
===========================================================
CONVERTLISTER

READY PRODUCT LIBRARY

MASTER SNAPSHOT TABLE

===========================================================

Purpose

Stores immutable enterprise-ready products.

Source

Marketplace Import
        ↓
AI Optimization
        ↓
Freeze
        ↓
Snapshot
        ↓
Ready Product Library

===========================================================
*/

create table if not exists product_snapshots (

    id uuid primary key default gen_random_uuid(),

    organization_id uuid not null,

    product_id uuid not null,

    freeze_id uuid not null,

    approval_id uuid,

    snapshot_version integer not null default 1,

    status text not null default 'READY',

    /*
    -------------------------------------------------------
    SOURCE
    -------------------------------------------------------
    */

    source_marketplace text not null,

    source_product_id text not null,

    /*
    -------------------------------------------------------
    PRODUCT
    -------------------------------------------------------
    */

    title text not null,

    description text,

    bullets jsonb not null default '[]'::jsonb,

    category text,

    tags jsonb not null default '[]'::jsonb,

    seo_keywords jsonb not null default '[]'::jsonb,

    /*
    -------------------------------------------------------
    IMAGES
    -------------------------------------------------------
    */

    thumbnail text,

    images jsonb not null default '[]'::jsonb,

    /*
    -------------------------------------------------------
    PRICE
    -------------------------------------------------------
    */

    sale_price numeric(12,2) not null,

    currency text not null default 'USD',

    listing_fee numeric(12,2) not null,

    /*
    -------------------------------------------------------
    QUALITY
    -------------------------------------------------------
    */

    ai_score numeric(5,2) default 0,

    health_score numeric(5,2) default 0,

    quality_grade text not null default 'ENTERPRISE',

    /*
    -------------------------------------------------------
    PUSH
    -------------------------------------------------------
    */

    supported_marketplaces jsonb
        not null
        default '[]'::jsonb,

    /*
    -------------------------------------------------------
    TIMESTAMPS
    -------------------------------------------------------
    */

    frozen_at timestamptz not null,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()

);
