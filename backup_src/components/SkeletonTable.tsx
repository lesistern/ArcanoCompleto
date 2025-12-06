export default function SkeletonTable() {
    return (
        <div className="animate-pulse">
            <div className="min-w-full border border-dungeon-700 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-dungeon-900 p-3 border-b border-dungeon-700">
                    <div className="grid grid-cols-6 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-4 bg-dungeon-700 rounded"></div>
                        ))}
                    </div>
                </div>
                {/* Rows */}
                {[...Array(5)].map((_, rowIndex) => (
                    <div key={rowIndex} className="p-3 border-b border-dungeon-800">
                        <div className="grid grid-cols-6 gap-4">
                            {[...Array(6)].map((_, colIndex) => (
                                <div key={colIndex} className="h-3 bg-dungeon-800 rounded"></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
