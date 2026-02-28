"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useScroll } from "framer-motion";
import * as THREE from "three";

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;
    p.x *= uResolution.x / uResolution.y;
    
    // Slow fluid motion
    float t = uTime * 0.1;
    
    // Multi-layered noise-like gradients
    float noise1 = sin(p.x * 2.5 + t) * cos(p.y * 2.0 - t * 0.4);
    float noise2 = cos(p.x * 1.8 - t * 0.6) * sin(p.y * 3.0 + t * 0.2);
    
    vec3 color1 = vec3(0.015, 0.02, 0.05); // Deeper Navy
    vec3 color2 = vec3(0.2, 0.15, 0.8);  // Primary Accent
    vec3 color3 = vec3(0.8, 0.1, 0.5);   // Secondary Accent
    
    float mixFactor = (noise1 + noise2 + 1.0) * 0.35; // lowered intensity
    vec3 finalColor = mix(color1, mix(color2, color3, noise2), mixFactor * 0.2);
    
    // Interactive Spotlight
    float dist = distance(vUv, uMouse);
    float spotlight = smoothstep(0.7, 0.0, dist);
    finalColor += color2 * spotlight * 0.06;

    gl_FragColor = vec4(finalColor, 0.85);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function FluidBackground() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { scrollYProgress } = useScroll();
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }), []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const { clock, mouse } = state;
        uniforms.uTime.value = clock.getElapsedTime();
        uniforms.uMouse.value.x = (mouse.x + 1) / 2;
        uniforms.uMouse.value.y = (mouse.y + 1) / 2;

        // Depth collapse logic: move background away
        const progress = scrollYProgress.get();
        meshRef.current.position.z = -progress * 4;
        meshRef.current.scale.set(1 + progress, 1 + progress, 1);
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[20, 20]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                depthWrite={false}
            />
        </mesh>
    );
}

function FloatingParticles() {
    const pointsRef = useRef<THREE.Points>(null);
    const { scrollYProgress } = useScroll();
    const count = 250;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame(() => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y += 0.0005;
        pointsRef.current.rotation.x += 0.0003;

        // Zoom out on scroll
        const progress = scrollYProgress.get();
        pointsRef.current.position.z = -progress * 8;
        if (pointsRef.current.material) {
            (pointsRef.current.material as THREE.Material).opacity = 0.1 * (1 - progress);
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.1}
            />
        </Points>
    );
}

export default function HeroVisuals() {
    return (
        <div className="absolute inset-0 -z-20 w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 1.5], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <FluidBackground />
                <FloatingParticles />
            </Canvas>
        </div>
    );
}
