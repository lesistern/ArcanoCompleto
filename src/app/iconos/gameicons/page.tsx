import Link from 'next/link';
import { ArrowLeft, ExternalLink, Download, Swords } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function GameIconsPage() {
  const categories = [
    { name: 'Armas', count: '300+', examples: 'Espadas, hachas, arcos, ballestas, dagas' },
    { name: 'Armaduras', count: '80+', examples: 'Escudos, yelmos, corazas, guanteletes' },
    { name: 'Hechizos', count: '200+', examples: 'Bolas de fuego, rayos, escudos mágicos' },
    { name: 'Criaturas', count: '500+', examples: 'Dragones, orcos, elfos, muertos vivientes' },
    { name: 'Clases', count: '100+', examples: 'Guerrero, mago, pícaro, clérigo' },
    { name: 'Objetos', count: '400+', examples: 'Pociones, pergaminos, gemas, monedas' },
    { name: 'Efectos', count: '150+', examples: 'Veneno, fuego, hielo, curación' },
    { name: 'Interfaz', count: '200+', examples: 'Dados, mapas, inventario, estadísticas' },
  ];

  const features = [
    {
      title: 'Formato SVG escalable',
      description: 'Todos los iconos están en formato vectorial, perfectos para cualquier tamaño'
    },
    {
      title: 'Licencia CC BY 3.0',
      description: 'Uso libre comercial y personal con atribución a los autores'
    },
    {
      title: 'Actualizaciones semanales',
      description: 'Nuevos iconos añadidos regularmente por la comunidad'
    },
    {
      title: 'Búsqueda avanzada',
      description: 'Sistema de etiquetas y categorías para encontrar el icono perfecto'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/iconos"
          className="inline-flex items-center text-sm text-dungeon-400 hover:text-dungeon-200 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a bibliotecas
        </Link>
      </div>

      {/* Header */}
      <div className="border-l-4 border-red-500 pl-6 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <Swords className="h-8 w-8 text-red-400" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
            Game-icons.net
          </h1>
        </div>
        <p className="text-lg text-dungeon-300 mb-4">
          La biblioteca más completa de iconos RPG y fantasía
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="px-3 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30">
            4,170+ iconos
          </span>
          <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
            CC BY 3.0
          </span>
          <span className="px-3 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30">
            Formato SVG
          </span>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <a
          href="https://game-icons.net"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Card className="h-full transition-all hover:border-red-500 cursor-pointer group bg-red-500/5">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Explorar biblioteca completa</span>
                <ExternalLink className="h-5 w-5 text-red-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dungeon-300">
                Visita game-icons.net para buscar y descargar iconos. El sitio incluye
                un buscador avanzado con filtros por categoría y etiquetas.
              </p>
            </CardContent>
          </Card>
        </a>

        <Card className="border-dungeon-700 bg-dungeon-800/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-gold-500" />
              Cómo integrar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-dungeon-300">
              <p>
                <span className="font-semibold text-gold-500">Opción 1:</span> Descarga SVG individuales desde el sitio
              </p>
              <p>
                <span className="font-semibold text-gold-500">Opción 2:</span> Usa el paquete npm{' '}
                <code className="text-green-400 font-mono">react-icons</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-6 pl-3 border-l-2 border-red-500">
          Categorías disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card key={category.name} className="border-dungeon-700 bg-dungeon-800/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  {category.name}
                  <span className="text-sm font-normal text-red-400">{category.count}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-dungeon-400">{category.examples}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-6 pl-3 border-l-2 border-gold-500">
          Características
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-dungeon-700 bg-dungeon-800/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-dungeon-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-dungeon-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Attribution Info */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6 mb-12">
        <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-3">
          Licencia y Atribución
        </h3>
        <div className="space-y-3 text-sm text-dungeon-300">
          <p>
            Game-icons.net está bajo licencia{' '}
            <span className="text-red-400 font-semibold">Creative Commons BY 3.0</span>.
            Esto significa que puedes:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Usar los iconos en proyectos comerciales y personales</li>
            <li>Modificar y adaptar los iconos a tus necesidades</li>
            <li>Redistribuir los iconos (con atribución)</li>
          </ul>
          <div className="bg-dungeon-900/50 rounded p-4 mt-4">
            <p className="text-xs font-semibold text-gold-500 mb-2">Requisito de atribución:</p>
            <p className="text-xs text-dungeon-400 font-mono">
              Debes dar crédito apropiado a game-icons.net y a los artistas individuales.
              La forma recomendada es incluir un enlace a{' '}
              <a
                href="https://game-icons.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline"
              >
                https://game-icons.net
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Installation Example */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6 mb-12">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          Ejemplo de instalación
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-dungeon-300 mb-2">
              1. Instalar react-icons (incluye Game-icons):
            </p>
            <div className="bg-dungeon-900/50 rounded p-4 font-mono text-xs">
              <code className="text-green-400">npm install</code>{' '}
              <code className="text-purple-400">react-icons</code>
            </div>
          </div>
          <div>
            <p className="text-sm text-dungeon-300 mb-2">
              2. Importar y usar iconos:
            </p>
            <div className="bg-dungeon-900/50 rounded p-4 font-mono text-xs">
              <code className="text-green-400">import</code>{' '}
              <code className="text-blue-400">{'{ GiSwordman, GiFireball }'}</code>{' '}
              <code className="text-green-400">from</code>{' '}
              <code className="text-amber-400">'react-icons/gi'</code>;
              <br /><br />
              <code className="text-gray-400">{'<'}</code>
              <code className="text-red-400">GiSwordman</code>{' '}
              <code className="text-purple-400">size</code>
              <code className="text-gray-400">=</code>
              <code className="text-amber-400">{'{32}'}</code>{' '}
              <code className="text-gray-400">/{'>'}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex gap-4">
        <Link href="/iconos">
          <Button variant="secondary">Volver a bibliotecas</Button>
        </Link>
        <Link href="/">
          <Button variant="ghost">Inicio</Button>
        </Link>
      </div>
    </div>
  );
}
