'use client';

import { Link as LinkIcon, ArrowLeft, Save, Download, Upload, Plus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface DeityEditorHeaderProps {
  deitiesCount: number;
  translatedCount: number;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  syncMessage: string;
  onCreateNew: () => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DeityEditorHeader({
  deitiesCount,
  translatedCount,
  syncStatus,
  syncMessage,
  onCreateNew,
  onExport,
  onImport,
}: DeityEditorHeaderProps) {
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
          Editor de Deidades
        </h1>
        <p className="text-dungeon-300">
          Total: {deitiesCount} deidades | Traducidas: {translatedCount}
        </p>
        {syncStatus !== 'idle' && (
          <div className={`mt-2 flex items-center gap-2 text-sm ${
            syncStatus === 'syncing' ? 'text-blue-400' :
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
      <div className="flex gap-2">
        <button
          onClick={onCreateNew}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nueva Deidad
        </button>
        <button
          onClick={onExport}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Download className="h-4 w-4" />
          Exportar
        </button>
        <label className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2 cursor-pointer transition-colors">
          <Upload className="h-4 w-4" />
          Importar
          <input
            type="file"
            accept=".json"
            onChange={onImport}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
