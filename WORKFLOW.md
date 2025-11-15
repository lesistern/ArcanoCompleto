# Workflow - Compendio D&D 3.5

## Estado Actual ✅

### Completado
- [x] **Configuración inicial del proyecto**
  - Next.js 15 con TypeScript
  - TailwindCSS (versión personalizada)
  - Estructura de carpetas organizada
  - Sistema de diseño (colores dungeon/gold, tipografía)
  - Lucide React para iconos

- [x] **Header y Navegación**
  - Logo y navegación principal temática
  - Enlaces a todas las secciones
  - Navegación responsive
  - Footer con información OGL

- [x] **Página de Inicio** (`/`)
  - Hero section temática D&D
  - Grid de cards con secciones principales
  - Información OGL y licencia
  - Links rápidos a contenido

- [x] **Dotes** (`/dotes`) ✅ COMPLETO
  - 34 dotes del SRD con datos completos
  - Tipos TypeScript completos
  - Sistema de filtros por categoría (General, Combate, Metamágica, Creación de objetos, Especial)
  - Página de lista con contador de resultados
  - Páginas de detalle individuales (`/dotes/[slug]`)
  - Información completa: prerrequisitos, beneficio, especial
  - Iconos distintivos y badges por categoría

- [x] **Habilidades** (`/habilidades`) ✅ COMPLETO
  - 43 habilidades del SRD con datos completos
  - Tipos TypeScript completos
  - Sistema de filtros por atributo clave (Fuerza, Destreza, Constitución, Inteligencia, Sabiduría, Carisma)
  - Página de lista con contador de resultados
  - Páginas de detalle individuales (`/habilidades/[slug]`)
  - Información detallada: descripción, chequeo, acción, reintento, especial, sinergia
  - Indicadores visuales para entrenamiento y penalización por armadura

- [x] **Objetos - Armas** (`/objetos/armas`) ✅ COMPLETO
  - 78 armas mundanas del SRD con estadísticas completas
  - Tipos TypeScript completos
  - **Sistema de filtros múltiples avanzado**:
    - Por tipo de arma (simple/marcial/exótica)
    - Por categoría (cuerpo a cuerpo/distancia)
    - Por tipo de daño (Perforante/Cortante/Contundente)
    - Por tamaño (Diminuta/Pequeña/Mediana/Grande)
  - Contador de resultados filtrados (X de Y armas)
  - Páginas de detalle individuales (`/objetos/[slug]`)
  - **Sistema visual de tipos de daño**:
    - Gradientes para armas con daño simultáneo "A y B" (ej: Lucero del alba)
    - Badges separados para armas con daño alternativo "A o B"
    - Clarificación con texto "y"/"o" en páginas de detalle
  - Datos completos: coste, daño, crítico, alcance, peso, tipo de daño
  - Organización por subcategorías con separadores visuales

- [x] **Sistema de Referencia de Iconos** (`/iconos`) ✅ COMPLETO
  - **Estructura de subdirectorios organizada**:
    - `/iconos` - Página índice con preview de las 3 bibliotecas
    - `/iconos/lucide` - Galería completa interactiva
    - `/iconos/gameicons` - Información detallada
    - `/iconos/rpgawesome` - Información detallada
  - **Lucide React - 79 iconos organizados**:
    - 9 categorías D&D: Razas (10), Clases (14), Armas (10), Hechizos Elementos (9), Hechizos Tipos (10), Objetos (10), Efectos (10), Atributos (6), Varios (10)
    - Sistema de búsqueda en tiempo real
    - Preview visual de cada icono
    - Código de ejemplo para uso
  - **Game-icons.net - 4,170+ iconos**:
    - Información de categorías disponibles
    - Instrucciones de instalación (npm/CDN)
    - Detalles de licencia CC BY 3.0
    - Enlaces a documentación oficial
  - **RPG Awesome - 495 iconos**:
    - Categorías especializadas en mecánicas RPG
    - Instrucciones de instalación
    - Detalles de doble licencia (SIL OFL 1.1 + MIT)
    - Comparación de casos de uso

