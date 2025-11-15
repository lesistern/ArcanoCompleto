export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Back Button Skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-10 bg-dungeon-700 rounded w-40"></div>
      </div>

      {/* Header Skeleton */}
      <div className="border-l-4 border-gold-500 pl-6 mb-12 animate-pulse">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-8 w-8 bg-dungeon-700 rounded"></div>
          <div className="h-12 bg-dungeon-700 rounded w-64"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-5 bg-dungeon-800 rounded w-full"></div>
          <div className="h-5 bg-dungeon-800 rounded w-5/6"></div>
          <div className="h-5 bg-dungeon-800 rounded w-4/6"></div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="h-8 bg-dungeon-700 rounded w-24"></div>
          <div className="h-8 bg-dungeon-700 rounded w-32"></div>
          <div className="h-8 bg-dungeon-700 rounded w-28"></div>
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Skills Card Skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="bg-dungeon-800 border border-dungeon-700 rounded-lg p-6">
          <div className="h-6 bg-dungeon-700 rounded w-48 mb-4"></div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-6 bg-dungeon-700 rounded w-20"></div>
            ))}
          </div>
          <div className="h-4 bg-dungeon-700 rounded w-64"></div>
        </div>
      </div>

      {/* Info Box Skeleton */}
      <div className="animate-pulse">
        <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
          <div className="h-4 bg-dungeon-700 rounded w-40 mb-3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-dungeon-700 rounded w-full"></div>
            <div className="h-4 bg-dungeon-700 rounded w-5/6"></div>
            <div className="h-4 bg-dungeon-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-dungeon-800 border border-dungeon-700 rounded-lg p-6 animate-pulse">
      <div className="h-5 bg-dungeon-700 rounded w-32 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-dungeon-700 rounded w-full"></div>
        <div className="h-4 bg-dungeon-700 rounded w-5/6"></div>
        <div className="h-4 bg-dungeon-700 rounded w-4/6"></div>
      </div>
    </div>
  );
}
