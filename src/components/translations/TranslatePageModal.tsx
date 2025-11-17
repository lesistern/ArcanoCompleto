'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { X, Save, Loader2, CheckCircle, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { UserProfile, EntityType, TranslationEdit } from '@/types/translations';

interface TranslatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  userProfile: UserProfile;
}

interface TranslatableField {
  key: string;
  label: string;
  currentValue: string;
  translatedValue: string | null;
  pendingSuggestions: TranslationEdit[];
}

interface PageEntity {
  type: EntityType;
  id: string;
  slug: string;
  fields: TranslatableField[];
}

export default function TranslatePageModal({
  isOpen,
  onClose,
  currentPage,
  userProfile,
}: TranslatePageModalProps) {
  const [entity, setEntity] = useState<PageEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (isOpen) {
      detectAndLoadEntity();
    }
  }, [isOpen, currentPage]);

  async function detectAndLoadEntity() {
    setLoading(true);
    try {
      // Detectar tipo de página desde la URL
      const pathParts = currentPage.split('/').filter(Boolean);

      if (pathParts.length === 0) {
        setEntity(null);
        return;
      }

      const entityTypeMap: Record<string, EntityType> = {
        'clases': 'class',
        'razas': 'race',
        'dotes': 'feat',
        'habilidades': 'skill',
        'conjuros': 'spell',
        'armas': 'weapon',
        'armaduras': 'armor',
        'monstruos': 'monster',
      };

      const entityType = entityTypeMap[pathParts[0]];
      if (!entityType || pathParts.length < 2) {
        setEntity(null);
        return;
      }

      const slug = pathParts[1];

      // Cargar la entidad desde Supabase
      const tableMap: Record<EntityType, string> = {
        class: 'classes',
        race: 'races',
        feat: 'feats',
        skill: 'skills',
        spell: 'spells',
        weapon: 'weapons',
        armor: 'armor',
        monster: 'monsters',
        magic_item: 'magic_items',
      };

      const table = tableMap[entityType];
      const { data: entityData, error } = await supabase
        .from(table)
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !entityData) {
        console.error('Error loading entity:', error);
        setEntity(null);
        return;
      }

      // Cargar sugerencias pendientes para esta entidad
      const { data: pendingEdits } = await supabase
        .from('translation_edits')
        .select(`
          *,
          submitter:profiles!translation_edits_submitted_by_fkey(id, display_name, tier_code)
        `)
        .eq('entity_type', entityType)
        .eq('entity_id', entityData.id)
        .eq('language_code', 'es')
        .eq('status', 'pending');

      // Construir campos traducibles
      const fields: TranslatableField[] = [];
      const fieldLabels: Record<string, string> = {
        name: 'Nombre',
        description: 'Descripción',
        benefit: 'Beneficio',
        special: 'Especial',
        normal: 'Normal',
      };

      for (const [key, label] of Object.entries(fieldLabels)) {
        const esKey = `${key}_es`;
        if (key in entityData) {
          const pendingSuggestionsForField = (pendingEdits || []).filter(
            (edit) => edit.field_name === esKey
          );

          fields.push({
            key: esKey,
            label,
            currentValue: entityData[key] || '',
            translatedValue: entityData[esKey] || null,
            pendingSuggestions: pendingSuggestionsForField as TranslationEdit[],
          });
        }
      }

      setEntity({
        type: entityType,
        id: entityData.id,
        slug: entityData.slug,
        fields,
      });
    } catch (error) {
      console.error('Error detecting entity:', error);
      setEntity(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSuggest(fieldKey: string) {
    if (!entity || !suggestions[fieldKey]) return;

    setSubmitting(true);
    try {
      const field = entity.fields.find((f) => f.key === fieldKey);
      if (!field) return;

      const { error } = await supabase
        .from('translation_edits')
        .insert({
          entity_type: entity.type,
          entity_id: entity.id,
          language_code: 'es',
          field_name: fieldKey,
          old_value: field.translatedValue || field.currentValue,
          new_value: suggestions[fieldKey],
          submitted_by: userProfile.id,
          status: 'pending',
          translation_method: 'manual',
        });

      if (error) throw error;

      alert('Sugerencia enviada exitosamente');
      setSuggestions({ ...suggestions, [fieldKey]: '' });
      await detectAndLoadEntity(); // Recargar
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      alert('Error al enviar la sugerencia');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleApprove(editId: string, fieldKey: string) {
    setSubmitting(true);
    try {
      const edit = entity?.fields
        .find((f) => f.key === fieldKey)
        ?.pendingSuggestions.find((s) => s.id === editId);

      if (!edit) return;

      // Aprobar la traducción
      const { error: approveError } = await supabase
        .from('translation_edits')
        .update({
          status: 'approved',
          reviewed_by: userProfile.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', editId);

      if (approveError) throw approveError;

      // Actualizar la entidad con la nueva traducción
      const tableMap: Record<EntityType, string> = {
        class: 'classes',
        race: 'races',
        feat: 'feats',
        skill: 'skills',
        spell: 'spells',
        weapon: 'weapons',
        armor: 'armor',
        monster: 'monsters',
        magic_item: 'magic_items',
      };

      const table = tableMap[entity!.type];
      const { error: updateError } = await supabase
        .from(table)
        .update({ [fieldKey]: edit.new_value })
        .eq('id', entity!.id);

      if (updateError) throw updateError;

      alert('Traducción aprobada y aplicada');
      await detectAndLoadEntity(); // Recargar
    } catch (error) {
      console.error('Error approving translation:', error);
      alert('Error al aprobar la traducción');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReject(editId: string) {
    const comment = prompt('Razón del rechazo:');
    if (!comment) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('translation_edits')
        .update({
          status: 'rejected',
          reviewed_by: userProfile.id,
          reviewed_at: new Date().toISOString(),
          review_comment: comment,
        })
        .eq('id', editId);

      if (error) throw error;

      alert('Traducción rechazada');
      await detectAndLoadEntity(); // Recargar
    } catch (error) {
      console.error('Error rejecting translation:', error);
      alert('Error al rechazar la traducción');
    } finally {
      setSubmitting(false);
    }
  }

  const isCollaborator = userProfile.tier_code === 'contributor';
  const isTranslator = userProfile.tier?.can_translate || false;
  const canApprove = userProfile.tier?.can_approve || ['reviewer', 'mod', 'admin'].includes(userProfile.tier_code);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-700">
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Languages className="w-6 h-6 text-purple-400" />
            Traducir esta página
          </CardTitle>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </CardHeader>

        <CardContent className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Cargando contenido traducible...</p>
            </div>
          ) : !entity ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-2">Esta página no es traducible</p>
              <p className="text-gray-500 text-sm">
                Solo puedes traducir páginas de detalle de clases, razas, dotes, etc.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Información de la entidad */}
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-300 text-sm mb-1">Traduciendo</p>
                <p className="text-white text-lg font-semibold">{entity.slug}</p>
                <p className="text-gray-400 text-sm">Tipo: {entity.type}</p>
              </div>

              {/* Info de permisos del usuario */}
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm mb-2">Tu rol: <span className="font-semibold">{userProfile.tier?.name}</span></p>
                <div className="text-sm text-gray-300 space-y-1">
                  {isCollaborator && !isTranslator && (
                    <p>✓ Puedes <span className="text-yellow-400">sugerir traducciones</span> (requieren aprobación)</p>
                  )}
                  {isTranslator && (
                    <p>✓ Puedes <span className="text-green-400">traducir directamente</span> (queda como texto extra)</p>
                  )}
                  {canApprove && (
                    <p>✓ Puedes <span className="text-purple-400">aprobar y aplicar traducciones</span></p>
                  )}
                </div>
              </div>

              {/* Campos traducibles */}
              {entity.fields.map((field) => (
                <div key={field.key} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">{field.label}</h3>

                  {/* Texto original */}
                  <div className="mb-3">
                    <p className="text-gray-400 text-sm mb-1">Original (inglés)</p>
                    <div className="bg-gray-700/50 border border-gray-600 rounded p-3">
                      <p className="text-gray-300 text-sm">{field.currentValue}</p>
                    </div>
                  </div>

                  {/* Texto traducido actual */}
                  {field.translatedValue && (
                    <div className="mb-3">
                      <p className="text-green-400 text-sm mb-1">Traducción actual</p>
                      <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
                        <p className="text-gray-300 text-sm">{field.translatedValue}</p>
                      </div>
                    </div>
                  )}

                  {/* Sugerencias pendientes */}
                  {field.pendingSuggestions.length > 0 && (
                    <div className="mb-3">
                      <p className="text-yellow-400 text-sm mb-2">
                        Sugerencias pendientes ({field.pendingSuggestions.length})
                      </p>
                      <div className="space-y-2">
                        {field.pendingSuggestions.map((suggestion) => (
                          <div
                            key={suggestion.id}
                            className="bg-yellow-900/20 border border-yellow-500/30 rounded p-3"
                          >
                            <p className="text-gray-300 text-sm mb-2">{suggestion.new_value}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-gray-400 text-xs">
                                Por {suggestion.submitter?.display_name} • {new Date(suggestion.submitted_at).toLocaleDateString('es-ES')}
                              </p>
                              {canApprove && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="success"
                                    onClick={() => handleApprove(suggestion.id, field.key)}
                                    disabled={submitting}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => handleReject(suggestion.id)}
                                    disabled={submitting}
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input para sugerir/traducir */}
                  {(isCollaborator || isTranslator) && (
                    <div>
                      <p className="text-gray-400 text-sm mb-2">
                        {isCollaborator && !isTranslator ? 'Tu sugerencia' : 'Tu traducción'}
                      </p>
                      <textarea
                        value={suggestions[field.key] || ''}
                        onChange={(e) => setSuggestions({ ...suggestions, [field.key]: e.target.value })}
                        rows={3}
                        placeholder={isCollaborator && !isTranslator ? 'Escribe tu sugerencia...' : 'Escribe tu traducción...'}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSuggest(field.key)}
                        disabled={submitting || !suggestions[field.key]}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isCollaborator && !isTranslator ? 'Enviar sugerencia' : 'Guardar traducción'}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
