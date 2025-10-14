import { useState, useRef } from 'react';
import { CharacterPreview } from './CharacterPreview';

interface CharacterMenuProps {
  currentCharacter: string;
  onSelectCharacter: (characterId: string) => void;
}

export const CharacterMenu = ({ currentCharacter, onSelectCharacter }: CharacterMenuProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const characters = Array.from({ length: 14 }, (_, i) => ({
    id: `Char${String(i + 1).padStart(2, '0')}`,
    name: `Character ${i + 1}`,
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'absolute',
        bottom: '30px',
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
          // Calculate approximate position of this character preview
          const totalWidth = characters.reduce((sum, c, i) => {
            const size = currentCharacter === c.id ? 70 : 50;
            return sum + size + (i < characters.length - 1 ? gap : 0);
          }, 0);

          let leftOffset = 0;
          for (let i = 0; i < index; i++) {
            leftOffset += (currentCharacter === characters[i].id ? 70 : 50) + gap;
          }
          leftOffset += charSize / 2; // Center of this preview

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
                mousePos={mousePos}
                previewCenter={{ x: leftOffset + 24, y: 16 + charSize / 2 }} // Add padding offset
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
