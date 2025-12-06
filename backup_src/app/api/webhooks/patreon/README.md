# 🔗 Patreon Webhook Endpoint

Este directorio contiene el endpoint de webhook para sincronización automática con Patreon.

## 📋 Descripción

El webhook recibe notificaciones de Patreon cuando los usuarios:
- Se suscriben a un tier (`members:pledge:create`)
- Actualizan su suscripción (`members:pledge:update`)
- Cancelan su suscripción (`members:pledge:delete`)

## 🔧 Configuración Requerida

### 1. Variables de Entorno

Configura estas variables en tu `.env.local` (desarrollo) y en Vercel (producción):

```env
PATREON_WEBHOOK_SECRET=tu_webhook_secret_aqui
PATREON_CLIENT_ID=tu_client_id_aqui
PATREON_CLIENT_SECRET=tu_client_secret_aqui
```

**Obtener credenciales:**
1. Ve a https://www.patreon.com/portal/registration/register-clients
2. Crea una nueva aplicación "Compendio Arcano"
3. Anota:
   - Client ID
   - Client Secret
   - Webhook Secret (se genera al configurar webhooks)

### 2. Configurar Webhook en Patreon

1. Ve a tu aplicación en Patreon Developer Portal
2. En sección "Webhooks", añade:
   - **URL**: `https://tudominio.com/api/webhooks/patreon`
   - **Eventos**:
     - `members:pledge:create`
     - `members:pledge:update`
     - `members:pledge:delete`
3. Guarda el Webhook Secret generado

### 3. Actualizar Mapeo de Tier IDs

**CRÍTICO**: Debes reemplazar los IDs de ejemplo en `route.ts` (líneas 43-47) con los IDs reales de tus tiers de Patreon.

**Encontrar los IDs de tus tiers:**
1. Ve a Patreon Dashboard → Membership Tiers
2. Inspecciona cada tier (ver HTML en navegador)
3. Busca el `data-tier-id` o usa Patreon API para obtener IDs

**Actualizar el código:**
```typescript
const TIER_MAPPING: Record<string, string> = {
  // Reemplaza estos IDs con los reales
  '12345678': 'heroe_emergente',      // ID del tier $2/mes
  '87654321': 'campeon_consagrado',   // ID del tier $5/mes
  '11111111': 'leyenda_viviente',     // ID del tier $10/mes
};
```

## 🔒 Seguridad

El webhook implementa:
- ✅ Verificación de firma HMAC SHA256
- ✅ Validación de eventos soportados
- ✅ Manejo seguro de errores
- ✅ Logging detallado para auditoría

**NUNCA** proceses webhooks sin verificar la firma. La implementación actual rechaza automáticamente webhooks con firma inválida.

## 🔄 Flujo de Sincronización

1. Usuario se suscribe en Patreon
2. Patreon envía webhook a `/api/webhooks/patreon`
3. Endpoint verifica firma HMAC
4. Extrae tier más alto del usuario
5. Busca usuario en BD por `patreon_user_id`
6. Si no existe, intenta vincular por email
7. Llama a función RPC `update_patreon_tier()`
8. Retorna confirmación a Patreon

## 🧪 Testing

### Verificar que el endpoint existe:
```bash
curl https://tudominio.com/api/webhooks/patreon
```

Debería retornar:
```json
{
  "message": "Patreon webhook endpoint is active",
  "note": "This endpoint only accepts POST requests from Patreon"
}
```

### Simular webhook (LOCAL ONLY - NO EN PRODUCCIÓN):
```bash
# ADVERTENCIA: Solo para testing local
# En producción, SIEMPRE verifica la firma
curl -X POST http://localhost:3000/api/webhooks/patreon \
  -H "Content-Type: application/json" \
  -H "x-patreon-signature: test_signature" \
  -d '{
    "data": {
      "type": "members:pledge:create",
      "relationships": {
        "user": { "data": { "id": "patreon_user_123" } },
        "currently_entitled_tiers": {
          "data": [{ "id": "12345678" }]
        }
      },
      "attributes": {
        "email": "usuario@ejemplo.com"
      }
    }
  }'
```

**IMPORTANTE**: Este test fallará con "Invalid signature" a menos que configures temporalmente `PATREON_WEBHOOK_SECRET` para testing.

## 📊 Logs

El webhook registra logs detallados en consola:
- ✅ `[Patreon Webhook] Received event: members:pledge:create`
- ✅ `[Patreon Webhook] User patreon_123 subscribed to tier: heroe_emergente`
- ✅ `[Patreon Webhook] Successfully updated tier for user patreon_123 to heroe_emergente`
- ❌ `[Patreon Webhook] Invalid signature`
- ❌ `[Patreon Webhook] Error updating tier: [error]`

Monitorea estos logs en Vercel Dashboard → Functions → Logs.

## 🐛 Troubleshooting

### Problema: Webhook retorna 401 "Invalid signature"
- **Causa**: PATREON_WEBHOOK_SECRET incorrecto o payload corrupto
- **Solución**: Verifica que el secret en .env coincida con Patreon Dashboard

### Problema: Webhook retorna 404 "Profile not found"
- **Causa**: Usuario de Patreon no está registrado en la app
- **Solución**: El tier se aplicará automáticamente cuando el usuario se registre

### Problema: Tier no se actualiza en BD
- **Causa**: IDs de tiers en TIER_MAPPING no coinciden con Patreon
- **Solución**: Verifica los IDs reales de tus tiers en Patreon Dashboard

### Problema: Usuario tiene múltiples tiers
- **Causa**: Usuario tiene varios tiers activos (raro pero posible)
- **Solución**: El webhook automáticamente selecciona el tier más alto

## 📚 Referencias

- [Patreon API Docs](https://docs.patreon.com/)
- [Patreon Webhook Events](https://docs.patreon.com/#webhooks)
- [Webhook Signature Verification](https://docs.patreon.com/#webhook-signature-verification)

## ✅ Checklist de Configuración

- [ ] Variables de entorno configuradas (development + production)
- [ ] Webhook URL configurada en Patreon Developer Portal
- [ ] Eventos suscritos: create, update, delete
- [ ] IDs de tiers actualizados en TIER_MAPPING
- [ ] Test de endpoint exitoso (GET)
- [ ] Test de webhook con suscripción real
- [ ] Verificación de tier en BD después de webhook
- [ ] Logs monitoreados sin errores
