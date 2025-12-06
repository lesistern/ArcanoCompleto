'use client';

interface ReputationBadgeProps {
  trustLevel?: string;
  reputation?: number | null;
}

export default function ReputationBadge({ trustLevel, reputation }: ReputationBadgeProps) {
  if (!trustLevel && reputation == null) return null;

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-dungeon-800 border border-dungeon-700 text-xs text-dungeon-200">
      {trustLevel && <span className="font-semibold">{trustLevel}</span>}
      {reputation != null && <span className="text-dungeon-400">{reputation} RP</span>}
    </span>
  );
}
