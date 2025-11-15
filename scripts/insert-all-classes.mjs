#!/usr/bin/env node
/**
 * Inserta las 11 clases base del Player's Handbook en Supabase
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Datos de las 11 clases base (TODO EN ESPAÑOL)
const classes = [
  {
    slug: 'barbarian',
    name: 'Bárbaro',
    hit_die: 'd12',
    skill_points_per_level: 4,
    class_skills: ['Trepar', 'Artesanía', 'Trato con animales', 'Intimidar', 'Saltar', 'Escuchar', 'Montar', 'Supervivencia', 'Nadar'],
    weapon_proficiencies: ['simples', 'marciales'],
    armor_proficiencies: ['ligeras', 'medias', 'escudos'],
    bab_progression: 'good',
    fortitude_save: 'good',
    reflex_save: 'poor',
    will_save: 'poor',
    description: 'De las tierras heladas vienen valientes y temerarios guerreros. El bárbaro tiene una poderosa furia que lo hace más fuerte y resistente en combate.'
  },
  {
    slug: 'bard',
    name: 'Bardo',
    hit_die: 'd6',
    skill_points_per_level: 6,
    class_skills: ['Tasación', 'Equilibrio', 'Engañar', 'Trepar', 'Concentración', 'Artesanía', 'Descifrar escritura', 'Diplomacia', 'Disfrazarse', 'Escapismo', 'Reunir información', 'Esconderse', 'Saltar', 'Conocimiento', 'Escuchar', 'Moverse sigilosamente', 'Actuación', 'Profesión', 'Averiguar intenciones', 'Juego de manos', 'Hablar idioma', 'Conjuros', 'Nadar', 'Pirueta', 'Usar objeto mágico'],
    weapon_proficiencies: ['simples', 'espada larga', 'estoque', 'porra', 'espada corta', 'arco corto', 'látigo'],
    armor_proficiencies: ['ligeras', 'escudos'],
    bab_progression: 'medium',
    fortitude_save: 'poor',
    reflex_save: 'good',
    will_save: 'good',
    description: 'Un artista cuya música hace magia. El bardo es un todoterreno con música de bardo, conjuros y una amplia variedad de habilidades.'
  },
  {
    slug: 'cleric',
    name: 'Clérigo',
    hit_die: 'd8',
    skill_points_per_level: 2,
    class_skills: ['Concentración', 'Artesanía', 'Diplomacia', 'Sanar', 'Conocimiento', 'Profesión', 'Conjuros'],
    weapon_proficiencies: ['simples'],
    armor_proficiencies: ['ligeras', 'medias', 'pesadas', 'escudos'],
    bab_progression: 'medium',
    fortitude_save: 'good',
    reflex_save: 'poor',
    will_save: 'good',
    description: 'Un maestro de la magia divina y un guerrero capaz. Los clérigos pueden curar heridas, resucitar a los muertos e invocar la ira de los dioses.'
  },
  {
    slug: 'druid',
    name: 'Druida',
    hit_die: 'd8',
    skill_points_per_level: 4,
    class_skills: ['Concentración', 'Artesanía', 'Diplomacia', 'Trato con animales', 'Sanar', 'Conocimiento', 'Escuchar', 'Profesión', 'Montar', 'Conjuros', 'Avistar', 'Supervivencia', 'Nadar'],
    weapon_proficiencies: ['garrote', 'daga', 'dardo', 'bastón', 'cimitarra', 'hoz', 'lanza corta', 'honda', 'lanza'],
    armor_proficiencies: ['ligeras', 'medias', 'escudos'],
    bab_progression: 'medium',
    fortitude_save: 'good',
    reflex_save: 'poor',
    will_save: 'good',
    description: 'Un lanzador de conjuros divinos devoto de la naturaleza. Los druidas obtienen conjuros divinos, pueden adoptar forma salvaje y tienen un compañero animal.'
  },
  {
    slug: 'fighter',
    name: 'Guerrero',
    hit_die: 'd10',
    skill_points_per_level: 2,
    class_skills: ['Trepar', 'Artesanía', 'Trato con animales', 'Intimidar', 'Saltar', 'Montar', 'Nadar'],
    weapon_proficiencies: ['simples', 'marciales'],
    armor_proficiencies: ['ligeras', 'medias', 'pesadas', 'escudos'],
    bab_progression: 'good',
    fortitude_save: 'good',
    reflex_save: 'poor',
    will_save: 'poor',
    description: 'Un maestro del combate marcial con entrenamiento y disciplina. Los guerreros destacan con armas y armaduras, ganando dotes adicionales para personalizar su estilo de combate.'
  },
  {
    slug: 'monk',
    name: 'Monje',
    hit_die: 'd8',
    skill_points_per_level: 4,
    class_skills: ['Equilibrio', 'Trepar', 'Concentración', 'Artesanía', 'Diplomacia', 'Escapismo', 'Esconderse', 'Saltar', 'Conocimiento', 'Escuchar', 'Moverse sigilosamente', 'Actuación', 'Profesión', 'Averiguar intenciones', 'Avistar', 'Nadar', 'Pirueta'],
    weapon_proficiencies: ['garrote', 'ballesta', 'daga', 'hacha de mano', 'jabalina', 'kama', 'nunchaku', 'bastón', 'sai', 'shuriken', 'siangham', 'honda'],
    armor_proficiencies: [],
    bab_progression: 'medium',
    fortitude_save: 'good',
    reflex_save: 'good',
    will_save: 'good',
    description: 'Un artista marcial cuyo cuerpo es un arma. Los monjes tienen ataques aturdidores, alta velocidad y habilidades sobrenaturales alimentadas por ki.'
  },
  {
    slug: 'paladin',
    name: 'Paladín',
    hit_die: 'd10',
    skill_points_per_level: 2,
    class_skills: ['Concentración', 'Artesanía', 'Diplomacia', 'Trato con animales', 'Sanar', 'Conocimiento', 'Profesión', 'Montar', 'Averiguar intenciones'],
    weapon_proficiencies: ['simples', 'marciales'],
    armor_proficiencies: ['ligeras', 'medias', 'pesadas', 'escudos'],
    bab_progression: 'good',
    fortitude_save: 'good',
    reflex_save: 'poor',
    will_save: 'poor',
    description: 'Un guerrero sagrado vinculado a un código de conducta. Los paladines castigan el mal, imponen manos para curar y obtienen conjuros divinos y una montura especial.'
  },
  {
    slug: 'ranger',
    name: 'Explorador',
    hit_die: 'd8',
    skill_points_per_level: 6,
    class_skills: ['Trepar', 'Concentración', 'Artesanía', 'Trato con animales', 'Sanar', 'Esconderse', 'Saltar', 'Conocimiento', 'Escuchar', 'Moverse sigilosamente', 'Profesión', 'Montar', 'Buscar', 'Avistar', 'Supervivencia', 'Nadar', 'Usar cuerdas'],
    weapon_proficiencies: ['simples', 'marciales'],
    armor_proficiencies: ['ligeras', 'escudos'],
    bab_progression: 'good',
    fortitude_save: 'good',
    reflex_save: 'good',
    will_save: 'poor',
    description: 'Un cazador y rastreador experto. Los exploradores tienen enemigos predilectos, estilos de combate, un compañero animal y conjuros divinos.'
  },
  {
    slug: 'rogue',
    name: 'Pícaro',
    hit_die: 'd6',
    skill_points_per_level: 8,
    class_skills: ['Tasación', 'Equilibrio', 'Engañar', 'Trepar', 'Artesanía', 'Descifrar escritura', 'Diplomacia', 'Inutilizar mecanismo', 'Disfrazarse', 'Escapismo', 'Falsificar', 'Reunir información', 'Esconderse', 'Intimidar', 'Saltar', 'Conocimiento', 'Escuchar', 'Moverse sigilosamente', 'Abrir cerraduras', 'Actuación', 'Profesión', 'Buscar', 'Averiguar intenciones', 'Juego de manos', 'Avistar', 'Nadar', 'Pirueta', 'Usar objeto mágico', 'Usar cuerdas'],
    weapon_proficiencies: ['ballesta de mano', 'estoque', 'porra', 'arco corto', 'espada corta', 'simples'],
    armor_proficiencies: ['ligeras'],
    bab_progression: 'medium',
    fortitude_save: 'poor',
    reflex_save: 'good',
    will_save: 'poor',
    description: 'Un experto hábil en sigilo y engaño. Los pícaros tienen ataque furtivo, encontrar trampas, evasión y una extensa lista de habilidades.'
  },
  {
    slug: 'sorcerer',
    name: 'Hechicero',
    hit_die: 'd4',
    skill_points_per_level: 2,
    class_skills: ['Engañar', 'Concentración', 'Artesanía', 'Conocimiento', 'Profesión', 'Conjuros'],
    weapon_proficiencies: ['simples'],
    armor_proficiencies: [],
    bab_progression: 'poor',
    fortitude_save: 'poor',
    reflex_save: 'poor',
    will_save: 'good',
    description: 'Un lanzador de conjuros arcanos que lanza conjuros a través de habilidad innata. Los hechiceros conocen menos conjuros que los magos pero pueden lanzarlos más a menudo.'
  },
  {
    slug: 'wizard',
    name: 'Mago',
    hit_die: 'd4',
    skill_points_per_level: 2,
    class_skills: ['Concentración', 'Artesanía', 'Descifrar escritura', 'Conocimiento', 'Profesión', 'Conjuros'],
    weapon_proficiencies: ['garrote', 'daga', 'ballesta pesada', 'ballesta ligera', 'bastón'],
    armor_proficiencies: [],
    bab_progression: 'poor',
    fortitude_save: 'poor',
    reflex_save: 'poor',
    will_save: 'good',
    description: 'Un usuario de magia erudito que estudia el conocimiento arcano. Los magos preparan conjuros de un libro de conjuros y pueden aprender cualquier conjuro de mago que encuentren.'
  }
];

async function main() {
  console.log('='.repeat(80));
  console.log('INSERTANDO 11 CLASES BASE (EN ESPAÑOL)');
  console.log('='.repeat(80));
  console.log();

  let inserted = 0;
  let updated = 0;
  let errors = 0;

  for (const classData of classes) {
    try {
      const { data, error } = await supabase
        .from('classes')
        .upsert(classData, { onConflict: 'slug' })
        .select();

      if (error) {
        console.log(`✗ ${classData.name}: ${error.message}`);
        errors++;
      } else {
        console.log(`✓ ${classData.name} (${classData.hit_die}, ${classData.bab_progression} BAB, ${classData.skill_points_per_level}+Int habilidades)`);
        inserted++;
      }
    } catch (err) {
      console.log(`✗ ${classData.name}: ${err.message}`);
      errors++;
    }
  }

  console.log();
  console.log('='.repeat(80));
  console.log('RESUMEN');
  console.log('='.repeat(80));
  console.log();
  console.log(`✓ Clases insertadas/actualizadas: ${inserted}/11`);
  console.log(`✗ Errores: ${errors}`);
  console.log();

  if (inserted === 11) {
    console.log('¡ÉXITO! Las 11 clases base están ahora en Supabase en ESPAÑOL!');
    console.log();
    console.log('Próximos pasos:');
    console.log('  1. Las páginas /clases ya están creadas');
    console.log('  2. Añadir tablas de progresión (tabla class_progression)');
    console.log('  3. Extraer conjuros, dotes y equipamiento');
  }
  console.log();
}

main().catch(console.error);