- [x] **Objetos - Índice** (`/objetos`)
  - Página de categorías de objetos
  - Links a armas y objetos mágicos
  - Estructura preparada para expansión

- [x] **Placeholders** (⏳ Estructura lista para desarrollo)
  - `/clases` - Página placeholder con mensaje
  - `/clases/[slug]` - Detalle placeholder
  - `/razas` - Página placeholder con mensaje
  - `/razas/[slug]` - Detalle placeholder
  - `/objetos/magicos` - Página placeholder
  - `/5e` - Página placeholder para D&D 5e
  - `/5.5e` - Página placeholder para D&D 5.5e

---

## Próximos Pasos 📋

### Fase 1: Contenido Core Fundamental

#### 1. **Clases (Classes)** ⚔️ [PRÓXIMO - ALTA PRIORIDAD]
- [ ] Migrar desde placeholder a implementación completa
- [ ] Crear tipos TypeScript (`src/lib/types/class.ts`)
- [ ] Crear datos JSON con 11 clases base (`src/lib/data/3.5/classes.json`)
  - Bárbaro, Bardo, Clérigo, Druida, Guerrero, Hechicero, Mago, Monje, Paladín, Pícaro, Explorador
- [ ] Componente ClassCard
- [ ] Página de lista con categorización (`/clases`)
- [ ] Página de detalle con tabla de progresión (`/clases/[slug]`)
- [ ] Incluir:
  - Dado de Golpe (HD)
  - Habilidades de clase
  - Competencias (armas, armaduras)
  - BAB progression
  - Salvaciones (Fort, Ref, Will)
  - Características de clase por nivel (1-20)
  - Hechizos por día (para clases con magia)
  - Iconos distintivos por clase

#### 2. **Razas (Races)** 🧙 [ALTA PRIORIDAD]
- [ ] Migrar desde placeholder a implementación completa
- [ ] Crear tipos TypeScript (`src/lib/types/race.ts`)
- [ ] Crear datos JSON con 7 razas base (`src/lib/data/3.5/races.json`)
  - Humano, Elfo, Enano, Mediano, Gnomo, Semielfo, Semiorco
- [ ] Componente RaceCard
- [ ] Página de lista con categorización (`/razas`)
- [ ] Página de detalle completa (`/razas/[slug]`)
- [ ] Incluir:
  - Ajustes de características
  - Tamaño y velocidad
  - Rasgos raciales especiales
  - Idiomas
  - Clase favorecida
  - Ajuste de nivel (si aplica)
  - Iconos distintivos por raza

### Fase 2: Magia y Combate

#### 3. **Conjuros/Hechizos (Spells)** ✨
- [ ] Crear tipos TypeScript (`src/lib/types/spell.ts`)
- [ ] Crear datos JSON (empezar con ~50 conjuros importantes)
- [ ] Componente SpellCard
- [ ] Página de lista con filtros avanzados (`/hechizos`)
- [ ] Página de detalle (`/hechizos/[slug]`)
- [ ] Incluir:
  - Nivel por clase (Mago 3, Clérigo 4, etc.)
  - Escuela y subescuela
  - Componentes (V, S, M, F, DF, XP)
  - Tiempo de lanzamiento
  - Alcance
  - Objetivo/Efecto/Área
  - Duración
  - Salvación y Resistencia a conjuros
  - Descripción detallada
  - Filtros: nivel, clase, escuela, componentes

#### 4. **Equipo - Armaduras** 🛡️ [SIGUIENTE DESPUÉS DE CLASES/RAZAS]
- [ ] Crear tipos TypeScript (`src/lib/types/armor.ts`)
- [ ] Crear datos JSON (`src/lib/data/3.5/armor.json`)
- [ ] Componente ArmorCard
- [ ] Página de lista (`/objetos/armaduras`)
- [ ] Incluir:
  - Categoría (Ligera, Media, Pesada, Escudos)
  - Bonificador CA
  - Bonificador máx. Des
  - Penalización armadura
  - Prob. fallo conjuros arcanos
  - Velocidad (9m y 6m)
  - Peso y precio

