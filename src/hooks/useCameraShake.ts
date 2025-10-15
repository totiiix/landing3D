import { useState, useCallback } from 'react';

interface CameraShakeState {
  isShaking: boolean;
  intensity: number;
  duration: number;
}

let shakeListeners: ((state: CameraShakeState) => void)[] = [];

export const triggerCameraShake = (intensity: number = 0.2, duration: number = 0.2) => {
  shakeListeners.forEach((listener) =>
    listener({ isShaking: true, intensity, duration })
  );
};

export const useCameraShake = () => {
  const [shakeState, setShakeState] = useState<CameraShakeState>({
    isShaking: false,
    intensity: 0,
    duration: 0,
  });

  const subscribe = useCallback((listener: (state: CameraShakeState) => void) => {
    shakeListeners.push(listener);
    return () => {
      shakeListeners = shakeListeners.filter((l) => l !== listener);
    };
  }, []);

  return { shakeState, setShakeState, subscribe };
};
