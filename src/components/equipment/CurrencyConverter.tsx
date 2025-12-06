'use client';

import { useState, useEffect } from 'react';
import { ArrowRightLeft, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

const MAX_INPUT_VALUE = 9999999;
const MAX_GLOBAL_PLATINUM = 9999999;

// Componente de Input extraído para evitar re-montajes
const CurrencyInput = ({
    label,
    currency,
    value,
    onChange,
    onIncrement,
    colorClass,
    borderColorClass
}: {
    label: string,
    currency: string,
    value: number,
    onChange: (val: string) => void,
    onIncrement: (amount: number) => void,
    colorClass: string,
    borderColorClass: string
}) => (
    <div className="space-y-1 relative group">
        <label className={`text-xs uppercase font-bold ${colorClass}`}>{label}</label>
        <div className="relative">
            <input
                type="text"
                inputMode="numeric"
                value={value === 0 ? '' : value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full bg-dungeon-800 border ${borderColorClass} rounded px-3 py-2 pr-8 text-dungeon-100 focus:outline-none focus:ring-1 focus:ring-opacity-50 transition-all font-mono [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                placeholder="0"
            />
            {/* Custom Spinners */}
            <div className="absolute right-1 top-1 bottom-1 flex flex-col justify-center gap-0.5">
                <button
                    onClick={() => onIncrement(1)}
                    className="h-3.5 w-5 flex items-center justify-center bg-dungeon-700 hover:bg-dungeon-600 rounded-sm text-dungeon-300 hover:text-amber-400 transition-colors"
                    tabIndex={-1}
                >
                    <ChevronUp className="h-3 w-3" />
                </button>
                <button
                    onClick={() => onIncrement(-1)}
                    className="h-3.5 w-5 flex items-center justify-center bg-dungeon-700 hover:bg-dungeon-600 rounded-sm text-dungeon-300 hover:text-amber-400 transition-colors"
                    tabIndex={-1}
                >
                    <ChevronDown className="h-3 w-3" />
                </button>
            </div>
        </div>
    </div>
);

export function CurrencyConverter() {
    const [values, setValues] = useState({ cp: 0, sp: 0, gp: 0, pp: 0 });
    const [totals, setTotals] = useState({ cp: 0, sp: 0, gp: 0, pp: 0 });
    const [totalWeight, setTotalWeight] = useState(0);

    // Calcular el total en Platino para validación global
    const calculateTotalPPT = (currentValues: typeof values) => {
        return (currentValues.cp / 1000) + (currentValues.sp / 100) + (currentValues.gp / 10) + currentValues.pp;
    };

    const updateValue = (currency: keyof typeof values, newValue: number) => {
        // 1. Validar límite individual
        if (newValue < 0 || newValue > MAX_INPUT_VALUE) return;

        // 2. Validar límite global
        const nextValues = { ...values, [currency]: newValue };
        const nextTotalPPT = calculateTotalPPT(nextValues);

        if (nextTotalPPT > MAX_GLOBAL_PLATINUM) {
            return;
        }

        setValues(nextValues);
    };

    const handleChange = (currency: keyof typeof values, inputValue: string) => {
        // Permitir borrar todo (string vacío) -> 0
        if (inputValue === '') {
            updateValue(currency, 0);
            return;
        }

        // Validar que sea número
        const numValue = parseInt(inputValue);
        if (!isNaN(numValue)) {
            updateValue(currency, numValue);
        }
    };

    const handleIncrement = (currency: keyof typeof values, amount: number) => {
        updateValue(currency, (values[currency] || 0) + amount);
    };

    const handleClear = () => {
        setValues({ cp: 0, sp: 0, gp: 0, pp: 0 });
    };

    useEffect(() => {
        // 1 gp = 10 sp = 100 cp
        // 1 pp = 10 gp
        const totalInGold =
            (values.cp / 100) +
            (values.sp / 10) +
            values.gp +
            (values.pp * 10);

        setTotals({
            gp: totalInGold,
            sp: totalInGold * 10,
            cp: totalInGold * 100,
            pp: totalInGold / 10
        });

        // Peso: 50 monedas = 1 libra
        const totalCoins = values.cp + values.sp + values.gp + values.pp;
        setTotalWeight(totalCoins / 50);
    }, [values]);

    return (
        <div className="mt-6 bg-dungeon-900/50 rounded-lg p-4 border border-dungeon-600">
            <div className="flex items-center justify-between mb-4">
                <h4 className="flex items-center gap-2 font-bold text-amber-400 text-sm uppercase tracking-wider">
                    <ArrowRightLeft className="h-4 w-4" />
                    Calculadora de conversión
                </h4>
                <button
                    onClick={handleClear}
                    className="text-xs flex items-center gap-1 text-dungeon-400 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-900/20"
                    title="Limpiar todo"
                >
                    <Trash2 className="h-3 w-3" />
                    Limpiar
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <CurrencyInput
                    label="Cobre (pc)"
                    currency="cp"
                    value={values.cp}
                    onChange={(val) => handleChange('cp', val)}
                    onIncrement={(amt) => handleIncrement('cp', amt)}
                    colorClass="text-orange-500"
                    borderColorClass="border-orange-900/50 focus:border-orange-500 focus:ring-orange-500"
                />
                <CurrencyInput
                    label="Plata (pp)"
                    currency="sp"
                    value={values.sp}
                    onChange={(val) => handleChange('sp', val)}
                    onIncrement={(amt) => handleIncrement('sp', amt)}
                    colorClass="text-slate-400"
                    borderColorClass="border-slate-700/50 focus:border-slate-400 focus:ring-slate-400"
                />
                <CurrencyInput
                    label="Oro (po)"
                    currency="gp"
                    value={values.gp}
                    onChange={(val) => handleChange('gp', val)}
                    onIncrement={(amt) => handleIncrement('gp', amt)}
                    colorClass="text-amber-500"
                    borderColorClass="border-amber-900/50 focus:border-amber-500 focus:ring-amber-500"
                />
                <CurrencyInput
                    label="Platino (ppt)"
                    currency="pp"
                    value={values.pp}
                    onChange={(val) => handleChange('pp', val)}
                    onIncrement={(amt) => handleIncrement('pp', amt)}
                    colorClass="text-cyan-200"
                    borderColorClass="border-cyan-900/50 focus:border-cyan-400 focus:ring-cyan-400"
                />
            </div>

            {/* Results Grid */}
            <div className="pt-4 border-t border-dungeon-700/50">
                <p className="text-xs text-dungeon-400 mb-3 uppercase tracking-wide">Equivalencia total</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Cobre */}
                    <div className="bg-dungeon-800/30 p-2 rounded border border-orange-600/40 flex flex-col items-center justify-center text-center shadow-[inset_0_0_10px_rgba(249,115,22,0.05)]">
                        <span className="text-xs text-orange-500/70 uppercase mb-1 font-semibold">En cobre</span>
                        <span className="text-xl font-heading text-orange-400 font-bold">
                            {totals.cp.toLocaleString('es-ES', { maximumFractionDigits: 0 })} <span className="text-xs font-sans font-normal text-orange-500/70">pc</span>
                        </span>
                    </div>

                    {/* Plata */}
                    <div className="bg-dungeon-800/30 p-2 rounded border border-slate-500/40 flex flex-col items-center justify-center text-center shadow-[inset_0_0_10px_rgba(148,163,184,0.05)]">
                        <span className="text-xs text-slate-400 uppercase mb-1 font-semibold">En plata</span>
                        <span className="text-xl font-heading text-slate-300 font-bold">
                            {totals.sp.toLocaleString('es-ES', { maximumFractionDigits: 1 })} <span className="text-xs font-sans font-normal text-slate-500">pp</span>
                        </span>
                    </div>

                    {/* Oro */}
                    <div className="bg-dungeon-800/50 p-2 rounded border border-amber-500/50 flex flex-col items-center justify-center text-center shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                        <span className="text-xs text-amber-500 uppercase mb-1 font-bold">En oro</span>
                        <span className="text-xl font-heading text-amber-400 font-bold">
                            {totals.gp.toLocaleString('es-ES', { maximumFractionDigits: 2 })} <span className="text-xs font-sans font-normal text-amber-500/70">po</span>
                        </span>
                    </div>

                    {/* Platino */}
                    <div className="bg-dungeon-800/30 p-2 rounded border border-cyan-500/40 flex flex-col items-center justify-center text-center shadow-[inset_0_0_10px_rgba(34,211,238,0.05)]">
                        <span className="text-xs text-cyan-200/60 uppercase mb-1 font-semibold">En platino</span>
                        <span className="text-xl font-heading text-cyan-100 font-bold">
                            {totals.pp.toLocaleString('es-ES', { maximumFractionDigits: 3 })} <span className="text-xs font-sans font-normal text-cyan-200/60">ppt</span>
                        </span>
                    </div>
                </div>

                <div className="flex justify-end border-t border-dungeon-700/30 pt-3">
                    <div className="text-right">
                        <span className="text-xs text-dungeon-400 uppercase tracking-wide mr-2">Peso de monedas:</span>
                        <span className="text-sm text-dungeon-200 font-mono">{totalWeight > 0 ? totalWeight.toLocaleString('es-ES', { maximumFractionDigits: 2 }) : '0'} lb.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
