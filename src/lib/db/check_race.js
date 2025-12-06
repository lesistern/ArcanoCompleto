const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRace() {
    const { data, error } = await supabase
        .from('races')
        .select('*')
        .eq('slug', 'elfo');

    if (error) {
        console.error('Error fetching race:', error);
    } else {
        console.log('Race found:', data);
        if (data.length === 0) {
            console.log("Race 'elfo' NOT found in 'races' table.");
        } else {
            console.log("Race 'elfo' found:", data[0].name);
        }
    }

    // Also check total races
    const { count, error: countError } = await supabase
        .from('races')
        .select('*', { count: 'exact', head: true });

    if (!countError) {
        console.log("Total races in DB:", count);
    }
}

checkRace();
