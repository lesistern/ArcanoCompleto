'use client';

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'left' | 'right' | 'up' | 'down';
    className?: string;
}

export default function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    className = '',
}: ScrollRevealProps) {
    const { ref, isVisible } = useScrollReveal();

    const directionClasses = {
        left: 'translate-x-[-50px]',
        right: 'translate-x-[50px]',
        up: 'translate-y-[50px]',
        down: 'translate-y-[-50px]',
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-300 ease-out ${isVisible
                    ? 'opacity-100 translate-x-0 translate-y-0'
                    : `opacity-0 ${directionClasses[direction]}`
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
