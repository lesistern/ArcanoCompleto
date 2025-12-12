import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Dynamic params
        const title = searchParams.get('title') || 'Compendio D&D 3.5';
        // Truncate description to avoid overflow
        const rawDescription = searchParams.get('description') || 'El recurso más completo en español.';
        const description = rawDescription.length > 100
            ? rawDescription.slice(0, 100) + '...'
            : rawDescription;

        const type = searchParams.get('type') || 'Compendio';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0f1419', // dungeon-900
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #1a202c 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a202c 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        color: '#e2e8f0', // dungeon-100
                        fontFamily: 'serif',
                    }}
                >
                    {/* Border Decoration */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            right: '20px',
                            bottom: '20px',
                            border: '4px solid #b8860b', // gold-600
                            borderRadius: '24px',
                            pointerEvents: 'none',
                            opacity: 0.5,
                        }}
                    />

                    {/* Inner Border Decoration */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '28px',
                            left: '28px',
                            right: '28px',
                            bottom: '28px',
                            border: '1px solid #fbbf24', // gold-400
                            borderRadius: '18px',
                            pointerEvents: 'none',
                            opacity: 0.3,
                        }}
                    />

                    {/* Type Badge */}
                    <div
                        style={{
                            background: 'linear-gradient(to right, #b8860b, #d69e2e)',
                            color: '#0f1419',
                            padding: '8px 24px',
                            borderRadius: '50px',
                            fontSize: 20,
                            fontWeight: 800,
                            marginBottom: 40,
                            textTransform: 'uppercase',
                            letterSpacing: '4px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        }}
                    >
                        {type}
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            background: 'linear-gradient(to bottom, #fbbf24, #b8860b)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            marginBottom: 20,
                            textAlign: 'center',
                            padding: '0 60px',
                            lineHeight: 1.1,
                            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        }}
                    >
                        {title}
                    </div>

                    {/* Description */}
                    <div
                        style={{
                            fontSize: 32,
                            color: '#94a3b8', // dungeon-300
                            textAlign: 'center',
                            maxWidth: '80%',
                            lineHeight: 1.5,
                            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                        }}
                    >
                        {description}
                    </div>

                    {/* Footer Logo/Brand */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 50,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            opacity: 0.8,
                        }}
                    >
                        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                        <div style={{ fontSize: 24, color: '#e2e8f0', fontWeight: 'bold' }}>Compendio D&D 3.5</div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
