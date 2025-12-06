'use client';

import dynamic from 'next/dynamic';

/**
 * Floating button group component
 *
 * Agrupa los botones de donación y feedback juntos en la esquina inferior derecha
 * Con donación arriba y feedback abajo
 */

const DiceLauncher = dynamic(() => import('@/components/dice/DiceLauncher'));
const DonationButton = dynamic(() => import('@/components/DonationButton'));
const FeedbackButton = dynamic(() => import('@/components/FeedbackButton'));

export default function FloatingButtonGroup() {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-4">
      {/* Donation button - Arriba */}
      <DonationButton />

      {/* Feedback button - Medio */}
      <FeedbackButton />

      {/* Dice Launcher - Abajo de todo */}
      <DiceLauncher />
    </div>
  );
}