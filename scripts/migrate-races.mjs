#!/usr/bin/env node
/**
 * Script de Migración de Razas a Supabase
 * Migra las 7 razas del Player's Handbook desde races.json a Supabase
 *
 * Uso: node scripts/migrate-races.mjs
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

console.log('🚀 Iniciando migración de razas a Supabase...\n')

// Cargar races.json
const racesJsonPath = join(__dirname, '..', 'src', 'lib', 'data', '3.5', 'races.json')
const racesData = JSON.parse(readFileSync(racesJsonPath, 'utf-8'))

console.log(`📊 Encontradas ${racesData.length} razas para migrar\n`)

// Función para extraer modificadores de habilidad en formato JSONB
function formatAbilityModifiers(abilityModifiers) {
  if (!abilityModifiers || Object.keys(abilityModifiers).length === 0) {
    return null
  }

  const modifiers = {
    str: abilityModifiers.strength || 0,
    dex: abilityModifiers.dexterity || 0,
    con: abilityModifiers.constitution || 0,
    int: abilityModifiers.intelligence || 0,
    wis: abilityModifiers.wisdom || 0,
    cha: abilityModifiers.charisma || 0
  }

  // Solo devolver si hay algún modificador != 0
  const hasModifiers = Object.values(modifiers).some(v => v !== 0)
  return hasModifiers ? modifiers : null
}

// Función para extraer rasgos raciales como array de strings
function formatRacialTraits(racialTraits) {
  if (!racialTraits || racialTraits.length === 0) return []
  return racialTraits.map(trait => trait.name)
}

// Función para extraer habilidades especiales
function formatSpecialAbilities(specialAbilities) {
  if (!specialAbilities) return null

  const abilities = []

  if (specialAbilities.spellLikeAbilities) {
    abilities.push(...specialAbilities.spellLikeAbilities)
  }

  if (specialAbilities.bonusSkills) {
    specialAbilities.bonusSkills.forEach(skill => {
      abilities.push(`+${skill.bonus} a ${skill.skill}`)
    })
  }

  if (specialAbilities.bonusSaves) {
    specialAbilities.bonusSaves.forEach(save => {
      if (save.condition) {
        abilities.push(`+${save.bonus} a ${save.save} ${save.condition}`)
      }
    })
  }

  return abilities.length > 0 ? abilities : null
}

// Función para determinar creature_type
function getCreatureType(type) {
  return type || 'Humanoide'
}

// Función para determinar subtypes
function getSubtypes(raceId) {
  const subtypeMap = {
    'humano': ['Humano'],
    'elfo': ['Elfo'],
    'enano': ['Enano'],
    'mediano': ['Mediano'],
    'gnomo': ['Gnomo'],
    'semielfo': ['Elfo', 'Humano'],
    'semiorco': ['Orco', 'Humano']
  }
  return subtypeMap[raceId] || null
}

// Transformar datos al formato de Supabase
const racesForDb = racesData.map(race => {
  const abilityMods = formatAbilityModifiers(race.abilityModifiers)

  return {
    slug: race.slug,
    name: race.name,
    size: race.size,
    base_speed: race.speed,
    // ability_adjustments debe ser JSONB válido, usar objeto vacío si no hay modificadores
    ability_adjustments: abilityMods || { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
    racial_traits: formatRacialTraits(race.racialTraits),
    automatic_languages: race.languages?.automatic || [],
    bonus_languages: race.languages?.bonus || [],
    favored_class: race.favoredClass === 'cualquiera' ? 'Cualquiera' : race.favoredClass,
    level_adjustment: race.levelAdjustment || 0,
    creature_type: getCreatureType(race.type),
    subtypes: getSubtypes(race.id),
    darkvision: race.specialAbilities?.darkvision || null,
    low_light_vision: race.specialAbilities?.lowLightVision || false,
    description: race.description,
    source_book: race.source?.book || 'Manual del Jugador',
    source_page: race.source?.page || null
  }
})

// Migrar razas
async function migrateRaces() {
  console.log('🧙 Migrando razas...')

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
  console.log('\n📋 Razas migradas:')
  data.forEach(race => {
    const traits = race.racial_traits ? race.racial_traits.length : 0
    console.log(`   • ${race.name} (${race.size}, ${race.base_speed} pies) - ${traits} rasgos`)
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
    console.log('🎉 MIGRACIÓN DE RAZAS COMPLETADA')
    console.log('============================================================\n')
    console.log(`✅ Total migrado: ${racesData.length} razas\n`)
    console.log('💡 Verifica los datos en tu Dashboard de Supabase > Table Editor > races')
  } else {
    console.log('\n❌ La migración falló. Revisa los errores arriba.')
    process.exit(1)
  }
}

main()
