import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio | Compendio Arcano',
  description: 'Términos y condiciones de uso de Compendio Arcano',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gold-400 mb-8">Términos de Servicio</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-dungeon-200">
        <p className="text-dungeon-300">
          Última actualización: {new Date().toLocaleDateString('es-AR')}
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">1. Aceptación de los Términos</h2>
          <p>
            Al acceder y usar Compendio Arcano, aceptás estos términos de servicio.
            Si no estás de acuerdo, por favor no uses el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">2. Descripción del Servicio</h2>
          <p>
            Compendio Arcano es una herramienta gratuita y de código abierto para jugadores de
            Dungeons & Dragons 3.5, que incluye:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Base de datos de clases, razas, dotes, conjuros y más</li>
            <li>Editor de personajes</li>
            <li>Foro de la comunidad</li>
            <li>Sistema de traducciones colaborativas</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">3. Propiedad Intelectual</h2>
          <p>
            <strong>Dungeons & Dragons</strong> es una marca registrada de Wizards of the Coast LLC.
            Compendio Arcano no está afiliado ni respaldado por Wizards of the Coast.
          </p>
          <p className="mt-2">
            El contenido del SRD (System Reference Document) se utiliza bajo la Open Gaming License (OGL) v1.0a.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">4. Uso Aceptable</h2>
          <p>Al usar Compendio Arcano, acordás:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No usar el servicio para actividades ilegales</li>
            <li>No intentar acceder a cuentas de otros usuarios</li>
            <li>No publicar contenido ofensivo, discriminatorio o spam</li>
            <li>No intentar explotar vulnerabilidades del sistema</li>
            <li>Reportar bugs de forma responsable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">5. Cuentas de Usuario</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sos responsable de mantener la seguridad de tu cuenta</li>
            <li>Debés proporcionar información veraz al registrarte</li>
            <li>Podemos suspender cuentas que violen estos términos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">6. Contenido del Usuario</h2>
          <p>
            Cualquier contenido que subas (personajes, traducciones, posts del foro) sigue
            siendo tuyo, pero nos otorgás licencia para mostrarlo en la plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">7. Mecenazgo (Patreon)</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Los beneficios de mecenas se sincronizan automáticamente</li>
            <li>Los pagos se procesan a través de Patreon</li>
            <li>Podés cancelar tu membresía en cualquier momento desde Patreon</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">8. Limitación de Responsabilidad</h2>
          <p>
            Compendio Arcano se proporciona &quot;tal cual&quot;. No garantizamos disponibilidad
            ininterrumpida ni nos hacemos responsables por pérdida de datos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">9. Cambios a los Términos</h2>
          <p>
            Podemos actualizar estos términos ocasionalmente. Te notificaremos de cambios
            significativos a través del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gold-300 mt-6 mb-3">10. Contacto</h2>
          <p>
            Para consultas sobre estos términos:{' '}
            <a href="mailto:contacto@compendioarcano.com.ar" className="text-gold-400 hover:text-gold-300">
              contacto@compendioarcano.com.ar
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
