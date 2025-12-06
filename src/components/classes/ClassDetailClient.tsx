// 'use client' directive for Next.js client component
'use client';

import { useMemo, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Swords, Sparkles, Users, ChevronDown, ChevronUp, X, Brain, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getDiceIcon } from '@/lib/utils/diceIcons';
import { getSkillCategoryIcon, getSkillCategoryColor } from '@/lib/utils/icons';
import type { DnDSkill, SkillCategory } from '@/lib/types/skill';
import VariantCard from './VariantCard';
import { translateAbilities, translateAbility } from '@/lib/translations/class-abilities';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';

// Types for progression rows and class features
type PsionicProgression = {
    power_points: number;
    powers_known: number;
    max_power_level: number;
};

type ProgressionRow = {
    level: number;
    baseAttackBonus: string;
    fortitudeSave: number;
    reflexSave: number;
    willSave: number;
    special: string[];
    psionicProgression?: PsionicProgression;
    [key: string]: any;
};

type Feature = {
    name: string;
    description: string;
    level?: number;
    shortDescription?: string;
};

interface ClassData {
    id: string;
    name: string;
    slug: string;
    hitDie: string;
    skillPoints: number;
    skillPointsFirstLevel?: number;
    classSkills: string[];
    weaponProficiencies: string[];
    armorProficiencies: string[];
    proficiencyRestrictions?: string;
    description: string;
    babProgression: 'good' | 'medium' | 'poor';
    fortitudeSave: 'good' | 'poor';
    reflexSave: 'good' | 'poor';
    willSave: 'good' | 'poor';
    levelProgression: ProgressionRow[];
    classFeatures: Feature[];
    tiene_magia?: boolean;
    spellcastingType?: 'si' | 'no' | 'variante';
}

interface BarbarianVariants {
    variantClasses: Array<{ name: string; slug: string; level: string; replaces: string; benefit: string }>;
    alternativeFeatures: Array<{ name: string; slug: string; level: string; replaces: string; benefit: string }>;
    substitutionLevels: Array<{ name: string; slug: string; levels: string; requirements: string; features: string }>;
}

interface ClassDetailClientProps {
    classData: ClassData;
    variants?: BarbarianVariants;
    iconColor: string;
    skillsData: DnDSkill[];
    hasProgressionData?: boolean;
    hasFeaturesData?: boolean;
}

// Helper to generate URL slugs from names
const generateSlug = (name: string) =>
    name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

