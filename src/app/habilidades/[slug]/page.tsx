import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Shield, AlertCircle, Check, X, BookOpen, ChevronRight, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import { DnDSkill, SkillUse, SkillSynergy } from '@/lib/types/skill';
import { getSkillCategoryIcon, getSkillCategoryColor, getAbilityIcon, getClassColor, extractTextColor } from '@/lib/utils/icons';
import { getClassIcon } from '@/lib/utils/classIcons';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FormattedDescription } from '@/components/ui/FormattedDescription';

// Helper para detectar si un texto es positivo (bonus) o negativo (penalización)
const getSpecialItemStyle = (text: string): { color: string; icon: 'positive' | 'negative' | 'neutral' } => {
  // Patrones positivos: bonificadores, sinergias, ventajas
  const positivePatterns = [
    /\+\d+/,                           // +2, +4, etc.
    /sinergia/i,
    /bonificador/i,
    /bonus/i,
    /ventaja/i,
    /permite/i,
    /otorga/i,
    /recibe/i,
  ];

  // Patrones negativos: penalizaciones, restricciones, fallos
  const negativePatterns = [
    /-\d+/,                            // -2, -4, etc.
    /penaliza/i,
    /penalización/i,
    /fallo/i,
    /no puede/i,
    /imposible/i,
    /sin entrenamiento/i,
    /requiere/i,
    /restricción/i,
    /percance/i,
  ];

  const isPositive = positivePatterns.some(pattern => pattern.test(text));
  const isNegative = negativePatterns.some(pattern => pattern.test(text));

  // Si tiene ambos, es neutral
  if (isPositive && isNegative) {
    return { color: 'text-gray-300', icon: 'neutral' };
  }

  if (isPositive) {
    return { color: 'text-green-300', icon: 'positive' };
  }

  if (isNegative) {
    return { color: 'text-red-300', icon: 'negative' };
  }

  return { color: 'text-gray-300', icon: 'neutral' };
};

// Helper para obtener el estilo basado en la dificultad de CD
const getUseDifficultyStyle = (text: string): { color: string; icon: 'positive' | 'negative' | 'neutral' } => {
  // Extraer número de CD del texto
  const cdMatch = text.match(/CD\s*(\d+)/i);

  if (cdMatch) {
    const cdValue = parseInt(cdMatch[1], 10);

    // CD <= 10: Fácil (verde)
    if (cdValue <= 10) {
      return { color: 'text-green-300', icon: 'positive' };
    }
    // CD 11-19: Media (amarillo/neutral)
    if (cdValue <= 19) {
      return { color: 'text-yellow-300', icon: 'neutral' };
    }
    // CD >= 20: Difícil (rojo)
    return { color: 'text-red-300', icon: 'negative' };
  }

  // Sin CD explícita, usar estilo neutral
  return { color: 'text-gray-300', icon: 'neutral' };
};

export const revalidate = 86400; // Revalidate every 24 hours

interface SkillPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Función helper para convertir nombre de clase a slug
const getClassSlug = (className: string): string => {
  return className
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/\s+/g, '-'); // Reemplazar espacios por guiones
};

// Función helper para convertir nombre de habilidad a slug
const getSkillSlug = (skillName: string): string => {
  return skillName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/\s+/g, '-') // Reemplazar espacios por guiones
    .replace(/[()]/g, ''); // Eliminar paréntesis
};

