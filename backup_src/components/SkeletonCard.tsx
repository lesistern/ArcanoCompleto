export default function SkeletonCard() {
    return (
        <div className="bg-dungeon-900/40 border border-dungeon-700 rounded-lg p-4 animate-pulse">
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                    <div className="h-5 bg-dungeon-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-dungeon-700 rounded w-1/4"></div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-dungeon-700 rounded w-full"></div>
                <div className="h-3 bg-dungeon-700 rounded w-5/6"></div>
            </div>
        </div>
    );
}
