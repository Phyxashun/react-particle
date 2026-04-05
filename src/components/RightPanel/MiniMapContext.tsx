import { createContext, use } from 'react';
import type Bounds from '../../lib/Bounds';
import type Particle from '../../lib/Particle';
import type QuadTree from '../../lib/QuadTree';

export interface MiniMapData {
  quadTree: QuadTree<Particle>;
  particles: Particle[];
  bounds: Bounds<{ x: number; y: number }>;
}

// Split into two contexts so consumers of the setter (Canvas/useParticleLoop)
// don't re-render every time miniMapData changes.
// MiniMapDataContext   — changes every 3rd frame; only QuadTreeLiveView reads it.
// MiniMapSetterContext — holds the useState setter, which is stable for the
//                        component lifetime; Canvas reads only this one.

export const MiniMapDataContext = createContext<MiniMapData | null>(null);
export const MiniMapSetterContext = createContext<(data: MiniMapData) => void>(() => {});

export const useMiniMapData = () => use(MiniMapDataContext);
export const useMiniMapSetter = () => use(MiniMapSetterContext);
