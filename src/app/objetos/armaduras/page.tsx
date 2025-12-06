import { createClient } from '@/lib/supabase/server';
import ArmadurasClient from './ArmadurasClient';

export const revalidate = 3600; // Revalidate every hour

export default async function ArmorsPage() {
  const supabase = await createClient();

  // Fetch armors from the armor table directly
  const { data: armors, error } = await supabase
    .from('armor')
    .select('*')
    .order('armor_type')
    .order('name');

  if (error) {
    console.error('Error fetching armors:', error);
  }

  return <ArmadurasClient armors={armors || []} />;
}
