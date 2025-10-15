import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WalkDustTrailProps {
  position: [number, number, number];
  isActive: boolean;
}

export const WalkDustTrail = ({ position, isActive }: WalkDustTrailProps) => {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 8;
  const maxLifetime = 0.4; // seconds - shorter for trail effect

  // Create particles
  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const lifetimes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Start at center with slight random spread
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.1;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = 0.02 + Math.random() * 0.05;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Velocities - spread outward and slightly up
      velocities[i3] = Math.cos(angle) * (0.2 + Math.random() * 0.2);
      velocities[i3 + 1] = 0.1 + Math.random() * 0.2; // upward
      velocities[i3 + 2] = Math.sin(angle) * (0.2 + Math.random() * 0.2);

      lifetimes[i] = Math.random() * 0.1; // Stagger start times
    }

    return { positions, velocities, lifetimes };
  }, []);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!particlesRef.current || !isActive) {
      timeRef.current = 0;
      return;
    }

    timeRef.current += delta;

    const positionAttribute = particlesRef.current.geometry.attributes.position;
    const positions = positionAttribute.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const particleTime = timeRef.current - lifetimes[i];

      if (particleTime > 0 && particleTime < maxLifetime) {
        // Update position based on velocity
        positions[i3] += velocities[i3] * delta;
        positions[i3 + 1] += velocities[i3 + 1] * delta;
        positions[i3 + 2] += velocities[i3 + 2] * delta;

        // Apply gravity
        velocities[i3 + 1] -= 1.5 * delta;

        // Stop at ground level
        if (positions[i3 + 1] < 0.02) {
          positions[i3 + 1] = 0.02;
          velocities[i3] *= 0.7; // Friction
          velocities[i3 + 2] *= 0.7;
        }
      }
    }

    positionAttribute.needsUpdate = true;

    // Update opacity
    const material = particlesRef.current.material as THREE.PointsMaterial;
    const opacity = Math.max(0, 1 - timeRef.current / maxLifetime);
    material.opacity = opacity * 0.5; // More subtle than landing dust
  });

  if (!isActive) return null;

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#D2B48C"
        transparent
        opacity={0.5}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};
