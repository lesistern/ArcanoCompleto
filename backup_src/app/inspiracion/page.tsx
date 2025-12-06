'use client';

import { useState, useEffect } from 'react';
import { Search, Sparkles, User, Heart, Swords, Shield, Wand2, BookOpen, Filter } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getCharacterTemplates, type CharacterTemplate } from '@/lib/services/templateService.client';
import { getClassIcon, getClassColor, extractTextColor } from '@/lib/utils/icons';
import { useCharacterStore } from '@/lib/store/characterStore';
import { getRaceBySlug } from '@/lib/services/raceService.client';
import { getAvailableClasses } from '@/lib/services/classService.client';
import type { AbilityScores } from '@/lib/utils/character';
import { useRouter } from 'next/navigation';

// Tags de plantillas (mantener mientras no estén en la base de datos)
const TEMPLATE_TAGS = [
  'combate',
  'magia',
  'furtividad',
  'social',
  'naturaleza',
  'divino',
  'versátil',
  'tanque',
  'daño',
  'soporte',
  'exploración',
  'control'
];

// Mapeo de nombres completos de alineamientos
const ALIGNMENT_NAMES: Record<string, string> = {
  'LG': 'Legal Bueno',
  'NG': 'Neutral Bueno',
  'CG': 'Caótico Bueno',
  'LN': 'Legal Neutral',
  'N': 'Neutral',
  'CN': 'Caótico Neutral',
  'LE': 'Legal Malvado',
  'NE': 'Neutral Malvado',
  'CE': 'Caótico Malvado'
};

// Colores de alineamiento
const ALIGNMENT_COLORS: Record<string, string> = {
  'LG': 'text-yellow-400 border-yellow-500/30',
  'NG': 'text-blue-400 border-blue-500/30',
  'CG': 'text-cyan-400 border-cyan-500/30',
  'LN': 'text-gray-400 border-gray-500/30',
  'N': 'text-green-400 border-green-500/30',
  'CN': 'text-orange-400 border-orange-500/30',
  'LE': 'text-red-400 border-red-500/30',
  'NE': 'text-purple-400 border-purple-500/30',
  'CE': 'text-pink-400 border-pink-500/30'
};

