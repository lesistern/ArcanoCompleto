export default function LevelProgressionTable({ levelProgression }: { levelProgression: any[] }) {
    return (
        <div>
            {/* Mobile View */}
            <div className="block md:hidden space-y-3">
                {levelProgression.map((row) => (
                    <div key={row.level} className="bg-dungeon-950/30 border border-dungeon-800 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-dungeon-800/50">
                            <span className="font-bold text-dungeon-100 text-lg">Nivel {row.level}º</span>
                            <div className="text-right">
                                <span className="text-[10px] uppercase text-dungeon-500 font-bold mr-1">BAB:</span>
                                <span className="text-gold-400 font-mono font-bold">{row.baseAttackBonus}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center mb-3">
                            <div className="bg-dungeon-900/50 rounded p-1 border border-dungeon-800/30">
                                <span className="block text-[10px] uppercase text-dungeon-500 font-bold">Fort</span>
                                <span className="text-red-300 font-mono">+{row.fortitudeSave}</span>
                            </div>
                            <div className="bg-dungeon-900/50 rounded p-1 border border-dungeon-800/30">
                                <span className="block text-[10px] uppercase text-dungeon-500 font-bold">Ref</span>
                                <span className="text-green-300 font-mono">+{row.reflexSave}</span>
                            </div>
                            <div className="bg-dungeon-900/50 rounded p-1 border border-dungeon-800/30">
                                <span className="block text-[10px] uppercase text-dungeon-500 font-bold">Vol</span>
                                <span className="text-blue-300 font-mono">+{row.willSave}</span>
                            </div>
                        </div>

                        {row.special && (
                            <div className="text-sm text-dungeon-200">
                                <span className="text-xs text-dungeon-500 uppercase font-bold mr-1">Especial:</span>
                                {Array.isArray(row.special) ? row.special.join(', ') : row.special}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-dungeon-700">
                <table className="min-w-full text-xs md:text-sm text-left">
                    <thead className="bg-dungeon-900 text-dungeon-100">
                        <tr>
                            <th className="px-3 py-2 border-b border-dungeon-700">Nivel</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">BAB</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Fort</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Ref</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Vol</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Especial</th>
                        </tr>
                    </thead>
                    <tbody>
                        {levelProgression.map((row) => (
                            <tr key={row.level} className="odd:bg-dungeon-900/40 hover:bg-dungeon-800/30 transition-colors">
                                <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-100 font-bold">{row.level}º</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 font-mono text-gold-400">{row.baseAttackBonus}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 font-mono">+{row.fortitudeSave}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 font-mono">+{row.reflexSave}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 font-mono">+{row.willSave}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-300">
                                    {Array.isArray(row.special) ? row.special.join(', ') : row.special || '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
