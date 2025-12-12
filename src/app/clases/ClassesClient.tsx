'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Search, Sparkles, Filter, ChevronDown, ArrowLeft, BookOpen, Crown, AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/ScrollReveal';
import ClassCard from '@/components/classes/ClassCard';
import SupplementalClassesSection from '@/components/classes/SupplementalClassesSection';
import PrestigeClassesSection from '@/components/classes/PrestigeClassesSection';
import { BaseSaveAttackTable } from '@/components/classes/tables/BaseSaveAttackTable';
import { LevelBenefitTable } from '@/components/classes/tables/LevelBenefitTable';
import { WealthTable } from '@/components/classes/tables/WealthTable';
import { DnDClass } from '@/lib/types/class';
import { getSourceTag } from '@/lib/utils/icons';
import {
    standardClassCategories,
    totalStandardClasses,
    levelUpSteps,
} from '@/lib/data/classes-page-data';

interface ClassesClientProps {
    phbClasses: DnDClass[];
    supplementalBaseClasses: DnDClass[];
    prestigeClasses: DnDClass[];
}

export default function ClassesClient({
    phbClasses,
    supplementalBaseClasses,
    prestigeClasses
}: ClassesClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

    // Helper to filter items
    const filterItem = (item: DnDClass) => {
        // Search Term Filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const matchesSearch =
                item.name.toLowerCase().includes(term) ||
                item.slug.toLowerCase().includes(term);
            if (!matchesSearch) return false;
        }

        // Category Filter (Simplified for now, can be expanded)
        if (selectedCategory !== 'Todas') {
            if (selectedCategory === 'PHB') {
                return getSourceTag(item.source?.book).code.toUpperCase() === 'PHB';
            }
            if (selectedCategory === 'Prestigio') {
                return item.classType === 'prestigio';
            }
            if (selectedCategory === 'Suplementos') {
                return getSourceTag(item.source?.book).code.toUpperCase() !== 'PHB' && item.classType !== 'prestigio';
            }
        }

        return true;
    };

    // Filter lists
    const filteredPhbClasses = phbClasses.filter(filterItem);
    const filteredSupplementalClasses = supplementalBaseClasses.filter(filterItem);
    const filteredPrestigeClasses = prestigeClasses.filter(filterItem);

    const totalFiltered = filteredPhbClasses.length + filteredSupplementalClasses.length + filteredPrestigeClasses.length;

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/3.5">
                                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-300 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver al Inicio
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-300 leading-tight">
                            Clases de Personaje
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Elige tu camino. Desde los valientes guerreros hasta los sabios magos, tu clase define tus habilidades y tu papel en el grupo.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-500 pt-2">
                            <span className="bg-dungeon-950/50 border border-dungeon-700 rounded-full px-3 py-1">{totalStandardClasses} clases estándar</span>
                            <span className="bg-dungeon-950/50 border border-dungeon-700 rounded-full px-3 py-1">Incluye Clases de Prestigio</span>
                        </div>
                    </div>

                    {/* Icon Display */}
                    <div className="p-6 rounded-full bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm">
                        <Crown className="h-12 w-12 text-gold-500" />
                    </div>
                </div>
            </div>

            {/* Control Panel / Filters */}
            <div className="sticky top-4 z-30 bg-dungeon-950/95 backdrop-blur-md border border-dungeon-800 rounded-xl shadow-lg p-4 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-gold-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar clase..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-dungeon-900 border border-dungeon-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                        />
                    </div>

                    {/* Filter Toggle (Mobile) & Active Filters Summary */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                            <Sparkles className="h-4 w-4 text-gold-500" />
                            <span>{totalFiltered} clases encontradas</span>
                        </div>

                        <button
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${mobileFiltersOpen
                                ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                                : 'bg-dungeon-800 border-dungeon-700 text-gray-400 hover:border-dungeon-600'
                                }`}
                        >
                            <Filter className="h-4 w-4" />
                            <span className="font-medium">Categoría</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Expanded Filters */}
                {mobileFiltersOpen && (
                    <div className="mt-6 pt-6 border-t border-dungeon-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-2 col-span-full">
                            <label className="text-xs font-bold text-gold-500 uppercase tracking-wider block mb-2">
                                Filtrar por Categoría
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {['Todas', 'PHB', 'Suplementos', 'Prestigio'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedCategory === cat
                                            ? 'bg-gradient-to-r from-gold-500 to-orange-500 text-gray-950 shadow-md'
                                            : 'bg-dungeon-800 border border-dungeon-700 text-gray-400 hover:border-gold-500/50'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Empty State */}
            {totalFiltered === 0 && (
                <div className="text-center py-16 bg-dungeon-900/50 rounded-xl border border-dungeon-800 border-dashed">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dungeon-800 mb-4">
                        <Search className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No se encontraron clases</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Intenta ajustar los filtros o buscar con otros términos.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('Todas');
                        }}
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-gold-500 to-orange-500 text-gray-950 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}

            {/* Info Cards (Only show when no specific search/filter is active to reduce clutter, or keep them?) 
          Let's keep them but maybe collapsible or just below hero if no search. 
          For now, I'll hide them if searching to focus on results.
      */}
            {!searchTerm && selectedCategory === 'Todas' && (
                <ScrollReveal>
                    <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-12">
                        <Card className="card">
                            <CardHeader>
                                <CardTitle className="text-gold-400 text-lg">Cómo usar esta sección</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-400 space-y-2">
                                <p>Explora las clases base con las tarjetas de abajo y consulta las tablas de progreso para planificar subidas de nivel, XP y equipo.</p>
                                <p>Todo el texto del SRD está en español y condensado para tener las reglas clave a mano.</p>
                            </CardContent>
                        </Card>
                        <Card className="card">
                            <CardHeader>
                                <CardTitle className="text-gold-400 text-lg">Definición de clases</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-400 space-y-2">
                                <p>Un personaje pertenece a una única clase a la vez, pero puede combinar varias como multiclase.</p>
                                <p>La clase determina competencias, progresión de ataque, salvaciones, dotes y conjuros.</p>
                            </CardContent>
                        </Card>
                        <Card className="card">
                            <CardHeader>
                                <CardTitle className="text-gold-400 text-lg">Progresión rápida</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-400 space-y-2">
                                <p>Consulta valores de ataque base, salvaciones, máximos de habilidades, dotes y riqueza por nivel sin salir de la página.</p>
                            </CardContent>
                        </Card>
                    </div>
                </ScrollReveal>
            )}

            {/* PHB Core Classes Section */}
            {filteredPhbClasses.length > 0 && (
                <ScrollReveal direction="down">
                    <Card className="card mb-8 border-dungeon-700 hover:border-gold-500/30 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-gold-400">
                                <BookOpen className="h-6 w-6 text-gold-400" />
                                <div className="flex flex-col">
                                    <span>Clases Base del Manual del Jugador ({filteredPhbClasses.length})</span>
                                    <span className="text-sm font-normal text-gray-400 mt-1">
                                        Las clases principales del juego, disponibles para todos los personajes.
                                    </span>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {filteredPhbClasses.map((classData) => (
                                    <ClassCard key={classData.id} classData={classData} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </ScrollReveal>
            )}

            {/* Supplemental Base Classes Section */}
            {filteredSupplementalClasses.length > 0 && (
                <ScrollReveal direction="down">
                    <Card className="card mb-8 border-dungeon-700 hover:border-gold-500/30 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-gold-400">
                                <Sparkles className="h-6 w-6 text-gold-400" />
                                <div className="flex flex-col">
                                    <span>Clases Base de Suplementos ({filteredSupplementalClasses.length})</span>
                                    <span className="text-sm font-normal text-gray-400 mt-1">
                                        Clases base adicionales de libros como Complete Warrior, Complete Arcane, etc.
                                    </span>
                                </div>
                            </CardTitle>
                            {/* Warning Banner */}
                            <div className="mt-4 p-4 bg-orange-900/30 border border-gold-500/40 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-gray-300 space-y-2">
                                        <p className="font-semibold text-gold-400">
                                            ⚠️ Contenido de Suplementos - Consulta con tu DM
                                        </p>
                                        <p>
                                            Estas clases provienen de libros adicionales y pueden no estar disponibles en todas las campañas.
                                        </p>
                                        <p>
                                            <strong className="text-gray-300">Antes de elegir una de estas clases</strong>,
                                            habla con tu Director de Juego para confirmar si está permitida en tu partida.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <SupplementalClassesSection classes={filteredSupplementalClasses} />
                        </CardContent>
                    </Card>
                </ScrollReveal>
            )}

            {/* Prestige Classes Section */}
            {filteredPrestigeClasses.length > 0 && (
                <ScrollReveal direction="down">
                    <Card className="card mb-16 border-dungeon-700 hover:border-gold-500/30 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-gold-400">
                                <Crown className="h-6 w-6 text-gold-400" />
                                <div className="flex flex-col">
                                    <span>Clases de Prestigio ({filteredPrestigeClasses.length})</span>
                                    <span className="text-sm font-normal text-gray-400 mt-1">
                                        Clases avanzadas que requieren prerrequisitos específicos para acceder.
                                    </span>
                                </div>
                            </CardTitle>
                            {/* Warning Banner */}
                            <div className="mt-4 p-4 bg-orange-900/30 border border-gold-500/40 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-gray-300 space-y-2">
                                        <p className="font-semibold text-gold-400">
                                            ⚠️ Clases de Prestigio - Requieren Prerrequisitos
                                        </p>
                                        <p>
                                            Las clases de prestigio son opciones avanzadas que solo pueden tomarse después de cumplir
                                            ciertos requisitos de nivel, habilidades, dotes o alineamiento.
                                        </p>
                                        <p>
                                            <strong className="text-gray-300">Normalmente se accede a partir del nivel 5-6</strong>,
                                            y reemplazan los niveles de tu clase base cuando subes de nivel.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <PrestigeClassesSection classes={filteredPrestigeClasses} />
                        </CardContent>
                    </Card>
                </ScrollReveal>
            )}

            {/* Standard Categories Accordion */}
            {!searchTerm && selectedCategory === 'Todas' && (
                <ScrollReveal delay={200}>
                    <Card className="card mb-12">
                        <CardHeader>
                            <CardTitle className="text-gold-400 text-lg">Clases estándar del Ultimate SRD ({totalStandardClasses})</CardTitle>
                            <p className="text-sm text-gray-400">Expande una categoría para ver todas las clases agrupadas por libro u origen.</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {standardClassCategories.map((group) => (
                                <details
                                    key={group.title}
                                    className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg px-4 py-3 transition-colors open:border-gold-500/50"
                                    open={group.defaultOpen}
                                >
                                    <summary className="flex items-center justify-between cursor-pointer text-gray-300">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{group.title}</span>
                                            {group.source && <span className="text-xs text-gray-400">{group.source}</span>}
                                        </div>
                                        <span className="text-sm text-gold-400">{group.classes.length} clases</span>
                                    </summary>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {group.classes.map((className) => (
                                            <span
                                                key={className}
                                                className="px-3 py-1 rounded-full bg-dungeon-800/70 border border-dungeon-700 text-gray-300 text-sm"
                                            >
                                                {className}
                                            </span>
                                        ))}
                                    </div>
                                </details>
                            ))}
                        </CardContent>
                    </Card>
                </ScrollReveal>
            )}

            {/* Reference Tables */}
            {!searchTerm && selectedCategory === 'Todas' && (
                <ScrollReveal delay={300}>
                    <div className="grid gap-6 md:grid-cols-2 mb-12">
                        <Card className="card">
                            <CardHeader>
                                <CardTitle className="text-gold-400 text-lg">Bonos base de salvación y ataque</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-400 space-y-3">
                                <p>El bono de salvación base depende de si la tirada es buena o pobre para tu clase. Monjes tienen las tres tiradas buenas, por ejemplo.</p>
                                <p>El ataque base se usa en cada ataque. Buen ataque (guerrero, bárbaro, paladín, explorador) progresa a +20; medio (clérigo, druida, monje, pícaro) termina en +15; pobre (hechicero, mago) llega a +10.</p>
                                <BaseSaveAttackTable />
                            </CardContent>
                        </Card>

                        <Card className="card">
                            <CardHeader>
                                <CardTitle className="text-gold-400 text-lg">Beneficios dependientes del nivel</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-400 space-y-3">
                                <p>Máximos de rangos: habilidad de clase = nivel + 3. Habilidad cruzada = (nivel + 3) ÷ 2. Los valores de XP son acumulativos.</p>
                                <LevelBenefitTable />
                            </CardContent>
                        </Card>
                    </div>
                </ScrollReveal>
            )}

            {/* Additional Info Cards */}
            {!searchTerm && selectedCategory === 'Todas' && (
                <ScrollReveal delay={400}>
                    <Card className="card mb-12">
                        <CardHeader>
                            <CardTitle className="text-gold-400 text-lg">Experiencia, entrenamiento y subida de nivel</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-gray-400">
                            <div className="space-y-3">
                                <p>La XP mide lo que tu personaje aprende tras cada aventura. Al alcanzar el mínimo de la tabla anterior subes de nivel inmediatamente: aplica beneficios y continúa con la XP sobrante.</p>
                                <p>Si el DJ otorga tanta XP que saltarías más de un nivel, solo subes uno y quedas a 1 XP del siguiente; el resto se pierde.</p>
                                <p>El entrenamiento entre aventuras consolida habilidades. Si un personaje no puede practicar durante largo tiempo, el DJ puede reducir o negar XP.</p>
                            </div>
                            <div className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg p-4 space-y-3">
                                <h3 className="text-gray-300 font-semibold">Pasos al subir de nivel</h3>
                                <ol className="list-decimal list-inside space-y-2 text-gray-400">
                                    {levelUpSteps.map((step) => (
                                        <li key={step.title}>
                                            <span className="font-semibold text-gray-300">{step.title}:</span> {step.description}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="card mb-12">
                        <CardHeader>
                            <CardTitle className="text-gold-400 text-lg">Personajes multiclase</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-400 space-y-3">
                            <p>Las habilidades de varias clases se suman: el ataque base se agrega, las salvaciones base también, los puntos de golpe se tiran por clase adquirida y los rasgos conviven (incluyendo restricciones). Los PNJ multiclase usan las mismas reglas.</p>
                            <p>Las habilidades que sean de clase para cualquiera de tus clases usan el máximo de clase. Si ninguna clase la tiene, usa el máximo cruzado. Los conjuros se llevan por lista: lleva un registro separado de cada clase lanzadora.</p>
                            <p>Rasgos especiales combinados: clérigo + paladín apilan para expulsar muertos vivientes (paladín a partir de nivel 4 cuenta como nivel de clérigo -3). Bárbaro + pícaro apilan para esquiva asombrosa; si la ganas dos veces, obtienes la versión mejorada. Hechicero y mago apilan niveles para las estadísticas del familiar.</p>
                            <p>Favor de raza y penalizaciones de XP: si la diferencia entre tu clase más alta y otra clase es de 2 o más niveles, esa clase retrasada sufre -20% XP. La clase favorecida de tu raza no cuenta para ese cálculo (humano y semielfo tratan su clase más alta como favorecida).</p>
                        </CardContent>
                    </Card>

                    <Card className="card mb-12">
                        <CardHeader>
                            <CardTitle className="text-gold-400 text-lg">Añadir una segunda clase</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-gray-400">
                            <div className="space-y-3">
                                <p>Cuando subes nivel puedes escoger empezar una clase distinta a nivel 1. Obtienes ataques base, salvaciones, competencias, rasgos y puntos de habilidad de esa clase, pero no recibes los beneficios exclusivos del nivel 1 inicial (PG máximos del primer dado, x4 puntos de habilidad, equipo inicial, oro inicial).</p>
                                <p>El DJ puede exigir declarar con antelación qué clase estás practicando, o requerir un tutor o ritual específico antes de permitirte multiclasear.</p>
                            </div>
                            <div className="space-y-3">
                                <p>Avance posterior: un personaje multiclase que gana otro nivel puede subir cualquier clase que ya tenga o añadir una nueva (si cumple requisitos). Aplica siempre los beneficios estándar de la clase y nivel elegido.</p>
                                <p>Reglas épicas para niveles superiores a 20 aparecen en la sección de Niveles Épicos.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="card mb-12">
                        <CardHeader>
                            <CardTitle className="text-gold-400 text-lg">Clases variantes, rasgos alternativos y niveles de sustitución</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-400 space-y-3">
                            <p><span className="text-gray-300 font-semibold">Clases variantes:</span> pueden cambiar alineamiento permitido, dado de golpe, ataque base, salvaciones, habilidades de clase o rasgos. Para variantes de una misma clase (por ejemplo, bárbaro tótem) suele prohibirse multiclasear entre variantes; si se permite, los rasgos idénticos se apilan salvo la magia.</p>
                            <p><span className="text-gray-300 font-semibold">Rasgos de clase alternativos:</span> sustituyen un rasgo por otro en el nivel especificado. Indican requisitos, nivel, qué rasgo reemplazan y el beneficio obtenido. Puedes reentrenar al subir de nivel usando las reglas de Player's Handbook II.</p>
                            <p><span className="text-gray-300 font-semibold">Niveles de sustitución:</span> reemplazan los beneficios de un nivel concreto de tu clase por otros distintos, manteniendo la misma clase. Suelen requerir raza o habilidades. No puedes recuperar los beneficios reemplazados salvo que el DJ permita un rito o decisión narrativa, normalmente pagando oro y tiempo.</p>
                            <p><span className="text-gray-300 font-semibold">Reentrenar rasgos:</span> al subir de nivel puedes intercambiar un rasgo legal del nivel previo por otro elegible del mismo nivel, siempre que no invalide elecciones posteriores.</p>
                        </CardContent>
                    </Card>

                    <Card className="card mb-12">
                        <CardHeader>
                            <CardTitle className="text-gold-400 text-lg">Crear PJ por encima de nivel 1</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-400 space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <p>1) Asigna una cantidad de XP total acorde al nivel deseado.</p>
                                    <p>2) Elige raza y clases, definiendo el orden de niveles (importa para puntos de habilidad iniciales y conjuros).</p>
                                    <p>3) Calcula ataque base, salvaciones, PG, conjuros, rasgos y mejora de característica cada 4 niveles (Int solo añade habilidades a partir de ese nivel).</p>
                                    <p>4) Compra habilidades nivel a nivel para respetar máximos y posibles cambios de Inteligencia.</p>
                                    <p>5) Equipo: usa la tabla de riqueza y selecciona objetos (el DJ puede limitar el coste máximo a 1/4 de la riqueza).</p>
                                    <p>6) Ajusta detalles: montura de paladín, compañero animal, familiar, afiliaciones, etc.</p>
                                </div>
                                <div className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg p-4">
                                    <h3 className="text-gray-300 font-semibold mb-2">Objetos mágicos y creación</h3>
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>El DJ puede vetar objetos o fijar un coste máximo por objeto para evitar desequilibrios.</li>
                                        <li>Objetos de un solo uso cuestan x5 en mazmorras de una sola sesión; objetos con cargas tienen 1/5 de cargas.</li>
                                        <li>Puedes seleccionar varitas parcialmente usadas pagando proporcional al número de cargas restantes.</li>
                                        <li>Un lanzador puede gastar parte de su XP y oro iniciales para crear objetos si tiene las dotes necesarias.</li>
                                    </ul>
                                </div>
                            </div>
                            <WealthTable />
                        </CardContent>
                    </Card>
                </ScrollReveal>
            )}
        </div>
    );
}
