import React from 'react';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Book, Settings, Shield, Lock, Eye, EyeOff, Users, Globe } from 'lucide-react';

interface PreferencesStepProps {
    data: any;
    updateData: (key: string, value: any) => void;
}

export function PreferencesStep({ data, updateData }: PreferencesStepProps) {
    const updateNestedData = (section: string, key: string, value: any) => {
        const currentSection = data[section] || {};
        updateData(section, { ...currentSection, [key]: value });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Sources */}
            <Card className="bg-dungeon-900/50 border-dungeon-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-dungeon-100">
                        <Book className="h-5 w-5 text-indigo-400" />
                        Fuentes de Contenido
                    </CardTitle>
                    <CardDescription className="text-dungeon-400">
                        Elige qué libros y contenido estarán disponibles para este personaje.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Homebrew & Core */}
                    <div className="space-y-4 border-b border-dungeon-800 pb-4">
                        <div className="flex items-center justify-between p-4 bg-dungeon-950/50 rounded-lg border border-dungeon-800">
                            <div className="space-y-1">
                                <Label className="text-dungeon-200 font-medium">Contenido Homebrew</Label>
                                <p className="text-xs text-dungeon-400">
                                    Opciones creadas por la comunidad. Consulta con tu DM.
                                </p>
                            </div>
                            <Switch
                                checked={data.preferences?.homebrew}
                                onCheckedChange={(c) => updateNestedData('preferences', 'homebrew', c)}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-dungeon-950/50 rounded-lg border border-dungeon-800">
                            <div className="space-y-1">
                                <Label className="text-dungeon-200 font-medium">Reglas Básicas (Core)</Label>
                                <p className="text-xs text-dungeon-400">
                                    Player's Handbook, Dungeon Master's Guide, Monster Manual.
                                </p>
                            </div>
                            <Switch
                                checked={true}
                                disabled
                            />
                        </div>
                    </div>

                    {/* Expanded Rules Placeholder */}
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-dungeon-300 uppercase tracking-wider">Reglas Expandidas (Suplementos)</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gold-500 font-medium">Habilitar Todo</span>
                                <Switch checked={false} disabled />
                            </div>
                        </div>

                        <div className="p-4 bg-dungeon-950/30 rounded-lg border border-dungeon-800 border-dashed relative overflow-hidden">
                            {/* Overlay Note */}
                            <div className="absolute inset-0 bg-dungeon-950/60 backdrop-blur-[1px] flex items-center justify-center p-4 z-10">
                                <div className="bg-dungeon-900 p-4 rounded-lg border border-indigo-500/30 shadow-xl text-center max-w-sm">
                                    <Settings className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
                                    <p className="text-indigo-200 font-medium text-sm">En Construcción</p>
                                    <p className="text-dungeon-400 text-xs mt-1">
                                        La biblioteca completa de suplementos (Complete Warrior, Divine, Arcane, etc.) se añadirá próximamente.
                                    </p>
                                </div>
                            </div>

                            {/* Blurred Placeholders */}
                            <div className="space-y-3 opacity-40 select-none pointer-events-none">
                                {['Complete Warrior', 'Complete Divine', 'Complete Arcane', 'Manual de Planos', 'Libro de Oscuridad Vil'].map((book, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className="text-dungeon-400 text-sm">{book}</span>
                                        <div className="w-8 h-4 bg-dungeon-800 rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Opciones de Sistema */}
            <Card className="bg-dungeon-900/50 border-dungeon-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-dungeon-100">
                        <Settings className="h-5 w-5 text-indigo-400" />
                        Opciones de Sistema
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-dungeon-200">Tipo de Avance</Label>
                            <select
                                className="w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100"
                                value={data.preferences?.advancement || 'xp'}
                                onChange={(e) => updateNestedData('preferences', 'advancement', e.target.value)}
                            >
                                <option value="xp">Puntos de Experiencia (XP)</option>
                                <option value="milestone">Hitos (Milestone)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-dungeon-200">Puntos de Golpe al subir nivel</Label>
                            <select
                                className="w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100"
                                value={data.preferences?.hpType || 'fixed'}
                                onChange={(e) => updateNestedData('preferences', 'hpType', e.target.value)}
                            >
                                <option value="fixed">Fijo (Media)</option>
                                <option value="manual">Manual (Tirada)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-dungeon-200">Tirar Dados Digitales</Label>
                                <p className="text-xs text-dungeon-400">Habilitar tiradas en el navegador</p>
                            </div>
                            <Switch
                                checked={data.preferences?.digitalDice}
                                onCheckedChange={(c) => updateNestedData('preferences', 'digitalDice', c)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-dungeon-200">Ignorar peso de monedas</Label>
                                <p className="text-xs text-dungeon-400">50 monedas pesan 1 libra normalmente</p>
                            </div>
                            <Switch
                                checked={data.preferences?.ignoreCoinWeight}
                                onCheckedChange={(c) => updateNestedData('preferences', 'ignoreCoinWeight', c)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Privacidad */}
            <Card className="bg-dungeon-900/50 border-dungeon-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-dungeon-100">
                        <Lock className="h-5 w-5 text-indigo-400" />
                        Privacidad del Personaje
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <label className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${data.privacy === 'campaign' ? 'bg-indigo-900/20 border-indigo-500' : 'bg-dungeon-950/50 border-dungeon-800 hover:border-dungeon-600'}`}>
                        <input
                            type="radio"
                            name="privacy"
                            value="campaign"
                            checked={data.privacy === 'campaign'}
                            onChange={(e) => updateData('privacy', e.target.value)}
                            className="hidden"
                        />
                        <Users className={`h-5 w-5 ${data.privacy === 'campaign' ? 'text-indigo-400' : 'text-dungeon-500'}`} />
                        <div>
                            <span className={`block font-bold ${data.privacy === 'campaign' ? 'text-indigo-200' : 'text-dungeon-300'}`}>Solo Campaña</span>
                            <span className="text-xs text-dungeon-500">Solo visible para jugadores en tu campaña.</span>
                        </div>
                    </label>

                    <label className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${data.privacy === 'public' ? 'bg-indigo-900/20 border-indigo-500' : 'bg-dungeon-950/50 border-dungeon-800 hover:border-dungeon-600'}`}>
                        <input
                            type="radio"
                            name="privacy"
                            value="public"
                            checked={data.privacy === 'public'}
                            onChange={(e) => updateData('privacy', e.target.value)}
                            className="hidden"
                        />
                        <Globe className={`h-5 w-5 ${data.privacy === 'public' ? 'text-indigo-400' : 'text-dungeon-500'}`} />
                        <div>
                            <span className={`block font-bold ${data.privacy === 'public' ? 'text-indigo-200' : 'text-dungeon-300'}`}>Público</span>
                            <span className="text-xs text-dungeon-500">Cualquiera con el enlace puede verlo.</span>
                        </div>
                    </label>

                    <label className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${data.privacy === 'private' ? 'bg-indigo-900/20 border-indigo-500' : 'bg-dungeon-950/50 border-dungeon-800 hover:border-dungeon-600'}`}>
                        <input
                            type="radio"
                            name="privacy"
                            value="private"
                            checked={data.privacy === 'private'}
                            onChange={(e) => updateData('privacy', e.target.value)}
                            className="hidden"
                        />
                        <EyeOff className={`h-5 w-5 ${data.privacy === 'private' ? 'text-indigo-400' : 'text-dungeon-500'}`} />
                        <div>
                            <span className={`block font-bold ${data.privacy === 'private' ? 'text-indigo-200' : 'text-dungeon-300'}`}>Privado</span>
                            <span className="text-xs text-dungeon-500">Solo tú puedes verlo.</span>
                        </div>
                    </label>
                </CardContent>
            </Card>
        </div>
    );
}
