export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header Skeleton */}
      <div className="border-l-4 border-gold-500 pl-6 mb-12 animate-pulse">
        <div className="h-12 bg-dungeon-700 rounded w-56 mb-3"></div>
        <div className="h-6 bg-dungeon-800 rounded w-96"></div>
      </div>

      {/* Player's Handbook Section */}
      <div className="mb-16">
        <div className="border-l-4 border-dungeon-500 pl-6 mb-8 animate-pulse">
          <div className="h-10 bg-dungeon-700 rounded w-64 mb-2"></div>
          <div className="h-4 bg-dungeon-800 rounded w-80"></div>
        </div>

        {/* Razas Comunes */}
        <div className="mb-12">
          <div className="mb-6 animate-pulse">
            <div className="h-7 bg-dungeon-700 rounded w-48 mb-2"></div>
            <div className="h-4 bg-dungeon-800 rounded w-72"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <RaceCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Razas Poco Comunes */}
        <div className="mb-12">
          <div className="mb-6 animate-pulse">
            <div className="h-7 bg-dungeon-700 rounded w-56 mb-2"></div>
            <div className="h-4 bg-dungeon-800 rounded w-64"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3].map((i) => (
              <RaceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Info Box Skeleton */}
      <div className="animate-pulse">
        <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
          <div className="h-4 bg-dungeon-700 rounded w-40 mb-3"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-dungeon-700 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RaceCardSkeleton() {
  return (
    <div className="bg-dungeon-800 border border-dungeon-700 rounded-lg overflow-hidden animate-pulse">
      <div className="p-4">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-dungeon-700 rounded"></div>
          <div className="h-6 bg-dungeon-700 rounded w-24"></div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-dungeon-700 rounded w-full"></div>
          <div className="h-3 bg-dungeon-700 rounded w-5/6"></div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          <div className="h-5 bg-dungeon-700 rounded w-16"></div>
          <div className="h-5 bg-dungeon-700 rounded w-12"></div>
        </div>

        {/* Button */}
        <div className="h-8 bg-dungeon-700 rounded w-full"></div>
      </div>
    </div>
  );
}
