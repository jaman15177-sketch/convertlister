import { createClient } from '@supabase/supabase-js'
import { evaluateProduct } from '@/lib/bulkScore'

// ⚠️ Server-only key (NEVER expose to frontend)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {
  try {
    // 1. Fetch all products
    const { data: products, error } = await supabase
      .from('products')
      .select('*')

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    if (!products || products.length === 0) {
      return Response.json({
        success: true,
        message: 'No products found',
      })
    }

    // 2. Process all products
    const updates = products.map((p) => {
      const result = evaluateProduct(p)

      return supabase
        .from('products')
        .update(result)
        .eq('id', p.id)
    })

    // 3. Run in parallel (fast batch processing)
    await Promise.all(updates)

    return Response.json({
      success: true,
      processed: products.length,
      message: 'Auto score completed',
    })
  } catch (err: any) {
    return Response.json(
      {
        error: err.message || 'Server error',
      },
      { status: 500 }
    )
  }
}
