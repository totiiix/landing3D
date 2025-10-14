import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export const Camera = () => {
  const { camera } = useThree();

  useEffect(() => {
    // Fixed isometric camera setup - centered on the grid
    camera.position.set(17, 9, 12);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
};
