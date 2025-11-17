import ClassCard from '@/components/ClassCard';
import { DnDClass } from '@/lib/types/class';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import classesData from '@/lib/data/3.5/classes.json';
import { getClassCategoryIcon, getClassCategoryColor, extractTextColor, ClassCategory } from '@/lib/utils/icons';

// ISR: Revalidar cada hora (contenido casi estático)
export const revalidate = 3600;

export default async function ClassesPage() {
  const classesFromJSON = classesData as any[];

  if (!classesFromJSON || classesFromJSON.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Clases</h1>
        <p className="text-red-600">Error al cargar las clases</p>
      </div>
    );
  }

  // Map JSON classes to expected format
  const classes: DnDClass[] = classesFromJSON.map(c => {
    // Deducir BAB progression desde levelProgression
    const getBABProgression = (): 'good' | 'medium' | 'poor' => {
      if (!c.levelProgression || c.levelProgression.length === 0) return 'medium';
      const level20 = c.levelProgression.find((l: any) => l.level === 20);
      if (!level20) return 'medium';
      const bab = parseInt(level20.baseAttackBonus.replace('+', '').split('/')[0]);
      if (bab >= 20) return 'good';
      if (bab >= 15) return 'medium';
      return 'poor';
    };

    const babProgression = getBABProgression();

    // Determinar habilidades principales basadas en primaryAbility del JSON
    const primaryAbility = c.primaryAbility ||
      (babProgression === 'good'
        ? ['Fuerza', 'Destreza']
        : babProgression === 'poor'
          ? ['Inteligencia', 'Sabiduría', 'Carisma']
          : ['Fuerza', 'Destreza', 'Inteligencia', 'Sabiduría', 'Carisma']);

    // Usar goodSaves directamente del JSON
    const goodSaves = c.goodSaves || [];

    return {
      id: c.slug,
      name: c.name,
      slug: c.slug,
      hitDie: c.hitDie,
      skillPoints: c.skillPointsPerLevel,
      skillPointsPerLevel: c.skillPointsPerLevel,
      primaryAbility,
      goodSaves,
      description: c.description,
      shortDescription: c.shortDescription || c.description,
      classSkills: c.classSkills || [],
      weaponProficiencies: c.weaponProficiencies || {},
      armorProficiencies: c.armorProficiencies || {},
      alignment: c.alignment || [],
      classFeatures: c.classFeatures || [],
      levelProgression: c.levelProgression || [],
      source: c.source || { book: 'Player\'s Handbook', page: 0 },
    };
  });

  // Agrupar clases por categoría
  const classesByCategory: Record<ClassCategory, DnDClass[]> = {
    'Marciales': classes.filter(c =>
      ['Bárbaro', 'Guerrero', 'Monje', 'Paladín', 'Explorador'].includes(c.name)
    ),
    'Lanzadores de conjuros': classes.filter(c =>
      ['Clérigo', 'Druida', 'Hechicero', 'Mago'].includes(c.name)
    ),
    'Versátiles': classes.filter(c =>
      ['Bardo', 'Pícaro'].includes(c.name)
    ),
  };

  // Ordenar categorías
  const categoryOrder: ClassCategory[] = ['Marciales', 'Lanzadores de conjuros', 'Versátiles'];

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

      {/* Clases por Categoría */}
      <div className="space-y-6 mb-16">
        {categoryOrder.map((category) => {
          const categoryClasses = classesByCategory[category];

          // Solo mostrar categoría si tiene clases
          if (categoryClasses.length === 0) return null;

          const Icon = getClassCategoryIcon(category);
          const colorClasses = getClassCategoryColor(category);
          const iconColor = extractTextColor(colorClasses);

          return (
            <Card key={category} className="bg-dungeon-800 border-dungeon-700">
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${iconColor}`}>
                  <Icon className="h-5 w-5" />
                  {category} ({categoryClasses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryClasses.map((classData) => (
                    <ClassCard key={classData.id} classData={classData} />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
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
