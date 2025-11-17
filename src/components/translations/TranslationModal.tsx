'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { X, Save, Search, Loader2 } from 'lucide-react';
import type { EntityType, TranslationMethod } from '@/types/translations';

interface TranslationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  editId?: string; // Si se pasa, se está editando
}

const ENTITY_TYPES = [
  { value: 'spell', label: 'Conjuros' },
  { value: 'class', label: 'Clases' },
  { value: 'race', label: 'Razas' },
  { value: 'feat', label: 'Dotes' },
  { value: 'skill', label: 'Habilidades' },
  { value: 'weapon', label: 'Armas' },
  { value: 'armor', label: 'Armaduras' },
  { value: 'monster', label: 'Monstruos' },
  { value: 'magic_item', label: 'Objetos Mágicos' },
] as const;

const FIELD_OPTIONS = [
  { value: 'name', label: 'Nombre' },
  { value: 'name_es', label: 'Nombre (ES)' },
  { value: 'description', label: 'Descripción' },
  { value: 'description_es', label: 'Descripción (ES)' },
  { value: 'benefit', label: 'Beneficio' },
  { value: 'benefit_es', label: 'Beneficio (ES)' },
] as const;

interface EntitySearchResult {
  id: string;
  name: string;
  name_es?: string;
  slug: string;
  type: EntityType;
}

