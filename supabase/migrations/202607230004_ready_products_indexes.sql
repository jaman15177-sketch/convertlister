/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ============================================================================
 *
 * File:
 * 202607230004_ready_products_indexes.sql
 *
 * Part:
 * Part 1
 *
 * Responsibility:
 * Core Lookup Indexes
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * ORGANIZATION INDEX
 * ============================================================================
 *
 * Most queries are tenant scoped.
 *
 * Example:
 *
 * organization_id = current tenant
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_organization_id

ON public.ready_products (

    organization_id

);



/**
 * ============================================================================
 * PRODUCT REFERENCE INDEX
 * ============================================================================
 *
 * Faster lookup from original products.
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_product_id

ON public.ready_products (

    product_id

);



/**
 * ============================================================================
 * COMPOSITE TENANT + PRODUCT LOOKUP
 * ============================================================================
 *
 * Prevents slow multi-tenant product queries.
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_org_product

ON public.ready_products (

    organization_id,

    product_id

);



/**
 * ============================================================================
 * DOCUMENTATION
 * ============================================================================
 */


COMMENT ON INDEX idx_ready_products_organization_id IS

'Optimizes tenant based ready product lookup';



COMMENT ON INDEX idx_ready_products_product_id IS

'Optimizes original product relationship lookup';



COMMENT ON INDEX idx_ready_products_org_product IS

'Optimizes organization scoped product queries';



/**
 * ============================================================================
 * PART 1 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ Organization index
 * ✓ Product index
 * ✓ Tenant-product composite index
 *
 * ============================================================================
 */
/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ============================================================================
 *
 * File:
 * 202607230004_ready_products_indexes.sql
 *
 * Part:
 * Part 2
 *
 * Responsibility:
 * Search & Filter Performance Indexes
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * STATUS FILTER INDEX
 * ============================================================================
 *
 * Example:
 *
 * WHERE status = 'READY'
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_status

ON public.ready_products (

    status

);



/**
 * ============================================================================
 * MARKETPLACE FILTER INDEX
 * ============================================================================
 *
 * Example:
 *
 * WHERE marketplace = 'SHOPIFY'
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_marketplace

ON public.ready_products (

    marketplace

);



/**
 * ============================================================================
 * CATEGORY FILTER INDEX
 * ============================================================================
 *
 * Ready Product Library category browsing.
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_category

ON public.ready_products (

    category

);



/**
 * ============================================================================
 * PUBLISH STATUS INDEX
 * ============================================================================
 *
 * Marketplace publishing queue preparation.
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_publish_status

ON public.ready_products (

    publish_status

);



/**
 * ============================================================================
 * VISIBILITY INDEX
 * ============================================================================
 *
 * Public/private library filtering.
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_visibility

ON public.ready_products (

    visibility

);



/**
 * ============================================================================
 * DOCUMENTATION
 * ============================================================================
 */


COMMENT ON INDEX idx_ready_products_status IS

'Optimizes ready product lifecycle filtering';



COMMENT ON INDEX idx_ready_products_marketplace IS

'Optimizes marketplace based product filtering';



COMMENT ON INDEX idx_ready_products_category IS

'Optimizes category browsing';



COMMENT ON INDEX idx_ready_products_publish_status IS

'Optimizes publishing workflow queries';



COMMENT ON INDEX idx_ready_products_visibility IS

'Optimizes product visibility filtering';



/**
 * ============================================================================
 * PART 2 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ Status index
 * ✓ Marketplace index
 * ✓ Category index
 * ✓ Publish status index
 * ✓ Visibility index
 *
 * ============================================================================
 */
/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ============================================================================
 *
 * File:
 * 202607230004_ready_products_indexes.sql
 *
 * Part:
 * Part 3
 *
 * Responsibility:
 * Ranking & Sorting Performance Indexes
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * AI SCORE INDEX
 * ============================================================================
 *
 * Used for:
 *
 * - Highest AI optimized products
 * - Product ranking
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_ai_score

ON public.ready_products (

    ai_score DESC

);



