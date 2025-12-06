/**
 * Script para convertir un archivo Excel (.xlsx) a JSON
 *
 * INSTALACIÓN:
 * npm install xlsx
 *
 * USO:
 * node scripts/convert-excel-to-json.mjs ruta/al/archivo.xlsx
 *
 * El Excel debe tener las siguientes columnas (pueden estar en español o inglés):
 * - titulo / name / nombre (obligatorio)
 * - subtitulo / short_description
 * - descripcion / description
 * - hit_die / dado_golpe
 * - skill_points / puntos_habilidad
 * - bab_progression / bab (good/medium/poor)
 * - fort_save / fortaleza (good/poor)
 * - ref_save / reflejos (good/poor)
 * - will_save / voluntad (good/poor)
 * - class_skills / habilidades_clase (separadas por coma)
 * - weapon_proficiencies / armas (separadas por coma)
 * - armor_proficiencies / armaduras (separadas por coma)
 * - spell_type / tipo_magia (arcanos/divinos/null)
 * - spell_ability / habilidad_magia
 * - image_url / imagen
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
📊 Convertidor de Excel a JSON para clases D&D

USO:
  node scripts/convert-excel-to-json.mjs <archivo.xlsx>

EJEMPLO:
  node scripts/convert-excel-to-json.mjs "D:/mis-clases.xlsx"

El archivo Excel debe tener una hoja con columnas como:
  titulo, hit_die, skill_points, bab_progression, fort_save, ref_save, will_save, class_skills, etc.

COLUMNAS SOPORTADAS:
  Español              | Inglés
  ---------------------|----------------------
  titulo, nombre       | name
  subtitulo            | short_description
  descripcion          | description
  dado_golpe           | hit_die
  puntos_habilidad     | skill_points
  bab                  | bab_progression
  fortaleza            | fort_save
  reflejos             | ref_save
  voluntad             | will_save
  habilidades_clase    | class_skills
  armas                | weapon_proficiencies
  armaduras            | armor_proficiencies
  tipo_magia           | spell_type
  habilidad_magia      | spell_ability
  imagen               | image_url
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

    // Normalizar nombres de columnas
    const classes = rawData.map((row, index) => {
        const normalized = {};

        // Mapeo de columnas español → inglés
        const columnMap = {
            'titulo': 'titulo',
            'nombre': 'titulo',
            'name': 'titulo',
            'subtitulo': 'subtitulo',
            'short_description': 'subtitulo',
            'descripcion': 'descripcion',
            'description': 'descripcion',
            'dado_golpe': 'hit_die',
            'hit_die': 'hit_die',
            'puntos_habilidad': 'skill_points',
            'skill_points': 'skill_points',
            'bab': 'bab_progression',
            'bab_progression': 'bab_progression',
            'fortaleza': 'fort_save',
            'fort_save': 'fort_save',
            'reflejos': 'ref_save',
            'ref_save': 'ref_save',
            'voluntad': 'will_save',
            'will_save': 'will_save',
            'habilidades_clase': 'class_skills',
            'class_skills': 'class_skills',
            'armas': 'weapon_proficiencies',
            'weapon_proficiencies': 'weapon_proficiencies',
            'armaduras': 'armor_proficiencies',
            'armor_proficiencies': 'armor_proficiencies',
            'tipo_magia': 'spell_type',
            'spell_type': 'spell_type',
            'habilidad_magia': 'spell_ability',
            'spell_ability': 'spell_ability',
            'imagen': 'image_url',
            'image_url': 'image_url',
            'slug': 'slug'
        };

        // Procesar cada columna
        for (const [key, value] of Object.entries(row)) {
            const normalizedKey = key.toLowerCase().trim();
            const mappedKey = columnMap[normalizedKey];

            if (mappedKey) {
                normalized[mappedKey] = value;
            } else {
                // Mantener columnas desconocidas
                normalized[normalizedKey] = value;
            }
        }

        // Validar que tenga título
        if (!normalized.titulo) {
            console.warn(`⚠️  Fila ${index + 2}: Sin título, omitida`);
            return null;
        }

        console.log(`   ✅ ${normalized.titulo}`);
        return normalized;
    }).filter(Boolean);

    // Generar nombre de archivo de salida
    const outputFile = join(__dirname, '../data/classes-to-import.json');

    // Guardar JSON
    const output = {
        _generado: new Date().toISOString(),
        _origen: basename(inputFile),
        _total: classes.length,
        classes: classes
    };

    writeFileSync(outputFile, JSON.stringify(output, null, 2), 'utf-8');

    console.log('\n' + '='.repeat(50));
    console.log('✅ CONVERSIÓN COMPLETADA');
    console.log('='.repeat(50));
    console.log(`📁 Archivo generado: ${outputFile}`);
    console.log(`📦 Total de clases: ${classes.length}`);
    console.log('\n🚀 Ahora ejecuta:');
    console.log('   node scripts/import-classes-from-json.mjs');

} catch (error) {
    console.error(`❌ Error al procesar el archivo: ${error.message}`);
    process.exit(1);
}
