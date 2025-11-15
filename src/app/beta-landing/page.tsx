'use client';

import { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, Loader2, Shield, Users, FileText } from 'lucide-react';

export default function BetaLandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createBrowserClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Iniciar sesión
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Credenciales incorrectas. Verifica tu email y contraseña.');
        setLoading(false);
        return;
      }

      // 2. Verificar tier de beta tester
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('tier_code')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profile) {
        setError('Error verificando permisos. Contacta al administrador.');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // 3. Verificar si tiene acceso (beta_tester o cualquier tier superior)
      const allowedTiers = ['beta_tester', 'admin', 'reviewer', 'translator', 'contributor'];
      if (!allowedTiers.includes(profile.tier_code)) {
        setError('Tu cuenta no tiene acceso a la beta. Contacta al administrador.');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // 4. Redirigir a la aplicación
      router.push('/');
      router.refresh();

    } catch (err) {
      console.error('Login error:', err);
      setError('Error inesperado. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dungeon-950 via-dungeon-900 to-dungeon-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gold-500 mb-4">
              Arcano Completo
            </h1>
            <p className="text-2xl text-dungeon-300">
              Compendio Completo de D&D 3.5
            </p>
          </div>

          {/* Beta Badge */}
          <div className="inline-block bg-amber-500/10 border-2 border-amber-500 rounded-full px-6 py-3 mb-8">
            <p className="text-amber-400 font-bold text-lg">
              🚧 BETA CERRADA EN DESARROLLO 🚧
            </p>
          </div>

          {/* Main Message */}
          <div className="bg-dungeon-800/50 backdrop-blur-sm border border-dungeon-700 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-dungeon-100 mb-6">
              ¡Necesitamos tu ayuda!
            </h2>
            <p className="text-lg text-dungeon-300 leading-relaxed mb-4">
              Estamos construyendo el compendio más completo de D&D 3.5 en español,
              y necesitamos beta testers que nos ayuden a verificar:
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-dungeon-800/50 border-dungeon-700">
              <CardHeader>
                <Shield className="w-12 h-12 text-gold-500 mb-3 mx-auto" />
                <CardTitle className="text-gold-400">Estabilidad</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-dungeon-300">
                  Ayúdanos a encontrar bugs, errores de carga y problemas de rendimiento
                  en diferentes navegadores y dispositivos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-dungeon-800/50 border-dungeon-700">
              <CardHeader>
                <FileText className="w-12 h-12 text-gold-500 mb-3 mx-auto" />
                <CardTitle className="text-gold-400">Información</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-dungeon-300">
                  Verifica que los datos de clases, razas, dotes, conjuros y objetos
                  sean precisos y estén completos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-dungeon-800/50 border-dungeon-700">
              <CardHeader>
                <Users className="w-12 h-12 text-gold-500 mb-3 mx-auto" />
                <CardTitle className="text-gold-400">Traducciones</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-dungeon-300">
                  Revisa y corrige traducciones al español, asegurando terminología
                  oficial de D&D 3.5.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Login Card */}
        <div className="max-w-md mx-auto">
          <Card className="bg-dungeon-800 border-gold-500/30">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gold-400">
                Acceso Beta Testers
              </CardTitle>
              <CardDescription className="text-dungeon-300">
                Ingresa con tus credenciales de beta tester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-dungeon-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="tu-email@example.com"
                    disabled={loading}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-dungeon-300 mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold-600 hover:bg-gold-700 text-dungeon-950 font-bold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verificando acceso...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </form>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-dungeon-900/50 border border-dungeon-700 rounded-lg">
                <p className="text-sm text-dungeon-400 text-center">
                  <strong className="text-gold-400">¿No tienes acceso aún?</strong>
                  <br />
                  Contacta al administrador para solicitar credenciales de beta tester.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What's Coming */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-2xl font-bold text-gold-400 text-center mb-8">
            ¿Qué incluirá el compendio?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              '11 clases base completamente detalladas',
              '16+ razas jugables (base + suplementarias)',
              '1,500+ dotes con prerequisitos',
              '3,000+ conjuros de todos los niveles',
              '500+ armas y equipo',
              'Bestiario completo con 1,500+ criaturas',
              'Editor de personajes interactivo',
              'Sistema de traducciones colaborativo',
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-dungeon-800/30 rounded-lg">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-dungeon-200">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-16 text-center text-dungeon-500 text-sm">
          <p>
            D&D 3.5 Compendio Completo - Beta Cerrada
            <br />
            Basado en contenido de dndtools.org y manuales oficiales de Wizards of the Coast
          </p>
        </div>
      </div>
    </div>
  );
}
