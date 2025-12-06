export default function LevelProgressionTable({ levelProgression }: { levelProgression: any[] }) {
    return (
        <table className="min-w-full text-xs md:text-sm text-left border border-dungeon-700">
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
                    <tr key={row.level} className="odd:bg-dungeon-900/40">
                        <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-100">{row.level}º</td>
                        <td className="px-3 py-2 border-b border-dungeon-800">{row.baseAttackBonus}</td>
                        <td className="px-3 py-2 border-b border-dungeon-800">+{row.fortitudeSave}</td>
                        <td className="px-3 py-2 border-b border-dungeon-800">+{row.reflexSave}</td>
                        <td className="px-3 py-2 border-b border-dungeon-800">+{row.willSave}</td>
                        <td className="px-3 py-2 border-b border-dungeon-800">
                            {Array.isArray(row.special) ? row.special.join(', ') : row.special || '-'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