export default function InspiracionPage() {
  const router = useRouter();
  const { resetCharacter, setRace, setClass, setAlignment, setBaseAbilityScores } = useCharacterStore();

  const [templates, setTemplates] = useState<CharacterTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedAlignment, setSelectedAlignment] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Cargar plantillas al montar el componente
  useEffect(() => {
    setLoadingTemplates(true);
    getCharacterTemplates().then((fetchedTemplates) => {
      setTemplates(fetchedTemplates);
      setLoadingTemplates(false);
    }).catch(err => {
      console.error('Error fetching templates:', err);
      setTemplates([]);
      setLoadingTemplates(false);
    });
  }, []);

  // Filtrar plantillas
  const filteredTemplates = templates.filter(template => {
    const matchesSearch =
      template.template_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.concept.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass = selectedClass === 'all' || template.suggested_class === selectedClass;
    const matchesAlignment = selectedAlignment === 'all' || template.suggested_alignment === selectedAlignment;
    const matchesTag = selectedTag === 'all' || template.tags.includes(selectedTag);

    return matchesSearch && matchesClass && matchesAlignment && matchesTag;
  });

  // Obtener clases únicas
  const uniqueClassSlugs = Array.from(new Set(templates.map(t => t.suggested_class)));
  const uniqueClasses = uniqueClassSlugs.map(slug => {
    // Para el nombre, usar el slug convertido a título case
    const name = slug.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    return { slug, name };
  });

  // Obtener alineamientos únicos
  const uniqueAlignments = Array.from(new Set(templates.map(t => t.suggested_alignment)));

  /**
   * Aplica una plantilla y redirige al editor
   */
  async function applyTemplate(template: CharacterTemplate) {
    // Resetear personaje actual
    resetCharacter();

    const abilityScores: AbilityScores = {
      str: template.ability_scores.strength,
      dex: template.ability_scores.dexterity,
      con: template.ability_scores.constitution,
      int: template.ability_scores.intelligence,
      wis: template.ability_scores.wisdom,
      cha: template.ability_scores.charisma,
    };
    setBaseAbilityScores(abilityScores);

    // Aplicar valores de la plantilla
    const race = await getRaceBySlug(template.suggested_race);
    if (race) setRace(race);

    const classes = await getAvailableClasses();
    const selectedClass = classes.find(c => c.slug === template.suggested_class);
    if (selectedClass) setClass(selectedClass, 1);
    setAlignment(template.suggested_alignment);

    // Redirigir al editor
    router.push('/editor-personajes');
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header */}
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3 flex items-center gap-3">
          <Sparkles className="h-10 w-10 text-gold-400" />
          Pool de Inspiraciones
        </h1>
        <p className="text-lg text-dungeon-300">
          Plantillas predefinidas de personajes para ayudarte a empezar
        </p>
      </div>

      {/* Descripción */}
      <Card className="mb-8 bg-dungeon-800 border-dungeon-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <BookOpen className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
            <div className="text-dungeon-300">
              <p className="mb-3">
                ¿Bloqueado creando tu personaje? Explora estas <span className="text-gold-400 font-semibold">{templates.length} plantillas predefinidas</span> organizadas por clase y alineamiento.
              </p>
              <p className="text-sm">
                Cada plantilla incluye un concepto temático, distribución de habilidades (Point Buy 25 pts), skills recomendadas y dotes sugeridas. Selecciona una para pre-cargar el editor y personaliza a tu gusto.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card className="mb-8 bg-dungeon-800 border-dungeon-700">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dungeon-500" />
              <input
                type="text"
                placeholder="Buscar plantilla por nombre o concepto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>

            {/* Filtros en grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filtro por Clase */}
              <div>
                <label className="block text-sm font-semibold text-dungeon-300 mb-2 flex items-center gap-2">
                  <Swords className="h-4 w-4 text-gold-400" />
                  Clase
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="input"
                >
                  <option value="all">Todas las clases</option>
                  {uniqueClasses.map(({ slug, name }) => (
                    <option key={slug} value={slug}>{name}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Alineamiento */}
              <div>
                <label className="block text-sm font-semibold text-dungeon-300 mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  Alineamiento
                </label>
                <select
                  value={selectedAlignment}
                  onChange={(e) => setSelectedAlignment(e.target.value)}
                  className="input"
                >
                  <option value="all">Todos los alineamientos</option>
                  {uniqueAlignments.map(align => (
                    <option key={align} value={align}>{ALIGNMENT_NAMES[align] || align}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Tag */}
              <div>
                <label className="block text-sm font-semibold text-dungeon-300 mb-2 flex items-center gap-2">
                  <Filter className="h-4 w-4 text-purple-400" />
                  Estilo
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="input"
                >
                  <option value="all">Todos los estilos</option>
                  {TEMPLATE_TAGS.map(tag => (
                    <option key={tag} value={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contador de resultados */}
            <div className="text-sm text-dungeon-400 pt-2 border-t border-dungeon-700">
              {filteredTemplates.length} plantilla(s) encontrada(s)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de plantillas */}
      {loadingTemplates ? (
        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardContent className="pt-6 text-center">
            <Sparkles className="h-16 w-16 text-dungeon-600 mx-auto mb-4 animate-pulse" />
            <p className="text-dungeon-400">Cargando plantillas de personaje...</p>
          </CardContent>
        </Card>
      ) : filteredTemplates.length === 0 ? (
        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardContent className="pt-6 text-center">
            <Sparkles className="h-16 w-16 text-dungeon-600 mx-auto mb-4" />
            <p className="text-dungeon-400">No se encontraron plantillas con esos criterios</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedClass('all');
                setSelectedAlignment('all');
                setSelectedTag('all');
              }}
              className="mt-4 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded transition-colors"
            >
              Limpiar filtros
            </button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => {
            const ClassIcon = getClassIcon(template.suggested_class);
            const classColor = getClassColor(template.suggested_class);
            const iconColor = extractTextColor(classColor);
            const alignmentColor = ALIGNMENT_COLORS[template.suggested_alignment] || 'text-gray-400 border-gray-500/30';

            // Derive display names from slugs
            const className = template.suggested_class.split('-').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            const raceName = template.suggested_race.split('-').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');

            return (
              <Card
                key={template.id}
                className="hover:border-gold-500/50 transition-all bg-dungeon-800 border-dungeon-700 group cursor-pointer"
                onClick={() => applyTemplate(template)}
              >
                <CardHeader>
                  <div className="flex items-start gap-3 mb-3">
                    <ClassIcon className={`h-8 w-8 ${iconColor} flex-shrink-0`} />
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-gold-400 mb-1 font-heading">
                        {template.template_name}
                      </CardTitle>
                      <p className="text-sm text-dungeon-400 italic">
                        {template.concept}
                      </p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 text-xs rounded border ${classColor}`}>
                      {className}
                    </span>
                    <span className="px-2 py-1 text-xs rounded border text-green-400 border-green-500/30">
                      {raceName}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded border ${alignmentColor}`}>
                      {ALIGNMENT_NAMES[template.suggested_alignment] || template.suggested_alignment}
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Descripción */}
                  <p className="text-sm text-dungeon-300 mb-4">
                    {template.description}
                  </p>

                  {/* Habilidades principales */}
                  <div className="mb-4 pb-4 border-b border-dungeon-700">
                    <h4 className="text-xs font-semibold text-dungeon-400 uppercase tracking-wider mb-2 font-heading">
                      Habilidades principales
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {Object.entries(template.ability_scores)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([ability, value]) => (
                          <div key={ability} className="text-center">
                            <div className="text-dungeon-500 capitalize">{ability.slice(0, 3)}</div>
                            <div className="text-gold-400 font-semibold">{value}</div>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 4).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs rounded bg-dungeon-900 text-dungeon-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botón de acción */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      applyTemplate(template);
                    }}
                    className="w-full px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded transition-colors font-semibold flex items-center justify-center gap-2 group-hover:bg-gold-500"
                  >
                    <User className="h-4 w-4" />
                    Usar esta plantilla
                  </button>

                  <p className="text-xs text-center text-dungeon-500 mt-2">
                    Pre-carga el editor con esta configuración
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Footer info */}
      <Card className="mt-8 bg-dungeon-800/50 border-dungeon-700">
        <CardContent className="pt-6">
          <div className="text-sm text-dungeon-400">
            <p className="mb-2">
              <span className="text-gold-400 font-semibold">Tip:</span> Al seleccionar una plantilla, se pre-cargará el editor de personajes con:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Raza y clase sugeridas</li>
              <li>Alineamiento apropiado</li>
              <li>Distribución de habilidades (Point Buy 25 puntos)</li>
            </ul>
            <p className="mt-4 text-dungeon-500">
              Puedes modificar cualquier valor después de cargar la plantilla. Las plantillas son solo puntos de partida para inspirarte.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
