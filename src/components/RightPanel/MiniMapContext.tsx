import { createContext, use } from 'react';
import type Bounds from '../../lib/Bounds';
import type Particle from '../../lib/Particle';
import type QuadTree from '../../lib/QuadTree';

export interface MiniMapData {
  quadTree: QuadTree<Particle>;
  particles: Particle[];
  bounds: Bounds<{ x: number; y: number }>;
}

export interface MiniMapContextProps {
  miniMapData: MiniMapData | null;
  setMiniMapData: (data: MiniMapData) => void;
}

export const MiniMapContext = createContext<MiniMapContextProps | undefined>(undefined);

// Custom hook to consume the context
export const useMiniMap = () => {
  const context = use(MiniMapContext);
  if (context === undefined) {
    throw new Error('useMiniMap must be used within a UseMiniMapContextProvider');
  }
  return context;
};
