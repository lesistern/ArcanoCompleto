#!/usr/bin/env node
/**
 * Script para actualizar racial_traits de razas suplementarias con descripciones completas
 * Convierte de TEXT[] a JSONB con objetos {name, description, type}
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '..', '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Faltan variables de entorno de Supabase')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('🚀 Actualizando racial traits de razas suplementarias...\\n')

// Cargar datos completos
const supplementsPath = join(__dirname, '..', 'src', 'lib', 'data', '3.5', 'races-supplements.json')
const phase1bPath = join(__dirname, '..', 'src', 'lib', 'data', '3.5', 'races-supplements-phase1b.json')

const supplementsData = JSON.parse(readFileSync(supplementsPath, 'utf-8'))
const phase1bData = JSON.parse(readFileSync(phase1bPath, 'utf-8'))

const allSupplementalRaces = [...supplementsData, ...phase1bData]

console.log(`📊 Encontradas ${allSupplementalRaces.length} razas suplementarias\\n`)

// Primero, alteramos el esquema de la tabla
console.log('🔧 Paso 1: Actualizando esquema de la tabla...')

// Esta query se debe ejecutar manualmente en Supabase SQL Editor:
const schemaSQL = `
-- Solo necesitamos cambiar el tipo de la columna
ALTER TABLE races
  ALTER COLUMN racial_traits TYPE JSONB
  USING racial_traits::text::jsonb;
`

console.log('⚠️  IMPORTANTE: Ejecuta este SQL en Supabase SQL Editor primero:')
console.log(schemaSQL)
console.log('\\nPresiona ENTER cuando hayas ejecutado el SQL...')

// Esperar a que el usuario confirme
await new Promise(resolve => {
  process.stdin.once('data', resolve)
})

console.log('\\n🔧 Paso 2: Actualizando datos de razas...')

// Actualizar cada raza con sus traits completos
for (const race of allSupplementalRaces) {
  const racialTraits = race.racialTraits || []

  console.log(`   Actualizando ${race.name}...`)

  const { error } = await supabase
    .from('races')
    .update({
      racial_traits: racialTraits
    })
    .eq('slug', race.slug)

  if (error) {
    console.error(`   ❌ Error actualizando ${race.name}:`, error.message)
  } else {
    console.log(`   ✅ ${race.name} - ${racialTraits.length} traits actualizados`)
  }
}

console.log('\\n🎉 Actualización completada!')
console.log('Los racial_traits ahora contienen objetos completos con name, description y type')
