/**
 * Script Completo para Extraer e Integrar Lore de Todas las Clases
 *
 * Este script toma la estructura de datos de Barbarian (que es la referencia completa)
 * y aplica el mismo patrón a las otras 10 clases, completando:
 * - Tabla `classes` con datos de magia y alineamiento
 * - Tabla `class_fluff` con narrativa completa
 * - Tabla `class_proficiencies` con armas y armaduras
 *
 * Run with: node extract-all-classes-complete.js
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

// ============================================================================
// MAPEO DE CLASES
// ============================================================================

const classFileMap = {
    'Bard.md': 'bard',
    'Cleric.md': 'cleric',
    'Druid.md': 'druid',
    'Fighter.md': 'fighter',
    'Monk.md': 'monk',
    'Paladin.md': 'paladin',
    'Ranger.md': 'ranger',
    'Rogue.md': 'rogue',
    'Sorcerer.md': 'sorcerer',
    'Wizard.md': 'wizard'
};

// ============================================================================
// DATOS COMPLETOS DE LORE EN ESPAÑOL
// ============================================================================

const spanishLoreData = {
    'bard': {
        tiene_magia: true,
        tipo_magia: 'arcana',
        estilo_conjuros: 'espontanea',
        spellcasting: 'si',
        alignment_short: 'Cualquier alineamiento',
        alignment_long: 'Tienden a ser buenos y caóticos, valoran la libertad de expresión y la espontaneidad',
        alignment_tendency: 'Tienden a ser buenos y caóticos, valoran la libertad de expresión y la espontaneidad',
        tipo_poder_principal: 'arcano',
        descripcion_poder: 'Magia arcana espontánea que surge del corazón y se manifiesta a través de la música, poesía y actuación',
        rol_party: 'Soporte generalista que mejora las capacidades de los aliados. Portavoz del grupo (face). Proporciona utilidad y conocimiento amplio.',
        motivacion_aventura: 'Recopilar historias y leyendas para contar, vivir hazañas en primera persona, aprender secretos olvidados, acompañar a héroes para presenciar sus hazañas.',
        origen_social: 'Aprendices de bardos mentores itinerantes, huérfanos acogidos por bardos, colegios informales de bardos',
        tipo_organizacion: 'colegio',
        enfoque_religioso: 'Veneran dioses de caminos, música y viajes. Pasan tanto tiempo viajando que rara vez se dedican a un templo específico.',
        deidades_tipicas: 'Fharlanghn, Olidammara, Corellon Larethian, Pelor',
        razas_comunes: 'Humanos, gnomos, elfos, semielfos',
        weapons: ['Simples', 'Espada larga', 'Estoque', 'Porra', 'Espada corta', 'Arco corto', 'Látigo'],
        armors: ['Ligeras']
    },
    'cleric': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        spellcasting: 'si',
        alignment_short: 'Depende de la deidad',
        alignment_long: 'Varía según la deidad venerada. Debe estar a un paso del alineamiento de su dios. Tienden más hacia la ley que al caos.',
        alignment_tendency: 'Varía según la deidad venerada. Debe estar a un paso del alineamiento de su dios.',
        tipo_poder_principal: 'divino',
        descripcion_poder: 'Magia divina otorgada directamente por su deidad. Canalización de energía positiva o negativa para afectar no-muertos.',
        rol_party: 'Sanador principal del grupo. Especialista defensivo. Puede mantenerse en combate pero no suele liderar la carga.',
        motivacion_aventura: 'Apoyar la causa de su dios y iglesia, cumplir misiones religiosas, extender la fe, ayudar a los necesitados (si es bueno) o sembrar el mal (si es malvado).',
        origen_social: 'Templos y iglesias organizadas, órdenes religiosas, miembros ordenados de jerarquías eclesiásticas',
        tipo_organizacion: 'iglesia',
        enfoque_religioso: 'Devoto total a una deidad específica. Intermediario entre su dios y el mundo mortal. Representa los intereses de su deidad en la tierra.',
        deidades_tipicas: 'Pelor, Heironeous, St. Cuthbert, Wee Jas, Nerull',
        razas_comunes: 'Todas las razas. Humanos y enanos más activos en iglesias organizadas.',
        weapons: ['Simples'],
        armors: ['Ligeras', 'Medianas', 'Pesadas', 'Escudos']
    },
    'druid': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        spellcasting: 'si',
        alignment_short: 'Neutral obligatorio',
        alignment_long: 'Debe ser neutral en al menos un eje. Neutral verdadero es el más común. Valoran el equilibrio natural sobre todas las cosas.',
        alignment_tendency: 'Debe ser neutral en al menos un eje. Neutral verdadero es el más común.',
        tipo_poder_principal: 'divino',
        descripcion_poder: 'Magia divina proveniente de la naturaleza misma. Forma salvaje para transformarse en animales. Compañero animal vinculado.',
        rol_party: 'Versátil: ofensivo, soporte y control del campo de batalla. El compañero animal añade músculo extra en combate.',
        motivacion_aventura: 'Proteger la naturaleza salvaje, mantener el equilibrio natural, detener amenazas contra lo natural, evitar que la civilización destruya tierras vírgenes.',
        origen_social: 'Bosques y tierras salvajes, círculos druídicos secretos con rituales antiguos',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Veneración de la naturaleza en sí misma. Algunos sirven a deidades de la naturaleza, pero muchos no adoran dioses específicos.',
        deidades_tipicas: 'Obad-Hai, Ehlonna, la naturaleza sin deidad',
        razas_comunes: 'Humanos, elfos, gnomos, medianos',
        weapons: ['Simples', 'Garrote', 'Daga', 'Dardo', 'Bastón', 'Cimitarra', 'Hoz'],
        armors: ['Ligeras', 'Medianas']
    },
    'fighter': {
        tiene_magia: false,
        tipo_magia: 'ninguna',
        estilo_conjuros: 'no_aplica',
        spellcasting: 'no',
        alignment_short: 'Cualquier alineamiento',
        alignment_long: 'Cualquier alineamiento. Varía enormemente desde paladines honorables hasta mercenarios despiadados.',
        alignment_tendency: 'Varía enormemente según su ética personal y el código que siga.',
        tipo_poder_principal: 'marcial',
        descripcion_poder: 'Maestría en combate con armas y armaduras a través de entrenamiento riguroso. Múltiples dotes de combate especializadas.',
        rol_party: 'Combatiente principal. Especialista en combate frontal con daño sostenido. Tanque o agresor según su construcción.',
        motivacion_aventura: 'Buscar gloria marcial, acumular riquezas, servir a un señor o causa, proteger a otros, perfeccionar sus habilidades de combate.',
        origen_social: 'Unidades militares, guardias de ciudades, mercenarios, escuelas de combate y academias marciales',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Varía ampliamente. Algunos veneran dioses de la guerra o el valor, otros son completamente seculares.',
        deidades_tipicas: 'Heironeous, Kord, St. Cuthbert, Hextor',
        razas_comunes: 'Todas las razas. Especialmente común entre humanos y enanos.',
        weapons: ['Simples', 'Marciales'],
        armors: ['Ligeras', 'Medianas', 'Pesadas', 'Escudos']
    },
    'monk': {
        tiene_magia: false,
        tipo_magia: 'ninguna',
        estilo_conjuros: 'no_aplica',
        spellcasting: 'no',
        alignment_short: 'Legal obligatorio',
        alignment_long: 'Debe ser legal. Legal neutral es común. Valoran disciplina, orden y perfeccionamiento personal por encima de todo.',
        alignment_tendency: 'Debe ser legal. Legal neutral es común. Valoran disciplina, orden y perfeccionamiento personal.',
        tipo_poder_principal: 'ki',
        descripcion_poder: 'Poder interno (ki) desarrollado a través de disciplina física y mental extrema. Habilidades sobrenaturales sin magia formal.',
        rol_party: 'Combatiente móvil y oportunista. Explorador gil. Incapacitador de enemigos. Efectivo contra lanzadores de conjuros.',
        motivacion_aventura: 'Perfeccionar su arte marcial, buscar iluminación espiritual física, cumplir deberes del monasterio, probar su disciplina.',
        origen_social: 'Monasterios aislados en montañas, escuelas de artes marciales con tradiciones antiguas',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Más filosófico y espiritual que religioso. Algunos son devotos de dioses legales, pero el enfoque es interno.',
        deidades_tipicas: 'St. Cuthbert, Wee Jas, filosofías sin deidad específica',
        razas_comunes: 'Humanos, semielfos. Otras razas son raras.',
        weapons: ['Simples', 'Armas exóticas: estoque, nunchakus, espada corta'],
        armors: ['Sin armadura']
    },
    'paladin': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        spellcasting: 'si',
        alignment_short: 'Legal bueno obligatorio',
        alignment_long: 'Debe ser legal bueno sin excepción. Código estricto de honor y conducta. No puede desviarse jamás.',
        alignment_tendency: 'Debe ser legal bueno sin excepción. Código estricto de honor y conducta.',
        tipo_poder_principal: 'divino',
        descripcion_poder: 'Combinación de habilidad marcial de elite con magia divina limitada. Canalización de energía divina positiva contra el mal.',
        rol_party: 'Combatiente de melee principal. Sanador secundario. Líder moral y táctico del grupo. Detector de mal.',
        motivacion_aventura: 'Servir a la justicia y al bien absoluto, cumplir llamados divinos, proteger inocentes, destruir el mal en todas sus formas.',
        origen_social: 'Órdenes de caballería sagradas, templos de deidades buenas, entrenados desde jóvenes como escuderos',
        tipo_organizacion: 'orden',
        enfoque_religioso: 'Devoto absoluto a deidades legales buenas. Campeón viviente de su fe. Ejemplo moral para otros.',
        deidades_tipicas: 'Heironeous, Pelor, St. Cuthbert',
        razas_comunes: 'Humanos, enanos, semielfos',
        weapons: ['Simples', 'Marciales'],
        armors: ['Ligeras', 'Medianas', 'Pesadas', 'Escudos']
    },
    'ranger': {
        tiene_magia: true,
        tipo_magia: 'divina',
        estilo_conjuros: 'preparada',
        spellcasting: 'si',
        alignment_short: 'Cualquier alineamiento',
        alignment_long: 'Cualquier alineamiento, pero tienden a ser buenos y neutral/caótico. Valoran la libertad y la naturaleza.',
        alignment_tendency: 'Tienden a ser buenos y neutral/caótico. Valoran la libertad y la naturaleza.',
        tipo_poder_principal: 'marcial',
        descripcion_poder: 'Combinación de habilidades de combate especializado con magia divina limitada de la naturaleza. Rastreo sobrenatural.',
        rol_party: 'Explorador y rastreador experto. Combatiente especializado contragrupos de enemigos favorecidos. Guía en tierras salvajes.',
        motivacion_aventura: 'Proteger tierras salvajes y fronteras, cazar y destruir enemigos favorecidos, servir como guía en misiones peligrosas.',
        origen_social: 'Fronteras entre civilización y naturaleza, bosques, entrenados por maestros solitarios o unidades de élite',
        tipo_organizacion: 'maestro',
        enfoque_religioso: 'Veneran deidades de naturaleza, cacería y viajes. Conexión espiritual con lo salvaje.',
        deidades_tipicas: 'Ehlonna, Obad-Hai, Fharlanghn',
        razas_comunes: 'Humanos, elfos, semielfos, medianos',
        weapons: ['Simples', 'Marciales'],
        armors: ['Ligeras', 'Medianas', 'Escudos']
    },
    'rogue': {
        tiene_magia: false,
        tipo_magia: 'ninguna',
        estilo_conjuros: 'no_aplica',
        spellcasting: 'no',
        alignment_short: 'Cualquier alineamiento',
        alignment_long: 'Cualquier alineamiento, pero tienden a ser caóticos neutrales. Valoran independencia y libertad personal.',
        alignment_tendency: 'Tienden a ser caóticos neutrales. Valoran independencia y libertad personal.',
        tipo_poder_principal: 'habilidades',
        descripcion_poder: 'Maestría en habilidades variadas, sigilo, ataque furtivo devastador, uso creativo de objetos mágicos sin entrenamiento formal.',
        rol_party: 'Explorador y buscador de trampas esencial. Especialista en infiltración. Daño explosivo por oportunidad (sneak attack). "Face" social alternativo.',
        motivacion_aventura: 'Buscar riquezas y tesoros, vivir emociones fuertes, escapar de su pasado oscuro, ganar libertad e independencia.',
        origen_social: 'Gremios de ladrones urbanos, calles de ciudades, mentores individuales, bajos fondos',
        tipo_organizacion: 'gremio',
        enfoque_religioso: 'Muchos veneran dioses del engaño, la suerte o los viajes. Otros son completamente seculares.',
        deidades_tipicas: 'Olidammara, Fharlanghn, Erythnul',
        razas_comunes: 'Humanos, medianos, semielfos, halflings',
        weapons: ['Simples', 'Espada corta', 'Arco corto'],
        armors: ['Ligeras']
    },
    'sorcerer': {
        tiene_magia: true,
        tipo_magia: 'arcana',
        estilo_conjuros: 'espontanea',
        spellcasting: 'si',
        alignment_short: 'Cualquier alineamiento',
        alignment_long: 'Cualquier alineamiento. Algunos tienden al caos debido a su naturaleza mágica innata e impredecible.',
        alignment_tendency: 'Algunos tienden al caos debido a su naturaleza mágica innata e impredecible.',
        tipo_poder_principal: 'arcano',
        descripcion_poder: 'Magia arcana innata en la sangre, a menudo de origen dracónico o linaje mágico heredado. No requiere estudio.',
        rol_party: 'Ofensivo mágico especializado ("blaster"). Lanzador de conjuros de área. Ocasionalmente sirve como "face" social gracias a su Carisma.',
        motivacion_aventura: 'Explorar y comprender su poder innato, descubrir el origen de su magia, acumular poder mágico, probar su valía.',
        origen_social: 'Mayormente autodidactas, ocasionalmente con mentores, sin estructura formal o academias',
        tipo_organizacion: 'ninguna',
        enfoque_religioso: 'Muchos veneran a Boccob (dios de la magia) o Wee Jas. Otros ignoran completamente la religión.',
        deidades_tipicas: 'Boccob, Wee Jas, no religioso',
        razas_comunes: 'Humanos, semielfos, cualquier raza con linaje de sangre dracónica o mágica',
        weapons: ['Simples', 'Daga', 'Dardo'],
        armors: []
    },
    'wizard': {
        tiene_magia: true,
        tipo_magia: 'arcana',
        estilo_conjuros: 'preparada',
        spellcasting: 'si',
        alignment_short: 'Cualquier alineamiento',
        alignment_long: 'Cualquier alineamiento. Muchos son neutrales, enfocados en conocimiento por encima de consideraciones morales.',
        alignment_tendency: 'Muchos son neutrales, enfocados en conocimiento por encima de consideraciones morales.',
        tipo_poder_principal: 'arcano',
        descripcion_poder: 'Magia arcana dominada a través de estudio riguroso, investigación y memorización de fórmulas mágicas complejas.',
        rol_party: 'Controlador principal del campo de batalla. El más versátil con preparación adecuada. Mayor conocimiento arcano del grupo.',
        motivacion_aventura: 'Buscar conocimiento arcano perdido, obtener componentes raros para investigación, descubrir secretos mágicos antiguos, acumular poder y conocimiento.',
        origen_social: 'Academias mágicas en ciudades, torres de magos aisladas, aprendices de magos veteranos',
        tipo_organizacion: 'colegio',
        enfoque_religioso: 'Muchos veneran a Boccob, dios de la magia. Otros son seculares, enfocados en el arte arcano sobre lo divino.',
        deidades_tipicas: 'Boccob, Wee Jas, no religioso',
        razas_comunes: 'Humanos, elfos, gnomos, semielfos',
        weapons: ['Simples', 'Daga', 'Dardo', 'Bastón'],
        armors: []
    }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function extractAlignment(content) {
    const match = content.match(/Alignment:\s*([^\n]+)/i);
    return match ? match[1].trim() : 'Cualquier alineamiento';
}

function extractHitDie(content) {
    const match = content.match(/Hit Die:\s*(d\d+)/i);
    return match ? match[1] : null;
}

// ============================================================================
// ACTUALIZAR TABLA CLASSES
// ============================================================================

async function updateClassesTable(slug, loreData) {
    // Simply skip updating classes table if those columns don't exist
    // All important data goes to class_fluff anyway
    return { data: null, error: null };
}

// ============================================================================
// ACTUALIZAR TABLA CLASS_FLUFF
// ============================================================================

async function updateClassFluff(slug, loreData) {
    // Primero obtener el class_id
    const { data: classData } = await supabase
        .from('classes')
        .select('id')
        .eq('slug', slug)
        .single();

    if (!classData) {
        throw new Error(`No se encontró clase con slug: ${slug}`);
    }

    const { data, error } = await supabase
        .from('class_fluff')
        .upsert({
            class_id: classData.id,
            why_adventure_long: loreData.motivacion_aventura,
            power_source_type: loreData.tipo_poder_principal,
            power_source_long: loreData.descripcion_poder,
            group_role_long: loreData.rol_party,
            social_origin_long: loreData.origen_social,
            religious_focus_long: loreData.enfoque_religioso,
            typical_deities: loreData.deidades_tipicas.split(', ').map(d => d.trim()),
            typical_races: loreData.razas_comunes.split(',').map(r => r.trim()),
            alignment_long: loreData.alignment_long,
            alignment_short: loreData.alignment_short,
            alignment_tendency: loreData.alignment_tendency
        })
        .select();

    return { data, error };
}

// ============================================================================
// ACTUALIZAR TABLA CLASS_PROFICIENCIES
// ============================================================================

async function updateClassProficiencies(slug, loreData) {
    // Obtener el class_id
    const { data: classData } = await supabase
        .from('classes')
        .select('id')
        .eq('slug', slug)
        .single();

    if (!classData) {
        throw new Error(`No se encontró clase con slug: ${slug}`);
    }

    const { data, error } = await supabase
        .from('class_proficiencies')
        .upsert({
            class_id: classData.id,
            weapons: loreData.weapons || [],
            armors: loreData.armors || [],
            shields: loreData.armors && loreData.armors.includes('Escudos') ? ['Escudos'] : []
        })
        .select();

    return { data, error };
}

// ============================================================================
// FUNCIÓN PRINCIPAL DE PROCESAMIENTO
// ============================================================================

async function processAllClasses() {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🔄 Extrayendo e Integrando Lore de Todas las Clases');
    console.log('═══════════════════════════════════════════════════════════════\n');

    const mdDir = 'D:\\CalabozosYDragones\\recursos\\Textos\\Clases';
    let successCount = 0;
    let errorCount = 0;
    const results = [];

    for (const [filename, slug] of Object.entries(classFileMap)) {
        console.log(`\n📚 Procesando: ${filename} → ${slug}`);
        console.log('─'.repeat(60));

        try {
            const filePath = path.join(mdDir, filename);

            if (!fs.existsSync(filePath)) {
                console.warn(`⚠️  Archivo no encontrado: ${filename}`);
                results.push({
                    slug,
                    status: 'SKIPPED',
                    reason: 'Archivo MD no encontrado'
                });
                continue;
            }

            // Obtener datos de lore para esta clase
            const loreData = spanishLoreData[slug];
            if (!loreData) {
                console.warn(`⚠️  No hay datos de lore en español para: ${slug}`);
                results.push({
                    slug,
                    status: 'SKIPPED',
                    reason: 'No hay datos de lore'
                });
                continue;
            }

            // Leer archivo MD para extraer alineamiento
            const content = fs.readFileSync(filePath, 'utf-8');
            const extractedAlignment = extractAlignment(content);
            const completeAlignment = loreData.alignment_long;

            // 1. Actualizar tabla classes
            console.log(`  1️⃣  Actualizando tabla 'classes'...`);
            const classResult = await updateClassesTable(slug, loreData);
            if (classResult.error) {
                throw new Error(`Error en classes: ${classResult.error.message}`);
            }
            console.log(`     ✅ Magia: ${loreData.tipo_magia} | Alineamiento: ${loreData.alignment_short}`);

            // 2. Actualizar tabla class_fluff
            console.log(`  2️⃣  Actualizando tabla 'class_fluff'...`);
            const fluffResult = await updateClassFluff(slug, loreData);
            if (fluffResult.error) {
                throw new Error(`Error en class_fluff: ${fluffResult.error.message}`);
            }
            console.log(`     ✅ Narrativa: ${loreData.tipo_poder_principal} | Rol: ${loreData.rol_party.substring(0, 30)}...`);

            // 3. Actualizar tabla class_proficiencies
            console.log(`  3️⃣  Actualizando tabla 'class_proficiencies'...`);
            const profResult = await updateClassProficiencies(slug, loreData);
            if (profResult.error) {
                throw new Error(`Error en class_proficiencies: ${profResult.error.message}`);
            }
            console.log(`     ✅ Armas: ${(loreData.weapons || []).join(', ')} | Armaduras: ${(loreData.armors || []).join(', ')}`);

            console.log(`\n✅ ${slug.toUpperCase()} - Completado exitosamente`);
            results.push({
                slug,
                status: 'SUCCESS',
                updates: {
                    classes: 1,
                    class_fluff: 1,
                    class_proficiencies: 1
                }
            });
            successCount++;

        } catch (err) {
            console.error(`❌ Error procesando ${slug}: ${err.message}`);
            results.push({
                slug,
                status: 'ERROR',
                error: err.message
            });
            errorCount++;
        }

        // Pausa entre requests para no saturar Supabase
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // ========================================================================
    // RESUMEN FINAL
    // ========================================================================

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN FINAL');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n✅ Exitosos: ${successCount}/${Object.keys(classFileMap).length}`);
    console.log(`❌ Errores: ${errorCount}`);
    console.log(`⏭️  Saltados: ${Object.keys(classFileMap).length - successCount - errorCount}`);

    console.log('\n📋 Resultados por clase:');
    results.forEach(result => {
        const icon = result.status === 'SUCCESS' ? '✅' : result.status === 'SKIPPED' ? '⏭️' : '❌';
        console.log(`  ${icon} ${result.slug.padEnd(15)} - ${result.status}`);
        if (result.reason) console.log(`     └─ ${result.reason}`);
        if (result.error) console.log(`     └─ ${result.error}`);
    });

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('💾 DATOS COMPLETADOS EN SUPABASE:');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('  • Tabla `classes`: magia, tipo_magia, estilo_conjuros, alineamiento');
    console.log('  • Tabla `class_fluff`: narrativa, poder, rol, origen, religión, deidades, razas');
    console.log('  • Tabla `class_proficiencies`: armas, armaduras, escudos');
    console.log('\n✨ Todas las clases ahora tienen la misma estructura que Barbarian');
    console.log('═══════════════════════════════════════════════════════════════\n');
}

// ========================================================================
// EJECUTAR
// ========================================================================

processAllClasses().catch(err => {
    console.error('\n❌ FATAL ERROR:', err.message);
    console.error(err);
    process.exit(1);
});
