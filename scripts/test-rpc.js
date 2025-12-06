require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRpc() {
    console.log('Testing RPC update_class_srd_data...');

    const { data, error } = await supabase.rpc('update_class_srd_data', {
        p_slug: 'barbaro',
        p_description: 'Test Description',
        p_hit_die: 'd12',
        p_skill_points: 4
    });

    if (error) {
        console.error('RPC Error:', error.message);
    } else {
        console.log('RPC Success!');
    }
}

testRpc();
