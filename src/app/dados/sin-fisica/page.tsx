'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Dices, Plus, Minus, RotateCcw, Info } from 'lucide-react';
import D20Simple from '@/components/dice3d/D20Simple';

type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

interface DiceRoll {
  id: string;
  type: DiceType;
  position: [number, number, number];
  result?: number;
}

export default function DadosSinFisicaPage() {
  const [diceType, setDiceType] = useState<DiceType>('d20');
  const [quantity, setQuantity] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [activeDice, setActiveDice] = useState<DiceRoll[]>([]);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  const handleRoll = () => {
    setResults([]);
    setTotal(null);

    const newDice: DiceRoll[] = Array.from({ length: quantity }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      type: diceType,
      position: [
        (i - (quantity - 1) / 2) * 2.5,
        0,
        0,
      ],
    }));

    setActiveDice(newDice);
  };

  const handleDiceResult = (id: string, value: number) => {
    setResults((prev) => {
      const newResults = [...prev, value];

      if (newResults.length === quantity) {
        const sum = newResults.reduce((a, b) => a + b, 0) + modifier;
        setTotal(sum);
      }

      return newResults;
    });
  };

  const handleClear = () => {
    setActiveDice([]);
    setResults([]);
    setTotal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dungeon-900 to-dungeon-800 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
            🎲 Lanzador de Dados 3D (Sin Física)
          </h1>
          <p className="text-dungeon-400 text-lg">
            Versión compatible con React 19 · Todos los dados de D&D · Interactivo
          </p>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 max-w-2xl mx-auto">
            <p className="text-blue-300 text-sm">
              ⚠️ Esta es una versión temporal sin física realista. Los dados giran en su lugar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de Controles */}
          <div className="lg:col-span-1 space-y-4">
            {/* Selector de Tipo de Dado */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dices className="h-5 w-5 text-gold-400" />
                  Tipo de Dado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {(['d4', 'd6', 'd8', 'd10', 'd12', 'd20'] as DiceType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setDiceType(type)}
                      className={`
                        px-4 py-3 rounded-lg font-bold text-lg transition-all
                        ${
                          diceType === type
                            ? 'bg-gold-500 text-white shadow-lg scale-105'
                            : 'bg-dungeon-800 text-dungeon-300 hover:bg-dungeon-700'
                        }
                      `}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cantidad */}
            <Card>
              <CardHeader>
                <CardTitle>Cantidad de Dados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 bg-dungeon-800 border border-dungeon-700 rounded text-dungeon-200 hover:bg-dungeon-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    className="flex-1 text-center text-3xl font-bold bg-dungeon-800 border border-dungeon-700 rounded py-3 text-dungeon-100 focus:outline-none focus:border-gold-500"
                    min="1"
                    max="10"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                    className="w-10 h-10 bg-dungeon-800 border border-dungeon-700 rounded text-dungeon-200 hover:bg-dungeon-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-dungeon-500 mt-2 text-center">
                  Máximo: 10 dados
                </p>
              </CardContent>
            </Card>

            {/* Modificador */}
            <Card>
              <CardHeader>
                <CardTitle>Modificador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setModifier(modifier - 1)}
                    className="w-10 h-10 bg-dungeon-800 border border-dungeon-700 rounded text-dungeon-200 hover:bg-dungeon-700 transition-colors flex items-center justify-center"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={modifier}
                    onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                    className="flex-1 text-center text-3xl font-bold bg-dungeon-800 border border-dungeon-700 rounded py-3 text-dungeon-100 focus:outline-none focus:border-gold-500"
                  />
                  <button
                    onClick={() => setModifier(modifier + 1)}
                    className="w-10 h-10 bg-dungeon-800 border border-dungeon-700 rounded text-dungeon-200 hover:bg-dungeon-700 transition-colors flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-dungeon-500 mt-2 text-center">
                  {modifier >= 0 ? '+' : ''}{modifier} al resultado total
                </p>
              </CardContent>
            </Card>

            {/* Botones de Acción */}
            <div className="space-y-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleRoll}
                className="w-full text-lg py-6"
              >
                <Dices className="h-6 w-6 mr-2" />
                Lanzar {quantity}{diceType.toUpperCase()}
                {modifier !== 0 && ` ${modifier >= 0 ? '+' : ''}${modifier}`}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClear}
                className="w-full"
                disabled={activeDice.length === 0}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Limpiar Mesa
              </Button>
            </div>

            {/* Resultados */}
            {results.length > 0 && (
              <Card className="border-2 border-gold-500/50">
                <CardHeader>
                  <CardTitle className="text-gold-400">Resultados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {results.map((result, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 bg-dungeon-800 border-2 border-gold-500 rounded-lg flex items-center justify-center text-xl font-bold text-gold-400"
                      >
                        {result}
                      </div>
                    ))}
                  </div>

                  {total !== null && (
                    <div className="pt-3 border-t border-dungeon-700">
                      <div className="text-center">
                        <div className="text-sm text-dungeon-500 mb-1">Total</div>
                        <div className="text-5xl font-bold text-green-400">
                          {total}
                        </div>
                        {modifier !== 0 && (
                          <div className="text-xs text-dungeon-400 mt-2">
                            ({results.reduce((a, b) => a + b, 0)} {modifier >= 0 ? '+' : ''} {modifier})
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Canvas 3D */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden" style={{ height: '800px' }}>
              <div className="w-full h-full bg-gradient-to-b from-dungeon-800 to-black">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center text-dungeon-400">
                    Cargando escena 3D...
                  </div>
                }>
                  <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={0.8} />
                    <pointLight position={[-10, 10, -10]} intensity={0.5} />

                    {activeDice.map((dice) => (
                      <D20Simple
                        key={dice.id}
                        position={dice.position}
                        onResult={(value) => handleDiceResult(dice.id, value)}
                      />
                    ))}

                    <OrbitControls
                      enablePan={false}
                      minDistance={5}
                      maxDistance={15}
                    />

                    <Environment preset="night" />
                  </Canvas>
                </Suspense>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
