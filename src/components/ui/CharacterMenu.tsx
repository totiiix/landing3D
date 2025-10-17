import { useRef, memo, MutableRefObject } from 'react';
import { CharacterPreview } from './CharacterPreview';

interface CharacterMenuProps {
  currentCharacter: string;
  onSelectCharacter: (characterId: string) => void;
  mousePosRef: MutableRefObject<{ x: number; y: number }>;
}

const CharacterMenuComponent = ({ currentCharacter, onSelectCharacter, mousePosRef }: CharacterMenuProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const characters = Array.from({ length: 14 }, (_, i) => ({
    id: `Char${String(i + 1).padStart(2, '0')}`,
    name: `Character ${i + 1}`,
  }));

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        padding: '16px 24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}>
        {characters.map((char, index) => {
          const charSize = currentCharacter === char.id ? 70 : 50;
          const gap = 12;

          // Calculate position of this character preview relative to viewport
          let leftOffset = 0;
          for (let i = 0; i < index; i++) {
            leftOffset += (currentCharacter === characters[i].id ? 70 : 50) + gap;
          }
          leftOffset += charSize / 2; // Center of this preview

          // Get container position in viewport
          const containerRect = containerRef.current?.getBoundingClientRect();
          const previewCenterX = containerRect ? containerRect.left + 24 + leftOffset : 0;
          const previewCenterY = containerRect ? containerRect.top + 16 + charSize / 2 : 0;

          return (
            <div
              key={char.id}
              onClick={() => onSelectCharacter(char.id)}
              style={{
                width: charSize + 'px',
                height: charSize + 'px',
                background: currentCharacter === char.id ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: currentCharacter === char.id ? 'translateY(-10px)' : 'translateY(0)',
                border: currentCharacter === char.id ? '3px solid white' : '2px solid #E0E0E0',
                boxShadow: currentCharacter === char.id ? '0 8px 20px rgba(102, 126, 234, 0.4)' : '0 2px 6px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                if (currentCharacter !== char.id) {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentCharacter !== char.id) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                }
              }}
            >
              <CharacterPreview
                characterId={char.id}
                isActive={currentCharacter === char.id}
                mousePosRef={mousePosRef}
                previewCenter={{ x: previewCenterX, y: previewCenterY }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CharacterMenu = memo(CharacterMenuComponent);
