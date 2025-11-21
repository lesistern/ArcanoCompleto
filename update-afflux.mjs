import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const newAffluxDescription = `El insaciable Afflux busca el conocimiento de la sangre, el cuerpo y la mente. Afflux nunca vacila al sacrificar seres vivos para comprender qué los hizo estar alguna vez con vida. Es el señor de la interrogación, la tortura y la ejecución, así como del conocimiento que se obtiene mediante ellas. Se manifiesta como un hombre calvo, empapado de sangre, de piel pálida y con ojos sobrenaturalmente enrojecidos. Viste un gran abrigo de sangre que gotea y fluye constantemente, pero nunca se agota. Su plano natal es Carceri, y su símbolo es una gota escarlata.

Nigromantes, magos malignos, inquisidores y torturadores veneran a Afflux. Todos los seguidores de Afflux consideran enemigos a los miembros de religiones alineadas con el bien, especialmente a aquellas que afirman ofrecer conocimiento. Entre las deidades malignas, Afflux no posee enemigos particulares, y sus seguidores a veces forman alianzas por conveniencia con otros cultos malignos cuando sus objetivos coinciden.

A veces, magos malignos llegan a venerar, si no a adorar, a Afflux. Ciertamente su nombre es conocido entre los nigromantes, cuyas macabras investigaciones son tan similares a los métodos prescritos por Afflux. Los torturadores y otros que disfrutan causando dolor físico a otros rinden frecuentes homenajes al Insatisfecho Indagador.

Las plegarias ofrecidas a Afflux se asemejan a los sonidos de las víctimas sometidas al potro por los torturadores consagrados del dios. Cada grito es un mantra, y una noche de sufrimiento constituye una misa solemne.

Afflux tiene pocos templos. Cualquier laboratorio de nigromancia en el que se empleen los métodos del Derramador de Sangre puede convertirse en un santuario de Afflux si el lugar es consagrado en su nombre. Ritos: cuando una víctima sucumbe demasiado rápido al dolor, es costumbre que el clérigo oficiante se hiera a sí mismo en nombre de Afflux (si el clérigo está vivo), ofreciendo dolor adicional como compensación.

Afflux suele enviar a un gemidor espectral como heraldo. Sus aliados planares son rávadas (ravids), brujas nocturnas (night hags) y alados sombríos (nightwings).`;

(async () => {
  console.log('🔄 Actualizando descripción de Afflux en Supabase...');

  const { error } = await supabase
    .from('deities')
    .update({ description_es: newAffluxDescription })
    .eq('slug', 'afflux');

  if (error) {
    console.error('❌ Error actualizando Afflux:', error);
    process.exit(1);
  }

  console.log('✅ Descripción de Afflux actualizada exitosamente');

  // Verificar el cambio
  const { data, error: fetchError } = await supabase
    .from('deities')
    .select('slug, name_es, description_es')
    .eq('slug', 'afflux')
    .single();

  if (fetchError) {
    console.error('❌ Error verificando cambio:', fetchError);
    process.exit(1);
  }

  const descPreview = data.description_es.substring(0, 100);
  console.log('\n📋 Registro de Afflux actualizado:');
  console.log(`   Slug: ${data.slug}`);
  console.log(`   Nombre: ${data.name_es}`);
  console.log(`   Descripción (primeros 100 caracteres): ${descPreview}...`);
  console.log(`   Total de caracteres: ${data.description_es.length}`);
  console.log('\n✅ La descripción será visible en /es/reglas/contenido/dioses/afflux');
})();
