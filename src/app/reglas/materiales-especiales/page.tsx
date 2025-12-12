import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Hammer, Info, Shield, Swords } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Materiales Especiales - Reglas D&D 3.5 | Compendio Arcano',
    description: 'Materiales especiales para armas y armaduras en D&D 3.5: adamantina, mithral, hierro frío, plata alquímica.',
};

interface SpecialMaterial {
    name: string;
    description: string;
    weaponEffects?: string[];
    armorEffects?: string[];
    cost: string;
    notes?: string;
}

const MATERIALS: SpecialMaterial[] = [
    {
        name: 'Adamantina',
        description: 'El metal más duro conocido. Las armas de adamantina pueden atravesar casi cualquier cosa.',
        weaponEffects: [
            'Ignora dureza menor a 20',
            'Siempre considerada obra maestra',
            'Supera RD/adamantina'
        ],
        armorEffects: [
            'Proporciona RD 1/— (ligera), 2/— (media) o 3/— (pesada)',
            'Siempre considerada obra maestra'
        ],
        cost: 'Arma: +3,000 po | Armadura: +5,000 po (ligera), +10,000 po (media), +15,000 po (pesada)',
        notes: 'Extremadamente rara. Proveniente del Plano Elemental de la Tierra.'
    },
    {
        name: 'Mithral',
        description: 'Metal ligero y brillante como la plata pero mucho más fuerte. Muy apreciado por elfos y enanos.',
        armorEffects: [
            'Reduce la categoría de armadura en un paso (pesada → media → ligera)',
            'Penalizador de armadura reducido en 3',
            'Fallo de conjuro arcano reducido en 10%',
            'Velocidad máxima aumentada',
            'Peso reducido a la mitad'
        ],
        weaponEffects: [
            'Cuenta como arma de plata para superar RD',
            'Peso reducido a la mitad'
        ],
        cost: 'Armadura ligera: +1,000 po | Media: +4,000 po | Pesada: +9,000 po | Escudo: +1,000 po | Arma: +500 po/lb',
        notes: 'Muy buscado por lanzadores arcanos que quieren usar armadura.'
    },
    {
        name: 'Hierro Frío',
        description: 'Hierro extraído de las profundidades y trabajado en frío, nunca calentado. Letal contra criaturas feéricas.',
        weaponEffects: [
            'Supera RD/hierro frío',
            'Efectivo contra hadas, demonios y algunas criaturas extraplanares'
        ],
        cost: 'Costo base × 2 | Mejorar mágicamente cuesta +2,000 po adicionales',
        notes: 'Debe trabajarse en frío. El calor destruye sus propiedades.'
    },
    {
        name: 'Plata Alquímica',
        description: 'Proceso que recubre un arma con plata, efectivo contra licántropos y algunas criaturas.',
        weaponEffects: [
            'Supera RD/plata',
            '−1 al daño (mínimo 1)',
            'Efectivo contra licántropos, diablos y algunos no-muertos'
        ],
        cost: 'Arma ligera: +20 po | Una mano: +90 po | Dos manos: +180 po | Munición (10): +2 po',
        notes: 'No se puede aplicar a armas no metálicas. El proceso es permanente.'
    },
    {
        name: 'Madera Oscura',
        description: 'Madera de árboles raros del corazón de bosques ancestrales. Ligera como el corcho pero fuerte como el acero.',
        weaponEffects: [
            'Peso reducido a la mitad',
            'Puede reemplazar partes de metal en armas de madera'
        ],
        armorEffects: [
            'Penalizador de armadura reducido en 2',
            'Peso reducido a la mitad',
            'Solo para armaduras predominantemente de madera (escudos de madera)'
        ],
        cost: '+10 po por libra del objeto original',
        notes: 'Apreciada por druidas ya que no contiene metal.'
    },
    {
        name: 'Piel de Dragón',
        description: 'Escamas o piel de dragón curtida. Proporciona resistencia al tipo de energía del dragón.',
        armorEffects: [
            'Resistencia a energía del tipo del dragón (fuego, frío, electricidad, ácido)',
            'Cantidad de resistencia depende del tipo de dragón'
        ],
        cost: 'Variable según tipo y edad del dragón. Mínimo +3,000 po',
        notes: 'Requiere acceso a un dragón derrotado y un artesano especializado.'
    }
];

export default function MaterialesEspecialesPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <Link href="/reglas">
                    <Button variant="ghost" size="sm" className="mb-4 text-gray-400 hover:text-gray-200">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a Reglas
                    </Button>
                </Link>
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-slate-500/20 border border-slate-500/30">
                        <Hammer className="h-8 w-8 text-slate-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Materiales Especiales</h1>
                        <p className="text-gray-400">Materiales extraordinarios para armas y armaduras</p>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <Card className="mb-8 bg-gray-900/50 border-gray-700">
                <CardContent className="p-6">
                    <div className="flex gap-3">
                        <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-gray-300 space-y-2">
                            <p>
                                Los <strong className="text-gray-100">materiales especiales</strong> son sustancias
                                raras que proporcionan propiedades únicas a las armas y armaduras. A diferencia de los
                                encantamientos mágicos, estas propiedades son inherentes al material.
                            </p>
                            <p>
                                Un objeto puede estar hecho de un material especial Y tener encantamientos mágicos,
                                combinando ambos beneficios.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Materials Grid */}
            <div className="space-y-6">
                {MATERIALS.map((material) => (
                    <Card key={material.name} className="bg-gray-900/50 border-gray-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl text-slate-300">{material.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-300">{material.description}</p>

                            <div className="grid md:grid-cols-2 gap-4">
                                {material.weaponEffects && (
                                    <div className="space-y-2">
                                        <h4 className="flex items-center gap-2 text-sm font-semibold text-red-400">
                                            <Swords className="h-4 w-4" />
                                            Efectos en Armas
                                        </h4>
                                        <ul className="text-sm text-gray-200 space-y-1">
                                            {material.weaponEffects.map((effect, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-red-500 mt-1">•</span>
                                                    <span>{effect}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {material.armorEffects && (
                                    <div className="space-y-2">
                                        <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-400">
                                            <Shield className="h-4 w-4" />
                                            Efectos en Armaduras
                                        </h4>
                                        <ul className="text-sm text-gray-200 space-y-1">
                                            {material.armorEffects.map((effect, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-blue-500 mt-1">•</span>
                                                    <span>{effect}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="pt-3 border-t border-gray-700 space-y-2">
                                <p className="text-sm">
                                    <strong className="text-gold-400">Costo:</strong>{' '}
                                    <span className="text-gray-300">{material.cost}</span>
                                </p>
                                {material.notes && (
                                    <p className="text-xs text-gray-400 italic">{material.notes}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
