import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Loader2, RefreshCw, Check } from 'lucide-react';

interface AvatarCreatorStepProps {
    onAvatarCreated: (url: string) => void;
    currentAvatarUrl?: string;
}

export function AvatarCreatorStep({ onAvatarCreated, currentAvatarUrl }: AvatarCreatorStepProps) {
    const subdomain = 'demo'; // Use 'demo' for testing, or a specific subdomain if available
    const iFrameRef = useRef<HTMLIFrameElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(currentAvatarUrl || null);

    useEffect(() => {
        const iFrame = iFrameRef.current;
        if (iFrame) {
            iFrame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;
        }
    }, [subdomain]);

    useEffect(() => {
        const receiveMessage = (event: MessageEvent) => {
            const json = parse(event);

            if (json?.source !== 'readyplayerme') {
                return;
            }

            // Suscribe to all events
            if (json.eventName === 'v1.frame.ready') {
                if (iFrameRef.current && iFrameRef.current.contentWindow) {
                    iFrameRef.current.contentWindow.postMessage(
                        JSON.stringify({
                            target: 'readyplayerme',
                            type: 'subscribe',
                            eventName: 'v1.**',
                        }),
                        '*'
                    );
                }
                setIsLoading(false);
            }

            // Handle avatar export
            if (json.eventName === 'v1.avatar.exported') {
                const url = json.data.url;
                setAvatarUrl(url);
                onAvatarCreated(url);
                setIsLoading(false);
            }

            // Handle user interactions to keep loading state accurate if needed
            if (json.eventName === 'v1.user.set') {
                // User started interacting
            }
        };

        window.addEventListener('message', receiveMessage);
        return () => {
            window.removeEventListener('message', receiveMessage);
        };
    }, [onAvatarCreated]);

    function parse(event: MessageEvent) {
        try {
            return JSON.parse(event.data);
        } catch (error) {
            return null;
        }
    }

    const resetAvatar = () => {
        setAvatarUrl(null);
        setIsLoading(true);
        if (iFrameRef.current) {
            iFrameRef.current.src = `https://${subdomain}.readyplayer.me/avatar?frameApi&clearCache`;
        }
    };

    if (avatarUrl) {
        return (
            <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="p-8 bg-dungeon-950/50 rounded-xl border border-dungeon-800 flex flex-col items-center gap-6">
                    <div className="h-32 w-32 rounded-full bg-indigo-500/20 flex items-center justify-center border-2 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                        <Check className="h-16 w-16 text-indigo-400" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-heading font-bold text-dungeon-100">¡Avatar Creado!</h3>
                        <p className="text-dungeon-300">Tu personaje ahora tiene una apariencia única.</p>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={resetAvatar} variant="outline" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Crear Nuevo
                        </Button>
                        <a
                            href={avatarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-indigo-600 text-white hover:bg-indigo-700 h-10 py-2 px-4"
                        >
                            Descargar .GLB
                        </a>
                    </div>

                    <div className="text-xs text-dungeon-500 max-w-md mx-auto truncate">
                        URL: {avatarUrl}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-dungeon-800 bg-black">
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-dungeon-900 z-10 text-dungeon-300 gap-3">
                    <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
                    <p>Cargando estudio de avatares...</p>
                </div>
            )}
            <iframe
                ref={iFrameRef}
                allow="camera *; microphone *"
                title="Ready Player Me Avatar Creator"
                className="w-full h-full border-none"
            />
        </div>
    );
}
