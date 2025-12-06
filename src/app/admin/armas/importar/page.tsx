'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { createClient } from '@/lib/supabase/client';

interface WeaponRow {
    nombre: string;
    slug?: string;
    precio: string;
    dano_s: string;
    dano_m: string;
    critico: string;
    incremento_distancia: string;
    peso: string;
    tipo: string;
    categoria: string;
    subcategoria: string;
    padre?: string;
}

export default function ImportarArmasPage() {
    const [file, setFile] = useState<File | null>(null);
    const [weapons, setWeapons] = useState<WeaponRow[]>([]);
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
            const json = XLSX.utils.sheet_to_json<WeaponRow>(worksheet);
            setWeapons(json);
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

    const parsePriceToCp = (priceStr: string): number => {
        if (!priceStr || priceStr === '—' || priceStr === '-') return 0;
        if (priceStr.toLowerCase().includes('especial')) return 0;

        const match = priceStr.match(/([\d.]+)\s*(po|pp|pc)/i);
        if (!match) return 0;

        const amount = parseFloat(match[1]);
        const unit = match[2].toLowerCase();

        if (unit === 'pp') return Math.floor(amount * 10);
        if (unit === 'po') return Math.floor(amount * 100);
        if (unit === 'pc') return Math.floor(amount);

        return 0;
    };

    const parseWeight = (weightStr: string): number => {
        if (!weightStr || weightStr === '—' || weightStr === '-') return 0;
        if (weightStr.toLowerCase().includes('especial')) return 0;

        const cleaned = weightStr.toLowerCase().replace('lb', '').trim();
        if (cleaned.includes('½') || cleaned.includes('1/2')) return 0.5;

        return parseFloat(cleaned) || 0;
    };

    const parseCritical = (critStr: string): { range: number; mult: number } => {
        if (!critStr || critStr === '—' || critStr === '-') {
            return { range: 20, mult: 2 };
        }

        const cleaned = critStr.replace(/–/g, '-').replace(/×/g, 'x').trim();

        if (cleaned.includes('/')) {
            const [rangePart, multPart] = cleaned.split('/');
            const range = rangePart.includes('-')
                ? parseInt(rangePart.split('-')[0])
                : parseInt(rangePart);
            const mult = parseInt(multPart.replace('x', ''));
            return { range, mult };
        }

        if (cleaned.includes('x')) {
            return { range: 20, mult: parseInt(cleaned.replace('x', '')) };
        }

        return { range: 20, mult: 2 };
    };

    const parseRange = (rangeStr: string): number | null => {
        if (!rangeStr || rangeStr === '—' || rangeStr === '-') return null;
        const cleaned = rangeStr.replace(/'/g, '').replace(/'/g, '').trim();
        return parseInt(cleaned) || null;
    };

    const parseDamageType = (typeStr: string): string[] => {
        if (!typeStr || typeStr === '—' || typeStr === '-') return [];
        return typeStr
            .replace(/ y /g, ',')
            .replace(/ o /g, ',')
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0);
    };

    const handleImport = async () => {
        setImporting(true);
        setResult('');

        const supabase = createClient();
        let successCount = 0;
        let errorCount = 0;
        const errors: string[] = [];

        for (const weapon of weapons) {
            try {
                const slug = weapon.slug || slugify(weapon.nombre);
                const priceCp = parsePriceToCp(weapon.precio);
                const weightLb = parseWeight(weapon.peso);
                const { range, mult } = parseCritical(weapon.critico);
                const rangeIncrement = parseRange(weapon.incremento_distancia);
                const damageTypes = parseDamageType(weapon.tipo);

                const { data, error } = await supabase.rpc('upsert_weapon', {
                    p_name: weapon.nombre,
                    p_slug: slug,
                    p_price_cp: priceCp,
                    p_weight_lb: weightLb,
                    p_category: weapon.categoria.toLowerCase(),
                    p_subcategory: weapon.subcategoria.toLowerCase().replace(/ /g, '_'),
                    p_damage_s: weapon.dano_s || '',
                    p_damage_m: weapon.dano_m || '',
                    p_critical_range: range,
                    p_critical_mult: mult,
                    p_range_increment_ft: rangeIncrement,
                    p_damage_type: damageTypes,
                    p_parent_slug: weapon.padre || null,
                });

                if (error) {
                    errorCount++;
                    errors.push(`${weapon.nombre}: ${error.message}`);
                } else {
                    successCount++;
                }
            } catch (err: any) {
                errorCount++;
                errors.push(`${weapon.nombre}: ${err.message}`);
            }
        }

        setResult(
            `Importación completada.\nÉxitos: ${successCount}\nErrores: ${errorCount}\n\n${errors.join('\n')}`
        );
        setImporting(false);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Importar Armas desde Excel</h1>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">Seleccionar archivo Excel:</label>
                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="border p-2 rounded"
                />
            </div>

            {weapons.length > 0 && (
                <>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Previsualización ({weapons.length} armas)
                        </h2>
                        <div className="overflow-x-auto max-h-96 border rounded">
                            <table className="min-w-full bg-white dark:bg-gray-800">
                                <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Nombre</th>
                                        <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Categoría</th>
                                        <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Subcategoría</th>
                                        <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Precio</th>
                                        <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Daño</th>
                                        <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Crítico</th>
                                        <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Padre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {weapons.map((weapon, idx) => (
                                        <tr key={idx} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{weapon.nombre}</td>
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{weapon.categoria}</td>
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{weapon.subcategoria}</td>
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{weapon.precio}</td>
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{weapon.dano_m}</td>
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{weapon.critico}</td>
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{weapon.padre || '-'}</td>
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
                <div className="mt-6 p-4 bg-gray-100 rounded">
                    <h3 className="font-semibold mb-2">Resultado:</h3>
                    <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </div>
            )}
        </div>
    );
}
