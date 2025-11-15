export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header Skeleton */}
      <div className="border-l-4 border-gold-500 pl-6 mb-12 animate-pulse">
        <div className="h-12 bg-dungeon-700 rounded w-48 mb-3"></div>
        <div className="h-6 bg-dungeon-800 rounded w-64"></div>
      </div>

      {/* Clases Marciales */}
      <div className="mb-16">
        <div className="mb-6 animate-pulse">
          <div className="h-8 bg-dungeon-700 rounded w-56 mb-2"></div>
          <div className="h-4 bg-dungeon-800 rounded w-80"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <ClassCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Lanzadores de Conjuros */}
      <div className="mb-16">
        <div className="mb-6 animate-pulse">
          <div className="h-8 bg-dungeon-700 rounded w-56 mb-2"></div>
          <div className="h-4 bg-dungeon-800 rounded w-80"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <ClassCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Clases Versátiles */}
      <div className="mb-16">
        <div className="mb-6 animate-pulse">
          <div className="h-8 bg-dungeon-700 rounded w-48 mb-2"></div>
          <div className="h-4 bg-dungeon-800 rounded w-72"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2].map((i) => (
            <ClassCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ClassCardSkeleton() {
  return (
    <div className="bg-dungeon-800 border border-dungeon-700 rounded-lg overflow-hidden animate-pulse">
      <div className="p-6">
        {/* Icon */}
        <div className="w-12 h-12 bg-dungeon-700 rounded-full mb-4"></div>

        {/* Title */}
        <div className="h-7 bg-dungeon-700 rounded w-32 mb-3"></div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-dungeon-700 rounded w-full"></div>
          <div className="h-4 bg-dungeon-700 rounded w-5/6"></div>
          <div className="h-4 bg-dungeon-700 rounded w-4/6"></div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-dungeon-700 rounded w-16"></div>
          <div className="h-6 bg-dungeon-700 rounded w-20"></div>
          <div className="h-6 bg-dungeon-700 rounded w-16"></div>
        </div>

        {/* Button */}
        <div className="h-10 bg-dungeon-700 rounded w-full"></div>
      </div>
    </div>
  );
}
