import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingCrystalProps {
  position?: [number, number, number];
  type?: 'blue' | 'green' | 'red' | 'gold';
}

export const FloatingCrystal = ({
  position = [0, 0, 0],
  type = 'blue'
}: FloatingCrystalProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  // Configuration des couleurs selon le type
  const config = useMemo(() => {
    const configs = {
      blue: {
        crystal: '#4da6ff',
        glow: '#6bc4ff',
        particles: '#a3d9ff',
        halo: '#4da6ff',
        emissive: '#2e7acc'
      },
      green: {
        crystal: '#4dff88',
        glow: '#6bffa3',
        particles: '#a3ffc4',
        halo: '#4dff88',
        emissive: '#2ecc5e'
      },
      red: {
        crystal: '#ff4d4d',
        glow: '#ff6b6b',
        particles: '#ffa3a3',
        halo: '#ff4d4d',
        emissive: '#cc2e2e'
      },
      gold: {
        crystal: '#ffd700',
        glow: '#ffed4e',
        particles: '#fff5a3',
        halo: '#ffd700',
        emissive: '#cc9f00'
      }
    };
    return configs[type];
  }, [type]);

  // Créer les particules orbitales
  const particleCount = 20;
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Position initiale en spirale autour du cristal
      const angle = (Math.PI * 2 * i) / particleCount;
      const radius = 0.6 + Math.random() * 0.3;
      const height = (Math.random() - 0.5) * 1.5;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Vélocité pour l'orbite
      velocities[i3] = angle;
      velocities[i3 + 1] = radius;
      velocities[i3 + 2] = Math.random() * 0.5 + 0.5; // vitesse d'orbite
    }

    return { positions, velocities };
  }, []);

  // Animation
  useFrame((_, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      // Lévitation (bobbing)
      const floatY = Math.sin(timeRef.current * 1.5) * 0.15;
      groupRef.current.position.y = position[1] + 0.8 + floatY;
    }

    if (crystalRef.current) {
      // Rotation du cristal
      crystalRef.current.rotation.y += delta * 0.5;
      crystalRef.current.rotation.x = Math.sin(timeRef.current * 0.5) * 0.1;
    }

    if (particlesRef.current) {
      // Animation des particules en spirale montante
      const positionAttribute = particlesRef.current.geometry.attributes.position;
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Orbite circulaire
        const baseAngle = velocities[i3];
        const radius = velocities[i3 + 1];
        const speed = velocities[i3 + 2];
        const angle = baseAngle + timeRef.current * speed;

        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 2] = Math.sin(angle) * radius;

        // Mouvement vertical en spirale
        positions[i3 + 1] += delta * 0.5;

        // Reset si trop haut
        if (positions[i3 + 1] > 1.2) {
          positions[i3 + 1] = -0.8;
        }
      }

      positionAttribute.needsUpdate = true;
    }

    if (haloRef.current) {
      // Pulsation du halo
      const pulse = 0.8 + Math.sin(timeRef.current * 2) * 0.2;
      haloRef.current.scale.setScalar(pulse);

      // Rotation lente du halo
      haloRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Halo lumineux au sol */}
      <mesh
        ref={haloRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.79, 0]}
      >
        <ringGeometry args={[0.3, 0.6, 32]} />
        <meshBasicMaterial
          color={config.halo}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cristal principal - Style Étoile 3D (Design 6) */}
      <group ref={crystalRef}>
        {/* Centre brillant */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial
            color={config.glow}
            emissive={config.glow}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>

        {/* 6 pointes de l'étoile 3D */}
        {[
          [0.3, 0, 0],
          [-0.3, 0, 0],
          [0, 0.3, 0],
          [0, -0.3, 0],
          [0, 0, 0.3],
          [0, 0, -0.3],
        ].map(([x, y, z], i) => (
          <group key={i}>
            {/* Cube intermédiaire */}
            <mesh position={[x * 0.5, y * 0.5, z * 0.5]}>
              <boxGeometry args={[0.12, 0.12, 0.12]} />
              <meshStandardMaterial
                color={config.crystal}
                emissive={config.crystal}
                emissiveIntensity={0.8}
              />
            </mesh>
            {/* Pointe externe */}
            <mesh position={[x, y, z]}>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshStandardMaterial
                color={config.crystal}
                emissive={config.crystal}
                emissiveIntensity={0.6}
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>
        ))}

        {/* Lueur externe (glow) */}
        <pointLight
          position={[0, 0, 0]}
          color={config.glow}
          intensity={2.5}
          distance={4}
          decay={2}
        />
      </group>

      {/* Particules orbitales */}
      <points ref={particlesRef}>
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
          color={config.particles}
          transparent
          opacity={0.8}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Particules supplémentaires - Étincelles qui montent */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={10}
            array={new Float32Array(Array.from({ length: 30 }, (_, i) => {
              const angle = (Math.PI * 2 * Math.floor(i / 3)) / 10;
              const radius = 0.2;
              return [
                Math.cos(angle) * radius,
                (i % 3) * 0.3,
                Math.sin(angle) * radius
              ];
            }).flat())}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={config.glow}
          transparent
          opacity={0.6}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
