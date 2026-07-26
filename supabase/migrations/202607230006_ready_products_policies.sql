/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ============================================================================
 *
 * File:
 * 202607230006_ready_products_policies.sql
 *
 * Part:
 * Part 1
 *
 * Responsibility:
 * SELECT Access Policy
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * REMOVE OLD POLICY (SAFE)
 * ============================================================================
 */

DROP POLICY IF EXISTS

ready_products_select_policy

ON public.ready_products;



/**
 * ============================================================================
 * SELECT POLICY
 * ============================================================================
 *
 * User can read only products
 * belonging to their organization.
 *
 */

CREATE POLICY

ready_products_select_policy

ON public.ready_products

FOR SELECT

TO authenticated

USING (

    public.user_can_access_ready_product_org(

        organization_id

    )

);



/**
 * ============================================================================
 * DOCUMENTATION
 * ============================================================================
 */

COMMENT ON POLICY

ready_products_select_policy

ON public.ready_products IS

'Allows authenticated users to view ready products inside their organization';



/**
 * ============================================================================
 * PART 1 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ SELECT policy
 * ✓ Tenant based read isolation
 * ✓ Safe policy replacement
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
 * 202607230006_ready_products_policies.sql
 *
 * Part:
 * Part 2
 *
 * Responsibility:
 * INSERT Access Policy
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * REMOVE OLD POLICY (SAFE)
 * ============================================================================
 */

DROP POLICY IF EXISTS

ready_products_insert_policy

ON public.ready_products;



/**
 * ============================================================================
 * INSERT POLICY
 * ============================================================================
 *
 * User can create ready products
 * only under organizations where
 * user is a member.
 *
 */

CREATE POLICY

ready_products_insert_policy

ON public.ready_products

FOR INSERT

TO authenticated

WITH CHECK (

    public.user_can_access_ready_product_org(

        organization_id

    )

);



/**
 * ============================================================================
 * DOCUMENTATION
 * ============================================================================
 */

COMMENT ON POLICY

ready_products_insert_policy

ON public.ready_products IS

'Allows authenticated users to create ready products inside their organization';



/**
 * ============================================================================
 * PART 2 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ INSERT policy
 * ✓ Tenant ownership validation
 * ✓ Safe policy replacement
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
 * 202607230006_ready_products_policies.sql
 *
 * Part:
 * Part 3
 *
 * Responsibility:
 * UPDATE & DELETE Access Policies
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * UPDATE POLICY
 * ============================================================================
 *
 * User can update only products
 * from their organization.
 *
 */

DROP POLICY IF EXISTS

ready_products_update_policy

ON public.ready_products;



CREATE POLICY

ready_products_update_policy

ON public.ready_products

FOR UPDATE

TO authenticated

USING (

    public.user_can_access_ready_product_org(

        organization_id

    )

)

WITH CHECK (

    public.user_can_access_ready_product_org(

        organization_id

    )

);



/**
 * ============================================================================
 * DELETE POLICY
 * ============================================================================
 *
 * User can delete only their organization products.
 *
 */

DROP POLICY IF EXISTS

ready_products_delete_policy

ON public.ready_products;



CREATE POLICY

ready_products_delete_policy

ON public.ready_products

FOR DELETE

TO authenticated

USING (

    public.user_can_access_ready_product_org(

        organization_id

    )

);



/**
 * ============================================================================
 * DOCUMENTATION
 * ============================================================================
 */


COMMENT ON POLICY

ready_products_update_policy

ON public.ready_products IS

'Allows organization members to update owned ready products';



COMMENT ON POLICY

ready_products_delete_policy

ON public.ready_products IS

'Allows organization members to delete owned ready products';



/**
 * ============================================================================
 * PART 3 COMPLETE
 * ============================================================================
 *
 * Added:
 *
 * ✓ UPDATE policy
 * ✓ DELETE policy
 * ✓ Tenant ownership protection
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
 * 202607230006_ready_products_policies.sql
 *
 * Part:
 * Part 4 FINAL
 *
 * Responsibility:
 * Policy Verification
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * POLICY VERIFICATION
 * ============================================================================
 */

DO $$

DECLARE

    policy_count INTEGER;


BEGIN


    SELECT COUNT(*)

    INTO policy_count

    FROM pg_policies

    WHERE schemaname = 'public'

    AND tablename = 'ready_products';



    IF policy_count < 4

    THEN

        RAISE EXCEPTION

        'Ready products policy setup incomplete';

    END IF;


END $$;



/**
 * ============================================================================
 * REQUIRED POLICY CHECK
 * ============================================================================
 */

DO $$

BEGIN


    IF NOT EXISTS (

        SELECT 1

        FROM pg_policies

        WHERE schemaname = 'public'

        AND tablename = 'ready_products'

        AND policyname =
        'ready_products_select_policy'

    )

    THEN

        RAISE EXCEPTION

        'Missing SELECT policy';

    END IF;



    IF NOT EXISTS (

        SELECT 1

        FROM pg_policies

        WHERE schemaname = 'public'

        AND tablename = 'ready_products'

        AND policyname =
        'ready_products_insert_policy'

    )

    THEN

        RAISE EXCEPTION

        'Missing INSERT policy';

    END IF;



    IF NOT EXISTS (

        SELECT 1

        FROM pg_policies

        WHERE schemaname = 'public'

        AND tablename = 'ready_products'

        AND policyname =
        'ready_products_update_policy'

    )

    THEN

        RAISE EXCEPTION

        'Missing UPDATE policy';

    END IF;



    IF NOT EXISTS (

        SELECT 1

        FROM pg_policies

        WHERE schemaname = 'public'

        AND tablename = 'ready_products'

        AND policyname =
        'ready_products_delete_policy'

    )

    THEN

        RAISE EXCEPTION

        'Missing DELETE policy';

    END IF;


END $$;



/**
 * ============================================================================
 * FILE 06 COMPLETE
 * ============================================================================
 *
 * 202607230006_ready_products_policies.sql
 *
 * Completed:
 *
 * ✓ SELECT Policy
 * ✓ INSERT Policy
 * ✓ UPDATE Policy
 * ✓ DELETE Policy
 * ✓ Verification
 *
 * ============================================================================
 */
