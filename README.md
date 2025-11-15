# 🐉 D&D 3.5 Compendio Completo en Español

Un compendio completo de Dungeons & Dragons 3.5 en español, con datos de 118 libros oficiales, optimizado para búsqueda y filtrado avanzado.

## 📊 Estado del Proyecto

### ✅ Base de Datos Completada
- **16 Razas migradas** (7 base + 9 suplementarias)
- **72 Armas** con stats optimizados
- **43 Skills** del Player's Handbook
- **34 Dotes** básicas
- **85 de 118 libros** catalogados

### 🗄️ Tecnologías
- **Next.js 15** con TypeScript
- **Supabase PostgreSQL** (base de datos optimizada)
- **Tailwind CSS** para styling
- **Búsqueda fulltext** en español

### 🎮 Características
- ✅ **Frontend completo de razas** con listado y páginas de detalle
- ✅ **Utilidades para editor de personajes** (cálculos, modificadores, point buy)
- ✅ **Sistema de advertencias** para contenido suplementario
- ✅ **Editor de personajes interactivo** con sistema Point Buy y tirada de dados
  - Información básica (nombre, raza, alineamiento)
  - Generación de puntajes de habilidad (Point Buy 25pts / 4d6 drop lowest)
  - Visualización de estadísticas de combate (CA, iniciativa, velocidad)
  - Sistema de habilidades (skills) con modificadores automáticos
  - Exportar/Importar personajes en JSON
  - Persistencia automática con localStorage

---

## 🎭 Razas Disponibles

### 📖 Razas Base del Player's Handbook (7)

| Raza | Tamaño | Velocidad | Modificadores | Clase Favorecida |
|------|--------|-----------|---------------|------------------|
| **Humano** | Mediano | 30 pies | Ninguno | Cualquiera |
| **Elfo** | Mediano | 30 pies | +2 Des, -2 Con | Mago |
| **Enano** | Mediano | 20 pies | +2 Con, -2 Car | Guerrero |
| **Mediano** | Pequeño | 20 pies | +2 Des, -2 Fue | Pícaro |
| **Gnomo** | Pequeño | 20 pies | +2 Con, -2 Fue | Bardo |
| **Semielfo** | Mediano | 30 pies | Ninguno | Cualquiera |
| **Semiorco** | Mediano | 30 pies | +2 Fue, -2 Int, -2 Car | Bárbaro |

### 🌟 Razas Suplementarias (9)
**⚠️ Requieren aprobación del Dungeon Master**

#### Fase 1A - Razas Populares

| Raza | Fuente | Tamaño | Modificadores | LA | Destacado |
|------|--------|--------|---------------|-------|-----------|
| **Aasimar** | Races of Destiny | Mediano | +2 Sab, +2 Car | +1 | Descendientes celestiales, resistencias elementales |
| **Tiefling** | Races of Destiny | Mediano | +2 Int, +2 Des, -2 Car | +1 | Herencia infernal, habilidad Oscuridad |
| **Goliath** | Races of Stone | Mediano | +4 Fue, +2 Con, -2 Des | +0 | Construcción poderosa, 8 pies de altura |
| **Raptoran** | Races of the Wild | Mediano | +2 Des | +0 | Alas, planeo (vuelo a 5 DG) |
| **Killoren** | Races of the Wild | Mediano | +2 Des, -2 Con | +0 | Fey, 3 aspectos intercambiables |

#### Fase 1B - Razas Secundarias

| Raza | Fuente | Tamaño | Modificadores | LA | Destacado |
|------|--------|--------|---------------|-------|-----------|
| **Illumian** | Races of Destiny | Mediano | Ninguno | +0 | Símbolos de poder, multiclase |
| **Gnomo Susurrante** | Races of Stone | Pequeño | +2 Des, +2 Con, -2 Fue, -2 Car | +0 | Sigilo +8, habilidad Silencio |
| **Centauro** | Races of the Wild | Grande | +8 Fue, +4 Des, +4 Con, -2 Int, +2 Sab, +2 Car | +2 | Velocidad 50 pies, 4 DG raciales |
| **Felino (Catfolk)** | Races of the Wild | Mediano | +2 Des | +0 | Trepar 20 pies, velocidad 40 pies |

---

## 🚀 Comenzar

### Prerequisitos
- Node.js 18+
- Cuenta de Supabase

### Instalación

