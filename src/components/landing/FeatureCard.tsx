'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useRef } from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    iconPath: string;
    href: string;
    color: string;
}

export default function FeatureCard({ title, description, iconPath, href, color }: FeatureCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <Link href={href} className="block">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-96 w-full rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 flex flex-col items-center justify-center text-center group cursor-pointer backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--glow-color),0.3)]"
            >
                <div
                    style={{
                        transform: "translateZ(75px)",
                        transformStyle: "preserve-3d",
                        // @ts-expect-error - Custom CSS variable
                        "--glow-color": color
                    }}
                    className="relative w-32 h-32 mb-6"
                >
                    <div className="absolute inset-0 bg-[var(--glow-color)] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                    <Image
                        src={iconPath}
                        alt={title}
                        fill
                        className="object-contain drop-shadow-2xl"
                    />
                </div>

                <motion.h3
                    style={{ transform: "translateZ(50px)" }}
                    className="text-2xl font-bold text-white mb-2 font-heading group-hover:text-[var(--color-legendary-gold)] transition-colors"
                >
                    {title}
                </motion.h3>

                <motion.p
                    style={{ transform: "translateZ(25px)" }}
                    className="text-gray-400 group-hover:text-gray-200 transition-colors"
                >
                    {description}
                </motion.p>

                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
        </Link>
    );
}
