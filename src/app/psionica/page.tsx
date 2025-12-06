import { createClient } from '@/lib/supabase/server';
import PsionicsClient from './PsionicsClient';

export default async function PsionicaPage() {
    const supabase = await createClient();
    const { data: powersData } = await supabase
        .from('srd_spells')
        .select('*')
        .eq('is_psionic', true)
        .order('name');

    const powers = powersData || [];

    return <PsionicsClient powers={powers} />;
}