/**
 * ============================================================================
 * HEALTH SCORE INDEX
 * ============================================================================
 *
 * Used for:
 *
 * - Catalog health ranking
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_health_score

ON public.ready_products (

    health_score DESC

);



/**
 * ============================================================================
 * PRICE SORT INDEX
 * ============================================================================
 *
 * Used for:
 *
 * - Low to high price
 * - High to low price
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_price

ON public.ready_products (

    price

);



/**
 * ============================================================================
 * CREATED DATE INDEX
 * ============================================================================
 *
 * Used for:
 *
 * - Latest products
 * - Product library ordering
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_created_at

ON public.ready_products (

    created_at DESC

);



/**
 * ============================================================================
 * UPDATED DATE INDEX
 * ============================================================================
 *
 * Used for:
 *
 * - Recently modified products
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_updated_at

ON public.ready_products (

    updated_at DESC

);



/**
 * ============================================================================
 * DOCUMENTATION
 * ============================================================================
 */


COMMENT ON INDEX idx_ready_products_ai_score IS

'Optimizes AI score based product ranking';



COMMENT ON INDEX idx_ready_products_health_score IS

'Optimizes health score based product ranking';



COMMENT ON INDEX idx_ready_products_price IS

'Optimizes price sorting';



COMMENT ON INDEX idx_ready_products_created_at IS

'Optimizes newest product queries';



COMMENT ON INDEX idx_ready_products_updated_at IS

'Optimizes recently updated product queries';



/**
 * ============================================================================
 * PART 3 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ AI score index
 * ✓ Health score index
 * ✓ Price index
 * ✓ Created date index
 * ✓ Updated date index
 *
 * ============================================================================
 */
/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ============================================================================
 *
 * File:
 * 202607230004_ready_products_indexes.sql
 *
 * Part:
 * Part 4 FINAL
 *
 * Responsibility:
 * JSONB Optimization & Verification
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * METADATA JSONB INDEX
 * ============================================================================
 *
 * Supports:
 *
 * - Product attributes
 * - AI metadata
 * - Flexible search
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_metadata_gin

ON public.ready_products

USING GIN (

    metadata

);



/**
 * ============================================================================
 * IMAGES JSONB INDEX
 * ============================================================================
 *
 * Supports:
 *
 * - Image library lookup
 * - Asset filtering
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_images_gin

ON public.ready_products

USING GIN (

    images

);



/**
 * ============================================================================
 * TAGS JSONB INDEX
 * ============================================================================
 *
 * Supports:
 *
 * - Product tag search
 *
 */

CREATE INDEX IF NOT EXISTS idx_ready_products_tags_gin

ON public.ready_products

USING GIN (

    tags

);



/**
 * ============================================================================
 * INDEX VERIFICATION
 * ============================================================================
 */

DO $$

DECLARE

    index_count INTEGER;


BEGIN


    SELECT COUNT(*)

    INTO index_count

    FROM pg_indexes

    WHERE schemaname = 'public'

    AND tablename = 'ready_products';



    IF index_count < 10

    THEN

        RAISE EXCEPTION

        'Ready products index setup incomplete';

    END IF;


END $$;



/**
 * ============================================================================
 * DOCUMENTATION
 * ============================================================================
 */


COMMENT ON INDEX idx_ready_products_metadata_gin IS

'Optimizes flexible metadata JSONB queries';



COMMENT ON INDEX idx_ready_products_images_gin IS

'Optimizes product image JSONB queries';



COMMENT ON INDEX idx_ready_products_tags_gin IS

'Optimizes product tag searching';



/**
 * ============================================================================
 * FILE 04 COMPLETE
 * ============================================================================
 *
 * 202607230004_ready_products_indexes.sql
 *
 * Completed:
 *
 * ✓ Core lookup indexes
 * ✓ Search indexes
 * ✓ Filter indexes
 * ✓ Ranking indexes
 * ✓ JSONB indexes
 * ✓ Verification
 *
 * ============================================================================
 */
