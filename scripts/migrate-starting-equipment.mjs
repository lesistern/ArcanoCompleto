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

// Datos de los kits de equipo - importados desde el archivo TypeScript
const STARTING_EQUIPMENT = {
  // BÁRBARO
  barbarian: [
    {
      name: 'Kit del Guerrero Tribal',
      description: 'Equipo para un bárbaro que confía en su fuerza bruta y movilidad',
      totalCost: 40,
      totalWeight: 55,
      items: [
        { name: 'Hacha de batalla grande', quantity: 1, weight: 12 },
        { name: 'Jabalinas', quantity: 4, weight: 8 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
        { name: 'Pedernal y yesca', quantity: 1, weight: 0 },
        { name: 'Antorchas', quantity: 5, weight: 5 },
      ],
    },
    {
      name: 'Kit del Saqueador Nómada',
      description: 'Equipo versátil para un bárbaro que caza y saquea',
      totalCost: 45,
      totalWeight: 48,
      items: [
        { name: 'Espada larga', quantity: 1, weight: 4 },
        { name: 'Arco corto compuesto', quantity: 1, weight: 2 },
        { name: 'Flechas', quantity: 20, weight: 3 },
        { name: 'Armadura de pieles', quantity: 1, weight: 25 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Cuerda de cáñamo (50 pies)', quantity: 1, weight: 10 },
      ],
    },
  ],

  // BARDO
  bard: [
    {
      name: 'Kit del Trovador Viajero',
      description: 'Equipo para un bardo que entretiene en las tabernas',
      totalCost: 80,
      totalWeight: 40,
      items: [
        { name: 'Espada corta', quantity: 1, weight: 2 },
        { name: 'Ballesta ligera', quantity: 1, weight: 4 },
        { name: 'Virotes', quantity: 20, weight: 2 },
        { name: 'Armadura de cuero tachonado', quantity: 1, weight: 20 },
        { name: 'Laúd', quantity: 1, weight: 3 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Ropa de viajero elegante', quantity: 1, weight: 0 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
      ],
    },
    {
      name: 'Kit del Pícaro Carismático',
      description: 'Equipo ligero para un bardo que prefiere la astucia',
      totalCost: 75,
      totalWeight: 35,
      items: [
        { name: 'Estoque', quantity: 1, weight: 2 },
        { name: 'Daga', quantity: 2, weight: 2 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Flauta', quantity: 1, weight: 1 },
        { name: 'Herramientas de ladrón', quantity: 1, weight: 1 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Tinta y pluma', quantity: 1, weight: 0 },
        { name: 'Pergamino en blanco (5 hojas)', quantity: 1, weight: 0 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Odre', quantity: 1, weight: 4 },
      ],
    },
  ],

  // CLÉRIGO
  cleric: [
    {
      name: 'Kit del Clérigo de Guerra',
      description: 'Equipo para un clérigo que combate en primera línea',
      totalCost: 110,
      totalWeight: 70,
      items: [
        { name: 'Maza pesada', quantity: 1, weight: 8 },
        { name: 'Ballesta ligera', quantity: 1, weight: 4 },
        { name: 'Virotes', quantity: 20, weight: 2 },
        { name: 'Cota de escamas', quantity: 1, weight: 30 },
        { name: 'Escudo pesado de madera', quantity: 1, weight: 10 },
        { name: 'Símbolo sagrado de madera', quantity: 1, weight: 0 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Agua bendita (frasco)', quantity: 2, weight: 2 },
      ],
    },
    {
      name: 'Kit del Sanador Devoto',
      description: 'Equipo para un clérigo centrado en curación y apoyo',
      totalCost: 95,
      totalWeight: 50,
      items: [
        { name: 'Maza ligera', quantity: 1, weight: 4 },
        { name: 'Honda', quantity: 1, weight: 0 },
        { name: 'Piedras de honda', quantity: 20, weight: 10 },
        { name: 'Armadura de cota de mallas', quantity: 1, weight: 20 },
        { name: 'Escudo ligero de madera', quantity: 1, weight: 5 },
        { name: 'Símbolo sagrado de plata', quantity: 1, weight: 0 },
        { name: 'Kit de sanador', quantity: 1, weight: 1 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Velas', quantity: 10, weight: 0 },
        { name: 'Libro de oraciones', quantity: 1, weight: 1 },
      ],
    },
  ],

  // DRUIDA
  druid: [
    {
      name: 'Kit del Guardián del Bosque',
      description: 'Equipo para un druida protector de la naturaleza',
      totalCost: 60,
      totalWeight: 45,
      items: [
        { name: 'Cimitarra', quantity: 1, weight: 4 },
        { name: 'Honda', quantity: 1, weight: 0 },
        { name: 'Piedras de honda', quantity: 20, weight: 10 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Escudo de madera', quantity: 1, weight: 5 },
        { name: 'Muérdago y acebo', quantity: 1, weight: 0 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
      ],
    },
    {
      name: 'Kit del Caminante Salvaje',
      description: 'Equipo ligero para un druida explorador',
      totalCost: 55,
      totalWeight: 40,
      items: [
        { name: 'Bastón', quantity: 1, weight: 4 },
        { name: 'Daga', quantity: 2, weight: 2 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Muérdago y acebo', quantity: 1, weight: 0 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
        { name: 'Cuerda de cáñamo (50 pies)', quantity: 1, weight: 10 },
        { name: 'Raciones (1 día)', quantity: 7, weight: 7 },
        { name: 'Yesquero', quantity: 1, weight: 0 },
      ],
    },
  ],

  // GUERRERO
  fighter: [
    {
      name: 'Kit del Guerrero Pesado',
      description: 'Equipo para un guerrero fuertemente armado',
      totalCost: 150,
      totalWeight: 85,
      items: [
        { name: 'Espada larga', quantity: 1, weight: 4 },
        { name: 'Arco largo', quantity: 1, weight: 3 },
        { name: 'Flechas', quantity: 40, weight: 6 },
        { name: 'Cota de mallas', quantity: 1, weight: 40 },
        { name: 'Escudo pesado de acero', quantity: 1, weight: 15 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Antorchas', quantity: 3, weight: 3 },
      ],
    },
    {
      name: 'Kit del Guerrero Ágil',
      description: 'Equipo para un guerrero que prefiere movilidad',
      totalCost: 120,
      totalWeight: 55,
      items: [
        { name: 'Espada bastarda', quantity: 1, weight: 6 },
        { name: 'Daga', quantity: 2, weight: 2 },
        { name: 'Armadura de cuero tachonado', quantity: 1, weight: 20 },
        { name: 'Rodela', quantity: 1, weight: 6 },
        { name: 'Arco corto compuesto', quantity: 1, weight: 2 },
        { name: 'Flechas', quantity: 20, weight: 3 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Cuerda de cáñamo (50 pies)', quantity: 1, weight: 10 },
        { name: 'Gancho de escalada', quantity: 1, weight: 4 },
      ],
    },
  ],

  // MONJE
  monk: [
    {
      name: 'Kit del Asceta',
      description: 'Equipo mínimo para un monje dedicado a la meditación',
      totalCost: 20,
      totalWeight: 20,
      items: [
        { name: 'Bastón', quantity: 1, weight: 4 },
        { name: 'Shuriken', quantity: 10, weight: 5 },
        { name: 'Ropa de monje', quantity: 1, weight: 0 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
      ],
    },
    {
      name: 'Kit del Viajero',
      description: 'Equipo para un monje errante',
      totalCost: 25,
      totalWeight: 25,
      items: [
        { name: 'Nunchaku', quantity: 1, weight: 2 },
        { name: 'Honda', quantity: 1, weight: 0 },
        { name: 'Piedras de honda', quantity: 20, weight: 10 },
        { name: 'Ropa de viajero', quantity: 1, weight: 0 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Cuerda de seda (50 pies)', quantity: 1, weight: 5 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Antorcha', quantity: 2, weight: 2 },
        { name: 'Aceite (frasco)', quantity: 2, weight: 2 },
      ],
    },
  ],

  // PALADÍN
  paladin: [
    {
      name: 'Kit del Paladín Justo',
      description: 'Equipo para un paladín defensor de la justicia',
      totalCost: 180,
      totalWeight: 90,
      items: [
        { name: 'Espada larga', quantity: 1, weight: 4 },
        { name: 'Lanza', quantity: 1, weight: 6 },
        { name: 'Cota de mallas', quantity: 1, weight: 40 },
        { name: 'Escudo pesado de acero', quantity: 1, weight: 15 },
        { name: 'Símbolo sagrado de plata', quantity: 1, weight: 0 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
        { name: 'Odre', quantity: 1, weight: 4 },
        { name: 'Raciones (1 día)', quantity: 5, weight: 5 },
        { name: 'Agua bendita (frasco)', quantity: 3, weight: 3 },
        { name: 'Aceite bendecido', quantity: 2, weight: 2 },
      ],
    },
    {
      name: 'Kit del Caballero Errante',
      description: 'Equipo para un paladín en misión sagrada',
      totalCost: 160,
      totalWeight: 75,
      items: [
        { name: 'Espada bastarda', quantity: 1, weight: 6 },
        { name: 'Arco largo compuesto', quantity: 1, weight: 3 },
        { name: 'Flechas', quantity: 20, weight: 3 },
        { name: 'Cota de escamas', quantity: 1, weight: 30 },
        { name: 'Escudo de acero', quantity: 1, weight: 10 },
        { name: 'Símbolo sagrado de madera', quantity: 1, weight: 0 },
        { name: 'Kit de sanador', quantity: 1, weight: 1 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Tienda (para 2 personas)', quantity: 1, weight: 20 },
      ],
    },
  ],

  // EXPLORADOR
  ranger: [
    {
      name: 'Kit del Rastreador de Bosques',
      description: 'Equipo para un explorador especializado en supervivencia',
      totalCost: 100,
      totalWeight: 60,
      items: [
        { name: 'Espada larga', quantity: 1, weight: 4 },
        { name: 'Espada corta', quantity: 1, weight: 2 },
        { name: 'Arco largo', quantity: 1, weight: 3 },
        { name: 'Flechas', quantity: 40, weight: 6 },
        { name: 'Armadura de cuero tachonado', quantity: 1, weight: 20 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Saco de dormir', quantity: 1, weight: 5 },
        { name: 'Cuerda de cáñamo (50 pies)', quantity: 1, weight: 10 },
        { name: 'Raciones (1 día)', quantity: 7, weight: 7 },
        { name: 'Pedernal y yesca', quantity: 1, weight: 0 },
      ],
    },
    {
      name: 'Kit del Guardabosques Versátil',
      description: 'Equipo equilibrado para un explorador todoterreno',
      totalCost: 95,
      totalWeight: 55,
      items: [
        { name: 'Hacha de batalla', quantity: 1, weight: 6 },
        { name: 'Daga', quantity: 3, weight: 3 },
        { name: 'Arco largo compuesto', quantity: 1, weight: 3 },
        { name: 'Flechas', quantity: 30, weight: 4.5 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Tienda (1 persona)', quantity: 1, weight: 10 },
        { name: 'Anzuelo y sedal', quantity: 1, weight: 0 },
        { name: 'Trampa para animales', quantity: 2, weight: 10 },
        { name: 'Yesquero', quantity: 1, weight: 0 },
      ],
    },
  ],

  // PÍCARO
  rogue: [
    {
      name: 'Kit del Ladrón Urbano',
      description: 'Equipo para un pícaro especializado en el sigilo urbano',
      totalCost: 90,
      totalWeight: 40,
      items: [
        { name: 'Espada corta', quantity: 1, weight: 2 },
        { name: 'Daga', quantity: 4, weight: 4 },
        { name: 'Ballesta ligera', quantity: 1, weight: 4 },
        { name: 'Virotes', quantity: 20, weight: 2 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Herramientas de ladrón', quantity: 1, weight: 1 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Cuerda de seda (50 pies)', quantity: 1, weight: 5 },
        { name: 'Gancho de escalada', quantity: 1, weight: 4 },
        { name: 'Aceite (frasco)', quantity: 3, weight: 3 },
      ],
    },
    {
      name: 'Kit del Explorador Sigiloso',
      description: 'Equipo para un pícaro que prefiere exploración',
      totalCost: 85,
      totalWeight: 35,
      items: [
        { name: 'Estoque', quantity: 1, weight: 2 },
        { name: 'Arco corto', quantity: 1, weight: 2 },
        { name: 'Flechas', quantity: 20, weight: 3 },
        { name: 'Armadura de cuero', quantity: 1, weight: 15 },
        { name: 'Herramientas de ladrón', quantity: 1, weight: 1 },
        { name: 'Palanca', quantity: 1, weight: 5 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Linterna sorda', quantity: 1, weight: 3 },
        { name: 'Aceite (frasco)', quantity: 5, weight: 5 },
        { name: 'Caltrops (bolsa)', quantity: 1, weight: 2 },
      ],
    },
  ],

  // HECHICERO
  sorcerer: [
    {
      name: 'Kit del Hechicero Carismático',
      description: 'Equipo para un hechicero que confía en su magia innata',
      totalCost: 70,
      totalWeight: 25,
      items: [
        { name: 'Bastón', quantity: 1, weight: 4 },
        { name: 'Daga', quantity: 1, weight: 1 },
        { name: 'Ballesta ligera', quantity: 1, weight: 4 },
        { name: 'Virotes', quantity: 20, weight: 2 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Libro de conjuros (vacío)', quantity: 1, weight: 3 },
        { name: 'Tinta y pluma', quantity: 1, weight: 0 },
        { name: 'Bolsa de componentes', quantity: 1, weight: 2 },
        { name: 'Raciones (1 día)', quantity: 3, weight: 3 },
        { name: 'Odre', quantity: 1, weight: 4 },
      ],
    },
    {
      name: 'Kit del Mago Callejero',
      description: 'Equipo ligero para un hechicero autodidacta',
      totalCost: 60,
      totalWeight: 20,
      items: [
        { name: 'Vara', quantity: 1, weight: 4 },
        { name: 'Honda', quantity: 1, weight: 0 },
        { name: 'Piedras de honda', quantity: 20, weight: 10 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Ropa de viajero', quantity: 1, weight: 0 },
        { name: 'Bolsa de componentes', quantity: 1, weight: 2 },
        { name: 'Antorcha', quantity: 3, weight: 3 },
        { name: 'Aceite (frasco)', quantity: 2, weight: 2 },
      ],
    },
  ],

  // MAGO
  wizard: [
    {
      name: 'Kit del Erudito Arcano',
      description: 'Equipo para un mago estudioso de las artes arcanas',
      totalCost: 95,
      totalWeight: 30,
      items: [
        { name: 'Bastón', quantity: 1, weight: 4 },
        { name: 'Daga', quantity: 1, weight: 1 },
        { name: 'Ballesta ligera', quantity: 1, weight: 4 },
        { name: 'Virotes', quantity: 20, weight: 2 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Libro de conjuros', quantity: 1, weight: 3 },
        { name: 'Estuche de pergaminos', quantity: 1, weight: 0.5 },
        { name: 'Pergamino en blanco (10 hojas)', quantity: 1, weight: 0 },
        { name: 'Tinta y pluma', quantity: 2, weight: 0 },
        { name: 'Bolsa de componentes', quantity: 1, weight: 2 },
        { name: 'Laboratorio portátil', quantity: 1, weight: 10 },
      ],
    },
    {
      name: 'Kit del Aventurero Arcano',
      description: 'Equipo para un mago explorador',
      totalCost: 80,
      totalWeight: 25,
      items: [
        { name: 'Vara', quantity: 1, weight: 4 },
        { name: 'Daga', quantity: 2, weight: 2 },
        { name: 'Honda', quantity: 1, weight: 0 },
        { name: 'Piedras de honda', quantity: 20, weight: 10 },
        { name: 'Mochila', quantity: 1, weight: 2 },
        { name: 'Libro de conjuros', quantity: 1, weight: 3 },
        { name: 'Tinta y pluma', quantity: 1, weight: 0 },
        { name: 'Bolsa de componentes', quantity: 1, weight: 2 },
        { name: 'Lámpara', quantity: 1, weight: 1 },
        { name: 'Aceite (frasco)', quantity: 4, weight: 4 },
      ],
    },
  ],
};

// Función para generar un slug único a partir del nombre
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .trim();
}

async function migrateStartingEquipment() {
  console.log('🚀 Starting migration of starting equipment kits...\n');

  let totalKits = 0;
  let successfulKits = 0;
  let failedKits = 0;

  for (const [classSlug, kits] of Object.entries(STARTING_EQUIPMENT)) {
    console.log(`\n📦 Processing class: ${classSlug}`);

    for (const kit of kits) {
      const kitData = {
        class_slug: classSlug,
        kit_name: kit.name,
        kit_slug: generateSlug(kit.name),
        description: kit.description,
        items: JSON.stringify(kit.items), // Convertir a JSON
        total_cost_gp: kit.totalCost,
        total_weight_lb: kit.totalWeight,
      };

      try {
        const { data, error } = await supabase
          .from('starting_equipment_kits')
          .upsert(kitData, {
            onConflict: 'class_slug,kit_slug',
          })
          .select();

        if (error) {
          console.error(`  ❌ Error with "${kit.name}":`, error.message);
          failedKits++;
        } else {
          console.log(`  ✅ Successfully migrated: ${kit.name}`);
          successfulKits++;
        }
        totalKits++;
      } catch (err) {
        console.error(`  ❌ Unexpected error with "${kit.name}":`, err);
        failedKits++;
        totalKits++;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 MIGRATION SUMMARY:');
  console.log('='.repeat(60));
  console.log(`Total kits processed: ${totalKits}`);
  console.log(`✅ Successful: ${successfulKits}`);
  console.log(`❌ Failed: ${failedKits}`);
  console.log(`Success rate: ${((successfulKits / totalKits) * 100).toFixed(2)}%`);

  if (failedKits === 0) {
    console.log('\n🎉 All starting equipment kits migrated successfully!');
  } else {
    console.log('\n⚠️  Some kits failed to migrate. Please check the errors above.');
  }
}

// Ejecutar la migración
migrateStartingEquipment()
  .then(() => {
    console.log('\n✅ Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration script failed:', error);
    process.exit(1);
  });