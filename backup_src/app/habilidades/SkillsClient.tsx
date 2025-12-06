'use client';

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import SkillCard from '@/components/skills/SkillCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DnDSkill, AbilityScore, SkillCategory } from '@/lib/types/skill';
import { getSkillCategoryIcon, getSkillCategoryColor, extractTextColor } from '@/lib/utils/icons';

interface SkillsClientProps {
    skills: DnDSkill[];
}

export default function SkillsClient({ skills }: SkillsClientProps) {
    const [selectedAbility, setSelectedAbility] = useState<AbilityScore | 'all'>('all');
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
    const [trainedOnlyFilter, setTrainedOnlyFilter] = useState<boolean | 'all'>('all');
    const [armorPenaltyFilter, setArmorPenaltyFilter] = useState<boolean | 'all'>('all');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Filtrar habilidades
    const filteredSkills = skills.filter(skill => {
        if (selectedAbility !== 'all' && skill.keyAbility !== selectedAbility) return false;
        if (selectedCategory !== 'all' && skill.category !== selectedCategory) return false;
        if (trainedOnlyFilter !== 'all' && skill.trainedOnly !== trainedOnlyFilter) return false;
        if (armorPenaltyFilter !== 'all' && skill.armorCheckPenalty !== armorPenaltyFilter) return false;
        return true;
    });

    // Categorizar habilidades
    const categories = Array.from(new Set(skills.map(s => s.category)));
    const abilities: AbilityScore[] = ['Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduría', 'Carisma'];

    // Agrupar habilidades filtradas por categoría
    const skillsByCategory: Record<SkillCategory, DnDSkill[]> = {
        'Física': filteredSkills.filter(s => s.category === 'Física'),
        'Mental': filteredSkills.filter(s => s.category === 'Mental'),
        'Social': filteredSkills.filter(s => s.category === 'Social'),
        'Conocimiento': filteredSkills.filter(s => s.category === 'Conocimiento'),
        'Oficio': filteredSkills.filter(s => s.category === 'Oficio'),
        'Profesión': filteredSkills.filter(s => s.category === 'Profesión'),
        'Interpretación': filteredSkills.filter(s => s.category === 'Interpretación'),
    };

    // Ordenar categorías según importancia/frecuencia
    const categoryOrder: SkillCategory[] = ['Física', 'Mental', 'Social', 'Conocimiento', 'Oficio', 'Profesión', 'Interpretación'];

    return (
        <>
            {/* Botón de Filtros Desplegable */}
            <div className="mb-6">
                <button
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    className="w-full flex items-center justify-between bg-dungeon-800 border border-dungeon-700 rounded-lg px-4 py-3 text-dungeon-200 hover:border-gold-500 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gold-500" />
                        <span className="font-semibold">Filtros</span>
                        <span className="text-sm text-dungeon-400">
                            ({filteredSkills.length} de {skills.length})
                        </span>
                    </div>
                    <ChevronDown
                        className={`h-5 w-5 text-gold-500 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''
                            }`}
                    />
                </button>

                {/* Panel de Filtros Desplegable */}
                {mobileFiltersOpen && (
                    <Card className="mt-4">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Filtro por Habilidad Clave */}
                                <div>
                                    <label className="block text-sm font-semibold text-gold-500 mb-2">
                                        Habilidad Clave
                                    </label>
                                    <select
                                        value={selectedAbility}
                                        onChange={(e) => setSelectedAbility(e.target.value as AbilityScore | 'all')}
                                        className="w-full input text-sm"
                                    >
                                        <option value="all">Todas</option>
                                        {abilities.map(ability => (
                                            <option key={ability} value={ability}>{ability}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Filtro por Categoría */}
                                <div>
                                    <label className="block text-sm font-semibold text-gold-500 mb-2">
                                        Categoría
                                    </label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value as SkillCategory | 'all')}
                                        className="w-full input text-sm"
                                    >
                                        <option value="all">Todas</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Filtro Solo Entrenado */}
                                <div>
                                    <label className="block text-sm font-semibold text-gold-500 mb-2">
                                        Entrenamiento
                                    </label>
                                    <select
                                        value={trainedOnlyFilter === 'all' ? 'all' : String(trainedOnlyFilter)}
                                        onChange={(e) => setTrainedOnlyFilter(e.target.value === 'all' ? 'all' : e.target.value === 'true')}
                                        className="w-full input text-sm"
                                    >
                                        <option value="all">Todas</option>
                                        <option value="true">Solo entrenado</option>
                                        <option value="false">Sin entrenamiento</option>
                                    </select>
                                </div>

                                {/* Filtro Penalización Armadura */}
                                <div>
                                    <label className="block text-sm font-semibold text-gold-500 mb-2">
                                        Penalización Armadura
                                    </label>
                                    <select
                                        value={armorPenaltyFilter === 'all' ? 'all' : String(armorPenaltyFilter)}
                                        onChange={(e) => setArmorPenaltyFilter(e.target.value === 'all' ? 'all' : e.target.value === 'true')}
                                        className="w-full input text-sm"
                                    >
                                        <option value="all">Todas</option>
                                        <option value="true">Con penalización</option>
                                        <option value="false">Sin penalización</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Habilidades por Categoría */}
            {filteredSkills.length === 0 ? (
                <Card className="mb-16 bg-dungeon-800 border-dungeon-700">
                    <CardContent className="text-center py-12">
                        <p className="text-dungeon-400">No se encontraron habilidades con los filtros seleccionados</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6 mb-16">
                    {categoryOrder.map((category) => {
                        const categorySkills = skillsByCategory[category];

                        // Solo mostrar categoría si tiene habilidades
                        if (categorySkills.length === 0) return null;

                        const Icon = getSkillCategoryIcon(category);
                        const colorClasses = getSkillCategoryColor(category);
                        const iconColor = extractTextColor(colorClasses);

                        return (
                            <Card key={category} className="bg-dungeon-800 border-dungeon-700">
                                <CardHeader>
                                    <CardTitle className={`flex items-center gap-2 ${iconColor}`}>
                                        <Icon className="h-5 w-5" />
                                        {category} ({categorySkills.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {categorySkills.map((skillData) => (
                                            <SkillCard key={skillData.id} skillData={skillData} />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Información adicional */}
            <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
                    Información de Habilidades
                </h3>
                <div className="space-y-3 text-sm text-dungeon-300">
                    <p>
                        Las habilidades representan áreas de experiencia y capacidades especiales de tu personaje.
                    </p>
                    <p>
                        <span className="text-gold-500 font-semibold">Solo Entrenado:</span> Algunas habilidades
                        solo pueden usarse si tienes al menos 1 rango en ellas.
                    </p>
                    <p>
                        <span className="text-gold-500 font-semibold">Penalización por Armadura:</span> Las habilidades
                        marcadas se ven afectadas por la penalización de tu armadura.
                    </p>
                    <p>
                        <span className="text-gold-500 font-semibold">Sinergia:</span> Tener 5 o más rangos en ciertas
                        habilidades otorga bonificadores +2 a otras habilidades relacionadas.
                    </p>
                </div>
            </div>
        </>
    );
}
