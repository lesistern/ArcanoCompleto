import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

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

// Importar el archivo de plantillas
async function loadTemplates() {
  try {
    // Leer el archivo TypeScript y extraer las plantillas
    const filePath = join(__dirname, '..', 'src', 'lib', 'data', 'character-templates.ts');
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Extraer todas las plantillas usando regex
    // Nota: En un caso real, podrías importar el módulo directamente,
    // pero como es un archivo TypeScript, necesitaríamos transpilación

    // Para simplificar, voy a incluir las plantillas directamente aquí
    // Estas están extraídas del archivo character-templates.ts

    const allTemplates = [
      // BÁRBARO
      {
        id: 'barbarian-tribal-warrior',
        name: 'Guerrero Tribal',
        description: 'Un feroz combatiente de las estepas que confía en su fuerza bruta y resistencia. Criado en una tribu nómada, aprendió a sobrevivir en las tierras salvajes.',
        concept: 'Guerrero tribal de las estepas del norte',
        class_slug: 'barbarian',
        race_slug: 'human',
        alignment: 'CN',
        suggested_abilities: {
          strength: 16,
          dexterity: 14,
          constitution: 14,
          intelligence: 8,
          wisdom: 12,
          charisma: 10
        },
        recommended_skills: ['Supervivencia', 'Intimidar', 'Escuchar', 'Saltar'],
        suggested_feats: ['Power Attack', 'Weapon Focus (Greataxe)'],
        tags: ['combate', 'fuerza', 'supervivencia', 'tribal']
      },
      {
        id: 'barbarian-berserker',
        name: 'Berserker Vikingo',
        description: 'Guerrero furioso que entra en un frenesí de batalla incontrolable. Procedente de tierras heladas, honra a sus ancestros con cada victoria.',
        concept: 'Guerrero vikingo sediento de gloria en combate',
        class_slug: 'barbarian',
        race_slug: 'dwarf',
        alignment: 'CG',
        suggested_abilities: {
          strength: 16,
          dexterity: 12,
          constitution: 14,
          intelligence: 10,
          wisdom: 10,
          charisma: 8
        },
        recommended_skills: ['Trepar', 'Intimidar', 'Saltar', 'Nadar'],
        suggested_feats: ['Toughness', 'Endurance'],
        tags: ['combate', 'furia', 'resistencia', 'vikingo']
      },

      // BARDO
      {
        id: 'bard-traveler',
        name: 'Trovador Viajero',
        description: 'Artista itinerante que cuenta historias, inspira a aliados y tiene un don para meterse en problemas. Su laúd es tan peligroso como su lengua.',
        concept: 'Músico carismático con talento para la magia',
        class_slug: 'bard',
        race_slug: 'halfling',
        alignment: 'CG',
        suggested_abilities: {
          strength: 8,
          dexterity: 14,
          constitution: 12,
          intelligence: 14,
          wisdom: 10,
          charisma: 16
        },
        recommended_skills: ['Diplomacia', 'Interpretar (música)', 'Reunir información', 'Disfrazarse'],
        suggested_feats: ['Skill Focus (Perform)', 'Spell Focus (Enchantment)'],
        tags: ['social', 'magia', 'música', 'carisma']
      },
      {
        id: 'bard-spy',
        name: 'Espía de Corte',
        description: 'Bardo que se infiltra en las cortes nobles para obtener secretos. Usa su carisma y habilidades para manipular la política desde las sombras.',
        concept: 'Agente encubierto en ropas de noble',
        class_slug: 'bard',
        race_slug: 'half-elf',
        alignment: 'N',
        suggested_abilities: {
          strength: 10,
          dexterity: 14,
          constitution: 12,
          intelligence: 14,
          wisdom: 10,
          charisma: 16
        },
        recommended_skills: ['Engañar', 'Disfrazarse', 'Reunir información', 'Conocimiento (nobleza)'],
        suggested_feats: ['Persuasive', 'Deceitful'],
        tags: ['social', 'espionaje', 'intriga', 'manipulación']
      },

      // CLÉRIGO
      {
        id: 'cleric-warrior',
        name: 'Sacerdote Guerrero',
        description: 'Clérigo que equilibra fe y acero. Bendice a sus aliados y castiga a los malvados con martillo y oración por igual.',
        concept: 'Cruzado sagrado en armadura bendecida',
        class_slug: 'cleric',
        race_slug: 'dwarf',
        alignment: 'LG',
        suggested_abilities: {
          strength: 14,
          dexterity: 10,
          constitution: 14,
          intelligence: 10,
          wisdom: 16,
          charisma: 10
        },
        recommended_skills: ['Diplomacia', 'Sanar', 'Conocimiento (religión)', 'Concentración'],
        suggested_feats: ['Combat Casting', 'Weapon Focus (Warhammer)'],
        tags: ['divino', 'combate', 'sanación', 'tanque']
      },
      {
        id: 'cleric-healer',
        name: 'Sanador Compasivo',
        description: 'Devoto sanador que ha dedicado su vida a aliviar el sufrimiento. Evita el combate pero protege ferozmente a los heridos.',
        concept: 'Pacifista que cura cuerpo y alma',
        class_slug: 'cleric',
        race_slug: 'human',
        alignment: 'NG',
        suggested_abilities: {
          strength: 10,
          dexterity: 10,
          constitution: 14,
          intelligence: 12,
          wisdom: 16,
          charisma: 14
        },
        recommended_skills: ['Sanar', 'Concentración', 'Diplomacia', 'Conocimiento (religión)'],
        suggested_feats: ['Augment Healing', 'Empower Spell'],
        tags: ['sanación', 'divino', 'compasivo', 'apoyo']
      },

      // DRUIDA
      {
        id: 'druid-forest-guardian',
        name: 'Guardián del Bosque',
        description: 'Druida protector de un bosque sagrado que lucha contra aquellos que amenazan el equilibrio natural. Acompañado por un lobo leal.',
        concept: 'Defensor de la naturaleza con vínculo animal profundo',
        class_slug: 'druid',
        race_slug: 'human',
        alignment: 'N',
        suggested_abilities: {
          strength: 12,
          dexterity: 12,
          constitution: 14,
          intelligence: 10,
          wisdom: 16,
          charisma: 10
        },
        recommended_skills: ['Trato con animales', 'Supervivencia', 'Conocimiento (naturaleza)', 'Avistar'],
        suggested_feats: ['Natural Spell', 'Track'],
        tags: ['naturaleza', 'bestias', 'forma salvaje', 'protector']
      },
      {
        id: 'druid-storm-caller',
        name: 'Invocador de Tormentas',
        description: 'Druida que canaliza la furia de los elementos. Invoca rayos y tempestades para castigar a quienes profanan la tierra.',
        concept: 'Chamán elemental que controla el clima',
        class_slug: 'druid',
        race_slug: 'half-orc',
        alignment: 'N',
        suggested_abilities: {
          strength: 14,
          dexterity: 10,
          constitution: 14,
          intelligence: 8,
          wisdom: 16,
          charisma: 10
        },
        recommended_skills: ['Concentración', 'Supervivencia', 'Conjuros', 'Conocimiento (naturaleza)'],
        suggested_feats: ['Spell Focus (Evocation)', 'Combat Casting'],
        tags: ['elementos', 'tormenta', 'magia', 'chamán']
      },

      // GUERRERO
      {
        id: 'fighter-knight',
        name: 'Caballero Noble',
        description: 'Guerrero honorable entrenado en las artes marciales y el código caballeresco. Defiende a los débiles y lucha por la justicia.',
        concept: 'Paladín secular con armadura reluciente',
        class_slug: 'fighter',
        race_slug: 'human',
        alignment: 'LG',
        suggested_abilities: {
          strength: 16,
          dexterity: 12,
          constitution: 14,
          intelligence: 10,
          wisdom: 10,
          charisma: 12
        },
        recommended_skills: ['Montar', 'Intimidar', 'Conocimiento (nobleza)'],
        suggested_feats: ['Mounted Combat', 'Weapon Focus (Longsword)', 'Weapon Specialization (Longsword)'],
        tags: ['combate', 'honor', 'caballería', 'noble']
      },
      {
        id: 'fighter-archer',
        name: 'Arquero Élite',
        description: 'Maestro del arco que nunca falla su objetivo. Entrenado en arquería de precisión, elimina amenazas desde la distancia.',
        concept: 'Tirador experto con puntería letal',
        class_slug: 'fighter',
        race_slug: 'elf',
        alignment: 'NG',
        suggested_abilities: {
          strength: 14,
          dexterity: 16,
          constitution: 12,
          intelligence: 10,
          wisdom: 12,
          charisma: 8
        },
        recommended_skills: ['Avistar', 'Escuchar', 'Trepar'],
        suggested_feats: ['Point Blank Shot', 'Precise Shot', 'Weapon Focus (Longbow)'],
        tags: ['combate', 'distancia', 'precisión', 'arquería']
      },

      // MONJE
      {
        id: 'monk-zen-master',
        name: 'Maestro Zen',
        description: 'Monje que ha alcanzado la iluminación a través de la meditación y disciplina. Su cuerpo es su templo y su mente su arma más poderosa.',
        concept: 'Artista marcial iluminado en busca de perfección',
        class_slug: 'monk',
        race_slug: 'human',
        alignment: 'LN',
        suggested_abilities: {
          strength: 14,
          dexterity: 14,
          constitution: 12,
          intelligence: 10,
          wisdom: 16,
          charisma: 8
        },
        recommended_skills: ['Concentración', 'Equilibrio', 'Saltar', 'Piruetas'],
        suggested_feats: ['Improved Initiative', 'Stunning Fist', 'Dodge'],
        tags: ['combate desarmado', 'disciplina', 'meditación', 'agilidad']
      },
      {
        id: 'monk-drunken-master',
        name: 'Maestro Ebrio',
        description: 'Monje que oculta técnicas letales tras movimientos aparentemente torpes. Su estilo impredecible confunde a todos los oponentes.',
        concept: 'Luchador errático con técnica oculta',
        class_slug: 'monk',
        race_slug: 'halfling',
        alignment: 'CN',
        suggested_abilities: {
          strength: 10,
          dexterity: 16,
          constitution: 14,
          intelligence: 8,
          wisdom: 16,
          charisma: 10
        },
        recommended_skills: ['Engañar', 'Interpretar (comedia)', 'Piruetas', 'Equilibrio'],
        suggested_feats: ['Dodge', 'Mobility', 'Combat Reflexes'],
        tags: ['combate desarmado', 'impredecible', 'engaño', 'agilidad']
      },

      // PALADÍN
      {
        id: 'paladin-crusader',
        name: 'Cruzado Sagrado',
        description: 'Campeón de la luz que ha jurado destruir el mal donde lo encuentre. Su fe es su escudo y su espada es la justicia divina.',
        concept: 'Guerrero santo en cruzada contra el mal',
        class_slug: 'paladin',
        race_slug: 'human',
        alignment: 'LG',
        suggested_abilities: {
          strength: 16,
          dexterity: 10,
          constitution: 14,
          intelligence: 10,
          wisdom: 12,
          charisma: 14
        },
        recommended_skills: ['Diplomacia', 'Sanar', 'Conocimiento (religión)', 'Montar'],
        suggested_feats: ['Power Attack', 'Cleave', 'Extra Smiting'],
        tags: ['combate', 'divino', 'liderazgo', 'justicia']
      },
      {
        id: 'paladin-defender',
        name: 'Defensor Inquebrantable',
        description: 'Paladín que se especializa en proteger a los inocentes. Su escudo es un muro impenetrable y su determinación inquebrantable.',
        concept: 'Guardián protector con voluntad de hierro',
        class_slug: 'paladin',
        race_slug: 'dwarf',
        alignment: 'LG',
        suggested_abilities: {
          strength: 14,
          dexterity: 10,
          constitution: 16,
          intelligence: 8,
          wisdom: 12,
          charisma: 14
        },
        recommended_skills: ['Diplomacia', 'Sanar', 'Avistar', 'Intimidar'],
        suggested_feats: ['Toughness', 'Shield Focus', 'Stand Still'],
        tags: ['tanque', 'protector', 'divino', 'resistencia']
      },

      // EXPLORADOR
      {
        id: 'ranger-beast-master',
        name: 'Maestro de Bestias',
        description: 'Explorador con un vínculo profundo con los animales. Su compañero animal es más que una mascota, es su igual en la batalla.',
        concept: 'Cazador con compañero animal leal',
        class_slug: 'ranger',
        race_slug: 'elf',
        alignment: 'NG',
        suggested_abilities: {
          strength: 14,
          dexterity: 16,
          constitution: 12,
          intelligence: 10,
          wisdom: 14,
          charisma: 8
        },
        recommended_skills: ['Trato con animales', 'Supervivencia', 'Avistar', 'Moverse sigilosamente'],
        suggested_feats: ['Track', 'Point Blank Shot', 'Animal Affinity'],
        tags: ['naturaleza', 'bestias', 'arquería', 'rastreo']
      },
      {
        id: 'ranger-urban-tracker',
        name: 'Rastreador Urbano',
        description: 'Explorador adaptado a la jungla de piedra. Caza criminales y monstruos en callejones oscuros con la misma habilidad que en el bosque.',
        concept: 'Cazarrecompensas especializado en ciudades',
        class_slug: 'ranger',
        race_slug: 'half-elf',
        alignment: 'LN',
        suggested_abilities: {
          strength: 12,
          dexterity: 16,
          constitution: 12,
          intelligence: 14,
          wisdom: 14,
          charisma: 10
        },
        recommended_skills: ['Reunir información', 'Buscar', 'Moverse sigilosamente', 'Conocimiento (local)'],
        suggested_feats: ['Track', 'Investigator', 'Stealthy'],
        tags: ['urbano', 'investigación', 'sigilo', 'rastreo']
      },

      // PÍCARO
      {
        id: 'rogue-thief',
        name: 'Ladrón de Tejados',
        description: 'Maestro del sigilo que se desliza por los tejados como una sombra. Ninguna cerradura puede detenerlo, ningún tesoro está a salvo.',
        concept: 'Ladrón acrobático especialista en infiltración',
        class_slug: 'rogue',
        race_slug: 'halfling',
        alignment: 'CN',
        suggested_abilities: {
          strength: 8,
          dexterity: 18,
          constitution: 12,
          intelligence: 14,
          wisdom: 10,
          charisma: 12
        },
        recommended_skills: ['Abrir cerraduras', 'Inutilizar mecanismo', 'Moverse sigilosamente', 'Piruetas'],
        suggested_feats: ['Weapon Finesse', 'Nimble Fingers', 'Stealthy'],
        tags: ['sigilo', 'robo', 'agilidad', 'infiltración']
      },
      {
        id: 'rogue-assassin',
        name: 'Asesino de Elite',
        description: 'Pícaro entrenado en el arte de la muerte silenciosa. Un profesional que cumple contratos sin dejar rastro.',
        concept: 'Eliminador letal que ataca desde las sombras',
        class_slug: 'rogue',
        race_slug: 'human',
        alignment: 'LE',
        suggested_abilities: {
          strength: 12,
          dexterity: 16,
          constitution: 12,
          intelligence: 14,
          wisdom: 10,
          charisma: 10
        },
        recommended_skills: ['Disfrazarse', 'Moverse sigilosamente', 'Esconderse', 'Uso de venenos'],
        suggested_feats: ['Improved Initiative', 'Weapon Finesse', 'Quick Draw'],
        tags: ['sigilo', 'asesinato', 'veneno', 'infiltración']
      },

      // HECHICERO
      {
        id: 'sorcerer-dragon-blood',
        name: 'Sangre de Dragón',
        description: 'Hechicero con sangre dracónica en sus venas. Su poder arcano surge naturalmente y arde con la furia de sus ancestros.',
        concept: 'Lanzador con herencia dracónica elemental',
        class_slug: 'sorcerer',
        race_slug: 'human',
        alignment: 'CN',
        suggested_abilities: {
          strength: 8,
          dexterity: 14,
          constitution: 14,
          intelligence: 12,
          wisdom: 10,
          charisma: 18
        },
        recommended_skills: ['Concentración', 'Conjuros', 'Conocimiento (arcano)', 'Engañar'],
        suggested_feats: ['Spell Focus (Evocation)', 'Empower Spell', 'Combat Casting'],
        tags: ['magia', 'dragón', 'fuego', 'innato']
      },
      {
        id: 'sorcerer-enchanter',
        name: 'Encantador Natural',
        description: 'Hechicero con un don natural para la manipulación mental. Su carisma sobrenatural dobla voluntades con facilidad.',
        concept: 'Manipulador carismático con magia de encantamiento',
        class_slug: 'sorcerer',
        race_slug: 'gnome',
        alignment: 'CG',
        suggested_abilities: {
          strength: 6,
          dexterity: 14,
          constitution: 14,
          intelligence: 12,
          wisdom: 10,
          charisma: 18
        },
        recommended_skills: ['Diplomacia', 'Engañar', 'Conjuros', 'Conocimiento (arcano)'],
        suggested_feats: ['Spell Focus (Enchantment)', 'Greater Spell Focus (Enchantment)', 'Silent Spell'],
        tags: ['magia', 'encantamiento', 'manipulación', 'carisma']
      },

      // MAGO
      {
        id: 'wizard-battle-mage',
        name: 'Mago de Batalla',
        description: 'Mago especializado en magia de combate. Estudia conjuros destructivos y tácticas de guerra mágica con igual dedicación.',
        concept: 'Erudito arcano especializado en destrucción',
        class_slug: 'wizard',
        race_slug: 'human',
        alignment: 'LN',
        suggested_abilities: {
          strength: 8,
          dexterity: 14,
          constitution: 14,
          intelligence: 18,
          wisdom: 12,
          charisma: 8
        },
        recommended_skills: ['Concentración', 'Conjuros', 'Conocimiento (arcano)', 'Conocimiento (ingeniería)'],
        suggested_feats: ['Spell Focus (Evocation)', 'Improved Initiative', 'Combat Casting'],
        tags: ['magia', 'combate', 'destrucción', 'estudio']
      },
      {
        id: 'wizard-scholar',
        name: 'Sabio Erudito',
        description: 'Mago dedicado al conocimiento puro. Su biblioteca es su tesoro más preciado y su mente es una enciclopedia viviente.',
        concept: 'Académico obsesionado con el saber arcano',
        class_slug: 'wizard',
        race_slug: 'elf',
        alignment: 'N',
        suggested_abilities: {
          strength: 8,
          dexterity: 14,
          constitution: 12,
          intelligence: 18,
          wisdom: 14,
          charisma: 8
        },
        recommended_skills: ['Conocimiento (arcano)', 'Conocimiento (historia)', 'Conjuros', 'Descifrar escritura'],
        suggested_feats: ['Scribe Scroll', 'Skill Focus (Knowledge)', 'Spell Mastery'],
        tags: ['magia', 'conocimiento', 'investigación', 'erudición']
      }
    ];

    return allTemplates;
  } catch (error) {
    console.error('Error loading templates:', error);
    throw error;
  }
}

