'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ObjectsAdminIndexPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-dungeon-900 via-dungeon-800 to-dungeon-900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/admin"
                        className="p-2 rounded-lg bg-dungeon-700 hover:bg-dungeon-600 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gold-400" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gold-400 mb-2">
                            Gestión de Objetos
                        </h1>
                        <p className="text-dungeon-300">
                            Selecciona el tipo de objeto que deseas administrar
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/admin/objetos/armas">
                        <div className="bg-dungeon-800 border border-dungeon-700 hover:border-gold-500 transition-all cursor-pointer group h-full rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gold-400 group-hover:text-gold-300 mb-2">
                                ⚔️ Armas
                            </h3>
                            <p className="text-dungeon-300 text-sm mb-4">
                                Gestiona armas cuerpo a cuerpo, a distancia y exóticas.
                            </p>
                            <p className="text-xs text-dungeon-400">Tabla: items</p>
                        </div>
                    </Link>

                    <Link href="/admin/objetos/armaduras">
                        <div className="bg-dungeon-800 border border-dungeon-700 hover:border-gold-500 transition-all cursor-pointer group h-full rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gold-400 group-hover:text-gold-300 mb-2">
                                🛡️ Armaduras
                            </h3>
                            <p className="text-dungeon-300 text-sm mb-4">
                                Gestiona armaduras ligeras, medias, pesadas y escudos.
                            </p>
                            <p className="text-xs text-dungeon-400">Tabla: armor</p>
                        </div>
                    </Link>

                    <Link href="/admin/objetos/magicos">
                        <div className="bg-dungeon-800 border border-dungeon-700 hover:border-gold-500 transition-all cursor-pointer group h-full rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gold-400 group-hover:text-gold-300 mb-2">
                                ✨ Objetos Mágicos
                            </h3>
                            <p className="text-dungeon-300 text-sm mb-4">
                                Gestiona anillos, varitas, bastones, objetos maravillosos y más.
                            </p>
                            <p className="text-xs text-dungeon-400">Tabla: magic_items</p>
                        </div>
                    </Link>

                    <Link href="/admin/objetos/pociones">
                        <div className="bg-dungeon-800 border border-dungeon-700 hover:border-gold-500 transition-all cursor-pointer group h-full rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gold-400 group-hover:text-gold-300 mb-2">
                                🧪 Pociones
                            </h3>
                            <p className="text-dungeon-300 text-sm mb-4">
                                Gestiona pociones, elixires y aceites mágicos.
                            </p>
                            <p className="text-xs text-dungeon-400">Tabla: potions</p>
                        </div>
                    </Link>

                    <Link href="/admin/objetos/pergaminos">
                        <div className="bg-dungeon-800 border border-dungeon-700 hover:border-gold-500 transition-all cursor-pointer group h-full rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gold-400 group-hover:text-gold-300 mb-2">
                                📜 Pergaminos
                            </h3>
                            <p className="text-dungeon-300 text-sm mb-4">
                                Gestiona pergaminos mágicos, divinos y arcanos.
                            </p>
                            <p className="text-xs text-dungeon-400">Tabla: scrolls</p>
                        </div>
                    </Link>

                    <Link href="/admin/objetos/equipo">
                        <div className="bg-dungeon-800 border border-dungeon-700 hover:border-gold-500 transition-all cursor-pointer group h-full rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gold-400 group-hover:text-gold-300 mb-2">
                                📦 Equipo General
                            </h3>
                            <p className="text-dungeon-300 text-sm mb-4">
                                Gestiona herramientas, kits de aventurero, monturas y equipo general.
                            </p>
                            <p className="text-xs text-dungeon-400">Tabla: equipment</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
