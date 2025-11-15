# 🔒 Política de Seguridad

## 🚨 Información Sensible

Este proyecto utiliza Supabase como backend. **NUNCA** commits archivos que contengan:

### ❌ NUNCA Commitear:
- ✗ `.env.local` - Variables de entorno locales
- ✗ `.env.production` - Variables de producción
- ✗ URLs reales de Supabase (usa `YOUR_PROJECT_ID` como placeholder)
- ✗ API Keys reales (anon key, service role key)
- ✗ Contraseñas o tokens de cualquier tipo
- ✗ Archivos grandes (>1MB) innecesarios

### ✅ SÍ Commitear:
- ✓ `.env.example` - Con placeholders únicamente
- ✓ `.env.local.example` - Con instrucciones de configuración
- ✓ Documentación con placeholders genéricos
- ✓ Scripts SQL (sin credenciales)

## 🛡️ Variables de Entorno Seguras

### Configuración Local (.env.local)
```bash
# ❌ MAL - URL real expuesta
NEXT_PUBLIC_SUPABASE_URL=https://akcuvlanpqpoizconuhm.supabase.co

# ✅ BIEN - Placeholder genérico
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
```

### Ejemplo de .env.local (NO commitear)
```bash
# Este archivo debe estar en .gitignore
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-real.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_real_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_real_aqui
```

## 🔍 Verificación Antes de Commit

Antes de cada commit, ejecuta:

```bash
# Verificar que no hay .env en staging
git status | grep -E "\.env$|\.env\.local$"

# Buscar posibles credenciales
git diff --cached | grep -i "supabase\|password\|secret\|api.*key"
```

## 📋 Checklist de Seguridad

- [ ] `.gitignore` incluye `.env.local`
- [ ] No hay archivos `.env` en el repositorio
- [ ] Todos los `.example` usan placeholders
- [ ] URLs de Supabase son genéricas en documentación
- [ ] No hay API keys reales en el código

## 🚀 Despliegue Seguro

### Vercel
- Variables de entorno configuradas en: Settings → Environment Variables
- Nunca hardcodear credenciales en el código
- Usar `process.env.VARIABLE_NAME` en server-side

### Supabase RLS
- Activar Row Level Security en todas las tablas
- Probar políticas con diferentes roles
- No usar Service Role Key en client-side

## 📞 Reportar Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad:

1. **NO** abras un issue público
2. Contacta directamente al equipo
3. Describe el problema en detalle
4. Espera respuesta antes de divulgar

## 🔄 Rotación de Credenciales

Si accidentalmente expones credenciales:

1. **Rotar inmediatamente** en Supabase Dashboard
2. Actualizar `.env.local` localmente
3. Actualizar variables en Vercel
4. Considerar force push para limpiar historial Git

## 📚 Recursos

- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/managing-user-data#security)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [GitHub Secrets Scanning](https://docs.github.com/en/code-security/secret-scanning)

---

**Última actualización:** 2025-11-15
**Mantenedor:** Equipo Arcano Completo