### Fase 3: Mejoras y Contenido Adicional

#### 5. **Mejoras a Armas** ⚔️
- [ ] Completar descripciones faltantes de armas (muchas tienen placeholder)
- [ ] Añadir campo `damageLogic: 'and' | 'or'` al tipo Weapon
- [ ] Migrar datos a archivo JSON separado (`src/lib/data/3.5/weapons.json`)
- [ ] Añadir propiedades especiales detalladas
- [ ] Integrar iconos de Game-icons.net para cada arma

#### 6. **Objetos Mágicos** 🔮
- [ ] Migrar desde placeholder a implementación
- [ ] Tipos TypeScript por categoría
- [ ] Armas mágicas (+1, +2, etc.)
- [ ] Armaduras mágicas
- [ ] Pociones y pergaminos
- [ ] Anillos y amuletos
- [ ] Varas, bastones, varitas
- [ ] Objetos maravillosos
- [ ] Filtros por tipo, rareza, nivel de lanzador

#### 7. **Monstruos** 👹
- [ ] Crear tipos TypeScript completos
- [ ] Empezar con ~20 monstruos icónicos
- [ ] Sistema de filtros por CR, tipo, tamaño
- [ ] Bloque de estadísticas completo
- [ ] Incluir:
  - Dados de Golpe completos
  - CA (toque, desprevenido)
  - Ataques y daño
  - Características especiales
  - Habilidades especiales (Ex, Sp, Su)
  - Desafío (CR)
  - Tesoro
  - Alineamiento

#### 8. **Dominios (Clérigos)** 🙏
- [ ] ~20 dominios del PHB
- [ ] Poderes otorgados
- [ ] Conjuros de dominio por nivel
- [ ] Deidades asociadas
- [ ] Integración con página de Clérigo

#### 9. **Clases de Prestigio** 👑
- [ ] Tipos TypeScript extendiendo clase base
- [ ] ~10 clases de prestigio importantes del DMG
- [ ] Requisitos de entrada detallados
- [ ] Tabla de progresión 1-10
- [ ] Características de clase por nivel
- [ ] Integración con sistema de clases base

### Fase 4: Mejoras de UX y Funcionalidades Avanzadas

#### 10. **Sistema de Búsqueda Global** 🔍
- [ ] Barra de búsqueda en header (siempre visible)
- [ ] Búsqueda cross-category (dotes, habilidades, armas, clases, razas)
- [ ] Resultados agrupados por tipo de contenido
- [ ] Sugerencias en tiempo real con autocomplete
- [ ] Fuzzy search para tolerar errores tipográficos
- [ ] Búsqueda con atajos de teclado (Ctrl+K)

#### 11. **Filtros Avanzados** 🎛️
- [ ] Componente de filtros reutilizable y consistente
- [ ] Filtros persistentes con localStorage
- [ ] URL query params para compartir búsquedas filtradas
- [ ] Botón de reset para limpiar filtros
- [ ] Contador de filtros activos
- [ ] Expandir/colapsar panel de filtros

#### 12. **Favoritos y Listas** ⭐
- [ ] Sistema de marcadores (favoritos)
- [ ] Crear listas personalizadas de items
- [ ] Categorizar listas (Build de guerrero, Hechizos de Mago, etc.)
- [ ] Exportar/importar listas en JSON
- [ ] Compartir listas vía URL
- [ ] Almacenamiento local con localStorage
- [ ] Página dedicada `/favoritos`

#### 13. **Modo Oscuro/Claro** 🌓
- [ ] Toggle en header con icono de sol/luna
- [ ] Paleta de colores para modo claro
- [ ] Persistencia de preferencia en localStorage
- [ ] Transiciones suaves entre modos
- [ ] Detección automática de preferencia del sistema

#### 14. **Integración de Iconos** 🎨
- [ ] Instalar e integrar Game-icons.net (vía react-icons o SVG)
- [ ] Instalar e integrar RPG Awesome (vía CDN o npm)
- [ ] Asociar iconos temáticos a cada:
  - Clase (espada, libro, escudo, etc.)
  - Raza (montañas para enanos, árboles para elfos, etc.)
  - Hechizo (fuego, hielo, rayo, etc.)
  - Arma (iconos específicos por tipo)
