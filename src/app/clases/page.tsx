import { createClient } from '@/lib/supabase/server';
import { DnDClass } from '@/lib/types/class';
import { getSourceTag } from '@/lib/utils/icons';
import {
  CATEGORY_OVERRIDES,
  supplementalClassSources,
} from '@/lib/data/classes-page-data';
import {
  mapDatabaseClass,
  createPlaceholderClass,
} from '@/lib/data/classes-management';
import ClassesClient from './ClassesClient';

export const revalidate = 3600;

export default async function ClassesPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const supabase = await createClient();
  const { data: classesData, error } = await supabase.from('classes').select('*');

  if (error || !classesData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Clases</h1>
        <p className="text-red-600">Error al cargar las clases</p>
      </div>
    );
  }

  // Map database classes to DnDClass format
  const dbClasses: DnDClass[] = classesData.map(mapDatabaseClass);
  const existingSlugs = new Set(dbClasses.map((cls) => cls.slug));

  // Create placeholder classes for supplemental sources
  const placeholderClasses = supplementalClassSources
    .map((entry) => createPlaceholderClass(entry, CATEGORY_OVERRIDES, existingSlugs))
    .filter((cls): cls is DnDClass => cls !== null);

  const allClasses = [...dbClasses, ...placeholderClasses];

  // Helper to check if a class is from PHB
  const isPhbClass = (cls: DnDClass) => {
    const sourceCode = getSourceTag(cls.source?.book).code.toUpperCase();
    return sourceCode === 'PHB';
  };

  // Helper to check if a class is a prestige class
  // La base de datos usa 'prestigio' (español), no 'prestige' (inglés)
  const isPrestigeClass = (cls: DnDClass) => {
    return cls.classType === 'prestigio';
  };

  // Separate classes into three categories:
  // 1. PHB Base Classes (11)
  // 2. Supplemental Base Classes (55) - NOT prestige
  // 3. Prestige Classes
  const phbClasses = allClasses.filter(isPhbClass).sort((a, b) => a.name.localeCompare(b.name, 'es'));
  const supplementalBaseClasses = allClasses.filter(cls => !isPhbClass(cls) && !isPrestigeClass(cls)).sort((a, b) => a.name.localeCompare(b.name, 'es'));
  const prestigeClasses = allClasses.filter(isPrestigeClass).sort((a, b) => a.name.localeCompare(b.name, 'es'));

  return (
    <div className="container mx-auto px-4 py-8">
      <ClassesClient
        phbClasses={phbClasses}
        supplementalBaseClasses={supplementalBaseClasses}
        prestigeClasses={prestigeClasses}
      />
    </div>
  );
}
