import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { product } = body

    if (!product?.id) {
      return Response.json(
        { error: "Invalid product" },
        { status: 400 }
      )
    }

    // =========================
    // SIMPLIFIED SCORING LOGIC (NO EXTERNAL FUNCTION)
    // =========================
    const score =
      (product.price || 0) > 100 ? 80 : 50

    const status =
      score > 70 ? 'active' : 'review'

    // =========================
    // UPDATE DB
    // =========================
    const { error } = await supabase
      .from('products')
      .update({
        score,
        status,
      })
      .eq('id', product.id)

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return Response.json({
      success: true,
      score,
      status,
    })
  } catch (error: any) {
    return Response.json(
      {
        error: error?.message || "Score update failed",
      },
      { status: 500 }
    )
  }
}
