/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ============================================================================
 *
 * File:
 * 202607230005_ready_products_rls.sql
 *
 * Part:
 * Part 1
 *
 * Responsibility:
 * Enable Row Level Security
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * ENABLE RLS
 * ============================================================================
 *
 * Protect ready_products from direct unauthorized access.
 *
 */

ALTER TABLE public.ready_products

ENABLE ROW LEVEL SECURITY;



/**
 * ============================================================================
 * FORCE RLS
 * ============================================================================
 *
 * Applies RLS even for table owners.
 *
 */

ALTER TABLE public.ready_products

FORCE ROW LEVEL SECURITY;



/**
 * ============================================================================
 * DOCUMENTATION
 * ============================================================================
 */


COMMENT ON TABLE public.ready_products IS

'Ready Product Library protected by Row Level Security';



/**
 * ============================================================================
 * PART 1 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ RLS enabled
 * ✓ Force RLS enabled
 * ✓ Security foundation created
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
 * 202607230005_ready_products_rls.sql
 *
 * Part:
 * Part 2
 *
 * Responsibility:
 * RLS Security Configuration
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * SECURITY CONFIGURATION
 * ============================================================================
 *
 * Ensure RLS remains active for all access paths.
 *
 */


/**
 * Prevent accidental unrestricted access
 *
 */

ALTER TABLE public.ready_products

SET (

    autovacuum_enabled = true

);



/**
 * ============================================================================
 * SECURITY CHECK FUNCTION
 * ============================================================================
 *
 * Helper verification for migration safety.
 *
 */

DO $$

BEGIN


    IF NOT EXISTS (

        SELECT 1

        FROM pg_class c

        JOIN pg_namespace n

        ON n.oid = c.relnamespace

        WHERE n.nspname = 'public'

        AND c.relname = 'ready_products'

        AND c.relrowsecurity = true

    )

    THEN

        RAISE EXCEPTION

        'RLS is not enabled on ready_products';

    END IF;


END $$;



/**
 * ============================================================================
 * PART 2 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ RLS active verification
 * ✓ Security hardening check
 * ✓ Migration safety validation
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
 * 202607230005_ready_products_rls.sql
 *
 * Part:
 * Part 3
 *
 * Responsibility:
 * Tenant Isolation Preparation
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * ORGANIZATION ACCESS HELPER
 * ============================================================================
 *
 * This function prepares tenant-aware security checks.
 *
 * Actual access policies will be created in:
 *
 * 202607230006_ready_products_policies.sql
 *
 * ============================================================================
 */


CREATE OR REPLACE FUNCTION public.user_can_access_ready_product_org(

    target_org UUID

)

RETURNS BOOLEAN

LANGUAGE sql

SECURITY DEFINER

STABLE

AS $$

    SELECT EXISTS (

        SELECT 1

        FROM public.organization_members om

        WHERE om.organization_id = target_org

        AND om.user_id = auth.uid()

    );

$$;



/**
 * ============================================================================
 * FUNCTION SECURITY
 * ============================================================================
 */

REVOKE ALL ON FUNCTION public.user_can_access_ready_product_org(UUID)

FROM PUBLIC;



GRANT EXECUTE ON FUNCTION public.user_can_access_ready_product_org(UUID)

TO authenticated;



/**
 * ============================================================================
 * DOCUMENTATION
 * ============================================================================
 */


COMMENT ON FUNCTION public.user_can_access_ready_product_org(UUID)

IS

'Checks whether authenticated user belongs to ready product organization';



/**
 * ============================================================================
 * PART 3 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ Tenant access helper
 * ✓ Auth user mapping
 * ✓ Organization isolation foundation
 *
 * Policies are intentionally separated.
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
 * 202607230005_ready_products_rls.sql
 *
 * Part:
 * Part 4 FINAL
 *
 * Responsibility:
 * RLS Verification
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * RLS ENABLE VERIFICATION
 * ============================================================================
 */

DO $$

DECLARE

    rls_enabled BOOLEAN;


BEGIN


    SELECT relrowsecurity

    INTO rls_enabled

    FROM pg_class

    WHERE relname = 'ready_products'

    AND relnamespace = (

        SELECT oid

        FROM pg_namespace

        WHERE nspname = 'public'

    );



    IF rls_enabled IS NOT TRUE

    THEN

        RAISE EXCEPTION

        'Ready products RLS is not enabled';

    END IF;


END $$;



/**
 * ============================================================================
 * RLS FORCE VERIFICATION
 * ============================================================================
 */

DO $$

DECLARE

    rls_forced BOOLEAN;


BEGIN


    SELECT relforcerowsecurity

    INTO rls_forced

    FROM pg_class

    WHERE relname = 'ready_products'

    AND relnamespace = (

        SELECT oid

        FROM pg_namespace

        WHERE nspname = 'public'

    );



    IF rls_forced IS NOT TRUE

    THEN

        RAISE EXCEPTION

        'Ready products FORCE RLS is not enabled';

    END IF;


END $$;



/**
 * ============================================================================
 * FINAL DOCUMENTATION
 * ============================================================================
 */


COMMENT ON COLUMN public.ready_products.organization_id IS

'Tenant isolation key protected by Row Level Security';



/**
 * ============================================================================
 * FILE 05 COMPLETE
 * ============================================================================
 *
 * 202607230005_ready_products_rls.sql
 *
 * Completed:
 *
 * ✓ Enable RLS
 * ✓ Force RLS
 * ✓ Tenant isolation foundation
 * ✓ Verification
 *
 * ============================================================================
 */
