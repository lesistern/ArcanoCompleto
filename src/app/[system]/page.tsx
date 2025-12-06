import { notFound } from 'next/navigation';
import { DynamicHero } from '@/components/landing/DynamicHero';
import { ContentHub } from '@/components/landing/ContentHub';
import { SystemKey } from '@/contexts/SystemContext';
import { SystemSyncer } from '@/components/landing/SystemSyncer';

// Valid systems
const validSystems = ['dnd-35', 'dnd-5e', 'dnd-55', 'pathfinder', 'starfinder'];

export function generateStaticParams() {
    return validSystems.map((system) => ({
        system: system,
    }));
}

export default async function SystemLandingPage({
    params,
}: {
    params: Promise<{ system: string }>;
}) {
    const { system } = await params;

    if (!validSystems.includes(system)) {
        notFound();
    }

    // Map URL param to SystemKey
    const systemKeyMap: Record<string, SystemKey> = {
        'dnd-35': 'dnd_35',
        'dnd-5e': 'dnd_5e',
        'dnd-55': 'dnd_55',
        'pathfinder': 'pathfinder',
        'starfinder': 'starfinder',
    };

    const systemKey = systemKeyMap[system];

    // Note: In a real implementation, we would set the SystemContext here based on the URL
    // But since SystemContext is client-side, we can't easily set it from a server component
    // to affect the whole tree upwards. 
    // However, the DynamicHero and ContentHub use the context.
    // We might need a client wrapper to set the context based on the URL param.

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl min-h-[80vh] flex flex-col items-center">
            <div className="w-full max-w-5xl">
                {/* We need a client component to force the system context update */}
                <SystemSyncer systemKey={systemKey} />
                <DynamicHero />
                <ContentHub />
            </div>
        </div>
    );
}
