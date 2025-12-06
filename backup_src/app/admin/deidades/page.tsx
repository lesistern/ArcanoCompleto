'use client';

import { useState, useEffect } from 'react';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ArrowLeft, Save, Download, Upload, Pencil, Plus, Trash2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { initialDeities } from '@/lib/data/deities-initial';
import { ALIGNMENT_CONFIG, getAlignmentLabel, getAlignmentColor } from '@/lib/data/alignments';
import { createClient } from '@/lib/supabase/client';

interface Deity {
  slug: string;
  name_en: string;
  name_es: string;
  rank: string;
  titles_en: string;
  titles_es: string;
  portfolio_en: string;
  portfolio_es: string;
  alignment: string;
  domains: string[];
  favored_weapon: string;
  symbol_en: string;
  symbol_es: string;
  worshipers_en: string;
  worshipers_es: string;
  home_plane_en: string;
  home_plane_es: string;
  description_en: string;
  description_es: string;
  teachings_en?: string;
  teachings_es?: string;
  clergy_en?: string;
  clergy_es?: string;
  temples_en?: string;
  temples_es?: string;
  rites_en?: string;
  rites_es?: string;
}

const rankLabels: Record<string, string> = {
  greater: 'Deidad Mayor',
  intermediate: 'Deidad Intermedia',
  lesser: 'Deidad Menor',
  demigod: 'Semidiós',
  demon_lord: 'Señor Demonio',
};

// Usar el sistema global de alineamientos en lugar de hardcodear
const alignmentLabels = Object.fromEntries(
  Object.entries(ALIGNMENT_CONFIG).map(([code, config]) => [code, config.label])
);

