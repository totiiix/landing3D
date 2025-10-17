import { useState, useRef, useEffect, useCallback } from 'react';
import { Scene } from './components/game/Scene';
import { CharacterMenu } from './components/ui/CharacterMenu';
import { AudioMenu } from './components/ui/AudioMenu';
import { InteractionPrompt } from './components/ui/InteractionPrompt';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import { DynamicEntitiesProvider } from './contexts/DynamicEntitiesContext';

type GameState = 'entering' | 'playing' | 'exiting' | 'exited';

function App() {
  const [gameState, setGameState] = useState<GameState>('entering');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('Char01');
  const [showInteractionPrompt, setShowInteractionPrompt] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const enteringTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Initialize background music
  useBackgroundMusic();

  // Track mouse position globally using ref (doesn't trigger re-render)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    mousePosRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }, []);

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

  const handleNearCarChange = useCallback((isNear: boolean) => {
    setShowInteractionPrompt(isNear && gameState === 'playing');
  }, [gameState]);

  const handleExitComplete = useCallback(() => {
    setGameState('exited');
    setFadeOut(true);

    // After fade out, reset to character selection
    setTimeout(() => {
      setGameState('entering');
      setFadeOut(false);
      setShowInteractionPrompt(false);

      // After entrance animation, switch to playing
      enteringTimeoutRef.current = setTimeout(() => {
        setGameState('playing');
        enteringTimeoutRef.current = null;
      }, 1600);
    }, 1000);
  }, []);

  return (
    <DynamicEntitiesProvider>
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
          mousePosRef={mousePosRef}
        />

        {/* Interaction prompt for car */}
        <InteractionPrompt
          message="Enter vehicle"
          visible={showInteractionPrompt}
        />

        {/* Fade out overlay */}
        {fadeOut && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'black',
              opacity: fadeOut ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              pointerEvents: 'none',
              zIndex: 2000,
            }}
          />
        )}

        {/* Game scene */}
        <Scene
          characterId={selectedCharacter}
          isEntering={gameState === 'entering'}
          onExitComplete={handleExitComplete}
          onNearCarChange={handleNearCarChange}
        />
      </div>
    </DynamicEntitiesProvider>
  );
}

export default App;
