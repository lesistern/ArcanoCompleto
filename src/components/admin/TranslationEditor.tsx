'use client';

import { useState } from 'react';
import { FormField } from './FormField';
import { LanguageSelector } from './LanguageSelector';
import { AlertCircle, CheckCircle2, Globe } from 'lucide-react';
import type { ValidationRules, ValidationErrors } from '@/lib/utils/validation';

interface DeityTranslation {
  id?: string;
  language_code: string;
  name: string;
  titles?: string;
  portfolio?: string;
  symbol?: string;
  worshipers?: string;
  home_plane?: string;
  description?: string;
  translation_status?: 'pending' | 'approved' | 'rejected';
  translation_quality?: number;
}

interface Language {
  code: string;
  name: string;
  native_name: string;
}

interface TranslationEditorProps {
  deityId: string;
  languages: Language[];
  initialTranslations?: Record<string, DeityTranslation>;
  onSave?: (language: string, data: DeityTranslation) => Promise<void>;
  disabled?: boolean;
  className?: string;
}

export function TranslationEditor({
  deityId,
  languages,
  initialTranslations = {},
  onSave,
  disabled = false,
  className = '',
}: TranslationEditorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]?.code || 'en');
  const [translations, setTranslations] = useState(initialTranslations);
  const [errors, setErrors] = useState<Record<string, ValidationErrors<DeityTranslation>>>({});
  const [touched, setTouched] = useState<Record<string, Record<string, boolean>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const current = translations[selectedLanguage] || {
    language_code: selectedLanguage,
    name: '',
  };

  // Validación de campos
  // Note: Using empty validation rules placeholder to prevent TypeScript errors
  // Full validation can be implemented later with proper validation library
  const validationRules: ValidationRules<DeityTranslation> = {
    name: [],
    titles: [],
    portfolio: [],
    symbol: [],
    worshipers: [],
    home_plane: [],
    description: [],
  };

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    setSaveSuccess(null);
    setSaveError(null);
  };

  const handleFieldChange = (field: keyof DeityTranslation, value: any) => {
    setTranslations((prev) => ({
      ...prev,
      [selectedLanguage]: {
        ...current,
        [field]: value,
      },
    }));
  };

  const handleFieldBlur = (field: keyof DeityTranslation) => {
    setTouched((prev) => ({
      ...prev,
      [selectedLanguage]: {
        ...(prev[selectedLanguage] || {}),
        [field]: true,
      },
    }));
  };

  const handleSave = async () => {
    if (!onSave) return;

    try {
      setIsSaving(true);
      setSaveError(null);

      // Validar campos requeridos
      if (!current.name || current.name.trim() === '') {
        setSaveError('El nombre es obligatorio');
        return;
      }

      await onSave(selectedLanguage, current);
      setSaveSuccess(`Traducción en ${languages.find((l) => l.code === selectedLanguage)?.native_name} guardada`);

      setTimeout(() => setSaveSuccess(null), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  const currentLanguage = languages.find((l) => l.code === selectedLanguage);
  const isSaved = translations[selectedLanguage]?.id !== undefined;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header con selector de idioma */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-gold-400" />
          <h3 className="text-lg font-semibold text-dungeon-100">Traducciones</h3>
        </div>

        <LanguageSelector
          languages={languages}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={handleLanguageChange}
          disabled={disabled}
          variant="tabs"
          showFlags={true}
        />
      </div>

      {/* Información de idioma seleccionado */}
      <div
        className={`
          p-3 rounded-lg border-l-4
          ${
            isSaved
              ? 'bg-green-900/30 border-green-500 text-green-200'
              : 'bg-orange-900/30 border-orange-500 text-orange-200'
          }
        `}
      >
        <div className="flex items-center gap-2">
          {isSaved ? (
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
          )}
          <div className="text-sm">
            {isSaved
              ? `Traducción guardada en ${currentLanguage?.native_name}`
              : `Traducción pendiente en ${currentLanguage?.native_name}`}
          </div>
        </div>
      </div>

      {/* Mensajes de feedback */}
      {saveSuccess && (
        <div className="p-3 rounded-lg bg-green-900/30 border border-green-600 text-green-200 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          {saveSuccess}
        </div>
      )}

      {saveError && (
        <div className="p-3 rounded-lg bg-red-900/30 border border-red-600 text-red-200 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {saveError}
        </div>
      )}

      {/* Formulario de traducción */}
      <div className="space-y-4 p-4 rounded-lg bg-dungeon-800/30 border border-dungeon-700">
        {/* Nombre */}
        <FormField
          label="Nombre"
          name="deity-name"
          value={current.name || ''}
          type="text"
          required
          maxLength={100}
          placeholder="Nombre de la deidad en este idioma"
          onChange={(e) => handleFieldChange('name', e.target.value)}
          onBlur={() => handleFieldBlur('name')}
          error={
            touched[selectedLanguage]?.name && !current.name
              ? 'El nombre es obligatorio'
              : null
          }
          showSuccess={!!current.name && (touched[selectedLanguage]?.name ?? false)}
          disabled={disabled}
          className="mb-4"
        />

        {/* Títulos */}
        <FormField
          label="Títulos"
          name="deity-titles"
          value={current.titles || ''}
          type="textarea"
          maxLength={255}
          placeholder="Títulos o epítetos de la deidad"
          onChange={(e) => handleFieldChange('titles', e.target.value)}
          onBlur={() => handleFieldBlur('titles')}
          disabled={disabled}
          className="mb-4"
        />

        {/* Portafolio */}
        <FormField
          label="Portafolio"
          name="deity-portfolio"
          value={current.portfolio || ''}
          type="textarea"
          maxLength={500}
          placeholder="Dominios y áreas de influencia"
          onChange={(e) => handleFieldChange('portfolio', e.target.value)}
          onBlur={() => handleFieldBlur('portfolio')}
          disabled={disabled}
          className="mb-4"
        />

        {/* Símbolo */}
        <FormField
          label="Símbolo"
          name="deity-symbol"
          value={current.symbol || ''}
          type="text"
          maxLength={100}
          placeholder="Símbolo sagrado de la deidad"
          onChange={(e) => handleFieldChange('symbol', e.target.value)}
          onBlur={() => handleFieldBlur('symbol')}
          disabled={disabled}
          className="mb-4"
        />

        {/* Adoradores */}
        <FormField
          label="Adoradores"
          name="deity-worshipers"
          value={current.worshipers || ''}
          type="text"
          maxLength={255}
          placeholder="Clérigos, paladines, etc."
          onChange={(e) => handleFieldChange('worshipers', e.target.value)}
          onBlur={() => handleFieldBlur('worshipers')}
          disabled={disabled}
          className="mb-4"
        />

        {/* Plano Hogar */}
        <FormField
          label="Plano Hogar"
          name="deity-home-plane"
          value={current.home_plane || ''}
          type="text"
          maxLength={100}
          placeholder="Plano de existencia de la deidad"
          onChange={(e) => handleFieldChange('home_plane', e.target.value)}
          onBlur={() => handleFieldBlur('home_plane')}
          disabled={disabled}
          className="mb-4"
        />

        {/* Descripción */}
        <FormField
          label="Descripción"
          name="deity-description"
          value={current.description || ''}
          type="textarea"
          maxLength={5000}
          placeholder="Descripción detallada de la deidad"
          onChange={(e) => handleFieldChange('description', e.target.value)}
          onBlur={() => handleFieldBlur('description')}
          disabled={disabled}
          className="mb-4"
        />
      </div>

      {/* Botones de acción */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={disabled || isSaving || !current.name}
          className={`
            flex-1 px-4 py-2 rounded-lg font-medium transition-all
            flex items-center justify-center gap-2
            ${
              disabled || isSaving || !current.name
                ? 'bg-dungeon-700 text-dungeon-400 cursor-not-allowed'
                : 'bg-gold-500 text-dungeon-900 hover:bg-gold-400 active:scale-95'
            }
          `}
        >
          {isSaving ? (
            <>
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Guardar Traducción
            </>
          )}
        </button>

        {isSaved && (
          <button
            onClick={() => {
              setTranslations((prev) => {
                const updated = { ...prev };
                delete updated[selectedLanguage];
                return updated;
              });
            }}
            disabled={disabled}
            className="px-4 py-2 rounded-lg font-medium transition-all
              bg-dungeon-700 text-dungeon-200 hover:bg-dungeon-600
              active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Información adicional */}
      <div className="text-xs text-dungeon-400 space-y-1">
        <p>💡 Tip: Completa primero el nombre (requerido), luego los otros campos</p>
        <p>🌐 Los cambios se guardan por idioma independientemente</p>
        <p>⏱️ Auto-guardado disponible con useAutoSave hook</p>
      </div>
    </div>
  );
}
