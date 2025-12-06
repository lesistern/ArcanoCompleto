import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://akcuvlanpqpoizconuhm.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY3V2bGFucHFwb2l6Y29udWhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzExNzMwMCwiZXhwIjoyMDc4NjkzMzAwfQ.pIfA0AwG1J9VSp4jp50BaAqhgMR1V-A_QNmS5xs8AXA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeMigration() {
  try {
    // Read SQL file
    const sqlContent = fs.readFileSync('./supabase/migrate-deities-initial.sql', 'utf-8');
    
    // Execute via RPC
    console.log('⏳ Ejecutando migración de deidades...');
    const { data, error } = await supabase.rpc('execute_sql', { 
      sql: sqlContent 
    });
    
    if (error) {
      console.error('❌ Error ejecutando SQL:', error);
      return;
    }
    
    console.log('✅ Migración completada exitosamente');
    
    // Verify count
    const { count, countError } = await supabase
      .from('deities')
      .select('*', { count: 'exact', head: true });
    
    if (!countError) {
      console.log(`📊 Total de deidades en BD: ${count}`);
    }
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

executeMigration();
