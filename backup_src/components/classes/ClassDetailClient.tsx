// 'use client' directive for Next.js client component
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Swords, Sparkles, Users, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getDiceIcon } from '@/lib/utils/diceIcons';
import { getSkillCategoryIcon, getSkillCategoryColor } from '@/lib/utils/icons';
import type { DnDSkill, SkillCategory } from '@/lib/types/skill';
import VariantCard from './VariantCard';
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
type ProgressionRow = {
    level: number;
    baseAttackBonus: string;
    fortitudeSave: number;
    reflexSave: number;
    willSave: number;
    special: string[];
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
}

interface BarbarianVariants {
    variantClasses: Array<{ name: string; slug: string; level: string; replaces: string; benefit: string }>;
    alternativeFeatures: Array<{ name: string; slug: string; level: string; replaces: string; benefit: string }>;
    substitutionLevels: Array<{ name: string; slug: string; levels: string; requirements: string; features: string }>;
}

interface ClassDetailClientProps {
    classData: ClassData;
    barbarianVariants?: BarbarianVariants;
    iconColor: string;
    skillsData: DnDSkill[];
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
    barbarianVariants,
    iconColor,
    skillsData,
}: ClassDetailClientProps) {
    const DiceIcon = getDiceIcon(classData.hitDie);
    const isBarbarian = classData.slug === 'barbaro';
    const [isProgressionOpen, setIsProgressionOpen] = useState(false);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    // Level progression table component (WITHOUT BAB & Saves visual block)
    const levelProgressionTable = useMemo(
        () => (
            <div className="w-full overflow-x-auto">
                <table className="w-full text-xs md:text-sm text-left border-collapse">
                    <thead className="bg-dungeon-900 text-dungeon-100">
                        <tr>
                            <th className="px-3 py-2 border border-dungeon-700 font-semibold">Nivel</th>
                            <th className="px-3 py-2 border border-dungeon-700 font-semibold">BAB</th>
                            <th className="px-3 py-2 border border-dungeon-700 font-semibold">Fort</th>
                            <th className="px-3 py-2 border border-dungeon-700 font-semibold">Ref</th>
                            <th className="px-3 py-2 border border-dungeon-700 font-semibold">Vol</th>
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
                                <td className="px-3 py-2 border border-dungeon-800 text-dungeon-200">
                                    {Array.isArray(row.special) ? row.special.join(', ') : row.special || '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ),
        [classData.levelProgression]
    );

    const handleOpenFeature = (feature: Feature) => {
        setSelectedFeature(feature);
        setIsModalOpen(true);
    };

    return (
        <>
            {/* Proficiencies and Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Proficiencies */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Competencias</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {classData.proficiencyRestrictions && (
                            <div className="p-3 rounded bg-red-900/20 border border-red-900/30 text-sm text-red-200">
                                <span className="font-bold text-red-400 block mb-1">Restricciones:</span>
                                {classData.proficiencyRestrictions}
                            </div>
                        )}
                        {/* Weapons */}
                        <div>
                            <h4 className="text-sm font-semibold text-gold-500 mb-2">Armas</h4>
                            <p className="text-dungeon-300 text-sm mb-3">
                                {classData.weaponProficiencies.length > 0
                                    ? `Competente con ${classData.weaponProficiencies.join(', ')}.`
                                    : 'Competencias limitadas.'}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {classData.weaponProficiencies.map((prof) => {
                                    const isAll = /todas/.test(prof.toLowerCase());
                                    const href = isAll ? '/equipo/armas' : `/equipo/armas/${generateSlug(prof)}`;
                                    return (
                                        <Link
                                            key={prof}
                                            href={href}
                                            className="px-3 py-1.5 rounded-lg bg-dungeon-800/80 hover:bg-dungeon-700 border border-dungeon-700 hover:border-gold-500/50 text-dungeon-200 hover:text-gold-300 transition-all duration-200 text-sm font-medium"
                                        >
                                            {prof.charAt(0).toUpperCase() + prof.slice(1)}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Armors */}
                        <div>
                            <h4 className="text-sm font-semibold text-gold-500 mb-2">Armaduras</h4>
                            <p className="text-dungeon-300 text-sm mb-3">
                                {classData.armorProficiencies.length > 0
                                    ? `Competente con ${classData.armorProficiencies.join(', ')}.`
                                    : 'Sin competencias en armaduras.'}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {classData.armorProficiencies.map((prof) => {
                                    const isAll = /todas/.test(prof.toLowerCase());
                                    const href = isAll ? '/equipo/armaduras' : `/equipo/armaduras/${generateSlug(prof)}`;
                                    return (
                                        <Link
                                            key={prof}
                                            href={href}
                                            className="px-3 py-1.5 rounded-lg bg-dungeon-800/80 hover:bg-dungeon-700 border border-dungeon-700 hover:border-gold-500/50 text-dungeon-200 hover:text-gold-300 transition-all duration-200 text-sm font-medium"
                                        >
                                            {prof.charAt(0).toUpperCase() + prof.slice(1)}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Key Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Características claves</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Hit Die */}
                        <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                            <span className="text-dungeon-400 text-sm font-medium">Dado de Golpe</span>
                            <div className="flex items-center gap-2 text-dungeon-100">
                                <DiceIcon className="h-5 w-5 text-gold-500" />
                                <span className="font-bold">{classData.hitDie}</span>
                            </div>
                        </div>
                        {/* Skill Points */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                                <span className="text-dungeon-400 text-sm font-medium">Puntos de habilidad (Nivel 1)</span>
                                <span className="text-dungeon-100 font-mono text-sm">
                                    {classData.skillPointsFirstLevel
                                        ? classData.skillPointsFirstLevel
                                        : `(${classData.skillPoints} + Mod. Int) x 4`}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                                <span className="text-dungeon-400 text-sm font-medium">Puntos de habilidad (Niveles superiores)</span>
                                <span className="text-dungeon-100 font-mono text-sm">
                                    {classData.skillPoints} + Mod. Int
                                </span>
                            </div>
                        </div>

                        {/* BAB & Saves Progression Types */}
                        <div className="border-t border-dungeon-700 pt-4 mt-4">
                            <h4 className="text-sm font-semibold text-gold-500 mb-3">Progresión de Salvaciones y Ataque</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {/* BAB Progression Type */}
                                <div className="p-3 rounded bg-dungeon-900/30 border border-dungeon-800 text-center">
                                    <p className="text-xs text-dungeon-500 uppercase tracking-wider font-semibold mb-2">
                                        BAB
                                    </p>
                                    <span
                                        className={`font-bold text-base ${classData.babProgression === 'good'
                                            ? 'text-green-400'
                                            : classData.babProgression === 'medium'
                                                ? 'text-yellow-400'
                                                : 'text-red-400'
                                            }`}
                                    >
                                        {classData.babProgression === 'good'
                                            ? 'Bueno'
                                            : classData.babProgression === 'medium'
                                                ? 'Medio'
                                                : 'Pobre'}
                                    </span>
                                </div>

                                {/* Saves column */}
                                <div className="space-y-2">
                                    {/* Fortaleza */}
                                    <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                                        <span className="text-xs text-dungeon-400 font-medium">Fort</span>
                                        <span
                                            className={`text-sm font-bold ${classData.fortitudeSave === 'good' ? 'text-green-400' : 'text-red-400'
                                                }`}
                                        >
                                            {classData.fortitudeSave === 'good' ? 'Buena' : 'Pobre'}
                                        </span>
                                    </div>

                                    {/* Reflejos */}
                                    <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                                        <span className="text-xs text-dungeon-400 font-medium">Ref</span>
                                        <span
                                            className={`text-sm font-bold ${classData.reflexSave === 'good' ? 'text-green-400' : 'text-red-400'
                                                }`}
                                        >
                                            {classData.reflexSave === 'good' ? 'Buena' : 'Pobre'}
                                        </span>
                                    </div>

                                    {/* Voluntad */}
                                    <div className="flex items-center justify-between p-2 rounded bg-dungeon-900/30 border border-dungeon-800">
                                        <span className="text-xs text-dungeon-400 font-medium">Vol</span>
                                        <span
                                            className={`text-sm font-bold ${classData.willSave === 'good' ? 'text-green-400' : 'text-red-400'
                                                }`}
                                        >
                                            {classData.willSave === 'good' ? 'Buena' : 'Pobre'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Level Progression Collapsible */}
            <Card className="mb-8">
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
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isProgressionOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <CardContent className="p-0">{levelProgressionTable}</CardContent>
                </div>
            </Card>

            {/* Class Features Collapsible */}
            <Card className="mb-8">
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
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isFeaturesOpen ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {classData.classFeatures.map((feat, idx) => (
                            <Card
                                key={idx}
                                className="bg-dungeon-800/40 border border-dungeon-700 hover:border-dungeon-600 cursor-pointer group transition-all flex flex-col"
                                onClick={() => handleOpenFeature(feat)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between mb-2">
                                        <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                                            {feat.name}
                                        </CardTitle>
                                        {feat.level && (
                                            <span className="text-xs text-gold-500 font-mono bg-dungeon-900/60 px-2 py-0.5 rounded border border-dungeon-700 whitespace-nowrap ml-2">
                                                Nivel {feat.level}
                                            </span>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0 flex-grow flex flex-col justify-between">
                                    <p className="text-sm text-dungeon-300 mb-4 leading-relaxed">
                                        {feat.shortDescription || (feat.description.length > 100 ? feat.description.slice(0, 100) + '...' : feat.description)}
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full mt-auto border-dungeon-600 hover:bg-dungeon-700 text-dungeon-200"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenFeature(feat);
                                        }}
                                    >
                                        Leer más
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </div>
            </Card>

            {/* Barbarian Variants Section (only for barbarian) */}
            {isBarbarian && barbarianVariants && (
                <div className="space-y-6 mb-8">
                    {/* Variant Classes */}
                    <Card className="bg-dungeon-800 border-dungeon-700">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gold-500">
                                <Swords className="h-5 w-5" />
                                Clases variantes ({barbarianVariants.variantClasses.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {barbarianVariants.variantClasses.map((variant) => (
                                    <VariantCard
                                        key={variant.slug}
                                        name={variant.name}
                                        slug={variant.slug}
                                        classSlug="barbaro"
                                        level={variant.level}
                                        benefit={variant.benefit}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    {/* Alternative Features */}
                    <Card className="bg-dungeon-800 border-dungeon-700">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gold-500">
                                <Sparkles className="h-5 w-5" />
                                Rasgos alternativos ({barbarianVariants.alternativeFeatures.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {barbarianVariants.alternativeFeatures.map((variant) => (
                                    <VariantCard
                                        key={variant.slug}
                                        name={variant.name}
                                        slug={variant.slug}
                                        classSlug="barbaro"
                                        level={variant.level}
                                        benefit={variant.benefit}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    {/* Substitution Levels */}
                    <Card className="bg-dungeon-800 border-dungeon-700">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gold-500">
                                <Users className="h-5 w-5" />
                                Niveles de sustitución ({barbarianVariants.substitutionLevels.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {barbarianVariants.substitutionLevels.map((variant) => (
                                    <VariantCard
                                        key={variant.slug}
                                        name={variant.name}
                                        slug={variant.slug}
                                        classSlug="barbaro"
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
                <DialogContent className="bg-dungeon-900 border-dungeon-700 text-dungeon-100 max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center justify-between pr-4">
                            <DialogTitle className="text-2xl font-bold text-gold-400">
                                {selectedFeature?.name}
                            </DialogTitle>
                            {selectedFeature?.level && (
                                <span className="text-sm text-gold-500 font-mono bg-dungeon-800 px-2 py-1 rounded border border-dungeon-600">
                                    Nivel {selectedFeature.level}
                                </span>
                            )}
                        </div>
                    </DialogHeader>
                    <div className="mt-4">
                        <DialogDescription className="text-dungeon-200 text-base leading-relaxed whitespace-pre-wrap">
                            {selectedFeature?.description}
                        </DialogDescription>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <DialogClose asChild>
                            <Button variant="secondary">Cerrar</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
