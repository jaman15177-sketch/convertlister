import { createClient } from '@supabase/supabase-js'
import { calculateHealthScore } from '@/lib/score'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { product_id } = await req.json()

    if (!product_id) {
      return Response.json(
        { error: 'product_id missing' },
        { status: 400 }
      )
    }

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single()

    if (error || !product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const score = calculateHealthScore(product)

    let status = 'active'

    if (score >= 80) status = 'winner'
    else if (score >= 50) status = 'needs_optimization'
    else status = 'risk'

    const { error: updateError } = await supabase
      .from('products')
      .update({
        health_score: score,
        status,
      })
      .eq('id', product_id)

    if (updateError) {
      return Response.json(
        { error: updateError.message },
        { status: 500 }
      )
    }

    return Response.json({
      success: true,
      product_id,
      health_score: score,
      status,
    })
  } catch (err: any) {
    return Response.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    )
  }
}
