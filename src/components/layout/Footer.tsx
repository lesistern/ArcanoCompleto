import Link from 'next/link';
import Image from 'next/image';

/**
 * Footer con fondo de papel pergamino
 *
 * Para volver al diseño anterior (oscuro), cambiar usePaperBackground a false
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  // OPCIÓN DE ROLLBACK: Cambiar a false para volver al diseño oscuro original
  const usePaperBackground = false;

  if (!usePaperBackground) {
    // DISEÑO ORIGINAL (oscuro)
    return (
      <footer className="border-t border-dungeon-700 bg-dungeon-900">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* About */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-gold-400 mb-4">
                Compendio Arcano
              </h3>
              <p className="text-sm text-dungeon-400 leading-relaxed max-w-md mb-4">
                El compendio más completo de Dungeons & Dragons en español.
                Actualmente con D&D 3.5 completo. Próximamente: 5e y 5.5e (One D&D).
              </p>
              <p className="text-xs text-dungeon-500">
                Contenido bajo Open Game License v1.0a. System Reference Document oficial.
                No afiliado con Wizards of the Coast.
              </p>
            </div>

            {/* Compendio */}
            <div>
              <h3 className="text-xs font-semibold text-dungeon-400 uppercase tracking-wider mb-3">
                Compendio
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/clases" className="text-dungeon-400 hover:text-gold-400 transition-colors">
                    Clases
                  </Link>
                </li>
                <li>
                  <Link href="/razas" className="text-dungeon-400 hover:text-gold-400 transition-colors">
                    Razas
                  </Link>
                </li>
                <li>
                  <Link href="/dotes" className="text-dungeon-400 hover:text-gold-400 transition-colors">
                    Dotes
                  </Link>
                </li>
                <li>
                  <Link href="/habilidades" className="text-dungeon-400 hover:text-gold-400 transition-colors">
                    Habilidades
                  </Link>
                </li>
                <li>
                  <Link href="/objetos/armas" className="text-dungeon-400 hover:text-gold-400 transition-colors">
                    Armas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Comunidad y Recursos */}
            <div>
              <h3 className="text-xs font-semibold text-dungeon-400 uppercase tracking-wider mb-3">
                Comunidad
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/editor-personajes" className="text-dungeon-400 hover:text-gold-400 transition-colors">
                    Editor de Personajes
                  </Link>
                </li>
                <li>
                  <Link href="/foro" className="text-dungeon-400 hover:text-gold-400 transition-colors">
                    Foro
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="text-dungeon-400 hover:text-gold-400 transition-colors">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="text-dungeon-400 hover:text-gold-400 transition-colors">
                    Reportar Bug
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" className="text-dungeon-400 hover:text-gold-400 transition-colors font-semibold">
                    Quiénes Somos
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-dungeon-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-dungeon-500 text-center md:text-left">
              © {currentYear} Compendio Arcano • Contenido educativo bajo OGL
            </p>
            <div className="flex gap-4 text-xs">
              <Link href="/licencia" className="text-dungeon-500 hover:text-dungeon-300 transition-colors">
                Licencia OGL
              </Link>
              <Link href="/privacidad" className="text-dungeon-500 hover:text-dungeon-300 transition-colors">
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // NUEVO DISEÑO (fondo de papel con texto oscuro)
  return (
    <footer className="relative border-t border-gray-300 overflow-hidden">
      {/* Imagen de fondo de papel */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/footer-paper.png"
          alt="Fondo de pergamino"
          fill
          className="object-cover"
          priority={false}
          quality={90}
        />
      </div>

      {/* Contenido del footer */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Compendio Arcano
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed max-w-md mb-4">
              El compendio más completo de Dungeons & Dragons en español.
              Actualmente con D&D 3.5 completo. Próximamente: 5e y 5.5e (One D&D).
            </p>
            <p className="text-xs text-gray-600">
              Contenido bajo Open Game License v1.0a. System Reference Document oficial.
              No afiliado con Wizards of the Coast.
            </p>
          </div>

          {/* Compendio */}
          <div>
            <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">
              Compendio
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/clases"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Clases
                </Link>
              </li>
              <li>
                <Link
                  href="/razas"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Razas
                </Link>
              </li>
              <li>
                <Link
                  href="/dotes"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Dotes
                </Link>
              </li>
              <li>
                <Link
                  href="/habilidades"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Habilidades
                </Link>
              </li>
              <li>
                <Link
                  href="/objetos/armas"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Armas
                </Link>
              </li>
            </ul>
          </div>

          {/* Comunidad y Recursos */}
          <div>
            <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">
              Comunidad
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/editor-personajes"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Editor de Personajes
                </Link>
              </li>
              <li>
                <Link
                  href="/foro"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Foro
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Reportar Bug
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-semibold"
                >
                  Quiénes Somos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 text-center md:text-left">
            © {currentYear} Compendio Arcano • Contenido educativo bajo OGL
          </p>
          <div className="flex gap-4 text-xs">
            <Link
              href="/licencia"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Licencia OGL
            </Link>
            <Link
              href="/privacidad"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
