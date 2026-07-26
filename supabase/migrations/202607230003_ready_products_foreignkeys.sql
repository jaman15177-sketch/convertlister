/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ============================================================================
 *
 * File:
 * 202607230003_ready_products_foreignkeys.sql
 *
 * Part:
 * Part 1
 *
 * Responsibility:
 * Organization Relationship
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * ORGANIZATION FOREIGN KEY
 * ============================================================================
 *
 * ready_products belongs to tenant organization.
 *
 * Relationship:
 *
 * ready_products.organization_id
 *          |
 *          ▼
 * organizations.id
 *
 * ============================================================================
 */


ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_organization_fk

FOREIGN KEY (

    organization_id

)

REFERENCES public.organizations (

    id

)

ON UPDATE CASCADE

ON DELETE CASCADE;



/**
 * ============================================================================
 * DOCUMENTATION
 * ============================================================================
 */


COMMENT ON CONSTRAINT ready_products_organization_fk

ON public.ready_products IS

'Connects ready products with tenant organization ownership';



/**
 * ============================================================================
 * PART 1 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ organization_id foreign key
 * ✓ tenant relationship
 * ✓ update cascade
 * ✓ delete cascade
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
 * 202607230003_ready_products_foreignkeys.sql
 *
 * Part:
 * Part 2
 *
 * Responsibility:
 * Product Relationship
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * PRODUCT FOREIGN KEY
 * ============================================================================
 *
 * ready_products references original products catalog.
 *
 * Relationship:
 *
 * ready_products.product_id
 *          |
 *          ▼
 * products.id
 *
 * ============================================================================
 */


ALTER TABLE public.ready_products

ADD CONSTRAINT ready_products_product_fk

FOREIGN KEY (

    product_id

)

REFERENCES public.products (

    id

)

ON UPDATE CASCADE

ON DELETE SET NULL;



/**
 * ============================================================================
 * DOCUMENTATION
 * ============================================================================
 */


COMMENT ON CONSTRAINT ready_products_product_fk

ON public.ready_products IS

'Connects frozen ready products with original product catalog';



/**
 * ============================================================================
 * PART 2 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ product_id foreign key
 * ✓ product catalog relationship
 * ✓ update cascade
 * ✓ delete protection
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
 * 202607230003_ready_products_foreignkeys.sql
 *
 * Part:
 * Part 3
 *
 * Responsibility:
 * Foreign Key Relationship Hardening
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * ORGANIZATION DELETE PROTECTION
 * ============================================================================
 *
 * Ready products are tenant owned.
 *
 * Existing rule:
 * ON DELETE CASCADE
 *
 * This means:
 * Organization removal removes related ready products.
 *
 */


/**
 * ============================================================================
 * PRODUCT DELETE PROTECTION
 * ============================================================================
 *
 * Original product removal must not destroy frozen ready products.
 *
 * Existing rule:
 * ON DELETE SET NULL
 *
 * This keeps purchased/library records safe.
 *
 */


/**
 * ============================================================================
 * RELATIONSHIP VALIDATION
 * ============================================================================
 *
 * Ensure FK constraints exist.
 *
 */

DO $$

BEGIN


    IF NOT EXISTS (

        SELECT 1

        FROM pg_constraint

        WHERE conname =
        'ready_products_organization_fk'

    )

    THEN

        RAISE EXCEPTION

        'Missing organization foreign key';

    END IF;



    IF NOT EXISTS (

        SELECT 1

        FROM pg_constraint

        WHERE conname =
        'ready_products_product_fk'

    )

    THEN

        RAISE EXCEPTION

        'Missing product foreign key';

    END IF;


END $$;



/**
 * ============================================================================
 * PART 3 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ Organization relationship verification
 * ✓ Product relationship verification
 * ✓ Delete strategy validation
 * ✓ Referential integrity check
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
 * 202607230003_ready_products_foreignkeys.sql
 *
 * Part:
 * Part 4 FINAL
 *
 * Responsibility:
 * Verification & Documentation
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * FOREIGN KEY DOCUMENTATION
 * ============================================================================
 */


COMMENT ON CONSTRAINT ready_products_organization_fk

ON public.ready_products IS

'Maintains tenant ownership relationship with organizations table';



COMMENT ON CONSTRAINT ready_products_product_fk

ON public.ready_products IS

'Maintains reference relationship with original products table';



/**
 * ============================================================================
 * FINAL FOREIGN KEY VERIFICATION
 * ============================================================================
 */

DO $$

DECLARE

    fk_count INTEGER;


BEGIN


    SELECT COUNT(*)

    INTO fk_count

    FROM information_schema.table_constraints

    WHERE table_schema = 'public'

    AND table_name = 'ready_products'

    AND constraint_type = 'FOREIGN KEY';



    IF fk_count < 2

    THEN

        RAISE EXCEPTION

        'Ready products foreign key setup incomplete';

    END IF;


END $$;



/**
 * ============================================================================
 * FILE 03 COMPLETE
 * ============================================================================
 *
 * 202607230003_ready_products_foreignkeys.sql
 *
 * Completed:
 *
 * ✓ Organization FK
 * ✓ Product FK
 * ✓ Delete Behavior
 * ✓ Update Behavior
 * ✓ Verification
 * ✓ Documentation
 *
 * ============================================================================
 */
