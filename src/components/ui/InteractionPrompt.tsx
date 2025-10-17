import { useEffect, useState } from 'react';

interface InteractionPromptProps {
  message: string;
  visible: boolean;
}

export const InteractionPrompt = ({ message, visible }: InteractionPromptProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
    } else {
      // Delay hiding to allow fade-out animation
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '25%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '16px 32px',
        background: 'rgba(0, 0, 0, 0.85)',
        border: '3px solid rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        fontFamily: 'monospace',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        zIndex: 1000,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        pointerEvents: 'none',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            fontSize: '18px',
            border: '2px solid rgba(255, 255, 255, 0.4)',
          }}
        >
          E
        </span>
        <span>{message}</span>
      </div>
    </div>
  );
};
