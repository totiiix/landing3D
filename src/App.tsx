import { useState, useRef, useEffect } from 'react';
import { Scene } from './components/game/Scene';
import { CharacterMenu } from './components/ui/CharacterMenu';

type GameState = 'entering' | 'playing';

function App() {
  const [gameState, setGameState] = useState<GameState>('entering');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('Char01');
  const enteringTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%)',
      position: 'relative'
    }}>
      {/* Character selection menu */}
      <CharacterMenu
        currentCharacter={selectedCharacter}
        onSelectCharacter={handleSelectCharacter}
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
