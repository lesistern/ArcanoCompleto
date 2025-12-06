'use client';

import { useEffect, useRef } from 'react';

interface DicePreviewProps {
    theme: {
        dice_color: string;
        label_color: string;
        material?: {
            specular: number;
            shininess: number;
            shading: number;
        };
    };
}

export default function DicePreview({ theme }: DicePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<any>(null);
    const cameraRef = useRef<any>(null);
    const rendererRef = useRef<any>(null);
    const meshRef = useRef<any>(null);
    const animationIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined') return;

        // Wait for THREE to be available
        const initScene = () => {
            if (!window.THREE || !window.DICE) {
                setTimeout(initScene, 100);
                return;
            }

            const container = containerRef.current;
            if (!container) return;

            // Scene setup
            const scene = new window.THREE.Scene();
            sceneRef.current = scene;

            // Camera setup
            const width = container.clientWidth;
            const height = 128;
            const camera = new window.THREE.PerspectiveCamera(
                30,
                width / height, // Aspect ratio matches canvas
                1,
                1000
            );
            camera.position.set(0, 0, 200);
            cameraRef.current = camera;

            // Renderer setup - use full container width
            const renderer = new window.THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            renderer.setSize(width, height);
            renderer.setClearColor(0x000000, 0);
            renderer.domElement.style.display = 'block';
            container.appendChild(renderer.domElement);
            rendererRef.current = renderer;

            // Lighting
            const ambientLight = new window.THREE.AmbientLight(0xf0f0f0);
            scene.add(ambientLight);

            const spotLight = new window.THREE.SpotLight(0xefefef, 1.5);
            spotLight.position.set(-50, 50, 100);
            spotLight.target.position.set(0, 0, 0);
            scene.add(spotLight);

            // Ensure camera is looking at center
            camera.lookAt(0, 0, 0);

            // Animation loop
            const animate = () => {
                animationIdRef.current = requestAnimationFrame(animate);

                if (meshRef.current) {
                    meshRef.current.rotation.x += 0.00375;
                    meshRef.current.rotation.y += 0.0075;
                }

                renderer.render(scene, camera);
            };
            animate();
        };

        initScene();

        // Cleanup
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }
        };
    }, []);

    // Update mesh when theme changes (and initial render)
    useEffect(() => {
        updateMesh();
    }, [theme]);

    const updateMesh = () => {
        if (!window.DICE || !sceneRef.current) return;

        // Remove old mesh
        if (meshRef.current) {
            sceneRef.current.remove(meshRef.current);
        }

        // Create new mesh with current theme
        const mesh = window.DICE.get_preview_mesh('d20', {
            dice_color: theme.dice_color,
            label_color: theme.label_color,
            material_options: theme.material || {
                specular: 0x172022,
                shininess: 40,
                shading: 1
            }
        });

        // Ensure mesh is centered at origin
        mesh.position.set(0, 0, 0);

        sceneRef.current.add(mesh);
        meshRef.current = mesh;
    };

    return (
        <div className="flex justify-center items-center h-36 bg-dungeon-950/50 rounded-lg border border-dungeon-800 overflow-hidden">
            <div
                ref={containerRef}
                className="w-full h-32"
            />
        </div>
    );
}