export default function TranslationModal({ isOpen, onClose, onSuccess, editId }: TranslationModalProps) {
  const [entityType, setEntityType] = useState<EntityType>('spell');
  const [entityId, setEntityId] = useState('');
  const [fieldName, setFieldName] = useState('name_es');
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [translationMethod, setTranslationMethod] = useState<TranslationMethod>('manual');
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<EntitySearchResult[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<EntitySearchResult | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (editId) {
      loadEdit();
    }
  }, [editId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        searchEntities();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, entityType]);

  async function loadEdit() {
    if (!editId) return;

    const { data, error } = await supabase
      .from('translation_edits')
      .select('*')
      .eq('id', editId)
      .single();

    if (error) {
      console.error('Error loading edit:', error);
      return;
    }

    if (data) {
      setEntityType(data.entity_type as EntityType);
      setEntityId(data.entity_id);
      setFieldName(data.field_name);
      setOldValue(data.old_value || '');
      setNewValue(data.new_value);
      setTranslationMethod(data.translation_method as TranslationMethod || 'manual');
      setConfidenceScore(data.confidence_score);
    }
  }

  async function searchEntities() {
    setSearching(true);
    try {
      // Mapear el tipo de entidad a la tabla correspondiente
      const tableMap: Record<EntityType, string> = {
        spell: 'spells',
        class: 'classes',
        race: 'races',
        feat: 'feats',
        skill: 'skills',
        weapon: 'weapons',
        armor: 'armor',
        monster: 'monsters',
        magic_item: 'magic_items',
      };

      const table = tableMap[entityType];

      const { data, error } = await supabase
        .from(table)
        .select('id, slug, name, name_es')
        .or(`name.ilike.%${searchQuery}%,name_es.ilike.%${searchQuery}%,slug.ilike.%${searchQuery}%`)
        .limit(10);

      if (error) throw error;

      const results = (data || []).map(item => ({
        ...item,
        type: entityType,
      })) as EntitySearchResult[];

      setSearchResults(results);
    } catch (error) {
      console.error('Error searching entities:', error);
    } finally {
      setSearching(false);
    }
  }

  async function handleSelectEntity(entity: EntitySearchResult) {
    setSelectedEntity(entity);
    setEntityId(entity.id);
    setSearchQuery('');
    setSearchResults([]);

    // Cargar el valor actual del campo
    const tableMap: Record<EntityType, string> = {
      spell: 'spells',
      class: 'classes',
      race: 'races',
      feat: 'feats',
      skill: 'skills',
      weapon: 'weapons',
      armor: 'armor',
      monster: 'monsters',
      magic_item: 'magic_items',
    };

    const table = tableMap[entityType];

    const { data, error } = await supabase
      .from(table)
      .select(fieldName)
      .eq('id', entity.id)
      .single();

    if (data && !error) {
      setOldValue(data[fieldName] || '');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Debes iniciar sesión para crear traducciones');
        return;
      }

      const editData = {
        entity_type: entityType,
        entity_id: entityId,
        language_code: 'es',
        field_name: fieldName,
        old_value: oldValue || null,
        new_value: newValue,
        submitted_by: user.id,
        status: 'pending',
        translation_method: translationMethod,
        confidence_score: confidenceScore,
      };

      let result;
      if (editId) {
        // Actualizar traducción existente
        result = await supabase
          .from('translation_edits')
          .update(editData)
          .eq('id', editId);
      } else {
        // Crear nueva traducción
        result = await supabase
          .from('translation_edits')
          .insert(editData);
      }

      if (result.error) throw result.error;

      alert(editId ? 'Traducción actualizada exitosamente' : 'Traducción enviada exitosamente');
      onSuccess?.();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error submitting translation:', error);
      alert('Error al enviar la traducción: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setEntityType('spell');
    setEntityId('');
    setFieldName('name_es');
    setOldValue('');
    setNewValue('');
    setTranslationMethod('manual');
    setConfidenceScore(null);
    setSearchQuery('');
    setSearchResults([]);
    setSelectedEntity(null);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-gray-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-2xl text-white">
            {editId ? 'Editar traducción' : 'Nueva traducción'}
          </CardTitle>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Entidad */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de contenido *
              </label>
              <select
                value={entityType}
                onChange={(e) => {
                  setEntityType(e.target.value as EntityType);
                  setSelectedEntity(null);
                  setEntityId('');
                }}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {ENTITY_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Búsqueda de Entidad */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Buscar {ENTITY_TYPES.find(t => t.value === entityType)?.label} *
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Buscar ${ENTITY_TYPES.find(t => t.value === entityType)?.label.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!!selectedEntity}
                />
                {searching && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 animate-spin" />
                )}
              </div>

              {/* Resultados de Búsqueda */}
              {searchResults.length > 0 && (
                <div className="mt-2 bg-gray-800 border border-gray-700 rounded-lg max-h-64 overflow-y-auto">
                  {searchResults.map(result => (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => handleSelectEntity(result)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                    >
                      <p className="text-white font-medium">{result.name}</p>
                      {result.name_es && (
                        <p className="text-gray-400 text-sm">{result.name_es}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-1">{result.slug}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Entidad Seleccionada */}
              {selectedEntity && (
                <div className="mt-2 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{selectedEntity.name}</p>
                      {selectedEntity.name_es && (
                        <p className="text-gray-400 text-sm">{selectedEntity.name_es}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEntity(null);
                        setEntityId('');
                        setOldValue('');
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Campo a Traducir */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campo a traducir *
              </label>
              <select
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {FIELD_OPTIONS.map(field => (
                  <option key={field.value} value={field.value}>{field.label}</option>
                ))}
              </select>
            </div>

            {/* Valor Actual */}
            {oldValue && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Valor actual
                </label>
                <div className="p-3 bg-gray-800 border border-gray-700 rounded-lg">
                  <p className="text-gray-300">{oldValue}</p>
                </div>
              </div>
            )}

            {/* Nueva Traducción */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nueva traducción *
              </label>
              <textarea
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                rows={4}
                placeholder="Escribe la traducción aquí..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-gray-400 text-sm mt-1">
                {newValue.length} caracteres
              </p>
            </div>

            {/* Método de Traducción */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Método de traducción
              </label>
              <select
                value={translationMethod}
                onChange={(e) => setTranslationMethod(e.target.value as TranslationMethod)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="manual">Manual</option>
                <option value="deepl">DeepL</option>
                <option value="google">Google Translate</option>
                <option value="community">Comunidad</option>
              </select>
            </div>

            {/* Puntuación de Confianza */}
            {translationMethod !== 'manual' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Puntuación de confianza (0-1)
                </label>
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={confidenceScore || ''}
                  onChange={(e) => setConfidenceScore(e.target.value ? parseFloat(e.target.value) : null)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.95"
                />
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={loading || !entityId || !newValue}
                className="flex-1 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {editId ? 'Actualizar' : 'Enviar'} traducción
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
