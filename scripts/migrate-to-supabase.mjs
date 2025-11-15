#!/usr/bin/env node
/**
 * Script de Migración de Datos a Supabase
 * Migra dotes, habilidades y armas desde los datos inline a Supabase
 *
 * Uso: node scripts/migrate-to-supabase.mjs
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

console.log('🚀 Iniciando migración de datos a Supabase...\n')

// ============================================================================
// DATOS DE DOTES (34 dotes)
// ============================================================================
const feats = [
  {
    slug: 'alerta',
    name: 'Alerta',
    category: 'General',
    benefit: 'Obtienes un bonificador +2 en las pruebas de Avistar y Escuchar.',
  },
  {
    slug: 'aptitud-magica',
    name: 'Aptitud mágica',
    category: 'General',
    benefit: 'Añade +1 al nivel de lanzador de todos tus conjuros.',
  },
  {
    slug: 'arma-preferida',
    name: 'Arma preferida',
    category: 'General',
    prerequisites: 'Competencia con el arma, BAB +1',
    benefit: 'Ganas un bonificador +1 en las tiradas de ataque con un arma específica.',
  },
  {
    slug: 'atletismo',
    name: 'Atletismo',
    category: 'General',
    benefit: 'Obtienes un bonificador +2 en las pruebas de Saltar y Trepar.',
  },
  {
    slug: 'ataque-poderoso',
    name: 'Ataque poderoso',
    category: 'Combate',
    prerequisites: 'Fuerza 13+',
    benefit: 'Puedes sacrificar precisión por daño en ataques cuerpo a cuerpo.',
  },
  {
    slug: 'buscar-en-combate',
    name: 'Buscar en combate',
    category: 'Combate',
    benefit: 'Puedes realizar una acción de búsqueda como acción gratuita.',
  },
  {
    slug: 'combatir-a-ciegas',
    name: 'Combatir a ciegas',
    category: 'Combate',
    benefit: 'No pierdes tu bonificador de Destreza a la CA por estar cegado.',
  },
  {
    slug: 'combatir-con-dos-armas',
    name: 'Combatir con dos armas',
    category: 'Combate',
    prerequisites: 'Destreza 15+',
    benefit: 'Reduces las penalizaciones por luchar con dos armas.',
  },
  {
    slug: 'combatir-montado',
    name: 'Combatir montado',
    category: 'Combate',
    prerequisites: 'Montar 1 rango',
    benefit: 'Reduces las penalizaciones por atacar montado.',
  },
  {
    slug: 'desarmar-mejorado',
    name: 'Desarmar mejorado',
    category: 'Combate',
    prerequisites: 'Inteligencia 13+, Pericia en combate',
    benefit: 'No provocas ataques de oportunidad al desarmar.',
  },
  {
    slug: 'duro-de-matar',
    name: 'Duro de matar',
    category: 'General',
    benefit: 'Permaneces consciente entre -1 y -9 puntos de golpe.',
  },
  {
    slug: 'dureza',
    name: 'Dureza',
    category: 'General',
    benefit: 'Ganas +3 puntos de golpe. Especial: Puedes tomar esta dote múltiples veces.',
  },
  {
    slug: 'empuñadura-firme',
    name: 'Empuñadura firme',
    category: 'Combate',
    prerequisites: 'Fuerza 13+',
    benefit: '+4 en las pruebas de Fuerza para evitar ser desarmado.',
  },
  {
    slug: 'engañar',
    name: 'Engañar',
    category: 'General',
    benefit: '+2 en Engañar y Intimidar.',
  },
  {
    slug: 'enfocar-conjuro',
    name: 'Enfocar conjuro',
    category: 'General',
    benefit: '+1 a la CD de las tiradas de salvación contra una escuela de magia.',
  },
  {
    slug: 'esquivar',
    name: 'Esquivar',
    category: 'Combate',
    prerequisites: 'Destreza 13+',
    benefit: '+1 de bonificador de esquiva a la CA contra un oponente designado.',
  },
  {
    slug: 'foco-en-arma',
    name: 'Foco en arma',
    category: 'General',
    prerequisites: 'Competencia con el arma, BAB +1',
    benefit: '+1 en tiradas de ataque con un arma específica.',
  },
  {
    slug: 'fuerza-de-voluntad',
    name: 'Fuerza de voluntad',
    category: 'General',
    benefit: '+2 en tiradas de salvación de Voluntad.',
  },
  {
    slug: 'golpe-critico-mejorado',
    name: 'Golpe crítico mejorado',
    category: 'Combate',
    prerequisites: 'Competencia con el arma, BAB +8',
    benefit: 'Duplica el rango de amenaza de crítico con un arma.',
  },
  {
    slug: 'gran-fortaleza',
    name: 'Gran Fortaleza',
    category: 'General',
    benefit: '+2 en tiradas de salvación de Fortaleza.',
  },
  {
    slug: 'iniciativa-mejorada',
    name: 'Iniciativa mejorada',
    category: 'Combate',
    benefit: '+4 en pruebas de iniciativa.',
  },
  {
    slug: 'maniobras-agiles',
    name: 'Maniobras ágiles',
    category: 'General',
    benefit: '+2 en Equilibrio y Escapismo.',
  },
  {
    slug: 'movilidad',
    name: 'Movilidad',
    category: 'Combate',
    prerequisites: 'Destreza 13+, Esquivar',
    benefit: '+4 de bonificador de esquiva a la CA contra ataques de oportunidad.',
  },
  {
    slug: 'negociador',
    name: 'Negociador',
    category: 'General',
    benefit: '+2 en Diplomacia y Saber (leyes).',
  },
  {
    slug: 'pericia-en-combate',
    name: 'Pericia en combate',
    category: 'Combate',
    prerequisites: 'Inteligencia 13+',
    benefit: 'Obtienes un bonificador +4 en las pruebas opuestas para derribar o desarmar.',
  },
  {
    slug: 'persuasivo',
    name: 'Persuasivo',
    category: 'General',
    benefit: '+2 en Diplomacia e Intimidar.',
  },
  {
    slug: 'pies-ligeros',
    name: 'Pies ligeros',
    category: 'General',
    benefit: '+2 en Moverse sigilosamente y Saltar.',
  },
  {
    slug: 'rastrear',
    name: 'Rastrear',
    category: 'General',
    benefit: 'Puedes usar Supervivencia para rastrear.',
  },
  {
    slug: 'reflejos-rapidos',
    name: 'Reflejos rápidos',
    category: 'General',
    benefit: '+2 en tiradas de salvación de Reflejos.',
  },
  {
    slug: 'resistencia',
    name: 'Resistencia',
    category: 'General',
    benefit: '+4 para evitar daño no letal por esfuerzos físicos.',
  },
  {
    slug: 'salvaje',
    name: 'Salvaje',
    category: 'General',
    benefit: '+2 en Supervivencia y Trato con animales.',
  },
  {
    slug: 'sin-armadura',
    name: 'Sin armadura',
    category: 'General',
    benefit: '+1 de bonificador de esquiva a la CA cuando no lleves armadura.',
  },
  {
    slug: 'soltura-con-habilidad',
    name: 'Soltura con habilidad',
    category: 'General',
    benefit: 'Puedes usar una habilidad sin entrenamiento.',
  },
  {
    slug: 'tirador-de-precision',
    name: 'Tirador de precisión',
    category: 'Combate',
    prerequisites: 'Dex 13+, Tiro certero',
    benefit: 'Puedes realizar ataques furtivos con armas a distancia hasta 30 pies.',
  },
]

// ============================================================================
// DATOS DE HABILIDADES (43 habilidades)
// ============================================================================
const skills = [
  {
    slug: 'abrir-cerraduras',
    name: 'Abrir cerraduras',
    key_ability: 'Destreza',
    trained_only: true,
    armor_penalty: true,
    description: 'Puedes abrir cerraduras con herramientas de ladrón.',
  },
  {
    slug: 'actuar',
    name: 'Actuar',
    key_ability: 'Carisma',
    trained_only: false,
    armor_penalty: false,
    description: 'Puedes impresionar a una audiencia con tu talento artístico.',
  },
  {
    slug: 'avistar',
    name: 'Avistar',
    key_ability: 'Sabiduría',
    trained_only: false,
    armor_penalty: false,
    description: 'Detecta personas, criaturas u objetos ocultos o difíciles de ver.',
  },
  {
    slug: 'buscar',
    name: 'Buscar',
    key_ability: 'Inteligencia',
    trained_only: false,
    armor_penalty: false,
    description: 'Encuentras trampas, puertas secretas y otros detalles ocultos.',
  },
  {
    slug: 'concentracion',
    name: 'Concentración',
    key_ability: 'Constitución',
    trained_only: false,
    armor_penalty: false,
    description: 'Puedes mantener la concentración en situaciones difíciles.',
  },
  {
    slug: 'conocimiento-de-conjuros',
    name: 'Conocimiento de conjuros',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Identificas conjuros y efectos mágicos.',
  },
  {
    slug: 'craft',
    name: 'Craft',
    key_ability: 'Inteligencia',
    trained_only: false,
    armor_penalty: false,
    description: 'Creas o reparas objetos.',
  },
  {
    slug: 'descifrar-escritura',
    name: 'Descifrar escritura',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Interpretas escritos desconocidos o cifrados.',
  },
  {
    slug: 'diplomacia',
    name: 'Diplomacia',
    key_ability: 'Carisma',
    trained_only: false,
    armor_penalty: false,
    description: 'Negociar, persuadir y mejorar actitudes.',
  },
  {
    slug: 'disfrazarse',
    name: 'Disfrazarse',
    key_ability: 'Carisma',
    trained_only: false,
    armor_penalty: false,
    description: 'Cambias tu apariencia.',
  },
  {
    slug: 'engañar',
    name: 'Engañar',
    key_ability: 'Carisma',
    trained_only: false,
    armor_penalty: false,
    description: 'Convences a otros de que algo falso es verdad.',
  },
  {
    slug: 'equilibrio',
    name: 'Equilibrio',
    key_ability: 'Destreza',
    trained_only: false,
    armor_penalty: true,
    description: 'Mantén el equilibrio en superficies precarias.',
  },
  {
    slug: 'escapismo',
    name: 'Escapismo',
    key_ability: 'Destreza',
    trained_only: false,
    armor_penalty: true,
    description: 'Escapa de ataduras, redes o agarres.',
  },
  {
    slug: 'esconderse',
    name: 'Esconderse',
    key_ability: 'Destreza',
    trained_only: false,
    armor_penalty: true,
    description: 'Evita ser visto.',
  },
  {
    slug: 'escuchar',
    name: 'Escuchar',
    key_ability: 'Sabiduría',
    trained_only: false,
    armor_penalty: false,
    description: 'Detecta sonidos que otros podrían perderse.',
  },
  {
    slug: 'falsificar',
    name: 'Falsificar',
    key_ability: 'Inteligencia',
    trained_only: false,
    armor_penalty: false,
    description: 'Creas documentos falsos convincentes.',
  },
  {
    slug: 'hablar-idioma',
    name: 'Hablar idioma',
    key_ability: 'Ninguna',
    trained_only: true,
    armor_penalty: false,
    description: 'Aprendes nuevos idiomas.',
  },
  {
    slug: 'inutilizar-mecanismo',
    name: 'Inutilizar mecanismo',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Desactiva trampas y sabotea objetos.',
  },
  {
    slug: 'intimidar',
    name: 'Intimidar',
    key_ability: 'Carisma',
    trained_only: false,
    armor_penalty: false,
    description: 'Asustas o coacciona a otros.',
  },
  {
    slug: 'juego-de-manos',
    name: 'Juego de manos',
    key_ability: 'Destreza',
    trained_only: true,
    armor_penalty: true,
    description: 'Hurtos menores, trucos de prestidigitación.',
  },
  {
    slug: 'montar',
    name: 'Montar',
    key_ability: 'Destreza',
    trained_only: false,
    armor_penalty: false,
    description: 'Montas y controlas animales de montura.',
  },
  {
    slug: 'moverse-sigilosamente',
    name: 'Moverse sigilosamente',
    key_ability: 'Destreza',
    trained_only: false,
    armor_penalty: true,
    description: 'Te mueves sin hacer ruido.',
  },
  {
    slug: 'nadar',
    name: 'Nadar',
    key_ability: 'Fuerza',
    trained_only: false,
    armor_penalty: true,
    description: 'Nadas en agua.',
  },
  {
    slug: 'oficio',
    name: 'Oficio',
    key_ability: 'Sabiduría',
    trained_only: false,
    armor_penalty: false,
    description: 'Ganas dinero con un oficio.',
  },
  {
    slug: 'profesion',
    name: 'Profesión',
    key_ability: 'Sabiduría',
    trained_only: true,
    armor_penalty: false,
    description: 'Ganas dinero con una profesión.',
  },
  {
    slug: 'reunir-informacion',
    name: 'Reunir información',
    key_ability: 'Carisma',
    trained_only: false,
    armor_penalty: false,
    description: 'Obtienes información en una zona.',
  },
  {
    slug: 'saber-arcano',
    name: 'Saber (arcano)',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Conocimiento sobre magia, hechizos y criaturas mágicas.',
  },
  {
    slug: 'saber-arquitectura',
    name: 'Saber (arquitectura)',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Conocimiento sobre edificios y construcción.',
  },
  {
    slug: 'saber-dungeons',
    name: 'Saber (dungeons)',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Conocimiento sobre mazmorras y subterráneos.',
  },
  {
    slug: 'saber-geografia',
    name: 'Saber (geografía)',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Conocimiento sobre tierras, terrenos y climas.',
  },
  {
    slug: 'saber-historia',
    name: 'Saber (historia)',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Conocimiento sobre eventos históricos.',
  },
  {
    slug: 'saber-local',
    name: 'Saber (local)',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Conocimiento sobre gente, leyendas y lugares locales.',
  },
  {
    slug: 'saber-naturaleza',
    name: 'Saber (naturaleza)',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Conocimiento sobre naturaleza, clima y animales.',
  },
  {
    slug: 'saber-nobleza',
    name: 'Saber (nobleza)',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Conocimiento sobre linajes, heráldica y nobleza.',
  },
  {
    slug: 'saber-planos',
    name: 'Saber (planos)',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Conocimiento sobre otros planos de existencia.',
  },
  {
    slug: 'saber-religion',
    name: 'Saber (religión)',
    key_ability: 'Inteligencia',
    trained_only: true,
    armor_penalty: false,
    description: 'Conocimiento sobre deidades, mitología y iglesias.',
  },
  {
    slug: 'saltar',
    name: 'Saltar',
    key_ability: 'Fuerza',
    trained_only: false,
    armor_penalty: true,
    description: 'Saltas largas distancias o alturas.',
  },
  {
    slug: 'sanar',
    name: 'Sanar',
    key_ability: 'Sabiduría',
    trained_only: false,
    armor_penalty: false,
    description: 'Tratas heridas y enfermedades.',
  },
  {
    slug: 'sentir-motivacion',
    name: 'Sentir motivación',
    key_ability: 'Sabiduría',
    trained_only: false,
    armor_penalty: false,
    description: 'Detectas las verdaderas intenciones de alguien.',
  },
  {
    slug: 'supervivencia',
    name: 'Supervivencia',
    key_ability: 'Sabiduría',
    trained_only: false,
    armor_penalty: false,
    description: 'Sobrevives en la naturaleza, rastrear, evitar peligros.',
  },
  {
    slug: 'tasacion',
    name: 'Tasación',
    key_ability: 'Inteligencia',
    trained_only: false,
    armor_penalty: false,
    description: 'Determinas el valor de objetos.',
  },
  {
    slug: 'trato-con-animales',
    name: 'Trato con animales',
    key_ability: 'Carisma',
    trained_only: true,
    armor_penalty: false,
    description: 'Manejas y entrenas animales.',
  },
  {
    slug: 'trepar',
    name: 'Trepar',
    key_ability: 'Fuerza',
    trained_only: false,
    armor_penalty: true,
    description: 'Escalas superficies verticales.',
  },
]

// ============================================================================
// FUNCIONES DE MIGRACIÓN
// ============================================================================

async function migrateFeats() {
  console.log('📖 Migrando dotes...')

  const { data, error } = await supabase
    .from('feats')
    .insert(feats)
    .select()

  if (error) {
    console.error('❌ Error migrando dotes:', error.message)
    return false
  }

  console.log(`✅ ${data.length} dotes migradas exitosamente`)
  return true
}

async function migrateSkills() {
  console.log('\n🎯 Migrando habilidades...')

  const { data, error } = await supabase
    .from('skills')
    .insert(skills)
    .select()

  if (error) {
    console.error('❌ Error migrando habilidades:', error.message)
    return false
  }

  console.log(`✅ ${data.length} habilidades migradas exitosamente`)
  return true
}

async function migrateWeapons() {
  console.log('\n⚔️  Migrando armas...')
  console.log('⚠️  Advertencia: Los datos de armas se extraerán de la página de armas.')
  console.log('⚠️  Por ahora, saltamos esta migración. Implementar manualmente.')
  return true
}

// ============================================================================
// EJECUTAR MIGRACIÓN
// ============================================================================

async function main() {
  console.log('🔑 Conectando a Supabase...')
  console.log(`   URL: ${supabaseUrl}\n`)

  const success = []

  // Migrar dotes
  if (await migrateFeats()) {
    success.push('dotes')
  }

  // Migrar habilidades
  if (await migrateSkills()) {
    success.push('habilidades')
  }

  // Migrar armas (pendiente - datos muy grandes)
  // if (await migrateWeapons()) {
  //   success.push('armas')
  // }

  console.log('\n' + '='.repeat(60))
  console.log('🎉 MIGRACIÓN COMPLETADA')
  console.log('='.repeat(60))
  console.log(`\n✅ Elementos migrados: ${success.join(', ')}`)
  console.log('\n💡 Verifica los datos en: http://localhost:3000/test-db')
  console.log('💡 O en tu Dashboard de Supabase > Table Editor\n')
}

main().catch(console.error)
