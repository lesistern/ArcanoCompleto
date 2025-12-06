import { createClient } from '@/lib/supabase/server';
import { DnDSkill } from '@/lib/types/skill';
import SkillsClient from './SkillsClient';

export const revalidate = 86400; // Revalidate every 24 hours

export default async function SkillsPage() {
  const supabase = await createClient();

  // Fetch skills from Supabase
  const { data: skillsData } = await supabase
    .from('skills')
    .select('*')
    .order('name');

  const skills = (skillsData || []) as DnDSkill[];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header */}
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
          Habilidades
        </h1>
        <p className="text-lg text-dungeon-300">
          Las {skills.length} habilidades estándar de D&D 3.5
        </p>
      </div>

      <SkillsClient skills={skills} />
    </div>
  );
}