async function migrateCharacterTemplates() {
  console.log('🚀 Starting migration of character templates...\n');

  try {
    const templates = await loadTemplates();
    console.log(`📚 Loaded ${templates.length} templates to migrate\n`);

    let successCount = 0;
    let failCount = 0;

    for (const template of templates) {
      const templateData = {
        name: template.name,
        slug: generateSlug(template.name),
        concept: template.concept,
        description: template.description,
        class_slug: template.class_slug,
        race_slug: template.race_slug,
        alignment: template.alignment,
        ability_scores: JSON.stringify(template.suggested_abilities),
        recommended_skills: template.recommended_skills,
        recommended_feats: template.suggested_feats,
        tags: template.tags,
      };

      try {
        const { data, error } = await supabase
          .from('character_templates')
          .upsert(templateData, {
            onConflict: 'slug',
          })
          .select();

        if (error) {
          console.error(`❌ Error with "${template.name}":`, error.message);
          failCount++;
        } else {
          console.log(`✅ Successfully migrated: ${template.name} (${template.class_slug})`);
          successCount++;
        }
      } catch (err) {
        console.error(`❌ Unexpected error with "${template.name}":`, err);
        failCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY:');
    console.log('='.repeat(60));
    console.log(`Total templates processed: ${templates.length}`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`Success rate: ${((successCount / templates.length) * 100).toFixed(2)}%`);

    if (failCount === 0) {
      console.log('\n🎉 All character templates migrated successfully!');
    } else {
      console.log('\n⚠️  Some templates failed to migrate. Please check the errors above.');
    }
  } catch (error) {
    console.error('❌ Fatal error during migration:', error);
    process.exit(1);
  }
}

// Ejecutar la migración
migrateCharacterTemplates()
  .then(() => {
    console.log('\n✅ Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration script failed:', error);
    process.exit(1);
  });