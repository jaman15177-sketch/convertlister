/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT ID API
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
  UpdateReadyProductInput,
} from "@/lib/core/ready-product";



interface RouteContext {

  params: {

    id: string;

  };

}



/**
 * ============================================================================
 * GET
 * ============================================================================
 */

export async function GET(
  request: Request,
  context: RouteContext,
) {


  const supabase =
    await createClient();



  const {
    data:{
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
        status:401,
      },
    );

  }



  const product =
    await readyProductService.getById(
      context.params.id,
      user.id,
    );



  return NextResponse.json(
    product,
  );

}
/**
 * ============================================================================
 * PATCH
 * UPDATE READY PRODUCT
 * ============================================================================
 */

export async function PATCH(
  request: Request,
  context: RouteContext,
) {


  const supabase =
    await createClient();



  const {
    data:{
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
        status:401,
      },
    );

  }



  const body =
    await request.json();



  const input:
    UpdateReadyProductInput =
  {


    title:
      body.title,


    description:
      body.description,


    images:
      body.images,


    price:
      body.price !== undefined
        ? Number(body.price)
        : undefined,


    category:
      body.category,


    marketplace:
      body.marketplace,


    ai_score:
      body.ai_score,


    health_score:
      body.health_score,


  };



  const result =
    await readyProductService.update(
      context.params.id,
      user.id,
      input,
    );



  return NextResponse.json(
    result,
  );

}
/**
 * ============================================================================
 * DELETE
 * ============================================================================
 */

export async function DELETE(
  request: Request,
  context: RouteContext,
) {


  const supabase =
    await createClient();



  const {
    data:{
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
        status:401,
      },
    );

  }



  await readyProductService.remove(
    context.params.id,
    user.id,
  );



  return NextResponse.json(
    {
      success:true,
    },
  );

}



/**
 * ============================================================================
 * FILE COMPLETE
 * ============================================================================
 *
 * src/app/api/ready-products/[id]/route.ts
 *
 * ✓ GET Single
 * ✓ PATCH Update
 * ✓ DELETE Remove
 * ✓ Service Layer Integration
 * ✓ Supabase Auth
 *
 * ============================================================================
 */