export default function ClassDetailClient({
    classData,
    variants,
    iconColor,
    skillsData,
    hasProgressionData = true,
    hasFeaturesData = true,
}: ClassDetailClientProps) {
    const DiceIcon = getDiceIcon(classData.hitDie);
    // const isBarbarian = classData.slug === 'barbaro'; // Removed specific check
    const [isProgressionOpen, setIsProgressionOpen] = useState(false);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const [isSpellsOpen, setIsSpellsOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Ref para scroll a la sección de rasgos
    const featuresCardRef = useRef<HTMLDivElement>(null);

    // Función para hacer scroll a un rasgo específico y abrir el modal
    const handleScrollToFeature = useCallback((abilityName: string) => {
        // Buscar el rasgo que coincida con el nombre
        const allFeatures = [...classData.classFeatures];
        const matchedFeature = allFeatures.find(feat =>
            feat.name.toLowerCase() === abilityName.toLowerCase() ||
            translateAbility(feat.name).toLowerCase() === abilityName.toLowerCase()
        );

        // Abrir la sección de rasgos si está cerrada
        if (!isFeaturesOpen) {
            setIsFeaturesOpen(true);
        }

        // Esperar a que se abra la sección y hacer scroll
        setTimeout(() => {
            if (featuresCardRef.current) {
                featuresCardRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Si encontramos el rasgo, abrir el modal
            if (matchedFeature) {
                setTimeout(() => {
                    setSelectedFeature(matchedFeature);
                    setIsModalOpen(true);
                }, 300);
            }
        }, 100);
    }, [classData.classFeatures, isFeaturesOpen]);

    // Check if class has spells data
    const hasSpellsData = useMemo(() => {
        return classData.levelProgression.some(row =>
            row.spellsPerDay && Object.keys(row.spellsPerDay).length > 0
        );
    }, [classData.levelProgression]);

    // Check if class has psionic data
    const hasPsionicData = useMemo(() => {
        return classData.levelProgression.some(row =>
            row.psionicProgression &&
            (row.psionicProgression.power_points !== undefined ||
             row.psionicProgression.powers_known !== undefined ||
             row.psionicProgression.max_power_level !== undefined)
        );
    }, [classData.levelProgression]);

    // Get spell levels that exist in the progression data
    const spellLevels = useMemo(() => {
        if (!hasSpellsData) return [];
        const levels = new Set<string>();
        classData.levelProgression.forEach(row => {
            if (row.spellsPerDay) {
                Object.keys(row.spellsPerDay).forEach(level => levels.add(level));
            }
        });
        return Array.from(levels).sort((a, b) => parseInt(a) - parseInt(b));
    }, [classData.levelProgression, hasSpellsData]);

    // Compute skill icons and colors (currently not rendered but kept for future use)
    const skillsWithIcons = useMemo(() => {
        return classData.classSkills.map((skill) => {
            const skillMeta = skillsData.find((s) => s.name.toLowerCase() === skill.toLowerCase());
            const category = skillMeta?.category as SkillCategory | undefined;
            const IconSkill = category ? getSkillCategoryIcon(category) : null;
            const colorClasses = category ? getSkillCategoryColor(category) : 'bg-dungeon-800 text-dungeon-300 border-dungeon-700';
            const skillSlug = generateSlug(skill);
            return { skill, IconSkill, colorClasses, skillSlug };
        });
    }, [classData.classSkills, skillsData]);

    // Group class features by level
    // Level 1 features are treated as "base class features"
    // Level 2+ features are "progression features" gained at specific levels
    const featuresByLevel = useMemo(() => {
        const baseFeatures: Feature[] = []; // Level 1 or no level = base class features
        const progressionFeatures: Record<number, Feature[]> = {}; // Level 2+ = gained at that level

        classData.classFeatures.forEach(feat => {
            if (feat.level && feat.level > 1) {
                // Features gained at level 2+
                if (!progressionFeatures[feat.level]) {
                    progressionFeatures[feat.level] = [];
                }
                progressionFeatures[feat.level].push(feat);
            } else {
                // Level 1 or no level = base class features
                baseFeatures.push(feat);
            }
        });

        // Convert progression to array sorted by level
        const levels = Object.entries(progressionFeatures)
            .map(([level, features]) => ({ level: parseInt(level), features }))
            .sort((a, b) => a.level - b.level);

        return { levels, baseFeatures };
    }, [classData.classFeatures]);

    // Level progression - Mobile cards + Desktop table
    const levelProgressionContent = useMemo(() => {
        // Renderiza habilidades como enlaces clickeables
        const renderClickableAbilities = (special: string | string[]) => {
            if (!special) return '-';

            const abilities = Array.isArray(special) ? special : [special];
            if (abilities.length === 0) return '-';

            return abilities.map((ability, idx) => {
                const translatedAbility = translateAbility(ability);
                // Verificar si existe un rasgo con este nombre
                const hasMatchingFeature = classData.classFeatures.some(feat =>
                    feat.name.toLowerCase() === ability.toLowerCase() ||
                    feat.name.toLowerCase() === translatedAbility.toLowerCase() ||
                    translateAbility(feat.name).toLowerCase() === translatedAbility.toLowerCase()
                );

                return (
                    <span key={idx}>
                        {idx > 0 && ', '}
                        {hasMatchingFeature ? (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleScrollToFeature(translatedAbility);
                                }}
                                className="text-gold-400 hover:text-gold-300 hover:underline cursor-pointer transition-colors"
                                title="Click para ver detalle"
                            >
                                {translatedAbility}
                            </button>
                        ) : (
                            <span>{translatedAbility}</span>
                        )}
                    </span>
                );
            });
        };

        return (
            <>
                {/* Mobile: Cards */}
                <div className="md:hidden space-y-3">
                    {classData.levelProgression.map((row) => {
                        const hasSpecial = row.special && (Array.isArray(row.special) ? row.special.length > 0 : row.special !== '-');
                        const hasPsionic = row.psionicProgression && (
                            row.psionicProgression.power_points !== undefined ||
                            row.psionicProgression.powers_known !== undefined
                        );
                        return (
                            <div
                                key={row.level}
                                className="bg-dungeon-900/40 border border-dungeon-700 rounded-lg p-3"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gold-400 font-bold text-lg">
                                        Nivel {row.level}
                                    </span>
                                    <span className="text-dungeon-200 text-sm">
                                        BAB: <span className="text-dungeon-100 font-mono">{row.baseAttackBonus}</span>
                                    </span>
                                </div>
                                <div className="flex gap-4 mb-2 text-sm">
                                    <span className="text-dungeon-400">
                                        Fort: <span className="text-green-400 font-medium">+{row.fortitudeSave}</span>
                                    </span>
                                    <span className="text-dungeon-400">
                                        Ref: <span className="text-blue-400 font-medium">+{row.reflexSave}</span>
                                    </span>
                                    <span className="text-dungeon-400">
                                        Vol: <span className="text-purple-400 font-medium">+{row.willSave}</span>
                                    </span>
                                </div>
                                {/* Psionic progression for mobile */}
                                {hasPsionic && (
                                    <div className="grid grid-cols-3 gap-2 mb-2 text-center">
                                        <div className="p-2 rounded bg-purple-900/30 border border-purple-700/50">
                                            <span className="text-[10px] text-purple-300 block mb-1">PP/Día</span>
                                            <span className="text-dungeon-100 font-mono text-sm">{row.psionicProgression?.power_points ?? '-'}</span>
                                        </div>
                                        <div className="p-2 rounded bg-purple-900/30 border border-purple-700/50">
                                            <span className="text-[10px] text-purple-300 block mb-1">Poderes</span>
                                            <span className="text-dungeon-100 font-mono text-sm">{row.psionicProgression?.powers_known ?? '-'}</span>
                                        </div>
                                        <div className="p-2 rounded bg-purple-900/30 border border-purple-700/50">
                                            <span className="text-[10px] text-purple-300 block mb-1">Niv. Máx</span>
                                            <span className="text-dungeon-100 font-mono text-sm">{row.psionicProgression?.max_power_level ? `${row.psionicProgression.max_power_level}º` : '-'}</span>
                                        </div>
                                    </div>
                                )}
                                {hasSpecial && (
                                    <div className="text-sm border-t border-dungeon-700 pt-2 mt-2">
                                        <span className="text-gold-500 font-medium">Especial: </span>
                                        <span className="text-dungeon-200">{renderClickableAbilities(row.special)}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Desktop: Table */}
                <div className="hidden md:block w-full overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-dungeon-900 text-dungeon-100">
                            <tr>
                                <th className="px-3 py-2 border border-dungeon-700 font-semibold">Nivel</th>
                                <th className="px-3 py-2 border border-dungeon-700 font-semibold">BAB</th>
                                <th className="px-3 py-2 border border-dungeon-700 font-semibold">Fort</th>
                                <th className="px-3 py-2 border border-dungeon-700 font-semibold">Ref</th>
                                <th className="px-3 py-2 border border-dungeon-700 font-semibold">Vol</th>
                                {/* Psionic columns - only show if class has psionic data */}
                                {hasPsionicData && (
                                    <>
                                        <th className="px-3 py-2 border border-dungeon-700 font-semibold text-center text-purple-400">PP/Día</th>
                                        <th className="px-3 py-2 border border-dungeon-700 font-semibold text-center text-purple-400">Poderes</th>
                                        <th className="px-3 py-2 border border-dungeon-700 font-semibold text-center text-purple-400">Niv. Máx</th>
                                    </>
                                )}
                                <th className="px-3 py-2 border border-dungeon-700 font-semibold">Especial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classData.levelProgression.map((row) => (
                                <tr
                                    key={row.level}
                                    className="odd:bg-dungeon-900/40 even:bg-dungeon-900/20 hover:bg-dungeon-800/40 transition-colors"
                                >
                                    <td className="px-3 py-2 border border-dungeon-800 text-dungeon-100 font-medium">
                                        {row.level}º
                                    </td>
                                    <td className="px-3 py-2 border border-dungeon-800 text-dungeon-200">{row.baseAttackBonus}</td>
                                    <td className="px-3 py-2 border border-dungeon-800 text-dungeon-200">+{row.fortitudeSave}</td>
                                    <td className="px-3 py-2 border border-dungeon-800 text-dungeon-200">+{row.reflexSave}</td>
                                    <td className="px-3 py-2 border border-dungeon-800 text-dungeon-200">+{row.willSave}</td>
                                    {/* Psionic data columns */}
                                    {hasPsionicData && (
                                        <>
                                            <td className="px-3 py-2 border border-dungeon-800 text-purple-300 text-center font-mono">
                                                {row.psionicProgression?.power_points ?? '-'}
                                            </td>
                                            <td className="px-3 py-2 border border-dungeon-800 text-purple-300 text-center font-mono">
                                                {row.psionicProgression?.powers_known ?? '-'}
                                            </td>
                                            <td className="px-3 py-2 border border-dungeon-800 text-purple-300 text-center font-mono">
                                                {row.psionicProgression?.max_power_level ? `${row.psionicProgression.max_power_level}º` : '-'}
                                            </td>
                                        </>
                                    )}
                                    <td className="px-3 py-2 border border-dungeon-800 text-dungeon-200">
                                        {renderClickableAbilities(row.special)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }, [classData.levelProgression, classData.classFeatures, handleScrollToFeature, hasPsionicData]);

    const handleOpenFeature = (feature: Feature) => {
        setSelectedFeature(feature);
        setIsModalOpen(true);
    };

    return (
        <>
            {/* Proficiencies and Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                {/* Proficiencies */}
                <Card>
                    <CardHeader className="p-4 md:p-6 pb-2 md:pb-4">
                        <CardTitle className="text-base md:text-lg">Competencias</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-2 space-y-4 md:space-y-6">
                        {classData.proficiencyRestrictions && (
                            <div className="p-2 md:p-3 rounded bg-red-900/20 border border-red-900/30 text-xs md:text-sm text-red-200">
                                <span className="font-bold text-red-400 block mb-1">Restricciones:</span>
                                {classData.proficiencyRestrictions}
                            </div>
                        )}
                        <div>
                            <h4 className="text-xs md:text-sm font-semibold text-gold-500 mb-2">Armas</h4>
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {[...new Set(classData.weaponProficiencies)].map((prof, idx) => (
                                    <span
                                        key={`weapon-${idx}-${prof}`}
                                        className="px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-dungeon-800/80 border border-dungeon-700 text-dungeon-200 text-xs md:text-sm font-medium"
                                    >
                                        {prof.charAt(0).toUpperCase() + prof.slice(1)}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs md:text-sm font-semibold text-gold-500 mb-2">Armaduras</h4>
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {[...new Set(classData.armorProficiencies)].map((prof, idx) => (
                                    <span
                                        key={`armor-${idx}-${prof}`}
                                        className="px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-dungeon-800/80 border border-dungeon-700 text-dungeon-200 text-xs md:text-sm font-medium"
                                    >
                                        {prof.charAt(0).toUpperCase() + prof.slice(1)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Key Stats - Mobile First */}
                <Card>
                    <CardHeader className="p-4 md:p-6 pb-2 md:pb-4">
                        <CardTitle className="text-base md:text-lg">Características claves</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-2 space-y-3 md:space-y-6">
                        {/* Hit Die */}
                        <div className="flex items-center justify-between p-2 md:p-3 rounded bg-dungeon-900/30 border border-dungeon-800">
                            <span className="text-dungeon-400 text-xs md:text-sm font-medium">Dado de Golpe</span>
                            <div className="flex items-center gap-1.5 md:gap-2 text-dungeon-100">
                                <DiceIcon className="h-4 w-4 md:h-5 md:w-5 text-gold-500" />
                                <span className="font-bold text-sm md:text-base">{classData.hitDie}</span>
                            </div>
                        </div>

                        {/* Skill Points - Compact on mobile */}
                        <div className="space-y-2">
                            {/* Mobile: Single compact row */}
                            <div className="md:hidden">
                                <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                                    <span className="text-dungeon-400 text-xs font-medium">Pts. Habilidad</span>
                                    <div className="text-right">
                                        <span className="text-dungeon-100 font-mono text-xs block">
                                            Nv1: ({classData.skillPoints} + mod INT) × 4
                                        </span>
                                        <span className="text-dungeon-400 font-mono text-[10px]">
                                            Nv2+: {classData.skillPoints} + mod INT
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Desktop: Two rows */}
                            <div className="hidden md:block space-y-2">
                                <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                                    <span className="text-dungeon-400 text-sm font-medium">Puntos de habilidad (Nivel 1)</span>
                                    <span className="text-dungeon-100 font-mono text-sm">
                                        ({classData.skillPoints} + mod INT) × 4
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                                    <span className="text-dungeon-400 text-sm font-medium">Puntos de habilidad (Niveles superiores)</span>
                                    <span className="text-dungeon-100 font-mono text-sm">
                                        {classData.skillPoints} + mod INT
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* BAB & Saves Progression Types */}
                        <div className="border-t border-dungeon-700 pt-3 md:pt-4 mt-3 md:mt-4">
                            <h4 className="text-xs md:text-sm font-semibold text-gold-500 mb-2 md:mb-3">Progresión</h4>

                            {/* Mobile: Compact horizontal layout */}
                            <div className="md:hidden">
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="p-2 rounded bg-dungeon-900/30 border border-dungeon-800 text-center">
                                        <p className="text-[10px] text-dungeon-500 uppercase font-semibold mb-1">BAB</p>
                                        <span
                                            className={`font-bold text-sm ${classData.babProgression === 'good'
                                                ? 'text-green-400'
                                                : classData.babProgression === 'medium'
                                                    ? 'text-yellow-400'
                                                    : 'text-red-400'
                                                }`}
                                        >
                                            {classData.babProgression === 'good' ? '●●●' : classData.babProgression === 'medium' ? '●●○' : '●○○'}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded bg-dungeon-900/30 border border-dungeon-800 text-center">
                                        <p className="text-[10px] text-dungeon-500 uppercase font-semibold mb-1">Fort</p>
                                        <span className={`font-bold text-sm ${classData.fortitudeSave === 'good' ? 'text-green-400' : 'text-red-400'}`}>
                                            {classData.fortitudeSave === 'good' ? '✓' : '✗'}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded bg-dungeon-900/30 border border-dungeon-800 text-center">
                                        <p className="text-[10px] text-dungeon-500 uppercase font-semibold mb-1">Ref</p>
                                        <span className={`font-bold text-sm ${classData.reflexSave === 'good' ? 'text-green-400' : 'text-red-400'}`}>
                                            {classData.reflexSave === 'good' ? '✓' : '✗'}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded bg-dungeon-900/30 border border-dungeon-800 text-center">
                                        <p className="text-[10px] text-dungeon-500 uppercase font-semibold mb-1">Vol</p>
                                        <span className={`font-bold text-sm ${classData.willSave === 'good' ? 'text-green-400' : 'text-red-400'}`}>
                                            {classData.willSave === 'good' ? '✓' : '✗'}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-dungeon-500 mt-2 text-center">
                                    <span className="text-green-400">✓</span> Buena · <span className="text-red-400">✗</span> Pobre
                                </p>
                            </div>

                            {/* Desktop: Grid layout */}
                            <div className="hidden md:grid grid-cols-2 gap-3">
                                <div className="p-3 rounded bg-dungeon-900/30 border border-dungeon-800 text-center">
                                    <p className="text-xs text-dungeon-500 uppercase tracking-wider font-semibold mb-2">BAB</p>
                                    <span
                                        className={`font-bold text-base ${classData.babProgression === 'good'
                                            ? 'text-green-400'
                                            : classData.babProgression === 'medium'
                                                ? 'text-yellow-400'
                                                : 'text-red-400'
                                            }`}
                                    >
                                        {classData.babProgression === 'good' ? 'Bueno' : classData.babProgression === 'medium' ? 'Medio' : 'Pobre'}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                                        <span className="text-xs text-dungeon-400 font-medium">Fort</span>
                                        <span className={`text-sm font-bold ${classData.fortitudeSave === 'good' ? 'text-green-400' : 'text-red-400'}`}>
                                            {classData.fortitudeSave === 'good' ? 'Buena' : 'Pobre'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                                        <span className="text-xs text-dungeon-400 font-medium">Ref</span>
                                        <span className={`text-sm font-bold ${classData.reflexSave === 'good' ? 'text-green-400' : 'text-red-400'}`}>
                                            {classData.reflexSave === 'good' ? 'Buena' : 'Pobre'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                                        <span className="text-xs text-dungeon-400 font-medium">Vol</span>
                                        <span className={`text-sm font-bold ${classData.willSave === 'good' ? 'text-green-400' : 'text-red-400'}`}>
                                            {classData.willSave === 'good' ? 'Buena' : 'Pobre'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Class Skills Section */}
            {classData.classSkills.length > 0 && (
                <Card className="card mb-6">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Brain className="h-5 w-5 text-cyan-400" />
                            Habilidades de clase ({classData.classSkills.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <p className="text-sm text-dungeon-400 mb-4">
                            Estas habilidades son consideradas &quot;de clase&quot; para {classData.name}.
                            Al subir de nivel, puedes gastar puntos en ellas con coste 1:1.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {skillsWithIcons.map(({ skill, IconSkill, colorClasses, skillSlug }) => (
                                <Link
                                    key={skill}
                                    href={`/habilidades/${skillSlug}`}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all hover:scale-105 hover:shadow-md ${colorClasses}`}
                                >
                                    {IconSkill && <IconSkill className="h-3.5 w-3.5" />}
                                    {skill}
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Spells Per Day Table (only for spellcasting classes, not psionic) */}
            {((classData.tiene_magia || hasSpellsData) && !hasPsionicData) && (
                <Card className="card mb-6">
                    <CardHeader
                        className="cursor-pointer hover:bg-dungeon-800/30 transition-colors pb-3"
                        onClick={() => setIsSpellsOpen(!isSpellsOpen)}
                    >
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-lg">
                                <Wand2 className="h-5 w-5 text-purple-400" />
                                Conjuros por día
                            </span>
                            {isSpellsOpen ? (
                                <ChevronUp className="h-5 w-5 text-gold-500 transition-transform" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-gold-500 transition-transform" />
                            )}
                        </CardTitle>
                    </CardHeader>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isSpellsOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <CardContent className="pt-0">
                            {hasSpellsData ? (
                                <>
                                    {/* Desktop: Table */}
                                    <div className="hidden md:block w-full overflow-x-auto">
                                        <table className="w-full text-sm text-left border-collapse">
                                            <thead className="bg-dungeon-900 text-dungeon-100">
                                                <tr>
                                                    <th className="px-3 py-2 border border-dungeon-700 font-semibold">Nivel</th>
                                                    {spellLevels.map(level => (
                                                        <th key={level} className="px-3 py-2 border border-dungeon-700 font-semibold text-center">
                                                            {level}º
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {classData.levelProgression.map((row) => (
                                                    <tr
                                                        key={row.level}
                                                        className="odd:bg-dungeon-900/40 even:bg-dungeon-900/20 hover:bg-dungeon-800/40 transition-colors"
                                                    >
                                                        <td className="px-3 py-2 border border-dungeon-800 text-dungeon-100 font-medium">
                                                            {row.level}º
                                                        </td>
                                                        {spellLevels.map(level => (
                                                            <td key={level} className="px-3 py-2 border border-dungeon-800 text-dungeon-200 text-center">
                                                                {row.spellsPerDay?.[level] !== undefined ? row.spellsPerDay[level] : '-'}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Mobile: Compact cards */}
                                    <div className="md:hidden space-y-2">
                                        {classData.levelProgression.filter(row => row.spellsPerDay && Object.keys(row.spellsPerDay).length > 0).map((row) => (
                                            <div
                                                key={row.level}
                                                className="bg-dungeon-900/40 border border-dungeon-700 rounded-lg p-3"
                                            >
                                                <div className="text-gold-400 font-bold mb-2">Nivel {row.level}</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {spellLevels.map(level => {
                                                        const value = row.spellsPerDay?.[level];
                                                        if (value === undefined) return null;
                                                        return (
                                                            <span key={level} className="inline-flex items-center px-2 py-1 rounded bg-purple-900/30 border border-purple-700/50 text-xs">
                                                                <span className="text-purple-300 font-medium">{level}º:</span>
                                                                <span className="text-dungeon-100 ml-1">{value}</span>
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-6 text-dungeon-400">
                                    <Wand2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p>Esta clase puede lanzar conjuros, pero los datos de conjuros por día aún no están disponibles.</p>
                                    <Link
                                        href={`/conjuros?clase=${classData.slug}`}
                                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-purple-900/30 border border-purple-700/50 text-purple-300 hover:bg-purple-900/50 transition-colors"
                                    >
                                        <Sparkles className="h-4 w-4" />
                                        Ver conjuros de {classData.name}
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </div>
                </Card>
            )}

            {/* Level Progression Collapsible - Only show if there's progression data */}
            {hasProgressionData && (
                <Card className="card mb-8">
                    <CardHeader
                        className="cursor-pointer hover:bg-dungeon-800/30 transition-colors"
                        onClick={() => setIsProgressionOpen(!isProgressionOpen)}
                    >
                        <CardTitle className="flex items-center justify-between">
                            <span>Progresión por nivel</span>
                            {isProgressionOpen ? (
                                <ChevronUp className="h-5 w-5 text-gold-500 transition-transform" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-gold-500 transition-transform" />
                            )}
                        </CardTitle>
                    </CardHeader>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isProgressionOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <CardContent className="p-0">
                            {levelProgressionContent}
                            {/* Link to psionic powers for psionic classes */}
                            {hasPsionicData && (
                                <div className="p-4 border-t border-dungeon-700">
                                    <Link
                                        href="/psionica"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900/30 border border-purple-700/50 text-purple-300 hover:bg-purple-900/50 transition-colors"
                                    >
                                        <Brain className="h-4 w-4" />
                                        Ver poderes psiónicos
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </div>
                </Card>
            )}

            {/* Class Features Collapsible - Only show if there's features data */}
            {hasFeaturesData && (
            <div ref={featuresCardRef}>
            <Card className="card mb-8">
                <CardHeader
                    className="cursor-pointer hover:bg-dungeon-800/30 transition-colors"
                    onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                >
                    <CardTitle className="flex items-center justify-between">
                        <span>Rasgos de clase</span>
                        {isFeaturesOpen ? (
                            <ChevronUp className="h-5 w-5 text-gold-500 transition-transform" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-gold-500 transition-transform" />
                        )}
                    </CardTitle>
                </CardHeader>
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isFeaturesOpen ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <CardContent className="p-3 md:p-6">
                        {/* Base class features (level 1 or no level) */}
                        {featuresByLevel.baseFeatures.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <span>Rasgos de Clase</span>
                                    <span className="h-px flex-grow bg-dungeon-700"></span>
                                </h3>
                                <p className="text-xs text-dungeon-400 mb-3">
                                    {featuresByLevel.levels.length === 0
                                        ? 'Estos rasgos se obtienen al tomar el primer nivel en esta clase.'
                                        : 'Rasgos obtenidos al nivel 1.'}
                                </p>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {featuresByLevel.baseFeatures.map((feat, idx) => (
                                        <div
                                            key={`base-${idx}`}
                                            className="bg-dungeon-900/40 border border-dungeon-700 rounded-lg p-3 cursor-pointer hover:border-gold-500/50 transition-all group"
                                            onClick={() => handleOpenFeature(feat)}
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-dungeon-100 group-hover:text-gold-400 transition-colors truncate">{feat.name}</h4>
                                                    <p className="text-xs text-dungeon-400 line-clamp-2 mt-1">
                                                        {feat.shortDescription || (feat.description.length > 80 ? feat.description.slice(0, 80) + '...' : feat.description)}
                                                    </p>
                                                </div>
                                                <ChevronDown className="h-4 w-4 text-gold-500 shrink-0 -rotate-90 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Progression features (level 2+) */}
                        {featuresByLevel.levels.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold text-dungeon-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <span className="h-px flex-grow bg-dungeon-700"></span>
                                    Rasgos por Progresión
                                    <span className="h-px flex-grow bg-dungeon-700"></span>
                                </h3>
                            </div>
                        )}
                        <div className="space-y-6">
                            {featuresByLevel.levels.map(({ level, features }) => (
                                <div key={level}>
                                    <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold-900/40 border border-gold-700/50 text-gold-400 text-xs font-bold">
                                            {level}
                                        </span>
                                        <span>Nivel {level}</span>
                                        <span className="h-px flex-grow bg-dungeon-700"></span>
                                    </h3>
                                    {/* Mobile & Desktop: Grid adaptativo */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        {features.map((feat, idx) => (
                                            <div
                                                key={`${level}-${idx}`}
                                                className="bg-dungeon-900/40 border border-dungeon-700 rounded-lg p-3 cursor-pointer hover:border-gold-500/50 transition-all group"
                                                onClick={() => handleOpenFeature(feat)}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-dungeon-100 group-hover:text-gold-400 transition-colors truncate">
                                                            {feat.name}
                                                        </h4>
                                                        <p className="text-xs text-dungeon-400 line-clamp-2 mt-1">
                                                            {feat.shortDescription || (feat.description.length > 80 ? feat.description.slice(0, 80) + '...' : feat.description)}
                                                        </p>
                                                    </div>
                                                    <ChevronDown className="h-4 w-4 text-gold-500 shrink-0 -rotate-90 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty state */}
                        {featuresByLevel.levels.length === 0 && featuresByLevel.baseFeatures.length === 0 && (
                            <div className="text-center py-8 text-dungeon-400">
                                <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p>Los rasgos de clase aún no están disponibles.</p>
                            </div>
                        )}
                    </CardContent>
                </div>
            </Card>
            </div>
            )}

            {/* Variants Section (generic) */}
            {variants && (
                <div className="space-y-6 mb-8">
                    <Card className="card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gold-500">
                                <Swords className="h-5 w-5" />
                                Clases variantes ({variants.variantClasses.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {variants.variantClasses.map((variant) => (
                                    <VariantCard
                                        key={variant.slug}
                                        name={variant.name}
                                        slug={variant.slug}
                                        classSlug={classData.slug}
                                        level={variant.level}
                                        benefit={variant.benefit}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gold-500">
                                <Sparkles className="h-5 w-5" />
                                Rasgos alternativos ({variants.alternativeFeatures.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {variants.alternativeFeatures.map((variant) => (
                                    <VariantCard
                                        key={variant.slug}
                                        name={variant.name}
                                        slug={variant.slug}
                                        classSlug={classData.slug}
                                        level={variant.level}
                                        benefit={variant.benefit}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gold-500">
                                <Users className="h-5 w-5" />
                                Niveles de sustitución ({variants.substitutionLevels.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {variants.substitutionLevels.map((variant) => (
                                    <VariantCard
                                        key={variant.slug}
                                        name={variant.name}
                                        slug={variant.slug}
                                        classSlug={classData.slug}
                                        levels={variant.levels}
                                        features={variant.features}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Feature Detail Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-dungeon-900 border-dungeon-700 text-dungeon-100 w-[95vw] max-w-2xl max-h-[90vh] md:max-h-[80vh] overflow-y-auto p-4 md:p-6">
                    <DialogHeader className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                            <DialogTitle className="text-xl md:text-2xl font-bold text-gold-400 text-left leading-tight">
                                {selectedFeature?.name}
                            </DialogTitle>
                            <DialogClose asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 -mt-2 -mr-2 text-dungeon-400 hover:text-dungeon-100">
                                    <X className="h-5 w-5" />
                                </Button>
                            </DialogClose>
                        </div>
                        {selectedFeature?.level && (
                            <div className="flex justify-start">
                                <span className="text-xs md:text-sm text-gold-500 font-mono bg-dungeon-800 px-2 py-1 rounded border border-dungeon-600">
                                    Nivel {selectedFeature.level}
                                </span>
                            </div>
                        )}
                    </DialogHeader>
                    <div className="mt-2 md:mt-4">
                        <DialogDescription className="text-dungeon-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap text-justify">
                            {selectedFeature?.description}
                        </DialogDescription>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <DialogClose asChild>
                            <Button variant="secondary" className="w-full md:w-auto">Cerrar</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