export default function DeitiesAdminPage() {
  const [deities, setDeities] = useState<Deity[]>([]);
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'es' | 'en'>('es');
  const [searchTerm, setSearchTerm] = useState('');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState('');

  useEffect(() => {
    loadDeities();
  }, []);

  const loadDeities = () => {
    const stored = localStorage.getItem('dnd_deities');
    if (stored) {
      setDeities(JSON.parse(stored));
    } else {
      // Initialize with all 38 deities from the initial data file
      setDeities(initialDeities);
    }
  };

  const saveDeities = (newDeities: Deity[]) => {
    localStorage.setItem('dnd_deities', JSON.stringify(newDeities));
    setDeities(newDeities);
  };

  const handleSave = async () => {
    if (!selectedDeity) return;

    const updatedDeities = deities.map(d =>
      d.slug === selectedDeity.slug ? selectedDeity : d
    );

    // Guardar en localStorage (fallback local)
    saveDeities(updatedDeities);

    // Guardar en Supabase
    await syncToSupabase(selectedDeity);

    setIsEditing(false);
  };

  const syncToSupabase = async (deity: Deity) => {
    const supabase = createClient();

    setSyncStatus('syncing');
    setSyncMessage('Sincronizando con Supabase...');

    try {
      const { error } = await supabase
        .from('deities')
        .upsert({
          slug: deity.slug,
          name_en: deity.name_en,
          name_es: deity.name_es,
          rank: deity.rank,
          titles_en: deity.titles_en,
          titles_es: deity.titles_es,
          portfolio_en: deity.portfolio_en,
          portfolio_es: deity.portfolio_es,
          alignment: deity.alignment,
          domains: deity.domains,
          favored_weapon: deity.favored_weapon,
          symbol_en: deity.symbol_en,
          symbol_es: deity.symbol_es,
          worshipers_en: deity.worshipers_en,
          worshipers_es: deity.worshipers_es,
          home_plane_en: deity.home_plane_en,
          home_plane_es: deity.home_plane_es,
          description_en: deity.description_en,
          description_es: deity.description_es,
          teachings_en: deity.teachings_en,
          teachings_es: deity.teachings_es,
          clergy_en: deity.clergy_en,
          clergy_es: deity.clergy_es,
          temples_en: deity.temples_en,
          temples_es: deity.temples_es,
          rites_en: deity.rites_en,
          rites_es: deity.rites_es,
        }, {
          onConflict: 'slug'
        });

      if (error) {
        console.error('Error sincronizando:', error);
        setSyncStatus('error');
        setSyncMessage(`Error: ${error.message}`);
        setTimeout(() => setSyncStatus('idle'), 3000);
        return;
      }

      setSyncStatus('success');
      setSyncMessage(`✅ ${deity.name_es} sincronizado correctamente`);
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (err) {
      console.error('Error:', err);
      setSyncStatus('error');
      setSyncMessage('Error al sincronizar');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const handleDelete = (slug: string) => {
    if (confirm('¿Estás seguro de eliminar esta deidad?')) {
      const updatedDeities = deities.filter(d => d.slug !== slug);
      saveDeities(updatedDeities);
      if (selectedDeity?.slug === slug) {
        setSelectedDeity(null);
        setIsEditing(false);
      }
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(deities, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'deidades_dnd.json';
    link.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (Array.isArray(imported)) {
          saveDeities(imported);
          alert('Deidades importadas correctamente');
        }
      } catch (error) {
        alert('Error al importar el archivo');
      }
    };
    reader.readAsText(file);
  };

  const handleCreateNew = () => {
    const newDeity: Deity = {
      slug: 'nueva-deidad-' + Date.now(),
      name_en: 'New Deity',
      name_es: 'Nueva Deidad',
      rank: 'lesser',
      titles_en: '',
      titles_es: '',
      portfolio_en: '',
      portfolio_es: '',
      alignment: 'N',
      domains: [],
      favored_weapon: '',
      symbol_en: '',
      symbol_es: '',
      worshipers_en: '',
      worshipers_es: '',
      home_plane_en: '',
      home_plane_es: '',
      description_en: '',
      description_es: '',
    };
    setDeities([...deities, newDeity]);
    setSelectedDeity(newDeity);
    setIsEditing(true);
  };

  const filteredDeities = deities.filter(deity =>
    deity.name_es.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deity.name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const translatedCount = deities.filter(d =>
    d.name_es && d.name_es !== d.name_en &&
    d.description_es && d.description_es !== d.description_en
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-dungeon-900 via-dungeon-800 to-dungeon-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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
              Total: {deities.length} deidades | Traducidas: {translatedCount}
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
              onClick={handleCreateNew}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Nueva Deidad
            </button>
            <button
              onClick={handleExport}
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
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Deity List */}
          <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4">
            <input
              type="text"
              placeholder="Buscar deidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
            />
            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {filteredDeities.map((deity) => (
                <div
                  key={deity.slug}
                  onClick={() => {
                    setSelectedDeity(deity);
                    setIsEditing(false);
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedDeity?.slug === deity.slug
                      ? 'bg-gold-900/30 border border-gold-400'
                      : 'bg-dungeon-700 hover:bg-dungeon-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gold-300">
                        {deity.name_es || deity.name_en}
                      </div>
                      <div className="text-sm text-dungeon-400 flex items-center gap-2">
                        <span>{rankLabels[deity.rank]}</span>
                        <span>•</span>
                        <span
                          className="px-2 py-1 rounded text-xs font-semibold"
                          style={{
                            backgroundColor: ALIGNMENT_CONFIG[deity.alignment]?.hex + '30' || '#3d3d3d',
                            color: ALIGNMENT_CONFIG[deity.alignment]?.hex || '#9ca3af',
                            borderLeft: `3px solid ${ALIGNMENT_CONFIG[deity.alignment]?.hex || '#3d3d3d'}`,
                          }}
                        >
                          {alignmentLabels[deity.alignment]}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDeity(deity);
                          setIsEditing(true);
                        }}
                        className="p-1 hover:bg-dungeon-600 rounded"
                      >
                        <Pencil className="h-4 w-4 text-gold-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(deity.slug);
                        }}
                        className="p-1 hover:bg-red-900 rounded"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deity Editor */}
          {selectedDeity && (
            <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gold-400">
                  {isEditing ? 'Editar' : 'Ver'} Deidad
                </h2>
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    disabled={syncStatus === 'syncing'}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {syncStatus === 'syncing' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sincronizando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Guardar en Supabase
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-gold-600 hover:bg-gold-700 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                    Rango
                  </label>
                  <select
                    value={selectedDeity.rank}
                    onChange={(e) =>
                      setSelectedDeity({ ...selectedDeity, rank: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                  >
                    {Object.entries(rankLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                    Alineamiento
                  </label>
                  <select
                    value={selectedDeity.alignment}
                    onChange={(e) =>
                      setSelectedDeity({ ...selectedDeity, alignment: e.target.value })
                    }
                    disabled={!isEditing}
                    style={{
                      borderColor: selectedDeity.alignment && ALIGNMENT_CONFIG[selectedDeity.alignment]
                        ? ALIGNMENT_CONFIG[selectedDeity.alignment].hex
                        : '#3d3d3d',
                      backgroundColor: selectedDeity.alignment && ALIGNMENT_CONFIG[selectedDeity.alignment]
                        ? ALIGNMENT_CONFIG[selectedDeity.alignment].hex + '20'
                        : '#3d3d3d',
                    }}
                    className="w-full px-3 py-2 border-2 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    {Object.entries(alignmentLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Language Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('es')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'es'
                      ? 'bg-gold-600 text-white'
                      : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600'
                  }`}
                >
                  Español
                </button>
                <button
                  onClick={() => setActiveTab('en')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'en'
                      ? 'bg-gold-600 text-white'
                      : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600'
                  }`}
                >
                  English
                </button>
              </div>

              {/* Content Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={activeTab === 'es' ? selectedDeity.name_es : selectedDeity.name_en}
                      onChange={(e) =>
                        setSelectedDeity({
                          ...selectedDeity,
                          [activeTab === 'es' ? 'name_es' : 'name_en']: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                      Títulos
                    </label>
                    <input
                      type="text"
                      value={activeTab === 'es' ? selectedDeity.titles_es : selectedDeity.titles_en}
                      onChange={(e) =>
                        setSelectedDeity({
                          ...selectedDeity,
                          [activeTab === 'es' ? 'titles_es' : 'titles_en']: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                    Portfolio
                  </label>
                  <input
                    type="text"
                    value={activeTab === 'es' ? selectedDeity.portfolio_es : selectedDeity.portfolio_en}
                    onChange={(e) =>
                      setSelectedDeity({
                        ...selectedDeity,
                        [activeTab === 'es' ? 'portfolio_es' : 'portfolio_en']: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                      Símbolo
                    </label>
                    <input
                      type="text"
                      value={activeTab === 'es' ? selectedDeity.symbol_es : selectedDeity.symbol_en}
                      onChange={(e) =>
                        setSelectedDeity({
                          ...selectedDeity,
                          [activeTab === 'es' ? 'symbol_es' : 'symbol_en']: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                      Arma Predilecta
                    </label>
                    <input
                      type="text"
                      value={selectedDeity.favored_weapon}
                      onChange={(e) =>
                        setSelectedDeity({ ...selectedDeity, favored_weapon: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                    Dominios (separados por comas)
                  </label>
                  <input
                    type="text"
                    value={selectedDeity.domains.join(', ')}
                    onChange={(e) =>
                      setSelectedDeity({
                        ...selectedDeity,
                        domains: e.target.value.split(',').map(d => d.trim()).filter(d => d),
                      })
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                      Adoradores
                    </label>
                    <input
                      type="text"
                      value={activeTab === 'es' ? selectedDeity.worshipers_es : selectedDeity.worshipers_en}
                      onChange={(e) =>
                        setSelectedDeity({
                          ...selectedDeity,
                          [activeTab === 'es' ? 'worshipers_es' : 'worshipers_en']: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                      Plano Hogar
                    </label>
                    <input
                      type="text"
                      value={activeTab === 'es' ? selectedDeity.home_plane_es : selectedDeity.home_plane_en}
                      onChange={(e) =>
                        setSelectedDeity({
                          ...selectedDeity,
                          [activeTab === 'es' ? 'home_plane_es' : 'home_plane_en']: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                    Descripción
                  </label>
                  <RichTextEditor
                    value={activeTab === 'es' ? selectedDeity.description_es : selectedDeity.description_en}
                    onChange={(value) =>
                      setSelectedDeity({
                        ...selectedDeity,
                        [activeTab === 'es' ? 'description_es' : 'description_en']: value,
                      })
                    }
                    disabled={!isEditing}
                    height="400px"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}