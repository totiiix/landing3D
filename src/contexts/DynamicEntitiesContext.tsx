import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface EntityPosition {
  x: number;
  z: number;
}

interface DynamicEntitiesContextType {
  duckPosition: EntityPosition | null;
  updateDuckPosition: (position: EntityPosition) => void;
  isDuckAt: (x: number, z: number) => boolean;
  playerPosition: EntityPosition | null;
  updatePlayerPosition: (position: EntityPosition) => void;
}

const DynamicEntitiesContext = createContext<DynamicEntitiesContextType | undefined>(undefined);

export const DynamicEntitiesProvider = ({ children }: { children: ReactNode }) => {
  const [duckPosition, setDuckPosition] = useState<EntityPosition | null>(null);
  const [playerPosition, setPlayerPosition] = useState<EntityPosition | null>(null);

  const updateDuckPosition = useCallback((position: EntityPosition) => {
    setDuckPosition(position);
  }, []);

  const updatePlayerPosition = useCallback((position: EntityPosition) => {
    setPlayerPosition(position);
  }, []);

  const isDuckAt = useCallback((x: number, z: number) => {
    if (!duckPosition) return false;
    return duckPosition.x === x && duckPosition.z === z;
  }, [duckPosition]);

  return (
    <DynamicEntitiesContext.Provider value={{ duckPosition, updateDuckPosition, isDuckAt, playerPosition, updatePlayerPosition }}>
      {children}
    </DynamicEntitiesContext.Provider>
  );
};

export const useDynamicEntities = () => {
  const context = useContext(DynamicEntitiesContext);
  if (context === undefined) {
    throw new Error('useDynamicEntities must be used within a DynamicEntitiesProvider');
  }
  return context;
};
