import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-dungeon-700 bg-dungeon-900">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-dungeon-400 uppercase tracking-wider mb-3">
              Sistema de Referencia D&D 3.5
            </h3>
            <p className="text-sm text-dungeon-400 leading-relaxed max-w-md">
              Contenido bajo Open Game License v1.0a. System Reference Document oficial.
              No afiliado con Wizards of the Coast.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold text-dungeon-400 uppercase tracking-wider mb-3">
              Recursos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/licencia"
                  className="text-dungeon-400 hover:text-dungeon-200 transition-colors"
                >
                  Licencia OGL
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-dungeon-400 hover:text-dungeon-200 transition-colors"
                >
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dungeon-700">
          <p className="text-xs text-dungeon-500">
            © {currentYear} • Contenido educativo bajo OGL
          </p>
        </div>
      </div>
    </footer>
  );
}
