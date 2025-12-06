import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://akcuvlanpqpoizconuhm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY3V2bGFucHFwb2l6Y29udWhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzExNzMwMCwiZXhwIjoyMDc4NjkzMzAwfQ.pIfA0AwG1J9VSp4jp50BaAqhgMR1V-A_QNmS5xs8AXA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDescriptions() {
  const { data, error } = await supabase
    .from('classes')
    .select('slug, titulo, description_es')
    .eq('class_type', 'base')
    .order('titulo');

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log('\n📋 VERIFICACIÓN DE DESCRIPCIONES LARGAS (description_es):\n');

  let withDesc = 0;

  data.forEach(c => {
    const len = c.description_es ? c.description_es.length : 0;
    const hasHeaders = c.description_es && c.description_es.includes('##');
    const hasTables = c.description_es && c.description_es.includes('|');
    const status = len > 500 ? '✅' : '⚠️';

    if (len > 500) withDesc++;

    console.log(`${status} ${c.titulo} (${c.slug})`);
    console.log(`   - Longitud: ${len} caracteres`);
    console.log(`   - Tiene headers (##): ${hasHeaders ? 'Sí' : 'No'}`);
    console.log(`   - Tiene tablas (|): ${hasTables ? 'Sí' : 'No'}`);

    if (len > 0) {
      const preview = c.description_es.substring(0, 100).replace(/\n/g, ' ');
      console.log(`   - Preview: "${preview}..."`);
    }
    console.log('');
  });

  console.log('\n📊 RESUMEN:');
  console.log(`- Clases con descripción completa (>500 chars): ${withDesc}/11`);
  console.log(`- Clases sin descripción: ${11 - withDesc}/11`);

  if (withDesc === 11) {
    console.log('\n✅ ¡Todas las clases tienen descripciones largas!');
  } else {
    console.log('\n⚠️ Algunas clases necesitan descripciones.');
  }
}

checkDescriptions();
