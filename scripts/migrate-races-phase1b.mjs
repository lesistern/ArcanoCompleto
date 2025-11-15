#!/usr/bin/env node
/**
 * Script de Migración de Razas Fase 1B a Supabase
 * Migra Illumian, Whisper Gnome, Centaur, Catfolk
 *
 * Uso: node scripts/migrate-races-phase1b.mjs
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
  console.error('❌ Error: Falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('🚀 Iniciando migración de razas Fase 1B...\n')

const racesJsonPath = join(__dirname, '..', 'src', 'lib', 'data', '3.5', 'races-supplements-phase1b.json')
const racesData = JSON.parse(readFileSync(racesJsonPath, 'utf-8'))

console.log(`📊 Encontradas ${racesData.length} razas Fase 1B para migrar\n`)

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

function formatRacialTraits(racialTraits) {
  if (!racialTraits || racialTraits.length === 0) return []
  return racialTraits.map(trait => trait.name)
}

function getCreatureType(type) {
  const typeMap = {
    'Humanoide': 'Humanoide',
    'Humanoide Monstruoso': 'Humanoide Monstruoso',
    'Fey': 'Fey'
  }
  return typeMap[type] || 'Humanoide'
}

function getSubtypes(raceId) {
  if (raceId === 'illumian') return ['Humano']
  if (raceId === 'whisper-gnome') return ['Gnomo']
  if (raceId === 'centaur') return ['Centauro']
  if (raceId === 'catfolk') return ['Felino']
  return null
}

const racesForDb = racesData.map(race => {
  const abilityMods = formatAbilityModifiers(race.abilityModifiers)
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
    subtypes: getSubtypes(race.id),
    darkvision: race.specialAbilities?.darkvision || null,
    low_light_vision: race.specialAbilities?.lowLightVision || false,
    description: descriptionWithWarning,
    source_book: race.source?.book || 'Suplemento',
    source_page: race.source?.page || null
  }
})

async function migrateRaces() {
  console.log('🧙 Migrando razas Fase 1B...')

  const { data, error} = await supabase
    .from('races')
    .insert(racesForDb)
    .select()

  if (error) {
    console.error('❌ Error migrando razas:', error.message)
    console.error('Detalles:', error)
    return false
  }

  console.log(`✅ ${data.length} razas migradas exitosamente`)
  console.log('\n📋 Razas Fase 1B migradas:')
  data.forEach(race => {
    const traits = race.racial_traits ? race.racial_traits.length : 0
    const la = race.level_adjustment > 0 ? ` LA+${race.level_adjustment}` : ''
    console.log(`   • ${race.name} (${race.size}, ${race.base_speed} pies${la}) - ${traits} rasgos`)
    console.log(`     Fuente: ${race.source_book}`)
  })

  return true
}

async function main() {
  console.log('🔑 Conectando a Supabase...')
  console.log(`   URL: ${supabaseUrl}\n`)

  const success = await migrateRaces()

  if (success) {
    console.log('\n============================================================')
    console.log('🎉 MIGRACIÓN FASE 1B COMPLETADA')
    console.log('============================================================\n')
    console.log(`✅ Total Fase 1B: ${racesData.length} razas`)
    console.log('⚠️  RECORDATORIO: Todas estas razas requieren aprobación del DM')
  } else {
    console.log('\n❌ La migración falló.')
    process.exit(1)
  }
}

main()
