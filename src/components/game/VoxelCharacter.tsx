import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

interface VoxelCharacterProps {
  characterId?: string;
}

export const VoxelCharacter = ({ characterId = 'Char01' }: VoxelCharacterProps) => {
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`Loading character: ${characterId}`);

    // Load MTL (material) first
    const mtlLoader = new MTLLoader();
    mtlLoader.load(
      `/models/${characterId}/${characterId}.mtl`,
      (materials) => {
        console.log(`Materials loaded: ${characterId}`);
        materials.preload();

        // Load texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
          `/models/${characterId}/${characterId}.png`,
          (texture) => {
            console.log(`Texture loaded: ${characterId}`);
            // Set texture filtering for crisp voxel look
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestFilter;
            texture.colorSpace = THREE.SRGBColorSpace;

            // Load OBJ model with materials
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(
              `/models/${characterId}/${characterId}.obj`,
              (obj) => {
                console.log(`Model loaded: ${characterId}`);

                // Apply texture to all meshes in the model
                obj.traverse((child) => {
                  if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // Apply texture to the material
                    if (child.material) {
                      if (Array.isArray(child.material)) {
                        child.material.forEach((mat) => {
                          if (mat instanceof THREE.MeshPhongMaterial) {
                            mat.map = texture;
                            mat.needsUpdate = true;
                          }
                        });
                      } else if (child.material instanceof THREE.MeshPhongMaterial) {
                        child.material.map = texture;
                        child.material.needsUpdate = true;
                      }
                    }
                  }
                });

                // Scale and rotate the model
                obj.scale.set(0.9, 0.9, 0.9);
                obj.position.set(0, 0, 0);
                obj.rotation.y = Math.PI; // Rotate 180 degrees

                setModel(obj);
              },
              undefined,
              (err) => {
                console.error('Error loading OBJ:', err);
                setError('Failed to load model');
              }
            );
          },
          undefined,
          (err) => {
            console.error('Error loading texture:', err);
            setError('Failed to load texture');
          }
        );
      },
      undefined,
      (err) => {
        console.error('Error loading MTL:', err);
        setError('Failed to load materials');
      }
    );
  }, [characterId]);

  if (error) {
    console.error('VoxelCharacter error:', error);
    // Return a fallback simple box
    return (
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.9, 0.5]} />
        <meshStandardMaterial color="#FF0000" />
      </mesh>
    );
  }

  if (!model) {
    // Return a placeholder while loading
    return (
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.9, 0.5]} />
        <meshStandardMaterial color="#FFFF00" />
      </mesh>
    );
  }

  return <primitive object={model} />;
};
