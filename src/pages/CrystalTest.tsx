import { Canvas } from '@react-three/fiber';
import { CrystalDesign1, CrystalDesign2, CrystalDesign3, CrystalDesign4, CrystalDesign5, CrystalDesign6 } from '../components/game/CrystalDesigns';

export const CrystalTest = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a2e' }}>
      {/* Titre */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '28px',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        zIndex: 1000,
        textAlign: 'center'
      }}>
        🔮 Designs de Cristaux Voxel
      </div>

      {/* Légendes */}
      <div style={{
        position: 'absolute',
        top: '70px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '14px',
        fontFamily: 'monospace',
        zIndex: 1000,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        width: '900px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '5px' }}>Design 1</div>
          <div style={{ opacity: 0.7 }}>Tour Spirale</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '5px' }}>Design 2</div>
          <div style={{ opacity: 0.7 }}>Croix 3D</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '5px' }}>Design 3</div>
          <div style={{ opacity: 0.7 }}>Diamant Pixelisé</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '5px' }}>Design 4</div>
          <div style={{ opacity: 0.7 }}>Cluster de Cristaux</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '5px' }}>Design 5</div>
          <div style={{ opacity: 0.7 }}>Colonne avec Anneaux</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '5px' }}>Design 6</div>
          <div style={{ opacity: 0.7 }}>Étoile 3D</div>
        </div>
      </div>

      <Canvas shadows camera={{ position: [0, 3, 8], fov: 60 }}>
        {/* Éclairage */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />

        {/* Grille de cristaux - 2 rangées de 3 */}
        {/* Rangée du haut */}
        <CrystalDesign1 position={[-3, 1, 0]} color="#4da6ff" glowColor="#6bc4ff" />
        <CrystalDesign2 position={[0, 1, 0]} color="#4dff88" glowColor="#6bffa3" />
        <CrystalDesign3 position={[3, 1, 0]} color="#ff4d4d" glowColor="#ff6b6b" />

        {/* Rangée du bas */}
        <CrystalDesign4 position={[-3, -1, 0]} color="#ffd700" glowColor="#ffed4e" />
        <CrystalDesign5 position={[0, -1, 0]} color="#9d4edd" glowColor="#c77dff" />
        <CrystalDesign6 position={[3, -1, 0]} color="#06ffa5" glowColor="#3dffcd" />

        {/* Plan de sol pour les ombres */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#0f0f1e" />
        </mesh>
      </Canvas>
    </div>
  );
};
