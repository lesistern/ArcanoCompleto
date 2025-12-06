/**
 * Script to extract clase lore from English MD files and create Spanish data
 * Run with: node extract-and-translate-class-lore.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Mapping from MD filenames to class slugs
const classFileMap = {
    'Barbarian.md': 'barbaro',
    'Bard.md': 'bardo',
    'Cleric.md': 'clerigo',
    'Druid.md': 'druida',
    'Fighter': 'guerrero',
    'Monk.md': 'monje',
    'Paladin.md': 'paladin',
    'Ranger.md': 'explorador',
    'Rogue.md': 'picaro',
    'Sorcerer.md': 'hechicero',
    'Wizard.md': 'mago'
};

// Extract alignment rule from MD content
function extractAlignment(content) {
    const match = content.match(/Alignment:\s*([^\n]+)/i);
    return match ? match[1].trim() : 'Any';
}

// Extract hit die from MD content
function extractHitDie(content) {
    const match = content.match(/Hit Die:\s*(d\d+)/i);
    return match ? match[1] : null;
}

// Comprehensive Spanish lore data based on MD files analysis
const spanishLoreData = {
    'barbaro': {
        tiene_magia: false,
        tipo_magia: 'ninguna',
        estilo_conjuros: 'no_aplica',
        tendencia_alineamiento: 'Tienden a ser caóticos, valoran la libertad personal y tribal sobre la ley',
        tipo_poder_principal: 'marcial',
        descripcion_poder: 'Ira berserker y resistencia física proveniente de la vida salvaje',
        rol_party: 'Combatiente de primera línea. Tanque resistente con alto daño en ráfagas. Explorador en terrenos salvajes.',
        motivacion_aventura: 'Encontrar su lugar en sociedades civilizadas, derrotar enemigos odiados de su tribu, buscar gloria en combate, escapar de la esclavitud.',
        origen_social: 'Tribus bárbaras de tierras salvajes, regiones fronterizas alejadas de la civilización',
        tipo_organizacion: 'ninguna',
        enfoque_religioso: 'Relación intuitiva y natural con el cosmos. Reverencia por espíritus ancestrales y la naturaleza más que por dioses organizados.',
        deidades_tipicas: 'Kord (dios de la fuerza), Obad-Hai (dios de la naturaleza), Erythnul (dios de la masacre)',
        razas_comunes: 'Humanos, semielfos, semiorcos, enanos'
    },
    'bardo': {
        tiene_magia: true,
        tipo_magia: 'arcana',
        estilo_conjuros: 'espontanea',
        tendencia_alineamiento: 'Tienden a ser buenos y caóticosvaloran la libertad de expresión y la espontaneidad',
        tipo_poder_principal: 'mixto',
        descripcion_poder: 'Magia arcana espontánea que surge del corazón y se manifiesta a través de la música, poesía y actuación',
        rol_party: 'Soporte generalista que mejora las capacidades de los aliados. Portavoz del grupo (face). Proporciona utilidad y conocimiento amplio.',
        motivacion_aventura: 'Recopilar historias y leyendas para contar, vivir hazañas en primera persona, aprender secretos olvidados, acompañar a héroes para presenciar sus hazañas.',
        origen_social: 'Aprendices de bardos mentores itinerantes, huérfanos acogidos por bardos, colegios informales de bardos',
        tipo_organizacion: 'colegio',
        enfoque_religioso: 'Veneran dioses de caminos, música y viajes. Pasan tanto tiempo viajando que rara vez se dedican a un templo específico.',
        deidades_tipicas: 'Fharlanghn (dios de los caminos), Olidammara (dios de los ladrones), Corellon Larethian (patrón de la poesía), Pelor',
        razas_comunes: 'Humanos, gnomos, elfos, semielfos'
    },
    'clerigo': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        tendencia_alineamiento: 'Varía según la deidad venerada. Debe estar a un paso del alineamiento de su dios. Tienden más hacia la ley que al caos.',
        tipo_poder_principal: 'divino',
        descripcion_poder: 'Magia divina otorgada directamente por su deidad. Canalización de energía positiva o negativa para afectar no-muertos.',
        rol_party: 'Sanador principal del grupo. Especialista defensivo. Puede mantenerse en combate pero no suele liderar la carga.',
        motivacion_aventura: 'Apoyar la causa de su dios y iglesia, cumplir misiones religiosas, extender la fe, ayudar a los necesitados (si es bueno) o sembrar el mal (si es malvado).',
        origen_social: 'Templos y iglesias organizadas, órdenes religiosas, miembros ordenados de jerarquías eclesiásticas',
        tipo_organizacion: 'iglesia',
        enfoque_religioso: 'Devoto total a una deidad específica. Intermediario entre su dios y el mundo mortal. Representa los intereses de su deidad en la tierra.',
        deidades_tipicas: 'Pelor (dios del sol - más común), Heironeous, St. Cuthbert, Wee Jas, Nerull (malvados)',
        razas_comunes: 'Todas las razas. Humanos y enanos más activos en iglesias organizadas.'
    },
    'druida': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        tendencia_alineamiento: 'Debe ser neutral en al menos un eje. Neutral verdadero es el más común. Valoran el equilibrio natural sobre todas las cosas.',
        tipo_poder_principal: 'divino',
        descripcion_poder: 'Magia divina proveniente de la naturaleza misma. Forma salvaje para transformarse en animales. Compañero animal vinculado.',
        rol_party: 'Versátil: ofensivo, soporte y control del campo de batalla. El compañero animal añade músculo extra en combate.',
        motivacion_aventura: 'Proteger la naturaleza salvaje, mantener el equilibrio natural, detener amenazas contra lo natural, evitar que la civilización destruya tierras vírgenes.',
        origen_social: 'Bosques y tierras salvajes, círculos druídicos secretos con rituales antiguos',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Veneración de la naturaleza en sí misma. Algunos sirven a deidades de la naturaleza, pero muchos no adoran dioses específicos.',
        deidades_tipicas: 'Obad-Hai (dios de la naturaleza), Ehlonna (diosa de los bosques), la naturaleza sin deidad',
        razas_comunes: 'Humanos, elfos, gnomos, medianos'
    },
    'guerrero': {
        tiene_magia: false,
        tipo_magia: 'ninguna',
        estilo_conjuros: 'no_aplica',
        tendencia_alineamiento: 'Cualquier alineamiento. Varía enormemente desde paladines honorables hasta mercenarios despiadados.',
        tipo_poder_principal: 'marcial',
        descripcion_poder: 'Maestría en combate con armas y armaduras a través de entrenamiento riguroso. Múltiples dotes de combate especializadas.',
        rol_party: 'Combatiente principal. Especialista en combate frontal con daño sostenido. Tanque o agresor según su construcción.',
        motivacion_aventura: 'Buscar gloria marcial, acumular riquezas, servir a un señor o causa, proteger a otros, perfeccionar sus habilidades de combate.',
        origen_social: 'Unidades militares, guardias de ciudades, mercenarios, escuelas de combate y academias marciales',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Varía ampliamente. Algunos veneran dioses de la guerra o el valor, otros son completamente seculares.',
        deidades_tipicas: 'Heironeous (dios del valor), Kord (dios de la fuerza), St. Cuthbert, Hextor (malvados)',
        razas_comunes: 'Todas las razas. Especialmente común entre humanos y enanos.'
    },
    'monje': {
        tiene_magia: false,
        tipo_magia: 'ninguna',
        estilo_conjuros: 'no_aplica',
        tendencia_alineamiento: 'Debe ser legal. Legal neutral es común. Valoran disciplina, orden y perfeccionamiento personal por encima de todo.',
        tipo_poder_principal: 'ki',
        descripcion_poder: 'Poder interno (ki) desarrollado a través de disciplina física y mental extrema. Habilidades sobrenaturales sin magia formal.',
        rol_party: 'Combatiente móvil y oportunista. Explorador gil. Incapacitador de enemigos. Efectivo contra lanzadores de conjuros.',
        motivacion_aventura: 'Perfeccionar su arte marcial, buscar iluminación espiritual física, cumplir deberes del monasterio, probar su disciplina.',
        origen_social: 'Monasterios aislados en montañas, escuelas de artes marciales con tradiciones antiguas',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Más filosófico y espiritual que religioso. Algunos son devotos de dioses legales, pero el enfoque es interno.',
        deidades_tipicas: 'St. Cuthbert, Wee Jas, filosofías sin deidad específica',
        razas_comunes: 'Humanos, semielfos. Otras razas son raras.'
    },
    'paladin': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        tendencia_alineamiento: 'Debe ser legal bueno sin excepción. Código estricto de honor y conducta. No puede desviarse jamás.',
        tipo_poder_principal: 'mixto',
        descripcion_poder: 'Combinación de habilidad marcial de elite con magia divina limitada. Canalización de energía divina positiva contra el mal.',
        rol_party: 'Combatiente de melee principal. Sanador secundario. Líder moral y táctico del grupo. Detector de mal.',
        motivacion_aventura: 'Servir a la justicia y al bien absoluto, cumplir llamados divinos, proteger inocentes, destruir el mal en todas sus formas.',
        origen_social: 'Órdenes de caballería sagradas, templos de deidades buenas, entrenados desde jóvenes como escuderos',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Devoto absoluto a deidades legales buenas. Campeón viviente de su fe. Ejemplo moral para otros.',
        deidades_tipicas: 'Heironeous (dios del valor), Pelor (dios del sol), St. Cuthbert',
        razas_comunes: 'Humanos, enanos, semielfos'
    },
    'picaro': {
        tiene_magia: false,
        tipo_magia: 'ninguna',
        estilo_conjuros: 'no_aplica',
        tendencia_alineamiento: 'Cualquier alineamiento, pero tienden a ser caóticos neutrales. Valoran independencia y libertad personal.',
        tipo_poder_principal: 'habilidades',
        descripcion_poder: 'Maestría en habilidades variadas, sigilo, ataque furtivo devastador, uso creativo de objetos mágicos sin entrenamiento formal.',
        rol_party: 'Explorador y buscador de trampas esencial. Especialista en infiltración. Daño explosivo por oportunidad (sneak attack). "Face" social alternativo.',
        motivacion_aventura: 'Buscar riquezas y tesoros, vivir emociones fuertes, escapar de su pasado oscuro, ganar libertad e independencia.',
        origen_social: 'Gremios de ladrones urbanos, calles de ciudades, mentores individuales, bajos fondos',
        tipo_organizacion: 'gremio',
        enfoque_religioso: 'Muchos veneran dioses del engaño, la suerte o los viajes. Otros son completamente seculares.',
        deidades_tipicas: 'Olidammara (dios de los ladrones), Fharlanghn (dios de los caminos), Erythnul (malvados)',
        razas_comunes: 'Humanos, medianos, semielfos, halflings'
    },
    'hechicero': {
        tiene_magia: true,
        tipo_magia: 'arcana',
        estilo_conjuros: 'espontanea',
        tendencia_alineamiento: 'Cualquier alineamiento. Algunos tienden al caos debido a su naturaleza mágica innata e impredecible.',
        tipo_poder_principal: 'arcano',
        descripcion_poder: 'Magia arcana innata en la sangre, a menudo de origen dracónico o linaje mágico heredado. No requiere estudio.',
        rol_party: 'Ofensivo mágico especializado ("blaster"). Lanzador de conjuros de área. Ocasionalmente sirve como "face" social gracias a su Carisma.',
        motivacion_aventura: 'Explorar y comprender su poder innato, descubrir el origen de su magia, acumular poder mágico, probar su valía.',
        origen_social: 'Mayormente autodidactas, ocasionalmente con mentores, sin estructura formal o academias',
        tipo_organizacion: 'ninguna',
        enfoque_religioso: 'Muchos veneran a Boccob (dios de la magia) o Wee Jas. Otros ignoran completamente la religión.',
        deidades_tipicas: 'Boccob (dios de la magia), Wee Jas (diosa de la muerte y magia), no religioso',
        razas_comunes: 'Humanos, semielfos, cualquier raza con linaje de sangre dracónica o mágica'
    },
    'explorador': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        tendencia_alineamiento: 'Cualquier alineamiento, pero tienden a ser buenos y neutral/caótico. Valoran la libertad y la naturaleza.',
        tipo_poder_principal: 'mixto',
        descripcion_poder: 'Combinación de habilidades de combate especializado con magia divina limitada de la naturaleza. Rastreo sobrenatural.',
        rol_party: 'Explorador y rastreador experto. Combatiente especializado contragrupos de enemigos favorecidos. Guía en tierras salvajes.',
        motivacion_aventura: 'Proteger tierras salvajes y fronteras, cazar y destruir enemigos favorecidos, servir como guía en misiones peligrosas.',
        origen_social: 'Fronteras entre civilización y naturaleza, bosques, entrenados por maestros solitarios o unidades de élite',
        tipo_organizacion: 'maestro',
        enfoque_religioso: 'Veneran deidades de naturaleza, cacería y viajes. Conexión espiritual con lo salvaje.',
        deidades_tipicas: 'Ehlonna (diosa de los bosques), Obad-Hai (dios de la naturaleza), Fharlanghn',
        razas_comunes: 'Humanos, elfos, semielfos, medianos'
    },
    'mago': {
        tiene_magia: true,
        tipo_magia: 'arcana',
        estilo_conjuros: 'preparada',
        tendencia_alineamiento: 'Cualquier alineamiento. Muchos son neutrales, enfocados en conocimiento por encima de consideraciones morales.',
        tipo_poder_principal: 'arcano',
        descripcion_poder: 'Magia arcana dominada a través de estudio riguroso, investigación y memorización de fórmulas mágicas complejas.',
        rol_party: 'Controlador principal del campo de batalla. El más versátil con preparación adecuada. Mayor conocimiento arcano del grupo.',
        motivacion_aventura: 'Buscar conocimiento arcano perdido, obtener componentes raros para investigación, descubrir secretos mágicos antiguos, acumular poder y conocimiento.',
        origen_social: 'Academias mágicas en ciudades, torres de magos aisladas, aprendices de magos veteranos',
        tipo_organizacion: 'colegio',
        enfoque_religioso: 'Muchos veneran a Boccob, dios de la magia. Otros son seculares, enfocados en el arte arcano sobre lo divino.',
        deidades_tipicas: 'Boccob (dios de la magia), Wee Jas (diosa de la muerte y magia), no religioso',
        razas_comunes: 'Humanos, elfos, gnomos, semielfos'
    }
};

// Process all classes and update database
async function updateAllClasses() {
    console.log('🔄 Processing all class files...\n');

    const mdDir = 'D:\\CalabozosYDragones\\recursos\\Textos\\Clases';
    let successCount = 0;
    let errorCount = 0;

    for (const [filename, slug] of Object.entries(classFileMap)) {
        try {
            const filePath = path.join(mdDir, filename);

            if (!fs.existsSync(filePath)) {
                console.warn(`⚠️  File not found: ${filename}`);
                continue;
            }

            // Read MD file to extract alignment
            const content = fs.readFileSync(filePath, 'utf8');
            const regla_alineamiento = extractAlignment(content);

            // Get Spanish lore data
            const loreData = spanishLoreData[slug];
            if (!loreData) {
                console.warn(`⚠️  No Spanish lore data for: ${slug}`);
                continue;
            }

            // Combine extracted data with Spanish lore
            const fullData = {
                ...loreData,
                regla_alineamiento
            };

            // Update in database
            const { error } = await supabase
                .from('classes')
                .update(fullData)
                .eq('slug', slug);

            if (error) {
                console.error(`❌ Error updating ${slug}:`, error.message);
                errorCount++;
            } else {
                console.log(`✅ Updated: ${slug}`);
                console.log(`   - Alignment: ${regla_alineamiento}`);
                console.log(`   - Power: ${fullData.tipo_poder_principal}`);
                console.log(`   - Magic: ${fullData.tipo_magia}`);
                successCount++;
            }

        } catch (err) {
            console.error(`❌ Exception processing ${filename}:`, err.message);
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

updateAllClasses().catch(console.error);
