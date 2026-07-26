-- ============================================================================
-- CONVERTLISTER
-- READY PRODUCT LIBRARY
-- FILE 02
-- CORE CONSTRAINTS
-- PART 1
-- ============================================================================

-- ============================================================================
-- READY KEY
-- ============================================================================

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_ready_key_not_blank

CHECK (

    ready_key IS NULL

    OR

    length(trim(ready_key)) > 0

);

-- ============================================================================
-- READY VERSION
-- ============================================================================

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_ready_version_minimum

CHECK (

    ready_version >= 1

);

-- ============================================================================
-- TITLE
-- ============================================================================

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_title_not_blank

CHECK (

    length(trim(title)) > 0

);

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_title_length_valid

CHECK (

    length(title) <= 500

);

-- ============================================================================
-- CURRENCY
-- ============================================================================

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_currency_uppercase

CHECK (

    currency = upper(currency)

);
-- ============================================================================
-- CONVERTLISTER
-- READY PRODUCT LIBRARY
-- FILE 02
-- PART 2
-- BUSINESS CONSTRAINTS
-- ============================================================================

-- ============================================================================
-- COMPARE PRICE RULE
-- ============================================================================

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_compare_price_rule

CHECK (

    compare_price IS NULL

    OR

    compare_price >= price

);

-- ============================================================================
-- READY KEY LENGTH
-- ============================================================================

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_ready_key_length

CHECK (

    ready_key IS NULL

    OR

    char_length(ready_key) <= 255

);

-- ============================================================================
-- MARKETPLACE LENGTH
-- ============================================================================

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_marketplace_length

CHECK (

    marketplace IS NULL

    OR

    char_length(marketplace) <= 100

);

-- ============================================================================
-- CATEGORY LENGTH
-- ============================================================================

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_category_length

CHECK (

    category IS NULL

    OR

    char_length(category) <= 255

);
-- ============================================================================
-- CONVERTLISTER
-- READY PRODUCT LIBRARY
-- FILE 02
-- PART 3
-- BUSINESS RULES
-- ============================================================================

-- ============================================================================
-- ARCHIVED PRODUCTS CANNOT REMAIN PUBLISHED
-- ============================================================================

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_archive_publish_rule

CHECK (

    status <> 'ARCHIVED'

    OR

    publish_status <> 'PUBLISHED'

);

-- ============================================================================
-- PUBLISHED PRODUCTS MUST HAVE published_at
-- ============================================================================

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_published_requires_timestamp

CHECK (

    publish_status <> 'PUBLISHED'

    OR

    published_at IS NOT NULL

);

-- ============================================================================
-- ARCHIVED PRODUCTS MUST HAVE archived_at
-- ============================================================================

ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_archived_requires_timestamp

CHECK (

    status <> 'ARCHIVED'

    OR

    archived_at IS NOT NULL

);
-- ============================================================================
-- CONVERTLISTER
-- READY PRODUCT LIBRARY
-- FILE 02
-- PART 4
-- VERIFICATION & DOCUMENTATION
-- ============================================================================

-- ============================================================================
-- CONSTRAINT COMMENTS
-- ============================================================================

COMMENT ON CONSTRAINT ready_products_ready_key_not_blank
ON public.ready_products IS
'Ready key cannot be blank when provided';

COMMENT ON CONSTRAINT ready_products_compare_price_rule
ON public.ready_products IS
'Compare price must be greater than or equal to price';

COMMENT ON CONSTRAINT ready_products_archive_publish_rule
ON public.ready_products IS
'Archived products cannot remain published';

-- ============================================================================
-- FINAL VERIFICATION
-- ============================================================================

DO $$
DECLARE
    constraint_count INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO constraint_count
    FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'ready_products'
      AND constraint_type = 'CHECK';

    IF constraint_count = 0 THEN
        RAISE EXCEPTION
        'No CHECK constraints found on ready_products';
    END IF;

END;
$$;
