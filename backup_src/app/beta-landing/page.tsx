'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertCircle, Check, Loader2, Shield, Users, FileText } from 'lucide-react';

export default function BetaLandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
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

      // 4. Mostrar mensaje de éxito
      setSuccess('¡Acceso concedido! Redirigiendo...');
      setLoading(false);

      // 5. Redirigir a la aplicación después de 1.5 segundos
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (err) {
      console.error('Login error:', err);
      setError('Error inesperado. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dungeon-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-dungeon-100 mb-4">
              Arcano <span className="text-gold-500">Completo</span>
            </h1>
            <p className="text-xl text-dungeon-300">
              Compendio Completo de D&D 3.5
            </p>
          </div>

          {/* Beta Badge */}
          <div className="inline-block bg-amber-900/20 border border-amber-500/50 rounded-full px-6 py-2 mb-8">
            <p className="text-amber-400 font-bold text-lg flex items-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              BETA CERRADA EN DESARROLLO
            </p>
          </div>

          {/* Main Message */}
          <div className="bg-dungeon-800/50 backdrop-blur-sm border border-dungeon-700 rounded-xl p-8 mb-12 shadow-xl">
            <h2 className="font-heading text-3xl font-bold text-dungeon-100 mb-6">
              ¡Necesitamos tu ayuda!
            </h2>
            <p className="text-lg text-dungeon-300 leading-relaxed">
              Estamos construyendo el compendio más completo de D&D 3.5 en español,
              y necesitamos beta testers que nos ayuden a verificar la estabilidad,
              la información y las traducciones.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-dungeon-800 border-dungeon-700 hover:border-gold-500/30 transition-colors">
              <CardHeader>
                <Shield className="w-10 h-10 text-gold-500 mb-3 mx-auto" />
                <CardTitle className="text-gold-400 text-xl">Estabilidad</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-dungeon-400">
                  Ayúdanos a encontrar bugs, errores de carga y problemas de rendimiento
                  en diferentes navegadores y dispositivos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-dungeon-800 border-dungeon-700 hover:border-gold-500/30 transition-colors">
              <CardHeader>
                <FileText className="w-10 h-10 text-gold-500 mb-3 mx-auto" />
                <CardTitle className="text-gold-400 text-xl">Información</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-dungeon-400">
                  Verifica que los datos de clases, razas, dotes, conjuros y objetos
                  sean precisos y estén completos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-dungeon-800 border-dungeon-700 hover:border-gold-500/30 transition-colors">
              <CardHeader>
                <Users className="w-10 h-10 text-gold-500 mb-3 mx-auto" />
                <CardTitle className="text-gold-400 text-xl">Traducciones</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-dungeon-400">
                  Revisa y corrige traducciones al español, asegurando terminología
                  oficial de D&D 3.5.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Login Card */}
        <div className="max-w-md mx-auto">
          <Card className="bg-dungeon-800 border-dungeon-700 shadow-2xl">
            <CardHeader className="text-center border-b border-dungeon-700 pb-6">
              <CardTitle className="font-heading text-2xl text-dungeon-100">
                Acceso Beta Testers
              </CardTitle>
              <CardDescription className="text-dungeon-400 mt-2">
                Ingresa con tus credenciales de beta tester
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dungeon-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input w-full"
                    placeholder="tu-email@example.com"
                    disabled={loading}
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dungeon-300">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input w-full"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="flex items-start gap-2 p-3 bg-green-900/20 border border-green-500/50 rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-300">{success}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || !!success}
                  className="w-full btn-primary"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verificando acceso...
                    </>
                  ) : success ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Acceso concedido
                    </>
                  ) : (
                    'Iniciar sesión'
                  )}
                </Button>
              </form>

              {/* Info Box */}
              <div className="mt-6 pt-6 border-t border-dungeon-700">
                <p className="text-sm text-dungeon-400 text-center">
                  <strong className="text-gold-500 block mb-1">¿No tienes acceso aún?</strong>
                  Contacta al administrador para solicitar credenciales.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What's Coming */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="font-heading text-2xl font-bold text-dungeon-200 text-center mb-8">
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
              <div key={index} className="flex items-start gap-3 p-3 bg-dungeon-800/30 border border-dungeon-700/50 rounded-lg">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-dungeon-300 text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-16 text-center text-dungeon-500 text-xs">
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
