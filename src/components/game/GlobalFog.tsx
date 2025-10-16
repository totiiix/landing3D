import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VolumetricCloudFog } from './VolumetricCloudFog';

export const GlobalFog = () => {
  const fogRef = useRef<THREE.Fog>(null);

  // Animation subtile de la densité du brouillard
  useFrame(({ clock }) => {
    if (fogRef.current) {
      // Légère variation de la densité du brouillard
      const baseFar = 35;
      const variation = Math.sin(clock.getElapsedTime() * 0.2) * 2;
      fogRef.current.far = baseFar + variation;
    }
  });

  return (
    <>
      {/* Fog Three.js natif pour l'effet de brouillard à distance */}
      <fog ref={fogRef} attach="fog" args={['#d0d0d0', 15, 40]} />

      {/* Couches de brouillard volumétrique 3D (particules) - Au niveau du sol */}
      <group>
        {/* Sphère de brouillard au début des rails (où le train apparaît) */}
        <VolumetricCloudFog
          particleCount={600}
          spread={[22, 10, 22]}
          center={[-80, 1.5, -45]}
          color="#9e9e9e"
          opacity={0.32}
          size={15}
        />

        {/* Sphère de brouillard à l'opposé des rails (fond Sud-Est) */}
        <VolumetricCloudFog
          particleCount={550}
          spread={[24, 11, 24]}
          center={[35, 1.8, 30]}
          color="#9c9c9c"
          opacity={0.30}
          size={14}
        />

        {/* Sphère de brouillard intermédiaire Nord-Est */}
        <VolumetricCloudFog
          particleCount={450}
          spread={[20, 9, 20]}
          center={[30, 1.2, -30]}
          color="#9a9a9a"
          opacity={0.28}
          size={13}
        />

        {/* Couche Nord - Plus basse et moins haute */}
        <VolumetricCloudFog
          particleCount={700}
          spread={[70, 3, 18]}
          center={[0, 0.4, -24]}
          color="#9a9a9a"
          opacity={0.28}
          size={10}
        />

        {/* Couche Sud - Plus basse */}
        <VolumetricCloudFog
          particleCount={700}
          spread={[70, 3, 18]}
          center={[0, 0.4, 24]}
          color="#9a9a9a"
          opacity={0.28}
          size={10}
        />

        {/* Couche Est - Plus basse */}
        <VolumetricCloudFog
          particleCount={650}
          spread={[18, 3, 70]}
          center={[24, 0.4, 0]}
          color="#9e9e9e"
          opacity={0.26}
          size={9.5}
        />

        {/* Couche Ouest - Plus basse */}
        <VolumetricCloudFog
          particleCount={650}
          spread={[18, 3, 70]}
          center={[-24, 0.4, 0]}
          color="#9e9e9e"
          opacity={0.26}
          size={9.5}
        />

        {/* Petites sphères organiques dispersées */}
        <VolumetricCloudFog
          particleCount={300}
          spread={[12, 6, 12]}
          center={[-25, 0.8, -18]}
          color="#a0a0a0"
          opacity={0.22}
          size={9}
        />

        <VolumetricCloudFog
          particleCount={280}
          spread={[14, 7, 14]}
          center={[20, 1.0, -22]}
          color="#9c9c9c"
          opacity={0.24}
          size={9.5}
        />

        <VolumetricCloudFog
          particleCount={320}
          spread={[13, 6, 13]}
          center={[-18, 0.9, 25]}
          color="#a0a0a0"
          opacity={0.20}
          size={8.5}
        />

        <VolumetricCloudFog
          particleCount={290}
          spread={[11, 5, 11]}
          center={[28, 0.7, 20]}
          color="#9e9e9e"
          opacity={0.26}
          size={9}
        />

        {/* Brume très légère centrale sur la grille - Encore plus basse */}
        <VolumetricCloudFog
          particleCount={150}
          spread={[45, 1.5, 45]}
          center={[0, 0.3, 0]}
          color="#bcbcbc"
          opacity={0.03}
          size={7}
        />

        {/* Sphères organiques profondes - Nord */}
        <VolumetricCloudFog
          particleCount={350}
          spread={[15, 8, 15]}
          center={[-15, 1.2, -32]}
          color="#888888"
          opacity={0.35}
          size={10}
        />

        <VolumetricCloudFog
          particleCount={320}
          spread={[13, 7, 13]}
          center={[12, 0.8, -35]}
          color="#8c8c8c"
          opacity={0.32}
          size={9.5}
        />

        <VolumetricCloudFog
          particleCount={280}
          spread={[12, 6, 12]}
          center={[-5, 1.0, -29]}
          color="#909090"
          opacity={0.28}
          size={9}
        />

        {/* Sphères organiques profondes - Sud */}
        <VolumetricCloudFog
          particleCount={360}
          spread={[16, 8, 16]}
          center={[10, 1.3, 33]}
          color="#888888"
          opacity={0.34}
          size={10.5}
        />

        <VolumetricCloudFog
          particleCount={310}
          spread={[14, 7, 14]}
          center={[-15, 0.9, 31]}
          color="#8c8c8c"
          opacity={0.30}
          size={9}
        />

        <VolumetricCloudFog
          particleCount={290}
          spread={[13, 6, 13]}
          center={[5, 1.1, 28]}
          color="#8e8e8e"
          opacity={0.28}
          size={9.5}
        />

        {/* Sphères organiques profondes - Est */}
        <VolumetricCloudFog
          particleCount={340}
          spread={[14, 8, 14]}
          center={[32, 1.1, -10]}
          color="#8a8a8a"
          opacity={0.33}
          size={10}
        />

        <VolumetricCloudFog
          particleCount={300}
          spread={[12, 7, 12]}
          center={[35, 0.8, 8]}
          color="#8e8e8e"
          opacity={0.30}
          size={9}
        />

        <VolumetricCloudFog
          particleCount={280}
          spread={[13, 6, 13]}
          center={[30, 1.2, 2]}
          color="#929292"
          opacity={0.28}
          size={9.5}
        />

        {/* Sphères organiques profondes - Ouest */}
        <VolumetricCloudFog
          particleCount={350}
          spread={[13, 8, 13]}
          center={[-32, 1.0, 10]}
          color="#8a8a8a"
          opacity={0.32}
          size={10}
        />

        <VolumetricCloudFog
          particleCount={310}
          spread={[12, 7, 12]}
          center={[-35, 0.9, -8]}
          color="#8e8e8e"
          opacity={0.29}
          size={9.5}
        />

        <VolumetricCloudFog
          particleCount={270}
          spread={[14, 6, 14]}
          center={[-28, 1.3, -2]}
          color="#929292"
          opacity={0.27}
          size={9}
        />

        {/* Petites sphères dispersées intermédiaires */}
        <VolumetricCloudFog
          particleCount={180}
          spread={[10, 5, 10]}
          center={[-22, 0.8, -15]}
          color="#9c9c9c"
          opacity={0.18}
          size={8}
        />

        <VolumetricCloudFog
          particleCount={170}
          spread={[11, 5, 11]}
          center={[18, 0.6, -20]}
          color="#a0a0a0"
          opacity={0.16}
          size={8}
        />

        <VolumetricCloudFog
          particleCount={190}
          spread={[9, 4, 9]}
          center={[-20, 0.7, 22]}
          color="#9e9e9e"
          opacity={0.15}
          size={7.5}
        />

        <VolumetricCloudFog
          particleCount={175}
          spread={[10, 5, 10]}
          center={[22, 0.9, 18]}
          color="#a0a0a0"
          opacity={0.17}
          size={8}
        />
      </group>
    </>
  );
};