- [ ] Selector de iconos para personajes personalizados

#### 15. **Herramientas Adicionales** 🎲
- [ ] Calculadora de daño
- [ ] Comparador de armas/objetos (lado a lado)
- [ ] Simulador de tiradas de dados
- [ ] Generador de encuentros por CR
- [ ] Generador de tesoro aleatorio
- [ ] Calculadora de experiencia

---

## Estructura de Archivos Estándar

Para cada nueva categoría de contenido:

```
src/
├── lib/
│   ├── types/
│   │   └── [category].ts          # Interfaces TypeScript
│   └── data/
│       └── 3.5/
│           └── [category].json    # Datos en JSON
├── components/
│   └── [Category]Card.tsx         # Componente de tarjeta
└── app/
    └── [category]/
        ├── page.tsx               # Lista/grid view
        └── [slug]/
            └── page.tsx           # Vista de detalle
```

---

## 🎯 Prioridades de Desarrollo

### Prioridad 1 - CRÍTICA ⚡
**Contenido fundamental para poder "jugar"**
1. **Clases** - Esencial para crear personajes
2. **Razas** - Esencial para crear personajes
3. **Hechizos** - Necesario para clases con magia

### Prioridad 2 - ALTA 🔥
**Contenido importante y frecuentemente consultado**
4. **Armaduras** - Complementa armas para equipamiento completo
5. **Mejorar Armas** - Completar descripciones y datos faltantes
6. **Monstruos** - Para DMs, encuentros y combates

### Prioridad 3 - MEDIA 📊
**Expansión de contenido**
7. **Objetos Mágicos** - Amplía opciones de equipamiento
8. **Dominios** - Especialización de Clérigos
9. **Clases de Prestigio** - Opciones avanzadas

### Prioridad 4 - BAJA 🎨
**Mejoras de experiencia de usuario**
10. **Búsqueda Global** - Mejora navegabilidad
11. **Favoritos y Listas** - Personalización
12. **Modo Claro** - Accesibilidad
13. **Herramientas** - Calculadoras y generadores

---

## 📊 Métricas del Proyecto

### Contenido Actual (Completado)
- ✅ **34 Dotes** con sistema de filtros completo
- ✅ **43 Habilidades** con sistema de filtros completo
- ✅ **78 Armas mundanas** con sistema de filtros avanzado
- ✅ **79 Iconos Lucide** organizados y documentados
- ✅ **4,665+ iconos adicionales** documentados (Game-icons + RPG Awesome)
- ✅ Sistema de navegación completo
- ✅ Diseño temático D&D implementado

### Cobertura del SRD 3.5
- ✅ **Dotes**: ~30% del SRD (34 de ~100+)
- ✅ **Habilidades**: 100% del core (43 habilidades)
- ✅ **Armas mundanas**: 100% (78 armas)
- ⏳ **Clases**: 0% (placeholder)
- ⏳ **Razas**: 0% (placeholder)
- ⏳ **Armas mágicas**: 0%
- ⏳ **Armaduras**: 0%
- ⏳ **Hechizos**: 0%
- ⏳ **Monstruos**: 0%

### Líneas de Código (Estimado)
- ~5,000+ líneas de TypeScript/TSX
- ~500+ líneas de CSS (Tailwind)
- ~2,000+ líneas de datos JSON inline

---

## 🛠️ Notas Técnicas

### Patrones Establecidos
- **Client Components**: Usar `'use client'` solo para filtros y estado interactivo
- **Server Components**: Por defecto para páginas estáticas
- **Filtros**: useState con múltiples selectores, contador de resultados
- **Rutas dinámicas**: `[slug]/page.tsx` con Next.js 15 async params
- **Tipos**: TypeScript estricto con interfaces completas
- **Estilos**: Tailwind con clases explícitas (no dinámicas)
- **Datos**: Actualmente inline, considerar migrar a archivos JSON

