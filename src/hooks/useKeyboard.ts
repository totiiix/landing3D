import { useEffect, useState } from 'react';

interface KeyboardState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  interact: boolean;
}

export const useKeyboard = () => {
  const [keys, setKeys] = useState<KeyboardState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    interact: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      console.log('Key pressed:', key); // Debug

      switch (key) {
        case 'w':
        case 'z': // AZERTY
        case 'arrowup':
          setKeys((prev) => ({ ...prev, forward: true }));
          break;
        case 's':
        case 'arrowdown':
          setKeys((prev) => ({ ...prev, backward: true }));
          break;
        case 'a':
        case 'q': // AZERTY
        case 'arrowleft':
          setKeys((prev) => ({ ...prev, left: true }));
          break;
        case 'd':
        case 'arrowright':
          setKeys((prev) => ({ ...prev, right: true }));
          break;
        case ' ':
          e.preventDefault();
          setKeys((prev) => ({ ...prev, jump: true }));
          break;
        case 'e':
          setKeys((prev) => ({ ...prev, interact: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      switch (key) {
        case 'w':
        case 'z': // AZERTY
        case 'arrowup':
          setKeys((prev) => ({ ...prev, forward: false }));
          break;
        case 's':
        case 'arrowdown':
          setKeys((prev) => ({ ...prev, backward: false }));
          break;
        case 'a':
        case 'q': // AZERTY
        case 'arrowleft':
          setKeys((prev) => ({ ...prev, left: false }));
          break;
        case 'd':
        case 'arrowright':
          setKeys((prev) => ({ ...prev, right: false }));
          break;
        case ' ':
          setKeys((prev) => ({ ...prev, jump: false }));
          break;
        case 'e':
          setKeys((prev) => ({ ...prev, interact: false }));
          break;
      }
    };

    console.log('Keyboard listeners attached'); // Debug
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      console.log('Keyboard listeners removed'); // Debug
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};
