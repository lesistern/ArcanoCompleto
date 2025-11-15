import Link from 'next/link';
import { ArrowLeft, ExternalLink, Dice6, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function RPGAwesomePage() {
  const categories = [
    { name: 'Dados y Juego', count: '50+', examples: 'd4, d6, d8, d10, d12, d20, dados personalizados' },
    { name: 'Estadísticas', count: '40+', examples: 'HP, mana, stamina, experiencia, nivel' },
    { name: 'Armas Fantasy', count: '80+', examples: 'Espadas mágicas, bastones, dagas místicas' },
    { name: 'Hechizos', count: '60+', examples: 'Conjuros, auras, efectos mágicos' },
    { name: 'Clases', count: '45+', examples: 'Iconos específicos para clases D&D' },
    { name: 'Items', count: '70+', examples: 'Pociones, pergaminos, amuletos, anillos' },
    { name: 'Interfaz de Juego', count: '100+', examples: 'Inventario, menús, controles, alertas' },
    { name: 'Varios', count: '50+', examples: 'Tokens, marcadores, símbolos místicos' },
  ];

  const advantages = [
    {
      title: 'Diseñado para RPG',
      description: 'Todos los iconos están específicamente diseñados para juegos de rol'
    },
    {
      title: 'Font Icon Kit',
      description: 'Disponible como fuente tipográfica para fácil integración CSS'
    },
    {
      title: 'Doble Licencia',
      description: 'SIL OFL 1.1 para fuentes y MIT para código CSS'
    },
    {
      title: 'Ligero y rápido',
      description: 'Optimizado para carga rápida en aplicaciones web'
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
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <Dice6 className="h-8 w-8 text-gold-500" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
            RPG Awesome
          </h1>
        </div>
        <p className="text-lg text-dungeon-300 mb-4">
          Font icon kit especializado en iconos de fantasía y juegos de rol
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="px-3 py-1 rounded bg-gold-500/20 text-gold-500 border border-gold-500/30">
            495 iconos
          </span>
          <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
            SIL OFL 1.1 + MIT
          </span>
          <span className="px-3 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
            Font Kit
          </span>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <a
          href="https://nagoshiashumari.github.io/Rpg-Awesome/"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Card className="h-full transition-all hover:border-gold-500 cursor-pointer group bg-gold-500/5">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Ver todos los iconos</span>
                <ExternalLink className="h-5 w-5 text-gold-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dungeon-300">
                Visita la documentación oficial para ver la galería completa de iconos
                y ejemplos de uso.
              </p>
            </CardContent>
          </Card>
        </a>

        <Card className="border-dungeon-700 bg-dungeon-800/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-400" />
              Ideal para
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-dungeon-300">
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                <span>Hojas de personaje digitales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                <span>Sistemas de combate y estadísticas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                <span>Interfaces de gestión de inventario</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-6 pl-3 border-l-2 border-gold-500">
          Categorías de iconos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Card key={category.name} className="border-dungeon-700 bg-dungeon-800/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  {category.name}
                  <span className="text-sm font-normal text-gold-500">{category.count}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-dungeon-400">{category.examples}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Advantages */}
      <div className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-6 pl-3 border-l-2 border-purple-500">
          Ventajas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((advantage) => (
            <Card key={advantage.title} className="border-dungeon-700 bg-dungeon-800/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-dungeon-100 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-sm text-dungeon-300">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6 mb-12">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          ¿Cuándo usar RPG Awesome?
        </h3>
        <div className="space-y-4 text-sm text-dungeon-300">
          <div>
            <p className="font-semibold text-dungeon-100 mb-2">✅ Úsalo para:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Iconos de dados y mecánicas de juego</li>
              <li>Barras de estadísticas (HP, Mana, XP)</li>
              <li>Símbolos de estados y efectos</li>
              <li>Elementos de UI específicos de RPG</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-dungeon-100 mb-2">⚠️ Mejor usar Game-icons.net para:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Gran variedad de armas y armaduras</li>
              <li>Iconos de monstruos y criaturas</li>
              <li>Más opciones de objetos mágicos</li>
              <li>Iconos más detallados y específicos</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Installation */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6 mb-12">
        <h3 className="text-sm font-semibold text-purple-500 uppercase tracking-wider mb-3">
          Instalación y uso
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-dungeon-300 mb-2">
              1. Incluir vía CDN (más rápido):
            </p>
            <div className="bg-dungeon-900/50 rounded p-4 font-mono text-xs overflow-x-auto">
              <code className="text-gray-400">{'<'}</code>
              <code className="text-red-400">link</code>{' '}
              <code className="text-purple-400">href</code>
              <code className="text-gray-400">=</code>
              <code className="text-amber-400">"https://cdn.jsdelivr.net/npm/rpg-awesome@0.2.0/css/rpg-awesome.min.css"</code>{' '}
              <code className="text-purple-400">rel</code>
              <code className="text-gray-400">=</code>
              <code className="text-amber-400">"stylesheet"</code>
              <code className="text-gray-400">{'/>'}</code>
            </div>
          </div>
          <div>
            <p className="text-sm text-dungeon-300 mb-2">
              2. Usar iconos en HTML:
            </p>
            <div className="bg-dungeon-900/50 rounded p-4 font-mono text-xs">
              <code className="text-gray-400">{'<'}</code>
              <code className="text-red-400">i</code>{' '}
              <code className="text-purple-400">class</code>
              <code className="text-gray-400">=</code>
              <code className="text-amber-400">"ra ra-sword"</code>
              <code className="text-gray-400">{'></'}</code>
              <code className="text-red-400">i</code>
              <code className="text-gray-400">{'>'}</code>
              <br />
              <code className="text-gray-400">{'<'}</code>
              <code className="text-red-400">i</code>{' '}
              <code className="text-purple-400">class</code>
              <code className="text-gray-400">=</code>
              <code className="text-amber-400">"ra ra-fireball"</code>
              <code className="text-gray-400">{'></'}</code>
              <code className="text-red-400">i</code>
              <code className="text-gray-400">{'>'}</code>
            </div>
          </div>
          <div>
            <p className="text-sm text-dungeon-300 mb-2">
              3. O instalar vía npm:
            </p>
            <div className="bg-dungeon-900/50 rounded p-4 font-mono text-xs">
              <code className="text-green-400">npm install</code>{' '}
              <code className="text-purple-400">rpg-awesome</code>
            </div>
          </div>
        </div>
      </div>

      {/* License Info */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6 mb-12">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          Licencias
        </h3>
        <div className="space-y-3 text-sm text-dungeon-300">
          <div>
            <p className="font-semibold text-dungeon-100">SIL OFL 1.1 (Fuente tipográfica)</p>
            <p className="text-xs text-dungeon-400 mt-1">
              La fuente de iconos puede ser usada libremente en proyectos comerciales y personales.
            </p>
          </div>
          <div>
            <p className="font-semibold text-dungeon-100">MIT License (CSS y código)</p>
            <p className="text-xs text-dungeon-400 mt-1">
              El código CSS y archivos de soporte están bajo licencia MIT, permitiendo uso comercial sin restricciones.
            </p>
          </div>
          <div className="bg-dungeon-900/50 rounded p-4 mt-4">
            <p className="text-xs font-semibold text-purple-400 mb-2">
              No se requiere atribución obligatoria, pero es apreciada.
            </p>
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
