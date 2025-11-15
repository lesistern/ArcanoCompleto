/**
 * API Route para probar la conexión con Supabase
 * GET /api/test-supabase
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Probar conexión obteniendo las tablas
    const { data: feats, error: featsError } = await supabase
      .from('feats')
      .select('count')
      .limit(1)

    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('count')
      .limit(1)

    const { data: weapons, error: weaponsError } = await supabase
      .from('weapons')
      .select('count')
      .limit(1)

    if (featsError || skillsError || weaponsError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Error conectando con Supabase',
          details: {
            featsError: featsError?.message,
            skillsError: skillsError?.message,
            weaponsError: weaponsError?.message,
          },
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '✅ Conexión con Supabase exitosa!',
      tables: {
        feats: 'Conectada',
        skills: 'Conectada',
        weapons: 'Conectada',
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Error inesperado',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
