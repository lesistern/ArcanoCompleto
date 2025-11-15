# 🔐 Configuración de Proveedores de Autenticación OAuth

Este documento explica cómo configurar los proveedores de autenticación social (OAuth) en tu proyecto D&D 3.5 Compendium.

---

## 📋 Proveedores Disponibles

El proyecto soporta **21 proveedores OAuth** diferentes:

### Proveedores Primarios (siempre visibles)
- ✅ **Google**
- ✅ **Microsoft Azure** (antes "Microsoft")
- ✅ **Discord**
- ✅ **Apple**

### Proveedores Secundarios (mostrar más)
- GitHub
- GitLab
- Facebook
- Twitter
- LinkedIn
- Spotify
- Twitch
- Slack
- Notion
- Figma
- Bitbucket
- Kakao
- Zoom
- Keycloak
- WorkOS
- Fly

---

## 🚀 Configuración en Supabase Dashboard

### Paso 1: Acceder a la Configuración de Auth

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto: `YOUR_PROJECT_ID`
3. Ve a **Authentication** → **Providers**

### Paso 2: Configurar URL de Callback

Antes de configurar cualquier proveedor, necesitas configurar el URL de callback en Supabase:

```
Redirect URL: https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
```

También añade tus URLs de desarrollo y producción en **URL Configuration**:
- Development: `http://localhost:3000/auth/callback`
- Production: `https://tu-dominio.com/auth/callback`

---

## 🔧 Configuración de Proveedores Específicos

### 1. Google OAuth

**Paso 1: Crear credenciales en Google Cloud Console**

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** → **Credentials**
4. Click en **Create Credentials** → **OAuth 2.0 Client ID**
5. Tipo de aplicación: **Web application**
6. Añade los URIs autorizados:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback
   ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Google**
2. Habilita Google
3. Pega el **Client ID** y **Client Secret** de Google Cloud Console
4. Guarda los cambios

---

### 2. Microsoft Azure (Azure AD)

**Paso 1: Registrar aplicación en Azure Portal**

