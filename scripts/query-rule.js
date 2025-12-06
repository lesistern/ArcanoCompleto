import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    const { data, error } = await supabase
      .from('rules_content')
      .select('slug, title, description, content, display_order, created_at, updated_at')
      .eq('slug', 'alineamiento-descripcion')
      .single();

    if (error) {
      console.error('Query error:', error.message || error);
      process.exit(1);
    }

    if (!data) {
      console.log('No row found for slug = alineamiento-descripcion');
      return;
    }

    // Print a compact summary, and write content length
    const summary = {
      slug: data.slug,
      title: data.title,
      description: data.description,
      display_order: data.display_order,
      created_at: data.created_at,
      updated_at: data.updated_at,
      content_length: data.content ? data.content.length : 0,
    };

    console.log('Row summary:', JSON.stringify(summary, null, 2));
    console.log('\n--- Content (first 1000 chars) ---\n');
    if (data.content) {
      console.log(data.content.slice(0, 1000));
      if (data.content.length > 1000) console.log('\n... (truncated)');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

run();
