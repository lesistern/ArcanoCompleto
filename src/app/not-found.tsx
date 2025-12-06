import Link from 'next/link';
import Image from 'next/image';
import { Home, Compass, Skull } from 'lucide-react';
import { pageContainerPadding } from '@/lib/utils/responsive-spacing';
import { Card, CardContent } from '@/components/ui/Card';

export default function NotFound() {
  // Mensajes aleatorios para hacer la página más divertida
  const messages = [
    {
      title: "¡Pifia crítica!",
      subtitle: "Tiraste un 1 natural en tu chequeo de Navegación",
      description: "El pasillo que buscabas se ha desvanecido en la oscuridad de la mazmorra. Quizás un hechicero ilusionista te ha gastado una broma...",
    },
    {
      title: "¡Es un Mímico!",
      subtitle: "La página que buscabas resultó ser un cofre con dientes",
      description: "Lo que parecía una URL prometedora era en realidad una criatura hambrienta. Has sobrevivido, pero la página no existe.",
    },
    {
      title: "Territorio Inexplorado",
      subtitle: "Tu mapa no muestra esta región",
      description: "Has llegado al borde del mundo conocido. Más allá solo hay dragones... y errores 404.",
    },
    {
      title: "¡Trampa de Teletransporte!",
      subtitle: "Has activado una runa mágica defectuosa",
      description: "El portal te ha dejado en el vacío entre dimensiones. Esta página no existe en ningún plano material.",
    },
    {
      title: "El Dungeon Master dice NO",
      subtitle: "Esta aventura no está disponible",
      description: "Has intentado acceder a contenido que el DM no ha preparado todavía. Vuelve a la taberna y elige otra misión.",
    },
  ];

  // Seleccionar mensaje aleatorio (en servidor siempre será el primero, pero está bien)
  const randomIndex = Math.floor(Math.random() * messages.length);
  const message = messages[randomIndex];

  return (
    <div className={`min-h-screen bg-dungeon-950 ${pageContainerPadding}`}>
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-dungeon-700 bg-dungeon-900 overflow-hidden">
          {/* Header con el número 404 estilizado */}
          <div className="bg-gradient-to-br from-red-900/30 to-dungeon-900 p-8 text-center border-b border-dungeon-700">
            <div className="flex items-center justify-center gap-4 mb-2">
              <Skull className="w-14 h-14 text-red-500 animate-pulse" />
              <span className="text-9xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                404
              </span>
              <Skull className="w-14 h-14 text-red-500 animate-pulse" />
            </div>
            <h1 className="text-xl font-semibold text-dungeon-200 mb-2">
              Página no encontrada
            </h1>
            <p className="text-dungeon-400 text-sm">
              ~ Encuentro con lo desconocido ~
            </p>
          </div>

          <CardContent className="p-8 text-center">
            {/* Icono de D20 con pifia */}
            <div className="flex justify-center mb-6">
              <div className="relative w-[200px] h-[200px]">
                <Image
                  src="/d20-dice.png"
                  alt="D20 - Pifia crítica"
                  width={200}
                  height={200}
                  className="w-full h-full opacity-70"
                  style={{ filter: 'invert(35%) sepia(100%) saturate(1000%) hue-rotate(330deg)' }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-red-400 drop-shadow-lg">
                  1
                </span>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gold-400 mb-2">
              {message.title}
            </h1>

            <h2 className="text-lg text-dungeon-300 mb-4 italic">
              {message.subtitle}
            </h2>

            <p className="text-dungeon-400 mb-8 max-w-md mx-auto">
              {message.description}
            </p>

            {/* Botones de navegación */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-semibold rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                Volver a la Taberna
              </Link>

              <Link
                href="/reglas"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-dungeon-600 hover:border-gold-500 text-dungeon-200 hover:text-gold-400 rounded-lg transition-colors"
              >
                <Compass className="w-4 h-4" />
                Explorar el Compendio
              </Link>
            </div>

            {/* Tip de humor */}
            <p className="mt-8 text-xs text-dungeon-600 italic">
              Consejo del DM: Intenta tirar un d20 para encontrar otra página.
              (O simplemente usa el menú de navegación)
            </p>
          </CardContent>
        </Card>

        {/* Easter egg */}
        <p className="text-center text-dungeon-700 text-xs mt-4">
          "En mi campaña, los errores 404 hacen 2d6 de daño psíquico" - Dungeon Master anónimo
        </p>
      </div>
    </div>
  );
}