### Convenciones de Código
- Nombres de rutas en español (`/dotes`, `/habilidades`)
- Slugs en minúsculas con guiones (`ataque-poderoso`)
- Iconos de lucide-react coherentes con el tema
- Todos los datos y UI en español
- Incluir información de fuente cuando esté disponible
- Usar `generateStaticParams()` para SSG
- Mantener diseño profesional y minimalista

### Limitaciones Conocidas
1. **Tailwind CSS**: Requiere clases completas en compile time
   - ❌ No usar: `` `bg-${color}-500` ``
   - ✅ Usar: Condicionales con clases completas
2. **Datos embebidos**: Aumenta tamaño de archivos
   - Considerar migrar a `/src/lib/data/3.5/*.json`
3. **Sin backend**: Aplicación completamente estática
   - Limita funcionalidades avanzadas (autenticación, persistencia en servidor)
4. **Armas "y" vs "o"**: Lista hardcoded temporal
   - Solución futura: añadir campo `damageLogic` al tipo

### Mejoras Técnicas Futuras
- [ ] Migrar datos a archivos JSON separados
- [ ] Implementar lazy loading para listas largas
- [ ] Optimizar bundle size (code splitting)
- [ ] Añadir tests unitarios (Jest + React Testing Library)
- [ ] Mejorar SEO (meta tags, sitemap, robots.txt)
- [ ] Implementar PWA (service worker, offline support)
- [ ] Añadir breadcrumbs de navegación
- [ ] Mejorar accesibilidad (ARIA, keyboard navigation)

---

## 📚 Recursos y Referencias

### D&D 3.5 SRD
- [d20srd.org](https://www.d20srd.org/) - SRD oficial en inglés
- [dndtools.net](https://dndtools.net/) - Base de datos completa 3.5
- Manual del Jugador 3.5 (español) - Referencia principal

### Diseño y Assets
- [Lucide Icons](https://lucide.dev) - Iconos UI actuales
- [Game-icons.net](https://game-icons.net) - 4,170+ iconos RPG (CC BY 3.0)
- [RPG Awesome](https://nagoshiashumari.github.io/Rpg-Awesome/) - 495 iconos mecánicas (SIL OFL 1.1 + MIT)

### Documentación Técnica
- [Next.js 15 Docs](https://nextjs.org/docs) - Framework principal
- [TailwindCSS Docs](https://tailwindcss.com/docs) - Sistema de estilos
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Tipado

### Sitios de Referencia (Benchmark)
- [D&D Beyond](https://www.dndbeyond.com/) - Referencia UI/UX premium
- [Archives of Nethys](https://2e.aonprd.com/) - Sistema de temas y accesibilidad
- [Nivel20](https://nivel20.com/) - Compendio en español

---

## 📝 Changelog Reciente

### 2025-01-14 (Última sesión)
- ✅ Sistema completo de iconos con 3 bibliotecas documentadas
- ✅ Galería interactiva de 79 iconos Lucide organizados en 9 categorías
- ✅ Sistema de búsqueda en tiempo real para iconos
- ✅ Información detallada de Game-icons.net y RPG Awesome
- ✅ Actualización completa de documentación (WORKFLOW.md)

### 2025-01-13
- ✅ Sistema de filtros avanzado para armas (4 filtros simultáneos)
- ✅ Visualización especial de tipos de daño con gradientes
- ✅ Clarificación "y"/"o" en tipos de daño
- ✅ 78 armas mundanas completas con estadísticas
- ✅ Contador de resultados filtrados

### 2025-01-12 (Sesiones anteriores)
- ✅ 34 dotes con sistema de filtros
- ✅ 43 habilidades con sistema de filtros
- ✅ Configuración inicial Next.js 15 + TypeScript + Tailwind
- ✅ Sistema de diseño temático D&D (colores, tipografía)
- ✅ Header, Footer y navegación

---

**Última actualización**: 2025-01-14
**Versión del documento**: 2.0
**Estado del proyecto**: En desarrollo activo - Fase 1 (Contenido Core)
