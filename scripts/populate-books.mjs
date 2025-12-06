#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno
config({ path: join(__dirname, '..', '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// ============================================================================
// CATÁLOGO DE 118 LIBROS D&D 3.5
// ============================================================================

const books = [
  // CORE RULEBOOKS (3)
  { slug: 'players-handbook', name: "Player's Handbook", abbreviation: 'PH', category: 'core', edition: '3.5', priority: 'critical', release_year: 2003 },
  { slug: 'dungeon-masters-guide', name: "Dungeon Master's Guide", abbreviation: 'DMG', category: 'core', edition: '3.5', priority: 'critical', release_year: 2003 },
  { slug: 'monster-manual', name: 'Monster Manual', abbreviation: 'MM', category: 'core', edition: '3.5', priority: 'critical', release_year: 2003 },

  // COMPLETE SERIES (8)
  { slug: 'complete-adventurer', name: 'Complete Adventurer', abbreviation: 'CA', category: 'complete', edition: '3.5', priority: 'high', release_year: 2005 },
  { slug: 'complete-arcane', name: 'Complete Arcane', abbreviation: 'CAr', category: 'complete', edition: '3.5', priority: 'high', release_year: 2004 },
  { slug: 'complete-champion', name: 'Complete Champion', abbreviation: 'CC', category: 'complete', edition: '3.5', priority: 'high', release_year: 2006 },
  { slug: 'complete-divine', name: 'Complete Divine', abbreviation: 'CD', category: 'complete', edition: '3.5', priority: 'high', release_year: 2004 },
  { slug: 'complete-mage', name: 'Complete Mage', abbreviation: 'CM', category: 'complete', edition: '3.5', priority: 'high', release_year: 2006 },
  { slug: 'complete-psionic', name: 'Complete Psionic', abbreviation: 'CP', category: 'complete', edition: '3.5', priority: 'high', release_year: 2006 },
  { slug: 'complete-scoundrel', name: 'Complete Scoundrel', abbreviation: 'CS', category: 'complete', edition: '3.5', priority: 'high', release_year: 2007 },
  { slug: 'complete-warrior', name: 'Complete Warrior', abbreviation: 'CW', category: 'complete', edition: '3.5', priority: 'high', release_year: 2004 },

  // MONSTER MANUALS (4)
  { slug: 'monster-manual-ii', name: 'Monster Manual II', abbreviation: 'MMII', category: 'monster_manual', edition: '3.0-updated', priority: 'medium', release_year: 2002 },
  { slug: 'monster-manual-iii', name: 'Monster Manual III', abbreviation: 'MMIII', category: 'monster_manual', edition: '3.5', priority: 'medium', release_year: 2004 },
  { slug: 'monster-manual-iv', name: 'Monster Manual IV', abbreviation: 'MMIV', category: 'monster_manual', edition: '3.5', priority: 'medium', release_year: 2006 },
  { slug: 'monster-manual-v', name: 'Monster Manual V', abbreviation: 'MMV', category: 'monster_manual', edition: '3.5', priority: 'medium', release_year: 2007 },

  // LIBROS 3.0 ACTUALIZADOS (4)
  { slug: 'deities-and-demigods', name: 'Deities and Demigods', abbreviation: 'D&D', category: 'supplement', edition: '3.0-updated', priority: 'medium', release_year: 2002 },
  { slug: 'fiend-folio', name: 'Fiend Folio', abbreviation: 'FF', category: 'supplement', edition: '3.0-updated', priority: 'medium', release_year: 2003 },
  { slug: 'manual-of-the-planes', name: 'Manual of the Planes', abbreviation: 'MoP', category: 'supplement', edition: '3.0-updated', priority: 'medium', release_year: 2001 },
  { slug: 'oriental-adventures', name: 'Oriental Adventures', abbreviation: 'OA', category: 'supplement', edition: '3.0-updated', priority: 'low', release_year: 2001 },

  // SUPPLEMENTS (42)
  { slug: 'expanded-psionics-handbook', name: 'Expanded Psionics Handbook', abbreviation: 'EPH', category: 'supplement', edition: '3.5', priority: 'high', release_year: 2004 },
  { slug: 'magic-of-incarnum', name: 'Magic of Incarnum', abbreviation: 'MoI', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2005 },
  { slug: 'tome-of-battle', name: 'Tome of Battle', abbreviation: 'ToB', category: 'supplement', edition: '3.5', priority: 'high', release_year: 2006 },
  { slug: 'tome-of-magic', name: 'Tome of Magic', abbreviation: 'ToM', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2006 },

  { slug: 'spell-compendium', name: 'Spell Compendium', abbreviation: 'SpC', category: 'supplement', edition: '3.5', priority: 'high', release_year: 2005 },
  { slug: 'magic-item-compendium', name: 'Magic Item Compendium', abbreviation: 'MIC', category: 'supplement', edition: '3.5', priority: 'high', release_year: 2007 },

  { slug: 'unearthed-arcana', name: 'Unearthed Arcana', abbreviation: 'UA', category: 'supplement', edition: '3.5', priority: 'high', release_year: 2004 },
  { slug: 'players-handbook-ii', name: "Player's Handbook II", abbreviation: 'PHII', category: 'supplement', edition: '3.5', priority: 'high', release_year: 2006 },
  { slug: 'dungeon-masters-guide-ii', name: "Dungeon Master's Guide II", abbreviation: 'DMGII', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2005 },
  { slug: 'miniatures-handbook', name: 'Miniatures Handbook', abbreviation: 'MH', category: 'supplement', edition: '3.5', priority: 'low', release_year: 2003 },

  { slug: 'cityscape', name: 'Cityscape', abbreviation: 'Cityscape', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2006 },
  { slug: 'dungeonscape', name: 'Dungeonscape', abbreviation: 'Dscape', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2007 },
  { slug: 'frostburn', name: 'Frostburn', abbreviation: 'FB', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2004 },
  { slug: 'sandstorm', name: 'Sandstorm', abbreviation: 'SS', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2005 },
  { slug: 'stormwrack', name: 'Stormwrack', abbreviation: 'SW', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2005 },

  { slug: 'draconomicon', name: 'Draconomicon', abbreviation: 'Drac', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2003 },
  { slug: 'dragon-magic', name: 'Dragon Magic', abbreviation: 'DrM', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2006 },
  { slug: 'libris-mortis', name: 'Libris Mortis', abbreviation: 'LM', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2004 },
  { slug: 'lords-of-madness', name: 'Lords of Madness', abbreviation: 'LoM', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2005 },
  { slug: 'fiendish-codex-i', name: 'Fiendish Codex I', abbreviation: 'FCI', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2006 },
  { slug: 'fiendish-codex-ii', name: 'Fiendish Codex II', abbreviation: 'FCII', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2006 },
  { slug: 'book-of-exalted-deeds', name: 'Book of Exalted Deeds', abbreviation: 'BED', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2003 },

  { slug: 'races-of-destiny', name: 'Races of Destiny', abbreviation: 'RoD', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2004 },
  { slug: 'races-of-stone', name: 'Races of Stone', abbreviation: 'RoSt', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2004 },
  { slug: 'races-of-the-dragon', name: 'Races of the Dragon', abbreviation: 'RotD', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2006 },
  { slug: 'races-of-the-wild', name: 'Races of the Wild', abbreviation: 'RoW', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2005 },

  { slug: 'elder-evils', name: 'Elder Evils', abbreviation: 'EE', category: 'supplement', edition: '3.5', priority: 'low', release_year: 2007 },
  { slug: 'exemplars-of-evil', name: 'Exemplars of Evil', abbreviation: 'EoE', category: 'supplement', edition: '3.5', priority: 'low', release_year: 2007 },
  { slug: 'heroes-of-battle', name: 'Heroes of Battle', abbreviation: 'HoB', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2005 },
  { slug: 'heroes-of-horror', name: 'Heroes of Horror', abbreviation: 'HoH', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2005 },

  { slug: 'drow-of-the-underdark', name: 'Drow of the Underdark', abbreviation: 'DU', category: 'supplement', edition: '3.5', priority: 'low', release_year: 2007 },
  { slug: 'planar-handbook', name: 'Planar Handbook', abbreviation: 'PlH', category: 'supplement', edition: '3.5', priority: 'medium', release_year: 2004 },
  { slug: 'weapons-of-legacy', name: 'Weapons of Legacy', abbreviation: 'WoL', category: 'supplement', edition: '3.5', priority: 'low', release_year: 2005 },

  // EBERRON (18)
  { slug: 'eberron-campaign-setting', name: 'Eberron Campaign Setting', abbreviation: 'ECS', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2004 },
  { slug: 'eberron-campaign-guide', name: 'Eberron Campaign Guide', abbreviation: 'ECG', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2009 },
  { slug: 'players-guide-to-eberron', name: "Player's Guide to Eberron", abbreviation: 'PGE', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2006 },
  { slug: 'eberron-players-guide', name: "Eberron Player's Guide", abbreviation: 'EPG', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2009 },
  { slug: 'dragonmarked', name: 'Dragonmarked', abbreviation: 'DrM-Eb', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2006 },
  { slug: 'races-of-eberron', name: 'Races of Eberron', abbreviation: 'RoE', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2005 },
  { slug: 'magic-of-eberron', name: 'Magic of Eberron', abbreviation: 'MoE', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2005 },
  { slug: 'dragons-of-eberron', name: 'Dragons of Eberron', abbreviation: 'DoE', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2007 },
  { slug: 'faiths-of-eberron', name: 'Faiths of Eberron', abbreviation: 'FoE', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2006 },
  { slug: 'five-nations', name: 'Five Nations', abbreviation: 'FN', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2005 },
  { slug: 'sharn-city-of-towers', name: 'Sharn: City of Towers', abbreviation: 'SCoT', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2004 },
  { slug: 'city-of-stormreach', name: 'City of Stormreach', abbreviation: 'CoS', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2008 },
  { slug: 'explorers-handbook', name: "Explorer's Handbook", abbreviation: 'EH', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2005 },
  { slug: 'secrets-of-xendrik', name: "Secrets of Xen'drik", abbreviation: 'SoX', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2006 },
  { slug: 'secrets-of-sarlona', name: 'Secrets of Sarlona', abbreviation: 'SoS', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2007 },
  { slug: 'forge-of-war', name: 'Forge of War', abbreviation: 'FoW', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2007 },
  { slug: 'adventurers-guide-to-eberron', name: "Adventurer's Guide to Eberron", abbreviation: 'AGE', category: 'setting', subcategory: 'eberron', edition: '3.5', priority: 'low', release_year: 2005 },

  // FORGOTTEN REALMS (14)
  { slug: 'players-guide-to-faerun', name: "Player's Guide to Faerûn", abbreviation: 'PGF', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2004 },
  { slug: 'magic-of-faerun', name: 'Magic of Faerûn', abbreviation: 'MoF', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2001 },
  { slug: 'dragons-of-faerun', name: 'Dragons of Faerûn', abbreviation: 'DoF', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2006 },
  { slug: 'races-of-faerun', name: 'Races of Faerûn', abbreviation: 'RoF', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2003 },
  { slug: 'champions-of-valor', name: 'Champions of Valor', abbreviation: 'CoV', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2005 },
  { slug: 'champions-of-ruin', name: 'Champions of Ruin', abbreviation: 'CoR', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2005 },
  { slug: 'power-of-faerun', name: 'Power of Faerûn', abbreviation: 'PoF', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2006 },
  { slug: 'underdark', name: 'Underdark', abbreviation: 'Und', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2003 },
  { slug: 'serpent-kingdoms', name: 'Serpent Kingdoms', abbreviation: 'SK', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2004 },
  { slug: 'lost-empires-of-faerun', name: 'Lost Empires of Faerûn', abbreviation: 'LEoF', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2005 },
  { slug: 'grand-history-of-the-realms', name: 'Grand History of the Realms', abbreviation: 'GHR', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2007 },
  { slug: 'city-of-splendors-waterdeep', name: 'City of Splendors: Waterdeep', abbreviation: 'CoSW', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2005 },
  { slug: 'shining-south', name: 'Shining South', abbreviation: 'SS-FR', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2004 },
  { slug: 'unapproachable-east', name: 'Unapproachable East', abbreviation: 'UE', category: 'setting', subcategory: 'forgotten_realms', edition: '3.5', priority: 'low', release_year: 2003 },

  // DRAGONLANCE (1)
  { slug: 'dragonlance-campaign-setting', name: 'Dragonlance Campaign Setting', abbreviation: 'DCS', category: 'setting', subcategory: 'dragonlance', edition: '3.5', priority: 'low', release_year: 2003 },

  // MAGAZINES - Solo los más importantes
  { slug: 'dragon-compendium', name: 'Dragon Compendium', abbreviation: 'DC', category: 'magazine', subcategory: 'dragon', edition: '3.5', priority: 'optional', release_year: 2005 },
]

console.log(`📚 Preparando para insertar ${books.length} libros en la base de datos...\n`)

async function populateBooks() {
  try {
    // Verificar si la tabla existe
    const { data: existingBooks, error: checkError } = await supabase
      .from('books')
      .select('count')
      .limit(1)

    if (checkError) {
      console.error('❌ Error al verificar la tabla books:', checkError.message)
      console.log('\n💡 Asegúrate de ejecutar primero: apply-db-optimizations.sql en tu Dashboard de Supabase')
      return false
    }

    // Insertar libros (usar upsert para evitar duplicados)
    const { data, error } = await supabase
      .from('books')
      .upsert(books, {
        onConflict: 'slug',
        ignoreDuplicates: false
      })
      .select()

    if (error) {
      console.error('❌ Error al insertar libros:', error.message)
      return false
    }

    console.log(`✅ ${books.length} libros insertados exitosamente\n`)

    // Mostrar estadísticas
    const { data: stats } = await supabase
      .from('books')
      .select('category, priority')

    if (stats) {
      const byCategory = {}
      const byPriority = {}

      stats.forEach(book => {
        byCategory[book.category] = (byCategory[book.category] || 0) + 1
        byPriority[book.priority] = (byPriority[book.priority] || 0) + 1
      })

      console.log('📊 Estadísticas por categoría:')
      Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
        console.log(`   ${cat}: ${count} libros`)
      })

      console.log('\n📈 Estadísticas por prioridad:')
      Object.entries(byPriority).sort((a, b) => b[1] - a[1]).forEach(([pri, count]) => {
        console.log(`   ${pri}: ${count} libros`)
      })
    }

    return true
  } catch (err) {
    console.error('❌ Error inesperado:', err)
    return false
  }
}

async function main() {
  console.log('🚀 Iniciando población de libros D&D 3.5...\n')

  const success = await populateBooks()

  if (success) {
    console.log('\n✅ ¡Migración de libros completada con éxito!')
    console.log('💡 Puedes ver los libros en: http://localhost:3000/test-db')
    console.log('💡 O en tu Dashboard de Supabase > Table Editor > books')
  } else {
    console.log('\n❌ La población de libros falló.')
    console.log('💡 Asegúrate de ejecutar apply-db-optimizations.sql primero')
    process.exit(1)
  }
}

main()
