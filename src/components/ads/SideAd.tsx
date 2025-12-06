import React from 'react';

export function SideAd() {
    return (
        <div className="hidden lg:block w-[300px] shrink-0 space-y-4">
            {/* Ad Container */}
            <div className="sticky top-24 min-h-[600px] w-full bg-dungeon-900/40 border border-dungeon-800 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-dungeon-600 uppercase tracking-widest mb-2">Publicidad</span>

                {/* Visual Placeholder for Dev */}
                <div className="w-full h-full min-h-[250px] bg-dungeon-950/50 border border-dashed border-dungeon-700/50 rounded flex items-center justify-center p-4 mb-4">
                    <p className="text-dungeon-500 text-sm">
                        Espacio reservado para<br />Google AdSense
                    </p>
                </div>

                {/* 
                   Google Ads Script Placeholder 
                   You would replace the data-ad-client and data-ad-slot with your actual ID 
                */}
                <div className="w-full overflow-hidden">
                    {/* 
                    <ins className="adsbygoogle"
                         style={{ display: 'block' }}
                         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                         data-ad-slot="XXXXXXXXXX"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                    <script>
                         (adsbygoogle = window.adsbygoogle || []).push({});
                    </script> 
                    */}
                </div>

                <div className="mt-auto">
                    <p className="text-[10px] text-dungeon-600">
                        Apoya el proyecto convirtiéndote en <span className="text-gold-500 font-bold">Patreon</span> para ocultar anuncios.
                    </p>
                </div>
            </div>
        </div>
    );
}
