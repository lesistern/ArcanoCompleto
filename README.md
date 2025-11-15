# 🐉 D&D 3.5 Compendio Completo en Español

Un compendio completo y optimizado de Dungeons & Dragons 3.5 en español, con datos de 118 libros oficiales del SRD.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com)

🌐 **[Demo en vivo](https://tu-dominio.vercel.app)** | 📚 **[Documentación](./claude.md)**

---

## ✨ Características Principales

### 🎮 Editor de Personajes Completo
- ✅ **3 sistemas de generación de habilidades**
  - Point Buy (25 puntos estándar)
  - 4d6 drop lowest con animación de dados
  - Entrada manual personalizada
- ✅ **16 razas jugables** (7 base + 9 suplementarias)
- ✅ **Cálculos automáticos** de modificadores y estadísticas
- ✅ **Export/Import JSON** de personajes
- ✅ **Persistencia automática** en localStorage

### 📖 Base de Datos Completa
- ✅ **11 clases base** del Player's Handbook
- ✅ **605 conjuros** con relaciones clase-conjuro (1,410 registros)
- ✅ **143 dotes** (109 del PHB + 34 extras)
- ✅ **16 razas** completamente detalladas
- ✅ **72 armas** con stats optimizados
- ✅ **43 habilidades** del sistema D&D 3.5

### 🌍 Sistema de Traducciones Colaborativo
- ✅ **554 conjuros** con traducciones oficiales (91.6%)
- ✅ **6 niveles de usuario** (guest → admin)
- ✅ **Sistema de votación** comunitaria
- ✅ **Integración DeepL** para traducciones automáticas
- ✅ **Gamificación** con reputación y badges

### 🎯 Sistema de Experiencia y Progresión
- ✅ **20 niveles de usuario** basados en D&D 5e
- ✅ **4 tiers de progreso** (Novato → Legendario)
- ✅ **Sistema de XP** automático por contribuciones
- ✅ **Leaderboard público** de top contribuidores

### 🎫 Sistema de Feedback de Beta
- ✅ **Reportes de bugs** con categorías y prioridades
- ✅ **Votación comunitaria** de reportes
- ✅ **Panel de administración** para gestión
- ✅ **Recompensas de XP** por reportes resueltos

### 🚀 Optimizaciones de Performance
- ✅ **Vercel Speed Insights** integrado
- ✅ **Lazy loading** de componentes
- ✅ **Prefetch optimizado** en rutas críticas
- ✅ **Bundle size reducido** -10% (~180 KB)
- ✅ **Core Web Vitals** optimizados

---

## 🗄️ Tecnologías

| Categoría | Tecnología |
|-----------|-----------|
| **Frontend** | Next.js 15, React 18, TypeScript 5 |
| **Styling** | Tailwind CSS 3, Lucide Icons |
| **Backend** | Supabase PostgreSQL, Row Level Security |
| **Autenticación** | Supabase Auth (Email/Password + OAuth) |
| **Storage** | Supabase Storage (avatares, imágenes) |
| **Búsqueda** | PostgreSQL Full-Text Search + Fuzzy Search (pg_trgm) |
| **Deployment** | Vercel (CI/CD automático) |
| **Analytics** | Vercel Speed Insights |

---

## 🎭 Contenido Disponible

### Razas (16 totales)

#### 📖 Player's Handbook (7 razas base)
Humano, Elfo, Enano, Mediano, Gnomo, Semielfo, Semiorco

#### 🌟 Suplementarias (9 razas - requieren DM)
Aasimar, Tiefling, Goliath, Raptoran, Killoren, Illumian, Gnomo Susurrante, Centauro, Felino

### Clases (11 clases base)
Bárbaro, Bardo, Clérigo, Druida, Explorador, Guerrero, Hechicero, Mago, Monje, Paladín, Pícaro

### Conjuros (605 conjuros)
7 listas de clase: Bardo, Clérigo, Druida, Explorador, Hechicero, Mago, Paladín

### Dotes (143 dotes)
- **General:** 113 dotes
- **Combate:** 13 dotes
- **Metamágica:** 9 dotes
- **Creación de objetos:** 8 dotes

---

## 🚀 Comenzar

### Prerequisitos
- Node.js 18+
- Cuenta de Supabase (gratis)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/dnd-compendium.git
cd dnd-compendium

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Configurar Supabase

1. **Crear proyecto** en [supabase.com](https://supabase.com)
2. **Obtener credenciales** en Settings → API
3. **Ejecutar migraciones SQL** desde la carpeta `/supabase/`
4. **Poblar datos** con scripts de `/scripts/`

```bash
# Ejecutar scripts de población
node scripts/migrate-races.mjs
node scripts/migrate-weapons.mjs
node scripts/populate-books.mjs
```

---

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (localhost:3000) |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Linter de código |

---

## 🏗️ Estructura del Proyecto

```
dnd-compendium/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (auth)/            # Rutas de autenticación
│   │   ├── clases/            # Listado y detalle de clases
│   │   ├── razas/             # Listado y detalle de razas
│   │   ├── editor-personajes/ # Editor de personajes
│   │   ├── feedback/          # Sistema de reportes
│   │   ├── leaderboard/       # Ranking de usuarios
│   │   └── profile/           # Perfil y configuración
│   ├── components/            # Componentes React reutilizables
│   │   ├── character/         # Componentes del editor
│   │   ├── layout/            # Header, Footer, etc.
│   │   └── ui/                # Componentes base (Button, Card, etc.)
│   ├── hooks/                 # React hooks personalizados
│   ├── lib/                   # Utilidades y servicios
│   │   ├── supabase/          # Clientes de Supabase
│   │   └── utils/             # Helpers y cálculos
│   └── types/                 # Definiciones TypeScript
├── supabase/                  # Migraciones SQL
├── scripts/                   # Scripts de población de datos
└── public/                    # Assets estáticos
```

---

## 🎯 Roadmap

### ✅ Fase 1: Base de Datos (Completada)
- [x] 11 clases base con progresión 1-20
- [x] 605 conjuros con listas de clase
- [x] 143 dotes del PHB
- [x] 16 razas completamente detalladas
- [x] 72 armas optimizadas

### ✅ Fase 2: Frontend Básico (Completada)
- [x] Editor de personajes interactivo
- [x] Páginas de clases y razas
- [x] Sistema de autenticación
- [x] Sistema de feedback
- [x] Perfiles públicos de usuario

### 🚧 Fase 3: Expansión de Contenido (En Progreso)
- [ ] Monster Manual (~300 criaturas)
- [ ] Objetos mágicos del DMG
- [ ] Clases de prestigio
- [ ] Dotes de suplementos (~1,400 adicionales)

### 📋 Fase 4: Features Avanzadas (Planeado)
- [ ] Búsqueda global con Algolia
- [ ] Comparador de razas/clases/items
- [ ] Generador de encuentros por CR
- [ ] Calculadora de experiencia
- [ ] Exportar personajes a PDF
- [ ] Modo oscuro (dark mode)

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este es un proyecto de código abierto.

### Formas de Contribuir
1. **Reportar bugs** usando el sistema de feedback integrado
2. **Traducir contenido** a través del sistema colaborativo
3. **Mejorar código** enviando Pull Requests
4. **Documentación** mejorando guías y tutoriales

### Guía de Contribución
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

### Contenido D&D
- Datos basados en el **System Reference Document (SRD)** bajo **Open Game License (OGL) 1.0a**
- Fuente: [dndtools.org](https://srd.dndtools.org/) y [d20srd.org](https://www.d20srd.org/)
- Traducciones basadas en manuales oficiales de **Devir Iberia**

### Código del Proyecto
- Licencia MIT
- Copyright © 2025

### Disclaimer
**Dungeons & Dragons** y **D&D** son marcas registradas de **Wizards of the Coast LLC**.
Este proyecto es un compendio de fans bajo OGL y **no está afiliado ni respaldado** por WotC.

---

## 📞 Contacto y Soporte

- **Issues:** [GitHub Issues](https://github.com/tu-usuario/dnd-compendium/issues)
- **Feedback:** Usa el sistema integrado en la app
- **Documentación:** Ver [claude.md](./claude.md) para detalles técnicos

---

## 🙏 Agradecimientos

- **Wizards of the Coast** por el SRD bajo OGL
- **dndtools.org** por el contenido estructurado
- **Devir Iberia** por las traducciones oficiales
- **Comunidad D&D** por feedback y pruebas

---

**Última actualización:** 2025-01-15
**Versión:** 1.0.0 (Sistema completo funcional)

---

⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!