1. Ve a [Azure Portal](https://portal.azure.com/)
2. Ve a **Azure Active Directory** → **App registrations**
3. Click en **New registration**
4. Nombre: `D&D Compendium`
5. Supported account types: **Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts**
6. Redirect URI:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```
7. Registra la aplicación

**Paso 2: Crear Client Secret**

1. Ve a **Certificates & secrets**
2. Click en **New client secret**
3. Copia el **Value** (no el Secret ID)

**Paso 3: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Azure**
2. Habilita Azure
3. Pega el **Application (client) ID** y **Client Secret**
4. Guarda los cambios

---

### 3. Discord

**Paso 1: Crear aplicación en Discord Developer Portal**

1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Click en **New Application**
3. Nombre: `D&D Compendium`
4. Ve a **OAuth2** → **General**
5. Añade redirect:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Discord**
2. Habilita Discord
3. Pega el **Client ID** y **Client Secret**
4. Guarda los cambios

---

### 4. Apple

**Paso 1: Configurar en Apple Developer**

1. Ve a [Apple Developer Portal](https://developer.apple.com/)
2. Ve a **Certificates, Identifiers & Profiles**
3. Click en **Identifiers** → **+** → **Services IDs**
4. Registra un nuevo Service ID
5. Configura Sign in with Apple
6. Añade domain y redirect URL:
   ```
   Domain: YOUR_PROJECT_ID.supabase.co
   Redirect URL: https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

**Paso 2: Generar Key**

1. Ve a **Keys** → **+**
2. Habilita **Sign in with Apple**
3. Descarga la clave (archivo .p8)

**Paso 3: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Apple**
2. Habilita Apple
3. Ingresa:
   - Team ID
   - Services ID
   - Key ID
   - Private Key (contenido del archivo .p8)
4. Guarda los cambios

---

### 5. GitHub

**Paso 1: Crear OAuth App en GitHub**

1. Ve a [GitHub Settings](https://github.com/settings/developers)
2. Click en **OAuth Apps** → **New OAuth App**
3. Rellena:
   - Application name: `D&D Compendium`
   - Homepage URL: `https://tu-dominio.com`
   - Authorization callback URL:
     ```
     https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
     ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **GitHub**
2. Habilita GitHub
3. Pega el **Client ID** y **Client Secret**
4. Guarda los cambios

---

### 6. GitLab

**Paso 1: Crear aplicación en GitLab**

1. Ve a [GitLab Applications](https://gitlab.com/-/profile/applications)
2. Rellena:
   - Name: `D&D Compendium`
   - Redirect URI:
     ```
     https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
     ```
   - Scopes: `read_user`, `openid`, `profile`, `email`

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **GitLab**
2. Habilita GitLab
3. Pega el **Application ID** y **Secret**
4. Guarda los cambios

---

### 7. Facebook

**Paso 1: Crear app en Meta for Developers**

1. Ve a [Meta for Developers](https://developers.facebook.com/)
2. Click en **Create App** → **Consumer**
3. Añade **Facebook Login** como producto
4. Configura:
   - Valid OAuth Redirect URIs:
     ```
     https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
     ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Facebook**
2. Habilita Facebook
3. Pega el **App ID** y **App Secret**
4. Guarda los cambios

---

### 8. Twitter

**Paso 1: Crear app en Twitter Developer Portal**

1. Ve a [Twitter Developer Portal](https://developer.twitter.com/)
2. Crea un proyecto y app
3. Ve a **User authentication settings**
4. Tipo: **Web App, Automated App or Bot**
5. Callback URL:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Twitter**
2. Habilita Twitter
3. Pega el **API Key** y **API Secret Key**
4. Guarda los cambios

---

### 9. LinkedIn

**Paso 1: Crear app en LinkedIn Developers**

1. Ve a [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Crea una nueva app
3. Ve a **Auth** tab
4. Añade Redirect URL:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **LinkedIn**
2. Habilita LinkedIn
3. Pega el **Client ID** y **Client Secret**
4. Guarda los cambios

---

### 10. Spotify

**Paso 1: Crear app en Spotify for Developers**

1. Ve a [Spotify for Developers](https://developer.spotify.com/dashboard)
2. Click en **Create app**
3. Rellena información
4. Redirect URI:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Spotify**
2. Habilita Spotify
3. Pega el **Client ID** y **Client Secret**
4. Guarda los cambios

---

### 11. Twitch

**Paso 1: Crear app en Twitch Developers**

1. Ve a [Twitch Developers Console](https://dev.twitch.tv/console)
2. Click en **Register Your Application**
3. OAuth Redirect URL:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Twitch**
2. Habilita Twitch
3. Pega el **Client ID** y **Client Secret**
4. Guarda los cambios

---

### 12. Slack

**Paso 1: Crear app en Slack API**

1. Ve a [Slack API](https://api.slack.com/apps)
2. Click en **Create New App** → **From scratch**
3. Ve a **OAuth & Permissions**
4. Añade Redirect URL:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```
5. Scopes necesarios: `identity.basic`, `identity.email`, `identity.avatar`

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Slack**
2. Habilita Slack
3. Pega el **Client ID** y **Client Secret**
4. Guarda los cambios

---

### 13. Notion

**Paso 1: Crear integración en Notion**

1. Ve a [Notion Developers](https://www.notion.so/my-integrations)
2. Click en **+ New integration**
3. Tipo: **Public integration**
4. Redirect URI:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Notion**
2. Habilita Notion
3. Pega el **OAuth client ID** y **OAuth client secret**
4. Guarda los cambios

---

### 14. Figma

**Paso 1: Crear app en Figma**

1. Ve a [Figma Developers](https://www.figma.com/developers)
2. Regístrate para crear una app
3. Callback URL:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Figma**
2. Habilita Figma
3. Pega el **Client ID** y **Client Secret**
4. Guarda los cambios

---

### 15. Bitbucket

**Paso 1: Crear OAuth consumer en Bitbucket**

1. Ve a [Bitbucket Settings](https://bitbucket.org/account/settings/app-passwords/)
2. Ve a **OAuth** → **Add consumer**
3. Callback URL:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```
4. Permisos: `Account: Read`, `Email: Read`

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Bitbucket**
2. Habilita Bitbucket
3. Pega el **Key** y **Secret**
4. Guarda los cambios

---

### 16. Zoom

**Paso 1: Crear app en Zoom Marketplace**

1. Ve a [Zoom Marketplace](https://marketplace.zoom.us/)
2. Click en **Develop** → **Build App**
3. Tipo: **OAuth**
4. Redirect URL for OAuth:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Zoom**
2. Habilita Zoom
3. Pega el **Client ID** y **Client Secret**
4. Guarda los cambios

---

### 17. Kakao

**Paso 1: Crear app en Kakao Developers**

1. Ve a [Kakao Developers](https://developers.kakao.com/)
2. Crea una nueva aplicación
3. Ve a **Kakao Login** settings
4. Redirect URI:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

**Paso 2: Configurar en Supabase**

1. En Supabase Dashboard, ve a **Authentication** → **Providers** → **Kakao**
2. Habilita Kakao
3. Pega el **Client ID** y **Client Secret**
4. Guarda los cambios

---

## ⚙️ Configuración de Redirect URLs en Desarrollo

Para que OAuth funcione en desarrollo local, añade estas URLs en cada proveedor:

```
http://localhost:3000/auth/callback
http://127.0.0.1:3000/auth/callback
```

---

## 🧪 Probar la Integración

1. Ve a tu aplicación: `http://localhost:3000`
2. Click en **Acceder**
3. Selecciona uno de los proveedores OAuth configurados
4. Deberías ser redirigido al proveedor para autorizar
5. Después de autorizar, serás redirigido de vuelta a tu aplicación

---

## 📝 Notas Importantes

### Scopes Recomendados

Dependiendo del proveedor, asegúrate de solicitar estos scopes:
- Email: `email`, `profile`
- Información básica: `openid`, `profile`
- Avatar: `avatar`, `picture`

### Límites de Rate

Algunos proveedores tienen límites de rate en producción:
- Google: 10 requests/segundo
- GitHub: 5,000 requests/hora
- Discord: 50 requests/segundo

### PKCE (Proof Key for Code Exchange)

Para mayor seguridad, Supabase usa PKCE automáticamente para todos los flows OAuth.

---

## 🔒 Seguridad

### Variables de Entorno

Nunca expongas tus claves secretas en el frontend. Todas las claves OAuth deben estar en:
- Supabase Dashboard (para producción)
- Variables de entorno del servidor (para desarrollo)

### HTTPS Requerido

En producción, TODAS las redirect URLs deben usar HTTPS. HTTP solo está permitido para `localhost` en desarrollo.

---

## 📚 Recursos Adicionales

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [OAuth 2.0 Specification](https://oauth.net/2/)
- [PKCE Extension](https://tools.ietf.org/html/rfc7636)

---

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"

**Solución**: Verifica que el redirect URI en el proveedor coincida EXACTAMENTE con:
```
https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
```

### Error: "Invalid client"

**Solución**: Verifica que el Client ID y Client Secret sean correctos en Supabase Dashboard.

### Error: "Access denied"

**Solución**: Verifica que los scopes solicitados estén habilitados en la configuración del proveedor.

---

**Última actualización:** 2025-11-14
**Versión:** 1.0.0
