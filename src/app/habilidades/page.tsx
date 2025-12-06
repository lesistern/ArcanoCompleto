import { createClient } from '@/lib/supabase/server';
import { DnDSkill } from '@/lib/types/skill';
import SkillsClient from './SkillsClient';

export const revalidate = 86400; // Revalidate every 24 hours

export default async function SkillsPage() {
  const supabase = await createClient();

  // Fetch skills from Supabase (usando vista con nombres camelCase)
  const { data: skillsData } = await supabase
    .from('v_skills')
    .select('*')
    .order('name');

  const skills = (skillsData || []) as DnDSkill[];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <SkillsClient skills={skills} />
    </div>
  );
}
