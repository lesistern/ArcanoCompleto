# 🚀 Guía de Deployment en Vercel

Esta guía te ayudará a deployar el proyecto D&D 3.5 Compendium en Vercel de forma gratuita.

---

## ✅ Pre-requisitos

Antes de comenzar, asegúrate de tener:

1. **Cuenta de Vercel** (gratuita): https://vercel.com/signup
2. **Cuenta de GitHub** con el repositorio del proyecto
3. **Supabase** configurado con tu base de datos
4. **Variables de entorno** de Supabase listas

---

## 📋 Paso 1: Preparar el Repositorio

### 1.1. Crear Repositorio en GitHub

```bash
# Inicializar git si no está inicializado
cd dnd-compendium
git init

# Añadir remote (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/dnd-compendium.git

# Commit de todos los cambios
git add .
git commit -m "Initial commit - Ready for deployment"

# Push al repositorio
git push -u origin main
```

### 1.2. Verificar Archivos Críticos

Asegúrate de que estos archivos estén en el repositorio:

- ✅ `vercel.json` - Configuración de Vercel
- ✅ `.env.example` - Ejemplo de variables de entorno
- ✅ `.gitignore` - Archivos ignorados (incluyendo `.env.local`)
- ✅ `package.json` - Dependencias del proyecto

**IMPORTANTE**: El archivo `.env.local` NO debe estar en el repositorio (verificar `.gitignore`).

---

## 🔑 Paso 2: Obtener Variables de Entorno de Supabase

### 2.1. Acceder a Supabase Dashboard

1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Navega a **Settings** → **API**

### 2.2. Copiar las 3 Variables Necesarias

Necesitarás copiar estos valores:

| Variable | Descripción | Ubicación en Supabase |
|----------|-------------|------------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública (anon key) | Project API keys → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave privada (service role) | Project API keys → service_role ⚠️ SECRET |

⚠️ **IMPORTANTE**:
- La clave `service_role` es SECRETA y nunca debe exponerse al navegador
- Solo se usa en servidor (API routes)

---

## 🌐 Paso 3: Deploy en Vercel

### 3.1. Importar Proyecto desde GitHub

1. Ve a https://vercel.com/new
2. Click en **"Import Git Repository"**
3. Selecciona tu repositorio de GitHub: `tu-usuario/dnd-compendium`
4. Click en **"Import"**

### 3.2. Configurar el Proyecto

Vercel debería detectar automáticamente:
- ✅ Framework: **Next.js**
- ✅ Root Directory: `dnd-compendium` (si está en subdirectorio) o `.` (raíz)
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`

### 3.3. Añadir Variables de Entorno

En la sección **"Environment Variables"**:

1. **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (pega el Project URL de Supabase)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

2. **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (pega el anon key de Supabase)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

3. **Variable 3:**
   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: (pega el service_role key de Supabase)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

### 3.4. Deploy!

1. Click en **"Deploy"**
2. Espera 2-5 minutos mientras Vercel:
   - Instala dependencias (`npm install`)
   - Ejecuta el build (`npm run build`)
   - Genera las páginas estáticas (214 páginas)
   - Deploya la aplicación

3. ¡Listo! Vercel te mostrará la URL de tu aplicación:
   ```
   https://dnd-compendium-tu-usuario.vercel.app
   ```

---

## ✅ Paso 4: Verificar el Deployment

### 4.1. Pruebas Básicas

Visita tu aplicación y verifica:

- ✅ Página principal carga correctamente
- ✅ Navegación funciona (Header, Footer)
- ✅ `/clases` muestra las 11 clases
- ✅ `/razas` muestra las 16 razas
- ✅ `/dotes` muestra las dotes
- ✅ `/habilidades` muestra las habilidades
- ✅ `/objetos` muestra las armas

### 4.2. Pruebas de Autenticación

1. Click en **"Iniciar Sesión"**
2. Verifica que el modal se abra correctamente
3. Prueba las pestañas: Sign In, Sign Up, Magic Link
4. Verifica que los proveedores OAuth se muestren (Google, Microsoft, Discord, Apple)

### 4.3. Pruebas de Base de Datos

1. Navega a `/clases/barbaro`
2. Verifica que cargue los datos de la clase desde Supabase
3. Navega a `/razas/humano`
4. Verifica que cargue los datos de la raza desde Supabase

### 4.4. Verificar Logs de Vercel

1. Ve a Vercel Dashboard → Tu proyecto → **Deployments**
2. Click en el último deployment → **Functions** → Ver logs
3. Busca errores en consola (no debería haber)

---

## 🔧 Paso 5: Configurar Dominio Personalizado (Opcional)

### 5.1. Añadir Dominio en Vercel

1. Ve a Project Settings → **Domains**
2. Click en **"Add Domain"**
3. Ingresa tu dominio: `tudominio.com`
4. Vercel te dará instrucciones DNS

### 5.2. Configurar DNS

En tu proveedor de dominio (GoDaddy, Namecheap, etc.):

**Opción A - Apex Domain (tudominio.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Opción B - Subdomain (dnd.tudominio.com):**
```
Type: CNAME
Name: dnd
Value: cname.vercel-dns.com
```

### 5.3. Actualizar Supabase Redirect URLs

1. Ve a Supabase Dashboard → **Authentication** → **URL Configuration**
2. Añade tu dominio personalizado a:
   - **Site URL**: `https://tudominio.com`
   - **Redirect URLs**: `https://tudominio.com/auth/callback`

