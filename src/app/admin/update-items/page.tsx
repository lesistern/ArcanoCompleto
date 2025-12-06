'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function UpdateItemsPage() {
    const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
    const [progress, setProgress] = useState({ completed: 0, total: 66, errors: 0 }); // Updated total to match fix count
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    };

    const executeUpdates = async () => {
        setStatus('running');
        setProgress({ completed: 0, total: 0, errors: 0 });
        addLog('🚀 Iniciando actualización de CORRECCIONES de items...');

        const supabase = createClient();

        // Fetch translations from public folder
        let translations;
        try {
            const response = await fetch('/items_final_fix.json');
            if (!response.ok) throw new Error('Failed to load translations file');
            const data = await response.json();
            translations = data.translations;
            addLog(`✓ Archivo de CORRECCIONES cargado (${translations.length} items)`);
            setProgress(prev => ({ ...prev, total: translations.length }));
        } catch (error: any) {
            setStatus('error');
            addLog(`✗ Error cargando archivo: ${error.message}`);
            return;
        }

        let completed = 0;
        let errors = 0;

        // Ejecutar en grupos de 10
        const batchSize = 10;

        for (let i = 0; i < translations.length; i += batchSize) {
            const batch = translations.slice(i, i + batchSize);

            const results = await Promise.allSettled(
                batch.map(async (item: any) => {
                    const { error } = await supabase
                        .from('srd_items')
                        .update({ name: item.name_es })
                        .eq('id', item.id);

                    if (error) throw error;
                    return item;
                })
            );

            results.forEach((result, idx) => {
                const item = batch[idx];
                if (result.status === 'fulfilled') {
                    completed++;
                    addLog(`✓ ${item.name_en} → ${item.name_es}`);
                } else {
                    errors++;
                    addLog(`✗ Error en ${item.name_en}: ${result.reason.message}`);
                }
            });

            setProgress({ completed, total: translations.length, errors });

            // Pausa entre lotes
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        if (errors === 0) {
            setStatus('completed');
            addLog(`\n✓ ¡TODAS LAS ACTUALIZACIONES COMPLETADAS EXITOSAMENTE!`);
            addLog(`Total: ${completed} items actualizados`);
        } else {
            setStatus('error');
            addLog(`\n⚠ Completado con errores: ${completed} exitosos, ${errors} fallidos`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="bg-dungeon-800 border border-dungeon-700 rounded-lg p-8">
                <h1 className="text-3xl font-bold text-amber-400 mb-4">
                    Corrección Final de Items
                </h1>

                <div className="mb-6">
                    <p className="text-dungeon-300 mb-2">
                        Esta página ejecutará las correcciones finales para items con traducciones parciales (ej. "steel", "wood").
                    </p>
                    <p className="text-sm text-dungeon-400">
                        ⚠ Archivo fuente: <code className="text-amber-400">public/items_final_fix.json</code>
                    </p>
                </div>

                {status === 'idle' && (
                    <button
                        onClick={executeUpdates}
                        className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded transition-colors"
                    >
                        🚀 Iniciar Correcciones
                    </button>
                )}

                {status === 'running' && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 bg-dungeon-700 rounded-full h-4">
                                <div
                                    className="bg-amber-500 h-4 rounded-full transition-all duration-300"
                                    style={{ width: `${progress.total ? (progress.completed / progress.total) * 100 : 0}%` }}
                                />
                            </div>
                            <span className="text-dungeon-200 font-mono">
                                {progress.completed} / {progress.total}
                            </span>
                        </div>
                        <p className="text-amber-400 animate-pulse">
                            Procesando... Por favor espera
                        </p>
                    </div>
                )}

                {status === 'completed' && (
                    <div className="bg-green-900/20 border border-green-500/50 rounded p-4">
                        <p className="text-green-400 font-bold">
                            ✓ Corrección completada exitosamente
                        </p>
                        <p className="text-dungeon-300 mt-2">
                            {progress.completed} items corregidos
                        </p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-900/20 border border-red-500/50 rounded p-4">
                        <p className="text-red-400 font-bold">
                            ⚠ Corrección completada con errores
                        </p>
                        <p className="text-dungeon-300 mt-2">
                            Exitosos: {progress.completed - progress.errors} | Errores: {progress.errors}
                        </p>
                    </div>
                )}

                {logs.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-dungeon-200 mb-2">Log de Ejecución</h3>
                        <div className="bg-black/50 rounded p-4 max-h-96 overflow-y-auto font-mono text-xs">
                            {logs.map((log, idx) => (
                                <div key={idx} className={
                                    log.includes('✓') ? 'text-green-400' :
                                        log.includes('✗') ? 'text-red-400' :
                                            log.includes('🚀') ? 'text-amber-400' :
                                                'text-dungeon-300'
                                }>
                                    {log}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
