'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Unlock, Pin, PinOff, Loader2 } from 'lucide-react';

interface ThreadModerationActionsProps {
  threadId: string;
  initialLocked: boolean;
  initialPinned: boolean;
  canModerate: boolean;
}

export default function ThreadModerationActions({
  threadId,
  initialLocked,
  initialPinned,
  canModerate,
}: ThreadModerationActionsProps) {
  const router = useRouter();
  const supabase = createClient();
  const [locked, setLocked] = useState(initialLocked);
  const [pinned, setPinned] = useState(initialPinned);
  const [loading, setLoading] = useState(false);

  if (!canModerate) return null;

  const toggleLocked = async () => {
    setLoading(true);
    const { error } = await supabase.from('forum_threads').update({ locked: !locked }).eq('id', threadId);
    setLoading(false);
    if (!error) {
      setLocked(!locked);
      router.refresh();
    }
  };

  const togglePinned = async () => {
    setLoading(true);
    const { error } = await supabase.from('forum_threads').update({ pinned: !pinned }).eq('id', threadId);
    setLoading(false);
    if (!error) {
      setPinned(!pinned);
      router.refresh();
    }
  };

  return (
    <div className="flex gap-2 text-sm text-dungeon-300">
      <button
        type="button"
        onClick={togglePinned}
        disabled={loading}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-dungeon-700 hover:bg-dungeon-800 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
        {pinned ? 'Desfijar' : 'Fijar'}
      </button>
      <button
        type="button"
        onClick={toggleLocked}
        disabled={loading}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-dungeon-700 hover:bg-dungeon-800 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : locked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
        {locked ? 'Desbloquear' : 'Bloquear'}
      </button>
    </div>
  );
}
