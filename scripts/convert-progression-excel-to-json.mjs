/**
 * Script para convertir un archivo Excel (.xlsx) con progresión de clases a JSON
 *
 * INSTALACIÓN:
 * npm install xlsx
 *
 * USO:
 * node scripts/convert-progression-excel-to-json.mjs ruta/al/archivo.xlsx
 *
 * El Excel debe tener las siguientes columnas:
 * - class_slug / clase (obligatorio) - Slug de la clase (wizard, cleric, etc.)
 * - level / nivel (obligatorio) - Nivel 1-20
 * - base_attack_bonus / bab - Bonificador de ataque base
 * - fort_save / fortaleza - Salvación de Fortaleza
 * - ref_save / reflejos - Salvación de Reflejos
 * - will_save / voluntad - Salvación de Voluntad
 * - special_abilities / habilidades_especiales - Habilidades especiales del nivel
 *
 * Para conjuros por día, usa columnas individuales:
 * - spell_0 / conjuro_0 - Conjuros de nivel 0 (trucos)
 * - spell_1 / conjuro_1 - Conjuros de nivel 1
 * - spell_2 / conjuro_2 - Conjuros de nivel 2
 * - ... hasta spell_9 / conjuro_9
 *
 * O una columna combinada:
 * - spells_per_day / conjuros_por_dia - Formato "3|1|—|—|..." separado por |
 */

import { readFile, utils } from 'xlsx';
import { writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Obtener archivo de entrada de argumentos
const inputFile = process.argv[2];

if (!inputFile) {
    console.log(`
📊 Convertidor de Excel a JSON para Progresión de Clases D&D

USO:
  node scripts/convert-progression-excel-to-json.mjs <archivo.xlsx>

EJEMPLO:
  node scripts/convert-progression-excel-to-json.mjs "D:/wizard-progression.xlsx"

El archivo Excel debe tener columnas como:
  class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities

Para clases con conjuros, añade columnas:
  spell_0, spell_1, spell_2, ... spell_9

O una columna combinada:
  spells_per_day con formato "3|1|—|—|—|—|—|—|—|—"

COLUMNAS SOPORTADAS:
  Español              | Inglés
  ---------------------|----------------------
  clase                | class_slug
  nivel                | level
  bab                  | base_attack_bonus
  fortaleza            | fort_save
  reflejos             | ref_save
  voluntad             | will_save
  habilidades_especiales | special_abilities
  conjuro_0..9         | spell_0..9
  conjuros_por_dia     | spells_per_day
    `);
    process.exit(1);
}

if (!existsSync(inputFile)) {
    console.error(`❌ El archivo no existe: ${inputFile}`);
    process.exit(1);
}

console.log(`📖 Leyendo archivo: ${inputFile}\n`);

try {
    // Leer el archivo Excel
    const workbook = readFile(inputFile);

    // Obtener la primera hoja
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    console.log(`📄 Procesando hoja: ${sheetName}`);

    // Convertir a JSON
    const rawData = utils.sheet_to_json(sheet);

    console.log(`📦 Encontradas ${rawData.length} filas\n`);

    // Mapeo de columnas español → inglés
    const columnMap = {
        'clase': 'class_slug',
        'class_slug': 'class_slug',
        'nivel': 'level',
        'level': 'level',
        'bab': 'base_attack_bonus',
        'base_attack_bonus': 'base_attack_bonus',
        'fortaleza': 'fort_save',
        'fort_save': 'fort_save',
        'reflejos': 'ref_save',
        'ref_save': 'ref_save',
        'voluntad': 'will_save',
        'will_save': 'will_save',
        'habilidades_especiales': 'special_abilities',
        'special_abilities': 'special_abilities',
        'conjuros_por_dia': 'spells_per_day',
        'spells_per_day': 'spells_per_day',
    };

    // Añadir mapeos para columnas de conjuros individuales
    for (let i = 0; i <= 9; i++) {
        columnMap[`conjuro_${i}`] = `spell_${i}`;
        columnMap[`spell_${i}`] = `spell_${i}`;
    }

    // Normalizar datos
    const progressions = rawData.map((row, index) => {
        const normalized = {};
        const spellLevels = {};

        // Procesar cada columna
        for (const [key, value] of Object.entries(row)) {
            const normalizedKey = key.toLowerCase().trim();
            const mappedKey = columnMap[normalizedKey];

            if (mappedKey) {
                // Si es una columna de conjuro individual
                if (mappedKey.startsWith('spell_')) {
                    const spellLevel = mappedKey.replace('spell_', '');
                    if (value !== null && value !== undefined && value !== '—' && value !== '-' && value !== '') {
                        const numValue = parseInt(value);
                        if (!isNaN(numValue)) {
                            spellLevels[spellLevel] = numValue;
                        }
                    }
                } else {
                    normalized[mappedKey] = value;
                }
            }
        }

        // Validar campos obligatorios
        if (!normalized.class_slug || !normalized.level) {
            console.warn(`⚠️  Fila ${index + 2}: Sin class_slug o level, omitida`);
            return null;
        }

        // Construir spells_per_day desde columnas individuales o string combinado
        if (Object.keys(spellLevels).length > 0) {
            normalized.spells_per_day = spellLevels;
        } else if (normalized.spells_per_day && typeof normalized.spells_per_day === 'string') {
            // Parsear formato "3|1|—|—|..."
            const parts = normalized.spells_per_day.split('|').map(s => s.trim());
            const parsed = {};
            parts.forEach((val, i) => {
                if (val && val !== '—' && val !== '-' && i <= 9) {
                    const num = parseInt(val);
                    if (!isNaN(num)) {
                        parsed[i.toString()] = num;
                    }
                }
            });
            if (Object.keys(parsed).length > 0) {
                normalized.spells_per_day = parsed;
            } else {
                delete normalized.spells_per_day;
            }
        }

        // Normalizar class_slug
        normalized.class_slug = normalized.class_slug
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        // Asegurar que level es número
        normalized.level = parseInt(normalized.level);

        // Asegurar que saves son números
        ['fort_save', 'ref_save', 'will_save'].forEach(key => {
            if (normalized[key] !== undefined) {
                normalized[key] = parseInt(normalized[key]) || 0;
            }
        });

        console.log(`   ✅ ${normalized.class_slug} nivel ${normalized.level}`);
        return normalized;
    }).filter(Boolean);

    // Generar nombre de archivo de salida
    const outputFile = join(__dirname, '../data/class-progression-to-import.json');

    // Guardar JSON
    const output = {
        _generado: new Date().toISOString(),
        _origen: basename(inputFile),
        _total: progressions.length,
        _instrucciones: [
            "Ejecuta: node scripts/import-class-progression.mjs",
            "Este archivo importará la progresión de clases a Supabase"
        ],
        class_progression: progressions
    };

    writeFileSync(outputFile, JSON.stringify(output, null, 2), 'utf-8');

    console.log('\n' + '='.repeat(50));
    console.log('✅ CONVERSIÓN COMPLETADA');
    console.log('='.repeat(50));
    console.log(`📁 Archivo generado: ${outputFile}`);
    console.log(`📦 Total de entradas: ${progressions.length}`);
    console.log('\n🚀 Ahora ejecuta:');
    console.log('   node scripts/import-class-progression.mjs');

} catch (error) {
    console.error(`❌ Error al procesar el archivo: ${error.message}`);
    process.exit(1);
}
