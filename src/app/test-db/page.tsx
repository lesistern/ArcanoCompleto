/**
 * Página de prueba de conexión con Supabase
 * Visitar: http://localhost:3001/test-db
 */

import { createClient } from '@/lib/supabase/server'

export default async function TestDBPage() {
  let connectionStatus = 'testing'
  let errorMessage = ''
  let featsCount = 0
  let skillsCount = 0
  let weaponsCount = 0

  try {
    const supabase = await createClient()

    // Probar conexión simple
    const { count: fc, error: fe } = await supabase
      .from('feats')
      .select('*', { count: 'exact', head: true })

    const { count: sc, error: se } = await supabase
      .from('skills')
      .select('*', { count: 'exact', head: true })

    const { count: wc, error: we } = await supabase
      .from('weapons')
      .select('*', { count: 'exact', head: true })

    if (fe || se || we) {
      connectionStatus = 'error'
      errorMessage = fe?.message || se?.message || we?.message || 'Unknown error'
    } else {
      connectionStatus = 'success'
      featsCount = fc || 0
      skillsCount = sc || 0
      weaponsCount = wc || 0
    }
  } catch (error) {
    connectionStatus = 'error'
    errorMessage = error instanceof Error ? error.message : String(error)
  }

  return (
    <div className="min-h-screen bg-dungeon-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-gold-400 mb-8">
          🗄️ Test de Conexión con Supabase
        </h1>

        <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-4">
            Estado de la Conexión
          </h2>

          {connectionStatus === 'error' ? (
            <div className="bg-red-500/20 border border-red-500/30 rounded p-4 mb-4">
              <p className="text-red-400 font-bold mb-2">❌ Error de Conexión</p>
              <p className="text-sm text-red-300">{errorMessage}</p>
            </div>
          ) : connectionStatus === 'success' ? (
            <div className="bg-green-500/20 border border-green-500/30 rounded p-4 mb-4">
              <p className="text-green-400 font-bold">
                ✅ Conexión Exitosa con Supabase!
              </p>
            </div>
          ) : (
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-4 mb-4">
              <p className="text-yellow-400 font-bold">⏳ Probando conexión...</p>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-dungeon-800 rounded">
              <span className="text-dungeon-200">Tabla: feats</span>
              <span className="text-gold-400 font-bold">
                {connectionStatus === 'success' ? `${featsCount} registros` : '—'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-dungeon-800 rounded">
              <span className="text-dungeon-200">Tabla: skills</span>
              <span className="text-gold-400 font-bold">
                {connectionStatus === 'success' ? `${skillsCount} registros` : '—'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-dungeon-800 rounded">
              <span className="text-dungeon-200">Tabla: weapons</span>
              <span className="text-gold-400 font-bold">
                {connectionStatus === 'success' ? `${weaponsCount} registros` : '—'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold text-dungeon-100 mb-3">
            Información de Configuración
          </h2>
          <div className="space-y-2 text-sm text-dungeon-300">
            <p>
              <span className="text-dungeon-400">Supabase URL:</span>{' '}
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configurada' : '❌ Falta'}
            </p>
            <p>
              <span className="text-dungeon-400">Supabase Key:</span>{' '}
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ Falta'}
            </p>
            {process.env.NEXT_PUBLIC_SUPABASE_URL && (
              <p className="text-dungeon-500 text-xs mt-2">
                URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-bold rounded transition-colors"
          >
            ← Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  )
}
