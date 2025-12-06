'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface CompendiumEntry {
  slug: string;
  name: string;
  type?: string;
}

export default function ContentWithTooltips({ content }: { content: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, CompendiumEntry | null>>({});

  useEffect(() => {
    if (!hovered) return;
    if (data[hovered] !== undefined) return;
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(hovered)}`, { signal: controller.signal });
        if (!res.ok) return;
        const json = await res.json();
        const entry = (json.compendium || []).find((c: any) => c.slug === hovered || c.name?.toLowerCase() === hovered.toLowerCase()) || null;
        setData((prev) => ({ ...prev, [hovered]: entry }));
      } catch {
        setData((prev) => ({ ...prev, [hovered]: null }));
      }
    })();
    return () => controller.abort();
  }, [hovered, data]);

  const parts = content.split(/(\[\[[^\]]+\]\])/g);

  return (
    <div className="prose prose-invert max-w-none">
      {parts.map((part, idx) => {
        const match = part.match(/^\[\[([^\]]+)\]\]$/);
        if (!match) {
          return (
            <span key={idx} className="whitespace-pre-wrap">
              {part}
            </span>
          );
        }
        const slug = match[1].trim();
        const entry = data[slug];
        return (
          <span
            key={idx}
            className="relative font-semibold text-gold-400 hover:text-gold-300 cursor-pointer"
            onMouseEnter={() => setHovered(slug)}
            onFocus={() => setHovered(slug)}
          >
            <Link href={`/search?q=${encodeURIComponent(slug)}`}>[{slug}]</Link>
            {entry && (
              <span className="absolute z-10 mt-1 left-0 bg-dungeon-900 border border-dungeon-700 rounded-lg px-3 py-2 text-xs text-dungeon-200 shadow-lg">
                <div className="font-bold">{entry.name}</div>
                {entry.type && <div className="text-dungeon-400">{entry.type}</div>}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
