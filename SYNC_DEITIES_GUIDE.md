# Guía de Sincronización de Deidades - Editor a Supabase

## 📋 Resumen

El sistema de deidades ahora tiene **sincronización bidireccional**:

- ✅ Los cambios en `/admin/deidades` se guardan automáticamente en **Supabase**
- ✅ Los cambios se reflejan inmediatamente en las páginas públicas (`/es/reglas/contenido/dioses/[slug]`)
- ✅ Indicador visual de estado de sincronización en tiempo real

## 🔧 Cómo Funciona

### Flujo de Guardado

1. **Editar en `/admin/deidades`**
   - Selecciona una deidad de la lista izquierda
   - Haz clic en "Editar" (ícono de lápiz)
   - Modifica los campos que desees
   - Los cambios se almacenan temporalmente en el estado local

2. **Guardar Cambios**
   - Haz clic en el botón verde "Guardar en Supabase"
   - Verás un indicador "Sincronizando..." en el header

3. **Verificación Automática**
   - El sistema sincroniza los cambios con Supabase
   - Verás un mensaje de confirmación: "✅ [nombre] sincronizado correctamente"
   - Los cambios aparecen inmediatamente en la página pública

## 📊 Campos que se Sincronizan

Los siguientes campos se guardan en Supabase:

### Básicos
- `slug` - Identificador único (no se puede cambiar)
- `rank` - Rango (Mayor, Intermedia, Menor, etc.)
- `alignment` - Alineamiento (LG, NG, CG, etc.)

### Bilingües (Español/English)
- `name_es / name_en` - Nombre de la deidad
- `titles_es / titles_en` - Títulos
- `portfolio_es / portfolio_en` - Portfolio
- `symbol_es / symbol_en` - Símbolo
- `worshipers_es / worshipers_en` - Adoradores
- `home_plane_es / home_plane_en` - Plano hogar
- `description_es / description_en` - Descripción
- `teachings_es / teachings_en` - Enseñanzas (opcional)
- `clergy_es / clergy_en` - Clero (opcional)
- `temples_es / temples_en` - Templos (opcional)
- `rites_es / rites_en` - Ritos (opcional)

### Otros
- `domains` - Dominios (array de strings, ej: ["Knowledge", "Evil"])
- `favored_weapon` - Arma predilecta

## 🎯 Ejemplo: Editar a Afflux

**Caso de uso:** El usuario edita la descripción de Afflux en `/admin/deidades` con un texto más largo y detallado.

### Paso 1: Buscar a Afflux
1. En `/admin/deidades`, escribe "afflux" en la barra de búsqueda
2. Haz clic en la tarjeta de Afflux en la lista izquierda

### Paso 2: Cambiar al Modo Edición
1. Haz clic en el botón dorado "Editar" en la esquina superior derecha

### Paso 3: Editar la Descripción
1. Verifica que la pestaña esté en "Español" (tab azul en la parte superior)
2. Baja hasta el campo "Descripción"
3. Reemplaza el texto con la descripción completa:
   ```
   El insaciable Afflux busca el conocimiento de la sangre, el cuerpo y la mente. Afflux nunca vacila al sacrificar seres vivos para comprender qué los hizo estar alguna vez con vida. Es el señor de la interrogación, la tortura y la ejecución...
   ```

### Paso 4: Guardar Cambios
1. Haz clic en el botón verde "Guardar en Supabase"
2. Verás:
   - Un spinner girando mientras se sincroniza
   - Un mensaje de confirmación: "✅ Afflux sincronizado correctamente"

### Paso 5: Verificar en la Página Pública
1. Abre `/es/reglas/contenido/dioses/afflux` en una nueva pestaña
2. Espera un momento (puede haber caché de Next.js)
3. Recarga la página (Ctrl+F5 para limpiar caché)
4. ¡Verás la descripción actualizada!

## ⚠️ Notas Importantes

### Sincronización de Dos Vías
- **localStorage**: Cambios se guardan localmente para referencia rápida
- **Supabase**: Cambios se guardan en la base de datos para persistencia
- Cuando guardas, **ambos sistemas se actualizan** automáticamente

### Pérdida de Conexión
- Si la sincronización falla, verás un mensaje de error rojo
- Los cambios se mantienen en localStorage (no se pierden)
- Puedes intentar guardar de nuevo cuando la conexión se recupere

### Cambios no Guardados
- Si cierras el editor sin hacer clic en "Guardar en Supabase", los cambios **NO se sincronizan**
- Los cambios locales persisten en localStorage para cuando vuelvas
- Siempre haz clic en "Guardar en Supabase" para que los cambios sean visibles públicamente

## 🔄 Sistema Fallback

En caso de que haya problemas con Supabase:

1. **Los cambios se guardan en localStorage** (como fallback)
2. Los cambios NO aparecerán en las páginas públicas hasta que se sincronicen con Supabase
3. Puedes usar el botón "Exportar" para descargar tus cambios como JSON

## 📱 Indicadores de Estado

En el header de `/admin/deidades` verás indicadores de sincronización:

| Icono | Color | Significado |
|-------|-------|-------------|
| ⏳ Spinner | Azul | Sincronizando cambios... |
| ✅ Checkmark | Verde | Sincronización exitosa |
| ⚠️ Alerta | Rojo | Error en la sincronización |

## 🐛 Solución de Problemas

### Los cambios no aparecen en la página pública
1. ✅ Verifica que hiciste clic en "Guardar en Supabase"
2. ✅ Espera el mensaje de confirmación verde
3. ✅ Recarga la página pública con Ctrl+F5 (limpiar caché)

### Error de sincronización
1. ✅ Verifica tu conexión a internet
2. ✅ Intenta guardar nuevamente
3. ✅ Si persiste, contacta al administrador

### Los cambios se perdieron
1. ✅ Abre el navegador DevTools (F12)
2. ✅ Ve a "Application" → "Local Storage"
3. ✅ Busca `dnd_deities`
4. ✅ Los cambios deben estar en JSON
5. ✅ Usa "Exportar" para descargarlos

## 📚 Archivos Relevantes

- **Editor**: `src/app/admin/deidades/page.tsx`
- **Datos iniciales**: `src/lib/data/deities-initial.ts`
- **Página pública**: `src/app/reglas/contenido/dioses/[slug]/page.tsx`
- **Script de sincronización manual**: `dnd-compendium/update-afflux.mjs` (para emergencias)

---

**Última actualización:** 2025-11-21
**Status:** ✅ Sistema completamente funcional y sincronizado
