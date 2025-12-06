const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkClasses() {
    const { data, error } = await supabase
        .from('classes')
        .select('*');

    if (error) {
        console.error('Error fetching classes:', error);
    } else {
        console.log('Classes found:', data ? data.length : 0);
        if (data && data.length > 0) {
            console.log("First class example:", data[0].name);
        }
    }
}

checkClasses();
