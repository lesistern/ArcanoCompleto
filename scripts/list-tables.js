require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
    const { data, error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');

    if (error) {
        // Try RPC if direct access to information_schema is blocked
        console.error('Error listing tables via direct query:', error.message);
        return;
    }

    console.log('Tables in public schema:');
    data.forEach(row => console.log(row.table_name));
}

listTables();
