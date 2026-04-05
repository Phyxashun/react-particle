import { createContext, use } from 'react';

export interface SpawnContextProps {
  particleCount: number;
  particleSpeed: number;
  setParticleCount: (v: number) => void;
  setParticleSpeed: (v: number) => void;
}

export const SpawnContext = createContext<SpawnContextProps>({
  particleCount: 10,
  particleSpeed: 1.0,
  setParticleCount: () => {},
  setParticleSpeed: () => {},
});

export const useSpawn = () => use(SpawnContext);
