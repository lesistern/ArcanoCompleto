import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://akcuvlanpqpoizconuhm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY3V2bGFucHFwb2l6Y29udWhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzExNzMwMCwiZXhwIjoyMDc4NjkzMzAwfQ.pIfA0AwG1J9VSp4jp50BaAqhgMR1V-A_QNmS5xs8AXA';

const supabase = createClient(supabaseUrl, supabaseKey);

const CORE_CLASSES = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'wizard'];

async function checkFields() {
  const { data, error } = await supabase
    .from('classes')
    .select('slug, titulo, adventures, characteristics, alignment, religion, background, races, other_classes, role')
    .in('slug', CORE_CLASSES);

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log('\n📋 CAMPOS FLUFF DE LAS 11 CLASES BASE:\n');

  data.forEach(c => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🎭 ${c.titulo} (${c.slug})`);
    console.log(`${'='.repeat(60)}`);

    const fields = [
      { name: 'adventures', value: c.adventures },
      { name: 'characteristics', value: c.characteristics },
      { name: 'alignment', value: c.alignment },
      { name: 'religion', value: c.religion },
      { name: 'background', value: c.background },
      { name: 'races', value: c.races },
      { name: 'other_classes', value: c.other_classes },
      { name: 'role', value: c.role }
    ];

    fields.forEach(f => {
      const len = f.value ? f.value.length : 0;
      const status = len > 0 ? '✅' : '❌';
      const preview = f.value ? f.value.substring(0, 80).replace(/\n/g, ' ') + (f.value.length > 80 ? '...' : '') : 'VACÍO';
      console.log(`  ${status} ${f.name}: ${len} chars`);
      if (len > 0) {
        console.log(`     "${preview}"`);
      }
    });
  });
}

checkFields();
