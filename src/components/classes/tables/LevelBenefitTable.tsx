import { levelBenefitTable } from '@/lib/data/classes-page-data';

export function LevelBenefitTable() {
    return (
        <>
            {/* Mobile View (Detailed List) */}
            <div className="block md:hidden space-y-4">
                {levelBenefitTable.map((row) => (
                    <div key={row.level} className="bg-dungeon-900/40 border border-dungeon-800 rounded-lg p-3 text-sm relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-4xl font-bold text-dungeon-100">
                            {row.level}
                        </div>

                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <span className="font-bold text-dungeon-100 text-lg block">Nivel {row.level}</span>
                                <span className="text-xs text-gold-500 font-mono">XP Total: {row.xp}</span>
                            </div>
                            {row.abilityIncrease !== '-' && (
                                <span className="bg-purple-900/40 border border-purple-500/30 text-purple-200 text-xs px-2 py-1 rounded">
                                    +1 Característica
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-2">
                            <div className="bg-dungeon-950/30 p-2 rounded border border-dungeon-800/50">
                                <span className="block text-[10px] uppercase text-dungeon-500 font-bold mb-1">Rangos Máx (Clase)</span>
                                <span className="text-dungeon-200 font-mono text-base">{row.classSkillMax}</span>
                            </div>
                            <div className="bg-dungeon-950/30 p-2 rounded border border-dungeon-800/50">
                                <span className="block text-[10px] uppercase text-dungeon-500 font-bold mb-1">Rangos Máx (Cruzada)</span>
                                <span className="text-dungeon-400 font-mono text-base">{row.crossClassMax}</span>
                            </div>
                        </div>

                        {row.feats !== '-' && (
                            <div className="mt-2 text-center bg-gold-900/10 border border-gold-500/20 rounded py-1">
                                <span className="text-xs text-gold-400 font-semibold uppercase">✨ Nueva Dote Disponible</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-xs md:text-sm text-left border border-dungeon-700">
                    <thead className="bg-dungeon-900 text-dungeon-100">
                        <tr>
                            <th className="px-3 py-2 border-b border-dungeon-700">Nivel</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">XP total</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Rangos máx. (clase)</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Rangos máx. (cruzada)</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Dotes</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Mejora de característica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {levelBenefitTable.map((row) => (
                            <tr key={row.level} className="odd:bg-dungeon-900/40 hover:bg-dungeon-800/30 transition-colors">
                                <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-100 {row.level % 5 === 0 ? 'font-bold text-gold-400' : ''}">{row.level}º</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 font-mono text-dungeon-300">{row.xp}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-center">{row.classSkillMax}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-center text-dungeon-500">{row.crossClassMax}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-center">
                                    {row.feats !== '-' && <span className="text-gold-400 font-bold">✓</span>}
                                    {row.feats === '-' && <span className="text-dungeon-700">-</span>}
                                </td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-center">
                                    {row.abilityIncrease !== '-' && <span className="text-purple-400 font-bold">+1</span>}
                                    {row.abilityIncrease === '-' && <span className="text-dungeon-700">-</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
