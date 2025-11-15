/**
 * Página de demostración del sistema multiidioma
 * Muestra hechizos, clases y razas en el idioma seleccionado
 */

'use client';

import { useEffect, useState } from 'react';
import { LanguageSelector, useLocale } from '@/components/LanguageSelector';
import { createClient } from '@/lib/supabase/client';
import type { Locale } from '@/i18n/config';

interface SpellTranslation {
  spell_id: string;
  language_code: string;
  name: string;
  description: string | null;
  school?: string;
}

export default function I18nDemoPage() {
  const locale = useLocale();
  const [spells, setSpells] = useState<SpellTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchSpells() {
      setLoading(true);

      // Obtener 5 hechizos en el idioma actual
      const { data, error } = await supabase
        .from('spell_translations')
        .select('spell_id, language_code, name, description')
        .eq('language_code', locale)
        .limit(5);

      if (error) {
        console.error('Error fetching spells:', error);
      } else {
        setSpells(data || []);
      }

      setLoading(false);
    }

    fetchSpells();
  }, [locale, supabase]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Sistema Multiidioma
            </h1>
            <p className="mt-2 text-gray-600">
              Demostración del sistema de traducciones
            </p>
          </div>

          <LanguageSelector />
        </div>

        {/* Estadísticas */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Estadísticas
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Idioma actual</p>
              <p className="text-2xl font-bold text-indigo-600">
                {locale === 'en' ? '🇬🇧 English' : '🇪🇸 Español'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contenido traducido</p>
              <p className="text-2xl font-bold text-green-600">781 items</p>
            </div>
          </div>
        </div>

        {/* Lista de hechizos */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              🔮 Hechizos de muestra
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {locale === 'en'
                ? 'Showing 5 spells in English'
                : 'Mostrando 5 hechizos en Español'}
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="px-6 py-8 text-center text-gray-500">
                Cargando...
              </div>
            ) : spells.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No se encontraron hechizos
              </div>
            ) : (
              spells.map((spell) => (
                <div key={spell.spell_id} className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {spell.name}
                  </h3>
                  {spell.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {spell.description}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Información del sistema */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            ℹ️ Cómo funciona
          </h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• El idioma se guarda en <code className="bg-blue-100 px-1 rounded">localStorage</code></li>
            <li>• Las traducciones se obtienen de tablas <code className="bg-blue-100 px-1 rounded">*_translations</code></li>
            <li>• Fallback automático a inglés si no existe traducción</li>
            <li>• 781 items traducidos (605 hechizos, 11 clases, 16 razas, etc.)</li>
          </ul>
        </div>

        {/* Links */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
