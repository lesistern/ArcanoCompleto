'use client';

/**
 * Wrapper para ChatButton con lazy loading
 * Necesario porque dynamic() con ssr:false no puede usarse en Server Components
 */

import dynamic from 'next/dynamic';

const ChatButton = dynamic(() => import('./ChatButton'), {
  ssr: false,
});

export default function ChatButtonWrapper() {
  return <ChatButton />;
}
