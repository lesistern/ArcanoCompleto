'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sword, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import weaponsData from '@/lib/data/3.5/weapons.json';
import { DnDWeapon } from '@/lib/types/item';
import { getItemCategoryColor, getWeaponIcon, extractTextColor } from '@/lib/utils/icons';

export default function ArmasPage() {
  const weapons = weaponsData as DnDWeapon[];

  // Filtrar solo armas mundanas (no mágicas)
  const allMundaneWeapons = weapons.filter(w => !w.isMagic);

  // Estados de filtros
  const [selectedWeaponType, setSelectedWeaponType] = useState<'all' | 'simple' | 'marcial' | 'exótica'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'melee' | 'ranged'>('all');
  const [selectedDamageType, setSelectedDamageType] = useState<'all' | 'Perforante' | 'Cortante' | 'Contundente'>('all');
  const [selectedSize, setSelectedSize] = useState<'all' | 'Diminuta' | 'Pequeña' | 'Mediana' | 'Grande'>('all');

  // Aplicar filtros
  const mundaneWeapons = allMundaneWeapons.filter(weapon => {
    // Filtro por tipo de arma
    if (selectedWeaponType !== 'all') {
      if (!weapon.weaponType.toLowerCase().includes(selectedWeaponType)) return false;
    }

    // Filtro por categoría (melee/ranged)
    if (selectedCategory !== 'all') {
      const isMelee = weapon.weaponType.includes('cuerpo a cuerpo');
      const isRanged = weapon.weaponType.includes('distancia');
      if (selectedCategory === 'melee' && !isMelee) return false;
      if (selectedCategory === 'ranged' && !isRanged) return false;
    }

    // Filtro por tipo de daño
    if (selectedDamageType !== 'all') {
      if (!weapon.stats.damageType.includes(selectedDamageType)) return false;
    }

    // Filtro por tamaño
    if (selectedSize !== 'all') {
      if (weapon.size !== selectedSize) return false;
    }

    return true;
  });

  // Categorizar armas por tipo principal
  const simpleWeapons = mundaneWeapons.filter(w => w.weaponType.includes('simple'));
  const martialWeapons = mundaneWeapons.filter(w => w.weaponType.includes('marcial'));
  const exoticWeapons = mundaneWeapons.filter(w => w.weaponType.includes('exótica'));

  // Subcategorizar armas simples
  const simpleUnarmed = simpleWeapons.filter(w =>
    ['guantelete', 'impacto-sin-arma'].includes(w.slug)
  );
  const simpleLightMelee = simpleWeapons.filter(w =>
    ['daga', 'guantelete-armado', 'hoz', 'maza-ligera', 'punal'].includes(w.slug)
  );
  const simpleOneHandedMelee = simpleWeapons.filter(w =>
    ['garrote', 'lucero-del-alba', 'maza-pesada', 'lanza-corta'].includes(w.slug)
  );
  const simpleTwoHandedMelee = simpleWeapons.filter(w =>
    ['baston', 'lanza-larga'].includes(w.slug)
  );
  const simpleRanged = simpleWeapons.filter(w =>
    w.weaponType.includes('distancia')
  );

  // Subcategorizar armas marciales
  const martialLightMelee = martialWeapons.filter(w =>
    ['armadura-con-puas', 'cachiporra', 'escudo-ligero', 'escudo-con-puas-ligero',
     'espada-corta', 'hacha-arrojadiza', 'hacha-de-mano', 'kukri', 'martillo-ligero',
     'pico-ligero'].includes(w.slug)
  );
  const martialOneHandedMelee = martialWeapons.filter(w =>
    ['cimitarra', 'escudo-pesado', 'escudo-con-puas-pesado', 'espada-larga', 'estoque',
     'hacha-de-batalla', 'mangual', 'martillo-de-guerra', 'pico-pesado', 'tridente'].includes(w.slug)
  );
  const martialTwoHandedMelee = martialWeapons.filter(w =>
    ['alabarda', 'alfanjon', 'guisarma', 'espadon', 'garrote-grande', 'hacha-grande',
     'guadana', 'guja', 'lanza-de-caballeria', 'mangual-pesado', 'ranseur'].includes(w.slug)
  );
  const martialRanged = martialWeapons.filter(w =>
    w.weaponType.includes('distancia')
  );

  // Subcategorizar armas exóticas
  const exoticLightMelee = exoticWeapons.filter(w =>
    ['kama', 'nunchaku', 'sai', 'siangham'].includes(w.slug)
  );
  const exoticOneHandedMelee = exoticWeapons.filter(w =>
    ['espada-bastarda', 'hacha-enana-de-guerra', 'latigo'].includes(w.slug)
  );
  const exoticTwoHandedMelee = exoticWeapons.filter(w =>
    ['cadena-con-pinchos', 'espada-de-dos-hojas', 'hacha-doble-orca', 'mangual-atroz',
     'martillo-ganchudo-gnomo', 'urgrosh-enano'].includes(w.slug)
  );
  const exoticRanged = exoticWeapons.filter(w =>
    w.weaponType.includes('distancia')
  );

  // Formatear costo
  const formatCost = (weapon: DnDWeapon) => {
    return weapon.cost.gold
      ? `${weapon.cost.gold} po`
      : weapon.cost.silver
        ? `${weapon.cost.silver} pp`
        : 'Gratis';
  };

  // Determinar abreviatura de tipo de daño
  const getDamageTypeAbbr = (type: string): string => {
    if (type === 'Perforante') return 'Perf';
    if (type === 'Cortante') return 'Cort';
    if (type === 'Contundente') return 'Cont';
    return type;
  };

  // Determinar color para un tipo de daño específico
  const getSingleDamageColor = (type: string): string => {
    if (type === 'Perforante') return 'text-green-400';
    if (type === 'Cortante') return 'text-red-400';
    if (type === 'Contundente') return 'text-blue-400';
    return 'text-gray-400';
  };

  // Determinar si un arma tiene daño "y" o "o" basado en el nombre del arma
  // En D&D 3.5, la Daga es "o" (P o S en inglés), el Lucero del Alba es "y" (B y P)
  const isDamageTypeAnd = (weaponName: string): boolean => {
    const andWeapons = ['lucero del alba', 'guadaña']; // Armas que hacen daño "y"
    return andWeapons.some(name => weaponName.toLowerCase().includes(name));
  };

  // Componente para renderizar una tarjeta de arma
  const WeaponCard = ({ weapon }: { weapon: DnDWeapon }) => {
    const Icon = getWeaponIcon(weapon);
    const categoryColor = getItemCategoryColor(weapon.category);
    const iconColor = extractTextColor(categoryColor);
    const costText = formatCost(weapon);

    // Renderizar tag de tipo de daño
    const renderDamageTypeTag = () => {
      const types = weapon.stats.damageType;

      if (types.length === 1) {
        // Tipo de daño simple
        const abbr = getDamageTypeAbbr(types[0]);
        const colorClass = getSingleDamageColor(types[0]);
        const bgClass = types[0] === 'Perforante' ? 'bg-green-500/20 border-green-500/30' :
                        types[0] === 'Cortante' ? 'bg-red-500/20 border-red-500/30' :
                        'bg-blue-500/20 border-blue-500/30';

        return (
          <span className={`text-xs px-2 py-0.5 rounded border ${bgClass} ${colorClass}`}>
            {abbr}
          </span>
        );
      } else {
        // Múltiples tipos de daño
        const isAnd = isDamageTypeAnd(weapon.name);
        const abbrs = types.map(getDamageTypeAbbr);

        if (isAnd) {
          // Daño "y" - usar gradiente diagonal con "/" en el medio
          const colors = types.map(getSingleDamageColor);

          // Determinar clases de gradiente completas (Tailwind necesita clases completas)
          let gradientClass = '';
          let borderClass = '';

          // Combinaciones posibles de tipos de daño
          const type1 = types[0];
          const type2 = types[1];

          if (type1 === 'Contundente' && type2 === 'Perforante') {
            gradientClass = 'bg-gradient-to-br from-blue-500/20 to-green-500/20';
            borderClass = 'border-blue-500/30';
          } else if (type1 === 'Perforante' && type2 === 'Cortante') {
            gradientClass = 'bg-gradient-to-br from-green-500/20 to-red-500/20';
            borderClass = 'border-green-500/30';
          } else if (type1 === 'Cortante' && type2 === 'Perforante') {
            gradientClass = 'bg-gradient-to-br from-red-500/20 to-green-500/20';
            borderClass = 'border-red-500/30';
          } else if (type1 === 'Contundente' && type2 === 'Cortante') {
            gradientClass = 'bg-gradient-to-br from-blue-500/20 to-red-500/20';
            borderClass = 'border-blue-500/30';
          } else {
            // Fallback genérico
            gradientClass = 'bg-gradient-to-br from-gray-500/20 to-gray-500/20';
            borderClass = 'border-gray-500/30';
          }

          return (
            <span className={`text-xs px-2 py-0.5 rounded border ${gradientClass} ${borderClass}`}>
              <span className={colors[0]}>{abbrs[0]}</span>
              <span className="text-dungeon-400">/</span>
              <span className={colors[1]}>{abbrs[1]}</span>
            </span>
          );
        } else {
          // Daño "o" - mostrar dos etiquetas separadas sin texto "o"
          return (
            <div className="flex items-center gap-1">
              {types.map((type, index) => {
                const abbr = getDamageTypeAbbr(type);
                const colorClass = getSingleDamageColor(type);
                const bgClass = type === 'Perforante' ? 'bg-green-500/20 border-green-500/30' :
                                type === 'Cortante' ? 'bg-red-500/20 border-red-500/30' :
                                'bg-blue-500/20 border-blue-500/30';

                return (
                  <span key={index} className={`text-xs px-2 py-0.5 rounded border ${bgClass} ${colorClass}`}>
                    {abbr}
                  </span>
                );
              })}
            </div>
          );
        }
      }
    };

    return (
      <Link href={`/objetos/${weapon.slug}`}>
        <Card className="h-full transition-all hover:border-dungeon-600 cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <Icon className={`h-6 w-6 ${iconColor}`} />
                <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                  {weapon.name}
                </CardTitle>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {renderDamageTypeTag()}
              <span className="text-xs px-2 py-0.5 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
                {weapon.stats.damage.medium}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
                {costText}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-dungeon-300 mb-3 line-clamp-2">
              {weapon.shortDescription}
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs">
                <span className="text-dungeon-500 font-semibold min-w-[80px]">Crítico:</span>
                <span className="text-dungeon-400">{weapon.stats.critical}</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <span className="text-dungeon-500 font-semibold min-w-[80px]">Daño:</span>
                <span className="text-dungeon-400">
                  {weapon.stats.damageType.join(', ')}
                </span>
              </div>
              {weapon.stats.range && (
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-dungeon-500 font-semibold min-w-[80px]">Alcance:</span>
                  <span className="text-dungeon-400">{weapon.stats.range} pies</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/objetos">
          <Button variant="secondary">Volver a objetos</Button>
        </Link>
      </div>

      {/* Header */}
      <div className="border-l-4 border-red-500 pl-6 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <Sword className="h-8 w-8 text-red-400" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
            Armas
          </h1>
        </div>
        <p className="text-lg text-dungeon-300">
          {allMundaneWeapons.length} armas del Manual del Jugador
        </p>
      </div>

      {/* Filtros */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gold-500" />
            <CardTitle className="text-lg">Filtros</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro por Tipo de Arma */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Tipo de arma
              </label>
              <select
                value={selectedWeaponType}
                onChange={(e) => setSelectedWeaponType(e.target.value as typeof selectedWeaponType)}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todas</option>
                <option value="simple">Simple</option>
                <option value="marcial">Marcial</option>
                <option value="exótica">Exótica</option>
              </select>
            </div>

            {/* Filtro por Categoría */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as typeof selectedCategory)}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todas</option>
                <option value="melee">Cuerpo a cuerpo</option>
                <option value="ranged">Distancia</option>
              </select>
            </div>

            {/* Filtro por Tipo de Daño */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Tipo de daño
              </label>
              <select
                value={selectedDamageType}
                onChange={(e) => setSelectedDamageType(e.target.value as typeof selectedDamageType)}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todos</option>
                <option value="Perforante">Perforante</option>
                <option value="Cortante">Cortante</option>
                <option value="Contundente">Contundente</option>
              </select>
            </div>

            {/* Filtro por Tamaño */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Tamaño
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as typeof selectedSize)}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todos</option>
                <option value="Diminuta">Diminuta</option>
                <option value="Pequeña">Pequeña</option>
                <option value="Mediana">Mediana</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 pt-4 border-t border-dungeon-700">
            <p className="text-sm text-dungeon-400">
              Mostrando <span className="text-gold-500 font-semibold">{mundaneWeapons.length}</span> de {allMundaneWeapons.length} armas
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Armas Simples */}
      {simpleWeapons.length > 0 && (
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-2">
              Armas simples
            </h2>
            <p className="text-sm text-dungeon-400">
              Armas fáciles de usar, accesibles para todas las clases
            </p>
          </div>

          {/* Ataques sin arma */}
          {simpleUnarmed.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-green-500">
                Ataques sin arma
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {simpleUnarmed.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}

          {/* Armas ligeras de cuerpo a cuerpo */}
          {simpleLightMelee.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-green-500">
                Armas ligeras de cuerpo a cuerpo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {simpleLightMelee.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}

          {/* Armas a una mano de cuerpo a cuerpo */}
          {simpleOneHandedMelee.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-green-500">
                Armas a una mano de cuerpo a cuerpo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {simpleOneHandedMelee.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}

          {/* Armas a dos manos de cuerpo a cuerpo */}
          {simpleTwoHandedMelee.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-green-500">
                Armas a dos manos de cuerpo a cuerpo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {simpleTwoHandedMelee.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}

          {/* Armas de ataque a distancia */}
          {simpleRanged.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-green-500">
                Armas de ataque a distancia
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {simpleRanged.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Armas Marciales */}
      {martialWeapons.length > 0 && (
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-2">
              Armas marciales
            </h2>
            <p className="text-sm text-dungeon-400">
              Armas de guerra que requieren entrenamiento militar
            </p>
          </div>

          {/* Armas ligeras de cuerpo a cuerpo */}
          {martialLightMelee.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-red-500">
                Armas ligeras de cuerpo a cuerpo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {martialLightMelee.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}

          {/* Armas a una mano de cuerpo a cuerpo */}
          {martialOneHandedMelee.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-red-500">
                Armas a una mano de cuerpo a cuerpo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {martialOneHandedMelee.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}

          {/* Armas a dos manos de cuerpo a cuerpo */}
          {martialTwoHandedMelee.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-red-500">
                Armas a dos manos de cuerpo a cuerpo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {martialTwoHandedMelee.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}

          {/* Armas de ataque a distancia */}
          {martialRanged.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-red-500">
                Armas de ataque a distancia
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {martialRanged.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Armas Exóticas */}
      {exoticWeapons.length > 0 && (
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-2">
              Armas exóticas
            </h2>
            <p className="text-sm text-dungeon-400">
              Armas especializadas que requieren dotes específicas para su uso
            </p>
          </div>

          {/* Armas ligeras de cuerpo a cuerpo */}
          {exoticLightMelee.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-gold-500">
                Armas ligeras de cuerpo a cuerpo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exoticLightMelee.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}

          {/* Armas a una mano de cuerpo a cuerpo */}
          {exoticOneHandedMelee.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-gold-500">
                Armas a una mano de cuerpo a cuerpo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exoticOneHandedMelee.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}

          {/* Armas a dos manos de cuerpo a cuerpo */}
          {exoticTwoHandedMelee.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-gold-500">
                Armas a dos manos de cuerpo a cuerpo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exoticTwoHandedMelee.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}

          {/* Armas de ataque a distancia */}
          {exoticRanged.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dungeon-200 mb-4 pl-3 border-l-2 border-gold-500">
                Armas de ataque a distancia
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exoticRanged.map((weapon) => (
                  <WeaponCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Back Button */}
      <div className="flex gap-4 mt-12">
        <Link href="/objetos">
          <Button variant="secondary">Volver a objetos</Button>
        </Link>
        <Link href="/">
          <Button variant="ghost">Inicio</Button>
        </Link>
      </div>
    </div>
  );
}
