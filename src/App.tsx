import { useState, useRef, useEffect } from 'react';
import { Scene } from './components/game/Scene';
import { CharacterMenu } from './components/ui/CharacterMenu';
import { AudioMenu } from './components/ui/AudioMenu';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';

type GameState = 'entering' | 'playing';

function App() {
  const [gameState, setGameState] = useState<GameState>('entering');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('Char01');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const enteringTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize background music
  useBackgroundMusic();

  // Track mouse position globally
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Initialize timeout for first character entrance
  useEffect(() => {
    enteringTimeoutRef.current = setTimeout(() => {
      setGameState('playing');
      enteringTimeoutRef.current = null;
    }, 1600);

    return () => {
      if (enteringTimeoutRef.current) {
        clearTimeout(enteringTimeoutRef.current);
      }
    };
  }, []);

  const handleSelectCharacter = (characterId: string) => {
    if (characterId === selectedCharacter) return; // No change needed

    // Clear any existing timeout
    if (enteringTimeoutRef.current) {
      clearTimeout(enteringTimeoutRef.current);
    }

    setSelectedCharacter(characterId);
    setGameState('entering');

    // After entrance animation, switch to playing
    enteringTimeoutRef.current = setTimeout(() => {
      setGameState('playing');
      enteringTimeoutRef.current = null;
    }, 1600); // Duration of entrance animation
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%)',
        position: 'relative'
      }}
    >
      {/* Audio settings menu */}
      <AudioMenu />

      {/* Character selection menu */}
      <CharacterMenu
        currentCharacter={selectedCharacter}
        onSelectCharacter={handleSelectCharacter}
        mousePos={mousePos}
      />

      {/* Game scene */}
      <Scene
        characterId={selectedCharacter}
        isEntering={gameState === 'entering'}
      />
    </div>
  );
}

export default App;
