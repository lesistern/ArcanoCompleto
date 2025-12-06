// Script para ejecutar actualizaciones de nombres de items
// Ejecuta después de verificar que el backup está OK

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Cargar traducciones
const translationsPath = path.join(__dirname, 'translation_data', 'items_refined_translations.json');
const translationsData = JSON.parse(fs.readFileSync(translationsPath, 'utf-8'));
const translations = translationsData.translations;

async function executeUpdates() {
    console.log('='.repeat(80));
    console.log('EJECUTANDO ACTUALIZACIONES DE NOMBRES');
    console.log('='.repeat(80));
    console.log(`\nTotal de actualizaciones: ${translations.length}\n`);

    let success = 0;
    let errors = 0;
    const errorLog: any[] = [];

    // Ejecutar en lotes de 10 para no sobrecargar
    const batchSize = 10;

    for (let i = 0; i < translations.length; i += batchSize) {
        const batch = translations.slice(i, i + batchSize);

        const promises = batch.map(async (item: any) => {
            try {
                const { error } = await supabase
                    .from('srd_items')
                    .update({ name: item.name_es })
                    .eq('id', item.id);

                if (error) {
                    errorLog.push({ id: item.id, name_en: item.name_en, error: error.message });
                    errors++;
                    process.stdout.write('✗');
                } else {
                    success++;
                    process.stdout.write('✓');
                }
            } catch (err: any) {
                errorLog.push({ id: item.id, name_en: item.name_en, error: err.message });
                errors++;
                process.stdout.write('✗');
            }
        });

        await Promise.all(promises);

        // Pequeña pausa entre lotes
        if (i + batchSize < translations.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    console.log('\n');
    console.log('='.repeat(80));
    console.log('RESULTADOS');
    console.log('='.repeat(80));
    console.log(`✓ Actualizados exitosamente: ${success}`);
    console.log(`✗ Errores: ${errors}`);
    console.log(`  Total procesados: ${translations.length}`);

    if (errorLog.length > 0) {
        console.log('\n' + '='.repeat(80));
        console.log('ERRORES ENCONTRADOS:');
        console.log('='.repeat(80));
        errorLog.forEach(err => {
            console.log(`  ID ${err.id} (${err.name_en}): ${err.error}`);
        });

        // Guardar log de errores
        const errorLogPath = path.join(__dirname, 'update_errors.json');
        fs.writeFileSync(errorLogPath, JSON.stringify(errorLog, null, 2));
        console.log(`\nLog de errores guardado en: ${errorLogPath}`);
    }

    if (success === translations.length) {
        console.log('\n✓ ¡TODAS LAS ACTUALIZACIONES COMPLETADAS EXITOSAMENTE!');
    } else {
        console.log('\n⚠ Algunas actualizaciones fallaron. Revisa el log de errores.');
    }
}

async function verifyUpdates() {
    console.log('\n' + '='.repeat(80));
    console.log('VERIFICANDO ACTUALIZACIONES');
    console.log('='.repeat(80));

    // Verificar algunos items aleatorios
    const sampleIds = [194, 383, 365, 50, 212]; // Ácido, Hacha de batalla, Ballesta pesada, Coraza, Símbolo sagrado

    console.log('\nVerificando muestra de items actualizados:\n');

    for (const id of sampleIds) {
        const { data, error } = await supabase
            .from('srd_items')
            .select('id, name')
            .eq('id', id)
            .single();

        if (error) {
            console.log(`  ✗ Error verificando ID ${id}: ${error.message}`);
        } else if (data) {
            const translation = translations.find((t: any) => t.id === id);
            const isCorrect = data.name === translation?.name_es;
            console.log(`  ${isCorrect ? '✓' : '✗'} ID ${id}: "${data.name}" ${isCorrect ? '(correcto)' : '(incorrecto)'}`);
        }
    }
}

async function main() {
    try {
        console.log('\n🚀 Iniciando actualización de nombres de items...\n');

        await executeUpdates();
        await verifyUpdates();

        console.log('\n' + '='.repeat(80));
        console.log('PROCESO COMPLETADO');
        console.log('='.repeat(80));
        console.log('\nLos nombres de los items han sido actualizados al español.');
        console.log('Verifica la página /objetos para ver los cambios.\n');

    } catch (error: any) {
        console.error('\n✗ Error fatal:', error.message);
        process.exit(1);
    }
}

main();
