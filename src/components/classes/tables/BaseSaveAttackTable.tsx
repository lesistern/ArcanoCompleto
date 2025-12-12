import { baseSaveAttackTable } from '@/lib/data/classes-page-data';

export function BaseSaveAttackTable() {
    return (
        <>
            {/* Mobile View (Condensed Cards) */}
            <div className="block md:hidden space-y-3">
                {baseSaveAttackTable.map((row) => (
                    <div key={row.level} className="bg-dungeon-900/40 border border-dungeon-800 rounded-lg p-3 text-sm">
                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-dungeon-800/50">
                            <span className="font-bold text-dungeon-100 text-base">Nivel {row.level}</span>
                            <div className="text-right">
                                <span className="text-[10px] text-dungeon-500 uppercase font-bold mr-2">Salvaciones (Buena / Pobre)</span>
                                <span className="text-blue-300 font-mono">{row.goodSave}</span> <span className="text-dungeon-600">/</span> <span className="text-dungeon-400 font-mono">{row.poorSave}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-dungeon-950/30 rounded p-1">
                                <span className="block text-[10px] uppercase text-dungeon-500 font-bold mb-0.5">Ataque Bueno</span>
                                <span className="text-green-400 font-mono">{row.goodBab}</span>
                            </div>
                            <div className="bg-dungeon-950/30 rounded p-1">
                                <span className="block text-[10px] uppercase text-dungeon-500 font-bold mb-0.5">Ataque Medio</span>
                                <span className="text-yellow-400/80 font-mono">{row.averageBab}</span>
                            </div>
                            <div className="bg-dungeon-950/30 rounded p-1">
                                <span className="block text-[10px] uppercase text-dungeon-500 font-bold mb-0.5">Ataque Pobre</span>
                                <span className="text-red-400/80 font-mono">{row.poorBab}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View (Full Table) */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-xs md:text-sm text-left border border-dungeon-700">
                    <thead className="bg-dungeon-900 text-dungeon-100">
                        <tr>
                            <th className="px-3 py-2 border-b border-dungeon-700">Nivel</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Salvación buena</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Salvación pobre</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Ataque bueno</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Ataque medio</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Ataque pobre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {baseSaveAttackTable.map((row) => (
                            <tr key={row.level} className="odd:bg-dungeon-900/40 hover:bg-dungeon-800/30 transition-colors">
                                <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-100 font-bold">{row.level}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-blue-300 font-mono">{row.goodSave}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-400 font-mono">{row.poorSave}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-green-400 font-mono">{row.goodBab}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-yellow-400/80 font-mono">{row.averageBab}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-red-400/80 font-mono">{row.poorBab}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
