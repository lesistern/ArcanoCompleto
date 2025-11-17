import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Shield, AlertCircle, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import skillsData from '@/lib/data/3.5/skills.json';
import { DnDSkill } from '@/lib/types/skill';
import { getSkillCategoryIcon, getSkillCategoryColor, getAbilityIcon, getClassColor, extractTextColor } from '@/lib/utils/icons';
import { getClassIcon } from '@/lib/utils/classIcons';

interface SkillPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Función helper para obtener clases completas de color para badges de habilidad
const getAbilityBadgeClasses = (ability: string) => {
  const colorMap: Record<string, string> = {
    'Fuerza': 'text-red-400 bg-red-500/20 border-red-500/30',
    'Destreza': 'text-green-400 bg-green-500/20 border-green-500/30',
    'Constitución': 'text-orange-400 bg-orange-500/20 border-orange-500/30',
    'Inteligencia': 'text-blue-400 bg-blue-500/20 border-blue-500/30',
    'Sabiduría': 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    'Carisma': 'text-pink-400 bg-pink-500/20 border-pink-500/30',
  };
  return colorMap[ability] || 'text-dungeon-400 bg-dungeon-800 border-dungeon-700';
};

// Función helper para convertir nombre de clase a slug
const getClassSlug = (className: string): string => {
  return className
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/\s+/g, '-'); // Reemplazar espacios por guiones
};

export default async function SkillPage({ params }: SkillPageProps) {
  const { slug } = await params;
  const skillData = (skillsData as DnDSkill[]).find(
    (s) => s.slug === slug
  );

  if (!skillData) {
    notFound();
  }

  const Icon = getSkillCategoryIcon(skillData.category);
  const categoryColor = getSkillCategoryColor(skillData.category);
  const iconColor = extractTextColor(categoryColor);
  const abilityColorClasses = getAbilityBadgeClasses(skillData.keyAbility);
  const AbilityIcon = getAbilityIcon(skillData.keyAbility);

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-8">
        <Link href="/habilidades">
          <Button variant="secondary">Volver a Habilidades</Button>
        </Link>
      </div>

      {/* Header */}
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <div className="flex items-center gap-4 mb-3">
          <Icon className={`h-8 w-8 ${iconColor}`} />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
            {skillData.name}
          </h1>
        </div>
        <p className="text-lg text-dungeon-300 mb-4">{skillData.shortDescription}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className={`px-3 py-1 rounded border font-semibold ${abilityColorClasses} flex items-center gap-1.5`}>
            <AbilityIcon className="h-4 w-4" />
            {skillData.keyAbility}
          </span>
          <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
            <span className="text-dungeon-500">Categoría:</span> {skillData.category}
          </span>
          {skillData.trainedOnly ? (
            <span className="px-3 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Solo entrenado
            </span>
          ) : (
            <span className="px-3 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
              <Check className="h-3 w-3" />
              Sin entrenamiento
            </span>
          )}
          {skillData.armorCheckPenalty && (
            <span className="px-3 py-1 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Penaliz. armadura
            </span>
          )}
        </div>
      </div>

      {/* Descripción */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Descripción</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dungeon-300 leading-relaxed">{skillData.description}</p>
        </CardContent>
      </Card>

      {/* Tirada y Acción */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tirada</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dungeon-300">{skillData.check}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Acción</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dungeon-300 mb-3">{skillData.action}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gold-500">Reintentar:</span>
              {skillData.retry ? (
                <span className="text-green-400 flex items-center gap-1">
                  <Check className="h-3 w-3" /> Sí
                </span>
              ) : (
                <span className="text-red-400 flex items-center gap-1">
                  <X className="h-3 w-3" /> No
                </span>
              )}
            </div>
            {skillData.retryDetails && (
              <p className="text-xs text-dungeon-400 mt-2">{skillData.retryDetails}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Usos de la Habilidad */}
      {skillData.uses && skillData.uses.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Usos de la Habilidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillData.uses.map((use, index) => (
                <div
                  key={index}
                  className="border-l-2 border-gold-500/30 pl-4 py-2"
                >
                  <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                    <h4 className="text-base font-semibold text-dungeon-100">{use.description}</h4>
                    {use.dc && (
                      <span className="text-xs px-2 py-0.5 rounded bg-spell-blue/20 text-spell-blue border border-spell-blue/30">
                        CD {use.dc}
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded bg-dungeon-800 text-dungeon-400 border border-dungeon-700">
                      {use.action}
                    </span>
                  </div>
                  {use.specialConditions && (
                    <p className="text-xs text-dungeon-400 italic">{use.specialConditions}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reglas Especiales */}
      {skillData.special && skillData.special.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Especial</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {skillData.special.map((rule, index) => (
                <li key={index} className="text-sm text-dungeon-300 flex gap-2">
                  <span className="text-gold-500">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Sinergia */}
      {((skillData.synergies && skillData.synergies.length > 0) ||
        (skillData.benefitsFrom && skillData.benefitsFrom.length > 0)) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sinergia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillData.synergies && skillData.synergies.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gold-500 mb-2">Otorga Bonificador a:</h4>
                <div className="space-y-2">
                  {skillData.synergies.map((synergy, index) => (
                    <div key={index} className="text-sm text-dungeon-300 bg-dungeon-800/30 rounded p-2">
                      <span className="text-green-400 font-semibold">+{synergy.bonus}</span> a{' '}
                      <span className="text-dungeon-100">{synergy.skill}</span>
                      {synergy.condition && (
                        <span className="text-dungeon-500 text-xs block mt-1">{synergy.condition}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skillData.benefitsFrom && skillData.benefitsFrom.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gold-500 mb-2">Recibe Bonificador de:</h4>
                <div className="space-y-2">
                  {skillData.benefitsFrom.map((synergy, index) => (
                    <div key={index} className="text-sm text-dungeon-300 bg-dungeon-800/30 rounded p-2">
                      <span className="text-green-400 font-semibold">+{synergy.bonus}</span> de{' '}
                      <span className="text-dungeon-100">{synergy.skill}</span>
                      {synergy.condition && (
                        <span className="text-dungeon-500 text-xs block mt-1">{synergy.condition}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Clases */}
      {skillData.classSkillFor && skillData.classSkillFor.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Habilidad de Clase Para</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skillData.classSkillFor.map((className) => {
                const ClassIcon = getClassIcon(getClassSlug(className));
                const classColor = getClassColor(className);
                const iconColor = extractTextColor(classColor);

                return (
                  <Link
                    key={className}
                    href={`/clases/${getClassSlug(className)}`}
                    className={`text-xs px-3 py-1 rounded border ${classColor} flex items-center gap-1.5 hover:opacity-80 transition-opacity`}
                  >
                    <ClassIcon className={`h-3 w-3 ${iconColor}`} />
                    {className}
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uso sin entrenamiento */}
      {skillData.untrainedUse && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Uso sin Entrenamiento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dungeon-300">{skillData.untrainedUse}</p>
          </CardContent>
        </Card>
      )}

      {/* Información de fuente */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-4 mb-8">
        <p className="text-xs text-dungeon-500">
          Fuente: {skillData.source.book}, página {skillData.source.page}
        </p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const skills = skillsData as DnDSkill[];

  return skills.map((skillData) => ({
    slug: skillData.slug,
  }));
}
