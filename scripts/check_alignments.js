const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchAlignments() {
    const { data, error } = await supabase
        .from('alignments')
        .select('*');

    if (error) {
        console.error('Error fetching alignments:', error);
        return;
    }

    console.log('Alignments:', JSON.stringify(data, null, 2));
}

fetchAlignments();