```bash
# Clonar el repositorio
cd dnd-compendium

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear .env.local con:
# NEXT_PUBLIC_SUPABASE_URL=tu_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
# SUPABASE_SERVICE_ROLE_KEY=tu_service_key

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📦 Scripts de Migración

### Poblar Base de Datos

```bash
# Migrar razas base del Player's Handbook
node scripts/migrate-races.mjs

# Migrar razas suplementarias Fase 1A
node scripts/migrate-races-supplements.mjs

# Migrar razas suplementarias Fase 1B
node scripts/migrate-races-phase1b.mjs

# Migrar armas
node scripts/migrate-weapons.mjs

# Poblar catálogo de libros
node scripts/populate-books.mjs
```

### Aplicar Optimizaciones de BD

Ejecuta `apply-db-optimizations.sql` en el SQL Editor de Supabase para:
- Optimizar columnas numéricas en `weapons`
- Añadir constraints y validaciones
- Crear vistas y funciones útiles
- Mejorar performance 10-50x

---

## 📚 Estructura del Proyecto

```
dnd-compendium/
├── src/
│   ├── app/              # Next.js 15 App Router
│   ├── lib/
│   │   ├── data/3.5/     # Datos JSON de D&D 3.5
│   │   │   ├── races.json
│   │   │   ├── races-supplements.json
│   │   │   ├── weapons.json
│   │   │   └── ...
│   │   └── supabase.ts   # Cliente de Supabase
│   └── components/       # Componentes React
├── scripts/              # Scripts de migración
│   ├── migrate-races.mjs
│   ├── migrate-races-supplements.mjs
│   ├── migrate-races-phase1b.mjs
│   ├── migrate-weapons.mjs
│   └── populate-books.mjs
├── apply-db-optimizations.sql  # SQL de optimizaciones
└── docs/                 # Documentación del proyecto
    ├── CLAUDE.md         # Estado del proyecto
    ├── DND35_LIBROS_DISPONIBLES.md
    └── DND35_SRD_ESTRUCTURA.md
```

---

## 🎯 Próximas Funcionalidades

### En Desarrollo
- [ ] 11 Clases base del Player's Handbook
- [ ] ~300 Conjuros del PH
- [ ] Frontend: Páginas de listado y detalle de razas
- [ ] Sistema de búsqueda global
- [ ] Filtros avanzados por stats

### Planeado
- [ ] Monster Manual completo (~300 criaturas)
- [ ] Objetos mágicos del DMG
- [ ] Calculadora de personajes
- [ ] Árbol visual de dotes
- [ ] Comparador de razas/clases/items
- [ ] Modo oscuro

---

## 📖 Documentación

- **[CLAUDE.md](CLAUDE.md)** - Estado detallado del proyecto
- **[DND35_LIBROS_DISPONIBLES.md](DND35_LIBROS_DISPONIBLES.md)** - Catálogo de 118 libros
- **[DND35_SRD_ESTRUCTURA.md](DND35_SRD_ESTRUCTURA.md)** - Estructura completa del SRD
- **[OPTIMIZACION_COMPLETADA.md](OPTIMIZACION_COMPLETADA.md)** - Optimizaciones de BD aplicadas

---

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Las contribuciones son bienvenidas!

### Áreas de Contribución
- Migración de datos de libros adicionales
- Traducción al español de contenido
- Desarrollo de componentes de frontend
- Optimización de queries de base de datos
- Documentación y tutoriales

---

## ⚖️ Licencia y Créditos

### Contenido
- Datos de D&D 3.5 basados en el **System Reference Document (SRD)** bajo Open Game License
- Fuente primaria: [dndtools.org](https://srd.dndtools.org/)
- Traducción al español por este proyecto

### Código
- Framework: [Next.js](https://nextjs.org) por Vercel
- Base de datos: [Supabase](https://supabase.com)
- Styling: [Tailwind CSS](https://tailwindcss.com)

### Disclaimer
Dungeons & Dragons y D&D son marcas registradas de Wizards of the Coast LLC. Este proyecto es un compendio de fans bajo OGL y no está afiliado con WotC.

---

## 📞 Contacto

Para preguntas, sugerencias o reportar problemas, por favor abre un issue en el repositorio.

---

**Última actualización:** 2025-01-14
**Versión:** 0.2.0 (Base de datos completa con 16 razas)
