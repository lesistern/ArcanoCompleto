'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, ExternalLink, FolderOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import * as LucideIcons from 'lucide-react';

export default function IconosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLibrary, setSelectedLibrary] = useState<'all' | 'lucide' | 'gameicons' | 'rpgawesome'>('all');

  // Bibliotecas de iconos disponibles
  const iconLibraries = [
    {
      id: 'lucide',
      name: 'Lucide React',
      description: 'Biblioteca de iconos general con excelente soporte React',
      license: 'ISC License',
      url: 'https://lucide.dev',
      icons: '1,000+',
      recommended: 'UI general, interfaz',
      color: 'purple'
    },
    {
      id: 'gameicons',
      name: 'Game-icons.net',
      description: 'Biblioteca especializada en iconos RPG/Fantasy',
      license: 'CC BY 3.0',
      url: 'https://game-icons.net',
      icons: '4,170+',
      recommended: 'Armas, hechizos, criaturas, clases',
      color: 'red'
    },
    {
      id: 'rpgawesome',
      name: 'RPG Awesome',
      description: 'Font icon kit temático de fantasía',
      license: 'SIL OFL 1.1 + MIT',
      url: 'https://nagoshiashumari.github.io/Rpg-Awesome/',
      icons: '495',
      recommended: 'Iconos de juego, estadísticas, dados',
      color: 'gold'
    }
  ];

  // Iconos organizados por categorías para D&D
  const iconCategories = {
    'Razas': [
      { name: 'User', label: 'Humano', Icon: LucideIcons.User },
      { name: 'Users', label: 'Grupo', Icon: LucideIcons.Users },
      { name: 'Smile', label: 'Halfling', Icon: LucideIcons.Smile },
      { name: 'TreePine', label: 'Elfo', Icon: LucideIcons.TreePine },
      { name: 'Mountain', label: 'Enano', Icon: LucideIcons.Mountain },
      { name: 'Flame', label: 'Dragonborn', Icon: LucideIcons.Flame },
      { name: 'Moon', label: 'Elfo Oscuro', Icon: LucideIcons.Moon },
      { name: 'Footprints', label: 'Gnomo', Icon: LucideIcons.Footprints },
      { name: 'Shield', label: 'Guerrero', Icon: LucideIcons.Shield },
      { name: 'Crown', label: 'Noble', Icon: LucideIcons.Crown },
    ],
    'Clases': [
      { name: 'Sword', label: 'Guerrero', Icon: LucideIcons.Sword },
      { name: 'Swords', label: 'Bárbaro', Icon: LucideIcons.Swords },
      { name: 'Shield', label: 'Paladín', Icon: LucideIcons.Shield },
      { name: 'Target', label: 'Arquero', Icon: LucideIcons.Target },
      { name: 'Sparkles', label: 'Mago', Icon: LucideIcons.Sparkles },
      { name: 'Wand', label: 'Hechicero', Icon: LucideIcons.Wand },
      { name: 'Book', label: 'Clérigo', Icon: LucideIcons.Book },
      { name: 'BookOpen', label: 'Druida', Icon: LucideIcons.BookOpen },
      { name: 'Music', label: 'Bardo', Icon: LucideIcons.Music },
      { name: 'Eye', label: 'Monje', Icon: LucideIcons.Eye },
      { name: 'Feather', label: 'Pícaro', Icon: LucideIcons.Feather },
      { name: 'Skull', label: 'Nigromante', Icon: LucideIcons.Skull },
      { name: 'Heart', label: 'Curandero', Icon: LucideIcons.Heart },
      { name: 'Zap', label: 'Invocador', Icon: LucideIcons.Zap },
    ],
    'Armas': [
      { name: 'Sword', label: 'Espada', Icon: LucideIcons.Sword },
      { name: 'Swords', label: 'Espadas Cruzadas', Icon: LucideIcons.Swords },
      { name: 'Axe', label: 'Hacha', Icon: LucideIcons.Axe },
      { name: 'Hammer', label: 'Martillo', Icon: LucideIcons.Hammer },
      { name: 'Target', label: 'Arco/Diana', Icon: LucideIcons.Target },
      { name: 'Crosshair', label: 'Ballesta', Icon: LucideIcons.Crosshair },
      { name: 'ArrowUpRight', label: 'Flecha', Icon: LucideIcons.ArrowUpRight },
      { name: 'Waypoints', label: 'Arma Doble', Icon: LucideIcons.Waypoints },
      { name: 'Grip', label: 'Empuñadura', Icon: LucideIcons.Grip },
      { name: 'Slash', label: 'Corte', Icon: LucideIcons.Slash },
    ],
    'Hechizos - Elementos': [
      { name: 'Flame', label: 'Fuego', Icon: LucideIcons.Flame },
      { name: 'Droplet', label: 'Agua', Icon: LucideIcons.Droplet },
      { name: 'Wind', label: 'Aire', Icon: LucideIcons.Wind },
      { name: 'Mountain', label: 'Tierra', Icon: LucideIcons.Mountain },
      { name: 'Snowflake', label: 'Hielo', Icon: LucideIcons.Snowflake },
      { name: 'Zap', label: 'Rayo', Icon: LucideIcons.Zap },
      { name: 'Sun', label: 'Luz', Icon: LucideIcons.Sun },
      { name: 'Moon', label: 'Oscuridad', Icon: LucideIcons.Moon },
      { name: 'Sparkles', label: 'Magia', Icon: LucideIcons.Sparkles },
    ],
    'Hechizos - Tipos': [
      { name: 'Wand', label: 'Encantamiento', Icon: LucideIcons.Wand },
      { name: 'Eye', label: 'Adivinación', Icon: LucideIcons.Eye },
      { name: 'Skull', label: 'Nigromancia', Icon: LucideIcons.Skull },
      { name: 'Brain', label: 'Ilusión', Icon: LucideIcons.Brain },
      { name: 'Target', label: 'Evocación', Icon: LucideIcons.Target },
      { name: 'ShieldCheck', label: 'Abjuración', Icon: LucideIcons.ShieldCheck },
      { name: 'Shapes', label: 'Transmutación', Icon: LucideIcons.Shapes },
      { name: 'Package', label: 'Conjuración', Icon: LucideIcons.Package },
      { name: 'Star', label: 'Divino', Icon: LucideIcons.Star },
      { name: 'Hexagon', label: 'Arcano', Icon: LucideIcons.Hexagon },
    ],
    'Objetos y Equipamiento': [
      { name: 'Shield', label: 'Escudo', Icon: LucideIcons.Shield },
      { name: 'ShieldCheck', label: 'Armadura', Icon: LucideIcons.ShieldCheck },
      { name: 'FlaskConical', label: 'Poción', Icon: LucideIcons.FlaskConical },
      { name: 'Scroll', label: 'Pergamino', Icon: LucideIcons.Scroll },
      { name: 'Package', label: 'Mochila', Icon: LucideIcons.Package },
      { name: 'Coins', label: 'Oro', Icon: LucideIcons.Coins },
      { name: 'Gem', label: 'Gema', Icon: LucideIcons.Gem },
      { name: 'Crown', label: 'Corona', Icon: LucideIcons.Crown },
      { name: 'Weight', label: 'Peso', Icon: LucideIcons.Weight },
      { name: 'Key', label: 'Llave', Icon: LucideIcons.Key },
    ],
    'Efectos y Estados': [
      { name: 'HeartPulse', label: 'Curación', Icon: LucideIcons.HeartPulse },
      { name: 'Heart', label: 'Vida', Icon: LucideIcons.Heart },
      { name: 'Skull', label: 'Veneno', Icon: LucideIcons.Skull },
      { name: 'Flame', label: 'Quemadura', Icon: LucideIcons.Flame },
      { name: 'Snowflake', label: 'Congelado', Icon: LucideIcons.Snowflake },
      { name: 'Zap', label: 'Paralizado', Icon: LucideIcons.Zap },
      { name: 'Eye', label: 'Ceguera', Icon: LucideIcons.Eye },
      { name: 'EyeOff', label: 'Invisibilidad', Icon: LucideIcons.EyeOff },
      { name: 'ShieldAlert', label: 'Vulnerabilidad', Icon: LucideIcons.ShieldAlert },
      { name: 'ShieldCheck', label: 'Resistencia', Icon: LucideIcons.ShieldCheck },
    ],
    'Atributos': [
      { name: 'Dumbbell', label: 'Fuerza', Icon: LucideIcons.Dumbbell },
      { name: 'Footprints', label: 'Destreza', Icon: LucideIcons.Footprints },
      { name: 'Heart', label: 'Constitución', Icon: LucideIcons.Heart },
      { name: 'Brain', label: 'Inteligencia', Icon: LucideIcons.Brain },
      { name: 'Eye', label: 'Sabiduría', Icon: LucideIcons.Eye },
      { name: 'MessageCircle', label: 'Carisma', Icon: LucideIcons.MessageCircle },
    ],
    'Varios': [
      { name: 'Dice1', label: 'Dado 1', Icon: LucideIcons.Dice1 },
      { name: 'Dice2', label: 'Dado 2', Icon: LucideIcons.Dice2 },
      { name: 'Dice3', label: 'Dado 3', Icon: LucideIcons.Dice3 },
      { name: 'Dice4', label: 'Dado 4', Icon: LucideIcons.Dice4 },
      { name: 'Dice5', label: 'Dado 5', Icon: LucideIcons.Dice5 },
      { name: 'Dice6', label: 'Dado 6', Icon: LucideIcons.Dice6 },
      { name: 'Map', label: 'Mapa', Icon: LucideIcons.Map },
      { name: 'Compass', label: 'Brújula', Icon: LucideIcons.Compass },
      { name: 'Castle', label: 'Castillo', Icon: LucideIcons.Castle },
      { name: 'Flag', label: 'Bandera', Icon: LucideIcons.Flag },
    ],
  };

  // Filtrar iconos según búsqueda
  const filteredCategories = Object.entries(iconCategories).reduce((acc, [category, icons]) => {
    const filtered = icons.filter(icon =>
      icon.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, typeof iconCategories[keyof typeof iconCategories]>);

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-dungeon-400 hover:text-dungeon-200 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>
      </div>

      {/* Header */}
      <div className="border-l-4 border-purple-500 pl-6 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <LucideIcons.Sparkles className="h-8 w-8 text-purple-400" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
            Biblioteca de Iconos
          </h1>
        </div>
        <p className="text-lg text-dungeon-300">
          Recursos de iconos gratuitos para el compendio de D&D 3.5
        </p>
      </div>

      {/* Icon Libraries Cards */}
      <div className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-6 pl-3 border-l-2 border-gold-500">
          Explora por Biblioteca
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {iconLibraries.map((library) => {
            const bgColor = library.id === 'lucide' ? 'bg-purple-500/10' :
                           library.id === 'gameicons' ? 'bg-red-500/10' :
                           'bg-gold-500/10';
            const borderColor = library.id === 'lucide' ? 'border-purple-500/30' :
                               library.id === 'gameicons' ? 'border-red-500/30' :
                               'border-gold-500/30';
            const iconColor = library.id === 'lucide' ? 'text-purple-400' :
                             library.id === 'gameicons' ? 'text-red-400' :
                             'text-gold-500';

            return (
              <Link key={library.id} href={`/iconos/${library.id}`}>
                <Card className={`h-full transition-all hover:border-${library.color}-500 cursor-pointer group ${bgColor} ${borderColor}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FolderOpen className={`h-5 w-5 ${iconColor}`} />
                        {library.name}
                      </CardTitle>
                      <span className={`text-sm font-bold ${iconColor}`}>{library.icons}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-dungeon-300">{library.description}</p>
                      <div className="text-xs text-dungeon-400">
                        <span className="font-semibold">Ideal para:</span> {library.recommended}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-6 pl-3 border-l-2 border-purple-500">
          Vista Rápida - Lucide React
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dungeon-500" />
          <input
            type="text"
            placeholder="Buscar iconos de Lucide..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dungeon-800 border border-dungeon-700 rounded-lg pl-10 pr-4 py-3 text-dungeon-200 placeholder:text-dungeon-500 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Icon Categories */}
      <div className="space-y-12">
        {Object.entries(filteredCategories).map(([category, icons]) => (
          <div key={category}>
            <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-6 pl-3 border-l-2 border-purple-500">
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {icons.map(({ name, label, Icon }) => (
                <Card
                  key={name}
                  className="transition-all hover:border-purple-500 cursor-pointer group"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 bg-dungeon-800/50 rounded-lg group-hover:bg-purple-500/10 transition-colors">
                        <Icon className="h-8 w-8 text-dungeon-300 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-dungeon-200 mb-1">
                          {label}
                        </p>
                        <p className="text-xs text-dungeon-500 font-mono">
                          {name}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {Object.keys(filteredCategories).length === 0 && (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-dungeon-600 mx-auto mb-4" />
          <h2 className="text-2xl font-heading text-dungeon-300 mb-2">
            No se encontraron iconos
          </h2>
          <p className="text-dungeon-400">
            Intenta con otro término de búsqueda
          </p>
        </div>
      )}

      {/* Icon Libraries Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-heading font-bold text-dungeon-100 mb-6 pl-3 border-l-2 border-gold-500">
          Bibliotecas de Iconos Recomendadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {iconLibraries.map((library) => (
            <Card key={library.id} className="border-dungeon-700 bg-dungeon-800/30">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{library.name}</CardTitle>
                  <a
                    href={library.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dungeon-400 hover:text-gold-500 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-dungeon-300">{library.description}</p>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-dungeon-500 font-semibold">Licencia:</span>
                      <span className="text-dungeon-300">{library.license}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-dungeon-500 font-semibold">Iconos:</span>
                      <span className="text-gold-500 font-bold">{library.icons}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-dungeon-500 font-semibold">Recomendado:</span>
                      <span className="text-dungeon-300">{library.recommended}</span>
                    </div>
                  </div>

                  <a
                    href={library.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors mt-2"
                  >
                    Visitar sitio web
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Current Implementation Info */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6 mt-12">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          Implementación Actual
        </h3>
        <div className="space-y-3 text-sm text-dungeon-300">
          <p>
            Los iconos mostrados arriba provienen de <span className="text-purple-400 font-semibold">Lucide React</span>,
            que ya está instalado en el proyecto y listo para usar.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Próximos pasos:</span> Se recomienda integrar
            <span className="text-red-400 font-semibold"> Game-icons.net</span> para obtener iconos específicos
            de D&D como clases, razas, hechizos y monstruos.
          </p>
          <div className="bg-dungeon-900/50 rounded p-4 mt-4">
            <p className="text-xs text-dungeon-400 font-mono">
              Para integrar Game-icons.net, puedes usar el paquete{' '}
              <span className="text-green-400">react-icons</span> que incluye múltiples bibliotecas,
              o descargar los SVG directamente desde su sitio web.
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex gap-4 mt-12">
        <Link href="/">
          <Button variant="secondary">Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}
