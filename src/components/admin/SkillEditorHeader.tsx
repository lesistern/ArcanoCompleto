'use client';

import { ArrowLeft, Plus, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface SkillEditorHeaderProps {
    skillsCount: number;
    syncStatus: 'idle' | 'syncing' | 'success' | 'error';
    syncMessage: string;
    onCreateNew: () => void;
}

export function SkillEditorHeader({
    skillsCount,
    syncStatus,
    syncMessage,
    onCreateNew,
}: SkillEditorHeaderProps) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <Link
                href="/admin"
                className="p-2 rounded-lg bg-dungeon-700 hover:bg-dungeon-600 transition-colors"
            >
                <ArrowLeft className="h-5 w-5 text-gold-400" />
            </Link>
            <div className="flex-1">
                <h1 className="text-4xl font-bold text-gold-400 mb-2">
                    Editor de Habilidades
                </h1>
                <p className="text-dungeon-300">
                    Total: {skillsCount} habilidades
                </p>
                {syncStatus !== 'idle' && (
                    <div className={`mt-2 flex items-center gap-2 text-sm ${syncStatus === 'syncing' ? 'text-blue-400' :
                        syncStatus === 'success' ? 'text-green-400' :
                            'text-red-400'
                        }`}>
                        {syncStatus === 'syncing' && <Loader2 className="h-4 w-4 animate-spin" />}
                        {syncStatus === 'success' && <CheckCircle2 className="h-4 w-4" />}
                        {syncStatus === 'error' && <AlertCircle className="h-4 w-4" />}
                        {syncMessage}
                    </div>
                )}
            </div>
            <button
                onClick={onCreateNew}
                className="px-4 py-2 bg-gold-600 hover:bg-gold-700 rounded-lg flex items-center gap-2 transition-colors font-bold text-dungeon-900"
            >
                <Plus className="h-5 w-5" />
                Nueva Habilidad
            </button>
        </div>
    );
}
