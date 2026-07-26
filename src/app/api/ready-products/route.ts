/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCTS API
 * ============================================================================
 */

import {
  NextResponse,
} from "next/server";


import {
  createClient,
} from "@/lib/supabase/server";


import {
  readyProductService,
} from "@/lib/core/ready-product";


import type {
  CreateReadyProductInput,
  ReadyProductFilters,
  PaginationOptions,
} from "@/lib/core/ready-product";



/**
 * ============================================================================
 * GET
 * LIST READY PRODUCTS
 * ============================================================================
 */

export async function GET(
  request: Request,
) {


  const supabase =
    await createClient();



  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser();



  if (!user) {

    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      },
    );

  }



  const filters: ReadyProductFilters = {

    organization_id:
      user.id,

  };



  const pagination: PaginationOptions = {

    page: 1,

    limit: 20,

  };



  const result =
    await readyProductService.list(
      filters,
      pagination,
    );



  return NextResponse.json(
    result,
  );

}
/**
 * ============================================================================
 * POST
 * CREATE READY PRODUCT
 * ============================================================================
 */

export async function POST(
  request: Request,
) {


  const supabase =
    await createClient();



  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser();



  if (!user) {

    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      },
    );

  }



  const body =
    await request.json();



  const input:
    CreateReadyProductInput =
  {


    organization_id:
  user.id,

snapshot_id:
  body.snapshot_id ?? null,

product_id:
  body.product_id ?? null,

ready_key:
  body.ready_key ?? null,

    title:
      body.title,


    description:
      body.description ?? null,


    images:
      body.images ?? null,


    marketplace:
      body.marketplace ?? null,


    category:
      body.category ?? null,


    price:
      Number(
        body.price ?? 0,
      ),


    compare_price:
      body.compare_price ?? null,


    currency:
      body.currency ?? "BDT",


    ai_score:
      body.ai_score ?? 0,


    health_score:
      body.health_score ?? 0,


  };



  const result =
    await readyProductService.create(
      input,
    );



  return NextResponse.json(
    result,
    {
      status: 201,
    },
  );

}
/**
 * ============================================================================
 * NOTE
 * ============================================================================
 *
 * GET এবং POST বর্তমানে service layer error bubble করবে।
 * Global error middleware থাকলে সেটি handle করবে।
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * FILE COMPLETE
 * ============================================================================
 *
 * src/app/api/ready-products/route.ts
 *
 * ✓ GET List
 * ✓ POST Create
 * ✓ Supabase Auth
 * ✓ Service Integration
 * ✓ Type Safe Input
 *
 * ============================================================================
 */
