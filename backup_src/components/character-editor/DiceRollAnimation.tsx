'use client';

import { useEffect, useState } from 'react';

interface DiceRollAnimationProps {
  rolls: number[]; // Array de 4 números (los dados individuales)
  total: number; // Suma de los 3 mayores
  onComplete?: () => void;
}

export default function DiceRollAnimation({ rolls, total, onComplete }: DiceRollAnimationProps) {
  const [showDice, setShowDice] = useState(false);
  const [showTotal, setShowTotal] = useState(false);

  useEffect(() => {
    // Mostrar dados con animación escalonada
    setShowDice(true);

    // Mostrar total después de 1.2s
    const totalTimer = setTimeout(() => {
      setShowTotal(true);
    }, 1200);

    // Llamar onComplete después de 1.8s
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 1800);

    return () => {
      clearTimeout(totalTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Encontrar el dado menor (el que se descarta)
  const minValue = Math.min(...rolls);
  const minIndex = rolls.indexOf(minValue);

  return (
    <div className="space-y-4">
      {/* Título */}
      <div className="text-center text-sm text-dungeon-400">
        Tirando 4d6, descartando el menor...
      </div>

      {/* Dados */}
      {showDice && (
        <div className="flex items-center justify-center gap-3">
          {rolls.map((roll, index) => {
            const isDropped = index === minIndex;
            const delay = index * 0.15;

            return (
              <div
                key={index}
                className={`
                  relative w-14 h-14 flex items-center justify-center rounded-lg
                  font-bold text-2xl transition-all duration-300
                  ${
                    isDropped
                      ? 'bg-red-900/50 border-2 border-red-500 text-red-300 opacity-50'
                      : 'bg-dungeon-800 border-2 border-gold-500 text-gold-400'
                  }
                `}
                style={{
                  animation: `dicePopIn 0.5s ease-out ${delay}s both`,
                }}
              >
                {roll}

                {/* Tachado para el dado descartado */}
                {isDropped && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      animation: `strikethrough 0.3s ease-out ${delay + 0.5}s both`,
                    }}
                  >
                    <div className="w-0 h-0.5 bg-red-500" style={{ width: '100%' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Total */}
      {showTotal && (
        <div
          className="text-center"
          style={{
            animation: 'fadeInUp 0.4s ease-out both',
          }}
        >
          <div className="text-xs text-dungeon-500 mb-1">Resultado</div>
          <div className="text-4xl font-bold text-green-400 inline-block px-6 py-2 bg-green-900/20 border-2 border-green-500/50 rounded-lg"
            style={{
              animation: 'pulseGlow 1s ease-in-out infinite',
            }}
          >
            {total}
          </div>
        </div>
      )}
    </div>
  );
}
