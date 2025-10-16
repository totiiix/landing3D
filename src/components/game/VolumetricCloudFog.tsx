import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VolumetricCloudFogProps {
  particleCount?: number;
  spread?: [number, number, number];
  center?: [number, number, number];
  color?: string;
  opacity?: number;
  size?: number;
}

export const VolumetricCloudFog = ({
  particleCount = 300,
  spread = [40, 6, 40],
  center = [0, 2, 0],
  color = '#dce6ef',
  opacity = 0.4,
  size = 3
}: VolumetricCloudFogProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Créer les particules dans un volume 3D
  const { positions, velocities, phases } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Position aléatoire dans le volume
      positions[i3] = (Math.random() - 0.5) * spread[0];
      positions[i3 + 1] = Math.random() * spread[1];
      positions[i3 + 2] = (Math.random() - 0.5) * spread[2];

      // Vélocité aléatoire lente pour mouvement naturel
      velocities[i3] = (Math.random() - 0.5) * 0.15;
      velocities[i3 + 1] = Math.random() * 0.08;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.15;

      // Phase aléatoire pour variation d'opacité
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, velocities, phases };
  }, [particleCount, spread]);

  // Shader personnalisé pour les particules de brouillard avec meilleur blur
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        fogColor: { value: new THREE.Color(color) },
        baseOpacity: { value: opacity }
      },
      vertexShader: `
        uniform float time;
        attribute float phase;
        varying float vOpacity;
        varying float vPhase;

        void main() {
          vec3 pos = position;

          // Animation ondulante pour effet naturel
          float wave = sin(time * 0.5 + phase) * 0.3;
          pos.y += wave;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Taille basée sur la distance (perspective) - plus large pour fusion
          gl_PointSize = ${size.toFixed(1)} * (300.0 / -mvPosition.z);

          // Variation d'opacité basée sur la phase
          vOpacity = (sin(time * 0.3 + phase) * 0.3 + 0.7);
          vPhase = phase;
        }
      `,
      fragmentShader: `
        uniform vec3 fogColor;
        uniform float baseOpacity;
        uniform float time;
        varying float vOpacity;
        varying float vPhase;

        // Fonction pour créer un gradient gaussien doux
        float gaussianBlur(vec2 coord, float sigma) {
          vec2 center = coord - vec2(0.5);
          float dist = length(center);

          // Fonction gaussienne pour un blur très doux
          float gaussian = exp(-(dist * dist) / (2.0 * sigma * sigma));
          return gaussian;
        }

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);

          // Discard seulement les pixels très éloignés pour plus de fusion
          if (dist > 0.6) discard;

          // Multi-couches de blur pour effet très doux
          float blur1 = gaussianBlur(gl_PointCoord, 0.25);
          float blur2 = gaussianBlur(gl_PointCoord, 0.35);
          float blur3 = gaussianBlur(gl_PointCoord, 0.45);

          // Combiner les couches de blur
          float finalBlur = (blur1 * 0.5 + blur2 * 0.3 + blur3 * 0.2);

          // Dégradé radial très doux avec falloff étendu
          float alpha = smoothstep(0.6, 0.0, dist) * finalBlur;

          // Ajouter de la variation subtile avec le bruit
          float noiseVariation = sin(vPhase * 10.0 + time * 0.5) * 0.1 + 0.9;
          alpha *= noiseVariation;

          // Appliquer l'opacité de base et la variation temporelle
          alpha *= baseOpacity * vOpacity;

          // Variation subtile de couleur pour plus de profondeur
          vec3 color = mix(fogColor * 0.95, fogColor * 1.05, finalBlur * 0.5);

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor
    });
  }, [color, opacity, size]);

  // Animer les particules avec mouvement collectif fluide
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Mouvement collectif avec variations sinusoïdales douces
      // Créer un mouvement de vague lent et continu
      const waveX = Math.sin(time * 0.2 + phases[i]) * 0.15;
      const waveZ = Math.cos(time * 0.15 + phases[i] * 1.5) * 0.15;
      const waveY = Math.sin(time * 0.1 + phases[i] * 2) * 0.05;

      // Appliquer le mouvement de vague
      positions[i3] += (velocities[i3] * 0.3 + waveX) * delta;
      positions[i3 + 1] += (velocities[i3 + 1] * 0.2 + waveY) * delta;
      positions[i3 + 2] += (velocities[i3 + 2] * 0.3 + waveZ) * delta;

      // Réinitialiser en douceur si la particule sort du volume (effet de boucle fluide)
      if (Math.abs(positions[i3]) > spread[0] / 2) {
        // Au lieu de téléporter, ramener progressivement de l'autre côté
        positions[i3] = -Math.sign(positions[i3]) * spread[0] / 2 * 0.95;
      }
      if (positions[i3 + 1] > spread[1]) {
        positions[i3 + 1] = 0.05;
      } else if (positions[i3 + 1] < 0) {
        positions[i3 + 1] = spread[1] * 0.95;
      }
      if (Math.abs(positions[i3 + 2]) > spread[2] / 2) {
        positions[i3 + 2] = -Math.sign(positions[i3 + 2]) * spread[2] / 2 * 0.95;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Mettre à jour le temps pour le shader
    shaderMaterial.uniforms.time.value = time;
  });

  return (
    <points ref={pointsRef} position={center} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-phase"
          count={particleCount}
          array={phases}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
};
