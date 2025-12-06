import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Coins, Scale, ShoppingBag } from 'lucide-react';
import { CurrencyConverter } from './CurrencyConverter';

export function WealthAndMoneyInfo() {
    return (
        <div className="space-y-8 mb-12">
            {/* Equipment Intro */}
            <section className="prose prose-invert max-w-none">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-amber-400 mb-4">
                    <ShoppingBag className="h-6 w-6" />
                    Equipo
                </h2>
                <p className="text-dungeon-200 leading-relaxed">
                    Asume que un personaje posee al menos un conjunto de ropa normal. Elige uno de los siguientes conjuntos de ropa:
                    vestimenta de artesano, vestimenta de artista, vestimenta de explorador, vestimenta de monje,
                    vestimenta de campesino, vestimenta de erudito o vestimenta de viajero.
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Wealth and Money */}
                <Card className="bg-dungeon-800/50 border-dungeon-700">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-400">
                            <Coins className="h-5 w-5" />
                            Riqueza y dinero
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200">
                        <h3 className="font-bold text-dungeon-100">Monedas</h3>
                        <p>
                            La moneda más común es la pieza de oro (po). Una pieza de oro vale 10 piezas de plata (pp).
                            Cada pieza de plata vale 10 piezas de cobre (pc). Además de las monedas de cobre, plata y oro,
                            también existen piezas de platino (ppt), que valen 10 po cada una.
                        </p>
                        <p className="text-sm text-dungeon-300 italic">
                            La moneda estándar pesa alrededor de un tercio de onza (cincuenta por libra).
                        </p>

                        <div className="mt-4 overflow-hidden rounded-lg border border-dungeon-600">
                            <table className="w-full text-sm">
                                <thead className="bg-dungeon-900 text-amber-500">
                                    <tr>
                                        <th className="p-2 text-left">Moneda</th>
                                        <th className="p-2 text-center">PC</th>
                                        <th className="p-2 text-center">PP</th>
                                        <th className="p-2 text-center">PO</th>
                                        <th className="p-2 text-center">PPT</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dungeon-700 bg-dungeon-800/30">
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-100">Pieza de cobre (pc)</td>
                                        <td className="p-2 text-center text-amber-400/80">1</td>
                                        <td className="p-2 text-center text-dungeon-400">1/10</td>
                                        <td className="p-2 text-center text-dungeon-400">1/100</td>
                                        <td className="p-2 text-center text-dungeon-400">1/1,000</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-100">Pieza de plata (pp)</td>
                                        <td className="p-2 text-center text-dungeon-300">10</td>
                                        <td className="p-2 text-center text-amber-400/80">1</td>
                                        <td className="p-2 text-center text-dungeon-400">1/10</td>
                                        <td className="p-2 text-center text-dungeon-400">1/100</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-100">Pieza de oro (po)</td>
                                        <td className="p-2 text-center text-dungeon-300">100</td>
                                        <td className="p-2 text-center text-dungeon-300">10</td>
                                        <td className="p-2 text-center text-amber-400/80">1</td>
                                        <td className="p-2 text-center text-dungeon-400">1/10</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-100">Pieza de platino (ppt)</td>
                                        <td className="p-2 text-center text-dungeon-300">1,000</td>
                                        <td className="p-2 text-center text-dungeon-300">100</td>
                                        <td className="p-2 text-center text-dungeon-300">10</td>
                                        <td className="p-2 text-center text-amber-400/80">1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Currency Converter */}
                        <CurrencyConverter />
                    </CardContent>
                </Card>

                {/* Trade Goods */}
                <Card className="bg-dungeon-800/50 border-dungeon-700">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-400">
                            <Scale className="h-5 w-5" />
                            Riqueza aparte de monedas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200">
                        <p>
                            Los mercaderes comúnmente intercambian mercancías comerciales sin usar moneda.
                            Como medio de comparación, algunas mercancías se detallan a continuación.
                        </p>

                        <div className="mt-4 overflow-hidden rounded-lg border border-dungeon-600">
                            <table className="w-full text-sm">
                                <thead className="bg-dungeon-900 text-amber-500">
                                    <tr>
                                        <th className="p-2 text-left w-24">Coste</th>
                                        <th className="p-2 text-left">Objeto</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dungeon-700 bg-dungeon-800/30">
                                    <tr><td className="p-2 text-amber-400/80 font-mono">1 pc</td><td className="p-2">Una libra de trigo</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">2 pc</td><td className="p-2">Una libra de harina, o una gallina</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">1 pp</td><td className="p-2">Una libra de hierro</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">5 pp</td><td className="p-2">Una libra de tabaco o cobre</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">1 po</td><td className="p-2">Una libra de canela, o una cabra</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">2 po</td><td className="p-2">Una libra de jengibre o pimienta, o una oveja</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">3 po</td><td className="p-2">Un cerdo</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">4 po</td><td className="p-2">Una yarda cuadrada de lino</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">5 po</td><td className="p-2">Una libra de sal o plata</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">10 po</td><td className="p-2">Una yarda cuadrada de seda, o una vaca</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">15 po</td><td className="p-2">Una libra de azafrán o clavo, o un buey</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">50 po</td><td className="p-2">Una libra de oro</td></tr>
                                    <tr><td className="p-2 text-amber-400/80 font-mono">500 po</td><td className="p-2">Una libra de platino</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 pt-4 border-t border-dungeon-700">
                            <h4 className="font-bold text-dungeon-100 mb-1">Vender botín</h4>
                            <p className="text-sm">
                                En general, un personaje puede vender algo por la mitad de su precio listado.
                                Las mercancías comerciales son la excepción a la regla de mitad de precio.
                                Una mercancía comercial es un bien valioso que puede ser intercambiado fácilmente casi como si fuera dinero en efectivo.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