---

## 🔄 Paso 6: Configurar Auto-Deploy (Git Push)

### 6.1. Habilitar Auto-Deploy

Por defecto, Vercel hace auto-deploy en cada push a `main`:

```bash
# Hacer cambios en tu código
git add .
git commit -m "Update: descripción de cambios"
git push origin main

# Vercel automáticamente:
# 1. Detecta el push
# 2. Inicia nuevo build
# 3. Deploy automático
# 4. Notifica en Slack/Discord (si está configurado)
```

### 6.2. Preview Deployments (Branches)

Cada branch crea un preview deployment:

```bash
# Crear feature branch
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y push
git push origin feature/nueva-funcionalidad

# Vercel crea URL preview:
# https://dnd-compendium-git-feature-nueva-funcionali-tu-usuario.vercel.app
```

---

## 🐛 Troubleshooting

### Error: "Build Failed - TypeScript errors"

**Solución**: Ejecutar build localmente antes de deploy:
```bash
npm run build

# Si hay errores TypeScript, arreglarlos antes de hacer push
```

### Error: "Supabase connection failed"

**Posibles causas**:
1. Variables de entorno mal configuradas en Vercel
2. URLs de Supabase incorrectas
3. Row Level Security (RLS) bloqueando queries

**Solución**:
1. Verificar variables en Vercel Project Settings → Environment Variables
2. Re-deployar después de actualizar variables
3. Verificar policies RLS en Supabase

### Error: "OAuth providers not working"

**Causa**: Los proveedores OAuth no están configurados en Supabase

**Solución**:
1. Ve a Supabase Dashboard → **Authentication** → **Providers**
2. Habilita cada provider (Google, Discord, etc.)
3. Sigue las instrucciones en `CONFIGURACION_AUTH_PROVIDERS.md`

### Error: "Page not found (404)"

**Posibles causas**:
1. Rutas dinámicas no generadas
2. Build no completado correctamente

**Solución**:
1. Verificar que `generateStaticParams` esté implementado en páginas dinámicas
2. Re-deployar desde Vercel Dashboard

### Error: "CORS errors en API routes"

**Solución**: Añadir headers CORS en `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,PUT,DELETE,OPTIONS" }
      ]
    }
  ]
}
```

---

## 📊 Monitoreo y Analytics

### Vercel Analytics (Recomendado)

1. Ve a Project Settings → **Analytics**
2. Click en **"Enable Analytics"**
3. Gratis hasta 100k page views/mes

### Speed Insights

1. Ve a Project Settings → **Speed Insights**
2. Click en **"Enable Speed Insights"**
3. Monitorea Core Web Vitals

---

## 🔒 Seguridad Post-Deployment

### 1. Verificar Variables de Entorno

- ✅ `service_role` key solo en server-side
- ✅ No hay `.env.local` en el repositorio
- ✅ Secrets no expuestos en el código

### 2. Configurar Rate Limiting en Supabase

1. Ve a Supabase → **Settings** → **API**
2. Configura rate limits para prevenir abuso

### 3. Habilitar HTTPS Only

Vercel fuerza HTTPS automáticamente, pero verifica:
1. Todas las URLs usan `https://`
2. Redirect de HTTP a HTTPS está habilitado

---

## 📈 Próximos Pasos

Después del deployment exitoso:

1. **Monitorear Logs**: Primeros días, revisar logs en Vercel
2. **User Testing**: Invitar usuarios para probar funcionalidades
3. **SEO**: Configurar meta tags, sitemap.xml, robots.txt
4. **Performance**: Optimizar imágenes, lazy loading
5. **CI/CD**: Configurar tests automáticos pre-deploy

---

## 📞 Soporte

### Recursos Útiles

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

### Comunidad

- **Vercel Discord**: https://vercel.com/discord
- **Supabase Discord**: https://discord.supabase.com

---

## ✅ Checklist Final

Antes de considerar el deployment completo:

- [ ] Build exitoso en Vercel
- [ ] 214 páginas generadas correctamente
- [ ] Variables de entorno configuradas
- [ ] Supabase conectado y funcionando
- [ ] Autenticación funcional (Login/Signup)
- [ ] OAuth providers configurados
- [ ] Datos cargando desde base de datos
- [ ] Navegación entre páginas funciona
- [ ] No hay errores en consola del navegador
- [ ] No hay errores en Vercel Function logs
- [ ] Dominio personalizado configurado (opcional)
- [ ] Analytics habilitado (opcional)

---

**¡Felicidades!** Tu D&D 3.5 Compendium está ahora live en producción 🎉

---

_Última actualización: 2025-01-14_
_Versión: 1.0_
