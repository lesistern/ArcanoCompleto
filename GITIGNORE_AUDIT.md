# 📋 Auditoría de .gitignore

**Fecha:** 2025-11-15  
**Estado:** Archivos en repositorio público que podrían ser ignorados

## 🚨 CRÍTICO - Deberían estar en .gitignore

### 1. Directorios de Output (3.0 MB total)

Archivos generados por scripts que NO deberían estar en el repo:

```
scripts/output/                    (1.2 MB)
  ├── spells-to-translate.csv     (505 KB)
  └── spells-to-translate.json    (666 KB)

scripts/scraper/output/            (1.8 MB)
  ├── feats_complete.json         (122 KB)
  ├── spells_clean.json           (833 KB)
  └── spells_complete.json        (836 KB)
```

**Acción recomendada:** ✅ IGNORAR
- Estos son archivos intermedios de procesamiento
- Se pueden regenerar ejecutando los scripts
- Aumentan el tamaño del repo innecesariamente

### 2. Archivos de Test (desarrollo)

```
src/app/test-db/page.tsx
src/app/api/test-supabase/route.ts
```

**Acción recomendada:** ✅ IGNORAR o ELIMINAR
- Son archivos de prueba temporal
- No forman parte de la aplicación productiva

## ⚠️ OPCIONAL - Considerar ignorar

### 3. Documentación Interna (17 archivos)

Documentación de desarrollo interno que podría estar en wiki privada:

```
APLICAR_OPTIMIZACIONES.md
BETA_TESTERS_SETUP.md
CONFIGURACION_AUTH_PROVIDERS.md
FRONTEND_I18N_COMPLETADO.md
INSTRUCCIONES_MIGRACION_CLASES.md
OPTIMIZACIONES_IMPLEMENTADAS.md
OPTIMIZACION_COMPLETADA.md
SISTEMA_AUTENTICACION.md
SISTEMA_AUTH_COMPLETADO.md
SISTEMA_EXPERIENCIA.md
SISTEMA_FEEDBACK.md
SISTEMA_FEEDBACK_COMPLETADO.md
SISTEMA_MULTIIDIOMA.md
SISTEMA_TRADUCCIONES_COLABORATIVO.md
SUPABASE_SETUP.md
TRADUCCIONES_OFICIALES_COMPLETADO.md
TROUBLESHOOTING_DB.md
```

**Pros de mantenerlos:**
- Útiles para colaboradores
- Documentan el proceso de desarrollo
- Pueden servir como ejemplos

**Contras:**
- Aumentan "ruido" en el repo
- Pueden contener información interna
- Mejor lugar: Wiki privada o Notion

**Acción recomendada:** 🤷 TÚ DECIDES
- Si es proyecto open-source → MANTENER
- Si es privado/empresarial → MOVER a wiki

### 4. SQLs de Migración/Desarrollo (~30 archivos)

Archivos SQL grandes que son versiones intermedias:

```
Archivos duplicados/antiguos:
supabase/insert-spells-phb.sql                    (1.1 MB) ❌ DUPLICADO
dnd-compendium/supabase/insert-spells-phb.sql     (1.1 MB) ❌ DUPLICADO
supabase/insert_spells_part1_final.sql            (789 KB)
supabase/insert-spells-part1.sql                  (198 KB)
supabase/insert-spells-part*-fixed.sql            (varios)
supabase/fix-*.sql                                (varios)
```

**Acción recomendada:** 🟡 REVISAR
- ✅ MANTENER: SQLs "canónicos" que crean el schema
- ❌ ELIMINAR: Versiones `-fixed`, `-part*`, duplicados
- ✅ MANTENER: Migraciones documentadas (numbered: 001_*.sql)

**Sugerencia:** Adoptar sistema de migraciones numeradas:
```
supabase/migrations/
  ├── 001_initial_schema.sql
  ├── 002_add_spells.sql
  ├── 003_add_classes.sql
  └── ...
```

## 📊 Resumen de Impacto

| Categoría | Archivos | Tamaño | Acción |
|-----------|----------|--------|--------|
| Output dirs | ~6 | 3.0 MB | ✅ IGNORAR |
| Test files | 2 | <10 KB | ✅ IGNORAR |
| Internal docs | 17 | ~500 KB | 🤷 OPCIONAL |
| SQL duplicados | ~20 | ~5 MB | 🟡 LIMPIAR |
| **TOTAL** | **~45** | **~8.5 MB** | - |

## 🛠️ Plan de Acción Recomendado

### Paso 1: Actualizar .gitignore (AHORA)

```bash
# Aplicar .gitignore.recommended
cp .gitignore.recommended .gitignore
```

### Paso 2: Limpiar archivos ya trackeados (AHORA)

```bash
# Eliminar del tracking (pero mantener localmente)
git rm --cached -r scripts/output/
git rm --cached -r scripts/scraper/output/
git rm --cached src/app/test-db/
git rm --cached src/app/api/test-supabase/

# Commit la limpieza
git commit -m "chore: Remove generated files and test code from tracking"
```

### Paso 3: Limpiar SQLs duplicados (OPCIONAL)

```bash
# Revisar y eliminar duplicados
# CUIDADO: Solo eliminar si estás seguro de que son duplicados

# Ejemplo:
git rm dnd-compendium/supabase/insert-spells-phb.sql  # Duplicado
git rm supabase/insert-spells-part*-fixed.sql  # Versiones antiguas
```

### Paso 4: Reorganizar documentación (FUTURO)

Considerar mover docs internas a:
- GitHub Wiki (privada)
- Notion/Confluence
- Carpeta `/docs` separada (no en public repo)

## ✅ Verificación Post-Limpieza

Después de aplicar cambios:

```bash
# Verificar que archivos grandes no están trackeados
git ls-files | xargs du -b | sort -rn | head -20

# Verificar tamaño del repo
du -sh .git/

# Verificar .gitignore funciona
git status --ignored
```

## 🔐 Consideraciones de Seguridad

Los archivos de output NO contienen información sensible, pero:
- Aumentan superficie de ataque (más código = más bugs potenciales)
- Dificultan code reviews (ruido)
- Consumen ancho de banda en clones

**Recomendación:** Aplicar cambios de .gitignore AHORA.

---

**¿Qué quieres hacer?**
1. Aplicar .gitignore recomendado
2. Limpiar archivos de tracking
3. Ambos (recomendado)
4. Revisar manualmente primero
