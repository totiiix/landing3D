import { Canvas } from '@react-three/fiber';
import { Player } from './Player';
import { Ground } from './Ground';
import { Camera } from './Camera';
import { DecorationLayer } from './DecorationLayer';
import { TestDecorationLayer } from './TestDecorationLayer';
import { GridDebug } from './GridDebug';
import { GlobalFog } from './GlobalFog';
import { memo } from 'react';

interface SceneProps {
  characterId: string;
  isEntering: boolean;
}

const SceneComponent = ({ characterId, isEntering }: SceneProps) => {
  return (
    <Canvas shadows camera={{ position: [0, 8, -8], fov: 60 }}>
      {/* Global Fog Effect */}
      <GlobalFog />

      {/* Golden Hour Lighting - Rayons de soleil en fin de journée */}
      {/* Lumière ambiante neutre de base */}
      <ambientLight intensity={0.4} color="#e8e8f0" />

      {/* Soleil - Lumière principale avec ombres douces et courtes */}
      <directionalLight
        position={[20, 14, 15]}
        intensity={1.0}
        color="#c5844fff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={60}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0001}
        shadow-radius={8}
      />

      {/* Rayon de soleil chaud - Spot directionnel */}
      <spotLight
        position={[30, 12, 25]}
        angle={0.8}
        penumbra={0.6}
        intensity={1.5}
        color="#ac5726ff"
        distance={60}
        castShadow={false}
      />

      {/* Lumière d'appoint douce pour les zones d'ombre */}
      <directionalLight
        position={[-10, 15, -5]}
        intensity={0.25}
        color="#c8d0e8"
      />

      {/* Lumière de remplissage subtile */}
      <hemisphereLight
        args={['#f5f0e8', '#9888aa', 0.3]}
        position={[0, -1, 0]}
      />

      {/* Game Objects */}
      <Player characterId={characterId} isEntering={isEntering} />
      <Ground />
      <DecorationLayer />

      {/* Test Decorations - Commentez cette ligne pour désactiver les modèles de test */}
      <TestDecorationLayer />

      {/* Debug: Points rouges au centre de chaque case - Décommentez pour debug */}
      {/* <GridDebug /> */}

      {/* Camera Controller */}
      <Camera />
    </Canvas>
  );
};

// Mémoize le composant pour éviter les re-renders lors des mouvements de souris
export const Scene = memo(SceneComponent);
