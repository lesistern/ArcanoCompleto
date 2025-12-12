import { wealthTable } from '@/lib/data/classes-page-data';

export function WealthTable() {
    return (
        <>
            {/* Mobile View (Cards/List) */}
            <div className="block md:hidden space-y-4">
                {wealthTable.map((row) => (
                    <div key={row.level} className="bg-dungeon-900/40 border border-dungeon-800 rounded p-3 flex justify-between items-center text-sm">
                        <div className="flex flex-col">
                            <span className="font-bold text-dungeon-100 text-lg">Nivel {row.level}</span>
                        </div>
                        <div className="flex flex-col text-right gap-1">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-dungeon-500 font-bold">Personaje</span>
                                <span className="text-gold-400 font-mono">{row.pc}</span>
                            </div>
                            <div className="flex flex-col mt-1">
                                <span className="text-[10px] uppercase text-dungeon-500 font-bold">NPC</span>
                                <span className="text-dungeon-300 font-mono">{row.npc}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-sm text-left border border-dungeon-700">
                    <thead className="bg-dungeon-900 text-dungeon-100">
                        <tr>
                            <th className="px-3 py-2 border-b border-dungeon-700">Nivel</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">Personaje jugable</th>
                            <th className="px-3 py-2 border-b border-dungeon-700">NPC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wealthTable.map((row) => (
                            <tr key={row.level} className="odd:bg-dungeon-900/40 hover:bg-dungeon-800/30 transition-colors">
                                <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-100 font-bold">{row.level}º</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-gold-400/90 font-mono">{row.pc}</td>
                                <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-300 font-mono">{row.npc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
