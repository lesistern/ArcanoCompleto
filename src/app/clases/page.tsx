import ClassCard from '@/components/ClassCard';
import { createClient } from '@/lib/supabase/server';
import { DnDClass } from '@/lib/types/class';

// ISR: Revalidar cada hora (contenido casi estático)
export const revalidate = 3600;

export default async function ClassesPage() {
  const supabase = await createClient();

  const { data: classesFromDB, error } = await supabase
    .from('classes')
    .select('*')
    .order('name');

  if (error || !classesFromDB) {
    console.error('Error loading classes:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Clases</h1>
        <p className="text-red-600">Error al cargar las clases: {error?.message || 'Unknown error'}</p>
      </div>
    );
  }

  // Map database classes to expected format
  const classes: DnDClass[] = classesFromDB.map(c => {
    // Determinar habilidades principales basadas en BAB y tipo de clase
    const primaryAbility: ('Fuerza' | 'Destreza' | 'Constitución' | 'Inteligencia' | 'Sabiduría' | 'Carisma')[] =
      c.bab_progression === 'good'
        ? ['Fuerza', 'Destreza']
        : c.bab_progression === 'poor'
          ? ['Inteligencia', 'Sabiduría', 'Carisma']
          : ['Fuerza', 'Destreza', 'Inteligencia', 'Sabiduría', 'Carisma']; // Medium BAB puede usar varias

    // Determinar salvaciones buenas
    const goodSaves: ('Fortaleza' | 'Reflejos' | 'Voluntad')[] = [];
    if (c.fortitude_save === 'good') goodSaves.push('Fortaleza');
    if (c.reflex_save === 'good') goodSaves.push('Reflejos');
    if (c.will_save === 'good') goodSaves.push('Voluntad');

    return {
      id: c.slug,
      name: c.name,
      slug: c.slug,
      hitDie: c.hit_die,
      skillPoints: c.skill_points_per_level,
      skillPointsPerLevel: c.skill_points_per_level, // Para compatibilidad con ClassCard
      primaryAbility,
      goodSaves,
      description: c.description,
      shortDescription: c.description, // Usar la misma descripción
      classSkills: c.class_skills || [],
      weaponProficiencies: c.weapon_proficiencies || [],
      armorProficiencies: c.armor_proficiencies || [],
      alignment: [], // No tenemos datos de restricción de alineamiento aún
      classFeatures: [], // TODO: Agregar cuando tengamos datos de progresión
      levelProgression: [], // TODO: Agregar cuando tengamos datos de progresión
      source: { book: 'Player\'s Handbook', page: 0 }, // Fuente por defecto
    };
  });

  // Categorizar clases por nombres en español
  const martialClasses = classes.filter(c =>
    ['Bárbaro', 'Guerrero', 'Monje', 'Paladín', 'Explorador'].includes(c.name)
  );

  const spellcasterClasses = classes.filter(c =>
    ['Clérigo', 'Druida', 'Hechicero', 'Mago'].includes(c.name)
  );

  const hybridClasses = classes.filter(c =>
    ['Bardo', 'Pícaro'].includes(c.name)
  );

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
          Clases
        </h1>
        <p className="text-lg text-dungeon-300">
          Las 11 clases base de D&D 3.5
        </p>
      </div>

      {/* Clases Marciales */}
      <div className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-2">
            Clases Marciales
          </h2>
          <p className="text-sm text-dungeon-400">
            Especialistas en combate cuerpo a cuerpo y tácticas de batalla
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {martialClasses.map((classData) => (
            <ClassCard key={classData.id} classData={classData} />
          ))}
        </div>
      </div>

      {/* Clases Lanzadoras de Conjuros */}
      <div className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-2">
            Lanzadores de Conjuros
          </h2>
          <p className="text-sm text-dungeon-400">
            Maestros de la magia arcana y divina
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spellcasterClasses.map((classData) => (
            <ClassCard key={classData.id} classData={classData} />
          ))}
        </div>
      </div>

      {/* Clases Híbridas */}
      <div className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-2">
            Clases Versátiles
          </h2>
          <p className="text-sm text-dungeon-400">
            Combinan habilidades especiales con versatilidad
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hybridClasses.map((classData) => (
            <ClassCard key={classData.id} classData={classData} />
          ))}
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          Información de Clases
        </h3>
        <div className="space-y-3 text-sm text-dungeon-300">
          <p>
            Cada clase representa una profesión o vocación distinta con capacidades únicas.
            La elección de clase es una de las decisiones más importantes al crear un personaje.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Dado de Golpe (DG):</span> Determina los
            puntos de golpe que gana el personaje en cada nivel.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Puntos de Habilidad:</span> Número de
            puntos de habilidad que gana por nivel (se suma el modificador de Inteligencia).
          </p>
        </div>
      </div>
    </div>
  );
}
