#!/usr/bin/env node
/**
 * Script de Migración de Armas a Supabase
 * Migra las 78 armas mundanas desde weapons.json a Supabase
 *
 * Uso: node scripts/migrate-weapons.mjs
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

console.log('🚀 Iniciando migración de armas a Supabase...\n')

// Cargar weapons.json
const weaponsJsonPath = join(__dirname, '..', 'src', 'lib', 'data', '3.5', 'weapons.json')
const weaponsData = JSON.parse(readFileSync(weaponsJsonPath, 'utf-8'))

// Filtrar solo armas mundanas (no mágicas)
const mundaneWeapons = weaponsData.filter(w => !w.isMagic)

console.log(`📊 Encontradas ${mundaneWeapons.length} armas mundanas para migrar\n`)

// Función para formatear el costo
function formatCost(cost) {
  if (cost.gold) return `${cost.gold} po`
  if (cost.silver) return `${cost.silver} pp`
  return 'Gratis'
}

// Función para formatear el peso
function formatWeight(weight) {
  return `${weight} lb`
}

// Función para determinar la lógica de daño
function getDamageLogic(weaponName, damageTypes) {
  if (damageTypes.length === 1) return 'or'
  // En D&D 3.5, algunas armas hacen daño "y" (ambos tipos), otras "o" (uno u otro)
  const andWeapons = ['lucero del alba', 'guadaña', 'alabarda', 'urgrosh enano']
  const isAnd = andWeapons.some(name => weaponName.toLowerCase().includes(name))
  return isAnd ? 'and' : 'or'
}

// Transformar datos al formato de Supabase (schema correcto)
const weaponsForDb = mundaneWeapons.map(weapon => ({
  slug: weapon.slug,
  name: weapon.name,
  weapon_type: weapon.weaponType,
  category: weapon.category,
  size: weapon.size,
  cost: formatCost(weapon.cost),
  damage: weapon.stats.damage.medium, // Daño para criatura mediana
  critical: weapon.stats.critical,
  range_increment: weapon.stats.range ? `${weapon.stats.range} pies` : null,
  weight: formatWeight(weapon.stats.weight),
  damage_types: weapon.stats.damageType, // Array
  damage_logic: getDamageLogic(weapon.name, weapon.stats.damageType),
  description: weapon.description,
  special_properties: weapon.special || null,
  source_book: weapon.source?.book || 'Manual del Jugador',
  source_page: weapon.source?.page || null,
}))

// Migrar armas
async function migrateWeapons() {
  console.log('⚔️  Migrando armas...')

  const { data, error } = await supabase
    .from('weapons')
    .insert(weaponsForDb)
    .select()

  if (error) {
    console.error('❌ Error migrando armas:', error.message)
    console.error('Detalles:', error)
    return false
  }

  console.log(`✅ ${data.length} armas migradas exitosamente`)
  return true
}

// Ejecutar migración
async function main() {
  console.log('🔑 Conectando a Supabase...')
  console.log(`   URL: ${supabaseUrl}\n`)

  const success = await migrateWeapons()

  if (success) {
    console.log('\n============================================================')
    console.log('🎉 MIGRACIÓN DE ARMAS COMPLETADA')
    console.log('============================================================\n')
    console.log(`✅ Total migrado: ${mundaneWeapons.length} armas\n`)
    console.log('💡 Verifica los datos en: http://localhost:3000/test-db')
    console.log('💡 O en tu Dashboard de Supabase > Table Editor')
  } else {
    console.log('\n❌ La migración falló. Revisa los errores arriba.')
    process.exit(1)
  }
}

main()
