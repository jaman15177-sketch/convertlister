-- ============================================================================
-- CONVERTLISTER READY PRODUCT LIBRARY
-- FILE 01 - FOUNDATION
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

COMMENT ON SCHEMA public IS
'ConvertLister Production Schema';

-- ============================================================================
-- READY PRODUCT STATUS
-- ============================================================================

DO $$
BEGIN

IF NOT EXISTS (

    SELECT 1
    FROM pg_type
    WHERE typname = 'ready_product_status'

) THEN

    CREATE TYPE ready_product_status AS ENUM (

        'DRAFT',
        'READY',
        'PUBLISHED',
        'ARCHIVED'

    );

END IF;

END;
$$;

-- ============================================================================
-- READY PRODUCT VISIBILITY
-- ============================================================================

DO $$
BEGIN

IF NOT EXISTS (

    SELECT 1
    FROM pg_type
    WHERE typname = 'ready_product_visibility'

) THEN

    CREATE TYPE ready_product_visibility AS ENUM (

        'PRIVATE',
        'TEAM',
        'PUBLIC'

    );

END IF;

END;
$$;

-- ============================================================================
-- PURCHASE STATUS
-- ============================================================================

DO $$
BEGIN

IF NOT EXISTS (

    SELECT 1
    FROM pg_type
    WHERE typname = 'ready_product_purchase_status'

) THEN

    CREATE TYPE ready_product_purchase_status AS ENUM (

        'NOT_PURCHASED',
        'PURCHASED'

    );

END IF;

END;
$$;

-- ============================================================================
-- LICENSE STATUS
-- ============================================================================

DO $$
BEGIN

IF NOT EXISTS (

    SELECT 1
    FROM pg_type
    WHERE typname = 'ready_product_license_status'

) THEN

    CREATE TYPE ready_product_license_status AS ENUM (

        'NONE',
        'ACTIVE',
        'REVOKED'

    );

END IF;

END;
$$;

-- ============================================================================
-- PUBLISH STATUS
-- ============================================================================

DO $$
BEGIN

IF NOT EXISTS (

    SELECT 1
    FROM pg_type
    WHERE typname = 'ready_product_publish_status'

) THEN

    CREATE TYPE ready_product_publish_status AS ENUM (

        'NOT_PUBLISHED',
        'QUEUED',
        'PUBLISHED',
        'FAILED'

    );

END IF;

END;
$$;

-- ============================================================================
-- UPDATED AT HELPER
-- ============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()

RETURNS TRIGGER

LANGUAGE plpgsql

AS
$$
BEGIN

    NEW.updated_at := NOW();

    RETURN NEW;

END;
$$;

-- ============================================================================
-- UUID HELPER
-- ============================================================================

CREATE OR REPLACE FUNCTION public.ready_product_uuid()

RETURNS uuid

LANGUAGE sql

AS
$$
SELECT gen_random_uuid();
$$;
-- ============================================================================
-- READY PRODUCTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.ready_products (

    -- Primary Identity
    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    -- Tenant
    organization_id UUID NOT NULL,

    -- Source Product
    product_id UUID,

    -- Snapshot Identity
    ready_key TEXT,

    ready_version INTEGER
        NOT NULL
        DEFAULT 1,

    -- Product Content
    title TEXT NOT NULL,

    description TEXT,

    -- Media
    images JSONB,

    -- Marketplace
    marketplace TEXT,

    category TEXT,

    -- Pricing
    price NUMERIC(18,2)
        NOT NULL,

    compare_price NUMERIC(18,2),

    currency CHAR(3)
        NOT NULL
        DEFAULT 'BDT',

    -- Revenue
    platform_fee NUMERIC(18,2)
        NOT NULL
        DEFAULT 0,

    -- AI
    ai_score NUMERIC(5,2)
        NOT NULL
        DEFAULT 0,

    health_score NUMERIC(5,2)
        NOT NULL
        DEFAULT 0,

    -- Lifecycle
    status ready_product_status
        NOT NULL
        DEFAULT 'DRAFT',

    visibility ready_product_visibility
        NOT NULL
        DEFAULT 'PRIVATE',

    publish_status ready_product_publish_status
        NOT NULL
        DEFAULT 'NOT_PUBLISHED',

    purchase_status ready_product_purchase_status
        NOT NULL
        DEFAULT 'NOT_PURCHASED',

    license_status ready_product_license_status
        NOT NULL
        DEFAULT 'NONE',

    -- Flexible Metadata
    tags JSONB,

    metadata JSONB,

    -- Audit
    created_at TIMESTAMPTZ
        NOT NULL
        DEFAULT NOW(),

    updated_at TIMESTAMPTZ
        NOT NULL
        DEFAULT NOW(),

    published_at TIMESTAMPTZ,

    archived_at TIMESTAMPTZ
);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.ready_products IS
'Frozen marketplace-ready products.';


COMMENT ON COLUMN public.ready_products.organization_id IS
'Tenant owner';


COMMENT ON COLUMN public.ready_products.product_id IS
'Original product reference';


COMMENT ON COLUMN public.ready_products.ready_version IS
'Snapshot version';


COMMENT ON COLUMN public.ready_products.ai_score IS
'AI optimization score';


COMMENT ON COLUMN public.ready_products.health_score IS
'Catalog health score';


COMMENT ON COLUMN public.ready_products.platform_fee IS
'Platform fee';


COMMENT ON COLUMN public.ready_products.metadata IS
'Flexible metadata';


COMMENT ON COLUMN public.ready_products.images IS
'Product image snapshot';
-- ============================================================================
-- UPDATED AT TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_ready_products_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS ready_products_updated_at_trigger
ON public.ready_products;

CREATE TRIGGER ready_products_updated_at_trigger
BEFORE UPDATE
ON public.ready_products
FOR EACH ROW
EXECUTE FUNCTION public.update_ready_products_updated_at();

-- ============================================================================
-- FINAL TABLE COMMENT
-- ============================================================================

COMMENT ON TABLE public.ready_products IS
'ConvertLister Ready Product Library. Frozen optimized product snapshots ready for marketplace distribution.';

-- ============================================================================
-- FINAL VERIFICATION
-- ============================================================================

DO $$
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = 'ready_products'
    ) THEN

        RAISE EXCEPTION 'ready_products table creation failed';

    END IF;

END;
$$;
