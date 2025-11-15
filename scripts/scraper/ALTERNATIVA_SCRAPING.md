# 🚫 Problema: Scraping Bloqueado por 403 Forbidden

El sitio dndtools.org está bloqueando requests automatizados con error 403 Forbidden. Esto es una medida de protección común contra scrapers.

## 🛡️ Por qué está bloqueado

1. **User-Agent Detection**: El servidor detecta que no es un navegador real
2. **Rate Limiting**: Protección contra scraping masivo
3. **JavaScript Required**: El sitio puede requerir JavaScript para cargar contenido
4. **Cloudflare/Protection**: Puede estar detrás de un WAF (Web Application Firewall)

---

## ✅ Soluciones Alternativas

### Opción 1: Usar Navegador Headless (Playwright/Puppeteer) ⭐ RECOMENDADO

Playwright simula un navegador real, evitando la mayoría de bloqueos.

#### Instalar Playwright

```bash
cd dnd-compendium
npm install playwright
```

#### Script con Playwright

Crearé un nuevo scraper que use Playwright...

### Opción 2: Descarga Manual + Procesamiento

1. **Descargar páginas manualmente** usando tu navegador
2. **Guardar HTML** en `scraped-data/raw/`
3. **Procesar HTML** con nuestros parsers

#### Ejemplo:

```bash
# 1. Abre en tu navegador:
#    https://srd.dndtools.org/srd/classes/baseCore/barbarian.html
#
# 2. Guarda como: scraped-data/raw/barbarian.html
#
# 3. Procesa:
node scripts/parse-html.mjs --file scraped-data/raw/barbarian.html
```

### Opción 3: Usar Extensión de Navegador

Usar una extensión como "Web Scraper" o "Data Miner" que scrape desde tu navegador real.

### Opción 4: API No Oficial

Buscar si existe una API no oficial o dataset existente:

- **GitHub**: Buscar "d&d 3.5 dataset json"
- **Kaggle**: Datasets de D&D
- **Archive.org**: Versiones archivadas del SRD

---

## 🚀 Solución Inmediata: Playwright Scraper

Voy a crear un scraper mejorado con Playwright que evita el bloqueo 403.

### Ventajas de Playwright:

✅ Navegador real (Chromium/Firefox/WebKit)
✅ JavaScript ejecutado
✅ Cookies y localStorage
✅ Evita la mayoría de anti-bot protections
✅ Screenshots para debugging

### Desventajas:

❌ Más lento que HTTP puro
❌ Consume más recursos
❌ Requiere dependencia adicional (~300MB)

---

## 📊 Datos Ya Disponibles

Mientras tanto, tenemos datos de múltiples fuentes:

### ✅ Ya Migrados a Supabase:

- 16 razas completas
- 72 armas
- 43 skills
- 34 feats básicas
- 85 libros catalogados

### 📚 Datos de Referencia Disponibles:

El agente anterior ya investigó y documentó:
- **11 clases base** completas en `CLASES_PLAYER_HANDBOOK.md`
- **JSON listo** para migración en `classes-player-handbook.json`

Estos datos fueron extraídos manualmente del SRD y están listos para insertar.

---

## 🎯 Plan de Acción Recomendado

### Inmediato (Hoy):

1. ✅ Instalar Playwright
2. ✅ Crear scraper con Playwright
3. ✅ Scrapear categorías prioritarias:
   - Clases base (11)
   - Razas faltantes (~30)
   - Skills faltantes (si hay)

### Corto Plazo (Esta Semana):

4. Scrapear con Playwright (modo lento, respetuoso):
   - Conjuros (~3,000) - 1-2 horas
   - Dotes (~1,500) - 1 hora
   - Monstruos (~1,500) - 1 hora

### Mediano Plazo (Próximas Semanas):

5. Scrapear resto del contenido:
   - Clases de prestigio (~100)
   - Objetos mágicos (~2,000)
   - Equipment variado

---

## 🔒 Consideraciones Éticas

Si usamos Playwright para scrapear:

1. **Rate Limiting**: Delay de 1-2 segundos entre páginas
2. **Horarios**: Scrapear en horarios de baja demanda
3. **Propósito**: Solo para uso personal/educativo
4. **Caché**: Guardar todo localmente, no re-scrapear
5. **Respeto**: Si el sitio lo prohíbe explícitamente, buscar alternativas

---

## 📝 Próximo Paso

¿Qué prefieres?

**A)** Instalar Playwright y crear scraper robusto (RECOMENDADO)
**B)** Descargar páginas manualmente y procesarlas
**C)** Buscar datasets existentes en GitHub/Kaggle
**D)** Usar los datos ya investigados y continuar manualmente

---

**Recomendación**: Opción A con Playwright, scrapeando despacio y respetuosamente, guardando todo en caché local para no volver a scrape.
