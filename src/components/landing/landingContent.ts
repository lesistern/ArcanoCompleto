import { SystemKey } from '@/contexts/SystemContext';
import { ExperienceLevel } from '@/contexts/ExperienceContext';

export interface HeroContent {
    title: string;
    subtitle: string;
    ctaPrimary: { text: string; href: string };
    ctaSecondary?: { text: string; href: string };
}

export interface FeatureBlock {
    title: string;
    items: { label: string; href: string; description?: string }[];
}

export const getHeroContent = (system: SystemKey, level: ExperienceLevel): HeroContent => {
    const systemNames = {
        dnd_35: 'D&D 3.5',
        dnd_5e: 'D&D 5e',
        dnd_55: 'One D&D',
        pathfinder: 'Pathfinder',
        starfinder: 'Starfinder'
    };

    const name = systemNames[system];

    // NOVATO
    if (level === 'novato') {
        return {
            title: `Empieza a jugar ${name} desde cero`,
            subtitle: 'Te guiamos paso a paso para crear tu primer personaje y sentarte a la mesa sin memorizar el manual.',
            ctaPrimary: { text: 'Crear mi primer personaje', href: '/creador' },
            ctaSecondary: { text: `Guía rápida de ${name}`, href: `/${system.replace('_', '-')}/primeros-pasos` }
        };
    }

    // INTERMEDIO
    if (level === 'intermedio') {
        return {
            title: `Recursos para jugar ${name}`,
            subtitle: 'Accede rápidamente a las reglas, herramientas y tablas que necesitas para tu próxima sesión.',
            ctaPrimary: { text: 'Crear personaje', href: '/creador' },
            ctaSecondary: { text: 'Explorar reglas', href: `/${system.replace('_', '-')}/reglas` }
        };
    }

    // EXPERTO
    return {
        title: `Compendio completo de ${name}`,
        subtitle: 'Reglas, clases, dotes, conjuros y monstruos, listos para consulta rápida y precisa.',
        ctaPrimary: { text: 'Ver compendio completo', href: `/${system.replace('_', '-')}/reglas` },
        ctaSecondary: { text: 'Buscador avanzado', href: '/buscador' }
    };
};

export const getFeatureBlocks = (system: SystemKey, level: ExperienceLevel): FeatureBlock[] => {
    const basePath = `/${system.replace('_', '-')}`;

    if (level === 'novato') {
        return [
            {
                title: 'Aprende lo básico',
                items: [
                    { label: '¿Qué es el juego de rol?', href: `${basePath}/primeros-pasos/que-es`, description: 'Conceptos fundamentales' },
                    { label: 'Tu primer personaje', href: `${basePath}/primeros-pasos/creacion`, description: 'Guía paso a paso' },
                    { label: 'Cómo se juega', href: `${basePath}/primeros-pasos/reglas-basicas`, description: 'Mecánicas esenciales' }
                ]
            }
        ];
    }

    if (level === 'intermedio') {
        return [
            {
                title: 'Accesos Rápidos',
                items: [
                    { label: 'Clases', href: `${basePath}/clases` },
                    { label: 'Dotes', href: `${basePath}/dotes` },
                    { label: 'Conjuros', href: `${basePath}/conjuros` },
                    { label: 'Combate', href: `${basePath}/reglas/combate` }
                ]
            }
        ];
    }

    // Experto
    return [
        {
            title: 'Índice de Reglas',
            items: [
                { label: 'Razas', href: `${basePath}/razas` },
                { label: 'Clases', href: `${basePath}/clases` },
                { label: 'Dotes', href: `${basePath}/dotes` },
                { label: 'Conjuros', href: `${basePath}/conjuros` },
                { label: 'Objetos Mágicos', href: `${basePath}/objetos` },
                { label: 'Monstruos', href: `${basePath}/monstruos` }
            ]
        }
    ];
};
