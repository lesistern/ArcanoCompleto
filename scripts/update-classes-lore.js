/**
 * Script to update classes with lore data
 * Run with: node update-classes-lore.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Lore data for each class
const classLoreData = {
    'barbaro': {
        tiene_magia: false,
        tipo_magia: 'ninguna',
        estilo_conjuros: 'no_aplica',
        regla_alineamiento: 'Any nonlawful',
        tendencia_alineamiento: 'Tienden a ser caóticos, valoran la libertad personal y tribal',
        tipo_poder_principal: 'marcial',
        descripcion_poder: 'Ira berserker y dureza física proveniente de la vida salvaje',
        rol_party: 'Combatiente de primera línea, tanque con alto daño',
        motivacion_aventura: 'Encontrar su lugar en sociedades civilizadas, derrotar enemigos odiados, buscar gloria en combate',
        origen_social: 'Tribus bárbaras, tierras fronterizas, regiones salvajes',
        tipo_organizacion: 'ninguna',
        enfoque_religioso: 'Reverencia por la naturaleza y espíritus ancestrales más que por dioses organizados',
        deidades_tipicas: 'Kord, Obad-Hai, Gruumsh (orcos)',
        razas_comunes: 'Humanos, semielfos, semiorcos, enanos'
    },
    'bardo': {
        tiene_magia: true,
        tipo_magia: 'arcana',
        estilo_conjuros: 'espontanea',
        regla_alineamiento: 'Any nonlawful',
        tendencia_alineamiento: 'Tienden a ser buenos y algo caóticos, valoran la libertad personal',
        tipo_poder_principal: 'mixto',
        descripcion_poder: 'Magia arcana espontánea derivada de la música y el corazón, combinada con habilidades sociales',
        rol_party: 'Soporte generalista que mejora a aliados, "face" del grupo, utilidad',
        motivacion_aventura: 'Recopilar historias e inspiración, vivir hazañas en primera persona, aprender secretos olvidados',
        origen_social: 'Ciudades, cortes, tabernas; aprendices de bardos mentores',
        tipo_organizacion: 'colegio',
        enfoque_religioso: 'Veneran dioses de la música, viajes y conocimiento',
        deidades_tipicas: 'Fharlanghn, Olidammara, Pelor',
        razas_comunes: 'Humanos, gnomos, elfos, semielfos'
    },
    'clerigo': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        regla_alineamiento: 'Must be within one step of deity',
        tendencia_alineamiento: 'Varía ampliamente según la deidad venerada',
        tipo_poder_principal: 'divino',
        descripcion_poder: 'Magia divina otorgada por su deidad, canalización de energía positiva/negativa',
        rol_party: 'Sanador principal, soporte defensivo, puede ser ofensivo según dominio',
        motivacion_aventura: 'Apoyar la causa de su dios, cumplir misiones de la iglesia, extender la fe',
        origen_social: 'Templos, iglesias organizadas, órdenes religiosas',
        tipo_organizacion: 'iglesia',
        enfoque_religioso: 'Devoto total a una deidad específica, representa sus intereses en el mundo',
        deidades_tipicas: 'Pelor, St. Cuthbert, Heironeous, Wee Jas, Nerull (depende del alineamiento)',
        razas_comunes: 'Humanos, enanos, elfos, medianos'
    },
    'druida': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        regla_alineamiento: 'Must be neutral on at least one axis',
        tendencia_alineamiento: 'Neutral verdadero es el más común, equilibrio sobre todas las cosas',
        tipo_poder_principal: 'divino',
        descripcion_poder: 'Magia divina de la naturaleza, forma salvaje, compañero animal',
        rol_party: 'Versatil: ofensivo, soporte y control; compañero animal añade combate extra',
        motivacion_aventura: 'Proteger la naturaleza, mantener el equilibrio natural, detener amenazas a lo salvaje',
        origen_social: 'Bosques, tierras salvajes, círculos druídicos',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Veneración de la naturaleza misma, algunos sirven a deidades naturales',
        deidades_tipicas: 'Obad-Hai, Ehlonna, naturaleza sin deidad específica',
        razas_comunes: 'Humanos, elfos, gnomos, halflings'
    },
    'guerrero': {
        tiene_magia: false,
        tipo_magia: 'ninguna',
        estilo_conjuros: 'no_aplica',
        regla_alineamiento: 'Any',
        tendencia_alineamiento: 'Varía enormemente, desde paladines honrosos hasta mercenarios despiadados',
        tipo_poder_principal: 'marcial',
        descripcion_poder: 'Maestría en combate con armas y armaduras, múltiples dotes de combate',
        rol_party: 'Combatiente principal, frontline especializado en daño sostenido',
        motivacion_aventura: 'Buscar gloria marcial, riquezas, servir a un señor, proteger a otros',
        origen_social: 'Militares, guardias, mercenarios, escuelas de combate',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Varía; algunos veneran dioses de guerra, otros son seculares',
        deidades_tipicas: 'Heironeous, Kord, St. Cuthbert, Hextor (malvados)',
        razas_comunes: 'Todas las razas; humanos y enanos especialmente comunes'
    },
    'monje': {
        tiene_magia: false,
        tipo_magia: 'ninguna',
        estilo_conjuros: 'no_aplica',
        regla_alineamiento: 'Any lawful',
        tendencia_alineamiento: 'Legal neutral es común, valoran disciplina y orden',
        tipo_poder_principal: 'ki',
        descripcion_poder: 'Poder interno (ki) manifestado a través de disciplina física y mental',
        rol_party: 'Combatiente móvil y oportunista, explorador, deshabilitador',
        motivacion_aventura: 'Perfeccionar su arte, buscar iluminación, cumplir deberes del monasterio',
        origen_social: 'Monasterios aislados, escuelas de artes marciales',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Filosófico más que religioso, aunque algunos son devotos de dioses legales',
        deidades_tipicas: 'St. Cuthbert, Wee Jas, filosofía sin deidad',
        razas_comunes: 'Humanos, semielfos, raramente otras razas'
    },
    'paladin': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        regla_alineamiento: 'Lawful good',
        tendencia_alineamiento: 'Legal bueno exclusivamente, código estricto de honor',
        tipo_poder_principal: 'mixto',
        descripcion_poder: 'Combinación de habilidad marcial con magia divina limitada, energía positiva',
        rol_party: 'Combatiente de melee principal, sanador secundario, líder moral',
        motivacion_aventura: 'Servir a la justicia y al bien, cumplir llamados divinos, proteger inocentes',
        origen_social: 'Órdenes de caballería, templos, entrenados desde jóvenes ("squires")',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Devoto a deidades legales buenas, campeón de su fe',
        deidades_tipicas: 'Heironeous, Pelor, St. Cuthbert',
        razas_comunes: 'Humanos, enanos, semielfos'
    },
    'picaro': {
        tiene_magia: false,
        tipo_magia: 'ninguna',
        estilo_conjuros: 'no_aplica',
        regla_alineamiento: 'Any',
        tendencia_alineamiento: 'Tienden a ser caóticos y neutrales, valoran independencia',
        tipo_poder_principal: 'habilidades',
        descripcion_poder: 'Maestría en habilidades, sigilo, ataque furtivo, uso creativo de objetos mágicos',
        rol_party: 'Explorador, buscador de trampas, daño por oportunidad (sneak attack), infiltrador',
        motivacion_aventura: 'Buscar riquezas, emociones, libertad; escapar de su pasado',
        origen_social: 'Gremios de ladrones, calles urbanas, mentores individuales',
        tipo_organizacion: 'gremio',
        enfoque_religioso: 'Muchos veneran dioses del engaño, suerte o viajes',
        deidades_tipicas: 'Olidammara, Fharlanghn, Erythnul (malvados)',
        razas_comunes: 'Humanos, halflings, semielfos, medianos'
    },
    'hechicero': {
        tiene_magia: true,
        tipo_magia: 'arcana',
        estilo_conjuros: 'espontanea',
        regla_alineamiento: 'Any',
        tendencia_alineamiento: 'Varía; algunos son caóticos por su naturaleza innata e impredecible',
        tipo_poder_principal: 'arcano',
        descripcion_poder: 'Magia arcana innata, a menudo de origen dracónico o línea de sangre mágica',
        rol_party: 'Ofensivo mágico especializado, "blaster", ocasionalmente "face" social',
        motivacion_aventura: 'Explorar su poder innato, buscar el origen de su magia, acumular poder',
        origen_social: 'Autodidactas, a veces con mentores, sin estructura formal',
        tipo_organizacion: 'ninguna',
        enfoque_religioso: 'Muchos veneran Boccob o Wee Jas, otros ignoran religión',
        deidades_tipicas: 'Boccob, Wee Jas, no religioso',
        razas_comunes: 'Humanos, semielfos, mediosangre dracónicos'
    },
    'explorador': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        regla_alineamiento: 'Any',
        tendencia_alineamiento: 'Tienden a ser buenos y algo caóticos o neutrales',
        tipo_poder_principal: 'mixto',
        descripcion_poder: 'Combate especializado más magia divina limitada de la naturaleza',
        rol_party: 'Explorador, rastreador, combatiente especializado contra enemigos favorecidos',
        motivacion_aventura: 'Proteger tierras salvajes, cazar enemigos favorecidos, servir como guía',
        origen_social: 'Fronteras, bosques, entrenados por maestros solitarios o unidades élite',
        tipo_organizacion: 'maestro',
        enfoque_religioso: 'Veneran deidades de naturaleza y cacería',
        deidades_tipicas: 'Ehlonna, Obad-Hai, Fharlanghn',
        razas_comunes: 'Humanos, elfos, semielfos, medianos'
    },
    'mago': {
        tiene_magia: true,
        tipo_magia: 'arcana',
        estilo_conjuros: 'preparada',
        regla_alineamiento: 'Any',
        tendencia_alineamiento: 'Varía; muchos son neutrales, enfocados en conocimiento sobre moralidad',
        tipo_poder_principal: 'arcano',
        descripcion_poder: 'Magia arcana aprendida a través de estudio riguroso e investigación',
        rol_party: 'Controller principal, versátil con preparación, mayor conocimiento arcano',
        motivacion_aventura: 'Buscar conocimiento arcano, componentes raros, secretos mágicos antiguos',
        origen_social: 'Academias mágicas, torres de magos, aprendices de magos veteranos',
        tipo_organizacion: 'colegio',
        enfoque_religioso: 'Muchos veneran Boccob (dios de la magia), otros son seculares',
        deidades_tipicas: 'Boccob, Wee Jas, no religioso',
        razas_comunes: 'Humanos, elfos, gnomos, semielfos'
    }
};

async function updateClassLore() {
    console.log('🔄 Updating class lore data...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const [slug, loreData] of Object.entries(classLoreData)) {
        try {
            const { data, error } = await supabase
                .from('classes')
                .update(loreData)
                .eq('slug', slug)
                .select();

            if (error) {
                console.error(`❌ Error updating ${slug}:`, error.message);
                errorCount++;
            } else if (data && data.length > 0) {
                console.log(`✅ Updated: ${data[0].name}`);
                successCount++;
            } else {
                console.warn(`⚠️  Class not found: ${slug}`);
            }
        } catch (err) {
            console.error(`❌ Exception updating ${slug}:`, err.message);
            errorCount++;
        }
    }

    console.log(`\n📊 Summary:`);
    console.log(`✅ Successfully updated: ${successCount} classes`);
    if (errorCount > 0) {
        console.log(`❌ Errors: ${errorCount}`);
    }
    console.log(`\n🎉 Class lore update complete!`);
}

updateClassLore().catch(console.error);
