'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { createClient } from '@/lib/supabase/client';

interface FeatRow {
    'Nombre de Dote': string;
    'Tipo de dote': string;
    'subtitulo': string;
    'Prerrequisito': string;
    'Beneficio': string;
    'Normal': string;
    'Special': string;
}

export default function ImportarDotesPage() {
    const [file, setFile] = useState<File | null>(null);
    const [feats, setFeats] = useState<FeatRow[]>([]);
    const [importing, setImporting] = useState(false);
    const [result, setResult] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            parseExcel(selectedFile);
        }
    };

    const parseExcel = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'array', codepage: 65001 });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json<FeatRow>(worksheet);
            setFeats(json);
        };
        reader.readAsArrayBuffer(file);
    };

    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const parsePrerequisites = (prereqStr: string): string[] => {
        if (!prereqStr || prereqStr === '—' || prereqStr === '-') return [];
        return prereqStr.split(',').map(p => p.trim()).filter(p => p.length > 0);
    };

    const parseSpecial = (specialStr: string): string[] => {
        if (!specialStr || specialStr === '—' || specialStr === '-') return [];
        // Assuming special might be a single block of text, we wrap it in an array.
        // If there are multiple paragraphs or distinct specials, we might need smarter parsing,
        // but for now, treating it as one entry or splitting by newlines if appropriate.
        // Given the previous SQL updates used ARRAY['text'], we'll do similar.
        return [specialStr];
    };

    const handleImport = async () => {
        setImporting(true);
        setResult('');

        const supabase = createClient();
        let successCount = 0;
        let errorCount = 0;
        const errors: string[] = [];

        for (const feat of feats) {
            try {
                const name = feat['Nombre de Dote'];
                if (!name) continue;

                const slug = slugify(name);
                const prerequisites = parsePrerequisites(feat['Prerrequisito']);
                const special = parseSpecial(feat['Special']);

                // We use upsert. The constraint should be on 'slug' or 'id'.
                // Since we generate slug from name, we can try to match by slug.
                // However, standard upsert requires a unique constraint.
                // 'feats_slug_key' exists.

                const { error } = await supabase
                    .from('feats')
                    .upsert({
                        name: name,
                        slug: slug,
                        type: feat['Tipo de dote'] || 'General',
                        short_description: feat['subtitulo'] || '',
                        prerequisites: prerequisites, // jsonb
                        benefit: feat['Beneficio'] || '',
                        normal: feat['Normal'] || '',
                        special: special, // text[]
                        source_book: 'Manual del Jugador 1', // Defaulting to Core as per context, or we could add a column
                    }, { onConflict: 'slug' });

                if (error) {
                    errorCount++;
                    errors.push(`${name}: ${error.message}`);
                } else {
                    successCount++;
                }
            } catch (err: any) {
                errorCount++;
                errors.push(`${feat['Nombre de Dote']}: ${err.message}`);
            }
        }

        setResult(
            `Importación completada.\nÉxitos: ${successCount}\nErrores: ${errorCount}\n\n${errors.join('\n')}`
        );
        setImporting(false);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Importar Dotes desde Excel</h1>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">Seleccionar archivo Excel:</label>
                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="border p-2 rounded"
                />
                <p className="text-sm text-gray-500 mt-2">
                    Columnas esperadas: Nombre de Dote, Tipo de dote, subtitulo, Prerrequisito, Beneficio, Normal, Special
                </p>
            </div>

            {feats.length > 0 && (
                <>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Previsualización ({feats.length} dotes)
                        </h2>
                        <div className="overflow-x-auto max-h-96 border rounded">
                            <table className="min-w-full bg-white dark:bg-gray-800">
                                <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Nombre</th>
                                        <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Tipo</th>
                                        <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Prerrequisitos</th>
                                        <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Beneficio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feats.map((feat, idx) => (
                                        <tr key={idx} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{feat['Nombre de Dote']}</td>
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{feat['Tipo de dote']}</td>
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{feat['Prerrequisito']}</td>
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100 truncate max-w-xs" title={feat['Beneficio']}>{feat['Beneficio']}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <button
                        onClick={handleImport}
                        disabled={importing}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {importing ? 'Importando...' : 'Importar a Base de Datos'}
                    </button>
                </>
            )}

            {result && (
                <div className="mt-6 p-4 bg-gray-100 rounded dark:bg-gray-700">
                    <h3 className="font-semibold mb-2">Resultado:</h3>
                    <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </div>
            )}
        </div>
    );
}
