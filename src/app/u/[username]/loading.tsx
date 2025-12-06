import { pageContainerPadding } from '@/lib/utils/responsive-spacing';

export default function ProfileLoading() {
  return (
    <div className={`min-h-screen bg-dungeon-950 ${pageContainerPadding}`}>
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        {/* Header Navigation Skeleton */}
        <div className="flex items-center justify-end gap-3">
          <div className="w-32 h-10 bg-dungeon-800 rounded-md" />
          <div className="w-10 h-10 bg-dungeon-800 rounded-md" />
        </div>

        {/* Profile Header Skeleton */}
        <div className="relative">
          {/* Banner */}
          <div className="h-48 md:h-64 bg-dungeon-800 rounded-t-xl" />

          {/* Profile Card */}
          <div className="bg-dungeon-900 border border-dungeon-700 rounded-b-xl p-6 -mt-16 relative">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 bg-dungeon-700 rounded-full border-4 border-dungeon-900 -mt-20" />

              <div className="flex-1 space-y-4">
                {/* Name */}
                <div className="h-8 w-48 bg-dungeon-700 rounded" />
                {/* Username */}
                <div className="h-5 w-32 bg-dungeon-800 rounded" />
                {/* Bio */}
                <div className="h-4 w-full max-w-md bg-dungeon-800 rounded" />
                <div className="h-4 w-3/4 max-w-md bg-dungeon-800 rounded" />
              </div>

              {/* Stats */}
              <div className="flex flex-col items-end gap-2">
                <div className="h-6 w-24 bg-dungeon-700 rounded" />
                <div className="h-10 w-32 bg-dungeon-800 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-dungeon-900 border border-dungeon-700 rounded-xl p-4">
              <div className="h-4 w-20 bg-dungeon-700 rounded mb-2" />
              <div className="h-8 w-12 bg-dungeon-800 rounded" />
            </div>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="border-b border-dungeon-700">
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 w-24 bg-dungeon-800 rounded-t" />
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          {/* Section Title */}
          <div className="h-6 w-40 bg-dungeon-700 rounded" />

          {/* Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-dungeon-900 border border-dungeon-700 rounded-xl p-4 h-32" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
