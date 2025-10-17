import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const AtmosphericSkybox = () => {
  const skyRef = useRef<THREE.Mesh>(null);

  // Créer un shader pour un dégradé atmosphérique
  const skyMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vWorldPosition;

      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vWorldPosition;

      void main() {
        // Normaliser la hauteur pour créer le dégradé
        float height = normalize(vWorldPosition).y;

        // Couleurs du ciel
        vec3 skyTop = vec3(0.52, 0.62, 0.72);      // Bleu-gris clair en haut
        vec3 skyHorizon = vec3(0.70, 0.76, 0.82);  // Bleu-gris très clair à l'horizon
        vec3 skyBottom = vec3(0.78, 0.82, 0.86);   // Presque blanc en bas (brouillard)

        // Mélanger les couleurs selon la hauteur
        vec3 skyColor;
        if (height > 0.0) {
          // Au-dessus de l'horizon
          skyColor = mix(skyHorizon, skyTop, smoothstep(0.0, 0.5, height));
        } else {
          // En dessous de l'horizon (vers le sol)
          skyColor = mix(skyHorizon, skyBottom, smoothstep(0.0, -0.3, height));
        }

        gl_FragColor = vec4(skyColor, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false
  });

  // Animation subtile du ciel (optionnel)
  useFrame(({ clock }) => {
    if (skyRef.current) {
      // Légère rotation très lente pour effet vivant
      skyRef.current.rotation.y = clock.getElapsedTime() * 0.002;
    }
  });

  return (
    <mesh ref={skyRef} material={skyMaterial}>
      <sphereGeometry args={[500, 32, 32]} />
    </mesh>
  );
};
