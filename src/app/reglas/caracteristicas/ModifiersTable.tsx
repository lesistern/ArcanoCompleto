'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ModifiersTable() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse text-sm">
                    <thead>
                        <tr className="border-b-2 border-gold-500/30 text-gold-400">
                            <th className="p-2 min-w-[80px] sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">Puntuación</th>
                            <th className="p-2 min-w-[60px] sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">Mod.</th>
                            <th className="p-2 min-w-[100px] border-r border-dungeon-700">Impacto</th>
                            <th className="p-2" colSpan={10}>Conjuros diarios adicionales por nivel</th>
                        </tr>
                        <tr className="border-b border-dungeon-700 text-xs text-dungeon-400">
                            <th className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10"></th>
                            <th className="p-2 sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700"></th>
                            <th className="p-2 border-r border-dungeon-700"></th>
                            <th className="p-1 w-8">0</th>
                            <th className="p-1 w-8">1°</th>
                            <th className="p-1 w-8">2°</th>
                            <th className="p-1 w-8">3°</th>
                            <th className="p-1 w-8">4°</th>
                            <th className="p-1 w-8">5°</th>
                            <th className="p-1 w-8">6°</th>
                            <th className="p-1 w-8">7°</th>
                            <th className="p-1 w-8">8°</th>
                            <th className="p-1 w-8">9°</th>
                        </tr>
                    </thead>
                    <tbody className="text-dungeon-200">
                        {/* Rangos Bajos */}
                        <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                            <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">1</td>
                            <td className="p-2 text-red-600 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">-5</td>
                            <td className="p-2 text-xs text-red-600 font-medium border-r border-dungeon-700">Incapaz</td>
                            <td className="p-2 text-xs text-dungeon-500" colSpan={10}>Incapaz de lanzar conjuros</td>
                        </tr>
                        <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                            <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">2-3</td>
                            <td className="p-2 text-red-400 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">-4</td>
                            <td className="p-2 text-xs text-red-400 font-medium border-r border-dungeon-700">Casi incapaz</td>
                            <td className="p-2 text-xs text-dungeon-500" colSpan={10}>Incapaz de lanzar conjuros</td>
                        </tr>
                        <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                            <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">4-5</td>
                            <td className="p-2 text-orange-500 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">-3</td>
                            <td className="p-2 text-xs text-orange-500 font-medium border-r border-dungeon-700">Malo</td>
                            <td className="p-2 text-xs text-dungeon-500" colSpan={10}>Incapaz de lanzar conjuros</td>
                        </tr>
                        <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                            <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">6-7</td>
                            <td className="p-2 text-orange-300 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">-2</td>
                            <td className="p-2 text-xs text-orange-300 font-medium border-r border-dungeon-700">Pobre</td>
                            <td className="p-2 text-xs text-dungeon-500" colSpan={10}>Incapaz de lanzar conjuros</td>
                        </tr>
                        <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                            <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">8-9</td>
                            <td className="p-2 text-yellow-400 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">-1</td>
                            <td className="p-2 text-xs text-yellow-400 font-medium border-r border-dungeon-700">Mediocre</td>
                            <td className="p-2 text-xs text-dungeon-500" colSpan={10}>Incapaz de lanzar conjuros</td>
                        </tr>

                        {/* Rangos Medios */}
                        <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                            <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">10-11</td>
                            <td className="p-2 text-white font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">0</td>
                            <td className="p-2 text-xs text-white font-medium border-r border-dungeon-700">Promedio</td>
                            <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td>
                        </tr>
                        <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                            <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">12-13</td>
                            <td className="p-2 text-lime-300 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+1</td>
                            <td className="p-2 text-xs text-lime-300 font-medium border-r border-dungeon-700">Bueno</td>
                            <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td>
                        </tr>
                        <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                            <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">14-15</td>
                            <td className="p-2 text-green-400 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+2</td>
                            <td className="p-2 text-xs text-green-400 font-medium border-r border-dungeon-700">Notable</td>
                            <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td>
                        </tr>
                        <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                            <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">16-17</td>
                            <td className="p-2 text-cyan-300 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+3</td>
                            <td className="p-2 text-xs text-cyan-300 font-medium border-r border-dungeon-700">Excelente</td>
                            <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td>
                        </tr>
                        <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                            <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">18-19</td>
                            <td className="p-2 text-blue-400 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+4</td>
                            <td className="p-2 text-xs text-blue-400 font-medium border-r border-dungeon-700">Superior</td>
                            <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td>
                        </tr>
                        <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                            <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">20-21</td>
                            <td className="p-2 text-purple-400 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+5</td>
                            <td className="p-2 text-xs text-purple-400 font-medium border-r border-dungeon-700">Épico</td>
                            <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td>
                        </tr>

                        {/* Rangos Altos (Desplegables) */}
                        {isExpanded && (
                            <>
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">22-23</td>
                                    <td className="p-2 text-purple-300 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+6</td>
                                    <td className="p-2 text-xs text-purple-300 font-medium border-r border-dungeon-700">Leyenda</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td>
                                </tr>
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">24-25</td>
                                    <td className="p-2 text-purple-200 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+7</td>
                                    <td className="p-2 text-xs text-purple-200 font-medium border-r border-dungeon-700">Leyenda</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-dungeon-600">-</td><td className="p-1 text-dungeon-600">-</td>
                                </tr>
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">26-27</td>
                                    <td className="p-2 text-pink-400 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+8</td>
                                    <td className="p-2 text-xs text-pink-400 font-medium border-r border-dungeon-700">Mítico</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-dungeon-600">-</td>
                                </tr>
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">28-29</td>
                                    <td className="p-2 text-pink-300 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+9</td>
                                    <td className="p-2 text-xs text-pink-300 font-medium border-r border-dungeon-700">Mítico</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td>
                                </tr>
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">30-31</td>
                                    <td className="p-2 text-pink-200 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+10</td>
                                    <td className="p-2 text-xs text-pink-200 font-medium border-r border-dungeon-700">Semidiós</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td>
                                </tr>

                                {/* Rangos Épicos */}
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">32-33</td>
                                    <td className="p-2 text-fuchsia-400 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+11</td>
                                    <td className="p-2 text-xs text-fuchsia-400 font-medium border-r border-dungeon-700">Semidiós</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">1</td><td className="p-1 text-gold-400 font-bold">1</td>
                                </tr>
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">34-35</td>
                                    <td className="p-2 text-fuchsia-300 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+12</td>
                                    <td className="p-2 text-xs text-fuchsia-300 font-medium border-r border-dungeon-700">Divino</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">1</td>
                                </tr>
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">36-37</td>
                                    <td className="p-2 text-fuchsia-200 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+13</td>
                                    <td className="p-2 text-xs text-fuchsia-200 font-medium border-r border-dungeon-700">Divino</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td>
                                </tr>
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">38-39</td>
                                    <td className="p-2 text-rose-400 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+14</td>
                                    <td className="p-2 text-xs text-rose-400 font-medium border-r border-dungeon-700">Supremo</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td>
                                </tr>
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">40-41</td>
                                    <td className="p-2 text-rose-300 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+15</td>
                                    <td className="p-2 text-xs text-rose-300 font-medium border-r border-dungeon-700">Supremo</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">2</td><td className="p-1 text-gold-400 font-bold">2</td>
                                </tr>
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">42-43</td>
                                    <td className="p-2 text-rose-200 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+16</td>
                                    <td className="p-2 text-xs text-rose-200 font-medium border-r border-dungeon-700">Absoluto</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">2</td>
                                </tr>
                                <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                    <td className="p-2 sticky left-0 bg-dungeon-900/95 backdrop-blur z-10">44-45</td>
                                    <td className="p-2 text-rose-100 font-bold sticky left-[80px] bg-dungeon-900/95 backdrop-blur z-10 border-r border-dungeon-700">+17</td>
                                    <td className="p-2 text-xs text-rose-100 font-medium border-r border-dungeon-700">Absoluto</td>
                                    <td className="p-1 text-dungeon-600">-</td><td className="p-1 text-gold-400 font-bold">5</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">4</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td><td className="p-1 text-gold-400 font-bold">3</td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-2 border-t border-dungeon-700 pt-2">
                <Button
                    variant="ghost"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gold-400 hover:text-gold-300 hover:bg-dungeon-900/50 w-full md:w-auto"
                >
                    {isExpanded ? (
                        <div className="flex items-center justify-center">
                            <ChevronUp className="h-4 w-4 mr-2" />
                            Ver menos
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <ChevronDown className="h-4 w-4 mr-2" />
                            Ver niveles épicos (22-45)
                        </div>
                    )}
                </Button>
            </div>
        </div>
    );
}
