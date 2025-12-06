# 🕷️ D&D Tools SRD Scraper

Scraper completo para extraer todo el contenido de [D&D Tools SRD](https://srd.dndtools.org/).

## 📋 Características

- ✅ **Rate Limiting**: Respeta el servidor con delays configurables entre requests
- ✅ **Retry Logic**: Reintenta automáticamente en caso de errores
- ✅ **Logging**: Logs detallados de todo el proceso
- ✅ **Categorizado**: Scrapea por categorías (classes, races, spells, etc.)
- ✅ **Modular**: Código organizado y reutilizable
- ✅ **Sin dependencias externas**: Solo usa módulos nativos de Node.js

## 🚀 Uso Rápido

### Scrapear una categoría específica

```bash
# Clases base
node scripts/scraper/index.mjs --category classes_base

# Todas las razas
node scripts/scraper/index.mjs --category races

# Todos los conjuros
node scripts/scraper/index.mjs --category spells

# Todas las dotes
node scripts/scraper/index.mjs --category feats

# Todos los monstruos
node scripts/scraper/index.mjs --category monsters
```

### Scrapear TODO el sitio

```bash
node scripts/scraper/index.mjs --category all
```

⚠️ **Advertencia**: Esto puede tardar HORAS y hacer miles de requests. Úsalo con responsabilidad.

### Scrapear una URL individual

```bash
node scripts/scraper/index.mjs --url "https://srd.dndtools.org/srd/classes/baseCore/barbarian.html"
```

## 📁 Estructura de Salida

Los datos scrapeados se guardan en:

```
scraped-data/
├── classes/          # Clases (base, prestige, NPC)
├── races/            # Razas
├── skills/           # Habilidades
├── feats/            # Dotes
├── spells/           # Conjuros
├── equipment/        # Equipo (armas, armaduras)
├── magic-items/      # Objetos mágicos
├── monsters/         # Monstruos
├── raw/              # HTML sin procesar
└── logs/             # Logs y estadísticas
    ├── scraper-TIMESTAMP.log
    └── stats-TIMESTAMP.json
```

## 📂 Categorías Disponibles

| Categoría | Comando | Contenido |
|-----------|---------|-----------|
| `classes_base` | Core classes | 11 clases base del PHB |
| `classes_prestige` | Prestige classes | ~100 clases de prestigio |
| `classes_npc` | NPC classes | Clases de NPCs |
| `races` | Races | ~50 razas jugables |
| `skills` | Skills | ~40 habilidades |
| `feats` | Feats | ~1,500 dotes |
| `spells` | Spells | ~3,000 conjuros |
| `weapons` | Weapons | ~500 armas |
| `armor` | Armor | ~50 armaduras |
| `magic_items` | Magic Items | ~2,000 objetos mágicos |
| `monsters` | Monsters | ~1,500 criaturas |
| `combat` | Combat rules | Reglas de combate |
| `magic` | Magic rules | Reglas de magia |
| `psionics` | Psionic rules | Reglas psiónicas |
| `epic` | Epic rules | Reglas épicas |
| `planes` | Planes | Planos de existencia |
| `all` | Everything | TODO el sitio |

## ⚙️ Configuración

Edita `config.mjs` para cambiar:

```javascript
export const SCRAPER_CONFIG = {
  // Delay entre requests (ms) - Mínimo recomendado: 500ms
  REQUEST_DELAY: 500,

  // Timeout para cada request
  REQUEST_TIMEOUT: 30000,

  // Máximo de reintentos
  MAX_RETRIES: 3,
};
```

## 📊 Formato de Salida

### JSON de categoría

```json
[
  {
    "url": "https://srd.dndtools.org/srd/classes/baseCore/barbarian.html",
    "title": "Barbarian",
    "html": "<html>...</html>",
    "success": true,
    "category": "classes_base"
  },
  ...
]
```

### Estadísticas

```json
{
  "total": 150,
  "successful": 145,
  "failed": 5,
  "categories": {
    "classes_base": 11,
    "races": 50,
    ...
  },
  "timestamp": "2025-01-14T..."
}
```

## 🔧 Arquitectura

### Módulos

| Archivo | Propósito |
|---------|-----------|
| `index.mjs` | Punto de entrada principal |
| `config.mjs` | Configuración y constantes |
| `utils.mjs` | Utilidades (logger, parser, file I/O) |
| `fetcher.mjs` | Lógica de HTTP requests con retry |

### Flujo de Trabajo

1. **Usuario ejecuta** el script con categoría/URL
2. **Fetcher** obtiene la página principal con rate limiting
3. **Parser** extrae links relevantes
4. **Batch Fetcher** descarga todas las páginas (con delays)
5. **Processor** procesa y limpia el HTML
6. **Saver** guarda JSON + HTML + logs

## 📝 Ejemplos

### Obtener solo clases del Player's Handbook

```bash
node scripts/scraper/index.mjs --category classes_base
```

Esto generará:
- `scraped-data/classes/classes_base-2025-01-14.json`
- `scraped-data/logs/stats-classes_base-2025-01-14.json`

### Obtener un monstruo específico

```bash
node scripts/scraper/index.mjs --url "https://srd.dndtools.org/srd/monsters/dragon.html"
```

### Scrapear múltiples categorías

```bash
# Primero clases
node scripts/scraper/index.mjs --category classes_base

# Luego razas
node scripts/scraper/index.mjs --category races

# Luego conjuros
node scripts/scraper/index.mjs --category spells
```

## 🛠️ Post-Procesamiento

Una vez scrapeado el contenido, puedes procesarlo con scripts adicionales:

### Parsear clases a formato Supabase

```bash
node scripts/parse-classes.mjs
```

### Traducir contenido al español

```bash
node scripts/translate.mjs --input scraped-data/classes/classes_base.json
```

### Insertar en Supabase

```bash
node scripts/migrate-scraped-data.mjs --category classes
```

## ⚠️ Consideraciones Éticas

1. **Rate Limiting**: Usa delays apropiados (≥500ms) para no sobrecargar el servidor
2. **Uso Personal**: Este contenido es solo para uso personal/educativo
3. **Respeta la fuente**: D&D Tools SRD es un recurso valioso de la comunidad
4. **Cache Local**: Guarda los datos localmente y evita re-scrapear innecesariamente

## 🐛 Troubleshooting

### Error: ECONNRESET

**Causa**: El servidor cerró la conexión

**Solución**: Aumenta `REQUEST_DELAY` en `config.mjs`

### Error: ETIMEDOUT

**Causa**: Request tardó demasiado

**Solución**: Aumenta `REQUEST_TIMEOUT` en `config.mjs`

### 403 Forbidden

**Causa**: El servidor bloqueó el User-Agent

**Solución**: Cambia `USER_AGENT` en `config.mjs`

### Progreso lento

**Causa**: Rate limiting muy agresivo

**Solución**: Reduce `REQUEST_DELAY` (con cuidado)

## 📈 Estimaciones de Tiempo

Con `REQUEST_DELAY = 500ms`:

| Categoría | Items | Tiempo Estimado |
|-----------|-------|-----------------|
| Classes Base | 11 | ~10 segundos |
| Races | ~50 | ~30 segundos |
| Skills | ~40 | ~25 segundos |
| Feats | ~1,500 | ~15 minutos |
| Spells | ~3,000 | ~30 minutos |
| Monsters | ~1,500 | ~15 minutos |
| **TODO** | ~8,000 | **~1-2 horas** |

## 🔄 Próximas Mejoras

- [ ] Parsers específicos por tipo de contenido (classes, spells, etc.)
- [ ] Traducción automática al español
- [ ] Validación de datos extraídos
- [ ] Exportadores a diferentes formatos (SQL, CSV, XML)
- [ ] UI web para visualizar datos scrapeados
- [ ] Modo incremental (solo scrapear páginas nuevas/modificadas)
- [ ] Soporte para Cheerio/JSDOM para mejor parsing de HTML

## 📚 Referencias

- **D&D Tools SRD**: https://srd.dndtools.org/
- **SRD Book List**: https://srd.dndtools.org/srd/meta/bookList.html
- **D&D 3.5 System Reference Document**: Official WotC SRD

---

**Made with ❤️ for the D&D community**
