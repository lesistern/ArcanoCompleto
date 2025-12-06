import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Compendio Arcano',
  description: 'Política de privacidad de Compendio Arcano',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gold-400 mb-8">Política de Privacidad</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-dungeon-200">
        <p className="text-dungeon-300">
          Última actualización: {new Date().toLocaleDateString('es-AR')}
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">1. Información que Recopilamos</h2>
          <p>Compendio Arcano recopila la siguiente información:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Información de cuenta:</strong> Email y nombre de usuario cuando te registrás</li>
            <li><strong>Datos de uso:</strong> Páginas visitadas, personajes creados, preferencias de idioma</li>
            <li><strong>Información de Patreon:</strong> Si sos mecenas, recibimos tu email y nivel de membresía</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">2. Cómo Usamos tu Información</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Proporcionar y mejorar nuestros servicios</li>
            <li>Gestionar tu cuenta y preferencias</li>
            <li>Sincronizar beneficios de Patreon</li>
            <li>Comunicarnos contigo sobre actualizaciones importantes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">3. Almacenamiento de Datos</h2>
          <p>
            Tus datos se almacenan de forma segura en servidores de Supabase (PostgreSQL) con:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encriptación en tránsito (TLS/SSL)</li>
            <li>Row Level Security (RLS) para proteger tu información</li>
            <li>Backups automáticos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">4. Compartir Información</h2>
          <p>
            <strong>No vendemos ni compartimos</strong> tu información personal con terceros, excepto:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cuando es requerido por ley</li>
            <li>Con proveedores de servicios esenciales (Supabase, Vercel)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">5. Tus Derechos</h2>
          <p>Tenés derecho a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acceder a tus datos personales</li>
            <li>Corregir información incorrecta</li>
            <li>Solicitar la eliminación de tu cuenta</li>
            <li>Exportar tus datos (personajes, configuración)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">6. Cookies</h2>
          <p>
            Usamos cookies esenciales para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mantener tu sesión iniciada</li>
            <li>Recordar tu preferencia de idioma</li>
            <li>Mejorar el rendimiento del sitio</li>
          </ul>
          <p className="mt-2">No usamos cookies de tracking ni publicidad.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">7. Contacto</h2>
          <p>
            Para consultas sobre privacidad, contactanos en:{' '}
            <a href="mailto:privacidad@compendioarcano.com.ar" className="text-gold-400 hover:text-gold-300">
              privacidad@compendioarcano.com.ar
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
