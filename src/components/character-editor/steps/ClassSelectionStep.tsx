import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { Sword, Shield, Zap, Book } from 'lucide-react';
import SelectableClassCard from '../SelectableClassCard';

interface ClassSelectionStepProps {
    classes: any[];
    selectedClass: any | null;
    onSelect: (cls: any) => void;
}

export function ClassSelectionStep({ classes, selectedClass, onSelect }: ClassSelectionStepProps) {

    // Helper to get icon based on class role (simple heuristic)
    const getClassIcon = (clsName: string) => {
        const name = clsName.toLowerCase();
        if (name.includes('guerrero') || name.includes('bárbaro') || name.includes('paladín')) return Sword;
        if (name.includes('mago') || name.includes('hechicero') || name.includes('clérigo') || name.includes('druida')) return Book;
        if (name.includes('pícaro') || name.includes('bardo') || name.includes('monje')) return Zap;
        return Shield;
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((cls) => (
                    <SelectableClassCard
                        key={cls.id}
                        classData={cls}
                        isSelected={selectedClass?.id === cls.id}
                        onSelect={() => onSelect(cls)}
                        // Supplemental check logic can be added here if we have non-core classes later
                        supplemental={false}
                    />
                ))}
            </div>

            {selectedClass && (
                <div className="mt-8 p-6 bg-dungeon-900 border border-dungeon-700 rounded-lg animate-in fade-in">
                    <h3 className="text-xl font-bold text-indigo-400 mb-2">{selectedClass.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-dungeon-300">
                        <div className="p-3 bg-dungeon-950 rounded border border-dungeon-800">
                            <strong className="block text-dungeon-200 mb-1">Ataque Base</strong>
                            <span className="font-mono text-gold-400">{selectedClass.bab_progression || 'Media'}</span>
                        </div>
                        <div className="p-3 bg-dungeon-950 rounded border border-dungeon-800">
                            <strong className="block text-dungeon-200 mb-1">Salvaciones Fuertes</strong>
                            <div className="flex gap-1">
                                {selectedClass.fort_save === 'good' && <span className="text-green-400">Fort</span>}
                                {selectedClass.ref_save === 'good' && <span className="text-green-400">Ref</span>}
                                {selectedClass.will_save === 'good' && <span className="text-green-400">Vol</span>}
                                {selectedClass.fort_save !== 'good' && selectedClass.ref_save !== 'good' && selectedClass.will_save !== 'good' && <span>Ninguna</span>}
                            </div>
                        </div>
                        <div className="p-3 bg-dungeon-950 rounded border border-dungeon-800">
                            <strong className="block text-dungeon-200 mb-1">Dados de Golpe</strong>
                            <span className="font-mono text-indigo-300">d{selectedClass.hit_die}</span>
                        </div>
                    </div>
                    {/* Add more details here if needed */}
                    <p className="mt-4 text-dungeon-300 italic border-l-2 border-dungeon-700 pl-4">
                        "{selectedClass.description}"
                    </p>
                </div>
            )}
        </div>
    );
}
