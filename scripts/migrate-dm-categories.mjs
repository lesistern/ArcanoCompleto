import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Categorías del Dungeon Master
const DM_CATEGORIES = [
  {
    slug: 'pantalla-dm',
    name: 'Pantalla DM',
    description: 'Tablas de referencia rápida y reglas esenciales',
    icon_name: 'Monitor',
    color: 'text-gold-500',
    parent_slug: null,
    sort_order: 1,
    is_active: true,
  },
  {
    slug: 'clases-pnj',
    name: 'Clases PNJ',
    description: 'Clases para personajes no jugadores',
    icon_name: 'Users',
    color: 'text-green-500',
    parent_slug: null,
    sort_order: 2,
    is_active: true,
  },
  {
    slug: 'tesoros',
    name: 'Tesoros',
    description: 'Generación y distribución de tesoros',
    icon_name: 'Gem',
    color: 'text-yellow-500',
    parent_slug: null,
    sort_order: 3,
    is_active: true,
  },
  {
    slug: 'tierras-salvajes',
    name: 'Tierras salvajes, clima y ambiente',
    description: 'Reglas para exploración y entornos',
    icon_name: 'Trees',
    color: 'text-green-600',
    parent_slug: null,
    sort_order: 4,
    is_active: true,
  },
  {
    slug: 'trampas',
    name: 'Trampas',
    description: 'Diseño y mecánicas de trampas',
    icon_name: 'Zap',
    color: 'text-red-500',
    parent_slug: null,
    sort_order: 5,
    is_active: true,
  },
  {
    slug: 'planos',
    name: 'Planos',
    description: 'Cosmología y descripción de planos',
    icon_name: 'Globe',
    color: 'text-blue-500',
    parent_slug: null,
    sort_order: 6,
    is_active: true,
  },
  {
    slug: 'obstaculos-epicos',
    name: 'Obstáculos épicos',
    description: 'Desafíos para personajes de alto nivel',
    icon_name: 'Mountain',
    color: 'text-purple-500',
    parent_slug: null,
    sort_order: 7,
    is_active: true,
  },
  {
    slug: 'divino',
    name: 'Divino',
    description: 'Poderes divinos y deidades',
    icon_name: 'Sparkles',
    color: 'text-gold-500',
    parent_slug: null,
    sort_order: 8,
    is_active: true,
  },
  // Subcategorías de Planos
  {
    slug: 'plano-material',
    name: 'Plano Material',
    description: 'El plano de existencia principal donde ocurren la mayoría de las aventuras',
    icon_name: 'Globe',
    color: 'text-blue-400',
    parent_slug: 'planos',
    sort_order: 1,
    is_active: true,
  },
  // Subcategorías de Divino
  {
    slug: 'deidades',
    name: 'Deidades',
    description: 'Dioses y poderes divinos del multiverso',
    icon_name: 'Sparkles',
    color: 'text-gold-400',
    parent_slug: 'divino',
    sort_order: 1,
    is_active: true,
  },
  {
    slug: 'rangos-divinos',
    name: 'Rangos Divinos',
    description: 'Sistema de poder y jerarquía divina',
    icon_name: 'Star',
    color: 'text-yellow-400',
    parent_slug: 'divino',
    sort_order: 2,
    is_active: true,
  },
  {
    slug: 'dominios',
    name: 'Dominios',
    description: 'Esferas de poder e influencia divina',
    icon_name: 'Circle',
    color: 'text-purple-400',
    parent_slug: 'divino',
    sort_order: 3,
    is_active: true,
  },
  {
    slug: 'avatares',
    name: 'Avatares',
    description: 'Manifestaciones físicas de los dioses',
    icon_name: 'User',
    color: 'text-blue-400',
    parent_slug: 'divino',
    sort_order: 4,
    is_active: true,
  },
];

async function migrateDMCategories() {
  console.log('🚀 Starting migration of DM categories...\n');

  let successCount = 0;
  let failCount = 0;

  // Primero migrar las categorías padres
  const parentCategories = DM_CATEGORIES.filter(cat => cat.parent_slug === null);
  const childCategories = DM_CATEGORIES.filter(cat => cat.parent_slug !== null);

  console.log('📁 Migrating parent categories...\n');

  for (const category of parentCategories) {
    try {
      const { data, error } = await supabase
        .from('dm_categories')
        .upsert(category, {
          onConflict: 'slug',
        })
        .select();

      if (error) {
        console.error(`❌ Error with "${category.name}" (${category.slug}):`, error.message);
        failCount++;
      } else {
        console.log(`✅ Successfully migrated: ${category.name}`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Unexpected error with "${category.name}":`, err);
      failCount++;
    }
  }

  console.log('\n📁 Migrating child categories...\n');

  for (const category of childCategories) {
    try {
      const { data, error } = await supabase
        .from('dm_categories')
        .upsert(category, {
          onConflict: 'slug',
        })
        .select();

      if (error) {
        console.error(`❌ Error with "${category.name}" (${category.slug}):`, error.message);
        failCount++;
      } else {
        console.log(`✅ Successfully migrated: ${category.name} (child of ${category.parent_slug})`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Unexpected error with "${category.name}":`, err);
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 MIGRATION SUMMARY:');
  console.log('='.repeat(60));
  console.log(`Total categories processed: ${DM_CATEGORIES.length}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`Success rate: ${((successCount / DM_CATEGORIES.length) * 100).toFixed(2)}%`);

  if (failCount === 0) {
    console.log('\n🎉 All DM categories migrated successfully!');
  } else {
    console.log('\n⚠️  Some categories failed to migrate. Please check the errors above.');
  }
}

// Ejecutar la migración
migrateDMCategories()
  .then(() => {
    console.log('\n✅ Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration script failed:', error);
    process.exit(1);
  });