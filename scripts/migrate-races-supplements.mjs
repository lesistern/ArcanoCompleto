#!/usr/bin/env node
/**
 * Script de Migración de Razas Suplementarias a Supabase
 * Migra razas de suplementos (Races of Stone, Destiny, Wild) desde races-supplements.json
 *
 * IMPORTANTE: Estas razas provienen de suplementos y requieren aprobación del DM
 *
 * Fase 1A: Aasimar, Tiefling, Goliath, Raptoran, Killoren
 *
 * Uso: node scripts/migrate-races-supplements.mjs
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '..', '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('🚀 Iniciando migración de razas suplementarias a Supabase...\n')
console.log('⚠️  IMPORTANTE: Estas razas requieren aprobación del DM\n')

// Cargar races-supplements.json
const racesJsonPath = join(__dirname, '..', 'src', 'lib', 'data', '3.5', 'races-supplements.json')
const racesData = JSON.parse(readFileSync(racesJsonPath, 'utf-8'))

console.log(`📊 Encontradas ${racesData.length} razas suplementarias para migrar\n`)

// Función para extraer modificadores de habilidad en formato JSONB
function formatAbilityModifiers(abilityModifiers) {
  if (!abilityModifiers || Object.keys(abilityModifiers).length === 0) {
    return { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 }
  }

  return {
    str: abilityModifiers.strength || 0,
    dex: abilityModifiers.dexterity || 0,
    con: abilityModifiers.constitution || 0,
    int: abilityModifiers.intelligence || 0,
    wis: abilityModifiers.wisdom || 0,
    cha: abilityModifiers.charisma || 0
  }
}

// Función para extraer rasgos raciales como array de strings
function formatRacialTraits(racialTraits) {
  if (!racialTraits || racialTraits.length === 0) return []
  return racialTraits.map(trait => trait.name)
}

// Función para determinar creature_type
function getCreatureType(type) {
  const typeMap = {
    'Humanoide': 'Humanoide',
    'Humanoide Monstruoso': 'Humanoide Monstruoso',
    'Fey': 'Fey',
    'Dragón': 'Dragón'
  }
  return typeMap[type] || 'Humanoide'
}

// Función para determinar subtypes basado en el tipo y raza
function getSubtypes(raceId, type) {
  // Los planetouched tienen subtipos especiales
  if (raceId === 'aasimar') return ['Nativo']
  if (raceId === 'tiefling') return ['Nativo']
  if (raceId === 'goliath') return ['Goliath']
  if (raceId === 'raptoran') return ['Raptoran']
  if (raceId === 'killoren') return null // Fey no necesita subtipo adicional
  return null
}

// Transformar datos al formato de Supabase
const racesForDb = racesData.map(race => {
  const abilityMods = formatAbilityModifiers(race.abilityModifiers)

  // Añadir nota sobre aprobación del DM a la descripción
  const descriptionWithWarning = `${race.description}\n\n⚠️ RAZA SUPLEMENTARIA: Esta raza proviene del suplemento "${race.source.book}" y debe ser aprobada por el Dungeon Master antes de ser utilizada en la campaña.`

  return {
    slug: race.slug,
    name: race.name,
    size: race.size,
    base_speed: race.speed,
    ability_adjustments: abilityMods,
    racial_traits: formatRacialTraits(race.racialTraits),
    automatic_languages: race.languages?.automatic || [],
    bonus_languages: race.languages?.bonus || [],
    favored_class: race.favoredClass === 'cualquiera' ? 'Cualquiera' : race.favoredClass,
    level_adjustment: race.levelAdjustment || 0,
    creature_type: getCreatureType(race.type),
    subtypes: getSubtypes(race.id, race.type),
    darkvision: race.specialAbilities?.darkvision || null,
    low_light_vision: race.specialAbilities?.lowLightVision || race.specialAbilities?.lowlight || false,
    description: descriptionWithWarning,
    source_book: race.source?.book || 'Suplemento',
    source_page: race.source?.page || null
  }
})

// Migrar razas
async function migrateRaces() {
  console.log('🧙 Migrando razas suplementarias...')

  const { data, error } = await supabase
    .from('races')
    .insert(racesForDb)
    .select()

  if (error) {
    console.error('❌ Error migrando razas:', error.message)
    console.error('Detalles:', error)
    return false
  }

  console.log(`✅ ${data.length} razas migradas exitosamente`)

  // Mostrar resumen
  console.log('\n📋 Razas suplementarias migradas:')
  data.forEach(race => {
    const traits = race.racial_traits ? race.racial_traits.length : 0
    const la = race.level_adjustment > 0 ? ` LA+${race.level_adjustment}` : ''
    console.log(`   • ${race.name} (${race.size}, ${race.base_speed} pies${la}) - ${traits} rasgos`)
    console.log(`     Fuente: ${race.source_book}`)
  })

  return true
}

// Ejecutar migración
async function main() {
  console.log('🔑 Conectando a Supabase...')
  console.log(`   URL: ${supabaseUrl}\n`)

  const success = await migrateRaces()

  if (success) {
    console.log('\n============================================================')
    console.log('🎉 MIGRACIÓN DE RAZAS SUPLEMENTARIAS COMPLETADA')
    console.log('============================================================\n')
    console.log(`✅ Total migrado: ${racesData.length} razas\n`)
    console.log('📚 Razas por fuente:')

    // Agrupar por libro
    const byBook = {}
    racesData.forEach(race => {
      const book = race.source.book
      if (!byBook[book]) byBook[book] = []
      byBook[book].push(race.name)
    })

    Object.keys(byBook).forEach(book => {
      console.log(`   ${book}: ${byBook[book].join(', ')}`)
    })

    console.log('\n⚠️  RECORDATORIO: Todas estas razas requieren aprobación del DM')
    console.log('💡 Verifica los datos en tu Dashboard de Supabase > Table Editor > races')
  } else {
    console.log('\n❌ La migración falló. Revisa los errores arriba.')
    process.exit(1)
  }
}

main()