export default async function SkillPage({ params }: SkillPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: skillData, error } = await supabase
    .from('v_skills')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !skillData) {
    notFound();
  }

  const Icon = getSkillCategoryIcon(skillData.category);
  const categoryColor = getSkillCategoryColor(skillData.category);
  const iconColor = extractTextColor(categoryColor);
  const AbilityIcon = getAbilityIcon(skillData.keyAbility);

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl space-y-8">
      <Breadcrumbs items={[
        { label: 'Habilidades', href: '/habilidades' },
        { label: skillData.name }
      ]} />

      {/* Hero Header */}
      <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
          <div className={`p-4 rounded-xl bg-dungeon-950 border border-dungeon-800 shadow-lg ${iconColor}`}>
            <Icon className="h-10 w-10 md:h-12 md:w-12" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-dungeon-800 border border-dungeon-700 text-xs font-bold uppercase tracking-wider text-gray-400">
                {skillData.category}
              </span>
              {skillData.trainedOnly && (
                <span className="px-3 py-1 rounded-full bg-red-950/30 border border-red-900/50 text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3" /> Solo Entrenado
                </span>
              )}
              {skillData.armorCheckPenalty && (
                <span className="px-3 py-1 rounded-full bg-orange-950/30 border border-orange-900/50 text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                  <Shield className="h-3 w-3" /> Penaliz. Armadura
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-300 leading-tight">
              {skillData.name}
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              {skillData.shortDescription}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dungeon-950/50 border border-dungeon-800">
                <span className="text-sm text-gray-500 uppercase tracking-wider font-bold">Característica Clave:</span>
                <span className="text-gold-500 font-bold flex items-center gap-2">
                  <AbilityIcon className="h-4 w-4" />
                  {skillData.keyAbility}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Descripción */}
          <Card className="border-dungeon-800 bg-dungeon-900/40 backdrop-blur-sm">
            <CardHeader className="border-b border-dungeon-800/50 pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <BookOpen className="h-5 w-5 text-gold-500" />
                Descripción
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <FormattedDescription
                text={skillData.description}
                className="text-base"
                excludeSkillSlug={slug}
              />
            </CardContent>
          </Card>

          {/* Usos de la Habilidad */}
          {skillData.uses && skillData.uses.length > 0 && (
            <Card className="border-dungeon-800 bg-dungeon-900/40 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-dungeon-800/50 pb-4 bg-dungeon-950/30">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Check className="h-5 w-5 text-gold-500" />
                  Usos y Pruebas
                </CardTitle>
              </CardHeader>
              {/* Detectar si uses son strings o objetos */}
              {typeof skillData.uses[0] === 'string' ? (
                // Renderizar como lista de strings con colores por dificultad
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    {skillData.uses.map((use: string, index: number) => {
                      const style = getUseDifficultyStyle(use);
                      const leftBorderColor = style.icon === 'positive' ? 'border-l-green-500' : style.icon === 'negative' ? 'border-l-red-500' : 'border-l-yellow-500/60';
                      return (
                        <div key={index} className={`flex gap-3 py-2 pl-3 border-l-2 ${leftBorderColor} hover:opacity-80 transition-opacity`}>
                          <div className="mt-0.5 flex-shrink-0">
                            {style.icon === 'positive' && (
                              <TrendingUp className="h-4 w-4 text-green-400" />
                            )}
                            {style.icon === 'negative' && (
                              <TrendingDown className="h-4 w-4 text-red-400" />
                            )}
                            {style.icon === 'neutral' && (
                              <div className="min-w-[6px] h-[6px] rounded-full bg-yellow-500/60 mt-1.5"></div>
                            )}
                          </div>
                          <div className={`${style.color} text-base leading-relaxed`}>
                            <FormattedDescription text={use} className="text-base" excludeSkillSlug={slug} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              ) : (
                // Renderizar como tabla de objetos SkillUse
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-dungeon-950/50 text-gray-400 uppercase tracking-wider text-xs font-bold">
                      <tr>
                        <th className="px-6 py-4">Tarea / Uso</th>
                        <th className="px-6 py-4 w-32">CD</th>
                        <th className="px-6 py-4 w-40">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dungeon-800/50">
                      {skillData.uses.map((use: SkillUse, index: number) => (
                        <tr key={index} className="hover:bg-dungeon-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-300 text-base mb-1">{use.description}</div>
                            {use.specialConditions && (
                              <div className="text-gray-400 italic text-xs">{use.specialConditions}</div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {use.dc ? (
                              <span className="inline-block px-2 py-1 rounded bg-dungeon-950 border border-dungeon-800 text-gold-500 font-bold font-mono">
                                {use.dc}
                              </span>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-gray-400">
                            {use.action}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}

          {/* Reglas Especiales */}
          {skillData.special && skillData.special.length > 0 && (
            <Card className="border-dungeon-800 bg-dungeon-900/40 backdrop-blur-sm">
              <CardHeader className="border-b border-dungeon-800/50 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Info className="h-5 w-5 text-gold-500" />
                  Especial
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {skillData.special.map((rule: string, index: number) => {
                    const style = getSpecialItemStyle(rule);
                    const leftBorderColor = style.icon === 'positive' ? 'border-l-green-500' : style.icon === 'negative' ? 'border-l-red-500' : 'border-l-gold-500/50';
                    return (
                      <div
                        key={index}
                        className={`flex gap-3 py-2 pl-3 border-l-2 ${leftBorderColor} hover:opacity-80 transition-opacity`}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {style.icon === 'positive' && (
                            <TrendingUp className="h-4 w-4 text-green-400" />
                          )}
                          {style.icon === 'negative' && (
                            <TrendingDown className="h-4 w-4 text-red-400" />
                          )}
                          {style.icon === 'neutral' && (
                            <div className="min-w-[6px] h-[6px] rounded-full bg-gold-500/60 mt-1.5"></div>
                          )}
                        </div>
                        <div className={`${style.color} leading-relaxed text-base`}>
                          <FormattedDescription text={rule} className="text-base" excludeSkillSlug={slug} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mecánicas */}
          <Card className="border-dungeon-800 bg-dungeon-900/40 backdrop-blur-sm">
            <CardHeader className="border-b border-dungeon-800/50 pb-4">
              <CardTitle className="text-lg">Mecánicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h4 className="text-sm font-bold text-gold-500/80 uppercase tracking-wider mb-2">Tirada</h4>
                <div className="text-gray-300 text-sm leading-relaxed">
                  <FormattedDescription text={skillData.check} className="text-sm" excludeSkillSlug={slug} />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gold-500/80 uppercase tracking-wider mb-2">Acción</h4>
                <div className="text-gray-300 text-sm leading-relaxed">
                  <FormattedDescription text={skillData.action} className="text-sm" excludeSkillSlug={slug} />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gold-500/80 uppercase tracking-wider mb-2">Reintentar</h4>
                <div className="flex items-center gap-2 mb-2">
                  {skillData.retry ? (
                    <span className="text-green-400 font-bold flex items-center gap-1.5 text-sm bg-green-950/30 px-2 py-1 rounded border border-green-900/50">
                      <Check className="h-4 w-4" /> Sí
                    </span>
                  ) : (
                    <span className="text-red-400 font-bold flex items-center gap-1.5 text-sm bg-red-950/30 px-2 py-1 rounded border border-red-900/50">
                      <X className="h-4 w-4" /> No
                    </span>
                  )}
                </div>
                {skillData.retryDetails && (
                  <div className="text-gray-400 text-xs leading-relaxed pl-1 border-l-2 border-dungeon-700">
                    <FormattedDescription text={skillData.retryDetails} className="text-xs" excludeSkillSlug={slug} />
                  </div>
                )}
              </div>

              {skillData.untrainedUse && (
                <div>
                  <h4 className="text-sm font-bold text-gold-500/80 uppercase tracking-wider mb-2">Sin Entrenamiento</h4>
                  <div className="text-gray-300 text-sm leading-relaxed">
                    <FormattedDescription text={skillData.untrainedUse} className="text-sm" excludeSkillSlug={slug} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Restricción */}
          {skillData.restriction && (
            <Card className="border-dungeon-800 bg-dungeon-900/40 backdrop-blur-sm border-l-4 border-l-orange-500/60">
              <CardHeader className="border-b border-dungeon-800/50 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Restricción
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-gray-300 text-sm leading-relaxed">
                  <FormattedDescription text={skillData.restriction} className="text-sm" excludeSkillSlug={slug} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sinergias */}
          {((skillData.synergies && skillData.synergies.length > 0) ||
            (skillData.benefitsFrom && skillData.benefitsFrom.length > 0)) && (
              <Card className="border-dungeon-800 bg-dungeon-900/40 backdrop-blur-sm">
                <CardHeader className="border-b border-dungeon-800/50 pb-4">
                  <CardTitle className="text-lg">Sinergias</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {skillData.synergies && skillData.synergies.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-gold-500 uppercase tracking-wider mb-3">Otorga Bonificador (+2) a:</h4>
                      <div className="space-y-2">
                        {skillData.synergies.map((synergy: SkillSynergy, index: number) => {
                          const synergySlug = getSkillSlug(synergy.skill);
                          const isSelf = synergySlug === slug;
                          return (
                            <div key={index} className="text-sm p-3 rounded bg-dungeon-950/50 border border-dungeon-800">
                              {isSelf ? (
                                <div className="font-semibold text-gray-300">{synergy.skill}</div>
                              ) : (
                                <Link
                                  href={`/habilidades/${synergySlug}`}
                                  className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                  {synergy.skill}
                                </Link>
                              )}
                              {synergy.condition && (
                                <div className="text-gray-500 text-xs mt-1">{synergy.condition}</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {skillData.benefitsFrom && skillData.benefitsFrom.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-gold-500 uppercase tracking-wider mb-3">Recibe Bonificador (+2) de:</h4>
                      <div className="space-y-2">
                        {skillData.benefitsFrom.map((synergy: SkillSynergy, index: number) => {
                          const synergySlug = getSkillSlug(synergy.skill);
                          const isSelf = synergySlug === slug;
                          return (
                            <div key={index} className="text-sm p-3 rounded bg-dungeon-950/50 border border-dungeon-800">
                              {isSelf ? (
                                <div className="font-semibold text-gray-300">{synergy.skill}</div>
                              ) : (
                                <Link
                                  href={`/habilidades/${synergySlug}`}
                                  className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                  {synergy.skill}
                                </Link>
                              )}
                              {synergy.condition && (
                                <div className="text-gray-500 text-xs mt-1">{synergy.condition}</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

          {/* Clases */}
          {skillData.classSkillFor && skillData.classSkillFor.length > 0 && (
            <Card className="border-dungeon-800 bg-dungeon-900/40 backdrop-blur-sm">
              <CardHeader className="border-b border-dungeon-800/50 pb-4">
                <CardTitle className="text-lg">Habilidad de Clase</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {skillData.classSkillFor.map((className: string) => {
                    const ClassIcon = getClassIcon(getClassSlug(className));
                    const classColor = getClassColor(className);
                    const iconColor = extractTextColor(classColor);

                    return (
                      <Link
                        key={className}
                        href={`/clases/${getClassSlug(className)}`}
                        className={`text-xs px-3 py-1.5 rounded border bg-dungeon-950/50 border-dungeon-800 text-gray-400 hover:border-gold-500/50 hover:text-gold-500 transition-all flex items-center gap-2 group`}
                      >
                        <ClassIcon className={`h-3 w-3 ${iconColor} group-hover:text-gold-500 transition-colors`} />
                        {className}
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fuente */}
          <div className="text-center">
            <p className="text-xs text-gray-500 font-mono">
              Fuente: {skillData.source.book}, pág. {skillData.source.page}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const supabase = await createStaticClient();
  const { data: skills } = await supabase.from('v_skills').select('slug');

  return (skills || []).map((skill) => ({
    slug: skill.slug,
  }));
}
